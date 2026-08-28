export type EbayListing = {
  itemId: string;
  title: string;
  price: number;
  currency: string;
  url: string;
  imageUrl?: string;
  seller?: string;
};

const ITEM_ID_FROM_URL = /\/(?:itm|p)\/(?:[^/?#]+\/)?(\d{8,15})/i;
const TRAILING_PRICE = /\s*(?:-\s*)?(?:US\s*)?\$\s*[\d,]+(?:\.\d{1,2})?\s*$/i;
const PRICE_IN_TEXT =
  /(?:US\s*)?\$\s*([\d,]+(?:\.\d{1,2})?)|([\d,]+(?:\.\d{1,2})?)\s*USD/i;

export function isLiveEbayItem(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "www.ebay.com" && parsed.hostname !== "ebay.com") {
      return false;
    }
    if (parsed.pathname.startsWith("/usr/") || parsed.pathname === "/") {
      return false;
    }
    return parsed.pathname.includes("/itm/") || parsed.pathname.includes("/p/");
  } catch {
    return false;
  }
}

export function decodeXmlEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCharCode(parseInt(n, 16)),
    )
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function isXmlFeed(text: string): boolean {
  const trimmed = text.trimStart();
  if (!trimmed || trimmed.startsWith("<!DOCTYPE html") || trimmed.startsWith("<html")) {
    return false;
  }
  return (
    trimmed.includes("<rss") ||
    trimmed.includes("<feed") ||
    trimmed.includes("<RDF")
  );
}

export function itemIdFromEbayUrl(url: string): string | undefined {
  const match = url.match(ITEM_ID_FROM_URL);
  return match?.[1];
}

export function parsePriceToNumber(
  raw: string | undefined,
): { price: number; currency: string } | undefined {
  if (!raw) return undefined;
  const match = raw.match(PRICE_IN_TEXT);
  const amount = match?.[1] ?? match?.[2];
  if (!amount) return undefined;
  const price = Number(amount.replace(/,/g, ""));
  if (!Number.isFinite(price) || price <= 0) return undefined;
  return { price, currency: "USD" };
}

export function stripTrailingPrice(title: string): string {
  const stripped = title.replace(TRAILING_PRICE, "").trim();
  return stripped || title;
}

function xmlTag(block: string, tag: string): string | undefined {
  const pattern = new RegExp(
    `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`,
    "i",
  );
  const match = block.match(pattern);
  if (!match) return undefined;
  return decodeXmlEntities(match[1]);
}

function xmlAttr(block: string, tag: string, attr: string): string | undefined {
  const pattern = new RegExp(
    `<${tag}[^>]*\\s${attr}=["']([^"']+)["'][^>]*/?>`,
    "i",
  );
  const match = block.match(pattern);
  return match?.[1] ? decodeXmlEntities(match[1]) : undefined;
}

function firstImageUrl(html: string): string | undefined {
  const quoted = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (quoted?.[1]) return quoted[1].trim();
  const unquoted = html.match(/<img[^>]+src=([^\s>]+)/i);
  return unquoted?.[1]?.replace(/["']/g, "").trim();
}

function listingFromParts(parts: {
  title?: string;
  url?: string;
  description?: string;
  priceText?: string;
  imageUrl?: string;
  seller?: string;
}): EbayListing | undefined {
  const url = parts.url?.trim();
  if (!isLiveEbayItem(url)) return undefined;

  const priceParsed =
    parsePriceToNumber(parts.priceText) ??
    parsePriceToNumber(parts.description) ??
    parsePriceToNumber(parts.title);
  if (!priceParsed) return undefined;

  const title = stripTrailingPrice(parts.title ?? "").trim();
  if (!title) return undefined;

  const itemId = itemIdFromEbayUrl(url) ?? url;
  const imageUrl = parts.imageUrl || firstImageUrl(parts.description ?? "");

  return {
    itemId,
    title,
    price: priceParsed.price,
    currency: priceParsed.currency,
    url,
    imageUrl: imageUrl || undefined,
    seller: parts.seller,
  };
}

export function listingsFromRssXml(xml: string): EbayListing[] {
  if (!isXmlFeed(xml)) {
    throw new Error("eBay seller feed was not RSS/Atom XML");
  }

  const blocks = [
    ...xml.matchAll(/<item\b[^>]*>[\s\S]*?<\/item>/gi),
    ...xml.matchAll(/<entry\b[^>]*>[\s\S]*?<\/entry>/gi),
  ];

  const listings: EbayListing[] = [];
  const seen = new Set<string>();

  for (const match of blocks) {
    const block = match[0];
    const listing = listingFromParts({
      title: xmlTag(block, "title"),
      url:
        xmlTag(block, "link") ||
        xmlAttr(block, "link", "href") ||
        xmlTag(block, "guid"),
      description:
        xmlTag(block, "description") || xmlTag(block, "content"),
      priceText:
        xmlTag(block, "g:price") ||
        xmlTag(block, "price") ||
        xmlTag(block, "ebay:BuyItNowPrice") ||
        xmlTag(block, "ebay:CurrentPrice"),
      imageUrl:
        xmlAttr(block, "media:content", "url") ||
        xmlAttr(block, "media:thumbnail", "url") ||
        xmlAttr(block, "enclosure", "url"),
    });
    if (!listing || seen.has(listing.itemId)) continue;
    seen.add(listing.itemId);
    listings.push(listing);
  }

  return listings;
}

type BrowsePrice = { value?: string; currency?: string };
type BrowseItem = {
  itemId?: string;
  title?: string;
  itemWebUrl?: string;
  itemHref?: string;
  price?: BrowsePrice;
  currentBidPrice?: BrowsePrice;
  image?: { imageUrl?: string };
  thumbnailImages?: Array<{ imageUrl?: string }>;
  additionalImages?: Array<{ imageUrl?: string }>;
  seller?: { username?: string };
};

export type BrowseSearchResponse = {
  total?: number;
  itemSummaries?: BrowseItem[];
  errors?: Array<{ message?: string; longMessage?: string }>;
};

function browsePrice(item: BrowseItem): { price: number; currency: string } | undefined {
  const candidates = [item.price, item.currentBidPrice];
  let best: { price: number; currency: string } | undefined;
  for (const candidate of candidates) {
    if (!candidate?.value) continue;
    const price = Number(String(candidate.value).replace(/,/g, ""));
    if (!Number.isFinite(price) || price <= 0) continue;
    const currency = candidate.currency || "USD";
    if (!best || price > best.price) {
      best = { price, currency };
    }
  }
  return best;
}

export function listingsFromBrowseSearch(
  payload: BrowseSearchResponse,
  sellerUsername: string,
): EbayListing[] {
  const wanted = sellerUsername.toLowerCase();
  const listings: EbayListing[] = [];
  const seen = new Set<string>();

  for (const item of payload.itemSummaries ?? []) {
    const seller = item.seller?.username?.trim();
    if (seller && seller.toLowerCase() !== wanted) continue;

    const url = item.itemWebUrl || item.itemHref;
    const priceParsed = browsePrice(item);
    const title = item.title?.trim();
    if (!title || !priceParsed || !isLiveEbayItem(url)) continue;

    const itemId =
      itemIdFromEbayUrl(url) ??
      item.itemId?.split("|")[1] ??
      item.itemId ??
      url;
    if (seen.has(itemId)) continue;
    seen.add(itemId);

    const imageUrl =
      item.image?.imageUrl ||
      item.thumbnailImages?.[0]?.imageUrl ||
      item.additionalImages?.[0]?.imageUrl;

    listings.push({
      itemId,
      title,
      price: priceParsed.price,
      currency: priceParsed.currency,
      url,
      imageUrl,
      seller,
    });
  }

  return listings;
}

/**
 * Highest price wins. Equal prices break ties on the smaller item id
 * so the pick is stable across refreshes.
 */
export function pickMostExpensive(
  listings: EbayListing[],
): EbayListing | undefined {
  if (listings.length === 0) return undefined;

  return [...listings].sort((a, b) => {
    const priceDiff =
      Math.round(b.price * 100) - Math.round(a.price * 100);
    if (priceDiff !== 0) return priceDiff;
    return a.itemId < b.itemId ? -1 : a.itemId > b.itemId ? 1 : 0;
  })[0];
}

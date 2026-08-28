import { unstable_cache } from "next/cache";
import { isLiveEbayItem, siteConfig, siteHandles } from "@/lib/data";
import {
  type BrowseSearchResponse,
  type EbayListing,
  isXmlFeed,
  listingsFromBrowseSearch,
  listingsFromRssXml,
  pickMostExpensive,
} from "@/lib/ebay-parse";

export type { EbayListing };

export const EBAY_HIGHLIGHT_REVALIDATE_SECONDS = 86_400;

export type DailyHighlightResult =
  | {
      status: "ok";
      listing: EbayListing;
      source: "rss" | "browse";
      listingCount: number;
    }
  | { status: "empty" }
  | { status: "unavailable" };

const SELLER = siteHandles.ebay;
const BROWSE_SCOPE = "https://api.ebay.com/oauth/api_scope";
const BROWSE_SEARCH = "https://api.ebay.com/buy/browse/v1/item_summary/search";
const TOKEN_URL = "https://api.ebay.com/identity/v1/oauth2/token";
// Sports Mem, Cards & Fan Shop + Toys & Hobbies (TCG). Used only if a
// seller-only Browse search is rejected for missing q/category.
const CARD_CATEGORY_IDS = ["64482", "220"];

type FeedAttempt =
  | { ok: true; listings: EbayListing[]; source: "rss" | "browse" }
  | { ok: false; kind: "empty" | "failed" };

function parseJsonBody<T>(text: string, label: string): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`${label} was not JSON`);
  }
}

function sellerRssUrl(seller: string): string {
  const url = new URL("https://www.ebay.com/sch/i.html");
  url.searchParams.set("_ssn", seller);
  url.searchParams.set("_sop", "16");
  url.searchParams.set("_ipg", "200");
  url.searchParams.set("_rss", "1");
  return url.toString();
}

async function readEbayResponse(
  url: string,
  init: RequestInit,
): Promise<{ ok: boolean; status: number; text: string }> {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(8_000),
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, text };
}

async function fetchRssListings(seller: string): Promise<FeedAttempt> {
  const { ok, text } = await readEbayResponse(sellerRssUrl(seller), {
    headers: {
      Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      "User-Agent": "CigarCitySlabs/1.0 (+https://cigarcityslab.com)",
    },
    next: { revalidate: EBAY_HIGHLIGHT_REVALIDATE_SECONDS },
  });

  if (!ok || !isXmlFeed(text)) {
    return { ok: false, kind: "failed" };
  }

  const listings = listingsFromRssXml(text).filter((item) =>
    isLiveEbayItem(item.url),
  );
  if (listings.length === 0) {
    return { ok: false, kind: "empty" };
  }
  return { ok: true, listings, source: "rss" };
}

function browseCredentials():
  | { clientId: string; clientSecret: string }
  | undefined {
  const clientId = process.env.EBAY_CLIENT_ID?.trim();
  const clientSecret = process.env.EBAY_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return undefined;
  return { clientId, clientSecret };
}

async function fetchBrowseToken(
  clientId: string,
  clientSecret: string,
): Promise<string> {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const { ok, text } = await readEbayResponse(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: BROWSE_SCOPE,
    }).toString(),
    cache: "no-store",
  });

  if (!ok) {
    throw new Error(`eBay token request failed (${text.slice(0, 120)})`);
  }

  const payload = parseJsonBody<{ access_token?: string }>(text, "eBay token response");
  if (!payload.access_token) {
    throw new Error("eBay token response was missing access_token");
  }
  return payload.access_token;
}

async function browsePage(options: {
  token: string;
  seller: string;
  offset: number;
  categoryId?: string;
}): Promise<BrowseSearchResponse> {
  const filter = `sellers:{${options.seller}},buyingOptions:{FIXED_PRICE|AUCTION}`;
  const params = new URLSearchParams({
    filter,
    limit: "200",
    offset: String(options.offset),
    fieldgroups: "EXTENDED",
  });
  if (options.categoryId) {
    params.set("category_ids", options.categoryId);
  }

  const { ok, text } = await readEbayResponse(`${BROWSE_SEARCH}?${params}`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
      Accept: "application/json",
    },
    next: { revalidate: EBAY_HIGHLIGHT_REVALIDATE_SECONDS },
  });

  const payload = parseJsonBody<BrowseSearchResponse>(text, "eBay Browse search");
  if (!ok) {
    const message =
      payload.errors?.[0]?.longMessage ||
      payload.errors?.[0]?.message ||
      text.slice(0, 160);
    throw new Error(message);
  }
  return payload;
}

function needsCategoryOrQuery(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return (
    message.includes("q") ||
    message.includes("keyword") ||
    message.includes("category")
  );
}

async function collectBrowseListings(
  token: string,
  seller: string,
  categoryId?: string,
): Promise<EbayListing[]> {
  const collected: EbayListing[] = [];
  const seen = new Set<string>();
  let offset = 0;
  let total = Number.POSITIVE_INFINITY;

  while (offset < total && offset < 2_000) {
    const page = await browsePage({ token, seller, offset, categoryId });
    const listings = listingsFromBrowseSearch(page, seller);
    for (const listing of listings) {
      if (seen.has(listing.itemId)) continue;
      seen.add(listing.itemId);
      collected.push(listing);
    }
    total = typeof page.total === "number" ? page.total : listings.length;
    if ((page.itemSummaries?.length ?? 0) === 0) break;
    offset += 200;
  }

  return collected;
}

async function fetchBrowseListings(seller: string): Promise<FeedAttempt> {
  const creds = browseCredentials();
  if (!creds) return { ok: false, kind: "failed" };

  const token = await fetchBrowseToken(creds.clientId, creds.clientSecret);
  const listings: EbayListing[] = [];
  const seen = new Set<string>();

  const add = (chunk: EbayListing[]) => {
    for (const listing of chunk) {
      if (seen.has(listing.itemId)) continue;
      seen.add(listing.itemId);
      listings.push(listing);
    }
  };

  try {
    add(await collectBrowseListings(token, seller));
  } catch (error) {
    if (!needsCategoryOrQuery(error)) {
      throw error;
    }
  }

  if (listings.length === 0) {
    for (const categoryId of CARD_CATEGORY_IDS) {
      try {
        add(await collectBrowseListings(token, seller, categoryId));
      } catch {
        // Keep going — one category miss shouldn't hide the other lane.
      }
    }
  }

  if (listings.length === 0) return { ok: false, kind: "empty" };
  return { ok: true, listings, source: "browse" };
}

async function loadDailyHighlight(): Promise<DailyHighlightResult> {
  const attempts: FeedAttempt[] = [];

  try {
    attempts.push(await fetchRssListings(SELLER));
  } catch {
    attempts.push({ ok: false, kind: "failed" });
  }

  const rss = attempts[0];
  if (rss?.ok) {
    const listing = pickMostExpensive(rss.listings);
    if (!listing) return { status: "empty" };
    return {
      status: "ok",
      listing,
      source: rss.source,
      listingCount: rss.listings.length,
    };
  }
  if (rss?.kind === "empty") {
    return { status: "empty" };
  }

  try {
    attempts.push(await fetchBrowseListings(SELLER));
  } catch {
    attempts.push({ ok: false, kind: "failed" });
  }

  const browse = attempts[1];
  if (browse?.ok) {
    const listing = pickMostExpensive(browse.listings);
    if (!listing) return { status: "empty" };
    return {
      status: "ok",
      listing,
      source: browse.source,
      listingCount: browse.listings.length,
    };
  }
  if (browse?.kind === "empty") {
    return { status: "empty" };
  }

  return { status: "unavailable" };
}

export const getDailyHighlight = unstable_cache(
  loadDailyHighlight,
  ["ebay-daily-highlight", SELLER, siteConfig.ebay],
  { revalidate: EBAY_HIGHLIGHT_REVALIDATE_SECONDS, tags: ["ebay-inventory"] },
);

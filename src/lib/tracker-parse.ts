export type TrackerCard = {
  id: string;
  title: string;
  player?: string;
  year?: string;
  set?: string;
  grade?: string;
  ebayUrl: string;
  photoFilename?: string;
  photoUrl?: string;
  notes?: string;
  sort: number;
  /** Present only when the tracker has a real price cell. Never invented. */
  price?: number;
};

const ITEM_ID_FROM_URL = /\/(?:itm|p)\/(?:[^/?#]+\/)?(\d{8,15})/i;
const PRICE_IN_TEXT =
  /(?:US\s*)?\$\s*([\d,]+(?:\.\d{1,2})?)|([\d,]+(?:\.\d{1,2})?)\s*USD|^([\d,]+(?:\.\d{1,2})?)$/i;
const LIVE_YES = /^(yes|y|true|1)$/i;
const DRIVE_FILE_ID = /^[a-zA-Z0-9_-]{25,}$/;

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

export function itemIdFromEbayUrl(url: string): string | undefined {
  const match = url.match(ITEM_ID_FROM_URL);
  return match?.[1];
}

export function parsePriceToNumber(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const match = trimmed.match(PRICE_IN_TEXT);
  const amount = match?.[1] ?? match?.[2] ?? match?.[3];
  if (!amount) return undefined;
  const price = Number(amount.replace(/,/g, ""));
  if (!Number.isFinite(price) || price <= 0) return undefined;
  return price;
}

export function isLiveYes(value: string | undefined): boolean {
  return LIVE_YES.test((value ?? "").trim());
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") {
      cell += ch;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.some((value) => value.trim() !== ""));
}

function col(header: string[], row: string[], name: string): string {
  const index = header.findIndex((h) => h === name);
  if (index < 0) return "";
  return (row[index] ?? "").trim();
}

export function titleFromTrackerFields(fields: {
  player?: string;
  year?: string;
  set?: string;
  grade?: string;
  ebayUrl: string;
}): string {
  const named = [fields.player, fields.year, fields.set, fields.grade]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part && part.length > 0));
  if (named.length > 0) return named.join(" · ");
  const itemId = itemIdFromEbayUrl(fields.ebayUrl);
  return itemId ? `eBay item ${itemId}` : "Live eBay listing";
}

export function photoUrlFromFilename(
  filename: string | undefined,
): string | undefined {
  const value = filename?.trim();
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (DRIVE_FILE_ID.test(value)) {
    return `https://drive.google.com/uc?export=view&id=${value}`;
  }
  return undefined;
}

export function trackerCardsFromCsv(csv: string): TrackerCard[] {
  const table = parseCsv(csv);
  if (table.length < 2) return [];

  const header = table[0].map((h) => h.trim().toLowerCase());
  const cards: TrackerCard[] = [];
  const seen = new Set<string>();

  for (const row of table.slice(1)) {
    if (!isLiveYes(col(header, row, "live"))) continue;

    const ebayUrl = col(header, row, "ebay_url");
    if (!isLiveEbayItem(ebayUrl)) continue;

    const id = itemIdFromEbayUrl(ebayUrl) ?? ebayUrl;
    if (seen.has(id)) continue;
    seen.add(id);

    const player = col(header, row, "player") || undefined;
    const year = col(header, row, "year") || undefined;
    const set = col(header, row, "set") || undefined;
    const grade = col(header, row, "grade") || undefined;
    const photoFilename = col(header, row, "photo_filename") || undefined;
    const notes = col(header, row, "notes") || undefined;
    const sortRaw = Number(col(header, row, "sort"));
    const sort = Number.isFinite(sortRaw) ? sortRaw : Number.POSITIVE_INFINITY;
    const price = parsePriceToNumber(col(header, row, "price"));

    cards.push({
      id,
      title: titleFromTrackerFields({ player, year, set, grade, ebayUrl }),
      player,
      year,
      set,
      grade,
      ebayUrl,
      photoFilename,
      photoUrl: photoUrlFromFilename(photoFilename),
      notes,
      sort,
      price,
    });
  }

  return cards;
}

/**
 * Highlight pick:
 * 1. If any live row has a real price, highest price wins (tie: smaller item id).
 * 2. Otherwise lowest `sort` wins (tie: smaller item id).
 */
export function pickHighlight(cards: TrackerCard[]): TrackerCard | undefined {
  if (cards.length === 0) return undefined;

  const priced = cards.filter((card) => typeof card.price === "number");
  const pool = priced.length > 0 ? priced : cards;

  return [...pool].sort((a, b) => {
    if (priced.length > 0) {
      const priceDiff =
        Math.round((b.price ?? 0) * 100) - Math.round((a.price ?? 0) * 100);
      if (priceDiff !== 0) return priceDiff;
    } else {
      const sortDiff = a.sort - b.sort;
      if (sortDiff !== 0) return sortDiff;
    }
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  })[0];
}

export function sortForCarousel(cards: TrackerCard[]): TrackerCard[] {
  return [...cards].sort((a, b) => {
    const sortDiff = a.sort - b.sort;
    if (sortDiff !== 0) return sortDiff;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
}

import { unstable_cache } from "next/cache";
import { siteConfig } from "@/lib/data";
import {
  pickHighlight,
  sortForCarousel,
  trackerCardsFromCsv,
  type TrackerCard,
} from "@/lib/tracker-parse";

export type { TrackerCard };

export const TRACKER_REVALIDATE_SECONDS = 3600;

export const TRACKER_SPREADSHEET_ID =
  "1n4PxXbJ5g-Gx1jhvAXWnsWhX87k3R9lQ71vjzf0V9V0";
export const TRACKER_PHOTOS_FOLDER_ID = "1F_tNA7lW-RbFVaTyFaTanQOmER0eRxTt";

export type TrackerResult =
  | {
      status: "ok";
      cards: TrackerCard[];
      highlight: TrackerCard;
    }
  | { status: "empty" }
  | { status: "unavailable" };

function csvExportUrl(spreadsheetId: string): string {
  const url = new URL(
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export`,
  );
  url.searchParams.set("format", "csv");
  url.searchParams.set("gid", "0");
  return url.toString();
}

function looksLikeCsv(text: string): boolean {
  const trimmed = text.trimStart();
  if (!trimmed || trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
    return false;
  }
  const firstLine = trimmed.split(/\r?\n/, 1)[0] ?? "";
  return firstLine.toLowerCase().includes("live") && firstLine.includes(",");
}

async function fetchTrackerCsv(): Promise<string> {
  const response = await fetch(csvExportUrl(TRACKER_SPREADSHEET_ID), {
    headers: {
      Accept: "text/csv, text/plain, */*",
      "User-Agent": "CigarCitySlabs/1.0 (+https://cigarcityslab.com)",
    },
    next: { revalidate: TRACKER_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8_000),
  });
  const text = await response.text();
  if (!response.ok || !looksLikeCsv(text)) {
    throw new Error(`Tracker CSV unavailable (${response.status})`);
  }
  return text;
}

async function loadTracker(): Promise<TrackerResult> {
  let csv: string;
  try {
    csv = await fetchTrackerCsv();
  } catch {
    return { status: "unavailable" };
  }

  const cards = sortForCarousel(trackerCardsFromCsv(csv));
  const highlight = pickHighlight(cards);
  if (!highlight) return { status: "empty" };
  return { status: "ok", cards, highlight };
}

export const getTracker = unstable_cache(
  loadTracker,
  ["ccs-highlighted-cards-tracker", TRACKER_SPREADSHEET_ID, siteConfig.ebay],
  { revalidate: TRACKER_REVALIDATE_SECONDS, tags: ["tracker"] },
);

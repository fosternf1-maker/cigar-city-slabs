import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  parseCsv,
  pickHighlight,
  sortForCarousel,
  trackerCardsFromCsv,
} from "./tracker-parse.ts";

const EMPTY_TRACKER = `live,sort,player,year,set,grade,ebay_url,photo_filename,notes
YES,1,,,,,,,"drop the photo, paste the eBay listing URL, match the filename"
`;

const LIVE_TRACKER = `live,sort,player,year,set,grade,ebay_url,photo_filename,notes
YES,1,,,,,,,"instruction row — no URL, must not show"
NO,2,Skip Me,2018,Chrome,PSA 10,https://www.ebay.com/itm/111111111111,,
YES,3,Live Mid,2020,Prizm,PSA 9,https://www.ebay.com/itm/222222222222,mid.jpg,
yes,4,Live Late,2019,Optic,,https://www.ebay.com/itm/100000000000,,
YES,1,Store Root,1993,Upper Deck,PSA 8,https://www.ebay.com/usr/cigar_city_slabs,,
`;

const PRICED_TRACKER = `live,sort,player,year,set,grade,ebay_url,photo_filename,notes,price
YES,9,Cheap Auto,2024,Donruss,,https://www.ebay.com/itm/111111111111,,,4.99
YES,1,High Card,2011,Topps,PSA 10,https://www.ebay.com/itm/222222222222,,,89
YES,2,Tied Price,2018,Chrome,PSA 10,https://www.ebay.com/itm/100000000000,,,89
YES,3,No Url Yet,2018,Chrome,PSA 10,,,,
`;

describe("Highlighted Cards tracker", () => {
  it("parses quoted CSV cells", () => {
    const rows = parseCsv(EMPTY_TRACKER);
    assert.equal(rows[0]?.[0], "live");
    assert.equal(rows[1]?.[0], "YES");
  });

  it("does not show the instruction row or any row without a live item URL", () => {
    const cards = trackerCardsFromCsv(EMPTY_TRACKER);
    assert.equal(cards.length, 0);
    assert.equal(pickHighlight(cards), undefined);
  });

  it("keeps only live=YES rows with /itm/ or /p/ URLs", () => {
    const cards = trackerCardsFromCsv(LIVE_TRACKER);
    assert.equal(cards.length, 2);
    assert.deepEqual(
      cards.map((card) => card.id).sort(),
      ["100000000000", "222222222222"],
    );
    assert.equal(
      cards.some((card) => card.ebayUrl.includes("/usr/")),
      false,
    );
  });

  it("uses sort (then item id) for the highlight when no price column is present", () => {
    const cards = trackerCardsFromCsv(LIVE_TRACKER);
    const highlight = pickHighlight(cards);
    assert.equal(highlight?.id, "222222222222");
    assert.equal(highlight?.title.includes("Live Mid"), true);
    assert.equal(highlight?.price, undefined);
    assert.deepEqual(
      sortForCarousel(cards).map((card) => card.id),
      ["222222222222", "100000000000"],
    );
  });

  it("uses highest real price once a price column exists, tying on smaller item id", () => {
    const cards = trackerCardsFromCsv(PRICED_TRACKER);
    assert.equal(cards.length, 3);
    const highlight = pickHighlight(cards);
    assert.equal(highlight?.id, "100000000000");
    assert.equal(highlight?.price, 89);
    assert.equal(
      cards.find((card) => card.player === "No Url Yet"),
      undefined,
    );
  });
});

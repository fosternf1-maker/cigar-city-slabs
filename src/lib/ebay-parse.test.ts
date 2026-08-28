import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isXmlFeed,
  listingsFromBrowseSearch,
  listingsFromRssXml,
  pickMostExpensive,
  stripTrailingPrice,
} from "./ebay-parse.ts";

const RSS = `<?xml version="1.0"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>eBay Search: cigar_city_slabs</title>
    <item>
      <title>Cheap auto $4.99</title>
      <link>https://www.ebay.com/itm/111111111111</link>
      <description><![CDATA[<img src="https://i.ebayimg.com/images/g/abc/s-l140.jpg"> Price: $4.99]]></description>
    </item>
    <item>
      <title>Higher-end slab $89.00</title>
      <link>https://www.ebay.com/itm/222222222222</link>
      <description><![CDATA[Price: $89.00]]></description>
    </item>
    <item>
      <title>Tied at the top $89.00</title>
      <link>https://www.ebay.com/itm/100000000000</link>
      <description><![CDATA[Price: $89.00]]></description>
    </item>
    <item>
      <title>Store homepage must not count</title>
      <link>https://www.ebay.com/usr/cigar_city_slabs</link>
      <description>Price: $999.00</description>
    </item>
    <item>
      <title>No price on this one</title>
      <link>https://www.ebay.com/itm/333333333333</link>
      <description>A listing without a dollar amount</description>
    </item>
  </channel>
</rss>`;

describe("eBay seller feed parsing", () => {
  it("rejects HTML error pages as feeds", () => {
    assert.equal(isXmlFeed("<!DOCTYPE html><html><title>Error</title>"), false);
    assert.equal(isXmlFeed(RSS), true);
  });

  it("keeps only live /itm or /p listings with real prices", () => {
    const listings = listingsFromRssXml(RSS);
    assert.equal(listings.length, 3);
    assert.equal(
      listings.some((item) => item.url.includes("/usr/")),
      false,
    );
    assert.equal(
      listings.find((item) => item.itemId === "222222222222")?.title,
      "Higher-end slab",
    );
    assert.equal(
      listings.find((item) => item.itemId === "111111111111")?.imageUrl,
      "https://i.ebayimg.com/images/g/abc/s-l140.jpg",
    );
  });

  it("picks the highest price, then the smaller item id on a tie", () => {
    const listings = listingsFromRssXml(RSS);
    const highlight = pickMostExpensive(listings);
    assert.equal(highlight?.itemId, "100000000000");
    assert.equal(highlight?.price, 89);
    assert.equal(highlight?.title, "Tied at the top");
  });

  it("strips a trailing eBay RSS price from the title", () => {
    assert.equal(stripTrailingPrice("Mike Trout RC US $12.50"), "Mike Trout RC");
  });

  it("throws when the body is not a feed", () => {
    assert.throws(() => listingsFromRssXml("<html>Error Page | eBay</html>"));
  });

  it("filters Browse API rows to the named seller and live item URLs", () => {
    const listings = listingsFromBrowseSearch(
      {
        itemSummaries: [
          {
            itemId: "v1|555555555555|0",
            title: "Our slab",
            price: { value: "12.00", currency: "USD" },
            itemWebUrl: "https://www.ebay.com/itm/555555555555",
            image: { imageUrl: "https://i.ebayimg.com/images/g/xyz/s-l225.jpg" },
            seller: { username: "cigar_city_slabs" },
          },
          {
            itemId: "v1|666666666666|0",
            title: "Someone else's card",
            price: { value: "900.00", currency: "USD" },
            itemWebUrl: "https://www.ebay.com/itm/666666666666",
            seller: { username: "other_seller" },
          },
          {
            title: "No URL",
            price: { value: "3.00", currency: "USD" },
            seller: { username: "cigar_city_slabs" },
          },
        ],
      },
      "cigar_city_slabs",
    );

    assert.equal(listings.length, 1);
    assert.equal(listings[0]?.itemId, "555555555555");
    assert.equal(listings[0]?.price, 12);
    assert.equal(
      pickMostExpensive(listings)?.url,
      "https://www.ebay.com/itm/555555555555",
    );
  });
});

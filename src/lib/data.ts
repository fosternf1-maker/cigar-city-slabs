export type CardItem = {
  id: string;
  title: string;
  player?: string;
  set: string;
  year: string;
  grade?: string;
  grader?: "PSA" | "BGS" | "CGC" | "SGC" | "Raw";
  price: number;
  category: "singles" | "slabs" | "sealed" | "grails";
  image?: string;
  /** Required before a card can be shown as a buyable listing. */
  ebayUrl: string;
  description?: string;
};

/**
 * Live inventory is not wired on this site.
 * Do not add placeholder SKUs, fake prices, or tappable "products"
 * until each row has a real eBay item URL.
 */
export const cards: CardItem[] = [];

export const upcomingShows = [
  {
    id: "1",
    name: "Tampa Bay Card Show",
    date: "Coming Soon",
    location: "Tampa, FL",
    notes: "Details dropping soon — we'll post them here. Email or Whatnot works if you want a heads-up.",
  },
];

function handleFromUrl(url: string) {
  return url.replace(/\/+$/, "").split("/").pop() ?? "";
}

export const siteConfig = {
  name: "Cigar City Slabs",
  tagline: "Tampa's Trading Card Hangout",
  description:
    "Buy, trade, and resell trading cards in a fun environment. Anchored in Tampa, FL.",
  email: "cigarcityslabs@cigarcityslab.com",
  ebay: "https://www.ebay.com/usr/cigar_city_slabs",
  whatnot: "https://www.whatnot.com/user/cigarcityslab",
  x: "https://x.com/CigarCitySlabs",
  location: "Tampa, FL",
};

export const siteHandles = {
  ebay: handleFromUrl(siteConfig.ebay),
  whatnot: handleFromUrl(siteConfig.whatnot),
  x: handleFromUrl(siteConfig.x),
};

export { isLiveEbayItem } from "@/lib/tracker-parse";

export const shopLanes = [
  {
    id: "grails",
    title: "Grails",
    subtitle: "Higher-end heat",
    blurb: "The ones that make you pause. Hunt them on the grails desk — live ones list on eBay.",
    href: "/grails",
    external: false,
    accent: "magenta" as const,
  },
  {
    id: "slabs",
    title: "Graded slabs",
    subtitle: "Already in plastic",
    blurb: "PSA, BGS, and friends. Live slabs are on the eBay store, not a fake grid here.",
    href: siteConfig.ebay,
    external: true,
    accent: "cyan" as const,
  },
  {
    id: "singles",
    title: "Raw singles",
    subtitle: "Junk wax to modern",
    blurb: "Raw cards looking for a binder. We don't mix graded slabs into this bucket.",
    href: siteConfig.ebay,
    external: true,
    accent: "cyan" as const,
  },
  {
    id: "sealed",
    title: "Sealed wax",
    subtitle: "Factory sealed",
    blurb: "Hobby boxes and sealed product when we've got it. Check eBay for what's actually in stock.",
    href: siteConfig.ebay,
    external: true,
    accent: "cyan" as const,
  },
];

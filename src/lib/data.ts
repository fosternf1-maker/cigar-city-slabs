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
  ebayUrl?: string;
  description?: string;
};

// Placeholder inventory — replace with real cards later
// All sales currently push to eBay
export const cards: CardItem[] = [
  {
    id: "1",
    title: "Mike Trout Rookie",
    player: "Mike Trout",
    set: "2011 Topps Update",
    year: "2011",
    grade: "10",
    grader: "PSA",
    price: 1850,
    category: "grails",
    description: "Iconic Trout RC. Clean centering, sharp corners.",
  },
  {
    id: "2",
    title: "Patrick Mahomes Optic Rated Rookie",
    player: "Patrick Mahomes",
    set: "2017 Donruss Optic",
    year: "2017",
    grade: "9.5",
    grader: "BGS",
    price: 720,
    category: "grails",
    description: "High-end Mahomes RC in Optic.",
  },
  {
    id: "3",
    title: "Shohei Ohtani Rookie",
    player: "Shohei Ohtani",
    set: "2018 Topps Chrome",
    year: "2018",
    grade: "10",
    grader: "PSA",
    price: 950,
    category: "slabs",
  },
  {
    id: "4",
    title: "Luka Doncic Prizm Silver",
    player: "Luka Doncic",
    set: "2018-19 Prizm",
    year: "2018",
    grade: "10",
    grader: "PSA",
    price: 480,
    category: "slabs",
  },
  {
    id: "5",
    title: "Joe Burrow Optic",
    player: "Joe Burrow",
    set: "2020 Donruss Optic",
    year: "2020",
    grade: "10",
    grader: "PSA",
    price: 210,
    category: "slabs",
  },
  {
    id: "6",
    title: "2023 Topps Chrome Hobby Box",
    set: "2023 Topps Chrome",
    year: "2023",
    grader: "Raw",
    price: 189,
    category: "sealed",
    description: "Factory sealed hobby box.",
  },
  {
    id: "7",
    title: "Ja Morant Prizm",
    player: "Ja Morant",
    set: "2019-20 Prizm",
    year: "2019",
    grade: "9",
    grader: "PSA",
    price: 145,
    category: "singles",
  },
  {
    id: "8",
    title: "Justin Herbert Optic Rated Rookie",
    player: "Justin Herbert",
    set: "2020 Donruss Optic",
    year: "2020",
    grade: "10",
    grader: "PSA",
    price: 175,
    category: "slabs",
  },
  {
    id: "9",
    title: "Ken Griffey Jr. Upper Deck",
    player: "Ken Griffey Jr.",
    set: "1989 Upper Deck",
    year: "1989",
    grade: "9",
    grader: "PSA",
    price: 320,
    category: "grails",
    description: "Classic Griffey RC. Strong eye appeal.",
  },
  {
    id: "10",
    title: "Victor Wembanyama Prizm Silver",
    player: "Victor Wembanyama",
    set: "2023-24 Prizm",
    year: "2023",
    grade: "10",
    grader: "PSA",
    price: 390,
    category: "slabs",
  },
  {
    id: "11",
    title: "2024 Panini Prizm Football Hobby",
    set: "2024 Prizm Football",
    year: "2024",
    grader: "Raw",
    price: 249,
    category: "sealed",
  },
  {
    id: "12",
    title: "Ronald Acuna Jr. Chrome",
    player: "Ronald Acuña Jr.",
    set: "2018 Topps Chrome",
    year: "2018",
    grade: "10",
    grader: "PSA",
    price: 265,
    category: "slabs",
  },
];

export const upcomingShows = [
  {
    id: "1",
    name: "Tampa Bay Card Show",
    date: "Coming Soon",
    location: "Tampa, FL",
    notes: "Details dropping soon — follow us on X for updates.",
  },
];

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

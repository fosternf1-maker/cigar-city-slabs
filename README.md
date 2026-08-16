# Cigar City Slabs

Tampa-based trading card shop site — buy, trade, resell in a fun environment.

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to your GitHub
2. Import the project in Vercel
3. Point `cigarcityslab.com` DNS to Vercel (or keep SquareSpace DNS and add the domain in Vercel)

## Site map

- `/` — Home (hero, grails teaser, fresh stock)
- `/shop` — Scrollable card grid + detail modal (sales push to eBay)
- `/shows` — Upcoming in-person card shows
- `/live` — Whatnot stream link
- `/about` — Story / vibe
- `/contact` — Email + socials

## Key links (edit in `src/lib/data.ts`)

- eBay: https://www.ebay.com/usr/cigar_city_slabs
- Whatnot: https://www.whatnot.com/user/cigarcityslab
- X: https://x.com/CigarCitySlabs
- Email: cigarcityslabs@cigarcityslab.com

## Notes

- Inventory is currently placeholder data in `src/lib/data.ts`. Replace with real cards (or later wire an API / CMS).
- All “Buy” CTAs go to the eBay store for now.
- Design: dark base, cyan + magenta neon accents, calmer treatment for the Grails section.
- Logo slot is ready — drop an image into `public/` and wire it in the Header when you have it.

## Future ideas (your “Blockbuster walk-through” vision)

- Immersive aisle-style navigation for browsing inventory
- Real product images + better filtering
- Show calendar with RSVP / map links
- Live “on air” indicator when streaming

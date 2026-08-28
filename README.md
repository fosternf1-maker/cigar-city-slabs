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

- `/` — Home (hero, grails desk, shop lanes)
- `/shop` — Honest shop desk + eBay store CTA (no fake SKUs)
- `/grails` — Grails desk; live listings only if real eBay item URLs exist
- `/shows` — Upcoming in-person card shows (coming soon is fine)
- `/live` — Whatnot stream link
- `/about` — Story / vibe
- `/contact` — Email + socials (mailto, no form)
- `/privacy` — Short privacy note

## Key links (edit in `src/lib/data.ts`)

- eBay: https://www.ebay.com/usr/cigar_city_slabs
- Whatnot: https://www.whatnot.com/user/cigarcityslab
- X: https://x.com/CigarCitySlabs
- Email: cigarcityslabs@cigarcityslab.com

## Notes

- Live inventory is **not** wired. Keep `cards` empty until each row has a real eBay item URL (`/itm/` or `/p/`). Do not add placeholder SKUs or prices.
- Shop and grails CTAs go to the eBay store until real item URLs exist.
- Whatnot handle on the site is taken from the Whatnot URL so About copy cannot drift.
- Design: dark base, cyan + magenta neon accents, calmer treatment for grails.
- Logo slot is ready — drop an image into `public/` and wire it in the Header when you have it.

## Future ideas (your “Blockbuster walk-through” vision)

- Immersive aisle-style navigation for browsing inventory
- Real product images + better filtering
- Show calendar with RSVP / map links
- Live “on air” indicator when streaming

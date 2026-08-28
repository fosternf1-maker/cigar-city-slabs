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

- `/` — Home (hero, today's highlight from the shop tracker, grails desk, shop lanes)
- `/shop` — Honest shop desk, today's highlight, live-listing carousel, eBay store CTA
- `/grails` — Grails desk + today's highlight from the tracker
- `/shows` — Upcoming in-person card shows (coming soon is fine)
- `/live` — Whatnot stream link
- `/about` — Story / vibe
- `/contact` — Email + socials (mailto, no form)
- `/privacy` — Short privacy note (no email collection on this site)

Unknown URLs use a branded 404 with a home link (header/footer still wrap it).

## Key links (edit in `src/lib/data.ts`)

- eBay: https://www.ebay.com/usr/cigar_city_slabs
- Whatnot: https://www.whatnot.com/user/cigarcityslab
- X: https://x.com/CigarCitySlabs
- Email: cigarcityslabs@cigarcityslab.com

## Notes

- Keep `cards` empty until each row has a real eBay item URL (`/itm/` or `/p/`). Do not add placeholder SKUs or prices.
- **Today's highlight** and the shop carousel read the **Highlighted Cards Google Sheet tracker**. A row shows only when `live=YES` **and** `ebay_url` is a real eBay item URL. Instruction rows and blank URLs are skipped.
- If no `price` column (or no prices filled in), the highlight uses `sort`, then item id. Once a real `price` column exists, the highlight is the highest-priced live row. Ties pick the smaller item id. Missing prices are not invented.
- Photos come from `photo_filename` (a Drive file id or https URL). The Highlighted Cards Drive folder is for Nathan's files — we never scrape eBay or PSA.
- Refresh is ISR (hourly, which is at least daily). Empty or unreachable tracker → honest fallback that still links to the eBay store.
- Whatnot handle on the site is taken from the Whatnot URL so About copy cannot drift.
- Design: dark base, cyan + magenta neon accents, calmer treatment for grails.

## Shop tracker (source of truth)

Spreadsheet: [Highlighted Cards tracker](https://docs.google.com/spreadsheets/d/1n4PxXbJ5g-Gx1jhvAXWnsWhX87k3R9lQ71vjzf0V9V0) (`Sheet1`).

Columns: `live`, `sort`, `player`, `year`, `set`, `grade`, `ebay_url`, `photo_filename`, `notes`. An optional `price` column is used for Today's highlight only when it contains a real listing price.

Photo folder: [Highlighted Cards](https://drive.google.com/drive/folders/1F_tNA7lW-RbFVaTyFaTanQOmER0eRxTt).

The site fetches the sheet as CSV. **No eBay API key is used.** Share the tracker (and the photo folder, if you want photos to render) as **Anyone with the link → Viewer** in Google Drive so Vercel can read it. Do not paste listing URLs in chat — put them in `ebay_url` on the sheet. Do not create eBay listings from this repo.

## Future ideas (your “Blockbuster walk-through” vision)

- Immersive aisle-style navigation for browsing inventory
- Real product images + better filtering
- Show calendar with RSVP / map links
- Live “on air” indicator when streaming

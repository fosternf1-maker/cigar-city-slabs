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

- `/` — Home (hero, today's eBay highlight, grails desk, shop lanes)
- `/shop` — Honest shop desk, today's highlight, eBay store CTA (no fake SKUs)
- `/grails` — Grails desk + today's highest live eBay listing
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
- **Today's highlight** is the highest-priced *current* listing from `cigar_city_slabs`. It is recomputed at most daily (ISR, 24h). Ties pick the smaller item id. If the feed is empty or fails, the site shows an honest fallback that still points at the eBay store — it will not invent a card, price, or item id.
- Shop and grails CTAs go to the eBay store until additional real item URLs exist.
- Whatnot handle on the site is taken from the Whatnot URL so About copy cannot drift.
- Design: dark base, cyan + magenta neon accents, calmer treatment for grails.
- Logo slot is ready — drop an image into `public/` and wire it in the Header when you have it.

## eBay inventory feed

The highlight prefers eBay's public seller RSS (`_ssn=cigar_city_slabs&_rss=1`). eBay often **403s datacenter IPs** (Vercel included), so RSS may fail in production even though it is the right public feed.

If RSS is blocked, the site uses the official **Browse API** when these Vercel env vars are set (Production + Preview):

| Variable | Where to get it |
| --- | --- |
| `EBAY_CLIENT_ID` | [eBay Developers Program](https://developer.ebay.com/) application keyset (Production Client ID) |
| `EBAY_CLIENT_SECRET` | The matching Client Secret. Do not commit it. |

Create a keyset, enable the **Buy Browse** / client-credentials scope (`https://api.ebay.com/oauth/api_scope`), then add both values in the Vercel project → Settings → Environment Variables. Redeploy after saving.

There is no eBay credential in this repo. Do not paste a dummy app id to "make it look live." Without a working RSS response or real keys, the highlight stays on the honest empty/fallback state.

## Future ideas (your “Blockbuster walk-through” vision)

- Immersive aisle-style navigation for browsing inventory
- Real product images + better filtering
- Show calendar with RSVP / map links
- Live “on air” indicator when streaming

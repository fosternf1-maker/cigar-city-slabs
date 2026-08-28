import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <p className="label-90s">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
        That aisle is empty
      </h1>
      <p className="mx-auto mt-4 max-w-md text-zinc-400">
        No page at this URL. Head home, hit the shop desk, or buy on eBay —
        don&apos;t get stuck on a blank Next.js screen.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm"
        >
          Back home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
        >
          Shop desk
        </Link>
        <a
          href={siteConfig.ebay}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
        >
          eBay store
        </a>
      </div>
    </div>
  );
}

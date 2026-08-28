import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "Privacy",
  description: "How Cigar City Slabs handles information on cigarcityslab.com.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="label-90s">Privacy</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Privacy
      </h1>
      <p className="mt-4 text-zinc-400">
        Short version: this website does not collect email addresses.
      </p>

      <div className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-300">
        <p>
          cigarcityslab.com has no signup form, no newsletter field, and no
          account system. If you tap Contact, your own mail app opens a message
          to{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[var(--neon-cyan)] transition hover:underline"
          >
            {siteConfig.email}
          </a>
          . We only see that address if you send the email, and we use it to
          reply about cards, shows, or trades.
        </p>
        <p>
          Shopping and live streams happen on eBay and Whatnot. Those sites
          have their own privacy policies. We don&apos;t scrape or republish
          your purchase history here.
        </p>
        <p>
          Hosting may log normal request data (pages loaded, browser, IP) the
          way most websites do. We don&apos;t run a marketing pixel or an email
          capture pop-up on this site.
        </p>
      </div>
    </div>
  );
}

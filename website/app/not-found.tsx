import Link from "next/link";
import { MarketingNav, MarketingFooter } from "@/components/MarketingLayout";
export default function NotFound() {
  return (
    <>
      <MarketingNav />
      <main id="main" className="wrap brand-page">
        <p className="eyebrow">404 · Page not found</p>
        <h1>A different path.</h1>
        <p>
          This page does not exist. Start with the docs or return to Glimpse.
        </p>
        <Link prefetch={false} className="button" href="/docs/">
          Read the documentation
        </Link>
      </main>
      <MarketingFooter />
    </>
  );
}

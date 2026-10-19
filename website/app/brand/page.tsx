import Link from "next/link";
import Image from "next/image";
import { MarketingNav, MarketingFooter } from "@/components/MarketingLayout";
export const metadata = {
  title: "Brand & assets · Glimpse",
  description: "Glimpse logos and social preview assets.",
};
export default function BrandPage() {
  return (
    <>
      <MarketingNav />
      <main id="main" className="wrap brand-page">
        <p className="eyebrow">A little perspective</p>
        <h1>Glimpse, at a glance.</h1>
        <p>
          Use these assets when linking to Glimpse. Keep the mark intact and
          leave it room to breathe.
        </p>
        <div className="brand-assets">
          <Image
            src="/logo.svg"
            alt="Glimpse geometric G monogram"
            width={96}
            height={96}
          />
          <Link prefetch={false} className="button" href="/logo.svg" download>
            Download logo for light backgrounds
          </Link>
          <Link
            prefetch={false}
            className="button"
            href="/logo-dark.svg"
            download
          >
            Download logo for dark backgrounds
          </Link>
          <Link
            prefetch={false}
            className="text-link"
            href="/og-image.png"
            download
          >
            Download social image
          </Link>
        </div>
        <Image
          className="brand-og"
          src="/og-image.png"
          alt="Glimpse: small changes, better perspective. A local diff with inline review feedback."
          width={1200}
          height={630}
          unoptimized
        />
      </main>
      <MarketingFooter />
    </>
  );
}

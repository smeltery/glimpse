import Link from "next/link";
import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@/styles/globals.css";

const socialImage =
  "https://raw.githubusercontent.com/smeltery/glimpse/main/website/public/og-image.png";
export const metadata: Metadata = {
  title: "Glimpse — Small changes. Better perspective.",
  description:
    "Review Git diffs in your browser, leave inline feedback, and keep your coding agent in the loop. One Go binary for a clearer local code review.",
  openGraph: {
    title: "Glimpse — Small changes. Better perspective.",
    description: "Your code changed. See the whole story.",
    siteName: "Glimpse",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Glimpse local diff viewer with inline review feedback",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: [socialImage] },
  icons: { icon: "/logo.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top">
        <Link prefetch={false} className="skip" href="#main">
          Skip to content
        </Link>
        {children}
      </body>
    </html>
  );
}

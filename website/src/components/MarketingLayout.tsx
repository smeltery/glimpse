import Link from "next/link";
import { Brand, repository } from "./Brand";
import { SiteDialogs } from "./SiteDialogs";

export function MarketingNav() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link prefetch={false} href="/#features">
            Explore Glimpse
          </Link>
          <Link prefetch={false} href="/docs/">
            Getting started
          </Link>
          <Link prefetch={false} href="/docs/workflows/">
            Our approach
          </Link>
        </nav>
        <SiteDialogs />
      </div>
    </header>
  );
}

const groups = [
  {
    title: "The toolkit",
    links: [
      ["Diff viewer", "/#features"],
      ["Agent reviews", "/docs/workflows/"],
      ["Local API", "/docs/api/"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Brand & assets", "/brand/"],
      ["For agents", `${repository}/tree/main/.skills`],
      ["Getting started", "/docs/"],
      ["CLI reference", "/docs/cli/"],
      ["Contributing", "/docs/development/"],
    ],
  },
  {
    title: "In the open",
    links: [
      ["About Smeltery", "https://github.com/smeltery"],
      ["GitHub repository", repository],
      ["Feedback & issues", `${repository}/issues`],
      ["Releases", `${repository}/releases`],
      ["License", `${repository}/blob/main/LICENSE`],
    ],
  },
];
export function MarketingFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              A little perspective.
              <br />A lot better code.
            </p>
            <span>A clearer review for thoughtful builders.</span>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => (
                <Link prefetch={false} key={label} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Smeltery</span>
          <Link prefetch={false} href={`${repository}/blob/main/LICENSE`}>
            PolyForm Shield license
          </Link>
          <span className="footer-note">Built for the way you work.</span>
          <Link prefetch={false} href="#top">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

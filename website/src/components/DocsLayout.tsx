import Link from "next/link";
import { Github } from "lucide-react";
import { Brand, repository } from "./Brand";
import { SiteDialogs } from "./SiteDialogs";
import { DocActions } from "./DocActions";
import { DocEnhancements } from "./DocEnhancements";
import { pages, docHref } from "@/lib/catalog";
import { readDoc } from "@/lib/docs";

function DocNavigation({ slug }: { slug: string }) {
  return (
    <nav aria-label="Documentation pages">
      {["Start here", "Guides", "API reference", "Contributing"].map(
        (group) => (
          <div key={group}>
            <p className="sidebar-group">{group}</p>
            {pages
              .filter((page) => page.group === group)
              .map((page) => (
                <Link
                  prefetch={false}
                  key={page.slug}
                  href={docHref(page.slug)}
                  aria-current={slug === page.slug ? "page" : undefined}
                >
                  {page.title}
                </Link>
              ))}
          </div>
        ),
      )}
    </nav>
  );
}
export function DocsLayout({
  doc,
}: {
  doc: NonNullable<ReturnType<typeof readDoc>>;
}) {
  const index = pages.findIndex((page) => page.slug === doc.slug);
  const next = pages[index + 1];
  const previous = pages[index - 1];
  return (
    <div className="docs-shell">
      <header className="docs-header">
        <Brand />
        <span className="docs-label">Documentation</span>
        <nav aria-label="Documentation">
          <Link prefetch={false} href="/docs/api/">
            API reference
          </Link>
          <Link prefetch={false} href="/docs/workflows/">
            Examples
          </Link>
          <Link prefetch={false} href={repository}>
            <Github size={17} />
            GitHub
          </Link>
        </nav>
        <SiteDialogs docs />
      </header>
      <aside className="docs-sidebar">
        <DocNavigation slug={doc.slug} />
      </aside>
      <main id="main" className="docs-main">
        <details className="docs-mobile-nav">
          <summary>Documentation pages</summary>
          <DocNavigation slug={doc.slug} />
        </details>
        <article className="doc-article">
          <p className="eyebrow">Developer documentation</p>
          <h1>
            {doc.slug === "api" ? (
              <>
                Changes in.
                <br />
                <em>Perspective out.</em>
              </>
            ) : (
              doc.title
            )}
          </h1>
          <p className="doc-lead">{doc.description}</p>
          {doc.slug === "api" && (
            <div className="doc-callout">
              Local, unauthenticated, and part of your running viewer. Use the
              port reported by Glimpse for your repository.
            </div>
          )}
          <div
            className="doc-content"
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
          <DocEnhancements key={doc.slug} />
          <div className="mobile-doc-actions">
            <DocActions
              key={doc.slug}
              markdown={doc.markdown}
              file={doc.file}
            />
          </div>
          <nav className="doc-pagination" aria-label="Pagination">
            {previous && (
              <Link prefetch={false} href={docHref(previous.slug)}>
                <small>Previous</small>
                {previous.title}
              </Link>
            )}
            {next && (
              <Link prefetch={false} href={docHref(next.slug)}>
                <small>Next</small>
                {next.title}
              </Link>
            )}
          </nav>
        </article>
      </main>
      <aside className="docs-toc" aria-label="On this page">
        <p className="sidebar-group">On this page</p>
        {doc.headings.map((heading) => (
          <Link prefetch={false} key={heading.id} href={`#${heading.id}`}>
            {heading.text}
          </Link>
        ))}
        <DocActions key={doc.slug} markdown={doc.markdown} file={doc.file} />
      </aside>
    </div>
  );
}

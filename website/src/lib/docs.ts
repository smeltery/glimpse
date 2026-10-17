import fs from "node:fs";
import path from "node:path";
import { Marked, Renderer } from "marked";
import { pages, docHref } from "./catalog";

export const docsRoot = path.resolve(process.cwd(), "../docs");
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function readDoc(slug: string) {
  const page = pages.find((item) => item.slug === slug);
  if (!page) return null;
  const markdown = fs.readFileSync(path.join(docsRoot, page.file), "utf8");
  const headings: { id: string; text: string }[] = [];
  const parser = new Marked({
    renderer: {
      heading({ tokens, depth, text }) {
        if (depth === 1) return "";
        const id = headingId(text);
        if (depth === 2) headings.push({ id, text });
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>`;
      },
      link({ href, tokens }) {
        const [target, fragment] = href.split("#");
        if (target.endsWith(".md") && !target.startsWith("http")) {
          const resolved = path.posix.normalize(
            path.posix.join(path.posix.dirname(page.file), target),
          );
          const found = pages.find((item) => item.file === resolved);
          if (!found)
            throw new Error(
              `Unknown documentation link: ${page.file}: ${href}`,
            );
          href = docHref(found.slug) + (fragment ? `#${fragment}` : "");
        }
        return `<a href="${escape(href)}">${this.parser.parseInline(tokens)}</a>`;
      },
      code({ text, lang }) {
        if (lang === "mermaid")
          return `<div class="diagram" tabindex="0" role="region" aria-label="Workflow diagram"><pre class="mermaid" tabindex="0">${escape(text)}</pre></div>`;
        return `<div class="doc-code"><div class="code-label">${escape(lang || "text")}</div><pre tabindex="0"><code>${escape(text)}</code></pre></div>`;
      },
      table(token) {
        return `<div class="table-scroll" tabindex="0" role="region" aria-label="Reference table">${new Renderer().table.call(this, token)}</div>`;
      },
    },
  });
  const html = parser.parse(markdown) as string;
  return { ...page, markdown, html, headings };
}

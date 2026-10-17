import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

async function markdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const name = path.join(directory, entry.name);
      return entry.isDirectory()
        ? markdownFiles(name)
        : Promise.resolve(name.endsWith(".md") ? [name] : []);
    }),
  );
  return files.flat();
}
const files = ["README.md", ...(await markdownFiles("docs"))];
const diagrams: { file: string; source: string }[] = [];
for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(/```mermaid\s*\n([\s\S]*?)```/g))
    diagrams.push({ file, source: match[1] });
  for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    const target = href.split("#")[0];
    await stat(path.resolve(path.dirname(file), target)).catch(() => {
      throw new Error(`${file}: broken link ${href}`);
    });
  }
}
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto("about:blank");
  await page.addScriptTag({ path: "node_modules/mermaid/dist/mermaid.min.js" });
  for (const diagram of diagrams) {
    try {
      await page.evaluate(async (source) => {
        const mermaid = (
          window as unknown as {
            mermaid: {
              initialize: (options: object) => void;
              parse: (source: string) => Promise<unknown>;
            };
          }
        ).mermaid;
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
        await mermaid.parse(source);
      }, diagram.source);
    } catch (error) {
      throw new Error(`${diagram.file}: invalid Mermaid`, { cause: error });
    }
  }
} finally {
  await browser.close();
}
console.log(
  `Validated ${files.length} Markdown files and ${diagrams.length} Mermaid diagrams.`,
);

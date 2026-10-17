import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const config = JSON.parse(
  readFileSync(process.argv[2] || "scripts/loc-budgets.json", "utf8"),
);
const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean);
const counts = new Map<string, number>();
let failures = 0;
for (const file of new Set(files)) {
  if (
    !existsSync(file) ||
    /(^|\/)(node_modules|\.next|out|\.flox|assets|public)\//.test(file)
  )
    continue;
  if (!/\.(go|tsx?|m?js|css|md|ya?ml|json|toml)$/.test(file)) continue;
  const directory = path.dirname(file);
  counts.set(directory, (counts.get(directory) || 0) + 1);
  const lines = readFileSync(file, "utf8").trimEnd().split("\n").length;
  const budget =
    config.files[file]?.limit ||
    (file.endsWith(".css") ? config.css_lines : config.default_lines);
  if (lines > budget) {
    console.error(`${file}: ${lines} lines > budget ${budget}`);
    failures++;
  }
}
for (const [directory, count] of counts) {
  if (count > config.directory_files) {
    console.error(
      `${directory}: ${count} files > budget ${config.directory_files}`,
    );
    failures++;
  }
}
if (failures) process.exit(1);
console.log(`LOC and directory budgets passed (${counts.size} directories).`);

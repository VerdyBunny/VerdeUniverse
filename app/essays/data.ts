import fs from "node:fs";
import path from "node:path";
import { essays } from "../content";

// My "Real me" essays live in essays/<slug>/index.md (copied from my craft blog);
// their pictures sit in public/essays/<slug>/.
const DIR = path.join(process.cwd(), "essays");

export function getEssay(slug: string) {
  const meta = essays.find((e) => e.slug === slug);
  const file = path.join(DIR, slug, "index.md");
  if (!meta || !fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  // the 【topic】 at the start of the craft title becomes the small label above it
  const title = fm?.[1].match(/^title:\s*(.*)$/m)?.[1] ?? "";
  const topic = title.match(/^\s*【([^】]+)】/)?.[1] ?? null;
  const body = (fm ? raw.slice(fm[0].length) : raw)
    .replace(/^import .*$/gm, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  // the essay's headings, for the side menu
  const toc = [...body.matchAll(/^(##|###)\s+(.+)$/gm)].map((m) => ({
    id: slugify(m[2]),
    text: m[2].replace(/[*_`]/g, "").trim(),
    level: (m[1].length === 2 ? 2 : 3) as 2 | 3,
  }));
  return { meta, topic, body, toc };
}

export const slugify = (t: string) =>
  t.toLowerCase().replace(/[*_`]/g, "").replace(/[^a-z0-9\u3400-\u9fff]+/g, "-").replace(/^-|-$/g, "");

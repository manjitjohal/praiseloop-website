// One-off: generate an on-brand, TEXT-FREE decorative backdrop for the
// homepage "PraiseLoop intelligence flow" loop ring. Saves to public/.
//
//   node scripts/gen-home-art.mjs                 # 3 options → public/loop-art-N.png
//   node scripts/gen-home-art.mjs --count=4 --name=loop-art
//
// Requires FAL_KEY in .env.local.

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = resolve(repoRoot, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnvLocal();

const FAL_KEY = process.env.FAL_KEY || process.env.FAL_API_KEY;
if (!FAL_KEY) { console.error("Missing FAL_KEY in .env.local"); process.exit(1); }

const arg = (name, def) => {
  const m = process.argv.find((a) => a.startsWith(`--${name}=`));
  return m ? m.split("=").slice(1).join("=") : def;
};
const model = arg("model", "fal-ai/recraft-v3");
const count = Math.max(1, parseInt(arg("count", "3"), 10) || 3);
const name = arg("name", "loop-art");

const PROMPT =
  "A minimal abstract backdrop built from several thin concentric circular orbit rings that suggest a continuous loop, " +
  "with a few tiny dots orbiting along the rings and a soft radial glow. A large calm empty circle of negative space in the centre. " +
  "Palette: warm cream #FBF6EF background, soft muted teal #1B6B6B thin ring lines, a single small vivid orange #F26522 dot as the ONLY bright accent. " +
  "Style: premium, matte, editorial, extremely subtle and faint, lots of breathing room, flat with a hint of paper grain. " +
  "Absolutely no text, no words, no letters, no numbers, no typography, no labels, no logos, no watermark, no signature, " +
  "no people, no faces, no hands, no UI, no charts, no arrows.";

const body = { prompt: PROMPT, image_size: "square_hd" };
if (model.includes("recraft")) body.style = "digital_illustration";

const outDir = resolve(repoRoot, "public");
mkdirSync(outDir, { recursive: true });
console.log(`\nModel: ${model}\nGenerating ${count} backdrop option(s) → public/${name}-*.png\n`);

for (let i = 1; i <= count; i++) {
  const res = await fetch(`https://fal.run/${model}`, {
    method: "POST",
    headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error(`fal error ${res.status}: ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  const url = data?.images?.[0]?.url;
  if (!url) { console.error("No image URL:", JSON.stringify(data).slice(0, 300)); process.exit(1); }
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  writeFileSync(resolve(outDir, `${name}-${i}.png`), buf);
  console.log(`  ✓ ${name}-${i}.png  (${(buf.length / 1024).toFixed(0)} KB)`);
}
console.log("\nDone.\n");

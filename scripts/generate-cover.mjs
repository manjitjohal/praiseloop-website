// Generates on-brand blog cover art via fal.ai and saves previews to
// public/blog-covers/ (web-viewable at http://localhost:3000/blog-covers/...).
//
// Requires FAL_KEY in .env.local (get one at fal.ai/dashboard/keys).
//
//   node scripts/generate-cover.mjs                          # P1 iceberg concept, 2 images
//   node scripts/generate-cover.mjs --count=3
//   node scripts/generate-cover.mjs --model=fal-ai/flux/dev
//   node scripts/generate-cover.mjs --name=retention --prompt="..."

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = resolve(repoRoot, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnvLocal();

const FAL_KEY = process.env.FAL_KEY || process.env.FAL_API_KEY;
if (!FAL_KEY) {
  console.error("\nMissing FAL_KEY. Add it to .env.local:\n  FAL_KEY=...\n(get a key at fal.ai/dashboard/keys)\n");
  process.exit(1);
}

const arg = (name, def) => {
  const m = process.argv.find((a) => a.startsWith(`--${name}=`));
  return m ? m.split("=").slice(1).join("=") : def;
};
const model = arg("model", "fal-ai/recraft-v3");
const count = Math.max(1, parseInt(arg("count", "2"), 10) || 2);
const name = arg("name", "p1-cover");

// The brand brief — baked in so every cover is consistent and on-palette.
// Illustration direction: clean editorial vector, warm cream + navy + teal, one orange accent, no text.
const BRAND =
  "Style: clean editorial vector illustration, flat matte shapes with subtle paper grain, " +
  "lots of calm negative space, premium and confident. " +
  "Palette: warm cream #FAF8F5 sky, deep navy #16232B and #010C14 water, teal #075056 ice, " +
  "with a SINGLE small vivid orange #FF5B04 accent as the only bright highlight. " +
  "Absolutely no text, no words, no letters, no numbers, no typography, no captions, no labels, " +
  "no logos, no watermark, no signature, no charts, no UI, no people, no faces, no hands.";

const CONCEPT = arg(
  "prompt",
  "A serene minimalist illustration of a single iceberg. Its small snow-white tip rises above a calm waterline " +
    "into a warm cream sky; a much larger translucent teal mass is submerged below in deep navy water, revealing " +
    "the hidden bulk beneath the surface. A single small vivid orange sun sits low near the horizon as the only warm accent. " +
    "Calm, empty and spacious — no birds, no animals, no boats, no extra land, only minimal soft clouds."
);

const prompt = `${CONCEPT} ${BRAND}`;

const body = { prompt, image_size: "landscape_16_9" };
if (model.includes("recraft")) body.style = "digital_illustration";

const outDir = resolve(repoRoot, "public", "blog-covers");
mkdirSync(outDir, { recursive: true });

console.log(`\nModel: ${model}\nSaving to: public/blog-covers/\nGenerating ${count} image(s)…\n`);

for (let i = 1; i <= count; i++) {
  const res = await fetch(`https://fal.run/${model}`, {
    method: "POST",
    headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`\nfal error ${res.status}: ${await res.text()}\n`);
    process.exit(1);
  }
  const data = await res.json();
  const url = data?.images?.[0]?.url;
  if (!url) {
    console.error("\nNo image URL in response:\n", JSON.stringify(data).slice(0, 400), "\n");
    process.exit(1);
  }
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  const file = resolve(outDir, `${name}-${i}.png`);
  writeFileSync(file, buf);
  console.log(`  ✓ ${name}-${i}.png  (${(buf.length / 1024).toFixed(0)} KB)  →  http://localhost:3000/blog-covers/${name}-${i}.png`);
}

console.log(`\nDone. View the localhost URLs above, or open public/blog-covers/.\n`);

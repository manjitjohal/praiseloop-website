// Uploads a local image to Sanity and sets it as a blog post's featuredImage.
//
//   node scripts/set-cover.mjs --file=public/blog-covers/p1-final-2.png \
//        --post=post-true-cost-of-turnover-gcc --alt="..."
//
// Requires NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";
import { createClient } from "@sanity/client";

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

const arg = (name, def) => {
  const m = process.argv.find((a) => a.startsWith(`--${name}=`));
  return m ? m.split("=").slice(1).join("=") : def;
};

const file = arg("file");
const postId = arg("post");
const alt = arg("alt", "");

if (!file || !postId) {
  console.error("\nUsage: node scripts/set-cover.mjs --file=<path> --post=<postId> [--alt=...]\n");
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-15";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("\nMissing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local\n");
  process.exit(1);
}

const filePath = resolve(repoRoot, file);
if (!existsSync(filePath)) {
  console.error(`\nFile not found: ${filePath}\n`);
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

try {
  console.log(`\nUploading ${basename(filePath)} …`);
  const asset = await client.assets.upload("image", readFileSync(filePath), {
    filename: basename(filePath),
  });
  console.log(`  ✓ asset: ${asset._id}`);

  await client
    .patch(postId)
    .set({
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        ...(alt ? { alt } : {}),
      },
    })
    .commit();

  console.log(`  ✓ set as featuredImage on ${postId}\n`);
} catch (err) {
  console.error("\nFailed:\n", err?.message || err, "\n");
  process.exit(1);
}

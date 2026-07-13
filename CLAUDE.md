# CLAUDE.md — PraiseLoop Marketing Website

Guidance for Claude Code when working in this repo. The user's email is duncan@buildink.co.

Marketing site for **PraiseLoop** (performance-linked employee recognition) with a Sanity-backed blog. Deployed on **Vercel**.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — design tokens & component classes live in `src/app/globals.css`
- **Sanity CMS v5** — powers the blog; Studio is embedded at `/studio`

## Commands

- `npm run dev` — dev server (**never start automatically — always ask first**)
- `npm run build` — production build (safe to run for verification)
- `npm run lint` — ESLint

## Project structure

| Path | What it is |
|------|-----------|
| `src/app/page.tsx` → `src/components/LandingPage.tsx` | Homepage — **fully static**, no CMS |
| `src/app/demo/page.tsx` | Demo-request form (`/demo`) |
| `src/app/blog/page.tsx` | Blog listing (`/blog`) — featured post + card grid |
| `src/app/blog/[slug]/page.tsx` | Blog post — Portable Text body, SEO/OG metadata, series links |
| `src/app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio (`/studio`) |
| `src/components/SiteHeader.tsx` / `SiteFooter.tsx` | Shared nav/footer for secondary pages |
| `src/lib/sanity.ts` | **Resilient** read-only blog data layer (client, image builder, queries, labels, types) |
| `sanity/schemaTypes/blogPost.ts` | Blog post schema (content model — see below) |
| `sanity/lib/queries.ts` | GROQ queries (list, by-slug w/ pillar+clusters) |
| `sanity/lib/client.ts` | Studio/config client — **throws** if env is missing (do not use for public reads) |
| `scripts/import-blog-post.mjs` | Creates the first pillar post (P1) via the Sanity API |
| `DESIGN.md` | Design system reference |

## Design system

Colors, buttons (`.btn`, `.btn-primary`), `.eyebrow`, `.container`, cards, and mock UIs are all defined in `src/app/globals.css`. **Reuse existing classes; match the surrounding style before adding new CSS.** Warm palette on `--surface`, orange accent `--orange` (#FF5B04), navy/teal supporting tones. See `DESIGN.md`.

## Sanity & environment variables

The blog reads from Sanity. Set these in `.env.local` locally **and** in Vercel (Project → Settings → Environment Variables):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx     # required (public)
NEXT_PUBLIC_SANITY_DATASET=production       # required
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-15   # optional, has a default
SANITY_API_WRITE_TOKEN=sk...                # only for scripts/import-blog-post.mjs (secret)
```

**Graceful degradation:** `src/lib/sanity.ts` returns empty data when the env vars are absent, so builds and Vercel deploys succeed with an empty blog (the homepage/demo never touch Sanity). Add the vars and the blog lights up automatically. Blog pages use ISR (`revalidate = 60`), so new/edited posts appear within a minute.

### Creating posts

- **Author in Studio** — go to `/studio` (needs the `NEXT_PUBLIC_*` vars), create a Blog Post.
- **Programmatic** — `node scripts/import-blog-post.mjs` (needs `SANITY_API_WRITE_TOKEN`; `--replace` to overwrite). This is the single source of truth for the P1 turnover pillar.

## Blog content model (SEO content strategy)

The blog is structured around the SEO content list (pillars, clusters, comparisons, etc. across Territories T1–T3, published in Waves 1–5). The `blogPost` schema encodes it:

- **contentType** — `pillar` · `cluster` · `comparison` · `glossary` · `feeder` · `pov` · `aeo`
- **territory** — `t1` Performance & Retention · `t2` Category & Comparison · `t3` Localization · `feeder`
- **pillar** (reference) — clusters/comparisons/feeders "link up to" a pillar
- **contentId** (`P1`, `C2`, `CMP1`…), **targetKeyword**, **searchIntent**, **wave**

**Interlinking is automatic:**
- Cluster/comparison/feeder pages render a *"Part of the series → [Pillar]"* link.
- Pillar pages auto-list every post that references them under *"In this series"* (GROQ `references()`), so no manual list to maintain — just set a cluster's **pillar** field.

**Reader-facing labels:** the card/header pill shows the **territory** label; a secondary badge appears for Guides (pillars), Comparisons, Definitions (glossary), and Perspectives (POV). Label maps live in `src/lib/sanity.ts` (`TERRITORY_LABELS`, `CONTENT_TYPE_LABELS`).

**First pillar:** P1 — *"The True Cost of Employee Turnover in GCC Enterprise"* (`territory: t1`, `wave-1`). Its clusters in the plan (C1, C2, C3, C8, C9) link up to it.

## Conventions & notes

- **Never start servers automatically — always ask first.**
- **Don't create docs/markdown files unless explicitly asked.**
- `@/*` resolves to `src/*` only. The `sanity/` folder is at the repo root — new code lives under `src/` and imports `sanity/` via relative paths (see `src/lib/sanity.ts`).
- Use `next/image` for local assets; plain `<img>` for Sanity CDN URLs from `urlForImage()` (`next.config.ts` already allows `cdn.sanity.io`).
- For public/blog reads use `src/lib/sanity.ts` (non-throwing), **not** `sanity/lib/client.ts` (throws when unconfigured).

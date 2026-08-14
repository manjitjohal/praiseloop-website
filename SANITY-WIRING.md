# Sanity CMS Wiring Plan

**Purpose:** map every marketing surface to its CMS status, decide what *should* become editable in Studio vs. stay in code, and lay out the work to get there. Written after the Sanity v5 → v6 upgrade.

> **TL;DR** — Only the **blog** is CMS-backed today. The homepage, the demo page, and the shared header/footer are hardcoded React. A `landingPage` schema exists in Studio but is **stale scaffolding**: its fields don't match the current homepage and nothing renders from it. Editing it changes nothing on the live site. This doc is the plan to close that gap deliberately — not to CMS-ify everything.

---

## 1. Current state audit

| Surface | File | CMS status | Schema | Notes |
|---|---|---|---|---|
| Homepage `/` | `src/app/page.tsx` → `src/components/LandingPage.tsx` | ❌ **Static** | `landingPage` exists but **unwired + mismatched** | 861 lines of bespoke narrative + coded visuals |
| Demo `/demo` | `src/app/demo/page.tsx` | ❌ **Static** | none | Copy + a form; form target is separate |
| Blog list `/blog` | `src/app/blog/page.tsx` | ✅ **Wired** | `blogPost` | Featured + grid via `src/lib/sanity.ts` |
| Blog post `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | ✅ **Wired** | `blogPost` | Portable Text, SEO/OG, series links |
| Header (all pages) | `src/components/SiteHeader.tsx` | ❌ **Static** | none | Nav labels + links, Sign in, Demo CTA |
| Footer (all pages) | `src/components/SiteFooter.tsx` | ❌ **Static** | none | Statement close, link columns, contact |
| Brand logos | `src/components/BrandLogos.tsx` | ❌ **Static** | none | Integration/customer logo marks |
| Studio `/studio` | `src/app/studio/[[...tool]]/page.tsx` | — | — | Embedded, `basePath: /studio` |

**Legend:** ✅ wired · ❌ static (hardcoded React) · ⚠️ schema exists but disconnected

---

## 2. The `landingPage` schema problem

The schema in `sanity/schemaTypes/landingPage.ts` models a **generic SaaS template**. The real homepage was rebuilt into a specific marketing narrative. They barely overlap:

| Schema field | Exists on the real homepage? |
|---|---|
| `hero` (badge, heading, subheading, 2× CTA, stats) | ✅ Yes — the one genuine match |
| `features` (icon grid) | ❌ No generic feature grid — the page has the **three Beats** (Performance → Recognition → Reward) |
| `howItWorks` (numbered steps) | ❌ No — the page has **The Loop** (a closed ring visual), not a steps list |
| `pricing` (plans) | ⚠️ Partial — a pricing section exists; plan shape needs verifying against the page |
| `faq` (Q&A) | ❌ No FAQ section on the page at all |
| `cta` (heading + button) | ⚠️ Partial — the close is the **footer statement**, not a generic CTA block |

**Meanwhile these real sections have NO schema representation:**
Integrations row · The Reframe (manager execution gap, `#why`) · AI Deputy (`#deputy`) · The Loop + proof layer (`#how`/`#proof`) · Day‑90 CFO ROI model (`#roi`) · Customer Stories (`#stories`, *illustrative/labelled*) · "One number per buyer" bento (`#solutions`) · Trust Rail (`#trust`) · GCC (`#gcc`).

**Conclusion:** the schema can't be "connected" as-is. It must be **rewritten to match the page**, or scoped down to only the fields we actually want editable. Decide the scope (§4) before writing schema.

---

## 3. What belongs in the CMS — and what does not

The homepage is a *designed argument*, not a content list. Blindly making it fully editable would let copy edits break the layout and would drag bespoke SVG/mock UIs into Studio where they don't belong.

**Good CMS candidates (plain copy + repeatable data):**
- Hero: badge, heading, subheading, CTA labels, the stat tiles
- Section headings + standfirsts (Beats, AI Deputy, Loop, GCC, bento, Trust Rail)
- **Customer Stories** — repeatable, clearly a content list (⚠️ must keep the *"illustrative"* label — see positioning rule)
- Pricing plans (names, prices, feature bullets, highlighted flag)
- Day‑90 CFO ROI **numbers** (the figures, not the chart code)
- Nav labels + link targets (header/footer), footer contact line + city list
- Demo page: intro copy, the "what you'll see" bullet list, confirmation copy

**Keep in code (structure & bespoke visuals — content models add friction, not value):**
- All mock UIs, the Loop ring SVG, spot-visuals, gradients (`LandingPage.tsx` lines ~291–457, 507–559)
- Section *order* and layout (bento asymmetry, alt-blocks)
- The demo form itself (fields, validation, submit target)
- Icon components

Rule of thumb: **if it has labels/numbers a marketer would tweak → CMS. If it's a shape, an SVG, or a layout decision → code.**

---

## 4. Per-surface wiring plan

### 4a. Homepage (biggest piece)
1. **Rewrite `landingPage.ts`** to mirror real sections. Proposed object fields: `hero`, `beats[]`, `deputy`, `loop`, `roi` (heading + numbers), `bento[]`, `trust`, `gcc`, `pricing`, `footerStatement`. Drop `features`, `howItWorks`, `faq` unless we actually add those sections.
2. **Split Customer Stories into its own `customerStory` document type** (repeatable, with an `illustrative: boolean` that renders the label). Reference or `references()`-list them on the homepage.
3. **Wire `LandingPage.tsx`** to fetch the singleton via `src/lib/sanity.ts` and render each section from data **with the current hardcoded copy as fallback defaults** (see §5) so an empty document renders today's site, not a blank page.
4. Seed the singleton with current copy (script, mirroring `import-blog-post.mjs`).

**Effort:** L. Do it section-by-section behind fallbacks, not big-bang.

### 4b. Demo page `/demo`
- New `demoPage` singleton (or fold into a shared `siteSettings`): `heading`, `subheading`, `whatYoullSee[]`, `confirmationHeading`, `confirmationBody`, `formNote`.
- Form logic stays in code. **Effort:** S.

### 4c. Header + Footer (shared chrome)
- New `siteSettings` singleton: `nav[]` (label + href), `signInUrl`, `demoCtaLabel`, `footerStatement`, `footerColumns[]`, `contact` (email, city list).
- Wire `SiteHeader.tsx` / `SiteFooter.tsx`. Highest-leverage, lowest-risk. **Effort:** S.

### 4d. Brand logos
- Optional `logo[]` in `siteSettings` (image + alt + optional url). Only if marketing wants to swap logos without a deploy. **Effort:** S, low priority.

---

## 5. The wiring pattern (how, in this codebase)

Follow the blog's approach — **resilient reads with graceful degradation**:

- **Read through `src/lib/sanity.ts`** (the non-throwing client), never `sanity/lib/client.ts` (throws when unconfigured). Builds must survive missing env vars — the current homepage never touches Sanity, so we must not regress that.
- **Fallback defaults:** every field falls back to the current hardcoded literal. Pattern: `const heading = data?.hero?.heading ?? "AI-Powered Performance, Recognition & Rewards"`. An empty/absent document → today's site, byte-for-byte.
- **Singletons** are already wired in `sanity/structure.ts` (the `landingPage` desk item). Add `demoPage` / `siteSettings` the same way — pinned item + filtered out of the auto document-type list.
- **ISR:** use `revalidate = 60` like the blog so edits appear within a minute.
- **Images:** `urlForImage()` + plain `<img>` for Sanity CDN; `next/image` for local assets.
- **Seeding:** a `scripts/import-landing.mjs` (mirror `import-blog-post.mjs`) owns the homepage content, so re-seeding is reproducible. Respect the same **content-ownership** discipline the blog uses (script owns body/taxonomy; don't hand-edit in Studio what the script overwrites).

---

## 6. Recommended phasing

1. **Phase 0 — housekeeping (now):** decide §3 scope. If we're *not* wiring the homepage soon, either fix or delete the misleading `landingPage` schema so Studio stops implying the homepage is editable.
2. **Phase 1 — `siteSettings` (header/footer/contact).** Small, safe, immediately useful; proves the fallback pattern.
3. **Phase 2 — demo page copy.**
4. **Phase 3 — homepage**, section-by-section behind fallbacks, starting with hero + stats, then Beats/AI Deputy/GCC copy, then Customer Stories as their own type, then pricing + ROI numbers last.

---

## 7. Open decisions (need sign-off before schema work)

- [ ] **Do we actually want the homepage editable in Studio**, or was the `landingPage` schema abandoned on purpose? (The project's `CLAUDE.md` still says *"Homepage — fully static, no CMS."*)
- [ ] If yes: **full narrative** editable, or **copy-only** (headings/stats/stories/pricing) with structure locked in code? (§3 recommends copy-only.)
- [ ] Customer Stories as a **separate document type**? (Recommended — they're repeatable and reused.)
- [ ] One shared **`siteSettings`** singleton for chrome, or per-page singletons?
- [ ] Who **seeds/owns** the content — script (reproducible) or Studio (hand-authored)?

---

*Companion to `CLAUDE.md` (project rules) and `DESIGN.web.md` (marketing design system). Update the audit table in §1 as surfaces get wired.*

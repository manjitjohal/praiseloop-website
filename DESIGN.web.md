# PraiseLoop — Web / Marketing Design System

> Reference for Claude Code when building **marketing-site** UI (homepage, landing pages, blog chrome).
> The mobile **product app** is specified separately in [`DESIGN.md`](./DESIGN.md).

---

## 0. Relationship to DESIGN.md

`DESIGN.md` is the **canonical source of truth for tokens** — colours, font family, semantic colours, and the icon set. This document does **not** redefine them; it references them and adds the layer the marketing site needs and `DESIGN.md` (an app spec) doesn't cover: a bigger type scale, marketing section patterns, and a set of deliberate "flourishes."

**Rule of thumb:** if it's a colour/font/semantic token → it lives in `DESIGN.md`. If it's a landing-page pattern, type scale, motion, or flourish → it lives here.

**Living reference implementation:** [`public/v2.html`](./public/v2.html) — a self-contained pilot that clones the marketing flow and applies everything below. When in doubt, match it.

---

## 1. Inherited tokens (from DESIGN.md — do not duplicate)

| Token | Value | Note |
| --- | --- | --- |
| Font | **Figtree** | headings, body, UI. Mono (below) is a web-only addition. |
| Orange | `#F26522` / hover `#D9551A` | primary CTA, accent, keyword emphasis |
| Teal | `#1B6B6B` / dark `#153F3F` | dark surfaces, headings on light |
| Teal gradient | `linear-gradient(180deg,#153F3F,#1B6B6B)` | all dark marketing surfaces |
| Surfaces | `#FFFFFF` · `#F5F5F5` · light-teal `#E8F0F0` | page + section rhythm |
| Text | `#1A1A1A` primary · `#6B7280` secondary | |
| Border | `#E5E7EB` | card borders, dividers |
| Semantic | `#22C55E` success · `#F59E0B` warning/coin · `#DC2626` destructive | |
| Icons | **Lucide** (2px stroke) | inline as SVG sprite on static pages |

---

## 2. Marketing flourishes (web-only, agreed)

`DESIGN.md` is an app spec and says nothing about landing pages. These five flourishes fill that gap. They are the *only* sanctioned departures from the app's defaults.

1. **Pill buttons** — CTA radius is `999px` (not the app's 12px). Primary = solid orange + soft shadow; secondary = outline teal (white outline on dark/orange surfaces).
2. **Big hero type scale** — headings run `40–76px` (see §3). The app caps at 24px, which is too small to carry a page.
3. **Motion + depth** — radial gradient washes behind sections; card hover-lift (`translateY(-4px)` + shadow); a floating "coin fired" badge; count-up on stat numbers. **All motion is `prefers-reduced-motion`-aware.**
4. **Mono micro-labels + coded diagrams** — **JetBrains Mono** for eyebrows, stat sources, chips, and code-like rule text; SVG/coded diagrams (sparklines, loop/flow rails) instead of stock or AI imagery. *Anything with labels or numbers is coded, never AI-generated.*
5. **Warm accent moments** — occasional `--cream #FBF6EF` / `--sand #F1E4D6` panels for warmth against the cooler teal/white palette.

---

## 3. Type scale (web)

| Element | Size | Weight |
| --- | --- | --- |
| `h1` (hero) | `clamp(40px, 5.2vw, 72px)` | 800 |
| `h2` (section) | `clamp(30px, 3.4vw, 48px)` | 700 |
| `h3` (beat / card head) | `22–34px` | 600–700 |
| `.lede` | `19px` / 1.55, `--text-secondary` | 400 |
| `.eyebrow` | `12px` mono, `0.14em`, uppercase, teal, orange dot | 600 |
| body | `15–16.5px` | 400–500 |
| mono micro-label | `10–12px` JetBrains Mono | 600–700 |

- Emphasise keywords inline with `.kw` (orange, 700): *performance / recognition / reward*.
- `text-wrap: balance` on headings, `pretty` on ledes.

---

## 4. Spacing & surface rhythm

- **Section padding:** `88px` block (vs the app's 24px gaps). Let marketing pages breathe.
- **Container:** `max-width 1200px`, `24px` gutter.
- **Radii:** cards `16px`, inner tiles `12px`, chips/buttons `999px`.
- **Surface alternation:** white ⇄ `#F5F5F5` ⇄ warm cream, punctuated by full-bleed **teal-gradient** (dark) and **orange** (accent) sections so no two heavy sections sit adjacent.

---

## 5. Section pattern catalog

The marketing flow, in order, as built in `v2.html`. Reuse these; don't reinvent per page.

| Pattern | Surface | Anatomy |
| --- | --- | --- |
| **Nav** | white blur, sticky | logo · links · Sign in · orange pill CTA |
| **Hero** | white + radial washes | eyebrow · big H1 w/ `.kw` · lede · wedge line (orange left-border) · dual CTA · meta ticks · photo w/ floating coin badge |
| **Three-beat** | `#F5F5F5`, alternating | text (eyebrow + h3 + body) ⇄ coded **spot card** (sparkline / event→outcome / rule→fire) |
| **Mid-CTA band** | light-teal | one line + pill button, centred |
| **Teal loop** | teal gradient | centred head · agent-chat mock · 4 glass step cards · mono flow-chip band · CTA |
| **Persona grid** | white | 4 photo cards, hover-lift, mono role label + one-line benefit |
| **Intelligence flow** | `#F5F5F5` | coded node rail (Connect→Align→Uncover→**two AI nodes**) · step chips · feedback pill |
| **Integration row** | white, bordered band | "Zero integrations to start" + wordmarks |
| **Orange outcome** | full-bleed orange | 3 translucent-glass cards |
| **Stat strip** | warm cream | 4-col stats w/ count-up + `Illustrative` chip |
| **Testimonials** | white + warm cards | metric · quote · avatar; every modelled figure labelled `Illustrative` |
| **Dark CTA** | teal gradient card | email capture + "schedule a meeting" link |
| **Footer** | teal-dark | statement ("Rewards are earned, not given.") · logo · links · mono meta |

---

## 6. Divergences from DESIGN.md — and why

| Aspect | DESIGN.md (app) | Web | Why |
| --- | --- | --- | --- |
| Button radius | 12px | **999px pill** | brand flourish; marketing feel |
| Max heading | 24px | **40–76px** | landing pages need scale |
| Section gap | 24px | **88px** | marketing breathing room |
| Motion | subtle route transitions | **washes, hover-lift, count-up, float** | engagement, not utility |
| Imagery | app screens | **photos + coded diagrams** | argument-carrying visuals |
| Mono font | — | **JetBrains Mono** micro-labels | editorial texture |

Everything else (Figtree, orange, teal, teal gradient, surfaces, semantic colours, Lucide) is **shared and identical** — that convergence is the point.

---

## 7. Editorial & honesty

- Writing quality bar: see the **Writing & editorial quality** section in [`CLAUDE.md`](./CLAUDE.md) (format for the scanner; short paragraphs; pull striking numbers into callouts).
- **Illustrative labelling is mandatory.** Any modelled/composite number or quote carries an `Illustrative` chip — it's what makes the real numbers believable.
- Voice: performance-first. *Rewards are earned, not given. If the result didn't happen, the reward doesn't exist.*

---

## 8. Implementation notes

- **Fonts:** load Figtree + JetBrains Mono via `next/font/google` in the app; standalone pages use a Google Fonts `<link>` with a `system-ui` fallback.
- **Icons:** Lucide. On React pages use `lucide-react`; on static pages inline an SVG `<symbol>` sprite (`stroke:currentColor; stroke-width:2`).
- **Coded over stock:** build sparklines, loops, and flow rails in SVG/HTML. Reserve photography for people/teams and AI generation for *decorative* covers only (never anything with text or numbers).
- **Reduced motion:** guard count-up and float animations behind `prefers-reduced-motion`.

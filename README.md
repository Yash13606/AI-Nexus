# AI Nexus Innovations Hub — website

Marketing site for [ainexushub.ai](https://www.ainexushub.ai) — an AI product company in Bengaluru and Singapore building four AI-native platforms for regulated Indian industries.

**18 routes · 48 AI agents · zero animation libraries · ~400 bytes of JavaScript on most pages.**

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # runs the content check, then builds to dist/
```

## Stack

| Layer | Choice |
|---|---|
| Framework | **Astro 5**, static output |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` |
| Components | none — plain `.astro` |
| Animation | **none** — no GSAP, no Lenis, no Motion |
| Icons | inline SVG, one authored set |
| Content | typed TS modules in `src/content/` |

One runtime dependency: `astro`. Astro was chosen over Next static export for one reason — a page with no client directive ships **0 KB of JavaScript**, which is what this site's design contract requires rather than merely permits.

## Design

`DESIGN.md` is the single source of truth for tokens, components and page blueprints. If code and that file disagree, the file wins.

## Layout

```
src/
├── content/          # 48 agents, 4 platforms, 29 roles, 30 FAQs — one source
│   └── platform-detail.ts    # generated from the scraped site, do not hand-edit prose
├── components/       # EvidenceCard is the core — ~60 instances site-wide
├── layouts/Base.astro
├── pages/            # 18 routes from 12 files (2 dynamic)
├── scripts/reorder.js
└── styles/theme.css  # DESIGN.md §14 tokens verbatim
ainexushub/           # scrape of the live site — the content source of truth
scripts/check-content.mjs
```

## Checks

```bash
npm run check:content
```

Asserts 48 agents (11 / 20 / 10 / 7), every agent carrying all three Evidence rows, unique kebab-case slugs matching the live sitemap's anchors, 1:1 platform↔solution pairing, and 24 modules / 29 roles / 21 FAQs. It runs on every build, because a renamed agent slug silently breaks 96 in-content deep links.


## Docs

| File | What it is |
|---|---|
| `DESIGN.md` | The design system. Tokens, 22 component specs, page blueprints, do/don't, ship gate. |
| `PRODUCT.md` | Durable product context — users, voice, anti-references, hard constraints. |
| `BUILD-PLAN.md` | Scope, stack rationale, build order. |

## Known gaps

- **Logo assets are missing.** `logo-mark.png` and the four platform lockups are referenced by the live site but absent here. Typographic wordmarks stand in; the fixed-height slot means dropping real files in changes nothing else.
- **The palette is ours, not the brand's.** The live site's actual colours were never supplied. `DESIGN.md` §3 is a contrast-verified system built from scratch — repin when real brand values arrive.

Fonts are self-hosted via [Fontsource](https://fontsource.org/) (`@fontsource-variable/ibm-plex-sans`, `@fontsource/ibm-plex-sans-devanagari`, `@fontsource/ibm-plex-mono`), imported in `src/layouts/Base.astro`.

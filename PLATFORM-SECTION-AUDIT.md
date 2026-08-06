# PLATFORM-SECTION-AUDIT.md

> Phase 0 output. Read-only pass over the repo, scoped to the five platform routes.
> No source file was modified. `npm ci` was run so the baseline could be measured.
> Nothing here proposes work — §5 lists what I need decided before Phase 1.

---

## 0. Baseline, measured

Everything below is a measurement taken on the current `main` (`280f537`), not a claim carried over from the README.

| Check | Command | Result |
|---|---|---|
| Content check | `npm run check:content` | **passes** — `48 agents (×3 evidence rows), 4 platforms, 24 modules, 29 roles, 21 FAQs, slugs aligned. OK` |
| Build | `npm run build` | **clean** — 18 pages in 436 ms |
| Impeccable, source | `npx impeccable detect src` | **0 findings** |
| Impeccable, built HTML | `npx impeccable detect dist/platforms` | **297 findings** — see §5.1 |
| Internal links | anchors with a root-relative `href`, across all 18 pages | **869 links, 0 broken** (README says 868 — off by one, stale) |
| JS on the 5 platform pages | `dist/_astro/*.js` referenced by each page | **~2.5 KB each** — see §5.2 |

Impeccable is not vendored; `.impeccable/` holds only `config.json` (hook enabled, max 5 findings / 8000 chars). The detector itself comes from `npx impeccable@3.5.0`. The 58 rules are not in the repo, so §4 quotes rule *ids as the detector emits them*, verified by running it, not from a rules file I could read.

---

## 1. Current state of the five routes

All five routes already exist and are fully built. **This is not a greenfield section — it is a revision.** That reframes the brief: the risk is regression, not absence.

### Route → file map

| Route | Produced by | Lines |
|---|---|---|
| `/platforms/` | [src/pages/platforms/index.astro](src/pages/platforms/index.astro) | 223 |
| `/platforms/medorbit/` | [src/pages/platforms/\[slug\].astro](src/pages/platforms/[slug].astro) | 226, ×4 |
| `/platforms/edvation/` | ″ | |
| `/platforms/advohub/` | ″ | |
| `/platforms/trustproperty/` | ″ | |

`getStaticPaths()` at [\[slug\].astro:12-14](src/pages/platforms/[slug].astro#L12-L14) returns exactly:

```ts
platforms.map((p) => ({ params: { slug: p.slug }, props: { platform: p } }))
```

Four paths — `medorbit`, `edvation`, `advohub`, `trustproperty` — with the whole `Platform` object passed as a prop, and `detail[p.slug]` looked up separately from `platform-detail.ts`. **The four detail pages are already one template over four data inputs.** The brief's requirement here is already satisfied; nothing in the markup branches on slug except one thing (see §5.4).

### `/platforms/` — what is on it today

| # | Section | Band | Component | Source |
|---|---|---|---|---|
| 1 | Hero — breadcrumbs, `h1`, accent rule, lede | Paper | inline | hard-coded prose, duplicated from `home.ts:disciplineBody` |
| 2 | Four platform cards, 4-up | Wash | inline `<article>` | `platforms.ts` |
| 3 | Comparison table + sort controls | Paper | inline `<table>` | `platforms.ts` + `detail[].roles.length` + a local `languages` map |
| 4 | CTA band | Wash | `CtaBand.astro` | `site.ts` |

Missing or stubbed:

- **No `/ai-agents/` link.** The live page carries *"48 named AI agents across the four platforms. See every one with a worked example →"*. Ours drops it. This is the single link the brief's table requires and the page does not emit.
- **No logo slot.** §8.7 requires a fixed 40px-height lockup slot with the product name in `alt`. The card renders the name as `<p class="t-h3">` — no slot, no `<img>`, and **not a heading element**, so the four product names are invisible to a heading outline and the section has no `<h2>` above them at all.
- **Sort controls are JS-injected** (`reorder.js` → `initTableSort`), so the table is unsorted and control-free without JS.
- The `languages` column hard-codes `advohub: '22'`; the scraped source table says `—` for AdvoHub. Drift from the content source of truth.

### `/platforms/{slug}/` — what is on each today

| # | Section | Band | Component | Source |
|---|---|---|---|---|
| 1 | Hero — breadcrumbs, hue eyebrow, `h1`, hue rule, lede, 2 buttons, 4-up stat strip | Paper | inline | `platforms.ts` |
| 2 | "What {p} does" 6-up + Ink timeline panel + Evidence Card | Wash | inline + `EvidenceCard` | `detail[].modules`, `platforms.ts:panel/evidence` |
| 3 | "The {n} {p} AI agents" grid + seat filter | Paper | `AgentCard` ×11/20/10/7 | `detail[].agents` |
| 4 | "Who {p} is for" roles | Wash | inline, borderless | `detail[].roles` |
| 5 | "Standards and compliance" chips + mandatory line | Paper | inline `<li class="pill">` | `detail[].compliance` |
| 6 | "{p} — questions" FAQ | Wash | `Faq` (`openFirst`) | `detail[].faqs` |
| 7 | "More from AI Nexus" — 3 siblings | Paper | inline `<a class="card">` | `platforms.ts` |
| 8 | CTA band | Wash | `CtaBand` | `site.ts` |

Banding alternates Paper → Wash → Paper correctly, and the CTA band's Wash follows a Paper section. One Ink block per page (the timeline panel) plus the global footer — within the "at most twice" limit.

Missing or stubbed:

- **No logo slot** in the hero — the `h1` is typographic only, matching the stand-in policy, but there is no fixed-height slot to hold a lockup when one arrives. DoD item 5 asks that the slot hold with assets absent; **there is no slot to hold.**
- **Roles are not Role Cards.** §8.16 specifies Paper / hairline / 12px radius / 24px padding. Rendered as borderless top-ruled blocks — the Governance Grid treatment (§8.11) applied to the wrong component.
- **No `FAQPage` JSON-LD.** `Base.astro` emits it only when `jsonldFaq` is passed, and only ever from `home.ts:faqs`. The 21 platform FAQs emit no structured data. §8.13 says *"Emit `FAQPage` JSON-LD from the same source data."*
- **No `BreadcrumbList` JSON-LD** anywhere on the site, though every page has visible breadcrumbs. §15 ship gate requires it.
- **`openFirst` is set.** §8.13: *"First item open by default on `/security/`; all closed elsewhere."*
- **Seat-filter controls are JS-injected** (`reorder.js` → `initSeatFilter`).
- **Devanagari is unwrapped.** 5 Devanagari runs on `/platforms/trustproperty/` and 1 on `/platforms/` carry no `lang="hi"`. Site-wide, `grep -rn 'lang="hi"' src/` returns nothing.

---

## 2. Component inventory

Nine components exist. `EvidenceCard` and `AgentCard` are the two the section lives on.

### Reuse as-is

| Component | Props | Where it fits |
|---|---|---|
| [EvidenceCard.astro](src/components/EvidenceCard.astro) | `{ evidence: Evidence; class?: string }` | Detail hero panel column. Renders §8.1 correctly: eyebrow pill, Input, Output, Control in a Mist well at 8px radius, `--color-withheld` on the Control label. One deviation — the tag pill sits on `--color-mist`, and §8.1's diagram calls for a `999px` pill in muted; both are satisfied, the fill just isn't specified either way. |
| [AgentCard.astro](src/components/AgentCard.astro) | `{ agent: AgentDetail; hue: string }` | The 48 agent instances. Evidence rows inline, no nested card border, `id={agent.slug}` with `scroll-margin-top: 88px`. Name is `<h3>` under the section `<h2>` — correct per §10. **Carries the invalid-border bug in §5.3.** |
| [Breadcrumbs.astro](src/components/Breadcrumbs.astro) | `{ trail: { href?: string; label: string }[] }` | All five pages. Emits the `/` link the brief's table requires. |
| [CtaBand.astro](src/components/CtaBand.astro) | none | All five pages. Emits one `/contact/`. |
| [Faq.astro](src/components/Faq.astro) | `{ items: Faq[]; openFirst?: boolean }` | Detail pages. Native `<details>`, zero JS. Drop `openFirst` per §8.13. |
| [Icon.astro](src/components/Icon.astro) | `{ name: Name; size?: number; class?: string }` | 7 authored glyphs: `check`, `arrow-right`, `arrow-up-right`, `chevron-down`, `menu`, `close`, `rule`. Everything the section needs. |

### Reuse with a new variant

| Component | What is needed | Why not new |
|---|---|---|
| **Platform card** — currently inline in `platforms/index.astro:41-77` | Extract to `PlatformCard.astro`; add the fixed 40px logo slot (§8.7) and make the name a real heading. Used on `/platforms/` and, in compact form, as the sibling cross-link on all four detail pages. | The two are the same object at two densities — §8.7 and §8.17 differ only in what is inside. One component, a `compact` prop. |
| **Comparison table** — inline in `platforms/index.astro:93-143` | Extract to `ComparisonTable.astro`. Markup is already §8.14-correct: real `<table>`, `<th scope="col">`, `<th scope="row">`, visually-hidden `<caption>`, mono right-aligned numerics, 9px legend swatch, `overflow-x: auto` wrapper at 16px radius. Only the `data-sortable` hook and the `languages` map need decisions. | Nothing structural is wrong with it. |
| **Stat strip** — inline in `[slug].astro:47-68` | Extract to `StatStrip.astro`. Already a `<dl>` at final values in mono with a length-based size switch for `ap-south-1`. | Correct as written. |
| **Timeline panel** — inline in `[slug].astro:91-106` | Extract to `TimelinePanel.astro`. Already §8.9-correct: Ink, 16px radius, 64px mono timestamp column, `rgba(255,255,255,0.10)` rules, mandatory italic footer caption. | Correct as written. |
| **Role card** — inline in `[slug].astro:141-147` | Needs the §8.16 treatment (card chrome) rather than the borderless one it has. `solutions/[slug].astro:64-95` already renders roles *as* cards — the two pages disagree on the same component. | The correct rendering already exists on another route; this is alignment, not authoring. |
| **Compliance chips** — inline in `[slug].astro:161-172` | Extract to `ComplianceChips.astro`, and set statute refs and region strings in `--font-mono` per §8.15 (`BSA 2023 §63`, `ap-south-1`, `DPDP Act 2023 (§6/§7 consent, §8(4) erasure)` currently render in sans). Mandatory header line is present. | Only the mono rule is missing. |

### Genuinely new

| Component | Why | Risk |
|---|---|---|
| `SectionHeading.astro` (§8.21) | Eyebrow → `h2` → lede is repeated 6× per detail page as ad-hoc markup with inconsistent margins (`mt-5 mb-9`, `mt-5 mb-10`, `mt-5 mb-8`, `mt-5` alone). | None — pure consolidation. |
| Sticky sub-nav for the detail pages | The brief asks for it *if* it can be done without JS. It can: `/ai-agents/` already ships a pure-CSS `position: sticky; top: 68px` bar ([ai-agents.astro:128-136](src/pages/ai-agents.astro#L128-L136)). Active-state-on-scroll cannot — that needs `IntersectionObserver`. | **Needs your decision** (§5.6). A detail page is ~8 sections; whether it earns chrome that §9 grants only to `/ai-agents/` is a judgement call, not a rule. |
| TrustProperty "in development" list | The live TrustProperty platform page carries it; ours doesn't (it lives only on `/ai-agents/`, hard-coded at [ai-agents.astro:13-20](src/pages/ai-agents.astro#L13-L20)). | Per-platform data that must live in `src/content/`, not in markup. |

**Nothing in this section requires a component that does not already have a spec in DESIGN.md §8.**

---

## 3. Content contract

### What exists, per platform

Both modules are keyed by the same four slugs. `platforms.ts` holds the marketing layer; `platform-detail.ts` holds the page body.

| | MedOrbit | Edvation | AdvoHub | TrustProperty |
|---|---|---|---|---|
| `slug` | `medorbit` | `edvation` | `advohub` | `trustproperty` |
| `hue` | `var(--color-medorbit)` teal | `var(--color-edvation)` ochre | `var(--color-advohub)` oxblood | `var(--color-trustproperty)` violet |
| **Agents** | **11** | **20** | **10** | **7** |
| Modules | 6 | 6 | 6 | 6 |
| Roles | 8 | 6 | 9 | 6 |
| Compliance chips | 9 | 6 | 9 | 7 |
| FAQs | 5 | 5 | 6 | 5 |
| Stats | 4 | 4 | 4 | 4 |
| Timeline rows | 4 | 4 | 4 | 4 |
| Card bullets | 3 | 3 | 3 | 3 |
| Hero evidence | 1 triad | 1 triad | 1 triad | 1 triad |
| Solution pairing | `/solutions/hospitals/` | `/solutions/schools/` | `/solutions/law-firms/` | `/solutions/property/` |

**The 11 / 20 / 10 / 7 split: MedOrbit 11, Edvation 20, AdvoHub 10, TrustProperty 7 = 48.** `check-content.mjs:18` asserts it by name, and asserts every one of the 48 carries a non-empty `input`, `output` and `control`, and that the slug sets in `agents.ts` and `platform-detail.ts` are identical. Renaming any slug fails the build. Each agent also has a `summary` and an `audience` — the audience string is the §6-permitted platform-hue tag and the key the (JS) seat filter groups on.

### Available and unused by these five pages

`platforms.ts` also carries `headline`, `body`, `features[3]` and `subtitle` per platform. `features` is consumed only by the homepage product rows; `body` only by `/solutions/`. A detail page could draw on `features` without new content.

### What does not exist and would have to be authored

| Need | Status |
|---|---|
| Logo lockups (`logos/{slug}.png`) | **Known gap.** Referenced by the live site, absent here. |
| Fonts (3× Plex woff2) | **Known gap.** |
| Per-platform `pricing` | Only AdvoHub's is published, and only inside an FAQ answer (`₹999`, `₹3,999`). Not a structured field. |
| TrustProperty in-development agent list | Exists as 6 hard-coded objects on `/ai-agents/`. Not in `src/content/`. |
| Per-platform meta description | Derived as `p.pageLede.slice(0, 300)` — cuts mid-sentence on all four. |
| `lang="hi"` markers on Devanagari runs | Nothing in either module marks them. |

### Content defect — must be resolved before Phase 1

**Four `control` values in the generated `platform-detail.ts` have the next section's prose glued onto them.** The extractor consumed the following `## Roles` heading. Verified against the scrape (`ainexushub/platforms/medorbit/index.md:335` ends the control at *"Back-translation QA samples every batch."*).

| Platform | Agent | Corrupted `control` ends with |
|---|---|---|
| MedOrbit | `sahayak` | `…every batch. Roles ## Who MedOrbit is for 8 roles, each with its own view — and an audit log that records who saw what.` |
| Edvation | `science-lab` | `…own chapter. Roles ## Who Edvation is for 6 roles…` |
| AdvoHub | `firm-knowledge-agent` | `…reaches a prompt. Roles ## Who AdvoHub is for 9 roles…` |
| TrustProperty | `ad-factory` | `…before launch. In development — not live today - GharGPT … - NRI Advisor … Roles ## Who TrustProperty is for 6 roles…` |

This renders **today**, in the Mist well — the row DESIGN.md calls *"the design's whole argument"* — on all four platform pages and on `/ai-agents/`. TrustProperty's is the worst: an entire unrelated product list inside one agent's guardrail statement.

`platform-detail.ts:1` says *do not hand-edit prose*, and `scripts/extract-platform-data.py` is not in the repo, so it cannot be regenerated here. See §5.5.

---

## 4. The rules that constrain this section

Quoted, with the enforcement point.

### 4.1 Platform colour identifies, never decorates

> **§6:** Where platform color is permitted — exhaustive list
> 1. The **eyebrow** above a platform heading — `MEDORBIT · HEALTHCARE`
> 2. The **agent-count pill** — `11 AI agents`
> 3. A **3px top rule** on a platform card
> 4. A **9px legend swatch** beside that platform's name in the comparison table
> 5. The **audience tag** on an agent card

> **§6:** Never a button fill. Every filled button on the site is Nexus Indigo. **All four platform pages included.** … Never a section background. Never body text, heading text, or link color. Never a card fill or a gradient. Never more than one platform hue in a single component.

> **§6, Retracted:** #4 originally read *"the left rule on that platform's comparison-table row."* A 3px colored side border is the single most recognizable AI-UI tell and the Impeccable detector flags it (`side-tab`).

The current code uses slot 1 (hero eyebrow, sibling-card eyebrow), slot 2, slot 3 (platform + sibling cards), slot 4 (table swatch) and slot 5. It also uses the hue as a **hero rule fill** ([\[slug\].astro:33](src/pages/platforms/[slug].astro#L33)) — a 1px full-width rule under the `h1`, which is not on the list of five. It is not a button, background, body text or card fill, so it violates no prohibition; it is simply a sixth use. Flagged in §5.7.

### 4.2 The measured contrast pairs

> **§3:** Every value below is contrast-verified. Ratios are measured, not estimated.

Available to this section, on `#ffffff`: Ink `#0b1220` 18.72:1 · Body `#3d4a61` 8.93:1 · Muted `#5f6c85` 5.29:1 (**the floor**) · Control `#7589a6` 3.57:1 (non-text only) · Accent `#2b46d4` 7.17:1 both ways · Accent-deep `#1d31a8` white-on 10.21:1.

Platform hues on paper: MedOrbit 5.01:1 · Edvation 5.02:1 · AdvoHub 8.69:1 · TrustProperty 7.10:1 — all AA, *"each deep enough to hold white text and to sit on white."*

> **§6:** The agent-count pill (#2) also moved off `--color-accent-wash` onto paper after measuring **4.34:1** — below AA.

That measurement is the reason the pills in `platforms/index.astro:58` and `AgentCard.astro:25` sit on `--color-paper`. **Do not move them back.** No pair outside §3 will be introduced; if the section needs one, I stop and ask (DoD).

### 4.3 Real tables

> **§1.3:** Tables are real `<table>` with real `<th>`. — *"header cells are what make a row self-describing once serialized for retrieval."*
> **§8.14:** Real `<table>`, real `<th scope="col">`. Non-negotiable (§1.3). `<caption>` (visually hidden) … Numeric columns right-aligned in `--font-mono` … Wrapper: `overflow-x: auto`, 16px radius, 1px hairline. The page body never scrolls sideways.

Satisfied today. The comparison table is the only table in the section.

### 4.4 Capability statements, never certification logos

> **§1.4:** Capability statements, never certification logos. No badge wall. No trust-seal row.
> **§8.15:** Header above them, mandatory: *"These are capability statements, not certification logos. Certificates are published only when they exist."*

Present verbatim on all four detail pages ([\[slug\].astro:156-159](src/pages/platforms/[slug].astro#L156-L159)). Must survive any restructuring.

### 4.5 "Illustrative" on every worked example

> **§1.5:** Every worked example is labelled illustrative.
> **§8.9:** Footer caption, mandatory, `#7c8ba5` italic: *"Illustrative sequence — every step is a shipped capability."*

Three carriers today: the timeline panel's `note` (per-platform, in `platforms.ts`), the agents-section lede (*"Product examples on this site are illustrative."*), and the global footer line. All three stay.

### 4.6 Devanagari

> **§1.7:** Devanagari must render properly. हिंदी, हिन्दी and 22 Indian languages appear in body copy.
> **§10:** Devanagari runs wrapped in `<span lang="hi">`. This makes screen readers switch voice correctly, and it's why §4 pairs a real Devanagari cut.

**Currently unsatisfied** — zero `lang="hi"` in the repo, 6 unwrapped runs across the section. §5.8.

### 4.7 No scroll-reveal, no count-up

> **§1.1:** Every number renders in HTML at its final value. No count-up animation, ever.
> **§1.2:** No content is hidden behind scroll-triggered reveal. Content that starts at `opacity: 0` is content an AI crawler may never see.
> **§7 Forbidden:** Scroll-triggered fade/slide reveals of any content · Count-up / odometer / `NumberFlow` on any figure · Parallax, pinned sections, scroll-scrubbed anything · Marquees, auto-carousels, typewriter effects · Entrance animation on page load.

Both numeric surfaces — the stat strip and the comparison table — are server-rendered at final value. Confirmed in `dist/`. But see §5.1: `theme.css` ships a scroll-driven animation and a load animation that the brief's motion paragraph reads on directly.

### 4.8 Impeccable rules that bear on this section

Verified by running the detector, not read from a rules file:

| Rule id | What it flags | Bearing |
|---|---|---|
| `side-tab` | *"Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs."* | Fires **4×** on the built `/platforms/` against the §6-slot-3 3px top rule. DESIGN.md permits it explicitly; the detector does not distinguish top from left. Standing conflict — §5.1. |
| `low-contrast` | pairs below 4.5:1 | 15–17× per page, all false positives — it cannot resolve `var(--color-ink)` in an inline `style` and reads the Ink panel and footer as white-on-white. |
| `cramped-padding` | text flush to a container edge | 5–66× per page, same root cause. |
| `em-dash-overuse` | advisory only, never counted | 1× on AdvoHub and TrustProperty. |

---

## 5. Risks and conflicts

Not resolved. Each needs a decision from you.

### 5.1 "Impeccable: 0 findings, same as before I started" means one specific invocation

The 0-findings state is real **for `npx impeccable detect src`**, which is what the edit hook runs — `.astro` files are scanned in regex mode, and that mode catches materially less than HTML mode. Pointing the same detector at the built output gives a very different number:

```
dist/platforms/index.html            24   (side-tab 4, low-contrast 15, cramped-padding 5)
dist/platforms/medorbit/index.html   67   (low-contrast 17, cramped-padding 50)
dist/platforms/edvation/index.html   83   (low-contrast 17, cramped-padding 66)
dist/platforms/advohub/index.html    67   (+1 advisory em-dash)
dist/platforms/trustproperty/index.html 58 (+1 advisory em-dash)
                                    ───
                                    297
```

I have inspected them. The 68 `low-contrast` findings are all one of three pairs — `#a8b4c8`, `#7c8ba5` or `#ffffff` "on `#ffffff`" — which are the footer and the Ink timeline panel, whose backgrounds are set as `style="background: var(--color-ink)"`. The detector does not resolve `var()`, assumes paper, and reports white-on-white. The `cramped-padding` findings are the same failure against Tailwind arbitrary-value padding. **They are artifacts of static analysis, not defects** — with one exception: `side-tab`, which is a genuine, knowing disagreement between DESIGN.md §6 slot 3 and the detector, already documented in the §6 retraction note.

**I will hold `detect src` at 0.** I am telling you the built-HTML number so you are not surprised by it later, and so "0 findings" is not read as a claim about the rendered page. If you want the built output driven toward 0 as well, that is a different and much larger job than this brief, and it would require either abandoning the §6 top rule or configuring `detector.ignoreRules`.

### 5.2 Zero KB of JavaScript is not currently true, and one part of it is out of my scope

DoD: *"Zero KB of JavaScript on all five pages unless I explicitly approved an exception."* Today each of the five ships:

| Source | Bytes | Scope |
|---|---|---|
| `reorder.js` — FLIP table sort + seat filter | 2,059 | **Mine.** Imported by both platform page files. |
| per-page entry module | 94 / 273 | **Mine.** |
| Nav inline module — mobile menu + scroll shadow | ~400 | **`Nav.astro` — shared, out of scope.** |

Deleting `reorder.js` from these two pages is inside my scope and gets them to the nav script alone. Getting to a literal 0 KB requires editing `Nav.astro`, which the brief forbids me to touch. It would also delete the mobile menu, which §8.3 requires, and the nav scroll shadow, which §5 lists as one of only two shadow tokens.

**Note what removing `reorder.js` costs.** These are not decorations. `initTableSort` lets a reader re-rank the comparison table — on the one page whose stated job is comparison — and `initSeatFilter` answers *"what does my seat get?"* on a page with up to 20 agent cards. Both are progressive enhancement done correctly: controls are injected by script so they never render dead, nothing is hidden, and with JS off you get the same content in its authored order. The FLIP technique moves elements between two positions they already occupy — nothing starts at `opacity: 0`, so neither violates §1.1 or §1.2.

Three options:

- **(a)** Remove both. Five pages ship only the shared ~400 B nav script. Cleanest against the DoD; loses table sort and seat filter.
- **(b)** Remove `initTableSort`, keep `initSeatFilter` on the detail pages (20 Edvation cards is where it earns its place).
- **(c)** Keep both — you approve the exception, and the DoD line reads "no *new* JS".

I recommend **(a)**, because the brief's motion paragraph is unusually explicit and because a comparison of four rows does not need sorting. **Not proceeding until you choose.**

### 5.3 `${hue}33` is an invalid CSS declaration

At [AgentCard.astro:25](src/components/AgentCard.astro#L25) and [platforms/index.astro:58](src/pages/platforms/index.astro#L58):

```astro
style={`background: var(--color-paper); color: ${hue}; border: 1px solid ${hue}33;`}
```

`hue` is `var(--color-medorbit)`, so this emits `border: 1px solid var(--color-medorbit)33`, verified present in `dist/`. CSS custom-property substitution does not merge adjacent tokens, so this resolves to `1px solid #0e7c7b 33` — invalid at computed-value time, and `border-color` falls back to `currentColor`, which the same rule sets to the hue. **The intended 20%-tint border renders at full hue instead.**

It is not a §6 violation — pill borders on the agent-count pill and the audience tag are permitted slots 2 and 5 — and it is not visually broken. But it is 49 instances per page of a declaration that does not do what it says. `color-mix(in oklab, ${hue} 20%, transparent)` is the correct form, and `theme.css:279` already uses `color-mix` elsewhere. **Fixing this changes the rendered appearance of every agent card on the site**, including `/ai-agents/`, which is outside my five pages. Flagging rather than fixing.

### 5.4 The one place the four detail pages are not one template

[\[slug\].astro:214-226](src/pages/platforms/[slug].astro#L214-L226) hard-codes a slug→hue map in the page script to pass a hue to `initSeatFilter`. It is the only slug-conditional logic in the template, and it disappears entirely under §5.2 option (a).

Related: the TrustProperty in-development list is per-platform data that the live site puts on the platform page, and ours has only on `/ai-agents/` as hard-coded markup. If it comes to `/platforms/trustproperty/`, it must arrive as data on `platform-detail.ts` (or a sibling module), or the template gains a second slug branch. **That is an addition to `src/content/`, which the brief says I must show you as a diff first.**

### 5.5 Four corrupted `control` values, in a file I am told not to hand-edit

§3 documents them. The constraint conflict: `platform-detail.ts:1` says *do not hand-edit prose*, `scripts/extract-platform-data.py` is not in the repo, and the corruption is visible on all four pages in the Control well. Three ways out:

- **(a)** Hand-edit the four `control` strings back to what the scrape says, and add a `check-content.mjs` assertion that no `control` contains `## ` or `Roles ` so it cannot regress. Ships correct pages today; the generated file diverges from its generator until the generator is fixed.
- **(b)** Write `scripts/extract-platform-data.py` fresh from `ainexushub/`, regenerate the whole file. Correct at the root; much larger, touches all 48 agents, and risks churn well outside these five pages.
- **(c)** Truncate at render time in the template (cut at `" Roles "` / `" In development"`). Leaves bad data in the module and hides it — I do not recommend it.

I recommend **(a)** plus the guard assertion. Either way this is a `src/content/` change and you see the diff first.

### 5.6 Sticky sub-nav — DESIGN.md grants it to exactly one page

> **§9:** **Sticky jump-nav** on `/ai-agents/` is **the one exception to the no-extra-chrome rule** — 48 cards on one page needs it.

The brief asks for sticky sub-navigation "if it can be done without JavaScript." Mechanically, yes — `/ai-agents/` proves the CSS pattern. But §9 grants the exception to one page by name and by a reason (48 cards) that a detail page does not meet: Edvation is 20, TrustProperty is 7. DESIGN.md does not cover this case, so per your instruction I am not picking:

- **(a)** No sub-nav. The detail pages stay at eight sections with no added chrome, and §9's "one exception" stays one.
- **(b)** Sub-nav on the detail pages, pure CSS `position: sticky; top: 68px`, anchors only, **no active state** (that needs `IntersectionObserver`). §9 would need an amendment noting the second exception.

I lean **(a)**. A detail page is eight sections, which is a normal page, and the brief's own reference-site list is a literacy source, not an authority over §9.

### 5.7 The hero rule is a sixth use of platform colour

[\[slug\].astro:33](src/pages/platforms/[slug].astro#L33) renders a 1px full-width rule under the `h1` filled with the platform hue. §6's list of permitted uses is labelled *exhaustive* and has five entries; this is not one of them. It also violates no §6 prohibition (not a button, background, body text, heading text, link, card fill or gradient), and it is animated on load (§5.9). Two readings: the list is exhaustive and this must become `--color-accent` or a hairline, or the list enumerates *tags* and a rule is out of its scope. **I read §6 as exhaustive and would change it to a hairline — but it is pre-existing on four pages and I am not touching it without your word.**

### 5.8 Devanagari does not currently render as specified, and the fix is partly outside my scope

Two separate problems.

**Markup.** Six Devanagari runs across the section carry no `lang="hi"` (§10, §15). Fixable inside my scope, but the strings live in `platforms.ts` (a bullet, a stat label, an evidence `output`) and `platform-detail.ts` (a FAQ answer, an agent `output`). Either the content gains markup — which means HTML in data, and `platform-detail.ts` is generated — or the template wraps Devanagari runs at render time with a small helper. **I recommend the render-time helper**: one function, applied where these pages emit prose, content stays plain text, and the generated file stays generated. Your call.

**Font.** [theme.css:114](src/styles/theme.css#L114) sets `font-family: var(--font-sans), var(--font-deva)`. `--font-sans` already ends in the `sans-serif` generic, which always matches, so `--font-deva` is unreachable — Devanagari will fall to the system sans even after the Plex Devanagari file lands. The fix is to reorder the stack in `theme.css`, a **shared global token file the brief bars me from touching without asking.** Flagging it; not doing it. Note that DoD item 7 and §15 cannot both be true until this is fixed.

### 5.9 `theme.css` ships motion the brief's own paragraph rules out

This is the largest conflict, and none of it is code I would be adding — it is already there, and these five pages use it.

`theme.css:247-316` declares a "MOTION SYSTEM" with a stated thesis. Three pieces touch this section:

| Class | What it does | Used by |
|---|---|---|
| `.sweep-rule` | `animation: sweep-rule 900ms … 150ms both` — `scaleX(0)` → `scaleX(1)` **on page load** | Hero rule on `/platforms/` and all four detail pages |
| `.seal-rule` | `animation-timeline: view()` — a rule draws across **as the card scrolls into view** | Every `EvidenceCard` and all 48 `AgentCard`s |
| `.chip-verify` | reversed 1ms load animation ticking borders to Verified teal | Homepage only — not in this section |

Against the contract:

> **§7 Forbidden:** Scroll-triggered fade/slide reveals of any content · Parallax, pinned sections, **scroll-scrubbed anything** · Entrance animation on page load.

> **Your brief:** No content may start at `opacity: 0`. … If you believe a specific interaction genuinely needs JS, stop and ask.

The file argues its own defence, and it is a real argument: *"Every animated element is at its final opacity in the HTML. Nothing fades in. Nothing counts up. If every animation below failed to run, the page would be complete and correct."* Both animate a **decorative 1px rule**, not content; no text starts hidden; nothing is crawler-invisible; `.seal-rule` is CSS-only with no JS and no observer, inside `@supports` and `prefers-reduced-motion: no-preference`. So §1.1 and §1.2 — the rules that actually exist to protect retrieval — are not violated.

But §7 forbids "scroll-scrubbed anything" and "entrance animation on page load" without carving out decoration, and DESIGN.md wins over code by its own §0. **Both classes are in breach of §7 as written.** Options:

- **(a)** Leave both alone. Out of scope, pre-existing, and it touches `theme.css`, `EvidenceCard` and `AgentCard` — all of which are used well beyond my five pages.
- **(b)** Drop `.sweep-rule` and `.seal-rule` from the five platform pages only; classes stay in `theme.css` for other routes. Inconsistent across the site.
- **(c)** Amend §7 to permit decorative, non-content, reduced-motion-gated CSS rules, and record it in DESIGN.md.

I recommend **(a)** for this session and **(c)** as a separate decision, since the honest resolution is a documentation change, not a code change. **Not touching either without your instruction.**

### 5.10 Smaller items, listed so they are not silently resolved

| # | Item | Where |
|---|---|---|
| 1 | `/platforms/` has no `<h2>` above the four cards, and the product names are `<p class="t-h3">`, not headings — a heading-outline gap under §10. | `platforms/index.astro:38-46` |
| 2 | No fixed 40px logo slot on either page type (§8.7, §13, DoD item 5). Nothing holds when the assets arrive. | both files |
| 3 | Roles render borderless; §8.16 specifies card chrome. `/solutions/` already renders the same data as cards. | `[slug].astro:141-147` |
| 4 | `Faq openFirst` on all four detail pages; §8.13 says open-first is `/security/` only. | `[slug].astro:181` |
| 5 | No `FAQPage` JSON-LD for the 21 platform FAQs (§8.13). Fixing needs a prop on **`Base.astro`** — shared, needs your approval. | `Base.astro:40-48` |
| 6 | No `BreadcrumbList` JSON-LD anywhere (§13, §15). Same `Base.astro` constraint. | `Base.astro` |
| 7 | Statute refs and region strings in the compliance chips are not mono (§4 mono rule, §8.15). | `[slug].astro:161-172` |
| 8 | `description={p.pageLede.slice(0, 300)}` truncates mid-sentence on all four. | `[slug].astro:22` |
| 9 | Comparison table `languages` hard-codes AdvoHub `22`; the scrape says `—`. Drift from the content source of truth. | `platforms/index.astro:9-14` |
| 10 | `/platforms/` hero prose is duplicated from `home.ts:disciplineBody` rather than shared. | `platforms/index.astro:26-31` |
| 11 | `theme.css` omits §14 tokens: `--ring-focus`, the `--spacing-*` scale, `--section-gap`, all `--tracking-*` / `--leading-*`. §14 says "verbatim". Pre-existing; shared file. | `theme.css` |

---

## 6. What the brief and the current state already agree on

So the plan does not re-derive it:

- **The four detail pages are already one template over four data inputs.** No per-platform markup except the seat-filter hue map, which dies with `reorder.js`.
- **The link table is already satisfied on all four detail pages**, measured on in-content (`<main>`) links only, excluding nav and footer:

  ```
  /platforms/medorbit/   1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings   ✓
  /platforms/edvation/   1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings   ✓
  /platforms/advohub/    1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings   ✓
  /platforms/trustproperty/ 1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings ✓
  ```

  `/platforms/` is one link short of its target — it emits `1 × /`, `1 × /contact/` and `2 ×` each platform, and is **missing `/ai-agents/`**, which the live page carries.

- **Agent slugs are load-bearing and already verified.** `check-content.mjs` fails the build if `agents.ts` and `platform-detail.ts` diverge. I will not touch a slug.
- **No new dependency is needed for anything in this section.**

---

## 7. Decisions I need before Phase 1

| # | § | Question | My recommendation |
|---|---|---|---|
| 1 | 5.2 | `reorder.js` — remove both, remove one, or approve the exception? | Remove both |
| 2 | 5.5 | Four corrupted `control` values — hand-edit + guard, rewrite the generator, or mask at render? | Hand-edit + guard assertion |
| 3 | 5.6 | Sticky sub-nav on the detail pages — no, or CSS-only with no active state? | No |
| 4 | 5.9 | `.sweep-rule` / `.seal-rule` — leave, strip from these five pages, or amend §7? | Leave; amend §7 separately |
| 5 | 5.8 | Devanagari `lang="hi"` — render-time helper, or markup in the content modules? | Render-time helper |
| 6 | 5.8 | `theme.css` font stack makes `--font-deva` unreachable. Fix it? It is a shared global. | Fix it — DoD item 7 depends on it |
| 7 | 5.10 #5–6 | `FAQPage` and `BreadcrumbList` JSON-LD need a prop on `Base.astro`. In or out? | In — §15 requires both |
| 8 | 5.3 | `${hue}33` invalid border — fix with `color-mix`? It changes 48 agent cards on `/ai-agents/` too. | Fix |
| 9 | 5.7 | Hero rule is a sixth use of platform colour. Keep, or make it a hairline? | Keep for now; decide with #4 |
| 10 | 5.10 #9 | Comparison table: AdvoHub languages `22` or `—`? | `22` — it is defensible from the platform's own copy; but the scrape is the stated source of truth, so your call |

**Stopping here as instructed.** No code will be written until you approve the audit and settle the ten items above — items 1, 2 and 7 change the shape of the plan itself.

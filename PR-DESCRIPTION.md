# Platform section — revision of the five existing routes

`/platforms/` · `/platforms/medorbit/` · `/platforms/edvation/` · `/platforms/advohub/` · `/platforms/trustproperty/`

All five routes already existed and were complete. This is a revision, not a build — **no section was added, removed or reordered on any page**, no band changed, no agent slug touched, no dependency added. `[slug].astro` was already one template over four data inputs and still is; chunk 3 confirmed the remaining three platforms needed no template change at all.

---

## Commits

| | Commit | Merges |
|---|---|---|
| 1 | `7ba1d19` — corrections overlay, Devanagari, JSON-LD, `/platforms/` | ✅ |
| 2 | `90a1010` — detail template, proven on medorbit | ✅ |
| 3 | `8c94a6f` — verify the remaining three, sweep solutions Devanagari | ✅ |
| 4 | `e2fc600` — wrap the four remaining Devanagari runs on the home page | ✅ |
| 5 | `94ee66c` — **pill border → `--color-hairline`** | ⛔ **HELD — needs Yash** |

Commit 5 is deliberately last and self-contained so commits 1–4 can merge without waiting on a visual review. The Devanagari work in commit 4 touches `index.astro` too, and was split out for exactly this reason — an accessibility fix should not sit behind a visual sign-off.

---

## ⛔ Held for Yash — the pill border

`border: 1px solid ${hue}33` emitted `border: 1px solid var(--color-medorbit)33`. CSS custom-property substitution does not merge adjacent tokens, so this resolved to `1px solid #0e7c7b 33` — **invalid at computed-value time**. `border-color` fell back to `currentColor`, which the same rule sets to the hue. So 104 pills have been rendering a **full-hue** border where the code asked for a 20% tint.

### Before / after — one pill per platform

| Platform | Before (as rendered) | After |
|---|---|---|
| **MedOrbit** — `11 AI agents` | border `#0e7c7b` — full hue, **5.01:1** | border `#dde5f0` — **1.27:1** |
| **Edvation** — `20 AI agents` | border `#b45309` — full hue, **5.02:1** | border `#dde5f0` — **1.27:1** |
| **AdvoHub** — `10 AI agents` | border `#8e1f3f` — full hue, **8.69:1** | border `#dde5f0` — **1.27:1** |
| **TrustProperty** — `7 AI agents` | border `#6d28d9` — full hue, **7.10:1** | border `#dde5f0` — **1.27:1** |

Emitted declaration, MedOrbit:

```diff
- background: var(--color-paper); color: var(--color-medorbit); border: 1px solid var(--color-medorbit)33;
+ background: var(--color-paper); color: var(--color-medorbit); border: 1px solid var(--color-hairline);
```

**Fill and text are unchanged on every pill.** Paper fill, hue text at 5.01–8.69:1 — all AA, all §3-measured. Only the 1px outline changes, from a clearly coloured ring to the system's standard hairline. **This is a visible change on 104 pills across 7 pages** and it is what needs signing off.

### Why hairline rather than a 20% tint

- **No spec asks for a hue border.** §8.7 says *"agent-count pill (platform hue on `--color-accent-wash`)"*; §8.10 says *"audience tag (999px pill, platform hue **text** on `--color-accent-wash`)"*; §6 slots 2 and 5 name the location without naming a property. The border was never specified — it appeared when the §6 retraction moved the fill from accent-wash to paper and the pill lost its only boundary.
- **A 20% tint measures 1.31–1.43:1** on paper. At that ratio it decorates rather than identifies, so non-negotiable **8** applies — *platform colour identifies; it never decorates*. The hue stays where the specs put it: the text.
- **`--color-hairline` is already measured in §3** and marked decorative, so no new colour pair enters the system. §8.15 is the precedent — compliance chips are *"`--color-mist` fill, 1px hairline"*.

Pill counts verified unchanged: `/platforms/` 4 · medorbit 11 · edvation 20 · advohub 10 · trustproperty 7 · `/ai-agents/` 48 · `/` 4 = **104**. Zero `)33` occurrences remain.

---

## What changed, by concern

### Corrections overlay — the generated content was corrupted

`scripts/extract-platform-data.py` (not in this repo) let the following `## Roles` section run into the **last agent's `control`** on each of the four platforms. TrustProperty additionally swallowed its entire *"In development — not live today"* list. All of it rendered **inside the Mist well** — the row DESIGN.md §8.1 calls *"the design's whole argument"*.

`src/content/platform-detail.ts` is **not edited**. `platform-detail-fixed.ts` truncates at a sentinel and authors no prose:

| Platform / agent | Generated | Scrape | Strict prefix | Cut |
|---|---:|---:|:---:|---:|
| medorbit / `sahayak` | 147 ch | 40 ch | yes | 107 ch |
| edvation / `science-lab` | 165 ch | 58 ch | yes | 107 ch |
| advohub / `firm-knowledge-agent` | 263 ch | 157 ch | yes | 106 ch |
| trustproperty / `ad-factory` | **629 ch** | **43 ch** | yes | **586 ch** |

`ad-factory` as it now renders:

```
Control
Campaigns are human-approved before launch.
```

All four verified rendering in the Mist well with the `--color-withheld` label and the 8px/16px inset intact. **Zero spill remains anywhere in the built site.**

**Three new `check:content` guards, each tested by tampering with the tree and confirming it fires:**

- remove a dictionary entry → *"undeclared Devanagari run"*
- delete the swallowed text upstream → *"cut sentinel is gone — delete the entry from platform-detail-fixed.ts"*
- change one word of the corrected prose → *"does not match ainexushub/platforms/medorbit/"*

If the generator is ever fixed, the build tells you to delete the overlay rather than silently double-applying.

### Devanagari — 15 runs wrapped, 0 bare

**Note for reviewers:** `:lang(hi), :lang(mr), :lang(kn) { font-family: var(--font-deva) }` at `theme.css:122-126` was **dead code** — nothing on the site carried a `lang` attribute, so it had never matched. The one-line font-stack fix at `theme.css:114` is what makes `--font-deva` reachable at all: the old stack put it *after* `--font-sans`, which ends in the `sans-serif` generic that always matches. Neither change is a no-op; together they are what actually routes Devanagari to the Plex Devanagari cut once the font file lands.

Runs are **declared one by one** in `src/content/indic.ts` with their real language. Devanagari is shared by Hindi, Marathi, Sanskrit, Nepali and Konkani, so a regex stamping `lang="hi"` on anything matching `[ऀ-ॿ]` would be wrong the first time a Marathi run is added. Every run currently on the site is the Hindi endonym — `हिंदी` / `हिन्दी`, U+0939 U+093F U+0902 U+0926 U+0940 — checked for Devanagari numerals (U+0966–U+096F) and confirmed to be letters and vowel marks, including the stat label, whose figure is ASCII `3`.

`<head>` meta/og attributes still contain unwrapped runs. That is correct — an attribute value cannot carry a `<span>`, and structured data takes text, not markup.

### JSON-LD — specified, never emitted

`Base.astro` gains two optional props, both defaulting to today's behaviour so untouched pages emit exactly what they emitted before.

- **`FAQPage`** — each platform page now emits its own set: **5 / 5 / 6 / 5 = 21**. Previously the 21 platform FAQs emitted nothing, and the home page's 9 would have been emitted in their place.
- **`BreadcrumbList`** — §13 lists it and §15 gates the ship on it; it had never been emitted anywhere. Now `Home / Platforms / <Name>` with absolute hrefs, from the same array the visible trail uses, so the two cannot drift.

### `/platforms/`

- Added the **`/ai-agents/` link** the live page carries and ours had dropped — the one link the section was short.
- AdvoHub languages **`22` → `—`**: the scrape is the source of truth and `22` was inferred from prose elsewhere.

---

## Files touched outside the five-page scope

Each approved individually:

- `src/pages/ai-agents.astro` — repoint to the corrections overlay, import line only. It rendered the same four corrupted Control rows.
- `src/pages/solutions/[slug].astro` — repoint to the corrections overlay, import line only.
- `src/pages/solutions/[slug].astro` — `markIndic` on `p.body` (approved sweep).
- `src/pages/solutions/[slug].astro` — `markIndic` on the role-card evidence output. **Scope call:** beyond "repoint plus `p.body`", but the identical one-line fix in a file already open, and leaving it meant handing over *"zero bare Devanagari except two"*. Trivially reversible.
- `src/pages/index.astro` — `markIndic` on 4 runs (commit 4, merges independently).
- `src/pages/index.astro` — pill border (commit 5, **held**).
- `src/components/AgentCard.astro`, `EvidenceCard.astro`, `Faq.astro` — `markIndic`; shared components, so the fix reaches every page that renders those strings.
- `src/layouts/Base.astro` — the two JSON-LD props.
- `src/styles/theme.css` — the font-stack line.

`/`, `/ai-agents/` and `/solutions/*` were re-verified against `detect src` and the link count after each change.

---

## Checks

| Check | Baseline | Now |
|---|---|---|
| `npm run check:content` | pass | **pass**, plus 3 new guard families |
| `npm run build` | clean, 18 pages | **clean, 18 pages** |
| `npx impeccable detect src` | 0 findings | **0 findings** |
| Internal `<a>` links | 869, 0 broken | **870, 0 broken** |
| JS on the five pages | ~2.5 KB | **unchanged** — both scripts kept by decision |

**Link table, counted on `<main>` only** so nav and footer do not inflate it:

```
/platforms/                1 × /  ·  1 × /ai-agents/  ·  1 × /contact/  ·  2 × each platform   ✓
/platforms/medorbit/       1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings        ✓
/platforms/edvation/       1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings        ✓
/platforms/advohub/        1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings        ✓
/platforms/trustproperty/  1 × /  ·  2 × /contact/  ·  1 × /platforms/  ·  3 × siblings        ✓
```

**Progressive enhancement re-verified after every chunk.** Both `reorder.js` behaviours were kept by decision. With JS off: all four table rows present in authored order, all 11/20/10/7 agent cards present, `data-match` 0, inline `border-color` 0, `display:none` 0, and **zero reorder-control markup in the served HTML** — the strip is built at runtime, so nothing renders dead. A `check:content` assertion now enforces that the controls are never authored into markup.

### `detect src` at 0 is not a claim about rendered output

The 0-findings contract holds for `npx impeccable detect src`, which is what the edit hook runs — `.astro` files are scanned in regex mode. Pointing the same detector at the **built HTML** of these five pages gives 299 findings (297 counted + 2 advisory):

| Rule | Severity | `/platforms/` | medorbit | edvation | advohub | trustproperty | **Total** |
|---|---|---:|---:|---:|---:|---:|---:|
| `cramped-padding` | warning | 5 | 50 | 66 | 49 | 40 | **210** |
| `low-contrast` | warning | 15 | 17 | 17 | 17 | 17 | **83** |
| `side-tab` | warning | 4 | 0 | 0 | 0 | 0 | **4** |
| `em-dash-overuse` | advisory | 0 | 0 | 0 | 1 | 1 | **2** |

- **`low-contrast` (83) — all false positives, traced individually.** Three pairs, all reported "on `#ffffff`": `#7c8ba5` ×54, `#a8b4c8` ×19, `#ffffff` ×10. **Every one sits inside the Ink footer or the Ink timeline panel**, whose background is set as `style="background: var(--color-ink)"`. The detector does not resolve `var()`. True ratios: **5.43:1, 8.94:1, 18.72:1** — all pass.
- **`cramped-padding` (210) — same root cause.** Dominant snippets are `"flex"` (69), `"pt-3.5"` (52), `"rounded-[8px]"` (48). The last is the Evidence Card's Control well, which carries `p-4` — the exact 16px inset §8.1 specifies.
- **`side-tab` (4) — genuine and known.** The 3px top rule on the platform cards, which §6 slot 3 permits explicitly and whose retraction note already records that the detector cannot tell a top rule from a left rail.
- **`em-dash-overuse` (2) — advisory, ignored** per review. The prose is verbatim from the scrape.

None of the 297 is a defect fixable without rewriting sourced prose or abandoning a documented §6 slot.

---

## Not in this PR

**DESIGN.md §7 is not amended.** `theme.css` ships `.sweep-rule` (load animation) and `.seal-rule` (`animation-timeline: view()`, scroll-scrubbed) which §7 forbids in terms admitting no exception, while §1.1/§1.2 — the rules that exist to protect retrieval — are satisfied: both animate a 1px decorative rule, and the shipped stylesheet contains **zero** `opacity:0` and **zero** `visibility:hidden`. Under `prefers-reduced-motion: reduce` both no-op to their final state; `.seal-rule` is double-gated behind `@supports` and `no-preference` and is never even declared.

The carve-out is drafted as a **separate proposal** in `MOTION-CARVEOUT-PROPOSAL.md`, with an explicit reject path costed out. **It does not merge with this PR and nothing here depends on it.**

**Also left alone**, flagged in `PLATFORM-SECTION-AUDIT.md` §5.10 and not ruled on: the missing `<h2>` and heading-level gap on `/platforms/`, the absent 40px logo slot on both page types, roles rendered borderless instead of §8.16 cards, `openFirst` on the detail FAQs, statute refs not in mono, the mid-sentence `description` truncation, and the hero rule as a sixth use of platform colour (kept as-is by decision, recorded as an observation). Sticky sub-nav was declined — §9 grants that exception to `/ai-agents/` by name, and this is a revision, not a redesign.

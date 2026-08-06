# Platform section redesign — five pages

`/platforms/` · `/platforms/medorbit/` · `/platforms/edvation/` · `/platforms/advohub/` · `/platforms/trustproperty/`

Branch `feat/platform-redesign`, based on `platform-section-revision`.

Six commits, built in five reviewed units. **Zero runtime dependencies added.** Everything is CSS plus four small vanilla modules.

| | Commit | |
|---|---|---|
| 0 | `20dcc13` | cascade-layer fix — **site-wide, see below** |
| 1 | `2d60223` | motion tokens, enter-once reveal, layout primitives |
| 2 | `a4cb671` | platform sub-nav, build-time active state, 0 JS |
| 3 | `c00106f` | `/platforms/` index — the reference look |
| 4 | `2e13ed3` | four detail pages, one file, content-driven variants |
| 5 | `39e2148` | final pass — a11y fix, `DESIGN.md` reconciliation |

---

## ⚠️ Unit 0 is a correctness fix with site-wide visual consequences

**Reviewers should expect every page to get taller.** This is not part of the redesign and it is not scoped to the platform section.

All 53 top-level rules in `theme.css` were **unlayered**, and unlayered CSS beats layered CSS regardless of specificity. Tailwind v4 emits its utilities inside `@layer utilities`, so `theme.css` silently outranked **every Tailwind utility site-wide**.

Measured by diffing computed styles for **all 7,524 elements across all 18 routes**, before and after. 936 property changes, every one a dead utility coming back to life:

| Property | Count | What was happening |
|---|---:|---|
| `display` | 18 | `lg:hidden` lost to `.btn { display: inline-flex }` — **the mobile hamburger rendered at every width, beside the full nav, on all 18 routes** |
| `marginTop` | **101** | `p { margin: 0 }` outranked every `mt-*` on a `<p>`. `mt-1/3/5/8/10` were **no-ops site-wide** — the vertical rhythm the markup asks for had never rendered |
| `letterSpacing` | 36 | `.t-h4` outranked `tracking-[-0.02em]` on the nav wordmark |
| `height`/`width` | 777 | consequences of the above |

**Height deltas, Unit 0 alone vs. Unit 1's rhythm token, separated:**

| Route | baseline | +Unit 0 (layers) | +Unit 1 (rhythm) | total |
|---|---:|---:|---:|---:|
| `/` | 14923 | +484 | +336 | **+820** |
| `/platforms/` | 3020 | +116 | +72 | +188 |
| `/platforms/edvation/` | 8837 | +320 | +168 | +488 |
| `/ai-agents/` | 13500 | +402 | +144 | +546 |
| `/contact/` | 2119 | +28 | +12 | +40 |
| **all 18** | | **+3005** | **+1752** | |

The 101 restored margins were triaged individually: **90 clean, 11 flagged, 0 needing removal.** Nothing had been cargo-culted or compensated for elsewhere — which is what you'd expect from a codebase written correctly against a cascade that was discarding it. The 36 `letterSpacing` changes are one deliberate override on one element across 18 routes.

Regression check: the only non-hamburger `display` change is `none`; four `.seal-rule` transform deltas were a snapshot-timing artifact of the height change, confirmed by scrolling each into view on both builds.

---

## Nine rulings that reversed the original brief

The brief was written before its author had read `DESIGN.md`. Each conflict was surfaced rather than resolved in code, and ruled on individually.

| # | Brief asked for | Shipped | Why |
|---|---|---|---|
| 1 | Max 1 accent + 1 tint | **Four platform hues kept**; each page uses exactly one as its accent, everything else neutral | §6 — four sub-brands inside one parent. Collapsing them makes the "one engineering discipline" headline visually false |
| 2 | `number-flow` counters | **Not installed.** Figures render static in `mono-lg` at final value | §1.1 — the brand exists partly to criticise count-up: *"a competitor's homepage reads to every crawler as '0% increase'"* |
| 3 | Logo trust marquee | **Not built** | §1.4 bans logo carousels, §7 bans marquees — and the company has no customer logos |
| 4 | Testimonial / case-study | **Not built** | No customers exist. Writing one would be fabricating a quote |
| 5 | Sticky sub-nav | **Built** — §9 amended | Five pages whose only lateral navigation was a strip at the foot of each. A real usability gap, not decoration |
| 6 | 120–160px sections | **120px ceiling, 56px floor**, applied site-wide via `--section-y` | 160px would desync from the other 13 routes |
| 7 | Sonner toasts | **Not installed** | Nothing on these pages submits |
| 8 | Hover lift + shadow | **Neither.** Surface step + accent border + one revealed affordance | §11 — no resting shadows, no hover lift. The replacement is richer without inventing an elevation plane the system doesn't have |
| 9 | Parallax, sticky scroll showcase | **Not built.** Enter-once reveals only — §7 amended | Arrival vs. driving. The page may acknowledge you arrived; it may not drive |

**And the big one — the bundle.** The brief's first revision asked for React + `motion` + WebGL, reversing the CSS-first preference. I built it, measured it, and reported **109.1 KB gzipped on one page** (React 20.3 + react-dom 57.2 + motion 20.1) against a site whose stated identity is *"~400 bytes of JavaScript on most pages"*. That direction was cancelled and the budget reset to ≤8 KB gz for the whole section. The React/WebGL branch was deleted.

---

## Final numbers against budget

| | gz external | inline | ceiling |
|---|---:|---:|---|
| `/platforms/` | 1,223 B | 605 B | 4 KB |
| each detail page | 1,578 B | 605 B | — |
| **section union** | **1,602 B** | | **8 KB** |

**20% of the section ceiling.** Four modules: `reveal.js`, `tabs.js`, `reorder.js` (pre-existing FLIP sort), and two inline pre-paint scripts (reveal arming, 146 B chip auto-scroll).

| Check | Result |
|---|---|
| `npm run check:content` | **pass** |
| `npm run build` | **clean, 18 pages** |
| `npx impeccable detect src` | **0 findings** |
| Internal links | **891, 0 broken** |

---

## What changed, by surface

**Hero, all five.** eyebrow → h1 → lede → primary + secondary. The index previously had no eyebrow, no proof and no action at all. Entrance is CSS `@keyframes` staggered from `--i` — self-completing, so JS-off readers see it finish and crawlers read finished text from the HTML.

**Platform cards.** §8.7's fixed 40px lockup slot, finally used — real logos drop in later with no reflow. Heading order fixed: the page went `h1` → nothing → `h3`; it now has a real `<h2>`. Agent counts render at rest in muted `mono` and step to ink on hover, per amended §11.

**Comparison table, rebuilt.** Numerals in `mono`, names in sans. 64px rows against the old 15px cells. Row hover fills the whole row. Real `<caption>`, `scope` on every header cell.

**Detail pages: one file, four compositions.** `heroLayout` and `capabilityLayout` are union-typed fields in `platforms.ts` — an invalid value is a build error. **No `slug ===` branch exists in the template.**

| | hero | capability | mock |
|---|---|---|---|
| medorbit | `mock-below` | bento | timeline |
| edvation | `left-mock-right` | **tabs** | timeline |
| advohub | `left-narrow-refs-right` | alternating | **citations** |
| trustproperty | `split` | bento | timeline |

**Mocks are DOM/CSS from real content.** No product screenshots exist and none can be exported. Every value comes from `src/content/`; where a mock would need a number content doesn't have, the number is absent rather than invented. Each carries its §1.5 illustrative label.

**Tabs are a real tablist** — `role=tablist/tab/tabpanel`, `aria-selected`, `aria-controls`, roving tabindex, arrow keys, Home/End. Radio + `:checked` would be free but announces a radio group, which is wrong.

**Edvation's 20 agents** are grouped by seat with a `mono` count per group, staggered per group rather than per card.

---

## Bugs found and fixed during the build

Each was found by measuring or screenshotting, not by reading the code.

1. **Sticky `<thead>` never worked.** `overflow-x: auto` forces computed `overflow-y: auto`, so the header pinned to the wrapper and scrolled away — measured `top: -56px` where it should have been 124. Fixed by splitting the two sticky behaviours by viewport: header at ≥1024px, pinned first column below.
2. **The fix for #1 broke at 390px** — the header parked itself mid-table on top of a data row.
3. **The fix for #2 silently broke #1** — the media block declaring `sticky` sat before the base rule at equal specificity, so source order won.
4. **A scoped class passed to `<Reveal>` is dead CSS.** Astro doesn't add the parent's `data-astro-cid` to a child component's root, so `grid-column: span 2` resolved to `auto` and two `display: flex` rules to `block`. Three components affected — **including Unit 3's platform cards, which were shipping wrong when approved.**
5. **Tabs stranded content with JS off** — the SSR shipped `hidden` on 5 of 6 panels. Now no `hidden` in the HTML; a pre-paint rule scoped to the armed root shows the first, and `initTabs` takes over.
6. **Contrast failure**: alternating-layout numerals used `--color-control` on a Wash band — **3.32:1**. They're `aria-hidden`, but that doesn't exempt visible text from 1.4.3. Moved to `--color-muted`, 4.93:1.

---

## Verified in the final pass

All five pages, 1440 and 390:

- **Heading order** — one `<h1>` per page, zero level skips
- **Section rhythm** — identical across all four detail pages
- **Hue slots** — card top rule, eyebrow/tag text, legend swatch, agent audience tag, sub-nav active rule; all §6-sanctioned
- **Focus rings** — 0 missing across 301 focusable elements
- **Tablist** — no keyboard trap; Tab escapes to the panel, Shift+Tab returns
- **`aria-current`** — exactly one in the sub-nav per page, on a `<span>`, not focusable
- **Reduced motion** — 0 elements with text at `opacity: 0`, 0 running animations, every reveal marked revealed, full text present

---

## Open items

**Edvation grouping stays at four groups.** You asked me to sub-split the 16 Students agents. The data doesn't support it: alphabetical gives **10 groups for 16 cards, 7 of them singletons**; first-meaningful-word gives **15 groups, 14 singletons**. Neither is a legible split. A genuine agent↔module mapping doesn't exist in content and inventing 20 assignments isn't in scope.

**`mock-below`, not `centred-mock-below`.** The mock is centred; the copy is not. §8.5 says the hero is *"left-aligned, never centered"*, §11 says don't centre a heading or body copy, §8.18 makes the CTA band the only centred block. The field is named after the actual behaviour.

**The invalid `${hue}33` pill declaration is still present** on this branch. It's held work on `platform-section-pill`, deliberately excluded from this base.

**`DESIGN.md` §14b** is the reconciliation — every amendment across the five units in one table, plus two recorded fragilities (`Reveal`'s margin-collapse dependency; scoped classes on child components being dead CSS) and one verification method that produced a false pass (checking rendered variants by grepping the document, which matches the inlined stylesheet and reported all four pages identically).

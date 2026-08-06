# DESIGN.md — AI Nexus Innovations Hub

> **Evidence on white.** A documentary instrument, not a brochure.
> Final design system. This file is the single source of truth — if code and this file disagree, this file wins.

**Theme:** light only (no dark mode — see §12)
**Scope:** the full `ainexushub.ai` marketing site, 19 pages, front-end only, no backend.

---

## 0. How to use this file

Every section below is a decision, already made. Do not re-open them per page.

- Building a page → §9 has a blueprint for all 19.
- Building a component → §8 has a spec for all 22.
- Picking a color/size/radius → §3–§7. Nothing outside these tables ships.
- Tempted to add motion, a gradient, a shadow, or a fifth color → §11 says no, and why.
- Building inside `/platforms/*` → **read §16 first.** Those five routes override §5, §7, §8.7, §8.14 and §11, and the overrides win there. Everywhere else the unamended rule stands.
- About to report something as verified → §14b lists the checks that produce confident wrong answers.

---

## 2. Direction

### The thesis

The product's entire pitch is *"AI that shows its work."* Page citations. Indian Kanoon verification. Hash-chained custody. Append-only audit logs. Fail-closed consent.

So the design's job is **to look like something that could be audited.** Not friendly. Not exciting. **Legible, sourced, and dry** — the visual register of a well-set technical document, not a SaaS landing page.

Achromatic canvas. One accent, rationed. Hierarchy from size and spacing, never from color. Hairlines instead of shadows. Monospace wherever a value is meant to be *checked* rather than *read*.

### What was taken from the reference systems

| Source | Taken |
|---|---|
| **Clearbit** | The core register — near-achromatic canvas, hierarchy from size not color, hairline borders, *"the only shadow in the system is a focus ring."* This is the backbone. |
| **Synthesia** | Tight negative tracking on display type; the closed radius ladder; one saturated accent as the sole filled-button color. |
| **Arcade** | Body text sits one step lighter than headings (quiet-to-loud hierarchy); desaturated logo treatment; 1200px container with full-bleed bands. |
| **Amplemarket** | Color-coded taxonomy — solves the four-platform problem. Adapted hard: our platform hues are *tags*, never card fills. |
| **Dock** | Section-gap rhythm and the discipline of a single typeface across the whole range. |
| **Relate / FeedHive** | Studied, mostly rejected. |

### What was rejected, and why

- **Pill buttons** (Dock 48px, FeedHive/Relate 9999px) — reads consumer-friendly. A platform sold to hospitals and courts uses 8px. Buttons should look actionable, not decorative.
- **Warm cream canvas** (Dock `#faf9f7`, Amplemarket `#f6f5f3`) — warmth reads approachable/consumer. Clinical and legal want cool.
- **Gradient hero fields** (Arcade, Amplemarket, Relate) — large-scale color is a claim this brand doesn't make. The hero is type on white.
- **Clearbit's positive tracking** — its "diffused, architectural" effect reads airy. We want *compressed and precise*, so tracking goes negative. This is the one place we break from our primary reference, deliberately.
- **Inter** — flagged as a generic-AI tell, and it has no Devanagari. See §4.
- **Pastel taxonomy card fills** (Amplemarket) — would turn a governance page into a toy. Platform color is confined to §6.
- **Floating "Book demo" widget** (Synthesia) — a persistent nag contradicts a brand that says *"we reply within one business day"* and means it.

---

## 3. Tokens — Color

Every value below is contrast-verified. Ratios are measured, not estimated.

### Neutrals

| Name | Value | Token | Role | Contrast |
|---|---|---|---|---|
| Paper | `#ffffff` | `--color-paper` | Page canvas, card surfaces | — |
| Wash | `#f4f7fc` | `--color-wash` | Alternating section bands, nested wells | — |
| Mist | `#eef2f9` | `--color-mist` | Input fills, table zebra, hover fills | — |
| Hairline | `#dde5f0` | `--color-hairline` | Card borders, dividers, table rules | decorative |
| Control | `#7589a6` | `--color-control` | Input borders, checkbox frames, focus-adjacent edges | **3.57:1** on paper ✓ non-text AA |
| Ink | `#0b1220` | `--color-ink` | Headings, display type, dark panels | **18.72:1** ✓ AAA |
| Body | `#3d4a61` | `--color-body` | Body copy, list items, table cells | **8.93:1** ✓ AAA |
| Muted | `#5f6c85` | `--color-muted` | Metadata, captions, helper text, timestamps | **5.29:1** ✓ AA |

> `Muted` was originally specced at `#6b7891` and measured 4.45:1 — below AA. Corrected. Do not lighten it back.

### Accent — one hue, rationed

| Name | Value | Token | Role | Contrast |
|---|---|---|---|---|
| Nexus Indigo | `#2b46d4` | `--color-accent` | The only filled-button color. Links, focus rings, active states, check glyphs. | **7.17:1** on paper ✓ AAA · white on it **7.17:1** ✓ AAA |
| Indigo Deep | `#1d31a8` | `--color-accent-deep` | Hover/pressed state for filled buttons only | white on it **10.21:1** ✓ AAA |
| Indigo Wash | `#eaeeff` | `--color-accent-wash` | Pill badge fills, the Control row tint on evidence cards | — |

**Budget: accent covers under 5% of any viewport.** If a screen has two competing indigo fills, one is wrong.

### Semantic (state only — never decoration)

| Name | Value | Token | Role |
|---|---|---|---|
| Verified | `#0e7c7b` | `--color-verified` | The ✓ on a verified citation. Nothing else. |
| Withheld | `#8e1f3f` | `--color-withheld` | "Removed from answer", "not on file", stripped-citation states. Nothing else. |

These two exist because the product's core story is *what gets through* and *what gets stopped*. They are the only status colors in the system. There is no generic success-green or error-red.

---

## 4. Tokens — Typography

### The family: IBM Plex

One superfamily, three members, all SIL OFL.

| Member | Token | Used for |
|---|---|---|
| **IBM Plex Sans** | `--font-sans` | Everything Latin — display, headings, body, UI |
| **IBM Plex Sans Devanagari** | `--font-deva` | हिंदी / मराठी / कन्नड़ and all Indic script runs, via `unicode-range` |
| **IBM Plex Mono** | `--font-mono` | **See "The mono rule" below — this is a signature, not a fallback** |

**Why Plex, not Inter.** Inter is the flagged generic-AI tell and ships no Devanagari — for a site claiming 22 Indian languages that is a correctness failure, not a taste one. Plex was drawn for a technology company's institutional voice, has a real Devanagari cut in the same superfamily, and carries a matched mono. One decision solves script coverage, brand character, and the mono requirement together.

**Weights:** 400, 450 (text), 500, 600. Never 700+ — heavy weight is shouting, and this brand doesn't.

### The mono rule — the system's signature

**Monospace means "this value is meant to be checked, not just read."**

Set in `--font-mono`:
- Page citations — `Science · Ch 4 · p. 87`
- Statute and case refs — `NI Act §141`, `BSA 2023 §63`, `DPDP §8(4)`
- Identifiers — CNR numbers, ABHA, IRN, UEN `202550378W`, CIN `U47413KA2025PTC210603`
- Every count in a stat strip — `48`, `23`, `640+`, `100+`
- Prices — `₹1,499`, `₹3,999`
- Timestamps in the agent-timeline panels — `08:00`, `23:40`
- Scores — `82/100`
- Region strings — `ap-south-1`

Set in `--font-sans`: everything else, without exception.

No other site in the reference set does this. It is the typographic expression of the product's only real claim, and it costs nothing.

### Type scale

Negative tracking, opening toward zero as size drops. Plex Sans runs slightly wide; the tracking pulls display sizes into a dense, engineered block.

| Role | Size | Line height | Tracking | Weight | Token |
|---|---|---|---|---|---|
| display | 68px | 1.02 | -0.035em | 600 | `--text-display` |
| h1 | 52px | 1.06 | -0.03em | 600 | `--text-h1` |
| h2 | 38px | 1.12 | -0.025em | 600 | `--text-h2` |
| h3 | 26px | 1.20 | -0.018em | 600 | `--text-h3` |
| h4 | 20px | 1.30 | -0.012em | 600 | `--text-h4` |
| lede | 20px | 1.55 | -0.008em | 400 | `--text-lede` |
| body | 17px | 1.62 | -0.005em | 400 | `--text-body` |
| body-sm | 15px | 1.55 | 0 | 400 | `--text-body-sm` |
| caption | 13px | 1.45 | 0 | 450 | `--text-caption` |
| eyebrow | 12px | 1.30 | **+0.08em** | 600 | `--text-eyebrow` |
| mono | 14px | 1.45 | 0 | 450 | `--text-mono` |
| mono-lg | 34px | 1.10 | -0.02em | 500 | `--text-mono-lg` |

`eyebrow` is the only positive tracking in the system, always uppercase.
`mono-lg` is for stat-strip figures.

**Responsive:** below 768px, `display` → 40px, `h1` → 34px, `h2` → 28px, `mono-lg` → 26px. Tracking scales with them. Body sizes never shrink.

**Measure:** prose caps at **68ch** (~720px). The 1200px container is for layout, never for a paragraph.

---

## 5. Tokens — Space, Shape, Elevation

**Base unit: 4px. Scale moves on 8.**

### Spacing

`4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

### Layout

| Property | Value |
|---|---|
| Page max-width | `1200px` |
| Prose max-width | `68ch` (~720px) |
| Gutter | 24px mobile / 32px tablet / 48px desktop |
| Section gap | `clamp(3.5rem, 7.5vw, 7.5rem)` — 120px desktop · 56px mobile floor |
| Card padding | 24px (32px on large panels) |
| Grid gap | 24px |

### Radius — a closed ladder of four. No intermediate values.

| Value | Applies to |
|---|---|
| `8px` | Buttons, inputs, selects, small chips |
| `12px` | Cards — evidence cards, agent cards, platform cards |
| `16px` | Large panels, dark blocks, image frames, tables |
| `999px` | Pills only — eyebrows, badges, agent-count tags |

Never 4px. Never 10px. Never 20px. Never a pill button.

### Elevation — surface steps, not shadows

Depth comes from **surface lightness + a 1px hairline**, following Clearbit. There are exactly two shadow tokens in the entire system:

| Token | Value | Only used for |
|---|---|---|
| `--shadow-sticky` | `0 1px 0 0 #dde5f0, 0 4px 16px -8px rgba(11,18,32,0.10)` | The nav bar, once it has scrolled |
| `--ring-focus` | `0 0 0 2px #ffffff, 0 0 0 4px #2b46d4` | Keyboard focus, every interactive element |

Resting cards have **no shadow**. Ever.

**Overridden inside `/platforms/*` (§16.1).** Those five routes ship a real
elevation scale — `--shadow-1/2/3` and `--lift: 4px` — because four products
side by side need faster separation than a hairline gives. Every value is
derived from `--color-ink` at low alpha. This does not apply to the other
thirteen routes, and the scoping is enforced by import, not by convention.

### Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | Page canvas |
| 1 | Wash | `#f4f7fc` | Alternating section bands |
| 2 | Card | `#ffffff` + 1px `#dde5f0` | Cards floating on a Wash band |
| 3 | Mist | `#eef2f9` | Wells nested *inside* a card (the Control row) |
| 4 | Ink | `#0b1220` | The dark block — used at most **twice** per page |

**Banding rule:** sections alternate Paper → Wash → Paper. Never two Wash bands adjacent. A card on Paper carries a hairline; a card on Wash carries a hairline too (the tint alone isn't enough separation at this low contrast).

---

## 6. The four platform identities

Four sub-brands inside one parent system. This is the hardest constraint in the project and the rule is strict.

| Platform | Hue | Token | Contrast on paper |
|---|---|---|---|
| **MedOrbit** — Healthcare | Clinical Teal `#0e7c7b` | `--color-medorbit` | 5.01:1 ✓ AA |
| **Edvation** — Education | Ochre `#b45309` | `--color-edvation` | 5.02:1 ✓ AA |
| **AdvoHub** — Legal | Oxblood `#8e1f3f` | `--color-advohub` | 8.69:1 ✓ AAA |
| **TrustProperty** — Property | Violet `#6d28d9` | `--color-trustproperty` | 7.10:1 ✓ AAA |

Four well-separated hues, each deep enough to hold white text *and* to sit on white.

### Where platform color is permitted — exhaustive list

1. The **eyebrow** above a platform heading — `MEDORBIT · HEALTHCARE`
2. The **agent-count pill** — `11 AI agents`
3. A **3px top rule** on a platform card
4. A **9px legend swatch** beside that platform's name in the comparison table
5. The **audience tag** on an agent card

> **Retracted.** #4 originally read *"the left rule on that platform's comparison-table row."* A 3px colored side border is the single most recognizable AI-UI tell. Replaced with a legend swatch, which identifies a series the way a chart legend does. The agent-count pill (#2) also moved off `--color-accent-wash` onto paper after measuring **4.34:1** — below AA.

### Where it is forbidden

- Never a button fill. Every filled button on the site is Nexus Indigo. All four platform pages included.
- Never a section background.
- Never body text, heading text, or link color.
- Never a card fill or a gradient.
- Never more than one platform hue in a single component.

**Rationale:** these are four products from *one* company with *one* engineering discipline — the site says so in its own headline. If MedOrbit pages turn teal and AdvoHub pages turn oxblood, the parent brand dissolves and the "one discipline" claim becomes visually false. Color identifies; it does not decorate.

---

## 7. Motion

**Motion budget: near zero.**

### Permitted

| What | Spec |
|---|---|
| Hover / focus color + border transitions | `120ms` `cubic-bezier(0.4, 0, 0.2, 1)` |
| Button press | `transform: translateY(1px)`, `80ms` |
| `<details>` accordion open | native, or `200ms` height ease |
| Nav shadow on scroll | `160ms` opacity |
| Mobile menu | `200ms` slide |

### Enter-once reveals — permitted, and the line they must not cross

**Amended.** §1.2 exists to stop content being unreachable, not to stop a page
acknowledging that you arrived. Those are different things, and the original
wording collapsed them. The distinction that matters is **arrival vs. driving**:

| Permitted | Forbidden |
|---|---|
| Enter-once reveal: `opacity 0→1` + `translateY 12px→0`, `400ms`, 60ms stagger | Anything where scroll **position** sets progress |
| Fired by `IntersectionObserver`, element unobserved once revealed | Re-triggering on scroll back up |
| Hidden state scoped to a root attribute an inline script sets | Hidden state in the stylesheet unconditionally |

The scoping is the load-bearing part. `html[data-reveal-ready] [data-reveal]`
carries the hidden state, and only an inline script sets that attribute — so
with JavaScript off, or for a crawler, the attribute never appears, nothing is
ever hidden, and §1.2 holds exactly as written. Under
`prefers-reduced-motion: reduce` every element is marked revealed immediately.

### Forbidden

- Scroll-**scrubbed** reveals — any effect where scroll position drives progress
- Sticky product showcases that swap visuals as you scroll
- Count-up / odometer / `NumberFlow` on any figure
- Parallax, pinned sections, scroll-scrubbed anything
- Marquees, auto-carousels, typewriter effects

**All five of the above are permitted inside `/platforms/*` — see §16.**
Scroll-scrubbed effects, sticky showcases, parallax, marquees and count-up are
all in use on those five routes under §16.3's constraints. Count-up carries a
condition rather than a permission: the server must render the final value as
text, because the reason for the ban was that a crawler reads `0%`. Everywhere
else on the site this list stands unamended.
- Skeleton loaders (this is a static site — nothing loads)
- Entrance animation on page load

**GSAP, Lenis, and Motion are not installed.** The stack docs list them; this project doesn't use them. Adding an animation library to a site whose defining rule is *"never animated from zero"* would be building the thing the brand exists to criticize.

`prefers-reduced-motion: reduce` → all transitions to `0.01ms`. Trivially satisfied, since there's almost nothing to reduce.

---

## 8. Components

22 components. Everything on all 19 pages is built from these.

---

### 8.1 Evidence Card — **the system's core component**

Used ~60 times across the site (every agent, every platform, every solution page). Everything else in this system exists to support it. Get this right first.

Structure: three labelled rows — **Input**, **Output**, **Control** — in fixed order.

```
┌─────────────────────────────────────────────┐
│ WORKED EXAMPLE · FRONT-DESK VOICE AGENT     │  eyebrow, muted, 999px pill
│                                             │
│ Input                                       │  caption 13px, weight 600, ink
│ A patient calls at 20:40, after the front   │  body-sm 15px, body color
│ desk has closed.                            │
│ ─────────────────────────────────────────── │  1px hairline
│ Output                                      │
│ The agent answers in the hospital's name,   │
│ offers the next three orthopaedics slots…   │
│ ─────────────────────────────────────────── │
│ ┌───────────────────────────────────────┐   │
│ │ Control                               │   │  Mist well, 8px radius
│ │ Booking tools are cryptographically   │   │  inset 16px
│ │ signed; every call is logged.         │   │
│ └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Spec:** Paper surface, 1px `#dde5f0`, 12px radius, 24px padding. Row labels `caption` 600 in `--color-ink`. Row text `body-sm` in `--color-body`. Rows separated by 1px hairline with 16px vertical padding.

**The Control row is the design's whole argument.** It sits in a Mist well (`#eef2f9`, 8px radius, 16px inset) so it reads as a *constraint enclosing* the output above it, not a third bullet. This is the only nested surface in the system and it is reserved for this.

- Any citation, statute ref, page number, ID or figure inside → `--font-mono`.
- Where the Control describes a block ("removed from answer", "not on file", "escalates to your staff"), the label takes `--color-withheld`.
- Where it describes a verification that passed, the label takes `--color-verified`.
- No shadow. No hover state — it is not interactive.

---

### 8.2 Buttons

| Variant | Spec |
|---|---|
| **Primary** | `#2b46d4` fill, white text, 8px radius, 12px/20px padding, `body-sm` 500. Hover → `#1d31a8`. Active → `translateY(1px)`. |
| **Secondary** | Paper fill, `--color-ink` text, 1px `--color-control`, 8px radius, same padding/weight. Hover → `--color-mist` fill. |
| **Text link** | `--color-accent`, no underline at rest, underline on hover. Weight 450. |

Pairing: hero and CTA band use Primary + Secondary side by side, equal size. Primary always sits left.

**One Primary per viewport.** The nav CTA doesn't count while scrolled past.

---

### 8.3 Navigation

Paper, 68px, sticky. Logo left. Links center (Platforms, Solutions, AI agents, Security, About). Right: `Sign in` text link + `Book a demo` Primary.

At rest: 1px bottom hairline, no shadow. Scrolled: `--shadow-sticky`.
Links `body-sm` 450 in `--color-body`; hover → `--color-ink`. Active page → `--color-ink` 600 with a 2px accent underline.

Mobile < 900px: hamburger → full-height Paper panel, links at `h4`, CTA pinned bottom.

---

### 8.4 Footer

Ink `#0b1220`, full-bleed, 80px vertical padding. Reversed type: headings white, body `#a8b4c8`, links white on hover.

Four columns — Platforms · Solutions · Company · Product sites. Then a hairline in `rgba(255,255,255,0.12)`, then a bottom bar carrying, in `--font-mono` at `caption`:

```
raju@ainexushub.ai · +91 95385 22221 · Mon–Sat, 9:00–19:00 IST
AI Nexus Innovations Hub Pvt. Ltd. · CIN U47413KA2025PTC210603 · Bengaluru
AI Nexus Innovations Hub Pte. Ltd. · UEN 202550378W · Singapore
```

The original brief put contact details in the footer deliberately. Both legal entities appear in full on every page.

---

### 8.5 Hero

Left-aligned, never centered. Type on Paper — no gradient, no image, no video.

```
[eyebrow pill]                    ← platform hue on platform pages
Display headline                  ← 68px/600/-0.035em, max 20ch
Lede paragraph                    ← 20px, max 68ch, --color-body
[Primary] [Secondary]
```

Breadcrumbs sit above the eyebrow on every page except home, at `caption` in `--color-muted`, `/` separators.

**The watermark:** the logo's wave mark, `#f4f7fc`, ~640px, absolutely positioned bleeding off the right edge, `z-index: -1`, `aria-hidden`. Home page only. Faint enough that it reads as paper texture. The original build note — *"never competing with the text"* — is the acceptance test.

---

### 8.6 Stat Strip

4-up on a Wash band, hairline dividers between. Figure in `--font-mono` `mono-lg` in `--color-ink`; label below at `caption` in `--color-muted`.

**Server-rendered at final value. No animation.**

Mobile: 2×2.

---

### 8.7 Platform Card

Paper, 1px hairline, 12px radius, 24px padding, **3px top rule in the platform hue**.

Logo lockup in a **fixed 40px-height slot** — the four lockups have four different aspect ratios and the slot keeps grid rhythm. `alt` carries the product name so the heading stays crawlable.

Then: subtitle (`body-sm`, muted) → 3 bullets (`body-sm`, 8px gaps, accent check glyphs) → agent-count pill (platform hue on `--color-accent-wash`) → two links (`Explore →` text link + `medorbit.ai ↗` muted).

Hover: border → `--color-control`. No lift, no shadow, no scale.

**Overridden inside `/platforms/*` (§16.1).** There the card rests on
`--shadow-1` and hover adds a surface step, the page accent on the border, an
arrow affordance, `--shadow-2` and a 4px lift — additively. The four signals are
not traded for one.

---

### 8.8 Alternating Product Row

Home page, once per platform. Two columns, 48px gap, alternating sides per row.

Left: eyebrow (platform hue) → `h2` → body → 3 feature blocks (`h4` + `body-sm`) → 4-up stat strip → two buttons.
Right: **Agent Timeline Panel** (§8.9) stacked above an **Evidence Card** (§8.1).

Below 900px: single column, panel always after the text.

---

### 8.9 Agent Timeline Panel

The "A day with the agents" / "Teacher dashboard — today" / "Tomorrow's cause list" / "TrustLine — 23:40" panels.

Ink `#0b1220`, 16px radius, 24px padding. **One of the two permitted dark blocks per page.**

Header at `caption` in `#a8b4c8`. Then 4 rows, each: timestamp or label in `--font-mono` `#a8b4c8` (fixed 64px column) · event in white `body-sm` · outcome in `#a8b4c8`, right-aligned. 1px `rgba(255,255,255,0.10)` between rows.

Footer caption, mandatory, `#7c8ba5` italic: *"Illustrative sequence — every step is a shipped capability."*

No shadow on dark surfaces — the dark fill *is* the elevation.

---

### 8.10 Agent Card

48 of these on `/ai-agents/`, plus repeats on platform pages.

Paper, 1px hairline, 12px radius, 24px padding. Anchor target (`id="front-desk-voice"`) with `scroll-margin-top: 88px` to clear the sticky nav.

`h4` name → audience tag (999px pill, platform hue text on `--color-accent-wash`) → one-line description (`body-sm`, muted) → hairline → **Evidence Card rows inline** (§8.1 structure, no nested border).

Grid: 3-up desktop / 2-up tablet / 1-up mobile.

---

### 8.11 Governance Grid

Eight controls. Appears three times (home, `/security/`, `/ai-agents/`) — identical every time.

4×2 desktop, 2×4 tablet, 1×8 mobile. Each cell: no card chrome, just a 2px left rule in `--color-accent`, 16px padding-left. `h4` heading → `body-sm` in `--color-body`.

Borderless is deliberate: eight bordered cards would read as a badge wall.

---

### 8.12 Deployment Steps

Four steps: Scope · Configure · Migrate · Go live.

Horizontal on desktop, connected by a 1px hairline running behind the numerals. Number in `--font-mono` `h3` in `--color-control` (`01`–`04`), then `h4` title, then `body-sm`.

Below the four, in `--color-muted` `caption` — required, do not cut:
*"We do not publish a go-live duration, because we have not measured one across enough institutions to quote honestly."*

That sentence is the brand's whole voice. It stays.

---

### 8.13 FAQ Accordion

**Native `<details>` / `<summary>`. Zero JavaScript.**

Content inside a `<details>` is in the DOM and crawlable, keyboard-accessible for free, and works with JS disabled — which is precisely what a retrieval-first site needs. A JS accordion here would be strictly worse *and* more code.

Row: 1px bottom hairline, 20px vertical padding. Summary at `h4` weight 500 in `--color-ink`, `cursor: pointer`, `list-style: none`. Chevron right-aligned, rotates 180° on `[open]`. Answer at `body` in `--color-body`, max 68ch, 12px top padding.

First item open by default on `/security/`; all closed elsewhere.

Emit `FAQPage` JSON-LD from the same source data.

---

### 8.14 Comparison Table

**Real `<table>`, real `<th scope="col">`.**

**Extended inside `/platforms/*` (§16.1):** sortable column headers carrying
`aria-sort`, and a 460ms FLIP re-rank. The headers ship as plain text and are
upgraded into buttons by script, so with JS off a reader gets a readable header
rather than a control that does nothing.

`<caption>` **present and accessible, not necessarily visible.** Amended: a
`<caption>` must be a child of `<table>`, so it cannot be lifted out of the
horizontal-scroll wrapper — a visible one scrolls sideways with the table and
clips. Measured at 390px. Keep it as the accessible name and let a visible lede
above the table carry the sighted version.

Header row on Wash, in the `eyebrow` role — a column label is what eyebrow is
for, and `caption` size reads as shrunken body. Cells `body-sm`. **Row height on
the 8-scale, 48px minimum.** Numeric columns right-aligned in `--font-mono`.

**Zebra: only on tables over ~8 rows, and only where rows have no hover state.**
Amended: zebra in `--color-mist` and row hover in `--color-mist` cannot coexist,
and hover is the one carrying information. Four rows with a hairline between each
do not need banding to track across.

**Sticky `<thead>` and a sticky first column are mutually exclusive**, because
`overflow-x: auto` forces computed `overflow-y: auto` and a sticky header then
pins to the wrapper rather than the viewport. Split them by viewport: header
sticks where the table fits without scrolling, first column pins where it does
not.

Wrapper: `overflow-x: auto`, 16px radius, 1px hairline. The page body never scrolls sideways.

---

### 8.15 Compliance Chip Row

Wrapping row of 999px pills — `ABDM / ABHA`, `FHIR R4 · HL7 v2`, `BSA 2023 §63`, `ap-south-1`…

`--color-mist` fill, 1px hairline, `caption` in `--color-body`, 6px/14px padding, 8px gaps. Statute refs and region strings inside take `--font-mono`.

**These are not logos and must never become logos.** Header above them, mandatory:
*"These are capability statements, not certification logos. Certificates are published only when they exist."*

---

### 8.16 Role Card

`h4` role name → `body-sm` description → optional inline Evidence Card. Paper, hairline, 12px radius, 24px padding. Grid 3-up / 2-up / 1-up. On `/solutions/*` some carry an `In practice ·` evidence block; those cards simply grow — no equal-height forcing.

---

### 8.17 Cross-link Strip

The "More from AI Nexus" / "Other industries" strips. 3-up grid of compact cards: platform hue eyebrow, `h4` name, `body-sm` descriptor, whole card is the link. Hover: border → `--color-control`.

---

### 8.18 Global CTA Band

Appears at the foot of 14 pages. Wash band, 80px vertical padding, centered — the **only** centered block in the system, which is what makes it read as a terminal moment.

`h2` "See a platform in action." → `body` lede (max 68ch) → `[Book a demo]` `[Connect on LinkedIn]`.

---

### 8.19 Contact Form

**UI only — no backend.** On submit: `preventDefault`, swap the panel for a success state naming `raju@ainexushub.ai` as the direct route. Client-side validation only.

Fields: Name · Organisation · Work email · Phone · Which platform? (`<select>`, 6 options) · What would you like to see? (`<textarea>`).

Labels always visible at `caption` 600 — **no placeholder-as-label**. Inputs: Paper fill, 1px `--color-control`, 8px radius, 12px/14px padding, `body-sm`. Focus: `--ring-focus` and border → `--color-accent`. Errors: `--color-withheld` text below the field, `aria-describedby`, `aria-invalid`. Never color alone.

Native `<select>` — it's accessible, keyboard-correct, and free (§13).

---

### 8.20 Login Platform Chooser

2×2 grid of large cards, each: lockup in the 40px slot, descriptor, `Sign in ↗`. Whole card is the link.

Below, the **escape hatches** — the original build note flags these as something no competitor ships, so they get real presence, not fine print: Client portal · Patient portal · Compare all four · Book a demo. Rendered as a Wash panel, 16px radius, four rows separated by hairlines.

---

### 8.21 Section Heading Block

Left-aligned. Optional eyebrow → `h2` (max 20ch) → optional lede (`body`, max 68ch). 16px between eyebrow and heading, 20px heading to lede, 48px before content.

Never centered except inside §8.18.

---

### 8.22 Prose Block

`/privacy/`, `/terms/`. Single 68ch column. `h2` with 48px top / 16px bottom margin. Paragraphs `body`, 20px apart. Bold in 600 `--color-ink`. Links accent, underlined here (unlike elsewhere — in dense legal prose underline is the honest affordance).

---

## 9. Page blueprints

`[CTA]` = §8.18. Every page: nav, breadcrumbs (except home), footer.

| Page | Composition |
|---|---|
| **/** | Hero + watermark → stat strip → compliance chips → 4 platform cards → 4 alternating product rows → 48-agent index (4 columns, grouped) → governance grid → deployment steps → "Why institutions choose" 4-up → role-family cards → FAQ ×9 → about block → `[CTA]` |
| **/platforms/** | Hero → 4 platform cards → comparison table → `[CTA]` |
| **/platforms/{p}/** ×4 | Hero (platform eyebrow) → stat strip → timeline panel + evidence card → "What it does" 6-up → all agents as agent cards → roles grid → compliance chips → FAQ ×5–6 → cross-links → `[CTA]` |
| **/solutions/{s}/** ×4 | Hero → "What each seat gets" role cards w/ inline evidence → illustrative note → cross-links → `[CTA]` |
| **/ai-agents/** | Hero → sticky jump-nav (4 anchors, counts in mono) → 4 sections × agent cards → TrustProperty "in development" list (Mist panel, muted) → governance grid → `[CTA]` |
| **/security/** | Hero → governance grid → data-residency block (Ink panel, `ap-south-1` in mono) → 4 per-platform compliance chip rows → FAQ ×5 → `[CTA]` |
| **/about/** | Hero → prose → leadership → entity cards (mono identifiers) → "What we build" 4-up → `[CTA]` |
| **/contact/** | Hero → 2-col: form (7/12) + details panel (5/12) → product sites list |
| **/login/** | Centered chooser 2×2 → escape-hatch panel → help line → minimal legal footer |
| **/privacy/, /terms/** | Prose block + entity block |
| **/sitemap/** | Grouped link lists, 3-up; the 48 agents in 4 columns |

**Sticky jump-nav** on `/ai-agents/` is an exception to the no-extra-chrome rule — 48 cards on one page needs it. Wash bar under the nav, `top: 68px`, four anchors with mono counts, active state via `IntersectionObserver`. Links work with JS off.

**Amended — the exception now also covers `/platforms/`.** A five-page section
whose only lateral navigation is a cross-link strip at the foot of each page
makes the reader scroll a full page to discover the other four exist. That is a
real usability gap, not a decoration. The platform sub-nav pins below the main
nav after the hero, uses `--shadow-sticky` — the one elevation token already
sanctioned for pinned chrome — and collapses to a horizontal scroll-snap chip
row below 900px. Active state is computed at build time from
`Astro.url.pathname`, so it costs no JavaScript. It is not sticky-on-scroll-up
and it does not hide and reappear.

---

## 10. Accessibility contract

WCAG 2.1 AA is a published compliance claim. It ships or the claim is false.

- **Contrast** — every pair in §3 is measured. Muted `#5f6c85` is the floor; nothing lighter carries text.
- **Focus** — `--ring-focus` on every interactive element. Never `outline: none` without a replacement.
- **Landmarks** — one `<h1>` per page; `header`/`nav`/`main`/`footer`; skip-link first in tab order.
- **Headings** — no level skipped. Agent card names are `<h3>` under a section `<h2>`.
- **Tables** — `<th scope>` + `<caption>`.
- **Forms** — visible `<label>` on every field, `aria-describedby` for errors, never color alone.
- **Images** — platform lockups carry the product name; watermark and decorative marks are `aria-hidden`.
- **Language** — `<html lang="en">`, Devanagari runs wrapped in `<span lang="hi">`. This makes screen readers switch voice correctly, and it's why §4 pairs a real Devanagari cut.
- **Target size** — 44×44px minimum on touch.
- **Zoom** — 200% without horizontal scroll. Wide tables scroll inside their own wrapper only.
- **Motion** — `prefers-reduced-motion` honored (§7).

---

## 11. Do / Don't

### Do

- Set every checkable value — citation, statute, ID, count, price, timestamp — in `--font-mono` (§4).
- Give the Control row its Mist well. It is the design's argument.
- Keep Nexus Indigo as the only filled-button color, on all four platform pages included.
- Alternate Paper → Wash → Paper. Never two Wash bands adjacent.
- Left-align every heading block except the CTA band.
- Use a 1px hairline plus a surface step for depth. Not a shadow.
- Render stat figures at final value in HTML.
- Use native `<details>` and native `<select>`.
- Keep prose at 68ch even though the container is 1200px.
- Print the "we have not measured one" and "capability statements" lines in full.

### Don't

- **Don't animate a number from zero.** The brand exists partly to criticize this. *(Conditionally lifted inside `/platforms/*` — §16.1. The condition is that the server renders the final value; without it the ban stands.)*
- Don't hide content behind scroll-reveal. *(Still absolute, everywhere, including `/platforms/*` — §16.2.)*
- Don't add a fifth color, or promote a platform hue past §6.
- Don't put a shadow on a resting card, or any shadow on a dark panel. *(Overridden inside `/platforms/*` — §16.1.)*
- Don't use pill-radius buttons. 8px.
- Don't center body copy or a section heading.
- Don't build a badge wall, trust-seal row, or logo carousel.
- Don't add a floating chat orb or sticky demo widget.
- Don't use Inter (§4). Don't use weight 700+.
- Don't nest a card inside a card. The Control well is the only nested surface, and it's a well, not a card.
- Don't install GSAP, Lenis, or Motion (§7). *(Still true — nothing was installed. §16's motion is hand-written; see §15.)*
- Don't use more than two Ink blocks per page.
- Don't let a platform hue touch a button, a background, or body text.

**Hover may reveal decoration from `opacity: 0`** — `aria-hidden`, arrow or rule
only. **Hover may not reveal content.** Content that appears on hover must exist
at rest: change its colour (`--color-muted` → `--color-ink`), never its opacity
from zero. A count or a sublabel is content. An arrow is not.

**This one is site-wide and absolute. §16 does not scope it, and no future
section may.** It is listed again in §16.2 alongside the other three that cannot
be scoped away: mocks built from real content and labelled illustrative; no
fabricated numbers, customers, logos or testimonials; mono for anything meant to
be checked.

---

## 12. No dark mode

All seven reference systems are light-theme, and this one is too — but the reason here is specific: the site's job is to look like an auditable document. Paper is the metaphor. A dark variant would double the contrast surface to maintain against a published AA claim, for a marketing site nobody reads at night.

The Ink surface (`#0b1220`) already provides tonal contrast where it earns its place — the timeline panels and the footer.

---

## 13. Stack

| Decision | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router), `output: 'export'`** | 19 static pages, no backend. Static export gives real HTML per route. |
| Styling | **Tailwind v4 `@theme`** | Tokens in §14 drop straight in. |
| Components | **Plain React. No component library.** | These 22 are bespoke marketing components. shadcn/Radix solves app primitives this site doesn't have. The two places a library would be reached for — accordion and select — are better served natively (§8.13, §8.19). |
| Animation | **No library.** Hand-written primitives on `/platforms/*` only | §7 site-wide; §16 for the five platform routes. The correct statement is per-route, not per-dependency — see §15. |
| Fonts | **`next/font/local`, IBM Plex Sans + Sans Devanagari + Mono** | Self-hosted, no layout shift, no third-party request. |
| Icons | **Inline SVG, ~16px, 1.5px stroke** | Under 15 icons needed. An icon package would be larger than the icons. |
| Content | **Typed TS modules** (`content/agents.ts`, `platforms.ts`, `faqs.ts`) | 48 agents appear on 3+ pages each. One source, or they drift. Also feeds JSON-LD. |
| SEO | **Static JSON-LD** — `Organization`, `SoftwareApplication` ×4, `FAQPage`, `BreadcrumbList` | The site is built for retrieval; structured data is the point, not an add-on. |

> **Two rows above are stale and were not rewritten here — flagged for the
> owner, since they are decisions rather than errors of fact about this branch.**
> The repository is **Astro 5** with static output and Tailwind v4 via
> `@tailwindcss/vite`, not Next.js App Router. There is **no React on any
> route**; the components are `.astro` files, and §16.6 records the measurement
> that kept React out. The *reasoning* in both rows still holds — static export
> per route, no component library — but the named technologies do not match what
> ships.

### Structure

```
app/                      # 19 routes, matching §9
components/
  evidence-card.tsx       # §8.1 — build first
  ui/                     # button, pill, chip, section-heading
  layout/                 # nav, footer, cta-band, breadcrumbs
  blocks/                 # stat-strip, platform-card, agent-card,
                          # timeline-panel, governance-grid, faq,
                          # deployment-steps, comparison-table
content/                  # agents.ts, platforms.ts, faqs.ts, governance.ts
lib/                      # jsonld.ts
public/fonts, public/logos
styles/theme.css          # §14 verbatim
```

### Build order

1. `theme.css` + fonts + nav/footer shell
2. **Evidence Card** — 60 uses; everything is calibrated against it
3. Buttons, pills, chips, section heading
4. `content/*.ts` — all 48 agents typed
5. Home page (exercises 15 of 22 components)
6. Platform pages ×4 → solutions ×4 → `/ai-agents/`
7. Security, about, contact, login
8. Prose + sitemap
9. JSON-LD, a11y pass (§10), 200% zoom pass

### Assets still missing

`logo-mark.png` and `logos/{medorbit,edvation,advohub,trustproperty}.png` are referenced by the source site but absent locally. Until supplied: typographic wordmarks in Plex Sans 600 at the 40px slot height, with the platform hue as a 3px underline. The fixed slot means swapping in real lockups later changes nothing else.

---

## 14. Quick start — Tailwind v4

```css
@theme {
  /* ── Neutrals ── */
  --color-paper:        #ffffff;
  --color-wash:         #f4f7fc;
  --color-mist:         #eef2f9;
  --color-hairline:     #dde5f0;
  --color-control:      #7589a6;  /* 3.57:1 — non-text AA */
  --color-ink:          #0b1220;  /* 18.72:1 AAA */
  --color-body:         #3d4a61;  /*  8.93:1 AAA */
  --color-muted:        #5f6c85;  /*  5.29:1 AA — do not lighten */

  /* ── Accent ── */
  --color-accent:       #2b46d4;  /*  7.17:1 AAA both ways */
  --color-accent-deep:  #1d31a8;
  --color-accent-wash:  #eaeeff;

  /* ── Semantic (state only) ── */
  --color-verified:     #0e7c7b;
  --color-withheld:     #8e1f3f;

  /* ── Platform identity (tags only — see §6) ── */
  --color-medorbit:       #0e7c7b;
  --color-edvation:       #b45309;
  --color-advohub:        #8e1f3f;
  --color-trustproperty:  #6d28d9;

  /* ── Type ── */
  --font-sans: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-deva: 'IBM Plex Sans Devanagari', 'IBM Plex Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  --text-display:   68px;  --leading-display:  1.02;  --tracking-display:  -0.035em;
  --text-h1:        52px;  --leading-h1:       1.06;  --tracking-h1:       -0.03em;
  --text-h2:        38px;  --leading-h2:       1.12;  --tracking-h2:       -0.025em;
  --text-h3:        26px;  --leading-h3:       1.20;  --tracking-h3:       -0.018em;
  --text-h4:        20px;  --leading-h4:       1.30;  --tracking-h4:       -0.012em;
  --text-lede:      20px;  --leading-lede:     1.55;  --tracking-lede:     -0.008em;
  --text-body:      17px;  --leading-body:     1.62;  --tracking-body:     -0.005em;
  --text-body-sm:   15px;  --leading-body-sm:  1.55;
  --text-caption:   13px;  --leading-caption:  1.45;
  --text-eyebrow:   12px;  --leading-eyebrow:  1.30;  --tracking-eyebrow:  +0.08em;
  --text-mono:      14px;  --leading-mono:     1.45;
  --text-mono-lg:   34px;  --leading-mono-lg:  1.10;  --tracking-mono-lg:  -0.02em;

  /* ── Space ── */
  --spacing-4: 4px;   --spacing-8: 8px;   --spacing-12: 12px;
  --spacing-16: 16px; --spacing-24: 24px; --spacing-32: 32px;
  --spacing-40: 40px; --spacing-48: 48px; --spacing-64: 64px;
  --spacing-80: 80px; --spacing-96: 96px; --spacing-128: 128px;

  /* ── Layout ── */
  --page-max-width:  1200px;
  --prose-max-width: 68ch;
  --section-gap:     96px;

  /* ── Radius: closed ladder of four ── */
  --radius-button: 8px;
  --radius-card:   12px;
  --radius-panel:  16px;
  --radius-pill:   999px;

  /* ── Elevation: exactly two ── */
  --shadow-sticky: 0 1px 0 0 #dde5f0, 0 4px 16px -8px rgba(11,18,32,0.10);
  --ring-focus:    0 0 0 2px #ffffff, 0 0 0 4px #2b46d4;
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14b. Amendment log — platform section redesign

Every change made to this file during the platform-section work, in one place,
with what it replaced and why. Each was ruled on individually; this is the
reconciliation so the file is actually a source of truth rather than a claim.

| § | Was | Is | Why |
|---|---|---|---|
| **5** | Section gap 96 / 64 / 48px | `--section-y: clamp(3.5rem, 7.5vw, 7.5rem)` — 120px desktop, 56px floor | 96px read tight against the reference set; 160px would desync from the other 13 routes. Applied through one token so every route moves together. |
| **5** | — | `--subnav-h: 56px` | The sub-nav sets its row height from it and the comparison table's sticky `<thead>` offsets by it. Two components computing the same number independently is a drift bug waiting to happen. |
| **7** | "No scroll-triggered fade/slide reveals of any content" | Enter-once reveals permitted; **scroll-scrubbed** effects forbidden | §1.2 exists to stop content being unreachable, not to stop a page acknowledging arrival. The distinction is arrival vs. driving. The hidden state is scoped to a root attribute only an inline script sets, so JS-off and crawlers never see it. |
| **8.14** | `<caption>` (visually hidden) | Caption present and accessible, **not necessarily visible** | A `<caption>` must be a child of `<table>`, so it cannot leave the scroll wrapper. A visible one scrolls sideways and clips — measured at 390px. |
| **8.14** | "Zebra in `--color-mist`" | Zebra only over ~8 rows, and only where rows have no hover | Zebra in mist and row hover in mist cannot coexist, and hover carries information. |
| **8.14** | — | Sticky `<thead>` and sticky first column are mutually exclusive | `overflow-x: auto` forces computed `overflow-y: auto`; a sticky header then pins to the wrapper, not the viewport. Split by viewport instead. |
| **8.14** | Header row at `caption` size | Header row in the **eyebrow** role | A column label is what eyebrow is for; `caption` size read as shrunken body. |
| **9** | Sticky jump-nav exception is `/ai-agents/` only | Exception also covers `/platforms/` | Five pages whose only lateral navigation is a strip at the foot of each. Build-time active state, no JS. |
| **11** | — | Hover may reveal **decoration** from `opacity: 0`; never content | A count or sublabel is content and must exist at rest — colour steps muted → ink. An arrow is decoration. |
| **11** | `.band .hov:hover` stepped the surface to Paper | Deleted; the step runs one direction everywhere — Paper at rest, Mist on hover | The card is *already* Paper on a band, so the override changed nothing and one of the vocabulary's four signals was inert. Worse, every `.hov` on the site sits inside a band, so the override fired 100% of the time and the general rule fired never. |
| **5, 7, 8.7, 8.14, 11, 13** | Site-wide rules | **§16** overrides them for `/platforms/*` only | The platform section was rebuilt to a different standard with sign-off. Recorded as a scoped section rather than by loosening the site-wide rules, so the other thirteen routes are unaffected and can be shown to be. |
| **15** | "Zero animation libraries in `package.json`" | "No animation library is loaded on any route outside `/platforms/*`", verified per route | A dependency list cannot express a per-route fact, and the original phrasing would have gone false the moment anything was installed — including things that ship to no route at all. |

### Fragilities recorded, not defended against

Two places where the code is correct today and would break silently if edited
without knowing why:

1. **`Reveal.astro` depends on margin collapse.** It is a plain block box, so a
   child's top margin collapses through it. `/platforms/` relies on that — its
   lede is `mt-7` and is the first child. Giving `Reveal` `overflow`,
   `display: flow-root`, padding or a border stops the collapse and makes 28px
   appear on a page nobody was editing.

2. **A scoped class passed to a child component is dead CSS.** Astro does not
   add the parent's `data-astro-cid` to a child component's root element, so
   `<Reveal class="bento-lead">` renders a div the parent's scoped rule cannot
   match. This shipped: `grid-column` resolved to `auto` instead of `span 2`,
   and two `display: flex` rules resolved to `block`. Put the behaviour
   attribute on the styled element instead of wrapping it.

### The failure class: a rule that renders is not a rule that wins

Three separate bugs on this branch were the same bug. Each shipped CSS that was
syntactically valid, appeared in the built stylesheet, and matched the element it
was written for — and still had no effect, because something else won. None was
visible in review, in a diff, or in the source. All three were found by reading
**computed styles in a browser**, and only by that.

| Instance | What was written | What actually won | How it surfaced |
|---|---|---|---|
| **Scoped class passed to a child component** | `<Reveal class="bento-lead">`, with `.bento-lead { grid-column: span 2 }` scoped to the parent | Nothing. Astro does not put the parent's `data-astro-cid` on a child component's root, so the selector never matched anything. | `grid-column` computed to `auto`, and two `display: flex` rules to `block`. Shipped, and was approved, before anyone measured it. |
| **A higher-specificity rule elsewhere** | `.card.p-elev:hover { transform: translateY(-4px) }` — specificity (0,3,0) | `html[data-reveal-ready] [data-reveal][data-revealed] { transform: none }` — specificity (0,3,1). Every card is also a reveal target, so the lift died the moment the card finished revealing. | Hover computed `matrix(1,0,0,1,0,0.0004)` instead of `-4px`. |
| **Cascade layers beating specificity outright** | `.tabs .tablist[data-indicator] .tab[aria-selected='true'] { border-bottom-color: transparent }` — specificity (0,4,0), inside `@layer components` | The component's own scoped `.tab[aria-selected='true']` at (0,3,0) — because **Astro scoped styles are unlayered, and unlayered CSS beats layered CSS at any specificity.** | Both markers painted at once: the per-tab border still computed `rgb(180,83,9)` underneath the sliding bar. |

**What generalises.** Three different mechanisms, one lesson: matching an element
is necessary and nowhere near sufficient. Before believing a rule is in effect,
read the computed value of the property it sets, on the element it targets, in
the state it applies to.

Two corollaries earned the hard way:

- **Raising specificity is the wrong reflex.** It was the instinct in the third
  case and it cannot work across layers at all. The fix was to move the rule so
  both sides are scoped — not to weaken either.
- **A systemic bug deserves a sweep, not a patch.** After the layers case, every
  other block in `platform.css` was checked against the scoped rules it could
  collide with. None do; that is now a measured fact rather than an assumption.

### Verification methods that produce false passes

Eight, all of which produced a confident and wrong result during this work. Each
was caught only because a second measurement disagreed with the first.

**1. Detecting which variant rendered by searching the document.** Grepping the
page for a variant's class name matches the **inlined stylesheet**, which
contains every variant's rules. It reported all four platform pages as
`left-mock-right`. Verify from the rendered element
(`<section class="hero section hero-…">`), never from a substring search over the
whole document.

**2. Focusing elements to test tab order.** Calling `.focus()` scrolls the
element into view, which moves every subsequent measurement. Comparing
viewport-relative positions across a focus walk reports breaks that are not
there. Measure absolute document position (`rect.top + scrollY`) captured without
focusing.

**3. Instant-jump scrolling defeats `IntersectionObserver`.**
`scrollTo(0, document.body.scrollHeight)` moves elements from below the viewport
to above it in a single frame. The observer sees `isIntersecting: false` at both
ends and never fires, so a working reveal reports `0/8` and looks like content
stranded at `opacity: 0`. **Step-scroll** — increments of roughly a third of the
viewport with a frame between — or the test lies.

**4. A preview-only verification loop cannot see dev-path failures.**
`astro build` and `astro dev` do not agree. The compiler will extract a script
from prose that merely *contains* the characters of a script tag — inside a
`{/* … */}` comment, where JSX semantics say it is a comment. `astro build`
tolerates the resulting malformed script and emits correct output; `astro dev`
hands it to esbuild and errors on every start. Verifying only against
`astro preview` over `dist/` — which is otherwise the right choice, because dev
injects HMR client code and changes pre-paint script ordering — means the dev
path is never exercised at all.

**Process fix:** run `npm run dev` once **per unit**, not once per branch. And
never write a run-locally guide containing a command you have not executed
against the current tree.

**5. Contrast: the adversarial frame is the darkest one, not the brightest.**
For dark ink on a light ground, contrast falls as the ground *darkens*. Sampling
the brightest frame of an animated background measures the safest case and calls
it the worst. Sweep the animation — scale `requestAnimationFrame` timestamps to
cover a full cycle in a few seconds — and keep the **minimum** luminance found
behind each line of text.

**6. Measuring a text element's box is not measuring its text.** `nav`, `p` and
`li` are block boxes that span the full column. Their bounding rects reach into
whitespace where no glyph exists, so a decorative pixel far from the text counts
as that text's background. This reported the breadcrumbs failing contrast at
2.18 against a particle roughly 900px to the right of the last glyph. Use
`Range.getClientRects()` over the text node for tight per-line boxes.

**7. Synthetic pointer probes: viewport coordinates, and the scroll must have
landed.** Two independent traps, and they compounded into reporting a working
feature as broken twice:

- `elementHandle.boundingBox()` returns **page** coordinates;
  `page.mouse.move()` takes **viewport** coordinates. After scrolling ~2000px
  the pointer lands nowhere near the element and no `pointermove` ever fires.
- `html { scroll-behavior: smooth }` is set site-wide outside the reduced-motion
  block, so `scrollIntoView()` is **animated**. A `getBoundingClientRect()` read
  in the same `evaluate()` returns the pre-scroll position. Scroll with
  `behavior: 'instant'`, then read.

Reporting working code as broken is the most expensive class of false pass,
because it invites a "fix" to something that was correct.

**8. `@theme` declarations are not proof of shipping.** Tailwind v4 tree-shakes
custom properties nothing references, so a token can be declared in
`theme.css`, be visible in the source, and be **absent from every built
stylesheet**. `--shadow-1/2/3` and `--lift` were reported as landed in one unit
and did not appear in any shipped byte until a rule read them a unit later.
Verify a token against the built CSS, never against the source.

---

## 15. Acceptance checklist

Ship gate. All must pass.

- [ ] View-source shows every figure at its final value. *(This is the real rule. Inside `/platforms/*` a figure may count up — §16.1 — but only because the SSR output is already the final number. The check is on the HTML, not on whether something moves.)*
- [ ] JS disabled → all content readable, FAQs expandable, nav usable.
- [ ] Only one filled-button color site-wide (`#2b46d4`).
- [ ] No platform hue on a button, background, or body text.
- [ ] No resting card has a shadow. *(Except `/platforms/*` — §16.1.)*
- [ ] Comparison table is `<table>` with `<th scope>`.
- [ ] Every citation / statute / ID / count / price / timestamp is mono.
- [ ] Every Evidence Card has all three rows, Control in its Mist well.
- [ ] "Capability statements, not certification logos" present wherever chips appear.
- [ ] "We do not publish a go-live duration…" present in full.
- [ ] Contrast audit clean; muted text never lighter than `#5f6c85`.
- [ ] Keyboard-only traversal of all 19 pages; focus always visible.
- [ ] Every pattern verified with JavaScript disabled — not reasoned about. Sortable headers are plain text, tab panels are all present, showcase steps are all rendered, stat figures are the real numbers.
- [ ] 200% zoom, 320px viewport — no horizontal page scroll.
- [ ] Devanagari renders in Plex Sans Devanagari, wrapped in `lang="hi"`.
- [ ] `Organization` + 4× `SoftwareApplication` + `FAQPage` + `BreadcrumbList` JSON-LD validate.
- [ ] **No animation library is loaded on any route outside `/platforms/*`.**

  Replaces *"zero animation libraries in `package.json`"*, which was the wrong
  assertion in two ways. A dependency list cannot express a per-route fact — a
  package can be installed and ship to nothing, or be absent while the same
  behaviour is hand-written into every page. And the phrasing became false the
  moment anything was installed, whether or not a single byte reached a user.

  Verify by measuring **per route**, against the built HTML: follow each page's
  `<script src>` and its static imports, and gzip what you find. The current
  measurement:

  | Routes | JS shipped |
  |---|---|
  | The thirteen non-platform routes | **0 B** |
  | `/platforms/[slug]/` ×4 | 2.72 KB gz |
  | `/platforms/` | 4.71 KB gz, plus a 2.22 KB gz hero chunk fetched only when four gates pass |

  All of it is hand-written. React, `motion`, GSAP, Lenis and
  `@number-flow/react` remain uninstalled — see §16.6 for the measurement that
  decided it.

---

## 16. Platform section overrides

**Scope: `/platforms/` and `/platforms/[slug]/` — five routes. Nowhere else.**

This section exists because the platform section was rebuilt to a different
standard from the rest of the site, deliberately and with the owner's sign-off.
Everything below **overrides** the section it names, for those five routes only.
The other thirteen routes are governed by the unamended rule, and that is
enforced mechanically, not by convention — see *How the scope is enforced*.

If you are reading §5, §7, §8.7, §8.14 or §11 and building inside
`/platforms/*`, the rule here wins. If you are building anywhere else, it does
not apply to you at all.

### 16.1 What is overridden

| § | Site-wide rule | Inside `/platforms/*` | Why |
|---|---|---|---|
| **5** | "There are exactly two shadow tokens." Resting cards have no shadow, ever. | A real elevation scale: `--shadow-1/2/3`, plus `--lift: 4px`. Cards rest on `--shadow-1` and lift to `--shadow-2` on hover. | The section's job is comparison across four products. Elevation separates a card from a band faster than a hairline does when four are side by side. Every value is derived from `--color-ink` at low alpha, so depth never introduces a colour. |
| **7** | Scroll-scrubbed effects forbidden. Sticky showcases forbidden. Parallax forbidden. Marquees forbidden. | All four permitted, under the constraints in 16.3. | The ban was written when the whole site had one motion vocabulary. This section now has its own. |
| **7 / 15** | "Count-up / odometer on any figure" forbidden. | Count-up permitted **on one condition**: the server renders the final value as text. | The ban exists because a crawler reads `0%`. A count-up whose SSR output is the real number does not have that defect, so it satisfies the reasoning and not merely the letter. The condition is the rule; without it the ban stands. |
| **8.7** | Platform Card hover: border only. "No lift, no shadow, no scale." | Border **and** surface step **and** arrow affordance **and** `--shadow-1 → --shadow-2` **and** a 4px lift. | Additive, not a replacement. A card that only lifted would have traded three signals for one. |
| **8.14** | Comparison table has no sort affordance specified. | Sortable column headers with `aria-sort`, and a 460ms FLIP re-rank. | Headers can express column *and* direction; an injected control bar cannot. Headers ship as plain text and are upgraded into buttons, so JS off leaves a readable header rather than a dead control. |
| **11** | "Don't put a shadow on a resting card." | Superseded by the §5 row above, for these five routes. | — |
| **13** | Animation: none. | Zero animation *libraries*; roughly 4.7 KB gz of hand-written motion primitives on the heaviest route. | See §15. |

### 16.2 What is NOT overridden, and cannot be

These are absolute and site-wide. A future reader must not be able to scope them
away by pointing at this section.

- **Hover may reveal decoration, never content.** Content that appears on hover
  must exist at rest and change *colour*, never opacity from zero. This held
  through every pattern here: the live roster's scan steps colour, the sticky
  showcase's pinned half is a step counter rather than an echo of the module
  titles, and the spotlight is a radial wash under text that is fully legible
  with no pointer at all.
- **Mocks are built from real content and labelled illustrative.**
- **No fabricated numbers, customers, logos or testimonials.** Every figure in
  this section is summed from the content at build time, and `check:content`
  asserts the totals.
- **Mono for anything meant to be checked** — counts, IDs, citations, prices,
  timestamps.
- **Nothing is unreachable with JavaScript disabled.** Every pattern here was
  verified with JS off, not reasoned about.

### 16.3 Motion constraints inside the section

One entrance easing: `cubic-bezier(0.16, 1, 0.3, 1)`. 200ms micro / 400ms
element / 700ms section. Stagger 40–70ms. Hover 160–200ms. Nothing over 800ms.
**Transform and opacity only** — and where a rule must survive alongside a
`[data-reveal]` element, the independent `translate` property rather than
`transform` (see §14b).

Three motion patterns per page, varied so no two adjacent pages read the same:

| Route | Patterns |
|---|---|
| `/platforms/` | bento with a live roster · sortable comparison table · stats band |
| `medorbit` | sticky showcase · spotlight roles · magnetic CTA |
| `edvation` | tabs with a sliding indicator · roles bento · stats band |
| `advohub` | sticky showcase · alternating rows with parallax |
| `trustproperty` | lockup marquee · alternating rows · magnetic CTA |

`advohub` carries two, not three. Verification is a pipeline, and the showcase
plus the alternating rows tells that story completely. A third would have been
there to satisfy a number.

**Scroll-driven CSS vs IntersectionObserver.** Both are permitted here, and they
are not interchangeable:

> **Use CSS scroll-driven animation (`animation-timeline: view()`) for
> decorative effects where a stall is invisible. Use an `IntersectionObserver`
> for anything that must swap content.**

`animation-timeline` is unsupported in Firefox. On the alternating rows that
costs nothing — the row sits at its resting position and a reader loses no
information. On the sticky showcase it would freeze the reader on one step, so
that pattern uses an observer at `-45%` rootMargin instead. §7's amendment made
scroll-driven CSS legal; **a permission is not an instruction.**

**Parallax is capped at 40px.** It ships at 28px.

> **Under the cap is not the same as subtle.**

40px was the first attempt and it was legal. At that distance a ~150px row
visibly slides against its neighbours and reads as an effect rather than as
depth, which is the failure the cap exists to prevent. Cut the distance until
the effect stops being noticeable *as an effect*, then stop.

### 16.4 How the scope is enforced

Not by naming discipline. Three mechanisms, each verifiable:

1. **`src/styles/platform.css` is imported by the platform pages only.** Vite
   emits it into those routes' CSS chunk and no other. Verified by diffing every
   emitted asset: the shared stylesheet contains **zero** rules from that file.
2. **The motion primitives are imported by those pages' scripts only.** The
   other thirteen routes ship **0 bytes** of JavaScript. Verified per route
   against the built HTML, not against `package.json`.
3. **Variants come from content, never from a branch on identity.**
   `capabilityLayout`, `rolesLayout`, `statsPlacement` and `motion` are typed
   unions on the platform entry. There is no `slug === 'medorbit'` anywhere in
   the templates, and an invalid value is a build error rather than a silent
   fallback.

The one leak this arrangement permits is by design and is 136 bytes: Tailwind's
`@theme` tree-shakes custom properties nothing references, so `--shadow-1`,
`--shadow-2` and `--lift` appear in the shared `:root` block once this section
uses them. Declarations, not rules — no route outside the section can be
affected by a variable it never reads.

### 16.5 The hero field

`/platforms/` carries a WebGL particle field: 12,000 GLSL point sprites on four
helical strands wound around one axis, banded by sixteen rings. Raw WebGL — no
three.js, no R3F, no matrix library. **3,097 bytes gzipped for the entire hero
path**, and it holds 60fps with zero dropped frames on a software rasteriser at
4× CPU throttle.

**It carries all four platform hues at once, and that is not a violation of §6.**
§6 says platform colour identifies and never decorates. `/platforms/` is the one
page whose subject is the *set* of four, so four hues simultaneously is the
identification — it is the only image on the site where all four are true at the
same time. A single hue here would be the decoration. This is section-scoped and
is not a general licence.

Four bail paths, each verified in isolation. The static gradient underneath
**renders on every path** and the canvas crossfades on top of it, so a bail is
the hero with one layer fewer rather than a hero with something missing:

| Condition | Chunk fetched | Renders |
|---|---|---|
| `prefers-reduced-motion: reduce` | no | static layer, full strength |
| `hardwareConcurrency < 4` | no | static layer, full strength |
| viewport ≤ 768px | no | static layer, horizontal variant |
| WebGL context or link failure | yes — it cannot be predicted | `initField` returns false, canvas stays at `opacity: 0` |

`hardwareConcurrency` undefined is treated as capable. Only an explicit low
count bails, so a browser that does not report it is not punished for that.

### 16.6 Byte ceiling

250 KB gzipped per route, `/platforms/*` only. Measured, not estimated:

| Route | HTML | CSS | JS | Total |
|---|---:|---:|---:|---:|
| `/platforms/` | 6.00 | 11.45 | 4.71 | **22.17** |
| `/platforms/medorbit/` | 12.25 | 11.47 | 2.72 | **26.44** |
| `/platforms/edvation/` | 13.44 | 11.47 | 2.72 | **27.63** |
| `/platforms/advohub/` | 12.84 | 11.47 | 2.72 | **27.03** |
| `/platforms/trustproperty/` | 10.57 | 11.47 | 2.72 | **24.76** |

KB gzipped. Worst route is **11% of the ceiling**. The headroom is insurance,
not an invitation.

**React was not installed.** Measured before deciding: react + react-dom is a
58.9 KB gz floor, 122.3 KB with `motion`, against 878 B gz for the four vanilla
primitives that deliver the same six behaviours. Two of them — `SplitHeadline`
and `LockupMarquee` — are pure CSS at 0 B. `@number-flow/react` was dropped for
the same reason plus a better one: the hand-rolled count-up keeps the
SSR-final-value property that 16.1's condition depends on.


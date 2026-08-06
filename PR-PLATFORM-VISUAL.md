# Platform section — visual redesign

Five routes rebuilt to a different standard, with the overrides recorded as a
scoped section of DESIGN.md rather than by loosening the site-wide rules. The
other thirteen routes are unchanged, and that is shown by measurement rather
than asserted.

Branch: `feat/platform-visual`, off `main` at `ca381f9`. Five commits, one unit
each, each gated before the next started.

---

## What changed

| Unit | Commit | |
|---|---|---|
| 1 | `d7f8514` | Elevation scale, timing tokens, four vanilla motion primitives |
| 2 | `f30b8c3` | The hero — raw WebGL particle field, four bail paths |
| 3 | `20fe122` | `/platforms/` — bento with a live roster, stats band, sortable table |
| 4 | `aa3710e` | The four detail pages, one file, patterns driven from content |
| 5 | — | DESIGN.md: new §16, §14b rewritten, §15's unscopeable rule restated |

**No dependencies were installed.** `package.json` is untouched.

### The hero

12,000 GLSL point sprites on four helical strands wound around one axis, banded
by sixteen rings — four products, one spine, meeting on a shared structure at
intervals. Raw WebGL: no three.js, no R3F, no matrix library. Geometry is built
once; the per-frame cost is two damping multiplies, three uniform writes and one
`drawArrays`.

It carries all four platform hues at once. §6 says platform colour identifies
and never decorates, and this is the one page whose subject is the *set* of
four — a single hue here would be the decoration. Recorded in §16.5 as
section-scoped, not as a general licence.

### Pattern assignment

Three motion patterns per page, varied so no two adjacent pages read the same.
Every variant comes from a typed union in `src/content/platforms.ts`. There is
no `slug === '…'` branch anywhere in the templates, and an invalid value is a
build error rather than a silent fallback.

| Route | Patterns |
|---|---|
| `/platforms/` | bento with a live agent roster · sortable comparison table · stats band |
| `medorbit` | sticky showcase · spotlight roles · magnetic CTA |
| `edvation` | tabs with a sliding indicator · roles bento · stats band |
| `advohub` | sticky showcase · alternating rows with parallax |
| `trustproperty` | lockup marquee · alternating rows · magnetic CTA |

`advohub` carries two, deliberately. Verification is a pipeline and those two
tell that story completely; a third would have been there to satisfy a number.

### The scoping mechanism

Not naming discipline. `src/styles/platform.css` is imported by the platform
pages only, and the motion primitives by those pages' scripts only. Verified by
diffing every emitted asset: **zero rules from that file reach the shared
stylesheet**, and the thirteen other routes ship **0 bytes of JavaScript**.

The one permitted leak is 136 bytes and is by design — Tailwind's `@theme`
tree-shakes custom properties nothing references, so `--shadow-1`, `--shadow-2`
and `--lift` appear in the shared `:root` once this section uses them.
Declarations, not rules.

---

## Bytes against the ceiling

250 KB gzipped per route, `/platforms/*` only.

| Route | HTML | CSS | JS | Total |
|---|---:|---:|---:|---:|
| `/platforms/` | 6.00 | 11.45 | 4.71 | **22.17** |
| `/platforms/medorbit/` | 12.25 | 11.47 | 2.72 | **26.44** |
| `/platforms/edvation/` | 13.44 | 11.47 | 2.72 | **27.63** |
| `/platforms/advohub/` | 12.84 | 11.47 | 2.72 | **27.03** |
| `/platforms/trustproperty/` | 10.57 | 11.47 | 2.72 | **24.76** |
| the other thirteen routes | — | 7.85–8.59 | **0.00** | — |

KB gzipped. Worst route is **11% of the ceiling**.

The hero path is **3,097 B gz** against its own 10 KB cap, and 620 of those are
Vite's `__vitePreload` helper for an empty dependency list. `build.modulePreload:
false` was tried and made the loader *larger* (877 → 928 gz); reverted, because
keeping the dynamic import means a phone never downloads the field at all.

**React was not installed.** Measured before deciding: react + react-dom is a
58.9 KB gz floor, 122.3 KB with `motion`, against **878 B gz** for the four
vanilla primitives delivering the same six behaviours. Two of the six are pure
CSS at 0 B. `@number-flow/react` was dropped for the same reason plus a better
one — the hand-rolled count-up keeps the SSR-final-value property the whole
exemption depends on.

Frame budget, measured on four profiles: **16.67 ms mean, 18.7 ms max, 0 dropped
frames in 180**, on `{real GPU, software rasteriser} × {1×, 4× CPU throttle}`.
One draw of 12,000 sprites costs 0.127 ms on a real GPU and 0.883 ms — 5.3% of a
60 Hz frame — with no GPU at all.

---

## Three false-pass discoveries

All three are recorded in §14b. The first is the transferable one.

**1. A rule that renders is not a rule that wins.** Three separate bugs on this
branch were the same bug: CSS that was valid, present in the built stylesheet,
and matched its element — and still had no effect.

- A **scoped class passed to a child component** never matched anything, because
  Astro does not put the parent's `data-astro-cid` on a child's root.
  `grid-column` computed `auto` instead of `span 2`. This shipped, and was
  approved, before anyone measured it.
- **`[data-revealed] { transform: none }` at (0,3,1)** silently cancelled the
  hover lift at (0,3,0). Hover computed `matrix(1,0,0,1,0,0.0004)` instead of
  −4 px. Fixed with the independent `translate` property, so neither rule had to
  be weakened.
- **Cascade layers beat specificity outright.** Astro scoped styles are
  *unlayered*, and unlayered CSS beats layered CSS at any specificity — so
  nothing in `platform.css` could override a scoped rule touching the same
  property. Both tab markers painted at once. The instinct to raise specificity
  to (0,4,0) was exactly wrong; the fix was to move the rule so both sides are
  scoped.

After the third, every other block in `platform.css` was checked against the
scoped rules it could collide with. None do — a measured fact now, not an
assumption.

**2. Contrast: the darkest frame, not the brightest.** For dark ink on a light
ground, contrast falls as the ground darkens, so sampling the brightest frame
measures the safest case. Swept 70 frames across ~3 rotations of the hero field:
every hero line reads on rgb(253–255) at worst, and the field costs at most 0.09
of a ratio point.

**3. Measuring a text element's box is not measuring its text.** `nav` is a block
that spans the full hero, so a particle ~900 px from the last glyph counted as
breadcrumb background and reported a contrast failure at 2.18. Switched to
`Range.getClientRects()` for tight per-line boxes.

Two more went into §14b from this work: synthetic pointer probes need **viewport**
coordinates, not `boundingBox()` page coordinates, and must not trust a smooth
`scrollIntoView()` to have landed — that pair reported a working magnetic CTA as
broken twice, which is the most expensive kind of false pass because it invites a
"fix" to correct code. And `@theme` declarations are **not proof of shipping**:
Tailwind tree-shakes unreferenced custom properties, so tokens reported as landed
in unit 1 were absent from every built byte until a rule read them in unit 3.

---

## Out of scope — filed, not fixed

- **[#8](https://github.com/Yash13606/AI-Nexus/issues/8) — breadcrumb separator
  fails 1.4.3.** `Breadcrumbs.astro:13` renders `/` in `--color-control` at
  **3.57:1** on pure paper, on all 18 routes via a shared component. Same shape
  as the `.alt-n` failure already fixed: `aria-hidden` does not exempt visible
  text. Proposed swap to `--color-muted` (5.29:1) is a site-wide visual change
  and needs its own sign-off.
- **[#4](https://github.com/Yash13606/AI-Nexus/issues/4) — `/favicon.ico` 404s on
  every route.** Added to the existing fonts-and-logos issue. The Astro dev
  server never logs it, which is why a route sweep missed it.

One further observation, not filed: **§13's Framework and Components rows are
stale.** They describe Next.js App Router and plain React; the repository is
Astro 5 with no React on any route. The reasoning in both rows still holds, so
they are flagged inline in DESIGN.md rather than rewritten — they are decisions,
not errors of fact about this branch.

---

## Gates

Run at every unit, including a **cold `npm run dev`** — added to the process
after a literal `<script>` inside a JSX comment broke `astro dev` while
`astro build` passed clean.

```
check:content — 48 agents (×3 evidence rows), 4 platforms, 24 modules,
                29 roles, 21 FAQs, slugs aligned, 4 control corrections
                match the scrape, Devanagari runs declared. OK
check:links   — 891 internal links across 18 pages, 0 broken.
detect src    — 1 anti-pattern found.   (pre-existing; tracked as #5)
build         — 18 pages
dev cold      — 0 ERROR lines, 10/10 sampled routes HTTP 200
```

Every pattern was additionally verified with **JavaScript disabled**: sortable
headers are plain text rather than dead buttons, all six tab panels render, all
six showcase steps render in document order, and every stat figure is the real
number in the HTML.

Screenshots at 1440 and 390 for every pattern, plus recordings of the hero
field, the table sort, the magnetic CTA and the sticky showcase, are in
`.review/` (gitignored).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

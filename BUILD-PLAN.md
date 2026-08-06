# BUILD-PLAN.md — AI Nexus, Phase 1

> 12 pages. No backend. Companion to `DESIGN.md` — that file owns *how it looks*, this one owns *what gets built, in what order, with what*.

---

## 1. Scope

### In — 12 routes

| # | Route | Page | Weight |
|---|---|---|---|
| 1 | `/` | Home | **XL** — the whole site in miniature |
| 2 | `/platforms/` | Platform index + comparison table | S |
| 3 | `/platforms/medorbit/` | MedOrbit — Hospital operating system | L |
| 4 | `/platforms/edvation/` | Edvation — K-12 school operating system | L |
| 5 | `/platforms/advohub/` | AdvoHub — Legal practice platform | L |
| 6 | `/platforms/trustproperty/` | TrustProperty — Property marketplace with AI | L |
| 7 | `/solutions/hospitals/` | For hospitals | M |
| 8 | `/solutions/schools/` | For schools | M |
| 9 | `/solutions/law-firms/` | For law firms | M |
| 10 | `/solutions/property/` | For property | M |
| 11 | `/login/` | Sign in — platform chooser | S |
| 12 | `/contact/` | Book a demo | M |

### Out — deferred to Phase 2

`/ai-agents/` · `/security/` · `/about/` · `/privacy/` · `/terms/` · `/sitemap/`

### One concern worth stating before we start

`/ai-agents/` is out of scope, but **the homepage links to all 48 of its anchors** — that's 48 dead links on the most important page in the build. Two options, both one line of config:

- **(a)** Render the homepage agent index as plain text now; links switch on when `/ai-agents/` ships. *Default — this is what §5 assumes.*
- **(b)** Build `/ai-agents/` anyway. It costs roughly **30 minutes**, because the content layer types all 48 agents in Phase 1 for the platform pages regardless, and `AgentCard` already exists. It's one route file over data you already have.

Going with **(a)** since that's the scope you set. Say the word and (b) is a same-day add.

---

## 2. Tech stack — decided

| Layer | Choice | Version | Why this |
|---|---|---|---|
| **Framework** | **Astro** | 5.x | See §2.1 — this is a revision to `DESIGN.md` §13 |
| Language | TypeScript | 5.x | `strict: true` |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | 4.x | CSS-first `@theme`; the token block in `DESIGN.md` §14 drops in unchanged |
| Components | **None.** Plain `.astro` files | — | The 21 components are bespoke marketing blocks. shadcn/Radix solve app primitives this site doesn't have |
| Interactivity | **Zero JS baseline** | — | One ~15-line inline script for the mobile menu. Nothing else |
| Fonts | `astro:assets` + self-hosted woff2 | — | IBM Plex Sans · Plex Sans Devanagari · Plex Mono |
| Animation | **none** | — | `DESIGN.md` §7. No GSAP, no Lenis, no Motion |
| Icons | Inline SVG | — | Under 15 needed; an icon package would outweigh the icons |
| Content | Typed TS modules in `src/content/` | — | 48 agents appear on 3+ pages each. One source or they drift |
| Forms | Client-only, no submit | — | Success state names `raju@ainexushub.ai` as the real route |
| Structured data | Hand-built JSON-LD from the same content modules | — | The site is built for retrieval; this is the point, not an add-on |
| Lint / format | ESLint + Prettier + `prettier-plugin-astro` | — | |
| Checks | One Node script, `npm run check:content` | — | §6 |
| Host | Any static host — Cloudflare Pages, Netlify, Vercel | — | Output is a folder of HTML |

### 2.1 Why Astro, revising `DESIGN.md` §13

`DESIGN.md` §13 said Next.js static export. **Changing it to Astro**, for one reason that matters more than familiarity:

A defining goal for this site is that content exists in HTML and nothing animates from zero. Astro's default output for a page with no client directive is **literally 0 KB of JavaScript** — pure HTML and CSS. Next.js static export still hydrates React on every route, shipping ~90 KB gzipped to render text that never changes.

For a brand whose stated argument is *"a competitor's homepage reads to every crawler as 0% increase because its metrics are JS count-up scripts"* — shipping a React runtime to render static prose is the exact irony the design exists to avoid. Astro makes the design contract the default instead of a discipline.

Practical wins alongside it: content collections fit the 48 agents cleanly, scoped styles per `.astro` file with no cascade fights, and less machinery for 12 static pages. If a real backend is needed later, Astro server actions or a form service both drop in.

`DESIGN.md` §13 should be amended to match. Everything else in that file is unaffected — tokens, components, layouts and rules are all framework-agnostic.

### 2.2 Dependencies — the whole list

```jsonc
{
  "dependencies": {
    "astro": "^5"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "prettier": "^3",
    "prettier-plugin-astro": "^0",
    "eslint": "^9",
    "eslint-plugin-astro": "^1"
  }
}
```

One runtime dependency. No `clsx`, no `class-variance-authority`, no icon package, no date library, no animation library. If something new gets added, it needs a reason written into this file.

---

## 3. File structure

```
src/
├── content/
│   ├── platforms.ts        # 4 platforms: name, slug, hue, tagline, stats,
│   │                       #   bullets, modules, compliance, roles, faqs
│   ├── agents.ts           # all 48: slug, name, platform, audience,
│   │                       #   summary, input, output, control
│   ├── governance.ts       # the 8 controls
│   ├── faqs.ts             # homepage 9
│   ├── deployment.ts       # the 4 steps
│   └── site.ts             # nav, footer, entities, contact, PLANNED_ROUTES
│
├── components/
│   ├── EvidenceCard.astro          # ← build first, ~60 uses
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Pill.astro
│   │   ├── Chip.astro
│   │   ├── SectionHeading.astro
│   │   └── Breadcrumbs.astro
│   ├── layout/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   └── CtaBand.astro
│   └── blocks/
│       ├── Hero.astro
│       ├── StatStrip.astro
│       ├── PlatformCard.astro
│       ├── ProductRow.astro         # home, alternating
│       ├── TimelinePanel.astro      # dark
│       ├── AgentCard.astro
│       ├── RoleCard.astro
│       ├── GovernanceGrid.astro
│       ├── DeploymentSteps.astro
│       ├── ComparisonTable.astro
│       ├── ComplianceChips.astro
│       ├── CrossLinkStrip.astro
│       ├── Faq.astro                # native <details>
│       ├── ContactForm.astro
│       └── LoginChooser.astro
│
├── layouts/
│   └── Base.astro          # <head>, fonts, nav, slot, cta band, footer, JSON-LD
│
├── lib/
│   └── jsonld.ts
│
├── pages/                  # the 12 routes
│   ├── index.astro
│   ├── platforms/index.astro
│   ├── platforms/[slug].astro       # 4 pages from one file
│   ├── solutions/[slug].astro       # 4 pages from one file
│   ├── login.astro
│   └── contact.astro
│
└── styles/
    └── theme.css           # DESIGN.md §14 verbatim

public/fonts/               # 3 Plex families, woff2, subset
public/logos/               # 4 lockups (pending — see §8)
scripts/check-content.ts
```

**The 8 platform and solutions pages come from 2 files**, both driven by `getStaticPaths()` over `platforms.ts`. Every one of them is structurally identical; only the data differs. Writing 8 near-duplicate page files would be 8 files to keep in sync.

---

## 4. Component inventory for this phase

21 of the 22 in `DESIGN.md` §8. Only **Prose Block** is unused (its pages — privacy, terms — are Phase 2).

| Component | Ref | Used on | Notes |
|---|---|---|---|
| **EvidenceCard** | §8.1 | 10 of 12 pages | **~60 instances.** Build first, calibrate everything against it |
| Button | §8.2 | all 12 | 3 variants |
| Nav | §8.3 | all 12 | + mobile menu, the only JS |
| Footer | §8.4 | all 12 | both legal entities, mono |
| Hero | §8.5 | all 12 | watermark on home only |
| StatStrip | §8.6 | 5 | **no animation** |
| PlatformCard | §8.7 | 2 | 3px hue top rule |
| ProductRow | §8.8 | home | ×4, alternating |
| TimelinePanel | §8.9 | 5 | dark, ×5 total |
| AgentCard | §8.10 | 4 platform pages | 48 instances |
| GovernanceGrid | §8.11 | home | 8 cells, borderless |
| DeploymentSteps | §8.12 | home | 4 steps |
| Faq | §8.13 | 5 | native `<details>`, 30 Q&A |
| ComparisonTable | §8.14 | `/platforms/` | real `<th scope>` |
| ComplianceChips | §8.15 | 4 platform pages | + mandatory header line |
| RoleCard | §8.16 | 8 | 29 roles total |
| CrossLinkStrip | §8.17 | 8 | one component, route-driven |
| CtaBand | §8.18 | 10 | not on `/login/`, `/contact/` |
| ContactForm | §8.19 | `/contact/` | no backend |
| LoginChooser | §8.20 | `/login/` | + escape hatches |
| SectionHeading | §8.21 | all 12 | |

---

## 5. Link policy for out-of-scope routes

Nav, footer and the homepage all reference routes that don't exist yet. Handle it in **one place**:

```ts
// src/content/site.ts
export const PLANNED_ROUTES = new Set([
  '/ai-agents/', '/security/', '/about/', '/privacy/', '/terms/', '/sitemap/',
]);
```

`Button`, nav items, footer items and the homepage agent index all check this set. A planned route renders as **plain text in `--color-muted`, not an anchor** — no dead link, no 404, no `href="#"`.

When a Phase 2 page ships, delete its entry from the set. Nothing else changes.

**Homepage 48-agent index:** renders all 48 names grouped by platform as text. The section still carries its full SEO and retrieval value — the names, the one-line descriptions and the grouping are all in the HTML. Only the anchors are withheld.

---

## 6. The content check

One script, no test framework. It fails if the content layer breaks — which is the only non-trivial logic in a static site.

```
npm run check:content
```

Asserts:

- Exactly **48** agents
- Per platform: MedOrbit **11**, Edvation **20**, AdvoHub **10**, TrustProperty **7**
- All 48 slugs unique, kebab-case, and matching the anchors in `LINK-MAP` §4
- Every agent has non-empty `input`, `output`, `control` — an Evidence Card with a missing row is a broken component
- Every platform has exactly one solutions page and vice versa (1:1, never many-to-many)
- Role counts: **8 / 6 / 9 / 6** = 29
- No platform hue used outside the 5 permitted slots (grep-level check against `DESIGN.md` §6)

Runs in CI and in `prebuild`.

---

## 7. Build order

Each phase leaves something verifiable.

### Phase 0 — Scaffold · ~2h
- `npm create astro`, TypeScript strict, Tailwind v4 via `@tailwindcss/vite`
- `styles/theme.css` ← `DESIGN.md` §14 verbatim
- Subset and self-host the 3 Plex families; verify Devanagari renders
- Prettier, ESLint, `.gitignore`
- **Done when:** a blank page renders with correct tokens and all three faces load

### Phase 1 — Content layer · ~5h
- `platforms.ts`, `agents.ts` (all 48), `governance.ts`, `faqs.ts`, `deployment.ts`, `site.ts`
- Source of truth is the scrape in `ainexushub/` — copy exactly, do not paraphrase
- `scripts/check-content.ts` + `npm run check:content`
- **Done when:** the check passes green

### Phase 2 — Primitives · ~4h
- `EvidenceCard` first, then Button, Pill, Chip, SectionHeading, Breadcrumbs
- **Done when:** an Evidence Card matches `DESIGN.md` §8.1 exactly — three rows, Control in its Mist well, mono on every checkable value

### Phase 3 — Shell · ~4h
- `Base.astro`, Nav (+ mobile menu), Footer, CtaBand
- Wire `PLANNED_ROUTES`
- **Done when:** an empty page has working nav and footer, keyboard-traversable, focus visible

### Phase 4 — Home · ~10h
The largest single job. Exercises 17 of 21 components.
- Hero + watermark → StatStrip → ComplianceChips → 4× PlatformCard → 4× ProductRow (each with TimelinePanel + EvidenceCard) → 48-agent index (text) → GovernanceGrid → DeploymentSteps → why-choose 4-up → role-family cards → Faq ×9 → about block → CtaBand
- **Done when:** view-source shows every stat at final value and the page reads correctly with JS disabled

### Phase 5 — Platforms · ~8h
- `/platforms/` — 4 cards + ComparisonTable
- `platforms/[slug].astro` → 4 pages: hero, stats, timeline + evidence, "what it does" 6-up, all agents as cards, roles grid, compliance chips, FAQ, cross-links, CTA
- **Done when:** all 5 render from data, 48 AgentCards present, comparison table has real `<th scope>`

### Phase 6 — Solutions · ~4h
- `solutions/[slug].astro` → 4 pages: hero, 29 RoleCards with inline evidence on some, illustrative note, cross-links, CTA
- **Done when:** all 4 render, each links to exactly one platform page

### Phase 7 — Login + Contact · ~5h
- `/login/` — 2×2 chooser, escape-hatch panel, help line, minimal footer
- `/contact/` — form (7/12) + details panel (5/12), validation, success state, product sites list
- **Done when:** form validates client-side, errors are announced not just colored, success names the email

### Phase 8 — Finish · ~6h
- JSON-LD: `Organization`, 4× `SoftwareApplication`, `FAQPage`, `BreadcrumbList`
- `sitemap.xml` + `robots.txt`
- Accessibility pass (`DESIGN.md` §10) — keyboard, contrast, headings, 200% zoom at 320px
- Lighthouse, then the ship gate in §9
- **Done when:** every box in §9 is ticked

**Rough total: ~48h.** Phases 0–3 are the foundation and Phase 4 pays them back — the home page is roughly a fifth of the work and touches most of the system.

---

## 8. Blocked / needs input

| Item | Status | Interim |
|---|---|---|
| `logo-mark.png`, 4 platform lockups | **Missing from repo** | Typographic wordmarks in Plex Sans 600 at the fixed 40px slot, hue underline. Fixed slot means dropping in real files later changes nothing else |
| Real brand palette | **Unknown** — never saw the live site's identity | `DESIGN.md` §3 palette, contrast-verified. Repin on request |
| `/ai-agents/` | Out of scope | 48 homepage links render as text (§5) |
| Contact form backend | Not needed now | Client-only success state |

---

## 9. Ship gate

Phase-1 subset of `DESIGN.md` §15.

- [ ] All 12 routes build and render
- [ ] `npm run check:content` passes
- [ ] **No number animates** — view-source shows final values
- [ ] **JS disabled** → all content readable, FAQs expandable, nav usable
- [ ] Zero JS shipped on 11 of 12 pages (mobile menu is the only script)
- [ ] Only one filled-button color site-wide — `#2b46d4`
- [ ] No platform hue on a button, background, or body text
- [ ] No resting card has a shadow
- [ ] Comparison table is a real `<table>` with `<th scope>`
- [ ] Every citation / statute / ID / count / price / timestamp is mono
- [ ] All ~60 Evidence Cards have three rows, Control in its Mist well
- [ ] "Capability statements, not certification logos" present wherever chips appear
- [ ] "We do not publish a go-live duration…" present in full
- [ ] Contrast audit clean; muted text never lighter than `#5f6c85`
- [ ] Keyboard-only traversal of all 12 pages; focus always visible
- [ ] 200% zoom at 320px — no horizontal page scroll
- [ ] Devanagari renders in Plex Sans Devanagari, wrapped in `lang="hi"`
- [ ] No planned route renders as a dead link
- [ ] JSON-LD validates
- [ ] Zero animation libraries in `package.json`

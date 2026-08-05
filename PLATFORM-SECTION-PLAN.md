# PLATFORM-SECTION-PLAN.md

> Phase 1 output. A **diff against the five pages as they exist**, not a greenfield blueprint.
> Nothing here is applied. No source file has been modified since the audit.
> §1 answers what you asked to be verified. §2–§4 are the proposed changes. §5 is the one thing I still need approved, plus three items from the audit you have not ruled on.

---

## 1. Verifications

### 1.1 No-JS initial DOM — all rows and seats present, unfiltered ✓

Measured on `dist/`, which is what a crawler and a JS-off reader receive.

**`/platforms/` comparison table** — four rows in the DOM, in `platforms.ts` authored order, no sort applied:

```
data-name="MedOrbit"       data-agents="11" data-roles="8" data-languages="0"
data-name="Edvation"       data-agents="20" data-roles="6" data-languages="13"
data-name="AdvoHub"        data-agents="10" data-roles="9" data-languages="22"
data-name="TrustProperty"  data-agents="7"  data-roles="6" data-languages="3"
```

**Agent grids** — every card present, no filter state applied:

| Page | `.agent-card` in DOM | `data-match` attrs | inline `border-color` | `display:none` / `hidden` |
|---|---|---|---|---|
| `/platforms/medorbit/` | 11 | 0 | 0 | 0 |
| `/platforms/edvation/` | 20 | 0 | 0 | 0 |
| `/platforms/advohub/` | 10 | 0 | 0 | 0 |
| `/platforms/trustproperty/` | 7 | 0 | 0 | 0 |

**Controls are absent from the served HTML.** `grep -c 'reorder-bar\|reorder-btn'` returns **0** on both page types — the strip is built by `controls()` at runtime, so with JS off there is no dead button, no `href="#"`, and no control that does nothing. `data-match` and `border-color` are written by `initSeatFilter` only; neither exists in the initial DOM, so no card starts de-emphasised.

Both scripts stay, as decided. I will add a `check-content`-adjacent assertion (§3.4) so this property is enforced rather than re-verified by hand.

### 1.2 The 297, bucketed

Per-page × rule, from `npx impeccable detect <file> --json`:

| Rule | Severity | `/platforms/` | medorbit | edvation | advohub | trustproperty | **Total** |
|---|---|---:|---:|---:|---:|---:|---:|
| `cramped-padding` | warning | 5 | 50 | 66 | 49 | 40 | **210** |
| `low-contrast` | warning | 15 | 17 | 17 | 17 | 17 | **83** |
| `side-tab` | warning | 4 | 0 | 0 | 0 | 0 | **4** |
| `em-dash-overuse` | advisory | 0 | 0 | 0 | 1 | 1 | **2** |
| | | 24 | 67 | 83 | 67 | 58 | **299** |

299 total, of which 2 are advisory and not counted — which is the 297 the directory scan reports.

**`low-contrast` — 83, all false positives, proven.** Three distinct pairs, all reported "on `#ffffff`":

| Count | Reported | Actual background | Measured true ratio |
|---:|---|---|---|
| 54 | `3.4:1 — #7c8ba5 on #ffffff` | `#0b1220` (footer meta, timeline caption) | **5.43:1 ✓ AA** |
| 19 | `2.1:1 — #a8b4c8 on #ffffff` | `#0b1220` (footer body, timeline labels) | **8.94:1 ✓ AAA** |
| 10 | `1.0:1 — #ffffff on #ffffff` | `#0b1220` (timeline event text) | **18.72:1 ✓ AAA** |

I traced every one of the 83 to its container: **100% sit inside the Ink footer or the Ink timeline panel**, both of which set their background as `style="background: var(--color-ink)"`. The detector does not resolve `var()` and assumes paper. My contrast calculator reproduces DESIGN.md §3's own published figures exactly — `--color-control` 3.57:1, ink 18.72:1, the four hues 5.01 / 5.02 / 8.69 / 7.10 — so these are measurements, not estimates.

**`cramped-padding` — 210, same root cause.** The three dominant snippets are `"flex"` (69), `"pt-3.5"` (52) and `"rounded-[8px]"` (48). The last is the Evidence Card's Control well, which carries `p-4` — 16px, the exact inset §8.1 specifies. The detector reads Tailwind arbitrary-value and utility padding as zero.

**`side-tab` — 4, genuine and known.** The 3px top rule on the four platform cards. DESIGN.md §6 slot 3 permits it explicitly and the §6 retraction note already records the disagreement: the detector does not distinguish a top rule from a left rail. No action.

**`em-dash-overuse` — 2, advisory.** 29 em-dashes on AdvoHub, 22 on TrustProperty, in prose that comes verbatim from the scrape. Not counted, not actionable without rewriting sourced copy.

**Net: 0 of the 297 are defects I can fix without either rewriting sourced prose or abandoning a documented §6 slot.** The contract stays `npx impeccable detect src` = 0.

### 1.3 `prefers-reduced-motion` no-ops — confirmed ✓

Read out of the shipped stylesheet, not the source:

```css
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,:before,:after{transition-duration:.01ms!important;animation-duration:.01ms!important;
                   animation-iteration-count:1!important;animation-delay:0s!important}
}
```

- `!important` beats both `.sweep-rule` and `.chip-verify`; with `fill-mode: both` they resolve to their final state within 0.01 ms. Net effect: no motion.
- `.seal-rule` is **double-gated** — `@supports (animation-timeline: view())` *and* `@media (prefers-reduced-motion: no-preference)`. Under reduce the rule is never declared, so the element keeps its default `scaleX(1)`: full width, correct final state.
- Both keyframes interpolate `transform: scaleX()` on a 1px decorative rule, and border/text colour on chips. Neither touches opacity, visibility, height or content.
- **`opacity:0` appears 0 times in the shipped stylesheet. `visibility:hidden` appears 0 times.** Nothing on this site starts hidden.

§7 is not amended. The carve-out is drafted separately in [MOTION-CARVEOUT-PROPOSAL.md](MOTION-CARVEOUT-PROPOSAL.md) for you to accept or reject on its own.

### 1.4 Devanagari — every run's actual language, established not assumed

Exhaustive list of Devanagari in `src/content/`, and what each run actually is:

| # | File / line | Run | Language | Reaches |
|---|---|---|---|---|
| 1 | `platforms.ts:212` (bullet) | `हिंदी` | Hindi | `/platforms/`, `/` |
| 2 | `platforms.ts:208` (pageLede) | `हिंदी` | Hindi | `/platforms/trustproperty/` |
| 3 | `platforms.ts:233` (stat label) | `हिंदी` | Hindi | `/platforms/trustproperty/` |
| 4 | `platforms.ts:251` (evidence output) | `हिन्दी` | Hindi | `/platforms/trustproperty/` |
| 5 | `platform-detail.ts:329` (agent output) | `हिन्दी` | Hindi | `/platforms/trustproperty/` |
| 6 | `platform-detail.ts:381` (FAQ answer) | `हिंदी` | Hindi | `/platforms/trustproperty/` |
| 7 | `platforms.ts:216` (`body`) | `हिंदी` | Hindi | `/solutions/property/` — outside scope |
| 8 | `home.ts:78` (FAQ answer) | `हिंदी` | Hindi | `/` — outside scope |

**Every run in the whole repo is one of two strings — `हिंदी` and `हिन्दी` — and both are the Hindi endonym**, differing only in anusvara vs. conjunct spelling. DESIGN.md §1.7 names both. So `lang="hi"` is the correct tag for all six runs in this section *as a fact about these strings*, not as a blanket default.

Your constraint changes the implementation. A regex that finds Devanagari and stamps `hi` would be wrong the first time someone adds a Marathi or Sanskrit run — the script is shared by Hindi, Marathi, Sanskrit, Nepali and Konkani, and no regex can tell them apart. So:

**Proposed: an explicit dictionary, plus a build assertion that no untagged run can ever ship.**

```ts
// src/content/indic.ts
/** Devanagari is shared by hi / mr / sa / ne / kok. Script cannot imply language,
 *  so every run is declared. check-content.mjs fails the build on any run that
 *  reaches a page without an entry here. */
export const indicRuns: Record<string, string> = {
  'हिंदी': 'hi',
  'हिन्दी': 'hi',
};
```

`markIndic(text)` splits on the keys and wraps each hit in `<span lang="…">`, leaving everything else untouched. The two current entries both resolve to `hi` because both genuinely are Hindi. Add Marathi tomorrow and it must be declared or the build fails.

The pay-off is already in the tree: [theme.css:122-126](src/styles/theme.css#L122-L126) has

```css
:lang(hi), :lang(mr), :lang(kn) { font-family: var(--font-deva); }
```

which is **dead code today** — nothing on the site carries a `lang` attribute. Wrapping the runs makes that rule live, and it is what actually routes Devanagari to the Plex Devanagari cut once the font file lands.

### 1.5 `${hue}33` — instance count corrected, load-bearing analysis, measurements

**First, a correction to the audit.** I wrote "49 instances per page." That was wrong — I had carried over a `cramped-padding` count. The real figures, counted in `dist/`:

| Page | Instances | Component |
|---|---:|---|
| `/platforms/` | 4 | agent-count pill on the platform card |
| `/platforms/medorbit/` | 11 | audience tag on each agent card |
| `/platforms/edvation/` | 20 | ″ |
| `/platforms/advohub/` | 10 | ″ |
| `/platforms/trustproperty/` | 7 | ″ |
| **subtotal, my five pages** | **52** | |
| `/ai-agents/` | 48 | ″ — **outside scope, see below** |
| `/` | 4 | agent-count pill |
| **site-wide** | **104** | |

Emitted from three places: [AgentCard.astro:25](src/components/AgentCard.astro#L25), [platforms/index.astro:58](src/pages/platforms/index.astro#L58), [index.astro:102](src/pages/index.astro#L102).

**Which are load-bearing.** Every one of the 104 is the same object: a pill with `background: var(--color-paper)` sitting on a Paper card. The border is the pill's *only* boundary — remove it and the shape disappears, leaving coloured text on white.

That makes the border **structurally** load-bearing (it is the only thing that draws the pill) but **not informationally** load-bearing under WCAG 1.4.11: the pill is not an interactive control, it has no states, and the information it carries — `11 AI agents`, `Reception` — is in the *text*, which sits at the hue's full ratio on paper: **5.01:1 (MedOrbit) / 5.02:1 (Edvation) / 8.69:1 (AdvoHub) / 7.10:1 (TrustProperty)**, all §3-measured, all AA. Nothing is conveyed by the outline alone, so 1.4.11's 3:1 floor does not attach to it. It is decoration in the same sense `--color-hairline` is, which §3 marks "decorative" and holds to no ratio.

**Measured, on `#ffffff`** — my calculator validated against §3's own published numbers first:

| Platform | Hue | Hue on paper (§3) | `color-mix(in oklab, hue 20%, transparent)` composited | Composited on paper |
|---|---|---:|---|---:|
| MedOrbit | `#0e7c7b` | 5.01:1 | `#cfe5e5` | **1.31:1** |
| Edvation | `#b45309` | 5.02:1 | `#f0ddce` | **1.32:1** |
| AdvoHub | `#8e1f3f` | 8.69:1 | `#e8d2d9` | **1.43:1** |
| TrustProperty | `#6d28d9` | 7.10:1 | `#e2d4f7` | **1.40:1** |
| *reference* | `--color-hairline #dde5f0` | — | — | *1.27:1 — §3: "decorative"* |

The four land in a band just above the system's own hairline. That is the author's evident intent — `33` is hex for 20% alpha.

**What the fix changes visually.** Today the declaration is invalid, `border-color` falls back to `currentColor`, and the border renders at the **full** hue (5.01–8.69:1). After the fix it renders at the intended 20% (1.31–1.43:1). So the pills go from a distinctly coloured outline to a hairline-faint one. This is a visible change on 104 pills, and it is a change *toward* what the code says. Flagging it because "fix the bug" and "keep the current look" are not the same instruction here.

**These four composited values are not pairs §3 measures.** Per the DoD I am not using them without your word — see §5.1.

**`/ai-agents/`, called out separately.** 48 of the 104 are on `/ai-agents/`, which is outside my five pages. `AgentCard.astro` is shared, so fixing the component fixes that page too — I cannot fix mine without touching it. Three ways:

- **(a)** Fix `AgentCard.astro`. 100 of 104 pills change (52 mine, 48 on `/ai-agents/`); `/platforms/` and `/` also need their inline copies fixed for the remaining 4 + 4.
- **(b)** Fix only the two files inside my scope. `/ai-agents/` keeps the invalid border and the section renders inconsistently against it. Not recommended.
- **(c)** Fix all three emitters in one pass, accepting that `/` and `/ai-agents/` are touched.

I recommend **(c)** — it is one identical edit in three places, and leaving two pages rendering a different pill from the other five is worse than the scope stretch. **Needs your word, since it edits two routes outside the brief.**

---

## 2. Diffs against shared files

Shown for review. Not applied.

### 2.1 `src/styles/theme.css` — the Devanagari font stack

```diff
 body {
   margin: 0;
   background: var(--color-paper);
   color: var(--color-body);
-  font-family: var(--font-sans), var(--font-deva);
+  /* --font-sans ends in the `sans-serif` generic, which always matches, so any
+     family listed after it is unreachable — the Devanagari cut has never been
+     used. It must sit inside the stack, before the generic. The `unicode-range`
+     on the Plex Sans face means Devanagari codepoints skip it and land here.
+     DESIGN.md §4 / §14 tokens are unchanged; this is the consumer, not a token. */
+  font-family: 'IBM Plex Sans', 'IBM Plex Sans Devanagari', ui-sans-serif, system-ui, sans-serif;
   font-size: var(--text-body);
   line-height: 1.62;
```

One line changed. `--font-sans` and `--font-deva` keep their §14 values byte-for-byte — I did not want to edit a token DESIGN.md prints verbatim. The cost is that the two family names appear literally in this one declaration. The alternative is folding the Devanagari family into `--font-sans` itself, which reads better but makes `theme.css` diverge from the §14 block. **Say which you prefer; I have gone with the one that leaves §14 true.**

The existing `:lang(hi), :lang(mr), :lang(kn)` rule at lines 122–126 needs no change — §1.4's wrapping is what activates it.

### 2.2 `src/layouts/Base.astro` — FAQPage + BreadcrumbList

```diff
 interface Props {
   title: string;
   description: string;
   jsonldFaq?: boolean;
+  /** FAQs for the FAQPage node. Defaults to the home set. Same source data
+   *  the page renders — DESIGN.md §8.13. */
+  faqItems?: { q: string; a: string }[];
+  /** Same array the page passes to <Breadcrumbs>, so the two cannot drift. */
+  trail?: { href?: string; label: string }[];
 }
-const { title, description, jsonldFaq = false } = Astro.props;
+const { title, description, jsonldFaq = false, faqItems, trail } = Astro.props;
```

```diff
 const faqLd = {
   '@context': 'https://schema.org',
   '@type': 'FAQPage',
-  mainEntity: faqs.map((f) => ({
+  mainEntity: (faqItems ?? faqs).map((f) => ({
     '@type': 'Question',
     name: f.q,
     acceptedAnswer: { '@type': 'Answer', text: f.a },
   })),
 };
+
+/* DESIGN.md §13 / §15 — BreadcrumbList was specified and never emitted. */
+const crumbLd = trail?.length
+  ? {
+      '@context': 'https://schema.org',
+      '@type': 'BreadcrumbList',
+      itemListElement: trail.map((c, i) => ({
+        '@type': 'ListItem',
+        position: i + 1,
+        name: c.label,
+        ...(c.href ? { item: new URL(c.href, Astro.site).href } : {}),
+      })),
+    }
+  : null;
```

```diff
     {jsonldFaq && <script type="application/ld+json" set:html={JSON.stringify(faqLd)} />}
+    {crumbLd && <script type="application/ld+json" set:html={JSON.stringify(crumbLd)} />}
   </head>
```

Both props are optional and default to today's behaviour, so the 13 pages I am not touching emit exactly what they emit now. Verified intent: `/` keeps `jsonldFaq` with the home set; the four detail pages pass their own `faqItems`.

### 2.3 `src/content/platform-detail-fixed.ts` — the corrections overlay (new file)

`platform-detail.ts` is **not** edited. The overlay declares a cut point per corrupted agent and truncates; it never supplies replacement prose.

```ts
/** The generator (scripts/extract-platform-data.py — not in this repo) let the
 *  following "## Roles" section run into the LAST agent's `control` on each of
 *  the four platforms. TrustProperty additionally swallowed the whole
 *  "In development" list.
 *
 *  This overlay CUTS the swallowed tail and nothing else. No prose is authored
 *  here: every corrected value is a strict prefix of the generated one, and is
 *  byte-identical to the `Control` line in ainexushub/. check-content.mjs
 *  asserts both, so a regenerated platform-detail.ts cannot silently drift.
 *
 *  Delete this file when the generator is fixed; the assertions will say so. */
import { detail as generated, type PlatformDetail } from './platform-detail';

const CUTS: Record<string, string> = {
  sahayak: ' Roles ',                 // medorbit
  'science-lab': ' Roles ',           // edvation
  'firm-knowledge-agent': ' Roles ',  // advohub
  'ad-factory': ' In development',    // trustproperty
};

export const detail: Record<string, PlatformDetail> = Object.fromEntries(
  Object.entries(generated).map(([slug, d]) => [
    slug,
    {
      ...d,
      agents: d.agents.map((a) => {
        const cut = CUTS[a.slug];
        if (!cut) return a;
        const at = a.control.indexOf(cut);
        return at === -1 ? a : { ...a, control: a.control.slice(0, at) };
      }),
    },
  ])
);
```

**Proof the cut rewrites nothing** — corrupted vs. `ainexushub/`:

| Platform / agent | Generated | Scrape | Truth is a strict prefix | Cut |
|---|---:|---:|:---:|---:|
| medorbit / `sahayak` | 147 ch | 40 ch | **yes** | 107 ch |
| edvation / `science-lab` | 165 ch | 58 ch | **yes** | 107 ch |
| advohub / `firm-knowledge-agent` | 263 ch | 157 ch | **yes** | 106 ch |
| trustproperty / `ad-factory` | 629 ch | 43 ch | **yes** | 586 ch |

Exactly what gets removed, verbatim:

```
medorbit/sahayak
  keep: "Back-translation QA samples every batch."
   cut: " Roles ## Who MedOrbit is for 8 roles, each with its own view — and an
          audit log that records who saw what."

edvation/science-lab
  keep: "Concept boards are page-cited to the school's own chapter."
   cut: " Roles ## Who Edvation is for 6 roles, each with its own view — and an
          audit log that records who saw what."

advohub/firm-knowledge-agent
  keep: "The ethical wall is pushed into the retrieval SQL, so barred matters are
         never retrieved — let alone shown — and re-applied before any text
         reaches a prompt."
   cut: " Roles ## Who AdvoHub is for 9 roles, each with its own view — and an
          audit log that records who saw what."

trustproperty/ad-factory
  keep: "Campaigns are human-approved before launch."
   cut: " In development — not live today - GharGPT Conversational property
          discovery across the whole marketplace. - Negotiation Assists both
          sides through offer and counter-offer. - Visit Concierge Plans and
          coordinates multi-property site visits. - Agreement Explainer Explains
          a rental or sale agreement clause by clause. - Society Copilot Answers
          resident questions from the society's own records. - NRI Advisor Guides
          non-resident buyers through remote purchase and compliance. Roles ##
          Who TrustProperty is for 6 roles, each with its own view — and an audit
          log that records who saw what."
```

Sources: `ainexushub/platforms/{medorbit:335, edvation:515, advohub:315, trustproperty:255}/index.md`.

**Consumers to repoint** — `import { detail } from '../content/platform-detail'` becomes `'../content/platform-detail-fixed'`:

- `src/pages/platforms/index.astro` — in scope
- `src/pages/platforms/[slug].astro` — in scope
- `src/pages/ai-agents.astro` — **outside scope, one line.** It renders the same four corrupted Control rows. Leaving it means the corruption is fixed on five pages and live on a sixth. Recommend repointing; **needs your word.**
- `src/pages/solutions/[slug].astro` — **outside scope, one line.** It renders `r.agent.control` for roles with an inline example. None of the four corrupted agents is currently paired to a role in `solutions.ts`, so it renders nothing wrong today — but it is one `solutions.ts` edit away from doing so. Recommend repointing for safety.

### 2.4 `scripts/check-content.mjs` — new assertions

Appended; nothing existing is changed.

```js
// ── The corrections overlay cuts, and cuts only. ──
const CUTS = { sahayak: ' Roles ', 'science-lab': ' Roles ',
               'firm-knowledge-agent': ' Roles ', 'ad-factory': ' In development' };
const scrapeControl = (p) => {
  const md = readFileSync(new URL(`../ainexushub/platforms/${p}/index.md`, import.meta.url), 'utf8');
  const lines = [...md.replace(/\r\n/g, '\n').matchAll(/^Control (.+)$/gm)];
  return lines.at(-1)[1].trim();
};
for (const [p, slug] of [['medorbit','sahayak'], ['edvation','science-lab'],
                         ['advohub','firm-knowledge-agent'], ['trustproperty','ad-factory']]) {
  const raw = /* generated control for `slug` */;
  const cut = CUTS[slug];
  assert.ok(raw.includes(cut), `${slug}: cut sentinel ${JSON.stringify(cut)} no longer present — regenerate or delete the overlay`);
  const fixed = raw.slice(0, raw.indexOf(cut));
  assert.ok(raw.startsWith(fixed), `${slug}: correction is not a pure truncation`);
  assert.equal(fixed, scrapeControl(p), `${slug}: corrected control does not match ainexushub/`);
}
// No control anywhere may carry generator spill.
for (const c of allControls) {
  for (const bad of ['## ', ' Roles ', ' In development'])
    assert.ok(!c.includes(bad), `control contains generator spill: ${JSON.stringify(bad)}`);
}

// ── Every Devanagari run that reaches a page is declared (§1.4). ──
for (const run of [...allProse.matchAll(/[ऀ-ॿ]+/g)].map((m) => m[0]))
  assert.ok(run in indicRuns, `undeclared Devanagari run ${JSON.stringify(run)} — add it to src/content/indic.ts with its actual language`);

// ── Progressive enhancement: no reorder control may be authored into markup. ──
for (const f of ['platforms/index.astro', 'platforms/[slug].astro'])
  assert.ok(!pageSrc(f).includes('reorder-btn'), `${f}: reorder controls must stay JS-injected`);
```

The first block is the one that matters: it fails the build if a regenerated `platform-detail.ts` either fixes the corruption (sentinel gone → delete the overlay) or changes the prose (mismatch against the scrape). The overlay cannot rot silently.

---

## 3. Page diffs

### 3.1 `/platforms/` — `src/pages/platforms/index.astro`

| § | Section | Verdict | Change |
|---|---|---|---|
| 1 | Hero | **keep** | + pass `trail` to `Base` for BreadcrumbList (§2.2). Prose duplication with `home.ts:disciplineBody` left alone — not decided. |
| 2 | Four platform cards | **change** | `border: 1px solid ${p.hue}33` → `color-mix` (§1.5, pending §5.1). Wrap `हिंदी` in the TrustProperty bullet via `markIndic` (§1.4). |
| — | — | **add** | The missing `/ai-agents/` link. |
| 3 | Comparison table | **keep** | Markup is already §8.14-correct. `data-sortable` and `initTableSort` stay. |
| 4 | CTA band | **keep** | — |

**The `/ai-agents/` link.** The live page carries it under the table; ours drops it. Restoring the source line, replacing the current bare caption:

```diff
-      <p class="t-sm mt-6" style="color: var(--color-muted);">
-        Every agent is listed with a worked example on its platform page.
-      </p>
+      <p class="t-sm mt-6" style="color: var(--color-muted);">
+        48 named AI agents across the four platforms.
+      </p>
+      <a href="/ai-agents/" class="link-accent mt-3 group/link">
+        See every one with a worked example <Icon name="arrow-right" class="arrow" size={14} />
+      </a>
```

Wording is the live site's (`ainexushub/platforms/index.md`). Uses the existing `.link-accent` and `Icon`; no new component, no new colour.

**Deliberately not doing** (audit §5.10, not ruled on): the missing `<h2>` above the cards, the 40px logo slot, the `AdvoHub languages 22 vs —` drift.

### 3.2 `/platforms/{slug}/` — `src/pages/platforms/[slug].astro`

| § | Section | Verdict | Change |
|---|---|---|---|
| 1 | Hero + stat strip | **change** | + `trail` to `Base`. `markIndic` on `pageLede` and the TrustProperty stat label. `description` truncation left alone — not decided. |
| 2 | Modules + timeline panel + Evidence Card | **change** | `markIndic` on the evidence `output` (TrustProperty). |
| 3 | Agent grid | **change** | Import from `platform-detail-fixed` (§2.3) — this is what actually removes the corrupted Control text. `markIndic` on agent `output`. Seat filter stays. |
| 4 | Roles | **keep** | §8.16 card chrome not ruled on. |
| 5 | Compliance chips | **keep** | Mono on statute refs not ruled on. |
| 6 | FAQ | **change** | + `faqItems={d.faqs}` and `jsonldFaq` on `Base` (§2.2). `markIndic` on the TrustLine answer. `openFirst` left alone — not ruled on. |
| 7 | Siblings | **keep** | — |
| 8 | CTA band | **keep** | — |

Per-platform difference still lives entirely in data. The one slug-conditional block — the hue map at lines 214–226 feeding `initSeatFilter` — **stays**, since the scripts stay.

### 3.3 What this does *not* change

Stated so the diff is not read as wider than it is: no section is added, removed or reordered on any of the five pages; no band changes; no component gains or loses a colour beyond the pill border in §1.5; no agent slug is touched; no new dependency; `reorder.js` is untouched.

---

## 4. Link table after the changes

Measured on `<main>` only — nav and footer excluded, since the brief's table is in-content.

| Page | Target | Now | After |
|---|---|---|---|
| `/platforms/` | 4 platform pages ×2 · `/ai-agents/` · `/contact/` · `/` | 4×2, `/contact/`, `/` — **`/ai-agents/` missing** | **✓ exact** |
| `/platforms/medorbit/` | 3 siblings · `/platforms/` · `/contact/` ×2 · `/` | ✓ | ✓ unchanged |
| `/platforms/edvation/` | ″ | ✓ | ✓ unchanged |
| `/platforms/advohub/` | ″ | ✓ | ✓ unchanged |
| `/platforms/trustproperty/` | ″ | ✓ | ✓ unchanged |

One link added across the whole section. Baseline 869 internal anchors / 0 broken becomes 870 / 0.

---

## 5. Still needed from you

### 5.1 Approval for a colour pair §3 does not measure

The DoD says if I need a pair §3 has not measured, I stop and ask. The `color-mix(in oklab, hue 20%, transparent)` border composites to **1.31 / 1.32 / 1.43 / 1.40 : 1** on paper (§1.5). Those four values are measured, not estimated — my calculator reproduces §3's own published ratios exactly — but they are new values, and the DoD asks about *pairs already in §3*, which these are not.

My read: they are decorative, in the same band as `--color-hairline` (1.27:1) which §3 explicitly marks decorative and holds to no threshold; the pill's meaning is carried by text at 5.01–8.69:1. **Recommend approving, and adding the four values to §3 as measured decorative pairs so the next person does not re-derive them.** Alternative if you would rather not add pairs: drop the tint and give the pill a `--color-hairline` border, which is a §3 value already — the pill then loses its hue outline but keeps its hue text, still inside §6 slots 2 and 5.

### 5.2 Two out-of-scope files the in-scope fixes reach into

Both are one-line import changes; both are pages the brief tells me not to modify:

- `src/pages/ai-agents.astro` → `platform-detail-fixed` (§2.3), and it also carries 48 of the 104 pills (§1.5).
- `src/pages/solutions/[slug].astro` → `platform-detail-fixed`, defensive.
- `src/pages/index.astro` → 4 pills (§1.5).

Fixing my five pages while leaving these renders the same component two ways. **Recommend allowing the three edits.**

### 5.3 Three audit items you have not ruled on

Your decisions covered audit §7 rows 1, 2, 4, 5, 6, 7 and 8. Still open:

| Row | Question | My recommendation |
|---|---|---|
| 3 | Sticky sub-nav on the detail pages — no, or CSS-only with no active state? | **No** — §9 grants the exception to `/ai-agents/` by name, for 48 cards. A detail page is 8 sections. |
| 9 | Hero rule is a sixth use of platform colour, and §6's list says exhaustive. Keep, or make it `--color-hairline`? | **Keep for now** — it is pre-existing on four pages and entangled with the motion question. |
| 10 | Comparison table: AdvoHub languages `22` or `—`? | **`—`**, on reflection. The scrape is the stated source of truth, and `22` is inferred from prose elsewhere. Your call. |

Also unruled from audit §5.10, all left untouched by this plan: the missing `<h2>` and heading-level gap on `/platforms/`, the absent 40px logo slot on both page types, roles rendered borderless instead of §8.16 cards, `openFirst` on the detail FAQs, statute refs not in mono, and the mid-sentence `description` truncation.

---

## 6. Build order

Once §5 is settled. Each step ends with `npm run check:content`, `npm run build`, `npx impeccable detect src`, and the link table.

| # | Chunk | Files |
|---|---|---|
| 1 | Corrections overlay + assertions | `platform-detail-fixed.ts` (new), `check-content.mjs`, 2–4 import lines |
| 2 | Devanagari: dictionary, helper, assertion, font stack | `indic.ts` (new), `theme.css`, `check-content.mjs` |
| 3 | JSON-LD props | `Base.astro`, then the 5 pages pass `trail` / `faqItems` |
| 4 | `color-mix` pill border | `AgentCard.astro`, `platforms/index.astro`, `index.astro` |
| 5 | `/ai-agents/` link on `/platforms/` | `platforms/index.astro` |

Chunk 1 is the one with a visible content change on all four detail pages, so it goes first and gets its own review.

**Stopping here for approval, as instructed.**

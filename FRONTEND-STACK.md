# FRONTEND-STACK.md — drop-in setup for a frontend project

**How to use this file:** copy it into any project folder, open Claude Code there, and say:

> Read FRONTEND-STACK.md and follow it.

Claude will run the install phases below and report what landed. After that, everything is available as `/slash-commands` in that project.

---

## ⚠️ Instructions to Claude — read this first

You are setting up a frontend design toolchain. Follow these rules:

1. **Run Phase 0 → 3 automatically.** They only install agent skills — no credentials, no paid services, no changes to the user's code.
2. **STOP before Phase 4 and Phase 5.** Those need the user's own API key / paid account / Python env. Ask before touching them. Never enter an API key on the user's behalf — print the command and let them paste their own key.
3. **Don't install skills the project doesn't need.** If the user only wants the core set, run Phase 1 and stop. Ask if unsure.
4. **After installing, tell the user to start a new Claude Code session** — skills are picked up at session start, so they won't appear as slash commands until then.
5. Report a short summary at the end: what installed, what was skipped, what needs a restart.

---

## Phase 0 — Preflight

```bash
node -v && npx --yes skills@latest --version
```

Node 18+ required. If `node` is missing, stop and tell the user to install Node.js first.

Everything below installs **into the current project** at `.claude/skills/` (copied, one folder per skill).
To install once for *all* your projects instead, add `-g` to any command.

Add `.claude/skills/` to `.gitignore` if you don't want the skill sources committed to the client's repo.

---

## Phase 1 — Core design skills (install these first)

The minimum set that makes AI-generated UI stop looking templated.

```bash
npx skills@latest add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --agent claude-code -y
npx skills@latest add Leonxlnx/taste-skill --skill design-taste-frontend --agent claude-code -y
npx skills@latest add nexu-io/open-design --skill frontend-design color-expert design-review --agent claude-code -y
```

| Skill | What you get |
|---|---|
| `ui-ux-pro-max` | 84 UI styles, 192 palettes, 74 font pairings, 161 industry rules. Say what you're building, it picks the system. |
| `design-taste-frontend` | Anti-"AI slop" rules — intentional layout/type/motion with density + variance dials. |
| `frontend-design` | The general "build this page, make it premium" generator. |
| `color-expert` | OKLCH palettes, contrast math, accessible color systems. |
| `design-review` | Screenshot → critique → fix → before/after. Run before launch. |

---

## Phase 2 — Motion & scroll

Only needed if the project has animation. Skip for a plain content site.

```bash
npx skills@latest add nexu-io/open-design --skill gsap-core gsap-scrolltrigger gsap-react gsap-timeline gsap-plugins emilkowalski-motion --agent claude-code -y
```

| Skill | What you get |
|---|---|
| `gsap-core` | Tweens, easing, stagger, `matchMedia()` for responsive + reduced-motion. |
| `gsap-scrolltrigger` | Parallax, pinned sections, scrub, reveal-on-scroll. |
| `gsap-react` | `useGSAP()` hook, refs, cleanup on unmount. |
| `gsap-timeline` | Sequencing and choreography. |
| `gsap-plugins` | SplitText, Flip, Draggable, MorphSVG — all free now (see Phase 6). |
| `emilkowalski-motion` | Taste layer for motion — restraint, when *not* to animate. |

---

## Phase 3 — Workflow & style variants

```bash
# Style directions — install the ones matching your client's vibe
npx skills@latest add Leonxlnx/taste-skill --skill minimalist-ui high-end-visual-design industrial-brutalist-ui --agent claude-code -y

# Design → code workflow
npx skills@latest add Leonxlnx/taste-skill --skill image-to-code redesign-existing-projects imagegen-frontend-web imagegen-frontend-mobile brandkit --agent claude-code -y

# Brand extraction, Figma, screenshots
npx skills@latest add nexu-io/open-design --skill brand-extract figma-implement-design figma-use full-page-screenshot design-md apple-hig --agent claude-code -y

# Code quality guardrails
npx skills@latest add multica-ai/andrej-karpathy-skills --skill karpathy-guidelines --agent claude-code -y
npx skills@latest add Leonxlnx/taste-skill --skill full-output-enforcement --agent claude-code -y

# Frontend engineering (Addy Osmani)
npx skills@latest add addyosmani/agent-skills --skill frontend-ui-engineering browser-testing-with-devtools performance-optimization code-review-and-quality --agent claude-code -y
```

| Skill | When you reach for it |
|---|---|
| `minimalist-ui` | Notion / Linear editorial calm. |
| `high-end-visual-design` | Premium, expensive-feeling, low-contrast polish. |
| `industrial-brutalist-ui` | Raw, mechanical, Swiss-grid + terminal. |
| `image-to-code` | Generate a design image first, then build to match it. |
| `redesign-existing-projects` | Audit an existing site and upgrade it without breaking it. |
| `imagegen-frontend-web` | One reference image **per section** before coding. |
| `brandkit` | Logo systems, brand boards, identity decks. |
| `brand-extract` | Pull colors/fonts/logo straight off a reference site. |
| `figma-implement-design` | Figma frames → pixel-accurate code. |
| `design-md` | Create/maintain the project's DESIGN.md source of truth. |
| `apple-hig` | Apple Human Interface Guidelines, 14 skills. |
| `karpathy-guidelines` | Keeps the AI's code lean and surgical. |
| `full-output-enforcement` | Stops the AI truncating long files with `// ...rest`. |
| `frontend-ui-engineering` | Addy Osmani's frontend engineering practices. |
| `browser-testing-with-devtools` | Drive a real browser to verify the UI. |
| `performance-optimization` | Core Web Vitals, bundle size, load time. |

---

## Phase 4 — Magic MCP *(needs the user's own free API key — ASK FIRST)*

Lets you say "give me a pricing table like Stripe's" and get a real component inserted, pulled from 10,000+ community components.

1. User gets a free key at **https://21st.dev/mcp**
2. **The user runs this themselves** with their key pasted in — Claude must not enter it:

```bash
npx @21st-dev/cli@latest init --client claude
```

Skip this phase entirely if the user doesn't want another account.

---

## Phase 5 — Scrapling *(Python, optional — ASK FIRST)*

Only if the project needs bulk content migration or competitor research.

```bash
pip install "scrapling[fetchers]" && scrapling install
```

Use it to pull content off a client's old site to pre-populate the new one, or scrape competitor landing pages into a reference board. Needs Python 3.10+.

---

## Phase 6 — Actual npm packages for the build

These are **runtime dependencies for the website itself**, not agent skills. Install only what the project uses.

```bash
npm install gsap lenis motion
```

| Package | Why |
|---|---|
| `gsap` | Animation engine. **100% free** since Webflow's 2024 acquisition — including every former paid Club GreenSock plugin (SplitText, MorphSVG). |
| `lenis` | Smooth scroll that *wraps* native scroll, so sticky positioning, anchor links and accessibility keep working. Syncs with ScrollTrigger. |
| `motion` | The rebrand of Framer Motion. Use `motion`, not the legacy `framer-motion` package. |
| `sonner` | Toast notifications for React. |
| `@number-flow/react` | Animated counters for KPIs / pricing. |
| `@paper-design/shaders-react` | GPU gradient/noise backgrounds. Pre-1.0 — pin the version. |

**shadcn/ui is not an npm dependency** — it's a CLI that copies component source into your project:

```bash
npx shadcn@latest init
```

Then pull components from any compatible registry:

```bash
npx shadcn@latest add @magicui/marquee
```

Registries worth knowing: `@magicui/*` (animated marketing effects), `@launchui/*` (SaaS blocks), `@smoothui/*` (motion widgets), `registry.watermelon.sh` (260+ dashboard blocks).

---

## Phase 7 — Verify

```bash
npx skills@latest list
```

Then **start a new Claude Code session** and confirm the skills appear as slash commands.

---

## Slash command cheat sheet

Once installed, type these in Claude Code:

### Starting a new design
| Type | To |
|---|---|
| `/ui-ux-pro-max` | Get a style + palette + font system for your product type before writing code. |
| `/imagegen-frontend-web` | Generate one reference image per section first. |
| `/image-to-code` | Build the page to match a generated/supplied image. |
| `/frontend-design` | Just build the thing, premium by default. |
| `/brandkit` | Logo, identity, brand board. |

### Picking a direction
| Type | To |
|---|---|
| `/minimalist-ui` | Notion/Linear editorial calm. |
| `/high-end-visual-design` | Expensive, restrained, premium. |
| `/industrial-brutalist-ui` | Raw, mechanical, Swiss grid. |
| `/design-taste-frontend` | Let it infer the right direction from the brief. |

### Improving what exists
| Type | To |
|---|---|
| `/design-review` | Screenshot → critique → fix → before/after. |
| `/redesign-existing-projects` | Upgrade an existing site without breaking it. |
| `/performance-optimization` | Core Web Vitals, bundle size. |

### Motion
| Type | To |
|---|---|
| `/gsap-scrolltrigger` | Parallax, pinning, scroll reveals. |
| `/gsap-react` | Animation inside React/Next, done right. |
| `/emilkowalski-motion` | Add motion with restraint, after the UI exists. |

### Assets & references
| Type | To |
|---|---|
| `/brand-extract` | "Make it feel like [competitor]" — pull their real colors/fonts/logo. |
| `/figma-implement-design` | Figma → code. |
| `/color-expert` | Accessible palette, contrast math. |
| `/design-md` | Write the project's DESIGN.md. |
| `/full-page-screenshot` | Capture the built page for a case study. |

### Guardrails
| Type | To |
|---|---|
| `/karpathy-guidelines` | Force lean, surgical code. |
| `/full-output-enforcement` | Stop truncated file output. |
| `/browser-testing-with-devtools` | Verify in a real browser. |

---

## Recommended workflow for a new client site

1. `/ui-ux-pro-max` — lock the style, palette, type system.
2. `/design-md` — write DESIGN.md so every later step follows one source of truth.
3. `/imagegen-frontend-web` — one reference image per section, get client sign-off on those.
4. `/image-to-code` or `/frontend-design` — build to match.
5. `/gsap-scrolltrigger` + `/emilkowalski-motion` — add motion last, sparingly.
6. `/design-review` — audit before launch.
7. `/performance-optimization` — Core Web Vitals pass.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Slash commands don't appear | Start a **new** Claude Code session. Skills load at session start. |
| `No skills found` | Repo has no `SKILL.md` — e.g. `voltagent/awesome-design-md` is a file collection, not a skill pack. |
| Want to see a repo's skills first | `npx skills@latest add <owner/repo> -l` |
| Too many skills, context bloat | `npx skills@latest remove <name>` — keep Phase 1 only, add back per project. |
| Install to all projects instead | Re-run any command with `-g`. |
| Which skills are installed? | `npx skills@latest list` (add `-g` for global). |

---

## Reference — not installed by these commands

| Resource | What it is |
|---|---|
| [voltagent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | Ready-made DESIGN.md files reverse-engineered from Stripe, Linear, Notion, Airbnb, Tesla, ~40 more. Copy one into the project root and say "build this in Stripe's style." Not installable — just files. |
| [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | DESIGN.md format *with real tooling* — lints tokens, checks WCAG contrast, exports to Tailwind. Alpha. |
| [github/spec-kit](https://github.com/github/spec-kit) | Spec-driven development — write an executable spec, AI implements against it. Good for scope control. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Turn a client's PDF brief / brand deck into clean Markdown you can paste into a session. |
| [firecrawl](https://github.com/firecrawl/firecrawl) | Hosted alternative to Scrapling — any URL → clean Markdown/JSON. |
| [awesome-wpo](https://github.com/davidsonfellipe/awesome-wpo) | Curated Web Performance Optimization resource list. |

**Security tools** (`usestrix/strix`, `KeygraphHQ/shannon`) are autonomous AI pentesters that find and prove real exploits. Only ever run them against systems you own or have **written authorization** to test — never a client's live site without explicit sign-off.

---

## Inspiration bookmarks

**Components:** [21st.dev](https://21st.dev/community/components) · [Aceternity](https://ui.aceternity.com/) · [Magic UI](https://magicui.design/) · [Cult UI](https://www.cult-ui.com/) · [React Bits](https://reactbits.dev/) · [Smooth UI](https://smoothui.dev/) · [Hyperiux Vault](https://vault.hyperiux.com/) · [Launch UI](https://www.launchuicomponents.com/) · [Componentry](https://www.componentry.fun/)

**Design reference:** [Refero](https://refero.design/) · [Refero Styles](https://styles.refero.design/) · [Land-book](https://land-book.com/) · [Dribbble](https://dribbble.com/) · [footer.design](https://www.footer.design/) · [Made with GSAP](https://madewithgsap.com/)

**Tools:** [tweakcn](https://tweakcn.com/) (shadcn theme editor) · [Toggle Supply](https://www.toggle.supply/) (vanilla micro-interactions) · [Fluid Shader](https://fluidshader.vercel.app/) · [Paper Shaders](https://shaders.paper.design/)

**Pinterest search terms** for moodboarding — search these specifically, not "web design":
`Hero Section` · `Bento Grid Layout` · `SaaS Design` · `Landing Page Design` · `Pricing Section` · `Dashboard Design` · `Dark Mode UI` · `Micro Interactions` · `Scroll Animation` · `Typography Design` · `Visual Hierarchy` · `Card Design` · `Navbar Design` · `Footer Design` · `Premium UI` · `Motion Design`

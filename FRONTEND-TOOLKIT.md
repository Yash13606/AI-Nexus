# Frontend Freelance Toolkit — Resource Guide & Client Talking Points

Compiled 2026-08-04. Everything below was actually installed/tested in this project (`X:\frontend`) or verified by reading its README — nothing here is guessed.

## How to read this

Three kinds of resources:

- **A. AI skills** — installed into Claude Code. They shape *how the UI gets designed/generated*. The client never touches these; they're the reason the output looks intentional instead of templated.
- **B/C. Dev tools** — an MCP component-fetcher and a web scraper. Speed up the build itself.
- **D/E. Libraries & inspiration** — where component code and visual direction come from.

Skip to **section G** for the condensed "what to say on the call" version.

---

## A. AI Design Skills

### Already active globally (installed before this project, working right now)

| Skill | Source repo | What it does |
|---|---|---|
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | Database of 84 UI styles, 192 color palettes, 74 font pairings, 161 industry-specific rules across 22 tech stacks. Describe the product ("beauty spa landing page") and it picks a matching style/palette/type system instead of guessing. |
| `design-taste-frontend` + family | Leonxlnx/taste-skill | Anti-"AI slop" toolkit — forces intentional layout, typography, and motion instead of default templated output, with adjustable dials for density/variance. Family includes `minimalist-ui` (Notion/Linear look), `high-end-visual-design` (premium/calm), `industrial-brutalist-ui` (raw/mechanical), `image-to-code` (build from a reference image), `redesign-existing-projects` (audit + upgrade an existing site), `imagegen-frontend-web/mobile` (generate design comps as images before coding), `stitch-design-taste`. |
| `karpathy-guidelines` | multica-ai/andrej-karpathy-skills | Keeps AI-written code lean: surfaces assumptions before coding, ships the minimal solution, makes surgical diffs instead of rewriting unrelated code. Quality-of-build, not visual. |

### Newly installed for this project (`.claude/skills`, from nexu-io/open-design's 163-skill catalog)

| Skill | What it does |
|---|---|
| `frontend-design` | General-purpose "make this look premium, not templated" generator for landing pages, dashboards, React components. |
| `gsap-core` / `gsap-scrolltrigger` | Professional scroll-driven animation — parallax, pinned sections, reveal-on-scroll — using GSAP, the same animation engine agency sites use. |
| `color-expert` | 286K-word color science reference (OKLCH palettes, contrast/accessibility math, color naming) for building an accessible, cohesive color system instead of picking hex codes by eye. |
| `design-review` | Visual-audit workflow: screenshot, critique, fix, before/after — run right before launch to tighten the UI. |
| `figma-implement-design` | Converts Figma frames into pixel-accurate production code, if the client hands over a Figma file. |
| `brand-extract` | Pulls a full brand kit (colors, fonts, logo) straight from a reference website by driving a browser. Useful when the client says "make it feel like [competitor]." |

*(nexu-io/open-design ships 163 skills total — mostly video/3D/social-media generation via paid APIs like fal.ai and MiniMax, which aren't relevant here. Only the 7 above were installed. Run `npx skills add nexu-io/open-design -l` to see the full catalog if a later need comes up.)*

### Looked at, not installed

- **mattpocock/skills** (41 skills) — engineering *process* skills: TDD, code review against a spec, domain modeling, ticket breakdown. Not UI-design specific; worth adding only if the project scope grows into something needing formal planning/review workflow.
- **voltagent/awesome-design-md** — not an installable skill. It's a library of ready-made `DESIGN.md` files reverse-engineered from real products (Stripe, Linear, Notion, Airbnb, Tesla, ~40 more), each describing that product's color/type/spacing system. Drop one into the project root and just say "build this page in Stripe's style" — the agent reads it directly. No install step, just copy the file in when it's useful.

---

## B. Magic MCP — pull ready-made components straight into the editor

**[21st-dev/magic-mcp](https://github.com/21st-dev/magic-mcp)** is an MCP server: ask for a component in plain English ("a pricing table like Stripe's") inside the editor chat, and it inserts a working, styled React/Tailwind component pulled from a marketplace of 10,000+ community components — instead of hand-coding one from a blank file.

Needs a free API key from 21st.dev/mcp. Install when needed:
```bash
npx @21st-dev/cli@latest init --client claude
```

**Talking point:** "This lets me pull proven, pre-built UI pieces instead of coding every button and form from scratch, so more of your budget goes into custom features instead of reinventing standard components."

---

## C. Scrapling — automated content/reference gathering

**[D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling)** is a Python scraping framework. Unlike a basic script, it auto-adapts if a target site's layout changes (so a scraper doesn't silently break), and can get past bot-detection like Cloudflare Turnstile that blocks simpler tools.

Two concrete uses on a freelance job:
- Scrape 20–30 competitor landing pages overnight into a design-reference board instead of manually visiting/screenshotting each one.
- Pull existing content/pricing off a client's *old* site to pre-populate the new one, instead of manual copy-paste.

```bash
pip install "scrapling[fetchers]" && scrapling install
```

**Talking point:** "I can pull in real competitor and content data automatically rather than collecting it by hand, which saves setup time I put toward polishing your actual site."

---

## D. Component Libraries (copy-paste UI code)

| Site | What it is | Best use | Talking point |
|---|---|---|---|
| [ui.aceternity.com](https://ui.aceternity.com/) | Freemium animated component/template library — React, Next.js, Tailwind, Framer Motion (shadcn/ui-compatible) | Pre-built, already-animated hero sections, bento grids, pricing blocks | "You get the polished micro-animations big-budget sites use, without paying for the hours it'd take to hand-build them." |
| [21st.dev/community/components](https://21st.dev/community/components) | Free community marketplace of React/Tailwind/shadcn components, rated by other devs | Thousands of community-tested buttons, forms, cards, marketing blocks | "Common elements like sign-up forms follow patterns users already know how to use." |
| [cult-ui.com](https://www.cult-ui.com/) | Open-source React/TS/Tailwind/Framer Motion library, shadcn-style copy-paste | Ready-made animated navbars, testimonial carousels, SaaS blocks | "Professional-grade interactive pieces installed in minutes — more budget goes to what makes your site uniquely yours." |
| [skiper-ui.com](https://skiper-ui.com/components) | Freemium motion-heavy shadcn-style library — Next.js, Tailwind, Framer Motion, GSAP | High-polish "wow moment" components (interactive docks, scroll effects) | "For the sections that need a real wow moment, I can license premium animated components instead of billing bespoke build time." |
| [reactbits.dev](https://reactbits.dev/) | Free, open-source 80+ animated components (GSAP, Framer Motion, React-Spring, Three.js) | Standalone flourishes: animated text, particle/3D backgrounds, hover effects | "Free, well-tested animation for the eye-catching details, instead of billing time to reinvent basic motion." |
| [styles.refero.design](https://styles.refero.design/) | Reference tool cataloguing 2,000+ real product design systems (color/type/spacing) | Benchmark this site's palette/type scale against comparable proven products | "I benchmark colors, fonts, and spacing against proven design systems, so the visual foundation feels professional from day one." |
| [refero.design](https://refero.design/) | Curated UI/UX inspiration gallery of real product screenshots | See how other companies solved a specific layout/flow before designing that section | "Before I design a page, I look at how comparable, successful sites solved the same problem." |
| [componentry.fun](https://www.componentry.fun/) | Free open-source React/Tailwind library (shadcn CLI, Vercel OSS-backed) | Self-contained "delight" interactions — magnetic docks, ripple/gradient effects | "A free, open-source toolkit for delight moments, so those flourishes don't add extra cost." |
| [footer.design](https://www.footer.design/) | Niche inspiration gallery — footer designs only, by style category | Reference proven footer layouts instead of treating the footer as an afterthought | "Even a section as 'small' as your footer gets research behind it, so it looks intentional, not bolted on." |
| [uiuxshowcase.com](https://uiuxshowcase.com/) | Curated directory of design tools/portfolios/inspiration galleries | Jumping-off point to find the right tool/reference for whatever a page needs | "I keep a running list of trusted resources so I can find the right reference fast instead of starting research from zero each time." |

---

## E. Design Inspiration / Moodboard Sources

| Site | What it is | Best use | Talking point |
|---|---|---|---|
| [Pinterest](https://in.pinterest.com/) | Visual discovery platform; search + save to themed boards | Early-stage moodboard built from targeted keyword searches (list below) | "I build a Pinterest moodboard from targeted searches first, so we agree on direction before I build anything." |
| [Dribbble](https://dribbble.com/) | Portfolio/showcase site for professional UI/UX and brand designers | Benchmark specific patterns (nav, pricing, dashboards) against current top-tier work | "I check how the best designers are solving the same layout problems, so it feels current, not dated." |
| [Webflow real-estate templates](https://webflow.com/templates/category/real-estate-websites) | Curated gallery of pre-built real-estate site templates | Structural reference for listings/search/lead-forms on a real-estate build | "I look at what's already proven to convert in this exact category before structuring the page." |

### Pinterest keyword workflow

Searching precise terms — instead of a vague "web design" — turns Pinterest into a structured research tool: each keyword isolates one specific design decision (layout, opening impression, motion, color mode), so the board collects focused, comparable examples rather than a random scroll. Run the same list at the start of every project — it becomes a repeatable discovery checklist, and gives the client concrete references to react to ("yes to this hero, no to that grid") instead of an abstract conversation about taste.

Keyword list to search:
`UI Design` · `UX Design` · `Frontend Design` · `Web Design` · `Premium UI` · `Modern UI` · `Clean Interface` · `Premium Interface` · `Landing Page Design` · `Hero Section` · `Feature Section` · `Pricing Section` · `CTA Section` · `Testimonials Section` · `SaaS Design` · `Startup Website Design` · `AI Product Design` · `Dashboard Design` · `Portfolio Design` · `Design System` · `Component Library` · `Component Design` · `Bento Grid Layout` · `Grid Layout` · `2/3/4/5/6 Card Layout` · `Card Design` · `Navbar Design` · `Footer Design` · `Form Design` · `Button Design` · `Table Design` · `Mobile UI` · `Responsive Design` · `Dark Mode UI` · `Typography Design` · `Visual Hierarchy` · `Color Palette` · `Micro Interactions` · `UI Animation` · `Scroll Animation` · `Page Transition` · `Hover Effects` · `Motion Design` · `Interactive UI` · `Framer Motion` · `Website Inspiration` · `UI Inspiration` · `UX Inspiration`

---

## F. skills.sh — where the skills come from

[skills.sh](https://www.skills.sh/) is a searchable directory (1.1M+ listed skills) of install-once AI-agent capabilities, usable across ~20 agents (Claude Code, Cursor, Copilot, Windsurf, Gemini, etc.). Commands used in this project:

```bash
npx skills add <owner/repo>              # install every skill in a repo
npx skills add <owner/repo> --skill x y  # install specific skills only
npx skills add <owner/repo> -l           # list a repo's skills without installing
npx skills find <query>                  # search the directory interactively
npx skills list                          # see what's installed in this project
```

---

## G. Cheat sheet — condensed talking points for the client call

- *"I'm using a curated set of AI design skills — 84 UI styles, 192 color palettes, and rules trained specifically against generic 'AI-slop' patterns — so what we ship looks intentional and on-brand, not templated."*
- *"For common UI pieces I pull from vetted, open-source component libraries instead of hand-building from zero — that time goes into the custom parts of your site instead."*
- *"Before I design anything, I build a moodboard from targeted Pinterest searches and check Dribbble/Refero for how top designers solve the same problems, so the direction is proven, not just my personal taste."*
- *"I use a scroll-animation and motion toolkit (GSAP) — the same engine used on agency-grade sites — for the polish moments: reveals, parallax, hover interactions."*
- *"I run an automated design-quality audit before launch that catches the tells of lazy AI-generated UI — bad contrast, generic fonts, dated animations — so nothing slips through."*
- *"If you've got a Figma file or a site whose brand you like, I can extract the exact colors/fonts/logo or convert Figma frames directly into pixel-accurate code."*
- *"If we need competitor or content research at scale, I can automate pulling that data instead of billing hours for manual collection."*

---

## H. More Component & Animation Libraries

### Real npm packages (import into your codebase)

| Package | Site | Install | What it does |
|---|---|---|---|
| Motion | [motion.dev](https://motion.dev/) | `npm install motion` | Framework-agnostic animation — the rebrand of Framer Motion. Old `framer-motion` package still installs and works but is legacy; use `motion` for new projects. |
| GSAP | [gsap.com](https://gsap.com/) | `npm install gsap` | Professional animation engine — now 100% free including every former paid Club GreenSock plugin (Webflow-owned since 2024). |
| Lenis | [lenis.dev](https://lenis.dev/) | `npm install lenis` | Smooth-scroll wrapper that keeps native scroll behavior (sticky, anchors, accessibility) intact; syncs directly with GSAP ScrollTrigger. |
| Sonner | [sonner.emilkowal.ski](https://sonner.emilkowal.ski/) | `npm install sonner` | Drop-in toast/notification component for React, by Emil Kowalski. |
| Number Flow | [number-flow.barvian.me](https://number-flow.barvian.me/) | `npm install @number-flow/react` | Animated number/counter for KPIs, pricing figures, dashboard stats. |
| Paper Shaders | [shaders.paper.design](https://shaders.paper.design/) | `npm install @paper-design/shaders-react` | GPU-accelerated animated gradient/noise backgrounds without hand-written GLSL. Pre-1.0 — pin the version. |

### Shadcn-registry style (CLI copies source into your project, no runtime dependency)

| Library | Install | Best for |
|---|---|---|
| Magic UI | `npx shadcn@latest add @magicui/<name>` | 150+ free animated marketing effects — marquees, bento grids, animated beams. |
| Launch UI | `npx shadcn@latest add @launchui/<name>` | SaaS landing-page blocks (hero, pricing, CTA) as owned source, not a locked dependency. |
| Smooth UI | `npx shadcn@latest add @smoothui/<name>` | Motion-heavy widgets (dynamic island, siri orb) on top of shadcn/ui. |
| Hyperiux Vault | `npx hyperiux add <effect>` | Scroll/cursor/WebGL micro-interactions built on GSAP + Three.js. |
| Unlumen UI | shadcn registry | Micro-interaction primitives — cursors, tooltips, skeleton loaders. |
| Watermelon UI | registry.watermelon.sh | 260+ dashboard/admin blocks — React 19, Tailwind v4, Radix UI. |
| BeUI Pro | paid registry (~$149 one-time) | Premium animated Next.js landing templates, owned outright. |
| OriginKit | copy-paste, Framer plugin, or MCP server | One-off animated hero/button/gallery snippets, or MCP-driven fetch straight from an AI agent. |

### Tools & inspiration (nothing to install)

| Site | What it is |
|---|---|
| [tweakcn.com](https://tweakcn.com/) | Visual theme editor for shadcn/ui — dial in colors/radius, copy out the generated CSS variables. |
| [Toggle Supply](https://www.toggle.supply/) | Free vanilla HTML/CSS/JS micro-interactions, zero dependencies, works in any stack. |
| [Fluid Shader](https://fluidshader.vercel.app/) | Browser-based WebGL fluid-gradient generator — copy the generated shader code out. |
| [Land-book](https://land-book.com/) | Landing-page design inspiration gallery, 5,000+ sites, free + paid tiers. |
| [Toolfolio](https://toolfolio.com/) | Directory of design/AI/no-code tools — a research jumping-off point, not a library. |
| [Made with GSAP](https://madewithgsap.com/) | Paid (~€20-25/mo) library of 111+ tutorial-backed GSAP effects — different product from gsap.com itself. |

---

## I. Foundational Libraries — Verified

| Library | Repo | Install | Key fact |
|---|---|---|---|
| shadcn/ui | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | `npx shadcn@latest init` | Not a component library you import — a CLI that copies component source directly into your project, styled with Tailwind, built on Radix UI / Base UI / React Aria as the primitive layer. |
| GSAP | [greensock/gsap](https://github.com/greensock/gsap) | `npm install gsap` | 100% free since Webflow's 2024 acquisition, including every former paid Club GreenSock plugin. ~27k GitHub stars, actively maintained. |
| Lenis | [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) | `npm install lenis` | Wraps native scroll instead of replacing it, so sticky positioning, anchor links, and accessibility keep working. Official React, Vue, and Framer adapters. |
| Motion (was Framer Motion) | [motiondivision/motion](https://github.com/motiondivision/motion) | `npm install motion` | `github.com/koenbok/Framer` is a *different, dormant* 2012-era prototyping library (Framer.js) — unrelated to today's Motion animation library despite the name overlap. Don't confuse the two. |

---

## J. Adjacent AI/Dev Tools — What They Are

Not frontend-UI tools themselves — context on the rest of the list, and whether they're worth your time.

### Worth knowing about

| Repo | What it is | Why it matters |
|---|---|---|
| github/spec-kit | GitHub's spec-driven-development toolkit — write an executable spec before code, AI implements against it | Reduces scope drift on any AI-assisted client build. |
| DietrichGebert/ponytail | Forces AI agents to write minimal code — reuse, stdlib, no speculative abstraction | Same philosophy as the ponytail mode already active in this session. |
| addyosmani/agent-skills | 24 skills covering the full dev lifecycle, including `frontend-ui-engineering` and `browser-testing-with-devtools` | Directly targets frontend workflows. |
| anthropics/skills | Anthropic's official skills repo — examples plus the doc-conversion skills (DOCX/PDF/PPTX/XLSX) that power Claude's own file handling | Good reference for writing custom skills; handy for turning client files into something Claude can work with. |
| microsoft/markitdown | Converts PDFs, Office docs, images, audio into clean Markdown for LLMs | Turn a client's PDF brief or brand deck into text you can paste into a coding session. |
| firecrawl/firecrawl | Hosted scraping API/engine — turns any URL into clean Markdown/JSON | The "pay someone else to host it" alternative to Scrapling (section C). |
| colbymchenry/codegraph &amp; Graphify-Labs/graphify | Local knowledge-graph indexers for large codebases — fewer tokens/tool calls for AI agents navigating code | Speeds up AI-assisted work in big unfamiliar client repos; not a UI feature itself. |
| Egonex-AI/Understand-Anything | Interactive, explorable knowledge graph of a codebase with guided dependency-ordered tours | Fast onboarding into an unfamiliar client codebase. |
| oso95/scroll-world | Generates an Apple-style scroll-driven "fly-through" landing page using AI image/video generation plus a scroll-scrubbing JS engine | A real frontend deliverable, but leans on paid AI image/video generation services. |
| davidsonfellipe/awesome-wpo | Curated list of Web Performance Optimization tools/resources (Lighthouse, Core Web Vitals, CDN tips) | Bookmark as a lookup table for perf work — it's a links list, not a library to install. |
| google-labs-code/design.md | A DESIGN.md format *with real tooling* — lints tokens, checks WCAG contrast, exports to Tailwind | More rigorous than a template list (vs. voltagent/awesome-design-md); worth it if a client needs enforced design-token governance. |
| alibaba/open-code-review | AI code-review CLI — flags bugs, XSS, SQL injection in diffs, plugs into CI | Drop into a client's CI pipeline for automated PR review. |

### Security tools — authorized use only

| Repo | What it is | Caveat |
|---|---|---|
| usestrix/strix | Autonomous AI pentesting platform — finds and proves OWASP Top 10 vulnerabilities with working exploits | Only run against systems you own or have written authorization to test — never a client's live site without explicit sign-off. |
| KeygraphHQ/shannon | AI pentester CLI for web apps/APIs, same category as strix | Same authorization caveat. |

### Looked at, not relevant here

| Repo | Why it's out of scope |
|---|---|
| AgriciDaniel/claude-seo | SEO audit skill pack (25 sub-skills) — a useful add-on deliverable, but not a UI tool. |
| virgiliojr94/book-to-skill | Converts books/PDFs into queryable agent skills — general knowledge tool, not frontend-specific. |
| HKUDS/CLI-Anything | Wraps unrelated desktop creative apps (Blender, Audacity) in an agent CLI — not web dev. |
| anthropics/knowledge-work-plugins, coreyhaines31/marketingskills | Business/marketing-role plugins — useful for proposals and comms, not code. |
| google/skills | Mostly Google Cloud/infra skills — relevant only if a client deploys to Firebase or Cloud Run. |

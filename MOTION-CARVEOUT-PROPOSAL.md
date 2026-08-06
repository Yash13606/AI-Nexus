# Proposal — a decorative-motion carve-out for DESIGN.md §7

> Standalone. **DESIGN.md is not amended by this document**, and nothing in the platform-section work depends on it being accepted. Written because §7 as it stands and `theme.css` as it stands cannot both be right, and the honest fix is a documentation decision rather than a code change.
>
> Reject this and the consequence is concrete: `.sweep-rule` and `.seal-rule` must come out of `theme.css`, which changes five pages in this section plus `/`, `/ai-agents/` and `/solutions/*`.

---

## 1. The conflict

`theme.css:247–316` ships a motion system. Two of its three pieces run on the platform pages:

| Class | Behaviour | Instances in the platform section |
|---|---|---|
| `.sweep-rule` | `scaleX(0) → scaleX(1)`, 900 ms, 150 ms delay, **on page load** | 1 per page × 5 — the rule under the `h1` |
| `.seal-rule` | `scaleX(0) → scaleX(1)` driven by `animation-timeline: view()` — **scroll-scrubbed** | 1 per Evidence Card + 1 per Agent Card = 53 |

§7 forbids both, in terms that admit no exception:

> **§7, Forbidden:** Scroll-triggered fade/slide reveals of any content · Parallax, pinned sections, **scroll-scrubbed anything** · **Entrance animation on page load**.

And §0 settles precedence:

> **§0:** Every section below is a decision, already made. Do not re-open them per page.
> **Header:** if code and this file disagree, this file wins.

So as written, both classes are in breach, and the file wins. That is the whole of the case against them.

---

## 2. The case for a carve-out

§7's forbidden list is not arbitrary — it is downstream of §1.1 and §1.2, which exist for one reason, stated in §1:

> **§1.2:** No content is hidden behind scroll-triggered reveal. Content that starts at `opacity: 0` is content an AI crawler may never see.

The rules protect **retrieval**. Measured against that purpose, both classes are clean:

| Test | `.sweep-rule` | `.seal-rule` |
|---|---|---|
| Animates content? | No — a 1px decorative rule | No — a 1px decorative rule |
| Any element starts at `opacity: 0`? | **No.** `opacity:0` appears **0 times** in the shipped stylesheet; `visibility:hidden` **0 times** | No |
| Any figure animated from zero? | No | No |
| Reachable by a crawler with CSS off? | All content, unchanged | All content, unchanged |
| Requires JavaScript? | No | No — CSS scroll-driven, no observer |
| `prefers-reduced-motion: reduce`? | No-ops via the global `!important` block, resolves to final state | Never declared — double-gated behind `@supports` **and** `no-preference` |
| Fails to run (old browser)? | Final state, page correct | Final state, page correct |

The file states its own acceptance test, and it holds:

> *"Every animated element is at its final opacity in the HTML. Nothing fades in. Nothing counts up. If every animation below failed to run, the page would be complete and correct."*

I verified that claim rather than taking it: the shipped CSS contains no `opacity:0` and no `visibility:hidden` anywhere, and both keyframes interpolate `transform: scaleX()` only.

There is also a thematic argument, which I note without leaning on it: `.seal-rule` draws the rule above the Control well as the card enters view — the constraint closing over the output. On a site whose argument *is* the Control row, that is motion carrying the product's meaning rather than decorating around it.

---

## 3. What is actually wrong with §7 as written

§7 forbids techniques. It does not distinguish **what** is animated. "Scroll-scrubbed anything" catches a 1px rule and a hidden headline with the same words, though only one of them can hurt a crawler. That over-reach is why the code and the file diverged: someone read §1.1/§1.2, concluded correctly that a decorative rule is not content, and wrote it — against §7's letter and with §7's purpose.

The gap is a missing category, not a wrong rule.

---

## 4. Proposed amendment

Insert into §7, after **Forbidden**:

> ### Permitted decoration — narrow, and exhaustive
>
> Motion on a **non-content element** is permitted where every condition below holds. This carve-out exists because §1.1 and §1.2 protect retrieval, and an element carrying no content cannot threaten it. It is not a general licence.
>
> 1. The element carries **no text, no figure, no image and no link** — it is a rule, a border or a divider.
> 2. Removing the element entirely would not change the page's meaning to a reader or a crawler.
> 3. Nothing anywhere starts at `opacity: 0` or `visibility: hidden`. Not the animated element, not its siblings.
> 4. The animation interpolates `transform` or `color` only. Never `opacity`, `height`, `display`, `visibility` or `content-visibility`.
> 5. It is **CSS-only**. No JavaScript, no `IntersectionObserver`, no library.
> 6. The un-animated resting state is the **final** state, so a browser that does not support the technique renders the finished page.
> 7. It no-ops under `prefers-reduced-motion: reduce`.
>
> **Currently permitted under this clause, exhaustively:** `.sweep-rule`, `.seal-rule`, `.chip-verify`. Adding a fourth requires an amendment to this list, not a judgement that it qualifies.
>
> §1.1 and §1.2 are unaffected and outrank this clause. Numbers still render at final value; content is still never revealed by scroll.

And a matching line in §11 **Do**:

> - Confine motion to non-content elements under §7's carve-out. If it has words in it, it does not move.

---

## 5. What acceptance would cost

| Concern | Assessment |
|---|---|
| Is this a wedge? | Condition 1 is the wall — it has words in it, it does not move. The named-list requirement means no future animation qualifies by argument. |
| Does it weaken the brand's position? | The brand criticises **count-up numbers and scroll-reveal of content**, both still forbidden by §1.1/§1.2, which this clause explicitly cannot override. |
| Does the Impeccable detector flag either class? | No. Neither appears in the 299 findings across the five built pages. |
| Does it add a dependency or JS? | No. Both are pure CSS; `.seal-rule` uses a native scroll-driven animation. |
| Does §15's ship gate change? | No. Every box still passes; none of them mention decorative rules. |

---

## 6. The alternative, stated fairly

Reject the carve-out, and §7 stands as written. Then `.sweep-rule`, `.seal-rule` and `.chip-verify` must be removed from `theme.css`, and their class references from `EvidenceCard.astro`, `AgentCard.astro`, `platforms/index.astro`, `platforms/[slug].astro`, `solutions/[slug].astro`, `ai-agents.astro` and `index.astro`.

That is the *consistent* outcome, and it is defensible: a design system that grants exceptions to its own prohibitions on the strength of a good argument stops being a contract. If you would rather have a rule that is occasionally too strict than one with a carve-out, removal is the right call and I will do it as a separate change.

What is not defensible is the current state — a file that forbids something and a stylesheet that ships it.

---

## 7. Decision

- [ ] **Accept** — amend §7 as §4, keep the three classes.
- [ ] **Reject** — strip all three classes and their references. Seven files, no behaviour lost, no content affected.
- [ ] **Defer** — leave the divergence documented here and unresolved. My least-preferred option: the next person to read §7 will either delete working code or add a fourth animation, and both will look correct from where they stand.

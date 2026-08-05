# PRODUCT.md — AI Nexus Innovations Hub

> Durable product context. Every design command reads this before designing.
> Written from the scraped live site (`ainexushub/`), not inferred. Assumptions are labelled.

## What this is

An AI product company, incorporated in Bengaluru and Singapore, that builds four AI-native platforms for regulated Indian industries: **MedOrbit** (hospitals), **Edvation** (K-12 schools), **AdvoHub** (legal practice), **TrustProperty** (property). 48 named AI agents across the four.

Founded 2025. Founder & Director: Geetha R.

## Users

Institutional decision-makers in regulated Indian sectors — hospital administrators, school principals, managing partners, property agency owners. They are **buying software they will be audited on.** They have been sold AI before and were burned by demos that didn't survive contact with a compliance officer.

They read carefully. They are looking for the catch.

## Mode

**Persuade** — the landing page's job is to make an institution book a demo. But the persuasion mechanism is *evidence*, not enthusiasm. This audience is moved by a company that declines to overclaim.

Platform, solutions and contact pages are also Persuade. Security is Read.

## Brand voice

Precise, restrained, plain. States what the software does and what it refuses to do. Publishes constraints alongside capabilities.

The voice's signature is **volunteered limitation**:

- *"What certifications does AI Nexus hold? None yet, and we say so plainly."*
- *"We do not publish a go-live duration, because we have not measured one across enough institutions to quote honestly."*
- *"These are capability statements, not certification logos."*
- *"Product examples on this site are illustrative."*

Never: growth-hype, superlatives, urgency, "revolutionary", "10x", "unlock".

## The one idea

**AI that shows its work.**

Page citations in education. Indian Kanoon verification in law. Chart-grounded outputs in health. Explainable scores in property. Every claim is checkable by the person relying on it.

Its structural expression is the **Input → Output → Control** triad, which appears ~60 times across the site. The Control row — what constrains the agent — is the product's actual argument.

## Anti-references

Explicitly named in the site's own build notes as things competitors do and this site does not:

- **JS count-up metrics.** *"A competitor's homepage reads to every crawler and LLM as '0% increase' because its metrics are JS count-up scripts starting at zero."*
- **Badge walls.** Certification logos the company hasn't earned.
- **Content hidden behind scroll reveal.** If a crawler can't see it, it isn't published.
- Purple-to-blue gradient heroes · glassmorphism · floating chat orbs · sticky demo nags · logo carousels · "Trusted by 10,000+ teams".

## Hard constraints

| Constraint | Source |
|---|---|
| Every number renders in HTML at final value | Original build note |
| No content starts at `opacity: 0` | Same |
| Tables are real `<table>` with `<th scope>` | Build note on retrieval serialization |
| WCAG 2.1 AA | Published compliance claim — a contract, not a goal |
| Devanagari renders properly | हिंदी / हिन्दी in body copy; 22 Indian languages claimed |
| Four sub-brands inside one parent system | "One engineering discipline" is the headline claim |
| Data residency: AWS Mumbai `ap-south-1` | Stated on every platform |

## Contact

`raju@ainexushub.ai` · +91 95385 22221 · Mon–Sat, 9:00–19:00 IST
AI Nexus Innovations Hub Pvt. Ltd. — CIN `U47413KA2025PTC210603`, Bengaluru
AI Nexus Innovations Hub Pte. Ltd. — UEN `202550378W`, Singapore

## Assumptions (unverified)

- **Palette is ours, not theirs.** The live site's actual brand colors were never supplied. `DESIGN.md` §3 is a contrast-verified system built from scratch. Repin when real brand values arrive.
- **Logo files are missing.** `logo-mark.png` and the four platform lockups are referenced by the live site but absent from this repo. Typographic wordmarks stand in.

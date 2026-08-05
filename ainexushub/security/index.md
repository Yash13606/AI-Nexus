# AI Governance, DPDP Compliance & Data Residency | AI Nexus

> Source: <https://www.ainexushub.ai/security/>

---

1. [Home](https://www.ainexushub.ai/)
2. / Security

 

# How the AI is governed

 

The same discipline runs through all four platforms. Everything on this page is a control
 implemented in the software, not a commitment in a policy document.

 

## The controls

 

- ### Redacted before the model sees it

 

PHI and personal information are stripped before any model call — nine categories of Indian personal identifier, including Aadhaar, PAN, GSTIN, bank account and passport number.
- ### Citations verified, or removed

 

Legal citations are checked against Indian Kanoon and school answers against the page they came from. What cannot be verified is removed and the answer says so — never rendered with a caveat.
- ### Consent gated, fail-closed

 

DPDP consent is checked before client data reaches a model, and the check fails closed: no consent, no call.
- ### Agents propose, humans approve

 

No agent files, prescribes, sends or bills on its own. A clinician signs the note, a pharmacist signs the reconciliation, a biller approves the appeal, an advocate approves the filing.
- ### Cost ceilings in rupees

 

Every tenant sets a ceiling. At the cap the model downshifts automatically rather than failing, and every invocation is counted against it.
- ### A kill switch per agent

 

One flag turns any single agent off instantly, per institution — no deployment, no support ticket.
- ### Everything logged

 

Every AI invocation is written to an append-only audit trail with the request that produced it.
- ### Deterministic fallback

 

Each agent ships a deterministic engine returning the same schema as the model path, so the anti-hallucination gates apply identically whether or not a model is called.

 

## Data residency

 

All four platforms run in AWS Mumbai (ap-south-1).
 Data does not leave India in normal operation.

 

## Standards each platform implements

 

These are capability statements, not certification logos. We publish certificates only when they exist.

 

### MedOrbit

 [Platform details](https://www.ainexushub.ai/platforms/medorbit/)

 

- ABDM / ABHA
- NHCX cashless claims
- FHIR R4 · HL7 v2
- NABH indicator reporting
- PM-JAY · CGHS · ESIC
- GST e-invoicing with IRN
- DLT-approved WhatsApp / SMS
- DPDP Act 2023
- AWS Mumbai (ap-south-1)

### Edvation

 [Platform details](https://www.ainexushub.ai/platforms/edvation/)

 

- DPDP-ready consent flows
- Data in India (AWS Mumbai)
- Full audit trail
- No training on student data
- Your uploads stay yours
- CBSE · ICSE & ISC · IB · Cambridge · state boards

### AdvoHub

 [Platform details](https://www.ainexushub.ai/platforms/advohub/)

 

- DPDP Act 2023 (§6/§7 consent, §8(4) erasure)
- BSA 2023 §63 / IEA §65B
- BCI Rule 36 AI disclosure
- BCI Rule 27 trust accounts
- eCourts v3.0 official API
- GST · GSTR-1/3B · IRN e-invoicing
- Limitation Act 1963
- WCAG 2.1 AA
- AWS Mumbai (ap-south-1)

### TrustProperty

 [Platform details](https://www.ainexushub.ai/platforms/trustproperty/)

 

- RERA-ID checks on listings
- DPDP Act 2023
- Profiling opt-out that halts the pipeline
- PII redacted before any model call
- Human review of AI-assisted outcomes
- Per-subsystem kill switches
- Data in India

 

## Questions we get asked

 

Where is customer data stored? 

In India. All four platforms run in AWS Mumbai (ap-south-1) under the Digital Personal Data Protection Act 2023, with consent flows, erasure workflows and append-only audit trails built into the software.

 Is customer data used to train AI models? 

No. Personal identifiers are redacted before any model call, and customer data is not used to train models.

 What certifications does AI Nexus hold? 

None yet, and we say so plainly. The standards listed on our platform pages are capability statements describing what the software implements — not certification logos. We will publish certificates when they exist.

 What happens if an AI agent produces something wrong? 

It should not reach anyone. Legal citations are verified against Indian Kanoon and removed if unresolvable; school answers carry the textbook page they came from; extracted facts must match a verbatim quote in the source or they are dropped. Beyond that, no agent files, prescribes, sends or bills on its own — a human approves first, and every invocation is logged.

 Can an AI agent be switched off? 

Yes, individually. Each agent has its own kill switch — one flag, per institution, with no deployment and no support ticket.

 

Security questions: [raju@ainexushub.ai](mailto:raju@ainexushub.ai)

 

## See a platform in action.

 

A 30-minute demo of any platform, run on your own facility type, board, practice area or city — or a conversation about partnership. We reply within one business day.

 

[Book a demo](https://www.ainexushub.ai/contact/) [Connect on LinkedIn](https://www.linkedin.com/company/110654999)

 Contact details live in the footer directly below, per the brief.
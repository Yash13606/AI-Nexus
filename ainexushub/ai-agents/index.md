# All 48 AI Agents Across Four Platforms | AI Nexus

> Source: <https://www.ainexushub.ai/ai-agents/>

---

1. [Home](https://www.ainexushub.ai/)
2. / AI agents

 

# 48 AI agents, each with one job and one guardrail

 

AI Nexus builds 48 named AI agents across four platforms. Each does a single
 task someone would otherwise do by hand. Every agent below is listed with the input a
 user gives, the output it produces, and the constraint that governs it.

 

Product examples on this site are illustrative.

 Jump nav 

- [11 MedOrbit](https://www.ainexushub.ai/ai-agents/#medorbit)
- [20 Edvation](https://www.ainexushub.ai/ai-agents/#edvation)
- [10 AdvoHub](https://www.ainexushub.ai/ai-agents/#advohub)
- [7 TrustProperty](https://www.ainexushub.ai/ai-agents/#trustproperty)

 

## MedOrbit — 11 agents

 [The MedOrbit platform](https://www.ainexushub.ai/platforms/medorbit/)

 

Hospital operating system. Run your hospital. Staff it with AI.

 

### Front-Desk Voice Agent

 Reception

 

Answers every call in your hospital's name, resolves FAQs, and books appointments straight into your schedule.

 

Input A patient calls at 20:40, after the front desk has closed.

 

Output The agent answers in the hospital's name, offers the next three orthopaedics slots, and writes the booking into the live schedule.

 

Control Booking tools are cryptographically signed; every call is logged.

### Aftercare Voice Agent

 Nursing

 

Calls every discharged patient on day 2 and day 7, checks recovery, and records structured outcomes.

 

Input Day 2 after a discharge, the agent calls and works through the recovery script.

 

Output A structured outcome is recorded against the patient. One answer indicates deterioration, and the call is escalated to nursing.

 

Control Deterioration escalates to your staff — the agent never advises.

### AI Scribe

 Doctors

 

Turns a recorded consultation into a structured clinical note, ready for the doctor to edit.

 

Input A nine-minute consultation, recorded in the room.

 

Output A structured note with history, examination, assessment and plan. The doctor edits two lines and signs.

 

Control Nothing enters the chart without a clinician's signature.

### Pre-Consult Brief

 Doctors

 

Builds a Patient-360 brief — visits, labs, meds, allergies, vitals trend — before the doctor walks in.

 

Input The 09:15 appointment is about to start.

 

Output A ten-second brief: last three visits, current medications, two allergies, HbA1c trending upward.

 

Control Reads the record; never writes to it.

### Consult Summary + Draft-Rx

 Doctors

 

Drafts doctor and patient summaries plus a draft prescription, checked against drug interactions and telemedicine schedules.

 

Input The consultation ends.

 

Output A clinician summary, a plain-language patient summary, and a draft prescription with one interaction flagged for review.

 

Control Prescriptions stay drafts until the doctor approves.

### Result Explainer

 Patients

 

Explains lab and imaging results in plain language in the patient portal, the moment they release.

 

Input A lipid panel releases at 13:00.

 

Output The portal shows the numbers alongside a plain-language explanation of what each one means for this patient.

 

Control Guarded output; clinical questions route to your team.

### Referral Triage Router

 Referrals desk

 

Reads inbound referrals, drafts urgency and specialty, and chases missing information before the patient travels.

 

Input An inbound cardiology referral arrives without an ECG attached.

 

Output Urgency drafted, routed to cardiology, and the missing ECG requested from the referrer before the patient travels.

 

Control A code-enforced floor stops the AI from ever downgrading urgency.

### Denial Guard

 Billing

 

Classifies why a claim was denied and drafts the appeal, within value and review thresholds you set.

 

Input A claim is denied for a coding mismatch.

 

Output The denial reason is classified and an appeal drafted with the supporting documentation attached, then queued for review.

 

Control A biller approves every appeal before it leaves.

### Queue Concierge

 Front office

 

Predicts wait times and proactively updates waiting patients on WhatsApp, rescuing slots before they walk.

 

Input The 08:00 OPD queue is running 25 minutes behind.

 

Output Waiting patients receive a WhatsApp update with the revised time. Two accept a later slot instead of leaving.

 

Control Quiet hours respected; templated messages, AI-read replies.

### Med Reconciliation

 Pharmacy

 

Cross-checks medications against RxNorm and openFDA at every admission and discharge, and flags discrepancies.

 

Input A patient's home medication list is entered on admission.

 

Output Cross-checked against RxNorm and openFDA; two duplicates and one interaction are flagged.

 

Control A pharmacist signs off every reconciliation.

### Sahayak

 All staff

 

Renders patient communication into Hindi, Marathi, Kannada and more — and falls back to English rather than guess.

 

Input A discharge instruction needs to reach a family who read Kannada.

 

Output The instruction is rendered into Kannada. One clinical term has no confident rendering, so it stays in English rather than being guessed at.

 

Control Back-translation QA samples every batch.

## Edvation — 20 agents

 [The Edvation platform](https://www.ainexushub.ai/platforms/edvation/)

 

K-12 school operating system. AI that teaches from your textbook.

 

### Study Mentor

 Students

 

Answers any question from the school's own textbook, with the page number attached.

 

Input A student asks why the reaction is exothermic.

 

Output An answer drawn from the school's own uploaded book, citing Science · Ch 4 · p. 87.

 

Control If it is not in your book, the platform says so rather than guessing.

### Voice Tutor

 Students

 

Takes spoken questions and answers aloud, grounded in the chapter, in the student's own language.

 

Input A student speaks a doubt in Kannada during revision and interrupts partway through the answer.

 

Output The tutor stops, takes the follow-up, and continues from the same page-cited source.

 

Control Answers stay grounded in the uploaded chapter, never the open internet.

### Listen & Learn

 Students

 

Turns every chapter into narrated audio or a two-host podcast.

 

Input A student selects Chapter 6 before the bus journey home.

 

Output A nine-minute two-host podcast generated from that chapter's own text.

 

Control Generated from the school's uploaded book, not from general knowledge.

### Chapter Song

 Students

 

Composes a song from the chapter, after a teacher approves the lyrics.

 

Input A teacher requests a song for the water cycle.

 

Output Lyrics are drafted for approval. Only once the teacher approves is the music composed.

 

Control Approval happens before generation, not moderation after it.

### Teacher Lesson Kit

 Teachers

 

Builds a five-artifact lesson kit from one sentence, grounded in the chapter.

 

Input "Photosynthesis, Class 7, one period."

 

Output A lesson plan, slides, a worksheet, an exit ticket and homework — all drawn from the school's own chapter.

 

Control Chapter-grounded; never fabricated from outside the book.

### AI Quiz Generator

 Teachers

 

Generates board-ready questions tagged by board pattern and Bloom level.

 

Input A teacher selects Chapter 12 and asks for twenty questions.

 

Output Twenty questions tagged by difficulty and learning outcome, ready to assign as homework in two clicks.

 

Control Textbook-grounded, with PDF and OCR intake for scanned material.

### Socratic Practice

 Students

 

Gives hints, never answers — and flags the teacher when a student is genuinely stuck.

 

Input A student asks for the answer three times in a row.

 

Output Three progressively stronger hints, L1 through L3. The teacher then sees a stuck-flag for that student and that step.

 

Control Anti-cheating by design — the answer is never given.

### Writing Coach

 Students

 

Coaches writing with anchored comments, and declines to write it for you.

 

Input A student asks it to write the conclusion of their essay.

 

Output It declines, and coaches the structure of a conclusion instead. Pasted text elsewhere in the essay is flagged to the teacher.

 

Control No-ghostwrite guardrail, enforced in the product.

### Ask School Copilot

 Principals

 

Answers questions about the school from live operational data, with citation chips.

 

Input "Which Class 9 sections are below 80% attendance this month?"

 

Output An answer from live attendance data, each figure carrying a chip showing the record it came from.

 

Control Answers from live school data, with the source of each number shown.

### In-app Assistant

 Everyone

 

Gives role-aware help on every screen, plus a spoken daily briefing.

 

Input A new teacher on the gradebook screen asks how curving works.

 

Output An answer scoped to that screen and to what a teacher is permitted to see.

 

Control Role-aware — it will not explain a surface the user cannot access.

### Memory Coach

 Students

 

Schedules spaced repetition, compressed to the days remaining before the exam.

 

Input Fourteen days remain before the Class 10 board exam.

 

Output The revision schedule re-weights toward the three weakest chapters, and the class heatmap updates for the teacher.

 

Control Mastery tracked per student; the class view is aggregate.

### Teach It Back

 Students

 

Grades a student's own explanation against the book, quoting the pages they missed.

 

Input A student explains Ohm's law aloud in their own words.

 

Output A grade against the textbook, quoting the two sentences from the chapter they did not cover.

 

Control Graded against the book, with page-cited quotes as evidence.

### Memory Maps

 Students

 

Turns a chapter into a mind-map where every node carries a page citation.

 

Input A student opens Chapter 9 before a test.

 

Output A downloadable map of the chapter. Tapping any node opens the page it came from.

 

Control Every node is page-cited and traceable to the book.

### Exam Readiness

 Students

 

Sets board-pattern papers and marks them the way an examiner would, step by step.

 

Input A student completes a board-pattern maths paper.

 

Output Step-marking with partial credit, and a marks-lost analysis: "lost 2 marks at step 3 of the quadratic — a sign error."

 

Control Examiner-style step-marking, not a single score.

### Daily Sprint

 Students

 

Runs a three-minute daily practice ritual, with streaks and a weekly parent digest.

 

Input A student opens the app for three minutes after school.

 

Output Five questions, streak intact, and the result folded into Sunday's parent digest.

 

Control Capped at three minutes by design.

### Maths Mentor

 Students

 

Works through maths step by step and finds the first wrong step, not just the wrong answer.

 

Input A student photographs a handwritten worked solution.

 

Output Handwriting OCR reads the working and identifies the first step where it went wrong, then coaches from there.

 

Control Socratic loop — the corrected step is not simply handed over.

### Speak Coach

 Students

 

Scores pronunciation in the browser, so a child's recording never leaves the device.

 

Input A Telugu-medium learner reads a passage aloud.

 

Output A pronunciation heatmap showing a consistent /v/–/w/ substitution, with targeted drills.

 

Control Audio stays in the browser; recordings never leave the device.

### Abacus Trainer

 Students

 

Trains mental maths with spoken-answer grading, handwriting OCR and a hard screen-time cap.

 

Input Dictation practice at competition speed.

 

Output Answers graded from speech, paper sheets graded by OCR, and the session ends at the cap.

 

Control Hard 25-minute screen-time cap.

### Career Compass

 Students

 

Runs scenario interviews and produces a discussion kit for parents in 13 languages.

 

Input A Class 10 student runs a scenario interview for a career they are curious about.

 

Output A reflection for the student, and a discussion kit for the parent in Marathi.

 

Control Exploratory — it suggests conversations, not decisions.

### Science Lab

 Students

 

Runs predict-observe-explain against page-cited concept boards and simulations.

 

Input A student is about to run a simulation.

 

Output They must predict the outcome first, then explain the gap between prediction and observation.

 

Control Concept boards are page-cited to the school's own chapter.

## AdvoHub — 10 agents

 [The AdvoHub platform](https://www.ainexushub.ai/platforms/advohub/)

 

Legal practice platform. The AI copilot built for Indian lawyers.

 

### Citation-Grounded Research

 Associates

 

Answers any Indian-law question with every citation verified against Indian Kanoon first.

 

Input "Can a director who resigned before the cheque was issued be held vicariously liable under Section 141 of the NI Act? Supreme Court and Delhi High Court only."

 

Output An answer composed with per-claim citations. One authority cannot be resolved, so it is removed — and the answer says so.

 

Control Fail-closed: an unverifiable authority is removed, never rendered with a caveat. Overruled or doubted judgments are flagged, not quietly cited.

### Matter Copilot

 Senior associates

 

Chat with any case file — and let it take the action you approve.

 

Input "What's outstanding on this matter?"

 

Output An answer built only from the matter file and live tool results, each fact showing its source. A requested update becomes a proposal for approval.

 

Control Never states a fact that did not come from the file; says "not on file" instead. Write tools create proposals a human must approve. Text inside documents is data, never instructions.

### eCourts Hearing-Prep

 Litigators

 

The evening before a listing: chronology, issues and the questions likely to come.

 

Input A listing is scheduled for tomorrow morning.

 

Output A brief assembling the chronology, the issues, and the questions likely to be asked — every order referenced by its date in the record.

 

Control Any case citation not present verbatim in the input is stripped server-side. Empty lists stay empty rather than being filled with placeholders.

### Drafting Agent

 Associates

 

Court-ready first drafts of petitions, written statements, replies and notices.

 

Input A written statement is needed on a commercial suit.

 

Output A draft built from the matter's own facts, in the firm's own voice. Anything missing appears as [FACT NEEDED: …].

 

Control Interpolates only the facts provided — never invents names, dates, amounts or addresses.

### Vernacular Voice & WhatsApp Intake

 Front desk

 

Takes client intake and status calls 24×7, in the language the client speaks.

 

Input A prospective client messages in Marathi on WhatsApp at 22:00.

 

Output The agent responds in Marathi, captures the intake, and records DPDP consent verbatim on the first substantive turn.

 

Control Until identity is verified it will never confirm a number belongs to a client or reveal any case detail. No legal advice — it escalates to an advocate.

### Contract Review & Redlining

 Corporate practice

 

Clause-by-clause review and redlines against your firm's own playbook.

 

Input A 40-page services agreement is uploaded for review.

 

Output Clause-level redlines against the firm's playbook, with obligations extracted and scored.

 

Control Every obligation quoted is a literal substring of the document. Base Indian-law checks always run — Contract Act §23 and §27, Arbitration Act §20 seat and venue, GST clause presence.

### Proactive Matter Action

 Everyone

 

Watches every matter and surfaces what it needs today, as cards you accept.

 

Input The overnight pass runs across the firm's whole portfolio.

 

Output A card surfaces a limitation deadline with the quote from the file that establishes it.

 

Control A verbatim source quote must match the file or the deadline is rejected. Confidence below 0.6 is dropped; 0.6 to 0.8 is annotated for verification.

### Billing & Timekeeping AI

 Billing

 

Writes billing narrations and catches the billable time you forgot to record.

 

Input The month's time entries are ready for invoicing.

 

Output Narrations drafted for each entry, and unrecorded billable time surfaced for review.

 

Control The model never computes money. Amount patterns are rejected on input and the output is re-scanned before it is shown.

### Bulk Evidence Review

 Litigators

 

Reads, tags and summarises evidence sets of 50 to 500 files at a time.

 

Input 312 files are submitted as a single evidence set.

 

Output Every file tagged and summarised, with a fact matrix assembled across the set.

 

Control Every extracted fact carries a verbatim quote that must be a literal substring of the source. Facts whose quote does not match are dropped and counted.

### Firm Knowledge & Precedent

 Everyone

 

"Have we argued this before?" — answered from your own firm's history.

 

Input "Have we run a §138 defence on a resigned-director point?"

 

Output An answer from the firm's own past drafts, memos and precedent, with the matters it came from.

 

Control The ethical wall is pushed into the retrieval SQL, so barred matters are never retrieved — let alone shown — and re-applied before any text reaches a prompt.

## TrustProperty — 7 agents

 [The TrustProperty platform](https://www.ainexushub.ai/platforms/trustproperty/)

 

Property marketplace with AI. Find your home. Just ask TrustLine.

 

### TrustLine Concierge

 Tenants, buyers and owners

 

Answers questions on every listing 24×7, in text or voice, and books the site visit.

 

Input At 11:40 PM a tenant asks about the deposit.

 

Output TrustLine answers from the listing — text or voice, English, हिन्दी or Hinglish — checks the owner's calendar, and books Saturday 11 AM.

 

Control Answers only from that listing's verified facts, with a note explaining why it said what it said.

### Lead Intelligence

 Agents

 

Scores every enquiry and shows the reasoning behind the score.

 

Input A new enquiry lands on a three-bedroom listing.

 

Output Scored 82/100 HOT in seconds — with reasons: asked to visit (+25), stated budget (+20), moving this month (+20).

 

Control The factor breakdown ships with every score; the number is never shown alone.

### Listing Intake

 Owners

 

Turns spoken description into a filled listing form, and names what is still missing.

 

Input An owner speaks 60 seconds of Hinglish.

 

Output The form fills itself — and lists the two fields still missing.

 

Control It reports its own gaps rather than inventing values for them.

### Property Enrichment

 Owners

 

Ranks listing photos, picks the cover, and tells you which shot is missing.

 

Input An owner uploads eleven photos.

 

Output It ranked your photos, picked the best cover — and told you the kitchen photo is missing.

 

Control Suggests; the owner chooses.

### Retro-Correction

 Agents

 

Notices when one person appears as two leads, merges them, and re-scores.

 

Input The same visitor returns on a different device.

 

Output The AI noticed, merged the lead, and re-scored it.

 

Control Merges are visible to the agent and reversible.

### Pipeline Watchdog

 Agents

 

Flags stalled deals and suggests the nudge that restarts them.

 

Input A deal sits quiet for nine days at Offer stage.

 

Output It gets flagged — with a suggested nudge the agent sends in one tap.

 

Control The agent sends it; the watchdog never messages a client directly.

### Ad Factory

 Agents

 

Writes, launches and optimises listing advertising in English and Hindi.

 

Input A new listing needs a campaign.

 

Output It wrote the Meta ad in English and Hindi, launched it, and replaced the losing variant automatically.

 

Control Campaigns are human-approved before launch.

 

In development — not live today

 

- GharGPT Conversational property discovery across the whole marketplace.
- Negotiation Assists both sides through offer and counter-offer.
- Visit Concierge Plans and coordinates multi-property site visits.
- Agreement Explainer Explains a rental or sale agreement clause by clause.
- Society Copilot Answers resident questions from the society's own records.
- NRI Advisor Guides non-resident buyers through remote purchase and compliance.

 Governance recap 

## How the AI is governed

 

The same discipline runs through all four platforms. These are controls implemented in the software, not commitments in a policy document.

 

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

 

## See a platform in action.

 

A 30-minute demo of any platform, run on your own facility type, board, practice area or city — or a conversation about partnership. We reply within one business day.

 

[Book a demo](https://www.ainexushub.ai/contact/) [Connect on LinkedIn](https://www.linkedin.com/company/110654999)

 Contact details live in the footer directly below, per the brief.
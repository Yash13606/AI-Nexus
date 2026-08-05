import type { Platform } from './platforms';

export type Agent = { slug: string; name: string; platform: Platform['slug']; summary: string };

/** All 48. Slugs are the anchor targets on /ai-agents/ — verified against the live sitemap.
 *  Renaming one silently breaks two in-content links (home + /sitemap/). */
export const agents: Agent[] = [
  // ── MedOrbit · 11 ──────────────────────────────────────────────
  { slug: 'front-desk-voice', platform: 'medorbit', name: 'Front-Desk Voice Agent', summary: "Answers every call in your hospital's name, resolves FAQs, and books appointments straight into your schedule." },
  { slug: 'aftercare-voice', platform: 'medorbit', name: 'Aftercare Voice Agent', summary: 'Calls every discharged patient on day 2 and day 7, checks recovery, and records structured outcomes.' },
  { slug: 'ai-scribe', platform: 'medorbit', name: 'AI Scribe', summary: 'Turns a recorded consultation into a structured clinical note, ready for the doctor to edit.' },
  { slug: 'pre-consult-brief', platform: 'medorbit', name: 'Pre-Consult Brief', summary: 'Builds a Patient-360 brief — visits, labs, meds, allergies, vitals trend — before the doctor walks in.' },
  { slug: 'consult-summary', platform: 'medorbit', name: 'Consult Summary + Draft-Rx', summary: 'Drafts doctor and patient summaries plus a draft prescription, checked against drug interactions and telemedicine schedules.' },
  { slug: 'result-explainer', platform: 'medorbit', name: 'Result Explainer', summary: 'Explains lab and imaging results in plain language in the patient portal, the moment they release.' },
  { slug: 'referral-triage', platform: 'medorbit', name: 'Referral Triage Router', summary: 'Reads inbound referrals, drafts urgency and specialty, and chases missing information before the patient travels.' },
  { slug: 'denial-guard', platform: 'medorbit', name: 'Denial Guard', summary: 'Classifies why a claim was denied and drafts the appeal, within value and review thresholds you set.' },
  { slug: 'queue-concierge', platform: 'medorbit', name: 'Queue Concierge', summary: 'Predicts wait times and proactively updates waiting patients on WhatsApp, rescuing slots before they walk.' },
  { slug: 'med-reconciliation', platform: 'medorbit', name: 'Med Reconciliation', summary: 'Cross-checks medications against RxNorm and openFDA at every admission and discharge, and flags discrepancies.' },
  { slug: 'sahayak', platform: 'medorbit', name: 'Sahayak', summary: 'Renders patient communication into Hindi, Marathi, Kannada and more — and falls back to English rather than guess.' },

  // ── Edvation · 20 ──────────────────────────────────────────────
  { slug: 'study-mentor', platform: 'edvation', name: 'Study Mentor', summary: "Answers any question from the school's own textbook, with the page number attached." },
  { slug: 'voice-tutor', platform: 'edvation', name: 'Voice Tutor', summary: "Takes spoken questions and answers aloud, grounded in the chapter, in the student's own language." },
  { slug: 'listen-learn', platform: 'edvation', name: 'Listen & Learn', summary: 'Turns every chapter into narrated audio or a two-host podcast.' },
  { slug: 'chapter-song', platform: 'edvation', name: 'Chapter Song', summary: 'Composes a song from the chapter, after a teacher approves the lyrics.' },
  { slug: 'teacher-lesson-kit', platform: 'edvation', name: 'Teacher Lesson Kit', summary: 'Builds a five-artifact lesson kit from one sentence, grounded in the chapter.' },
  { slug: 'quiz-generator', platform: 'edvation', name: 'AI Quiz Generator', summary: 'Generates board-ready questions tagged by board pattern and Bloom level.' },
  { slug: 'socratic-practice', platform: 'edvation', name: 'Socratic Practice', summary: 'Gives hints, never answers — and flags the teacher when a student is genuinely stuck.' },
  { slug: 'writing-coach', platform: 'edvation', name: 'Writing Coach', summary: 'Coaches writing with anchored comments, and declines to write it for you.' },
  { slug: 'school-copilot', platform: 'edvation', name: 'Ask School Copilot', summary: 'Answers questions about the school from live operational data, with citation chips.' },
  { slug: 'in-app-assistant', platform: 'edvation', name: 'In-app Assistant', summary: 'Gives role-aware help on every screen, plus a spoken daily briefing.' },
  { slug: 'memory-coach', platform: 'edvation', name: 'Memory Coach', summary: 'Schedules spaced repetition, compressed to the days remaining before the exam.' },
  { slug: 'teach-it-back', platform: 'edvation', name: 'Teach It Back', summary: "Grades a student's own explanation against the book, quoting the pages they missed." },
  { slug: 'memory-maps', platform: 'edvation', name: 'Memory Maps', summary: 'Turns a chapter into a mind-map where every node carries a page citation.' },
  { slug: 'exam-readiness', platform: 'edvation', name: 'Exam Readiness', summary: 'Sets board-pattern papers and marks them the way an examiner would, step by step.' },
  { slug: 'daily-sprint', platform: 'edvation', name: 'Daily Sprint', summary: 'Runs a three-minute daily practice ritual, with streaks and a weekly parent digest.' },
  { slug: 'maths-mentor', platform: 'edvation', name: 'Maths Mentor', summary: 'Works through maths step by step and finds the first wrong step, not just the wrong answer.' },
  { slug: 'speak-coach', platform: 'edvation', name: 'Speak Coach', summary: "Scores pronunciation in the browser, so a child's recording never leaves the device." },
  { slug: 'abacus-trainer', platform: 'edvation', name: 'Abacus Trainer', summary: 'Trains mental maths with spoken-answer grading, handwriting OCR and a hard screen-time cap.' },
  { slug: 'career-compass', platform: 'edvation', name: 'Career Compass', summary: 'Runs scenario interviews and produces a discussion kit for parents in 13 languages.' },
  { slug: 'science-lab', platform: 'edvation', name: 'Science Lab', summary: 'Runs predict-observe-explain against page-cited concept boards and simulations.' },

  // ── AdvoHub · 10 ───────────────────────────────────────────────
  { slug: 'research-agent', platform: 'advohub', name: 'Citation-Grounded Research', summary: 'Answers any Indian-law question with every citation verified against Indian Kanoon first.' },
  { slug: 'matter-copilot', platform: 'advohub', name: 'Matter Copilot', summary: 'Chat with any case file — and let it take the action you approve.' },
  { slug: 'hearing-prep-agent', platform: 'advohub', name: 'eCourts Hearing-Prep', summary: 'The evening before a listing: chronology, issues and the questions likely to come.' },
  { slug: 'drafting-agent', platform: 'advohub', name: 'Drafting Agent', summary: 'Court-ready first drafts of petitions, written statements, replies and notices.' },
  { slug: 'voice-intake-agent', platform: 'advohub', name: 'Vernacular Voice & WhatsApp Intake', summary: 'Takes client intake and status calls 24×7, in the language the client speaks.' },
  { slug: 'contract-review-agent', platform: 'advohub', name: 'Contract Review & Redlining', summary: "Clause-by-clause review and redlines against your firm's own playbook." },
  { slug: 'matter-action-agent', platform: 'advohub', name: 'Proactive Matter Action', summary: 'Watches every matter and surfaces what it needs today, as cards you accept.' },
  { slug: 'billing-agent', platform: 'advohub', name: 'Billing & Timekeeping AI', summary: 'Writes billing narrations and catches the billable time you forgot to record.' },
  { slug: 'evidence-review-agent', platform: 'advohub', name: 'Bulk Evidence Review', summary: 'Reads, tags and summarises evidence sets of 50 to 500 files at a time.' },
  { slug: 'firm-knowledge-agent', platform: 'advohub', name: 'Firm Knowledge & Precedent', summary: '"Have we argued this before?" — answered from your own firm\'s history.' },

  // ── TrustProperty · 7 ──────────────────────────────────────────
  { slug: 'trustline-concierge', platform: 'trustproperty', name: 'TrustLine Concierge', summary: 'Answers questions on every listing 24×7, in text or voice, and books the site visit.' },
  { slug: 'lead-intelligence', platform: 'trustproperty', name: 'Lead Intelligence', summary: 'Scores every enquiry and shows the reasoning behind the score.' },
  { slug: 'listing-intake', platform: 'trustproperty', name: 'Listing Intake', summary: 'Turns spoken description into a filled listing form, and names what is still missing.' },
  { slug: 'property-enrichment', platform: 'trustproperty', name: 'Property Enrichment', summary: 'Ranks listing photos, picks the cover, and tells you which shot is missing.' },
  { slug: 'retro-correction', platform: 'trustproperty', name: 'Retro-Correction', summary: 'Notices when one person appears as two leads, merges them, and re-scores.' },
  { slug: 'pipeline-watchdog', platform: 'trustproperty', name: 'Pipeline Watchdog', summary: 'Flags stalled deals and suggests the nudge that restarts them.' },
  { slug: 'ad-factory', platform: 'trustproperty', name: 'Ad Factory', summary: 'Writes, launches and optimises listing advertising in English and Hindi.' },
];

export const agentsFor = (p: Platform['slug']) => agents.filter((a) => a.platform === p);

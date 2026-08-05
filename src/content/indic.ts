/** Indic script runs, declared one by one.
 *
 *  DESIGN.md §10 requires Devanagari runs to be wrapped in a `lang` attribute
 *  so screen readers switch voice, and §4 pairs a real Devanagari cut for the
 *  same reason. theme.css already routes `:lang(hi|mr|kn)` to --font-deva; that
 *  rule is dead until something on the page carries a lang attribute.
 *
 *  Why a dictionary and not a regex: Devanagari is shared by Hindi, Marathi,
 *  Sanskrit, Nepali and Konkani. Script cannot imply language, so stamping
 *  lang="hi" on anything that matches [ऀ-ॿ] would be wrong the first time a
 *  Marathi run is added. Every run is declared here with its actual language,
 *  and check-content.mjs fails the build on any run in src/content/ that has
 *  no entry.
 *
 *  Both entries below are the Hindi endonym — the same word, written with
 *  anusvara and with a conjunct. DESIGN.md §1.7 names both spellings. */
export const indicRuns: Record<string, string> = {
  हिंदी: 'hi',
  हिन्दी: 'hi',
};

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
const escapeHtml = (s: string) => s.replace(/[&<>]/g, (c) => ESCAPES[c]!);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Longest first, so a run that contains another is matched whole. */
const pattern = new RegExp(
  `(${Object.keys(indicRuns)
    .sort((a, b) => b.length - a.length)
    .map(escapeRe)
    .join('|')})`,
  'g'
);

/** Wrap every declared Indic run in `<span lang="…">`, escaping everything else.
 *  Returns an HTML string — render with `set:html`. */
export function markIndic(text: string): string {
  return text
    .split(pattern)
    .map((part, i) =>
      i % 2 === 1 ? `<span lang="${indicRuns[part]}">${escapeHtml(part)}</span>` : escapeHtml(part)
    )
    .join('');
}

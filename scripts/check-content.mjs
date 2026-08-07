/** One check. Fails if the content layer breaks — the only non-trivial logic
 *  in a static site. Runs in `npm run build`. BUILD-PLAN.md §6. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Normalize CRLF — platform-detail.ts is generated on Windows.
const read = (f) =>
  readFileSync(new URL(`../src/content/${f}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');

const agentsSrc = read('agents.ts');
const platformsSrc = read('platforms.ts');

const slugs = [...agentsSrc.matchAll(/\{ slug: '([a-z0-9-]+)', platform: '(\w+)'/g)].map((m) => ({
  slug: m[1],
  platform: m[2],
}));

const expected = { medorbit: 11, edvation: 20, advohub: 10, trustproperty: 7 };

assert.equal(slugs.length, 48, `expected 48 agents, found ${slugs.length}`);

for (const [p, n] of Object.entries(expected)) {
  const got = slugs.filter((s) => s.platform === p).length;
  assert.equal(got, n, `${p}: expected ${n} agents, found ${got}`);
}

assert.equal(new Set(slugs.map((s) => s.slug)).size, 48, 'duplicate agent slug');

for (const { slug } of slugs) {
  assert.match(slug, /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/, `slug not kebab-case: ${slug}`);
}

// Every platform carries a full evidence triad — an Evidence Card with a
// missing row is a broken component, not a sparse one.
for (const key of ['input:', 'output:', 'control:']) {
  const n = [...platformsSrc.matchAll(new RegExp(`\\b${key}`, 'g'))].length;
  assert.ok(n >= 4, `expected 4+ '${key}' in platforms.ts, found ${n}`);
}

// Platform <-> solution pairing is 1:1, never many-to-many.
const platformSlugs = [...platformsSrc.matchAll(/^\s{4}slug: '([a-z]+)',$/gm)].map((m) => m[1]);
assert.equal(platformSlugs.length, 4, `expected 4 platforms, found ${platformSlugs.length}`);
assert.deepEqual(platformSlugs.sort(), Object.keys(expected).sort());

// ── platform-detail.ts is generated. Verify it did not drift. ──
const detailSrc = read('platform-detail.ts');
const blocks = Object.fromEntries(
  ['medorbit', 'edvation', 'advohub', 'trustproperty'].map((p) => {
    const start = detailSrc.indexOf(`  ${p}: {`);
    const next = detailSrc.indexOf('\n  },\n', start);
    return [p, detailSrc.slice(start, next)];
  })
);

const expectRoles = { medorbit: 8, edvation: 6, advohub: 9, trustproperty: 6 };
const expectFaqs = { medorbit: 5, edvation: 5, advohub: 6, trustproperty: 5 };
const expectChips = { medorbit: 9, edvation: 6, advohub: 9, trustproperty: 7 };

for (const [p, block] of Object.entries(blocks)) {
  const agentsN = [...block.matchAll(/\{ slug: "/g)].length;
  assert.equal(agentsN, expected[p], `${p} detail: expected ${expected[p]} agents, found ${agentsN}`);

  // Every agent needs all three Evidence rows — a missing row is a broken
  // component, not a sparse one.
  for (const row of ['input:', 'output:', 'control:']) {
    const n = [...block.matchAll(new RegExp(`\\n\\s+${row}`, 'g'))].length;
    assert.equal(n, expected[p], `${p}: expected ${expected[p]} '${row}', found ${n}`);
  }

  const modules = block.slice(block.indexOf('modules: ['), block.indexOf('roles: ['));
  assert.equal([...modules.matchAll(/\{ title: /g)].length, 6, `${p}: expected 6 modules`);

  const roles = block.slice(block.indexOf('roles: ['), block.indexOf('compliance: ['));
  assert.equal(
    [...roles.matchAll(/\{ title: /g)].length,
    expectRoles[p],
    `${p}: expected ${expectRoles[p]} roles`
  );

  const chips = block.slice(block.indexOf('compliance: ['), block.indexOf('faqs: ['));
  assert.equal(
    chips.split('", "').length,
    expectChips[p],
    `${p}: expected ${expectChips[p]} compliance chips`
  );

  const faqs = block.slice(block.indexOf('faqs: ['));
  assert.equal([...faqs.matchAll(/\{ q: /g)].length, expectFaqs[p], `${p}: expected ${expectFaqs[p]} FAQs`);
}

// Agent slugs in detail must match the anchors in agents.ts, or deep links break.
const detailSlugs = [...detailSrc.matchAll(/\{ slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
assert.equal(detailSlugs.length, 48, 'detail: expected 48 agent slugs');
assert.deepEqual(
  [...detailSlugs].sort(),
  slugs.map((s) => s.slug).sort(),
  'agents.ts and platform-detail.ts slugs diverged — deep links would break'
);

// ══ The corrections overlay cuts, and only cuts. ═════════════════════════════
// platform-detail.ts is generated, and its generator let the following "## Roles"
// section run into the last agent's `control` on each platform. The overlay in
// platform-detail-fixed.ts truncates at a sentinel. These assertions prove the
// correction is a pure truncation that lands exactly on the scraped text, so a
// regenerated file cannot drift and the overlay cannot rot unnoticed.
const CUTS = {
  medorbit: ['sahayak', ' Roles '],
  edvation: ['science-lab', ' Roles '],
  advohub: ['firm-knowledge-agent', ' Roles '],
  trustproperty: ['ad-factory', ' In development'],
};

/* The site's copy no longer uses em dashes; the scrape under ainexushub/ is a
   record of the source pages and still does, so the two differ by punctuation
   alone. Comparing on words keeps this gate doing its actual job — catching a
   regenerated platform-detail.ts whose CLAIMS have drifted from the scrape —
   without either freezing the punctuation or, worse, editing the reference
   corpus so it matches whatever we just wrote. Any word added, removed or
   changed still fails. */
const sameWords = (a, b) =>
  a.replace(/[—:,()]/g, ' ').replace(/\s+/g, ' ').trim() ===
  b.replace(/[—:,()]/g, ' ').replace(/\s+/g, ' ').trim();

const scrapeControl = (p) => {
  const md = readFileSync(
    new URL(`../ainexushub/platforms/${p}/index.md`, import.meta.url),
    'utf8'
  ).replace(/\r\n/g, '\n');
  const lines = [...md.matchAll(/^Control (.+)$/gm)];
  assert.ok(lines.length > 0, `${p}: no Control lines found in the scrape`);
  return lines[lines.length - 1][1].trim();
};

const detailSlugsWithControls = () =>
  [...detailSrc.matchAll(/\{ slug: "([a-z0-9-]+)"/g)].map((m) => ({ slug: m[1] }));

const controlOf = (slug) => {
  const at = detailSrc.indexOf(`slug: "${slug}"`);
  assert.notEqual(at, -1, `agent ${slug} not found in platform-detail.ts`);
  const seg = detailSrc.slice(at, detailSrc.indexOf('},', at));
  const m = seg.match(/control: "((?:[^"\\]|\\.)*)"/);
  assert.ok(m, `${slug}: no control field`);
  return JSON.parse(`"${m[1]}"`);
};

for (const [platform, [slug, cut]] of Object.entries(CUTS)) {
  const raw = controlOf(slug);
  assert.ok(
    raw.includes(cut),
    `${slug}: cut sentinel ${JSON.stringify(cut)} is gone — platform-detail.ts was ` +
      `regenerated or fixed. Delete the entry from platform-detail-fixed.ts.`
  );
  const fixed = raw.slice(0, raw.indexOf(cut));
  assert.ok(raw.startsWith(fixed), `${slug}: correction is not a pure truncation`);
  assert.ok(
    sameWords(fixed, scrapeControl(platform)),
    `${slug}: corrected control does not match ainexushub/platforms/${platform}/\n` +
      `  ours:   ${fixed}\n  scrape: ${scrapeControl(platform)}`
  );
}

// After the overlay, no control may carry generator spill — checked across all
// 48, so a regeneration that corrupts a different agent is caught too.
const cutFor = Object.fromEntries(Object.values(CUTS));
for (const { slug } of detailSlugsWithControls()) {
  const raw = controlOf(slug);
  const cut = cutFor[slug];
  const corrected = cut && raw.includes(cut) ? raw.slice(0, raw.indexOf(cut)) : raw;
  for (const spill of ['## ', ' Roles ', ' In development']) {
    assert.ok(
      !corrected.includes(spill),
      `${slug}: control carries generator spill ${JSON.stringify(spill)} that the ` +
        `overlay does not cut — ${JSON.stringify(corrected.slice(0, 80))}`
    );
  }
}

// ══ Every Devanagari run that reaches a page is declared. ════════════════════
// Devanagari is shared by hi/mr/sa/ne/kok, so script cannot imply language.
// src/content/indic.ts declares each run; an undeclared one fails the build
// rather than silently shipping the wrong lang attribute.
const indicSrc = read('indic.ts');
const declared = new Set(
  [...indicSrc.matchAll(/^\s{2}([ऀ-ॿ꣠-ꣿ]+):\s*'([a-z-]+)'/gm)].map((m) => m[1])
);
assert.ok(declared.size > 0, 'indic.ts declares no runs — the parser broke');

for (const file of ['platforms.ts', 'platform-detail.ts', 'home.ts', 'solutions.ts', 'pages.ts']) {
  for (const m of read(file).matchAll(/[ऀ-ॿ꣠-ꣿ]+/g)) {
    assert.ok(
      declared.has(m[0]),
      `${file}: undeclared Devanagari run ${JSON.stringify(m[0])} — add it to ` +
        `src/content/indic.ts with its actual language, not a blanket 'hi'`
    );
  }
}

// ══ Progressive enhancement: reorder controls stay JS-injected. ═════════════
// They are built by src/scripts/reorder.js at runtime, so with JS off there is
// no dead button. Authoring one into markup would break that.
for (const page of ['index.astro', '[slug].astro']) {
  const src = readFileSync(
    new URL(`../src/pages/platforms/${page}`, import.meta.url),
    'utf8'
  );
  assert.ok(
    !src.includes('reorder-btn') && !src.includes('reorder-bar'),
    `platforms/${page}: reorder controls must stay JS-injected, never authored into markup`
  );
}

console.log(
  'check:content — 48 agents (×3 evidence rows), 4 platforms, 24 modules, 29 roles, 21 FAQs, ' +
    'slugs aligned, 4 control corrections match the scrape, Devanagari runs declared. OK'
);

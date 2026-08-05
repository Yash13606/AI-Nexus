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

console.log(
  'check:content — 48 agents (×3 evidence rows), 4 platforms, 24 modules, 29 roles, 21 FAQs, slugs aligned. OK'
);

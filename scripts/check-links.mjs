/** Internal link gate. Was folklore — a shell one-liner pasted into reports —
 *  which is not a gate. Run against dist/ after a build.
 *
 *  Checks every internal <a href> resolves to a real file in the build output,
 *  honouring `trailingSlash: 'always'` (so /platforms/ resolves to
 *  dist/platforms/index.html). Fragments are stripped before resolving.
 *
 *  Exits non-zero on any broken link. */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../dist/', import.meta.url).pathname.replace(/\/$/, '');

if (!existsSync(ROOT)) {
  console.error('check:links — no dist/. Run `npm run build` first.');
  process.exit(1);
}

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]
  );

const pages = walk(ROOT).filter((f) => f.endsWith('.html'));
let total = 0;
const broken = [];

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const from = '/' + relative(ROOT, file).replace(/index\.html$/, '');
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/')) continue; // external, mailto, tel, #fragment
    total++;
    const path = href.split('#')[0];
    if (!path || path === '/') continue; // the home page always exists
    const asFile = join(ROOT, path);
    const asDir = join(ROOT, path, 'index.html');
    const ok = (existsSync(asFile) && statSync(asFile).isFile()) || existsSync(asDir);
    if (!ok) broken.push(`${from} → ${href}`);
  }
}

console.log(
  `check:links — ${total} internal links across ${pages.length} pages, ${broken.length} broken.`
);
if (broken.length) {
  broken.forEach((b) => console.error('  BROKEN  ' + b));
  process.exit(1);
}

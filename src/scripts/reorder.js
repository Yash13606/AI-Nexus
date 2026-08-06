/* ═══════════════════════════════════════════════════════════════════════
   FLIP reorder — the one technique carried over from the animation pack.

   The pack's grid demo does this with GSAP Flip (`Flip.getState` → mutate →
   `Flip.from`). The Web Animations API expresses it in fifteen lines, so no
   dependency is added for an effect the platform already has.

   Why this survived the brand's motion contract when the rest of the pack
   did not: FLIP animates elements BETWEEN two positions they already occupy.
   Nothing starts at opacity 0, nothing is revealed, nothing is removed. Turn
   the JavaScript off and you get the same content in its default order.

   Rejected from the pack, and why:
     · word-mask yPercent reveals      — start hidden
     · clip-path inset(100%) staggers  — start hidden
     · ScrollSmoother / Lenis lag      — hijacks scroll, adds a dependency
     · RGB split, pixelate, WebGL      — decoration with no meaning here
   ═══════════════════════════════════════════════════════════════════════ */

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Measure, mutate, invert, play. */
export function flip(items, mutate, duration = 460) {
  const first = new Map(items.map((el) => [el, el.getBoundingClientRect()]));
  mutate();
  if (reduced()) return;
  for (const el of items) {
    const f = first.get(el);
    const l = el.getBoundingClientRect();
    const dx = f.left - l.left;
    const dy = f.top - l.top;
    if (!dx && !dy) continue;
    el.animate(
      [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
      { duration, easing: EASE }
    );
  }
}

/** Build a control strip. Injected by script, so it never renders as a dead
 *  control when JavaScript is unavailable. */
function controls(host, options, onPick, label) {
  const bar = document.createElement('div');
  bar.className = 'reorder-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', label);

  const buttons = options.map((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'reorder-btn tx-fast';
    b.textContent = opt.label;
    b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', () => {
      buttons.forEach((x) => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true');
      onPick(opt);
    });
    bar.appendChild(b);
    return b;
  });

  host.prepend(bar);
}

/* ── /platforms/ — the comparison table re-ranks ──────────────────────────
   The page's job is comparison, so the authored moment is the comparison
   changing its mind. Every row stays in the DOM the whole time.

   The controls moved from an injected button bar onto the column headers,
   which is where a reader looks for them and where `aria-sort` can say which
   column is sorted and which way. The bar's one real virtue is kept: the
   header ships as plain text and is UPGRADED into a button here, so JS off
   leaves a readable header rather than a control that does nothing.

   Not done: scrambling the numerals on re-sort. Four rows and a 460ms FLIP
   already read as a re-rank; adding a digit scramble on top would be motion
   competing with the thing it is supposed to be clarifying, and the numerals
   are the one part of this table a reader is checking. */
export function initTableSort(root) {
  const table = root.querySelector('table[data-sortable]');
  if (!table) return;
  const tbody = table.tBodies[0];
  const head = table.tHead && table.tHead.rows[0];
  if (!tbody || !head) return;

  const heads = [...head.cells].filter((th) => th.dataset.sort);
  if (!heads.length) return;

  const value = (row, key) => row.dataset[key] ?? '';
  const compare = (a, b, key) => {
    const av = value(a, key);
    const bv = value(b, key);
    const an = Number(av);
    const bn = Number(bv);
    if (av !== '' && bv !== '' && !Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
    return av.localeCompare(bv);
  };

  let active = null;

  const apply = (th, dir) => {
    const key = th.dataset.sort;
    const rows = [...tbody.rows];
    flip(rows, () => {
      rows
        .slice()
        .sort((a, b) => compare(a, b, key) * dir)
        .forEach((r) => tbody.appendChild(r));
    });
    for (const h of heads) h.setAttribute('aria-sort', 'none');
    th.setAttribute('aria-sort', dir === 1 ? 'ascending' : 'descending');
    active = th;
  };

  for (const th of heads) {
    // A count sorts biggest-first on the first press; a name sorts A-Z. Both
    // are what someone reaches for the control expecting.
    const first = 'num' in th.dataset ? -1 : 1;
    let dir = first;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'p-sort';
    const caret = document.createElement('span');
    caret.className = 'p-caret';
    caret.setAttribute('aria-hidden', 'true');
    btn.append(th.textContent.trim(), caret);

    th.textContent = '';
    th.append(btn);
    th.setAttribute('aria-sort', 'none');

    btn.addEventListener('click', () => {
      dir = active === th ? -dir : first;
      apply(th, dir);
    });
  }
}

/* ── /platforms/[slug] — the roster answers "what does my seat get?" ──────
   Selecting a seat brings its agents to the front and outlines them. The rest
   stay exactly where a reader can still read them: emphasis, never removal. */
export function initSeatFilter(root, hue) {
  const grid = root.querySelector('[data-agent-grid]');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.agent-card')];
  if (cards.length < 4) return;

  const seats = [...new Set(cards.map((c) => c.dataset.audience))].filter(Boolean);
  const options = [{ label: 'Every seat', seat: null }, ...seats.map((s) => ({ label: s, seat: s }))];

  const apply = (opt) => {
    flip(cards, () => {
      cards.forEach((c) => {
        const hit = !opt.seat || c.dataset.audience === opt.seat;
        c.style.borderColor = hit && opt.seat ? hue : '';
        c.dataset.match = hit ? 'true' : 'false';
      });
      if (opt.seat) {
        cards
          .slice()
          .sort((a, b) => Number(b.dataset.match === 'true') - Number(a.dataset.match === 'true'))
          .forEach((c) => grid.appendChild(c));
      } else {
        cards.forEach((c) => grid.appendChild(c));
      }
    });
  };

  controls(root, options, apply, 'Show agents for a seat');
}

/** Enter-once reveal. ~380 bytes minified.
 *
 *  The hidden state lives in theme.css behind `html[data-reveal-ready]`, and
 *  that attribute is set by an inline head script — not by this module — so
 *  the hidden state exists only where JS is actually running, and only before
 *  first paint. With JS off nothing is ever hidden.
 *
 *  `once: true` by construction: the element is unobserved the moment it is
 *  revealed, so scrolling back up does not replay it and scroll position never
 *  drives progress. That is the §7 line — arrival, not scrubbing. */
export function initReveal(root = document) {
  const els = root.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  // Reduced motion: mark everything revealed immediately and never observe.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.setAttribute('data-revealed', ''));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute('data-revealed', '');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '-100px 0px -80px 0px' }
  );

  els.forEach((el) => io.observe(el));
}

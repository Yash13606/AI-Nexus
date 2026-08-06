/** Count-up that a crawler reads as the final number.
 *
 *  §1.1's ban is overturned for /platforms/* — but the REASON it existed is
 *  kept as the test: the server renders the final value as text, and this only
 *  animates a display value up to the number already in the HTML. View-source
 *  shows 48. JS off, reduced motion, or a crawler → that text stands.
 *
 *  Integers only. `100+`, `₹0`, `ap-south-1`, `—` are labels, not quantities,
 *  and are never touched. */
export function initCountUp(root = document) {
  const els = [...root.querySelectorAll('[data-countup]')];
  if (!els.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const el = e.target;
        const target = Number(el.textContent.trim());
        if (!Number.isFinite(target)) continue;
        const dur = 900;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / dur);
          // matches --ease-entrance
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = String(target);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

/** Magnetic pull toward the cursor. Pointer-fine only, capped so the CTA stays
 *  a button rather than a toy. The anchor and its href exist in the HTML
 *  regardless — this adds pointer response, never the link itself. */
const MAX = 6;

export function initMagnetic(root = document) {
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (const el of root.querySelectorAll('[data-magnetic]')) {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.35;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
      el.style.setProperty('--mx', Math.max(-MAX, Math.min(MAX, dx)) + 'px');
      el.style.setProperty('--my', Math.max(-MAX, Math.min(MAX, dy)) + 'px');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  }
}

/** Accessible tablist. ~330 bytes minified.
 *
 *  Radio inputs + `:checked` would give the same visual for zero bytes, but a
 *  screen reader would announce a radio group — the wrong thing entirely. This
 *  is a real tablist, so it carries the real pattern: roving tabindex, arrow
 *  keys, Home/End, aria-selected, aria-controls.
 *
 *  The markup ships NO `hidden` attributes. With JS off every panel renders,
 *  stacked and readable — the switching is lost, the content is not. Before
 *  paint, a CSS rule scoped to the armed root shows only the first; this module
 *  then sets `data-ready`, which retires that rule and hands visibility to
 *  `hidden`. No flash either way. */
export function initTabs(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  if (tabs.length < 2) return;
  // Takes over visibility from the pre-paint CSS rule.
  root.setAttribute('data-ready', '');
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

  const select = (i, focus) => {
    tabs.forEach((t, n) => {
      const on = n === i;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (panels[n]) panels[n].hidden = !on;
    });
    if (focus) tabs[i].focus();
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i, false));
    t.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      let n = null;
      if (e.key === 'ArrowRight') n = i === last ? 0 : i + 1;
      else if (e.key === 'ArrowLeft') n = i === 0 ? last : i - 1;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = last;
      if (n === null) return;
      e.preventDefault();
      select(n, true);
    });
  });

  select(0, false);
}

/** Slides the tablist underline between tabs by writing custom properties.
 *  The `layoutId` effect without a layout engine — the indicator is one absolutely
 *  positioned element and CSS transitions the transform.
 *
 *  --ind-y is not optional garnish. The tablist wraps, and it has to: six tabs
 *  do not fit one row below ~900px. An x-only indicator on a wrapped list parks
 *  the bar under whichever tab happens to share that column on row one, which
 *  is worse than having no bar at all. */
export function initIndicator(list) {
  const move = () => {
    const on = list.querySelector('[aria-selected="true"]');
    if (!on) return;
    list.style.setProperty('--ind-x', on.offsetLeft + 'px');
    list.style.setProperty('--ind-y', on.offsetTop + on.offsetHeight + 'px');
    list.style.setProperty('--ind-w', on.offsetWidth + 'px');
  };
  list.addEventListener('click', () => requestAnimationFrame(move));
  list.addEventListener('keyup', () => requestAnimationFrame(move));
  addEventListener('resize', move, { passive: true });
  move();
  list.setAttribute('data-indicator', '');
}

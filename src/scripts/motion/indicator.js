/** Slides the tablist underline between tabs by writing two custom properties.
 *  The `layoutId` effect without a layout engine — the indicator is one absolutely
 *  positioned element and CSS transitions the transform. */
export function initIndicator(list) {
  const move = () => {
    const on = list.querySelector('[aria-selected="true"]');
    if (!on) return;
    list.style.setProperty('--ind-x', on.offsetLeft + 'px');
    list.style.setProperty('--ind-w', on.offsetWidth + 'px');
  };
  list.addEventListener('click', () => requestAnimationFrame(move));
  list.addEventListener('keyup', () => requestAnimationFrame(move));
  addEventListener('resize', move, { passive: true });
  move();
  list.setAttribute('data-indicator', '');
}

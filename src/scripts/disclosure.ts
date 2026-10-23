/** Progressive enhancement for native details. The DOM remains usable without JS.
 * Keep the details open during exit; interrupted animations continue from the
 * current rendered frame, and only the latest interaction may settle the state.
 */
export function animateDisclosure(
  details: HTMLDetailsElement,
  content: HTMLElement,
  kind: 'popup' | 'accordion',
  onOpen?: () => void,
) {
  const summary = details.querySelector('summary')!;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let requestedOpen = details.open;
  let animation: Animation | undefined;
  let revision = 0;

  const settle = (open: boolean) => {
    if (!open && content.contains(document.activeElement)) summary.focus({ preventScroll: true });
    details.open = open;
    details.dataset.state = open ? 'open' : 'closed';
    summary.setAttribute('aria-expanded', String(open));
    content.inert = !open;
  };
  settle(requestedOpen);

  function setOpen(open: boolean, { instant = false } = {}) {
    if (requestedOpen === open && !instant) return;
    const token = ++revision;
    const visible = details.open;
    // Read before cancelling, so reversing midway never jumps to an endpoint.
    const style = visible ? getComputedStyle(content) : undefined;
    const from = kind === 'popup'
      ? { opacity: visible ? style!.opacity : '0', transform: visible ? style!.transform : 'translateY(-6px) scale(.985)' }
      : { opacity: visible ? style!.opacity : '0', height: `${visible ? content.getBoundingClientRect().height : 0}px` };
    animation?.cancel();
    animation = undefined;
    requestedOpen = open;
    if (open) onOpen?.();
    if (instant || reduced.matches || typeof content.animate !== 'function') {
      settle(open);
      return;
    }

    details.open = true;
    details.dataset.state = open ? 'opening' : 'closing';
    summary.setAttribute('aria-expanded', String(open));
    content.inert = !open;
    const to = kind === 'popup'
      ? { opacity: open ? '1' : '0', transform: open ? 'translateY(0px) scale(1)' : 'translateY(-4px) scale(.99)' }
      : { opacity: open ? '1' : '0', height: `${open ? content.getBoundingClientRect().height : 0}px` };
    const active = content.animate([from, to], {
      duration: open ? (kind === 'popup' ? 240 : 280) : 160,
      easing: open ? 'cubic-bezier(.22, 1, .36, 1)' : 'cubic-bezier(.4, 0, .6, 1)',
      fill: 'both',
    });
    animation = active;
    active.finished.then(() => {
      if (token !== revision) return;
      settle(open);
      active.cancel(); // Release fill styles: accordion height returns to auto.
      animation = undefined;
    }).catch(() => { /* Cancelled by a newer interaction; its revision owns state. */ });
  }

  summary.addEventListener('click', event => {
    event.preventDefault();
    setOpen(!requestedOpen);
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) setOpen(requestedOpen, { instant: true });
  });
  return { setOpen, get isOpen() { return requestedOpen; } };
}

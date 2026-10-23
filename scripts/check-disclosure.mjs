// State-machine checks; visual layout and real WAAPI behavior are checked in the
// browser. No DOM framework is needed to exercise cancellation/promise ordering.
import assert from 'node:assert/strict';
import { animateDisclosure } from '../src/scripts/disclosure.ts';

const flush = () => new Promise(resolve => setImmediate(resolve));
function fixture({ reduce = false, supported = true, open = false } = {}) {
  const changes = [];
  const media = { matches: reduce, addEventListener: (_, fn) => changes.push(fn) };
  const attributes = new Map();
  const summary = {
    setAttribute: (key, value) => attributes.set(key, value),
    addEventListener() {},
    focus() { document.activeElement = this; },
  };
  const details = { open, dataset: {}, querySelector: () => summary };
  const animations = [];
  const content = {
    inert: false, scrollHeight: 96,
    contains: element => element === content,
    getBoundingClientRect: () => ({ height: 48 }),
    animate: supported ? (keyframes, options) => {
      let complete, reject;
      const animation = {
        keyframes, options,
        finished: new Promise((resolve, fail) => { complete = resolve; reject = fail; }),
        finish: () => complete(),
        cancel: () => reject(Object.assign(new Error('cancelled'), { name: 'AbortError' })),
      };
      animations.push(animation);
      return animation;
    } : undefined,
  };
  globalThis.document = { activeElement: null };
  globalThis.window = { matchMedia: () => media };
  globalThis.getComputedStyle = () => ({ opacity: '.6', transform: 'matrix(1,0,0,1,0,-2)' });
  return { summary, attributes, details, content, animations, media, changes };
}

for (const kind of ['popup', 'accordion']) {
  // A resolved old animation callback must not undo a more recent close.
  let f = fixture();
  let control = animateDisclosure(f.details, f.content, kind);
  assert.equal(f.content.inert, true);
  control.setOpen(true);
  assert.equal(f.details.open, true);
  assert.equal(f.content.inert, false);
  f.animations[0].finish();
  control.setOpen(false);
  assert.equal(f.details.open, true, 'exit must remain rendered until it finishes');
  assert.equal(f.content.inert, true, 'closing links must leave the tab order immediately');
  assert.equal(f.attributes.get('aria-expanded'), 'false');
  await flush();
  assert.equal(f.details.dataset.state, 'closing', 'old completion cannot reopen a closing panel');
  f.animations.at(-1).finish();
  await flush();
  assert.equal(f.details.open, false);

  // Close/open/close/open in quick succession must settle to the latest choice.
  f = fixture();
  control = animateDisclosure(f.details, f.content, kind);
  for (const open of [true, false, true, false, true]) control.setOpen(open);
  f.animations.at(-1).finish();
  await flush();
  assert.equal(f.details.open, true);
  assert.equal(f.details.dataset.state, 'open');
  assert.equal(f.content.inert, false);

  // Changing the OS preference while moving settles immediately, without a jump
  // back to a stale state when the cancelled animation's promise runs.
  control.setOpen(false);
  f.media.matches = true;
  f.changes.forEach(change => change());
  await flush();
  assert.equal(f.details.open, false);
  assert.equal(f.details.dataset.state, 'closed');

  // Reduced motion and older browsers retain the complete native interaction.
  for (const options of [{ reduce: true }, { supported: false }]) {
    f = fixture(options);
    control = animateDisclosure(f.details, f.content, kind);
    control.setOpen(true);
    assert.equal(f.details.open, true);
    assert.equal(f.animations.length, 0);
    document.activeElement = f.content;
    control.setOpen(false);
    assert.equal(f.details.open, false);
    assert.equal(document.activeElement, f.summary, 'never leave focus in hidden content');
  }
}
console.log('Disclosure checks passed: interrupted transitions, stale callbacks, focus, reduced motion and fallback.');

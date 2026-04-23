// Anime.js v4 — minimal runnable example (vanilla JS, browser ESM)
// Demonstrates: animate(), stagger(), timeline(), and WAAPI backend.
// Assumes DOM has: <div class="box"></div> repeated 5 times.

import { animate, stagger, timeline, waapi } from 'animejs';

// 1. Basic animation — move and rotate all .box elements with staggered delay
animate('.box', {
  x: 200,
  rotate: 360,
  duration: 800,
  delay: stagger(80),          // 0ms, 80ms, 160ms ... per element
  ease: 'outExpo',
  loop: true,
  alternate: true,
});

// 2. Timeline — sequence multiple targets with precise offsets
const tl = timeline({ loop: 2, alternate: true });

tl
  .add('.box', { y: -60, duration: 400, ease: 'outQuad' })
  .add('.box', { scale: 1.4, duration: 300, ease: 'outBack' }, '+=100')
  .add('.box', { opacity: 0.4, duration: 200 }, '-=100');

// 3. WAAPI backend — hardware-composited, 3 KB submodule footprint
// Use for simple transforms where GPU compositing matters.
waapi.animate('.box', {
  translate: '0 -30px',
  delay: stagger(50, { from: 'center' }),
  duration: 500,
  loop: true,
  alternate: true,
  ease: 'inOut(2)',
});

/**
 * Theatre.js minimal production example — @theatre/core only (Apache-2.0).
 * Studio is excluded; state JSON was authored in the dev editor and exported.
 *
 * Pattern: load state → declare sheet objects → subscribe to values → play.
 */
import { getProject, types } from '@theatre/core'
import projectState from './animation-state.json' // exported from Studio

const project = getProject('MyProject', { state: projectState })
const sheet = project.sheet('Intro')

// Declare the animatable object with typed props.
// Shape must match what was authored in Studio.
const box = sheet.object('Box', {
  x:       types.number(0,  { range: [-500, 500] }),
  opacity: types.number(1,  { range: [0, 1] }),
  scale:   types.number(1,  { range: [0.1, 5] }),
})

// Get a reference to the DOM element we're animating.
const el = document.getElementById('box') as HTMLElement

// Subscribe to value changes and apply to the DOM.
// Theatre.js drives the values; we own the renderer.
box.onValuesChange(({ x, opacity, scale }) => {
  el.style.transform = `translateX(${x}px) scale(${scale})`
  el.style.opacity   = String(opacity)
})

// Play from 0 → 4 s, once, after the project state has loaded.
project.ready.then(() => {
  sheet.sequence.play({
    range:          [0, 4],
    iterationCount: 1,
    direction:      'normal',
  })
})

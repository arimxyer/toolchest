# Lottie — API Reference

## lottie-web

### Load an animation

```js
import lottie from 'lottie-web';

const anim = lottie.loadAnimation({
  container: document.getElementById('root'), // required
  renderer: 'svg',          // 'svg' | 'canvas' | 'html'
  loop: true,
  autoplay: true,
  path: '/animations/hero.json',    // URL — OR —
  // animationData: jsonObject,     // inline JSON (mutually exclusive with path)
  name: 'hero',                     // optional, for global controls
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
    progressiveLoad: false,         // SVG only
    hideOnTransparent: true,        // SVG only
    title: 'Hero animation',        // SVG accessibility
    description: 'Animated hero',
    className: 'lottie-svg',
  },
});
```

### Animation instance methods

| Method | Description |
|---|---|
| `play()` | Play from current frame |
| `pause()` | Pause at current frame |
| `stop()` | Stop and reset to frame 0 |
| `setSpeed(n)` | Playback speed multiplier (default 1) |
| `setDirection(1 \| -1)` | Forward or reverse |
| `goToAndPlay(value, isFrame?)` | Jump to time (ms) or frame and play |
| `goToAndStop(value, isFrame?)` | Jump to time/frame and pause |
| `playSegments([from, to], forceFlag?)` | Play a frame range |
| `setSubframe(bool)` | Enable/disable sub-frame rendering |
| `getDuration(inFrames?)` | Duration in seconds or frames |
| `destroy()` | Destroy and free memory |
| `addEventListener(event, cb)` | `complete`, `loopComplete`, `enterFrame`, `segmentStart`, `config_ready`, `data_ready`, `DOMLoaded`, `destroy` |

### Global lottie controls

```js
lottie.play('hero');
lottie.pause();
lottie.stop();
lottie.setSpeed(2);
lottie.setDirection(-1);
lottie.freeze();        // pause all animations
lottie.unfreeze();
lottie.resize();        // recompute sizes after layout change
lottie.destroy('hero');
lottie.setQuality('high' | 'medium' | 'low' | number);
lottie.useWebWorker(true);    // experimental
lottie.getRegisteredAnimations();
```

---

## @lottiefiles/dotlottie-web

### Load an animation

```js
import { DotLottie } from '@lottiefiles/dotlottie-web';

const player = new DotLottie({
  canvas: document.getElementById('canvas'), // required HTMLCanvasElement
  src: '/animations/hero.lottie',   // URL to .lottie or .json — OR —
  // data: arrayBuffer,              // inline ArrayBuffer or string
  autoplay: true,
  loop: true,
  speed: 1,
  mode: 'forward',          // 'forward' | 'reverse' | 'bounce' | 'reverse-bounce'
  backgroundColor: '#00000000',
  segment: [0, 60],         // frame range to play
  useFrameInterpolation: true,
  renderConfig: {
    devicePixelRatio: window.devicePixelRatio,
    autoResize: true,
    freezeOnOffscreen: true,   // pause when off-screen (IntersectionObserver)
  },
});
```

### DotLottie instance API

| Method | Description |
|---|---|
| `play()` | Play |
| `pause()` | Pause |
| `stop()` | Stop |
| `destroy()` | Destroy, release WASM/canvas resources |
| `setSpeed(n)` | Speed multiplier |
| `setLoop(bool)` | Toggle looping |
| `goToAndPlay(frame)` | Jump to frame and play |
| `goToAndStop(frame)` | Jump to frame and pause |
| `setMode(mode)` | Change playback mode |
| `loadAnimation({ animationId, autoplay, loop })` | Switch to another animation in multi-animation `.lottie` |
| `addEventListener(event, cb)` | Events: `play`, `pause`, `stop`, `complete`, `loop`, `frame`, `load`, `loadError`, `destroy` |
| `removeEventListener(event, cb)` | — |

### State machine API (dotlottie only)

```js
player.stateMachineLoad('MyStateMachine');
player.stateMachineStart();
player.stateMachineFireEvent('click');
player.stateMachineSetNumericInput('progress', 0.75);
player.stateMachineSetStringInput('theme', 'dark');
player.stateMachineGetNumericInput('progress');
```

### React wrapper

```tsx
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// or DotLottieWorkerReact for off-main-thread rendering

<DotLottieReact src="/hero.lottie" loop autoplay speed={1.5} />
```

Props mirror the `DotLottie` constructor. `dotLottieRefCallback` prop gives access to the instance.

### Theming / slots (dotlottie)

Runtime theming via `themes` manifest in the `.lottie` file; apply with `player.setTheme('dark')`. Slots allow replacing images/colors defined in the source file at runtime.

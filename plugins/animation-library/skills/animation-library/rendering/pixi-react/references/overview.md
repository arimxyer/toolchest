# @pixi/react — Overview

## What it is

`@pixi/react` is a custom React reconciler that maps JSX component trees onto PixiJS v8 scene graphs. PixiJS handles all rendering via WebGPU (with WebGL and Canvas fallbacks); React manages state, lifecycle, and composition. The library acts as a thin bridge between the two.

## First-party status (important)

As of the v8 rewrite (2025), `@pixi/react` is now **maintained directly by the PixiJS core team** under `github.com/pixijs/pixi-react`. Prior versions (v7 and earlier) were a community-maintained project outside the pixijs org. This means API parity with PixiJS core is now a first-class concern, and the project follows PixiJS release cadence.

## v8 rewrite highlights

The v8 release is a **ground-up rewrite** targeting React 19 (concurrent mode, the new reconciler API via `react-reconciler@0.31`). Key design changes from v7:

- **`extend()` catalogue model**: rather than bundling all PixiJS classes, you explicitly register the classes you need. This avoids pulling the entire PixiJS namespace into the bundle. Any PixiJS class passed to `extend({ Foo })` becomes the JSX element `<pixiFoo />`.
- **Prop parity**: every property settable on a PixiJS object is a valid JSX prop on the corresponding component — no intermediate prop-mapping layer.
- **Auto-update on PixiJS upgrades**: because the component layer is generated from the registered classes, PixiJS feature additions/removals are immediately available without `@pixi/react` releasing a patch.

## Core concepts

### Application wrapper
`<Application>` initialises a `PIXI.Application` instance and provides it to the React context. Accepts all `PIXI.ApplicationOptions` as props, plus React-specific additions: `resizeTo` (accepts a React ref), `extensions`, `defaultTextStyle`, `destroyOptions`, `rendererDestroyOptions`.

### Component registration
```ts
import { Container, Sprite } from 'pixi.js';
import { extend } from '@pixi/react';

extend({ Container, Sprite });
// Now <pixiContainer /> and <pixiSprite /> are valid JSX.
```

### Hooks
- `useApplication()` — access the `PIXI.Application` instance from any descendant of `<Application>`.
- `useTick(callback, isEnabled?)` — attach a function to the app Ticker; callback fires on every frame.
- `useExtend({ ... })` — memoised version of `extend()` for use inside components.

## Installation

```bash
npm install pixi.js@^8.2.6 @pixi/react
```

Requires React >=19.0.0 in the host app.

## Browser support

Matches PixiJS v8: WebGPU where available, WebGL2 fallback, Canvas fallback via the `pixi.js-legacy` package.

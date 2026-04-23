# @pixi/react — API Reference

All verified against v8.0.5 source and docs at react.pixijs.io (retrieved 2026-04-22).

---

## Top-level exports

### `extend(components: Record<string, PixiClass>)`
Registers PixiJS classes into the internal component catalogue. Must be called before JSX that uses those components.

```ts
import { Container, Sprite, Graphics, Text } from 'pixi.js';
import { extend } from '@pixi/react';

extend({ Container, Sprite, Graphics, Text });
```

Registered classes become JSX elements with the `pixi` prefix (camelCase): `Container` → `<pixiContainer />`, `AnimatedSprite` → `<pixiAnimatedSprite />`.

---

## Components

### `<Application>`
Root component. Creates and owns a `PIXI.Application` instance.

| Prop | Type | Notes |
|---|---|---|
| `autoStart` | `boolean` | Start ticker immediately (default: true) |
| `sharedTicker` | `boolean` | Use the shared global ticker |
| `resizeTo` | `HTMLElement \| React.RefObject` | Auto-resize canvas to this element or ref |
| `extensions` | `ExtensionFormat[]` | PixiJS extensions; array add/remove auto-loads/unloads |
| `defaultTextStyle` | `Partial<TextStyle>` | Applied to `TextStyle.defaultTextStyle` (not retroactive) |
| `destroyOptions` | `DestroyOptions` | Passed to `app.destroy()` on unmount |
| `rendererDestroyOptions` | `RendererDestroyOptions` | Passed as first arg to `app.destroy()` on unmount |
| `...rest` | `ApplicationOptions` | Any `PIXI.ApplicationOptions` field |

### `<pixiContainer />`
Maps to `PIXI.Container`. Accepts all Container properties as props.

### `<pixiSprite />`
Maps to `PIXI.Sprite`. Key props: `texture`, `x`, `y`, `rotation`, `scale`, `alpha`, `anchor`, `eventMode`, event handlers (`onClick`, `onPointerDown`, etc.).

### `<pixiGraphics />`
Maps to `PIXI.Graphics`. Special prop:

| Prop | Type | Notes |
|---|---|---|
| `draw` | `(g: Graphics) => void` | Callback called on every tick with the Graphics context. Should be `useCallback`-memoised. |

### `<pixiAnimatedSprite />`
Maps to `PIXI.AnimatedSprite`. Key props: `textures`, `playing`, `animationSpeed`.

### `<pixiText />` / `<pixiHtmlText />`
Maps to `PIXI.Text` / `PIXI.HtmlText`. Prop: `text`, `style`.

---

## Hooks

### `useApplication(): { app: PIXI.Application }`
Returns the `PIXI.Application` instance from context. Must be called inside a descendant component of `<Application>` — not in the same component that renders `<Application>`.

### `useTick(callback: () => void, isEnabled?: boolean): void`
### `useTick(options: TickOptions): void`
Attaches `callback` to the app Ticker. Fires on every animation frame. `isEnabled` (default: `true`) can pause the callback without unmounting.

`TickOptions`:
```ts
{
  callback: (this: Context) => void;
  context?: Context;
  isEnabled?: boolean;
  priority?: number; // corresponds to PIXI Ticker priority
}
```

Callbacks should be `useCallback`-memoised to prevent ticker re-registration on every render.

### `useExtend(components: Record<string, PixiClass>): void`
Memoised version of `extend()`. Safe to call inside a component; registers classes only once.

---

## TypeScript

Custom components registered via `extend` need manual type augmentation:

```ts
// globals.d.ts
import { Viewport } from 'pixi-viewport';

declare module '@pixi/react' {
  interface PixiElements {
    pixiViewport: PixiReactElementProps<typeof Viewport>;
  }
}
```

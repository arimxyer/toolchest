# Theatre.js — API Reference

All exports below are from `@theatre/core` unless noted. Verified against v0.7.2 docs (2026-04-22).

---

## `getProject(id, config?)`

```ts
getProject(id: string, config?: { state?: ProjectState }): Project
```

Entry point. `state` is the exported JSON from Studio. Omit in dev (Studio manages state in `localStorage`); supply it in production for deterministic playback.

---

## `Project`

| Member | Type | Notes |
|---|---|---|
| `.sheet(name, instanceId?)` | `Sheet` | Creates or retrieves a named sheet |
| `.ready` | `Promise<void>` | Resolves when state has loaded |
| `.isReady` | `boolean` | Sync readiness check |
| `.address.projectId` | `string` | |
| `.getAssetUrl(handle)` | `string` | For image/file props (since 0.6.0) |

---

## `Sheet`

| Member | Type | Notes |
|---|---|---|
| `.object(key, config, opts?)` | `SheetObject` | Declares an animatable object |
| `.detachObject(key)` | `void` | Removes object (since 0.5.1) |
| `.sequence` | `Sequence` | The timeline for this sheet |
| `.project` | `Project` | Parent project |
| `.address` | `SheetAddress` | `{ projectId, sheetId, sheetInstanceId }` |

---

## `SheetObject`

Created via `sheet.object(key, propConfig, options?)`.

```ts
const obj = sheet.object('Box', {
  x: types.number(0, { range: [-10, 10] }),
  color: types.rgba({ r: 1, g: 0, b: 0, a: 1 }),
})
```

| Member | Type | Notes |
|---|---|---|
| `.value` | `object` | Current prop values (not reactive, snapshot) |
| `.props` | `Pointer<Props>` | Reactive pointer, use with `val()` / `onChange()` |
| `.onValuesChange(cb)` | `() => void` | Subscribe; returns unsubscribe fn |
| `.initialValue` | `object` | Programmatic default overrides |
| `.address` | `ObjectAddress` | `{ projectId, sheetId, sheetInstanceId, objectKey }` |

---

## `Sequence`

| Member | Type | Notes |
|---|---|---|
| `.play(opts?)` | `Promise<boolean>` | `true` = completed normally |
| `.pause()` | `void` | |
| `.attachAudio(opts)` | `Promise<void>` | `{ source, audioContext?, destinationNode? }` |
| `.pointer.position` | `Pointer<number>` | Playhead position in seconds |
| `.pointer.length` | `Pointer<number>` | Total duration |
| `.pointer.playing` | `Pointer<boolean>` | |
| `.__experimental_getKeyframes(ptr)` | `Keyframe[]` | Read-only keyframe access (since 0.6.1) |

### `play()` options

```ts
sequence.play({
  rate: 1,           // playback speed multiplier
  range: [0, 3],     // [start, end] in seconds
  iterationCount: Infinity,
  direction: 'normal' | 'reverse' | 'alternate' | 'alternateReverse',
  rafDriver: customRafDriver,  // custom requestAnimationFrame driver
})
```

---

## Reactive Utilities

```ts
import { val, onChange } from '@theatre/core'

// Synchronous read
const x = val(obj.props.x)

// Subscribe to changes (returns unsubscribe)
const unsub = onChange(obj.props.x, (newX) => { ... })
```

---

## Prop Types (`types.*`)

| Type | Signature | Notes |
|---|---|---|
| `number` | `types.number(default, opts?)` | `opts: { range, nudgeMultiplier, interpolate }` |
| `boolean` | `types.boolean(default)` | |
| `string` | `types.string(default, opts?)` | |
| `stringLiteral` | `types.stringLiteral(default, choices, opts?)` | Enum selector in Studio |
| `rgba` | `types.rgba(default?)` | `{ r, g, b, a }` each 0–1 |
| `compound` | `types.compound(props, opts?)` | Nested object of typed props |
| `image` | `types.image(default, opts?)` | Asset handle (since 0.6.0) |
| `file` | `types.file(default, opts?)` | File asset handle (since 0.7.0) |

---

## `@theatre/studio` (dev only)

```ts
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

studio.initialize()
studio.extend(extension)  // enables r3f scene graph editing
```

Never ship `@theatre/studio` to production — it is AGPL-3.0 licensed.

---

## `@theatre/r3f`

```tsx
import { SheetProvider, editable as e, PerspectiveCamera } from '@theatre/r3f'

<SheetProvider sheet={sheet}>
  <e.mesh theatreKey="Box" position-x={0}>
    <boxGeometry />
  </e.mesh>
</SheetProvider>
```

`editable as e` wraps any Three.js primitive and registers it with Studio for visual editing. The `theatreKey` prop is required and must be unique within the sheet.

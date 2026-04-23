# @use-gesture/react — API Reference

## Hooks

| Hook | Gesture covered |
|---|---|
| `useDrag` | Pointer/touch drag — includes swipe, tap detection, rubber-band bounds |
| `usePinch` | Two-finger pinch: distance (scale) + rotation angle |
| `useScroll` | Element scroll events with synthetic start/end |
| `useWheel` | Mouse wheel events with synthetic start/end |
| `useMove` | Mouse-move events (no button press required) |
| `useHover` | Mouse enter / leave |
| `useGesture` | Composes any combination of the above in a single binding |

## Usage pattern

```ts
// Single gesture
const bind = useDrag((state) => { /* use state */ }, options)
return <div {...bind()} />

// Multi-gesture
const bind = useGesture(
  {
    onDrag: (state) => { },
    onDragStart: (state) => { },
    onDragEnd: (state) => { },
    onPinch: (state) => { },
    onScroll: (state) => { },
    onWheel: (state) => { },
    onMove: (state) => { },
    onHover: (state) => { },
  },
  {
    drag: dragOptions,
    pinch: pinchOptions,
    scroll: scrollOptions,
  }
)
```

## Gesture state object (common fields)

```ts
{
  // Event
  event: PointerEvent | TouchEvent | WheelEvent
  type: string
  target: EventTarget
  currentTarget: EventTarget

  // Position
  xy: [number, number]        // current pointer position [x, y]
  initial: [number, number]   // position at gesture start
  delta: [number, number]     // change since last frame
  movement: [number, number]  // total movement from initial
  offset: [number, number]    // offset including previous gestures (persistent)
  lastOffset: [number, number]

  // Kinematics
  velocity: [number, number]  // px/ms per axis
  distance: [number, number]  // total distance per axis
  direction: [number, number] // [-1, 0, 1] per axis

  // Lifecycle
  first: boolean    // true on first event of gesture
  last: boolean     // true on last event of gesture
  active: boolean
  startTime: number
  timeDelta: number
  elapsedTime: number
  timeStamp: number

  // Control
  memo: any         // persisted across frames within one gesture
  cancel: () => void  // programmatically end gesture
  canceled: boolean

  // Input state
  down: boolean
  buttons: number
  touches: number
  ctrlKey: boolean; altKey: boolean; shiftKey: boolean; metaKey: boolean

  // Cross-gesture awareness (from useGesture)
  dragging: boolean; pinching: boolean; scrolling: boolean
  wheeling: boolean; moving: boolean
}
```

### Drag-only extras

```ts
swipe: [number, number]  // [-1|0|1] per axis; 1 = swipe right/down
tap: boolean             // true if pointer went down and up without significant movement
```

### Pinch-only extras

```ts
da: [number, number]     // [distance, angle] between two touch points
origin: [number, number] // midpoint between touch points
offset: [number, number] // [scale, angle] accumulated
```

## Key config options

| Option | Hook | Default | Notes |
|---|---|---|---|
| `filterTaps` | drag | `false` | Skip handler if gesture was a tap |
| `preventScroll` | drag | `false` | Block page scroll; adds 250ms hold delay on touch |
| `preventScrollAxis` | drag | `'y'` | Which axis is allowed to scroll |
| `rubberband` | drag, pinch | `0` | Elastic factor past `bounds` |
| `bounds` | drag | none | `{ left, right, top, bottom }` in px |
| `delay` | drag | `false` | ms to wait before firing handler |
| `pointer.touch` | drag, pinch | auto | Force touch events instead of pointer |
| `pointer.capture` | drag | `true` | Use `setPointerCapture` |
| `pointer.lock` | drag | `false` | Pointer lock mode during drag |
| `pointer.keys` | drag | `true` | Arrow key drag when element is focused |
| `swipe.distance` | drag | `[50, 50]` | Min px to classify as a swipe |
| `swipe.velocity` | drag | `[0.5, 0.5]` | Min px/ms to classify as a swipe |
| `scaleBounds` | pinch | none | `{ min, max }` for scale |
| `angleBounds` | pinch | none | `{ min, max }` for angle (degrees) |

## @use-gesture/vanilla

The same gesture engine exposed as a class for non-React environments:

```ts
import { DragGesture } from '@use-gesture/vanilla'

const gesture = new DragGesture(element, (state) => { }, options)
// cleanup
gesture.destroy()
```

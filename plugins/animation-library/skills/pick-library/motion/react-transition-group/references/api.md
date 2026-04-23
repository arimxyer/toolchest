# react-transition-group — API Reference

Version: 4.4.5 (final release, 2022-08-01)

## `<Transition>`

The lowest-level building block. Tracks lifecycle state.

```tsx
import { Transition } from 'react-transition-group';

<Transition
  in={boolean}           // toggle — true = enter, false = exit
  timeout={number | { enter: number; exit: number }}
  mountOnEnter={boolean} // default false — delay mounting until first in=true
  unmountOnExit={boolean}// default false — unmount after exit completes
  appear={boolean}       // default false — animate on first render if in=true
  onEnter={node => void}
  onEntering={node => void}
  onEntered={node => void}
  onExit={node => void}
  onExiting={node => void}
  onExited={node => void}
>
  {(state: 'entering' | 'entered' | 'exiting' | 'exited') => ReactNode}
</Transition>
```

State machine: `exited` → (in=true) → `entering` (for `timeout.enter` ms) → `entered` → (in=false) → `exiting` (for `timeout.exit` ms) → `exited`.

## `<CSSTransition>`

Extends `<Transition>` — same props plus:

```tsx
import { CSSTransition } from 'react-transition-group';

<CSSTransition
  in={boolean}
  timeout={number | { enter: number; exit: number }}
  classNames="fade"        // string prefix, or object with per-phase class names
  unmountOnExit
  nodeRef={ref}            // preferred over findDOMNode (deprecated in React 18+)
>
  <div ref={ref}>content</div>
</CSSTransition>
```

With `classNames="fade"`, the library applies:
- `fade-enter` + `fade-enter-active` during enter phase
- `fade-enter-done` when entered
- `fade-exit` + `fade-exit-active` during exit phase
- `fade-exit-done` when exited

All animation is in CSS — the library only adds/removes the classes.

Object form of `classNames`:
```ts
classNames={{
  appear: 'my-appear',
  appearActive: 'my-appear-active',
  appearDone: 'my-appear-done',
  enter: 'my-enter',
  enterActive: 'my-enter-active',
  enterDone: 'my-enter-done',
  exit: 'my-exit',
  exitActive: 'my-exit-active',
  exitDone: 'my-exit-done',
}}
```

## `<SwitchTransition>`

Wraps a single keyed child and handles sequential transitions when the key changes.

```tsx
import { SwitchTransition, CSSTransition } from 'react-transition-group';

<SwitchTransition mode="out-in"> {/* or "in-out" */}
  <CSSTransition key={currentKey} timeout={300} classNames="slide" nodeRef={ref}>
    <div ref={ref}>{content}</div>
  </CSSTransition>
</SwitchTransition>
```

- `mode="out-in"` — current child exits completely before new child enters (default feel for page transitions)
- `mode="in-out"` — new child enters, then old child exits

## `<TransitionGroup>`

Manages a list of `<Transition>` or `<CSSTransition>` children. Automatically detects added/removed children by key and triggers enter/exit transitions.

```tsx
import { TransitionGroup, CSSTransition } from 'react-transition-group';

<TransitionGroup component="ul">
  {items.map(item => (
    <CSSTransition key={item.id} timeout={300} classNames="item">
      <li>{item.label}</li>
    </CSSTransition>
  ))}
</TransitionGroup>
```

`component` prop sets the wrapper element (default `"div"`); set to `null` for no wrapper.

## `nodeRef` pattern (React 18+)

`findDOMNode` is deprecated in React 18 strict mode. The recommended pattern passes a ref directly:

```tsx
const nodeRef = useRef(null);
<CSSTransition nodeRef={nodeRef} ...>
  <div ref={nodeRef}>...</div>
</CSSTransition>
```

## `useTransition` hook

Not to be confused with React 18's built-in `useTransition`. react-transition-group does not export a `useTransition` hook — that name belongs to react-spring's API for the same mount/unmount pattern with springs.

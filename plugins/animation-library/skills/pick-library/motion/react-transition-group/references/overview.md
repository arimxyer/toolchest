# react-transition-group — Overview

## Name and history

**react-transition-group** (npm: `react-transition-group`) started as a first-party React addon (`react-addons-transition-group`) maintained by the React team at Facebook. It was extracted and transferred to the React Community org at github.com/reactjs/react-transition-group around 2017–2018 and rewritten as v2 with a more explicit API. v4 (2019) added hooks-based internals and is the final major version.

The library has never had a v5. The last release, **v4.4.5**, shipped on 2022-08-01. The last meaningful commit to the source was December 2022 (a Dependabot security bump to the docs site's dependencies). A March 2026 GitHub push was another Dependabot bot PR — not maintainer activity.

## What it does

react-transition-group is a **state-machine wrapper** for mount/unmount transitions. It does not animate anything itself — it tracks a component's lifecycle through four states (`entering`, `entered`, `exiting`, `exited`) and exposes those states so the consumer can apply CSS classes or inline styles.

The library consists of three components:

### `<Transition>`

The base primitive. Accepts `in` (boolean), `timeout` (ms or `{enter, exit}`), and lifecycle callbacks (`onEnter`, `onEntering`, `onEntered`, `onExit`, `onExiting`, `onExited`). Renders its `children` as a function receiving the current state string.

### `<CSSTransition>`

Extends `<Transition>` to automatically add/remove CSS class suffixes (`-enter`, `-enter-active`, `-enter-done`, `-exit`, `-exit-active`, `-exit-done`) based on the `classNames` prop. This is the component most codebases use — the animation is fully in CSS.

### `<SwitchTransition>`

Wraps a single child and handles the "out-then-in" or "in-then-out" sequencing when the child key changes. Used for page/route transitions where the outgoing element must finish its exit before the incoming element enters.

### `<TransitionGroup>`

Manages a list of `<Transition>` or `<CSSTransition>` children, automatically triggering enter/exit when items are added or removed from the list. Analogous to Motion's `<AnimatePresence>` but without any built-in easing.

## Transitive usage

The library's 51M+ weekly downloads are almost entirely transitive:

- **MUI** (`@mui/material`) depends on `react-transition-group ^4.4.5` for its `Collapse`, `Fade`, `Grow`, `Slide`, `Zoom`, and `Dialog` animation components.
- **Chakra UI** uses it for similar disclosure/overlay animations.
- **Ant Design** uses it for transition utilities.

Most applications that "use" react-transition-group have never imported it directly.

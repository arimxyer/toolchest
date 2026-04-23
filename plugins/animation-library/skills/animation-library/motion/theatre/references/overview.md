# Theatre.js — Overview

Theatre.js is a **motion design editor for the web**: a visual keyframe editor whose output is JSON state that your application loads at runtime. You author animation in a browser-embedded GUI, export the state blob, and `@theatre/core` plays it back with zero editor overhead in production.

## Architecture

Three layers:

| Package | Role | License |
|---|---|---|
| `@theatre/core` | Runtime: keyframe playback, reactive value system | Apache-2.0 |
| `@theatre/studio` | Dev-only visual editor (mounts in the browser) | AGPL-3.0 |
| `@theatre/r3f` | First-party React Three Fiber adapter | Apache-2.0 |

The key design: **state is data**. Authored keyframes live in a JSON object (`project.state`). Ship that JSON in your bundle; pass it to `getProject(id, { state })`. The editor never reaches end-users.

## Core Concepts

- **Project** — top-level container, holds persisted state.
- **Sheet** — a timeline. A project can have multiple sheets (e.g. "Intro", "Hero", "Outro"). Sheets can be instanced (`sheet(name, instanceId)`) for repeated animations.
- **Sheet Object** — a typed prop bag attached to a sheet. Any prop declared here can be keyframed via the Studio UI or read reactively at runtime.
- **Sequence** — the timeline that drives a sheet. You play/pause/scrub it; Theatre interpolates all keyframed props and calls your callbacks.

## How Keyframes Work

Keyframes are authored in the Studio UI (drag, copy, paste). They are stored in the project's state JSON. At runtime `@theatre/core` interpolates between keyframes using built-in easing curves. Programmatic keyframe reading is via `sequence.__experimental_getKeyframes(pointer)` (since 0.6.1, still experimental as of 0.7.2).

## Runtime Integration

Theatre produces **values** — it does not touch the DOM, canvas, or any renderer directly. You react to value changes via `onValuesChange` on a sheet object and apply them yourself. `@theatre/r3f` handles Three.js object binding automatically.

## Audio Sync

`sequence.attachAudio({ source })` synchronizes an `AudioBuffer` or audio URL to the playhead. The sequence drives the audio context clock, enabling frame-accurate audio/animation sync.

## Maintenance Note

Last public npm publish: **2024-05-19** (v0.7.2). Last push to the public repo: **2024-08-14**. The team's README (as of that date) states: "Theatre.js 1.0 is around the corner — development has moved temporarily to a private repo." As of April 2026 (~23 months of public silence), community Discord confirmed development is ongoing, but no public commits, releases, or timeline have been shared. Treat as **actively developed but effectively opaque** for planning purposes.

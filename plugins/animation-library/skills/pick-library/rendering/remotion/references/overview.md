# Remotion — Overview

Remotion is a framework for creating videos in React. Compositions are written as React components; a Node.js + headless Chromium pipeline renders them frame-by-frame into MP4, WebM, GIF, or still images. It is not a browser animation library — there is no runtime shipped to end users' browsers (unless you opt into `@remotion/player` for in-browser preview).

## Architecture

```
React components (compositions)
        │
        ▼
  @remotion/bundler  ──▶  Webpack bundle (serve URL)
        │
        ▼
  @remotion/renderer ──▶  headless Chromium (per-frame screenshots)
        │
        ▼
  ffmpeg  ──▶  encoded MP4 / WebM / GIF
```

The renderer opens a headless Chromium instance, navigates to the bundled composition, advances the `frame` prop from 0 to `durationInFrames - 1`, captures each frame, and pipes the PNG frames through ffmpeg to produce the final video.

## Core concepts

- **Composition** — a React component registered via `<Composition>`. Defines `id`, `width`, `height`, `fps`, and `durationInFrames`.
- **`useCurrentFrame()`** — returns the current frame integer (0-indexed). All animation is driven by this value.
- **`interpolate(frame, [in, out], [from, to], options?)`** — maps a frame range to an output value range with optional easing.
- **`spring({ frame, fps, config? })`** — physics-based spring value (0→1 over time).
- **`<Sequence>`** — time-shifts children; children see a re-based frame offset.
- **`<Audio>`, `<Video>`, `<OffthreadVideo>`, `<Img>`** — media primitives that load assets and synchronize with the frame clock.
- **`staticFile(path)`** — resolves a file from the `public/` directory in the Remotion project.

## Packages

| Package | Purpose |
|---|---|
| `remotion` | Core: hooks, interpolation, spring, composition primitives |
| `@remotion/cli` | `npx remotion` CLI (preview studio, render, upgrade) |
| `@remotion/renderer` | Node.js rendering API: `bundle`, `renderMedia`, `renderStill` |
| `@remotion/player` | React component for embedding a browser-side preview/player |
| `@remotion/lambda` | Serverless distributed rendering on AWS Lambda |
| `@remotion/vercel` | Serverless rendering on Vercel Edge Functions |
| `@remotion/licensing` | Registers Company License key with render telemetry (mandatory in v5) |
| `@remotion/media-utils` | Audio waveform analysis helpers |
| `@remotion/gif` | GIF output support |
| `@remotion/fonts` | Google Fonts loader for compositions |

## Rendering codecs

`h264` (default), `h265`, `vp8`, `vp9`, `gif`, `prores`, `mp3`, `aac`, `wav`

## Preview Studio

`npx remotion studio` launches a local dev server at `localhost:3000` with a frame scrubber, timeline view, and hot reload. Rendering to file is also possible from the studio UI.

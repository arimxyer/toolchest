# Remotion — API Reference

All claims sourced from https://www.remotion.dev/docs (retrieved 2026-04-22).

## Composition registration (browser/React side)

```tsx
import { Composition } from "remotion";

// Inside the root component passed to registerRoot():
<Composition
  id="MyVideo"
  component={MyVideoComponent}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ title: "Hello" }}
/>
```

## Key hooks

| Hook | Returns | Notes |
|---|---|---|
| `useCurrentFrame()` | `number` | Current frame (0-indexed). Drive all animation from this. |
| `useVideoConfig()` | `{ width, height, fps, durationInFrames, id, defaultProps }` | Composition metadata. |

## Animation utilities

```ts
import { interpolate, spring } from "remotion";

// Linear (with optional easing)
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

// Physics spring (0 → 1)
const scale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });
```

## Sequence / timing

```tsx
import { Sequence } from "remotion";

// Children see frame 0 at absolute frame 30; hidden outside [30, 60)
<Sequence from={30} durationInFrames={30}>
  <Title />
</Sequence>
```

## Server-side rendering (`@remotion/renderer`)

```ts
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia, renderStill } from "@remotion/renderer";

// 1. Bundle the project
const serveUrl = await bundle({ entryPoint: "./src/index.ts" });

// 2. List compositions
const compositions = await getCompositions(serveUrl);

// 3. Render to file
await renderMedia({
  composition: compositions[0],
  serveUrl,
  codec: "h264",
  outputLocation: "out/video.mp4",
  inputProps: { title: "My Video" },
  concurrency: 4,          // parallel Chromium instances
  frameRange: [0, 149],    // optional subset
});

// 4. Render a single still
await renderStill({
  composition: compositions[0],
  serveUrl,
  output: "out/thumbnail.png",
  frame: 30,
});
```

## AWS Lambda (`@remotion/lambda`)

```ts
import { renderMediaOnLambda, getRenderProgress } from "@remotion/lambda/client";

const { renderId, bucketName } = await renderMediaOnLambda({
  region: "us-east-1",
  functionName: "remotion-render",
  serveUrl,
  composition: "MyVideo",
  codec: "h264",
  inputProps: { title: "My Video" },
});

// Poll progress
const progress = await getRenderProgress({ renderId, bucketName, region: "us-east-1", functionName: "remotion-render" });
```

Up to 200 Lambda invocations render frames in parallel; results are stitched by ffmpeg on a final invocation.

## In-browser player (`@remotion/player`)

```tsx
import { Player } from "@remotion/player";
import { MyVideo } from "./MyVideo";

<Player
  component={MyVideo}
  inputProps={{ title: "Live Preview" }}
  durationInFrames={150}
  fps={30}
  compositionWidth={1920}
  compositionHeight={1080}
  style={{ width: "100%" }}
  controls
  loop
/>
```

No headless Chrome is involved — renders purely in the browser DOM/canvas.

## Licensing key (v4.0.237+, mandatory in v5)

```ts
import { renderMedia } from "@remotion/renderer";
import { getLicenseKeyFromEnvironment } from "@remotion/licensing";

await renderMedia({
  // ...
  licenseKey: getLicenseKeyFromEnvironment(), // reads REMOTION_LICENSE_KEY env var
});
```

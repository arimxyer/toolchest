# Remotion — Differentiators

Remotion is the **only video-file renderer** in the dossier. Every other sibling library targets browser runtime animation. That distinction is the primary differentiator.

## Remotion vs. browser animation siblings

| Library | Output | Runtime | Use case |
|---|---|---|---|
| **Remotion** | MP4 / WebM / GIF files | Node.js + headless Chromium | Programmatic video generation; no browser delivery |
| motion (Framer Motion) | DOM mutations | Browser JS | Interactive UI transitions, layout animation |
| gsap | DOM / SVG / canvas mutations | Browser JS | Complex sequenced UI animation, scroll-driven effects |
| anime (v4) | DOM / SVG / JS objects | Browser JS | Lightweight keyframe animation |
| react-spring | React state → style props | Browser JS | Physics-based interactive UI animation |
| waapi (Web Animations API) | DOM animations via browser engine | Browser (native) | Performant CSS-class-equivalent animation without JS overhead |
| view-transitions-api | Page/element transition snapshots | Browser (native) | Cross-page or cross-state transition morphing |

## Remotion vs. declarative asset formats

| Library | Output | Runtime |
|---|---|---|
| **Remotion** | Rendered video files (arbitrary React logic) | Node.js render pipeline |
| lottie | JSON animation played back in-browser or as video | Browser runtime (lottie-web) or After Effects export |
| rive | Binary `.riv` state-machine animations | Browser WASM runtime |

Lottie and Rive ship a binary/JSON asset plus a browser runtime. Remotion has no browser runtime — it produces finished video files. Conversely, Remotion can _consume_ Lottie animations (`@remotion/lottie`) and Rive files as composition layers and bake them into a rendered MP4.

## Remotion vs. Theatre.js

Theatre.js is the closest sibling in spirit — both address frame-based timeline sequencing. The distinction:
- **Theatre.js** animates DOM/Three.js objects _in the browser_ with a WYSIWYG GUI editor; output is a live interactive experience.
- **Remotion** uses a similar frame-clock mental model but renders to a static video file via headless Chromium; there is no interactive output.

## Remotion vs. react-three-fiber / drei

react-three-fiber (R3F) animates Three.js scenes in the browser. Remotion and R3F are complementary: `@remotion/three` wraps R3F inside a Remotion composition so you can render a Three.js animation to an MP4 file.

## Unique capabilities

- **Data-driven video at scale** — pass `inputProps` per render to generate thousands of personalized clips from a template.
- **Cloud scaling** — `@remotion/lambda` distributes frame rendering across up to 200 Lambda invocations, reducing wall-clock time proportionally.
- **Asset synchronization** — audio, video, and image assets are clock-synchronized at the frame level, not via browser media events.
- **SSR / headless pipeline** — can be driven entirely from a Node.js script or serverless function; no browser install required on the client.

# Konva — Drawbacks

## Canvas 2D performance ceiling

Konva renders via the Canvas 2D API — not WebGL. Every draw call goes through the browser's 2D rasterizer on the CPU path. Practical consequence: performance degrades noticeably when the scene contains hundreds of simultaneously animated shapes. Benchmarks from the Konva demo suite show smooth operation up to a few hundred moving objects; beyond that, frame rate drops are visible on mid-tier hardware.

For particle systems, sprite-heavy games, or scenes with >1K animated objects, PixiJS (WebGL) is the correct tool.

## No shader / GPU effects

Canvas 2D filters (blur, grayscale, etc.) run on the CPU and require the shape to be cached first. There is no path to custom GLSL shaders, GPU compositing, or WebGL post-processing. If the design calls for real-time glow, bloom, or motion blur, Konva cannot deliver it without a separate WebGL layer.

## Hit graph overhead

The dual-canvas architecture (scene + hit canvas) doubles memory for canvas buffers. On stages with many layers or very large dimensions, this adds up. Workaround: reduce layer count; merge static content into one layer.

## No native SVG import

Konva can render SVG paths (`Konva.Path` accepts a `d` attribute string) but cannot import a full SVG document and produce an editable node tree from it. Fabric.js handles that use case.

## No inline text editing

Text nodes are read-only render objects. To enable in-canvas text editing, the common pattern is to overlay a DOM `<textarea>` on top of the canvas when a text node is double-clicked, then write the value back. This is workable but is boilerplate the developer must write. Fabric.js has this built in.

## Bundle size relative to simpler alternatives

At ~54 KB gzip, Konva is heavier than rolling a minimal raw-canvas implementation for simple use cases. If the only need is a single draggable image or a basic drawing tool, the Konva overhead may not be justified.

## Accessibility

Canvas content is not accessible to screen readers. Konva provides no built-in ARIA or accessibility layer; any accessible alternative must be constructed manually in the DOM alongside the canvas.

## React Native not supported

`react-konva` explicitly does not support React Native. For React Native canvas needs, consider `react-native-canvas` or `react-native-svg`.

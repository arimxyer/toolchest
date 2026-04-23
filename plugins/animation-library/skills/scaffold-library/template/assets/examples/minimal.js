// Minimal runnable example for {{Library Display Name}}.
//
// Goal: the smallest self-contained script that demonstrates the library's
// core mental model. Not a tutorial, not a feature tour — just enough that a
// reader can paste it into a fresh project and see the library doing its job.
//
// Conventions:
//   - ESM syntax; assume a bundler or browser ESM.
//   - Single file. If setup requires HTML, include it in a top-comment block.
//   - No dev-only scaffolding (no test runner, no hot reload).
//   - If the library is TypeScript-first, rename to minimal.ts and keep
//     everything else the same.
//   - If the library is not code-driven (e.g. a runtime for pre-authored
//     assets), show the consumer-side playback code and reference the
//     authoring tool separately.

import { /* {{imports}} */ } from '{{package-name}}';

// {{Set up the target — a DOM element, a canvas, a React component, etc.}}

// {{Invoke the core primitive — the one thing a reader should remember.}}

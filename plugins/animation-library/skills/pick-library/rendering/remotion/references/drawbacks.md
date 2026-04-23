# Remotion — Drawbacks

## Licensing friction

The Remotion License is **not OSS-permissive**. The free tier covers individuals and companies with ≤ 3 employees. Any for-profit team of 4+ must buy a Company License:

| Tier | Price | Who needs it |
|---|---|---|
| Free | $0 | Individuals + companies ≤ 3 people |
| Creators | $25/seat/month (min 3 seats = $75/mo) | Teams 4+, low-volume internal use |
| Automators | $0.01/render, $100/month minimum | Teams 4+, building video tools for end users |
| Enterprise | $500/month minimum | Large orgs; adds private Slack, consulting, custom terms |

Restrictions under the free license: cannot resell, sublicense, or build a competing product based on Remotion's code.

Starting in Remotion 5.0, Company License users must instrument renders with `@remotion/licensing` and a `licenseKey` env var. This is a compliance requirement, not optional.

## Operational complexity

- Rendering requires a Chromium binary on the host machine. Docker images bloat significantly (~300–500 MB added for Chromium).
- AWS Lambda deployment (`@remotion/lambda`) requires pre-deploying a Remotion Lambda function, configuring IAM roles, and managing S3 buckets — non-trivial infra setup.
- Cold-start latency on Lambda is significant; unsuitable for real-time or < 2 s rendering SLAs.
- Local render of a 30-second 1080p composition can take minutes on a single machine.

## Not for interactive UIs

Remotion produces video files. It cannot be used to drive browser animations, transitions, or interactive states. Choosing it for an in-browser animation is a category mismatch — use Motion, GSAP, WAAPI, or react-spring instead.

## React-only

All compositions must be React components. No Vue, Svelte, or vanilla JS. The rendering pipeline is tightly coupled to React's reconciler.

## Webpack lock-in

`@remotion/bundler` uses Webpack (not Vite, Rollup, or esbuild). Custom Webpack config overrides are supported but the bundler is not swappable. This can conflict with projects already deeply configured around other bundlers.

## No standard OSS governance

Remotion is a commercial product maintained by a single company (Remotion GmbH). There is no OSS governance model, no foundation, and no guarantee of license terms remaining stable. The Remotion 5.0 licensing tightening (mandatory telemetry) is an example of this risk.

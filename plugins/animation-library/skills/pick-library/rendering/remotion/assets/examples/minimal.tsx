// Minimal Remotion composition — 5-second title card (150 frames @ 30 fps).
// Run: npx remotion render src/index.ts TitleCard out/title.mp4
import { Composition, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

function TitleCard({ title }: { title: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
      width: "100%", height: "100%", background: "#0f172a", opacity }}>
      <h1 style={{ color: "#f8fafc", fontFamily: "sans-serif", fontSize: 72,
        transform: `scale(${scale})` }}>
        {title}
      </h1>
    </div>
  );
}

export function RemotionRoot() {
  return (
    <Composition
      id="TitleCard"
      component={TitleCard}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ title: "Hello, Remotion" }}
    />
  );
}

import { useDrag } from "@use-gesture/react";
import { useState } from "react";

/**
 * Minimal useDrag example — no animation library required.
 * Drag the box; it follows the pointer via a CSS transform.
 * On release the box stays where you dropped it (offset persists).
 */
export function DraggableBox() {
  const [pos, setPos] = useState<[number, number]>([0, 0]);

  const bind = useDrag(
    ({ offset: [ox, oy] }) => {
      setPos([ox, oy]);
    },
    {
      // Prevent page scroll while dragging on touch devices
      preventScroll: true,
    }
  );

  return (
    <div
      {...bind()}
      style={{
        width: 100,
        height: 100,
        background: "#6366f1",
        borderRadius: 8,
        cursor: "grab",
        touchAction: "none", // required for pointer-events on touch
        transform: `translate(${pos[0]}px, ${pos[1]}px)`,
        userSelect: "none",
      }}
    />
  );
}

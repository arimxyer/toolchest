import { useCallback, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import type Konva from "konva";

interface BoxState {
  x: number;
  y: number;
}

export default function MinimalCanvas() {
  const [box, setBox] = useState<BoxState>({ x: 60, y: 60 });

  const handleDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    setBox({
      x: e.target.x(),
      y: e.target.y(),
    });
  }, []);

  return (
    <Stage width={400} height={300}>
      <Layer>
        {/* Static background */}
        <Rect
          x={0} y={0}
          width={400} height={300}
          fill="#f0f4f8"
          listening={false}
        />

        {/* Draggable rect */}
        <Rect
          x={box.x} y={box.y}
          width={100} height={60}
          fill="steelblue"
          cornerRadius={6}
          shadowBlur={8}
          shadowColor="rgba(0,0,0,0.25)"
          draggable
          onDragEnd={handleDragEnd}
        />

        {/* Label showing current position */}
        <Text
          x={8} y={8}
          text={`x: ${Math.round(box.x)}  y: ${Math.round(box.y)}`}
          fontSize={13}
          fill="#555"
          listening={false}
        />
      </Layer>
    </Stage>
  );
}

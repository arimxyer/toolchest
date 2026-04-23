import { useCallback, useState } from 'react';
import { Sprite, Container } from 'pixi.js';
import { Application, extend, useTick } from '@pixi/react';

// Register only the PixiJS classes you use — keeps bundle lean.
extend({ Sprite, Container });

function RotatingSprite() {
  const [rotation, setRotation] = useState(0);

  // Memoise to avoid re-registering the ticker callback on every render.
  const onTick = useCallback(() => {
    setRotation((r) => r + 0.05);
  }, []);

  useTick(onTick);

  return (
    <pixiSprite
      texture="https://pixijs.com/assets/bunny.png"
      anchor={{ x: 0.5, y: 0.5 }}
      x={200}
      y={200}
      rotation={rotation}
    />
  );
}

export default function PixiScene() {
  return (
    // <Application> initialises PIXI.Application and provides it via context.
    // resizeTo accepts a ref or an HTMLElement.
    <Application width={400} height={400} background="#1a1a2e">
      <pixiContainer>
        <RotatingSprite />
      </pixiContainer>
    </Application>
  );
}

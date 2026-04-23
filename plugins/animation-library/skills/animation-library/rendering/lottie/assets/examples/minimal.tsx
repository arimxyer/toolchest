// Minimal Lottie example using @lottiefiles/dotlottie-react (official wrapper).
// Install: npm install @lottiefiles/dotlottie-react
// Drop your .lottie (or .json) file into /public and update the src prop.

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-web';
import { useRef } from 'react';

export function HeroAnimation() {
  const playerRef = useRef<DotLottie | null>(null);

  return (
    <DotLottieReact
      src="/animations/hero.lottie"
      loop
      autoplay
      style={{ width: 320, height: 320 }}
      dotLottieRefCallback={(instance) => {
        playerRef.current = instance;
      }}
      onMouseEnter={() => playerRef.current?.setSpeed(2)}
      onMouseLeave={() => playerRef.current?.setSpeed(1)}
    />
  );
}

// lottie-web alternative (no framework wrapper needed):
//
// import lottie from 'lottie-web';
// import { useEffect, useRef } from 'react';
//
// export function HeroAnimationLegacy() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const anim = lottie.loadAnimation({
//       container: containerRef.current,
//       renderer: 'svg',
//       loop: true,
//       autoplay: true,
//       path: '/animations/hero.json',
//     });
//     return () => anim.destroy();
//   }, []);
//   return <div ref={containerRef} style={{ width: 320, height: 320 }} />;
// }

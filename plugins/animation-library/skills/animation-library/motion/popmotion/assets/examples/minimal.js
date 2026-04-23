// popmotion v11 — minimal vanilla JS example (frozen; use motion for new projects)
// popmotion has no DOM bindings — rendering is your responsibility.
// npm install popmotion@11.0.5

import { animate } from "popmotion";

const box = document.getElementById("box");

// Keyframe animation: slide right over 600ms then spring back
animate({
  from: 0,
  to: 300,
  duration: 600,
  ease: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
  onUpdate: (x) => {
    box.style.transform = `translateX(${x}px)`;
  },
  onComplete: () => {
    // Spring back to origin
    animate({
      from: 300,
      to: 0,
      type: "spring",
      stiffness: 180,
      damping: 12,
      mass: 1,
      onUpdate: (x) => {
        box.style.transform = `translateX(${x}px)`;
      },
      onComplete: () => console.log("done"),
    });
  },
});

// To stop early: const { stop } = animate({...}); stop();

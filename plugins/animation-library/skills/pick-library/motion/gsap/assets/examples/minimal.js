// GSAP minimal example — scroll-driven text reveal with ScrollTrigger
// npm install gsap  OR use ESM CDN below

import { gsap } from "https://esm.sh/gsap@3.15.0";
import { ScrollTrigger } from "https://esm.sh/gsap@3.15.0/ScrollTrigger";
import { SplitText } from "https://esm.sh/gsap@3.15.0/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Per-character reveal when headline enters viewport
const split = SplitText.create(".headline", { type: "chars" });
gsap.from(split.chars, {
  y: 60,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.03,
  scrollTrigger: { trigger: ".headline", start: "top 85%" },
});

// Sequenced timeline: slide in → fade → scale
const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.inOut" } });
tl.from(".box", { x: -100, opacity: 0 })
  .to(".box", { opacity: 0.5 }, "+=0.2")
  .to(".box", { scale: 1.5, ease: "back.out(1.7)" }, "<");

// Scrub: element moves right proportional to scroll progress
gsap.to(".track", {
  x: "60vw",
  ease: "none",
  scrollTrigger: {
    trigger: ".track",
    start: "top center",
    end: "bottom top",
    scrub: 1,
  },
});

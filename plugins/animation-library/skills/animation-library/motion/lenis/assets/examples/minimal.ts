// Lenis v1.3.23 + GSAP ScrollTrigger — community-standard integration
// Install: npm i lenis gsap

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// autoRaf: false — GSAP ticker drives the RAF loop
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

// Wire Lenis into ScrollTrigger so it reads interpolated scroll position
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time: number) => lenis.raf(time * 1000)); // GSAP uses seconds; Lenis expects ms
gsap.ticker.lagSmoothing(0);

// Scroll-scrubbed parallax via ScrollTrigger
gsap.to(".hero", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Programmatic smooth scroll with custom easing
document.querySelector<HTMLButtonElement>("#cta")?.addEventListener("click", () => {
  lenis.scrollTo("#section-2", {
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });
});

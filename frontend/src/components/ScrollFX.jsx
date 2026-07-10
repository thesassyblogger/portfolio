import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global GSAP parallax: any element with data-speed drifts as you scroll (like gsap.com).
export default function ScrollFX({ ready, reducedMotion = false }) {
  useEffect(() => {
    if (!ready || reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed")) || 1;
        const dist = (speed - 1) * 240; // >1 moves up faster, <1 lags behind
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -dist,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [ready, reducedMotion]);

  return null;
}

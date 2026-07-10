import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { label: "Idea", detail: "Shape the product signal", x: 92, y: 298, color: "#BF5537" },
  { label: "Interface", detail: "Design the flow people feel", x: 306, y: 150, color: "#C9922E" },
  { label: "API", detail: "Connect data with clean contracts", x: 526, y: 260, color: "#35594E" },
  { label: "Cloud", detail: "Ship resilient infrastructure", x: 750, y: 330, color: "#4A5A7A" },
  { label: "Observe", detail: "Measure, secure, improve", x: 1000, y: 170, color: "#BF5537" },
];

export default function ScrollMotion({ reducedMotion = false }) {
  const pin = useRef(null);
  const pathRef = useRef(null);
  const ghostRef = useRef(null);
  const nodesRef = useRef([]);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const ghost = ghostRef.current;
      if (!path || !ghost) return;

      const length = path.getTotalLength();
      gsap.set([path, ghost], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.set(nodesRef.current, { scale: 0.5, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(cardsRef.current, { y: 34, opacity: 0 });
      gsap.set(titleRef.current, { y: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: "+=1600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(ghost, { strokeDashoffset: 0, ease: "none" }, 0.08)
        .to(path, { strokeDashoffset: 0, ease: "none" }, 0.14)
        .to(nodesRef.current, { scale: 1, opacity: 1, stagger: 0.08, ease: "back.out(1.8)" }, 0.2)
        .to(cardsRef.current, { y: 0, opacity: 1, stagger: 0.08, ease: "power3.out" }, 0.28)
        .to(titleRef.current, { y: -28, opacity: 0, ease: "power2.in" }, 0.86)
        .to(cardsRef.current, { y: -18, opacity: 0, stagger: 0.035, ease: "power2.in" }, 0.88);
    }, pin);

    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section id="motion" data-testid="motion-section" className="relative">
      <div ref={pin} className="relative h-screen overflow-hidden flex items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1B1A16 1px, transparent 1px), linear-gradient(to bottom, #1B1A16 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div ref={titleRef} className="absolute left-6 right-6 top-24 z-10 mx-auto max-w-4xl text-center lg:top-20">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-4">(✦) — Build System</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-7xl leading-[1.02] text-[#1B1A16]">
            Scroll through the way I <span className="italic text-[#BF5537]">turn ideas into systems</span>.
          </h2>
        </div>

        <div className="relative z-[2] w-full max-w-6xl px-6 pt-28 lg:pt-20">
          <svg viewBox="0 0 1100 430" className="h-[44vh] min-h-[280px] w-full overflow-visible">
            <defs>
              <filter id="motionGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={ghostRef}
              d="M92 298 C190 90 318 70 438 210 C560 356 690 398 750 330 C842 226 886 68 1000 170"
              fill="none"
              stroke="#E7C9BC"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              ref={pathRef}
              d="M92 298 C190 90 318 70 438 210 C560 356 690 398 750 330 C842 226 886 68 1000 170"
              fill="none"
              stroke="#BF5537"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#motionGlow)"
            />

            {STEPS.map((step, i) => (
              <g
                key={step.label}
                ref={(el) => {
                  nodesRef.current[i] = el;
                }}
                transform={`translate(${step.x} ${step.y})`}
              >
                <circle r="28" fill="#F7F4ED" stroke={step.color} strokeWidth="2" />
                <circle r="8" fill={step.color} />
                <circle r="46" fill="none" stroke={step.color} strokeOpacity="0.18" />
              </g>
            ))}
          </svg>

          <div className="relative z-10 -mt-6 grid grid-cols-1 gap-3 sm:grid-cols-5">
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="border border-[rgba(27,26,22,0.12)] bg-[#F7F4ED]/78 p-4 backdrop-blur"
              >
                <p className="font-serif-display text-2xl text-[#1B1A16]">{step.label}</p>
                <p className="mt-2 font-mono-accent text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#6E685B]">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-8 left-8 hidden font-serif-display text-[10rem] leading-none text-[#1B1A16]/[0.035] lg:block">
          FLOW
        </span>
      </div>
    </section>
  );
}

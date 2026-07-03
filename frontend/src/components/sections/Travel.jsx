import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TRAVEL } from "../../data/portfolio";

function Card({ item, index, progress, span }) {
  // subtle counter-parallax on the image so cards feel 3D
  const [from, to] = span;
  const imgX = useTransform(progress, [from, to], ["-12%", "8%"]);
  return (
    <div
      data-testid={`travel-card-${index}`}
      data-cursor="hover"
      className="relative shrink-0 w-[78vw] sm:w-[56vw] lg:w-[34vw] h-[62vh] lg:h-[68vh] overflow-hidden bg-[#F7F4ED] border border-[rgba(27,26,22,0.12)] group"
    >
      <motion.img
        src={item.img}
        alt={item.place}
        style={{ x: imgX }}
        className="absolute inset-0 w-[125%] h-full object-cover -left-[12%] transition-transform duration-700 group-hover:scale-[1.06] will-change-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1A16]/70 via-[#1B1A16]/10 to-transparent" />

      <span className="absolute top-5 left-5 font-mono-accent text-[10px] tracking-[0.3em] uppercase text-[#EFEBE3]/90">
        {item.tag}
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <h3 className="font-serif-display text-5xl lg:text-6xl leading-none text-[#F7F4ED]">
          {item.place}
        </h3>
        <p className="mt-1 font-serif-display italic text-xl text-[#E5A27F]">{item.country}</p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#EFEBE3]/80">{item.note}</p>
      </div>
    </div>
  );
}

export default function Travel() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48));
      }
    };
    calc();
    window.addEventListener("resize", calc);
    const t = setTimeout(calc, 400); // after images/layout settle
    return () => {
      window.removeEventListener("resize", calc);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const n = TRAVEL.length;

  return (
    <section
      id="travel"
      data-testid="travel-section"
      ref={targetRef}
      className="relative"
      style={{ height: `${dist + window.innerHeight}px` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* header pinned inside sticky */}
        <div className="absolute top-20 lg:top-24 left-6 lg:left-12 z-10 max-w-md pointer-events-none">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-3">(05) — Travel</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-[#1B1A16]">
            Places that <span className="italic text-[#BF5537]">made</span> me.
          </h2>
          <p className="mt-3 font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B]">Scroll to wander →</p>
        </div>

        <span className="pointer-events-none select-none absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block font-serif-display text-[13rem] leading-none text-[#1B1A16]/[0.04]">
          ATLAS
        </span>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 lg:gap-8 pl-6 lg:pl-12 pr-12 mt-24 will-change-transform">
          {TRAVEL.map((item, i) => (
            <Card key={item.place} item={item} index={i} progress={scrollYProgress} span={[i / n, (i + 1) / n]} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

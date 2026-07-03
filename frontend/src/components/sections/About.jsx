import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PROFILE, CERTS } from "../../data/portfolio";

const headline = "From Mumbai's buzz to Regina's calm — I turn ideas into resilient, beautiful software.";
const INTERESTS = ["FASHION", "TRAVEL", "SPACE", "DESIGN", "CLOUD", "COFFEE"];

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf; const start = performance.now(); const dur = 1200;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function About() {
  const words = headline.split(" ");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const markRot = useTransform(scrollYProgress, [0, 1], [90, 96]);
  const sealRot = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section id="about" data-testid="about-section" ref={ref} className="relative py-28 lg:py-40 overflow-hidden">
      {/* giant rotated watermark w/ parallax */}
      <motion.span style={{ y: markY, rotate: markRot }} className="pointer-events-none select-none absolute -left-6 top-1/2 hidden lg:block font-serif-display text-[13rem] leading-none text-[#1B1A16]/[0.04] origin-center">ABOUT</motion.span>

      {/* slow-spinning editorial seal */}
      <motion.div style={{ rotate: sealRot }} className="pointer-events-none absolute left-[8%] top-[22%] hidden lg:block">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <defs>
            <path id="sealpath" d="M75,75 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
          </defs>
          <text className="font-mono-accent" fill="#BF5537" fillOpacity="0.55" fontSize="9" letterSpacing="4">
            <textPath href="#sealpath">MUMBAI '04 · REGINA NOW · FULL-STACK · CLOUD · </textPath>
          </text>
          <circle cx="75" cy="75" r="4" fill="#BF5537" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:ml-[38%] max-w-2xl">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">
            (01) — About
          </motion.p>

          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[#1B1A16] flex flex-wrap gap-x-3">
            {words.map((w, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }} className={/Regina|Mumbai/.test(w) ? "italic text-[#BF5537]" : ""}>
                {w}
              </motion.span>
            ))}
          </h2>

          {/* animated underline draw */}
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mt-6 h-px w-40 bg-[#BF5537] origin-left" />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 space-y-5 text-[#4a463d] leading-relaxed">
            <p>I'm a Full Stack Cloud Engineer who lives at the intersection of solid infrastructure and considered design. {PROFILE.summary}</p>
            <p>Off the keyboard, I love styling myself and chasing new places — an eye for detail that flows straight back into the way I build products.</p>
          </motion.div>

          {/* animated count-up stats with hover accent */}
          <div className="mt-10 grid grid-cols-3 gap-6 border-y border-[rgba(27,26,22,0.14)] py-6">
            {[
              { v: 15, s: "+", k: "Projects shipped" },
              { v: 5, s: "+", k: "Certifications" },
              { v: 2, s: "", k: "Countries lived" },
            ].map((st, i) => (
              <motion.div key={st.k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.1 }} whileHover={{ y: -4 }} data-cursor="hover" className="group">
                <p className="font-serif-display text-4xl sm:text-5xl text-[#1B1A16] group-hover:text-[#BF5537] transition-colors"><CountUp to={st.v} suffix={st.s} /></p>
                <p className="font-mono-accent text-[10px] tracking-[0.15em] uppercase text-[#6E685B] mt-1">{st.k}</p>
                <span className="block mt-2 h-px w-0 group-hover:w-full bg-[#BF5537] transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* interests marquee */}
          <div className="mt-8 overflow-hidden">
            <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B] mb-3">Beyond code</p>
            <div className="flex whitespace-nowrap animate-marquee">
              {[...INTERESTS, ...INTERESTS].map((it, i) => (
                <span key={i} className="font-serif-display italic text-2xl text-[#1B1A16] mx-4">{it} <span className="text-[#BF5537] not-italic">•</span></span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B] mb-4">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <motion.span key={c} whileHover={{ y: -3, borderColor: "#BF5537" }} className="font-mono-accent text-[11px] text-[#4a463d] border border-[rgba(27,26,22,0.16)] px-3 py-1.5 rounded-full bg-[#F7F4ED]">{c}</motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

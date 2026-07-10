import React from "react";
import { motion } from "framer-motion";
import { PROFILE } from "../../data/portfolio";

const reveal = {
  hidden: { y: "110%" },
  show: (i) => ({ y: "0%", transition: { duration: 1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero({ ready = true, reducedMotion = false }) {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const titleReveal = reducedMotion
    ? {
        hidden: { y: 0, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.2 } },
      }
    : reveal;

  return (
    <section id="home" data-testid="hero-section" className="relative min-h-screen">
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[12] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          aria-hidden
        >
          <motion.div
            className="absolute left-1/2 top-[18%] h-[66%] w-px origin-top"
            style={{ background: "linear-gradient(180deg, transparent, rgba(191,85,55,0.78), transparent)" }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={ready ? { scaleY: [0, 1, 0.18], opacity: [0, 1, 0.18] } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 1.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
          {[38, 52, 66].map((size, i) => (
            <motion.div
              key={size}
              className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#BF5537]/20"
              style={{ width: `${size}vw`, maxWidth: size * 12 }}
              initial={{ scale: 0.76, opacity: 0 }}
              animate={ready ? { scale: 1, opacity: [0, 0.35, 0.08] } : { scale: 0.76, opacity: 0 }}
              transition={{ duration: 1.3, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </motion.div>
      )}

      {/* top meta row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0 : 0.35 }}
        className="absolute top-24 left-0 right-0 z-30 px-6 lg:px-12 flex items-start justify-between"
      >
        <div>
          <p className="font-serif-display text-2xl text-[#1B1A16]">Mansi Patel<span className="text-[#BF5537]">*</span></p>
          <p className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#6E685B] mt-1">{PROFILE.title}</p>
        </div>
        <p className="hidden sm:block font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#6E685B] text-right">
          Mumbai <span className="text-[#BF5537]">→</span> Regina<br />Available for work
        </p>
      </motion.div>

      {/* giant name behind centered avatar */}
      <div className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none px-6">
        <div className="overflow-hidden">
          <motion.h1 variants={titleReveal} custom={0} initial="hidden" animate={ready ? "show" : "hidden"} className="font-serif-display font-light leading-[0.8] text-[#1B1A16] text-[24vw] sm:text-[18vw] lg:text-[15rem]">
            MANSI
          </motion.h1>
        </div>
        <div className="overflow-hidden -mt-2 lg:-mt-8">
          <motion.h1 variants={titleReveal} custom={1} initial="hidden" animate={ready ? "show" : "hidden"} className="font-serif-display italic font-light leading-[0.8] text-[#BF5537] text-[24vw] sm:text-[18vw] lg:text-[15rem]">
            PATEL
          </motion.h1>
        </div>
      </div>

      {/* left paragraph + CTAs (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0 : 0.9 }}
        className="hidden lg:block absolute bottom-24 left-12 z-30 max-w-[16rem]"
      >
        <div className="w-10 h-px bg-[#1B1A16] mb-5" />
        <p className="text-[#3a3730] text-sm leading-relaxed">{PROFILE.summary}</p>
        <div className="flex flex-col gap-3 mt-6">
          <button onClick={() => go("projects")} data-testid="hero-view-work-button-desktop" className="font-mono-accent text-xs tracking-[0.15em] uppercase bg-[#1B1A16] text-[#EFEBE3] px-6 py-3 hover:bg-[#BF5537] transition-colors text-center">View Work</button>
          <button onClick={() => go("contact")} data-testid="hero-contact-button-desktop" className="font-mono-accent text-xs tracking-[0.15em] uppercase border border-[rgba(27,26,22,0.35)] px-6 py-3 hover:bg-[#1B1A16] hover:text-[#EFEBE3] transition-colors text-center">Get in Touch</button>
        </div>
      </motion.div>

      {/* right keyword list (desktop) */}
      <motion.div
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{ show: { transition: { staggerChildren: reducedMotion ? 0 : 0.1, delayChildren: reducedMotion ? 0 : 1 } } }}
        className="hidden lg:flex absolute bottom-24 right-12 z-30 flex-col items-end gap-1"
      >
        <span className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#6E685B] mb-2">Focus</span>
        {PROFILE.keywords.map((k) => (
          <motion.span key={k} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }} className="font-serif-display text-2xl text-[#1B1A16]">
            {k}
          </motion.span>
        ))}
      </motion.div>

      {/* mobile stacked content */}
      <div className="lg:hidden absolute bottom-16 left-0 right-0 z-30 px-6 flex flex-col items-center text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0 : 0.9 }} className="text-[#3a3730] text-sm leading-relaxed mb-6 max-w-sm">
          {PROFILE.summary}
        </motion.p>
        <div className="flex gap-3">
          <button onClick={() => go("projects")} data-testid="hero-view-work-button" className="font-mono-accent text-xs tracking-[0.15em] uppercase bg-[#1B1A16] text-[#EFEBE3] px-6 py-3">View Work</button>
          <button onClick={() => go("contact")} data-testid="hero-contact-button" className="font-mono-accent text-xs tracking-[0.15em] uppercase border border-[rgba(27,26,22,0.3)] px-6 py-3">Contact</button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: reducedMotion ? 0 : 1.45 }} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
        <span className="font-mono-accent text-[9px] tracking-[0.3em] uppercase text-[#6E685B]">Scroll to explore</span>
      </motion.div>
    </section>
  );
}

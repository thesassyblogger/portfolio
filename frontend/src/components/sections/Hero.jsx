import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Buttons = () => (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => go("projects")}
        data-testid="hero-view-work-button"
        className="font-mono-accent text-xs tracking-[0.15em] uppercase bg-white text-black px-7 py-3 hover:bg-[#818cf8] transition-colors"
      >
        View Work
      </button>
      <button
        onClick={() => go("contact")}
        data-testid="hero-contact-button"
        className="font-mono-accent text-xs tracking-[0.15em] uppercase border border-white/25 text-white px-7 py-3 hover:bg-white hover:text-black transition-colors"
      >
        Get in Touch
      </button>
    </div>
  );

  return (
    <section id="home" data-testid="hero-section" className="relative min-h-screen">
      {/* Overline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-24 left-0 right-0 z-30 text-center font-mono-accent text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#818cf8]"
      >
        Mumbai → Regina · Full Stack Cloud Engineer
      </motion.p>

      {/* Giant name — sits behind the avatar */}
      <div className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none px-6">
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-display font-light leading-[0.82] text-white text-[22vw] sm:text-[17vw] lg:text-[13rem]"
        >
          MANSI
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-display italic font-light leading-[0.82] text-transparent bg-clip-text bg-gradient-to-r from-[#c7d2fe] via-[#818cf8] to-[#f0abfc] text-[22vw] sm:text-[17vw] lg:text-[13rem] -mt-2 lg:-mt-6"
        >
          PATEL
        </motion.h1>
      </div>

      {/* Desktop: copy + CTAs anchored lower-left, clear of centered avatar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="hidden lg:block absolute bottom-20 left-12 z-30 max-w-xs"
      >
        <p className="text-zinc-300 text-sm leading-relaxed mb-6">
          I architect scalable cloud-native systems and craft immersive interfaces — blending
          engineering precision with a love for fashion, travel & the cosmos.
        </p>
        <Buttons />
      </motion.div>

      {/* Mobile: stacked copy + CTAs at bottom */}
      <div className="lg:hidden absolute bottom-16 left-0 right-0 z-30 px-6 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-zinc-300 text-sm leading-relaxed mb-6 max-w-sm"
        >
          Full Stack Cloud Engineer blending engineering precision with a love for fashion,
          travel & the cosmos.
        </motion.p>
        <Buttons />
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-10 right-12 z-30 flex-col items-center gap-2">
        <span className="font-mono-accent text-[10px] tracking-[0.3em] uppercase text-zinc-500">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#818cf8] to-transparent" />
      </div>
    </section>
  );
}

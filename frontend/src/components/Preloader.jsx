import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Cinematic intro: counter + monogram reveal, then curtain lifts.
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const dur = 1900;
    const start = performance.now();
    let raf;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setCount(100);
      setGone(true);
      setTimeout(() => onDone && onDone(), 850);
    };

    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 220);
    };
    raf = requestAnimationFrame(tick);

    // hard cap so it always completes even if rAF is throttled (e.g. background tab)
    const cap = setTimeout(finish, dur + 900);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#EFEBE3" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          data-testid="preloader"
        >
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-6">
            <p className="font-mono-accent text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#6E685B]">Portfolio — Mansi Patel</p>
            <h1 className="font-serif-display font-light text-[16vw] sm:text-[9rem] leading-none mt-4 text-[#1B1A16]">
              M<span className="italic text-[#BF5537]">P</span>
            </h1>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 px-8 flex items-end justify-between">
            <span className="font-serif-display text-4xl sm:text-6xl text-[#1B1A16] tabular-nums">{String(count).padStart(3, "0")}</span>
            <span className="font-mono-accent text-[10px] tracking-[0.3em] uppercase text-[#6E685B] mb-2">loading experience</span>
          </div>

          <div className="absolute bottom-0 left-0 h-[3px] bg-[#BF5537]" style={{ width: `${count}%`, transition: "width 0.15s linear" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

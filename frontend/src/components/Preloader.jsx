import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "MANSI PATEL";
const PANELS = 6;
const R = 92;
const CIRC = 2 * Math.PI * R;

// deterministic pseudo-random so letters scatter differently but stably
function scatter(i) {
  const s = Math.sin(i * 99.13) * 43758.5453;
  const rx = (s - Math.floor(s)) - 0.5;
  const t = Math.sin(i * 12.98 + 7.1) * 24634.21;
  const ry = (t - Math.floor(t)) - 0.5;
  const u = Math.sin(i * 4.7 + 2.3) * 9871.3;
  const rr = (u - Math.floor(u)) - 0.5;
  return { x: rx * 900, y: ry * 620, rot: rr * 220 };
}

export default function Preloader({ progress = 0, assetsReady = true, reducedMotion = false, onDone }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("load"); // load -> lift
  const [gone, setGone] = useState(false);
  const finished = useRef(false);
  const progressRef = useRef(progress);
  const assetsReadyRef = useRef(assetsReady);
  const letters = useMemo(() => NAME.split(""), []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    assetsReadyRef.current = assetsReady;
  }, [assetsReady]);

  useEffect(() => {
    const dur = reducedMotion ? 650 : 1800;
    const start = performance.now();
    let raf;

    const lift = () => {
      if (finished.current) return;
      finished.current = true;
      setCount(100);
      setPhase("lift");
      setTimeout(() => { setGone(true); onDone && onDone(); }, reducedMotion ? 420 : 1150);
    };

    const tick = (t) => {
      const elapsed = t - start;
      const timed = Math.min(elapsed / dur, 1);
      const staged = assetsReadyRef.current ? 100 : Math.min(94, 8 + timed * 78);
      const next = Math.max(staged, progressRef.current);
      setCount(Math.floor(Math.min(100, next)));

      if (assetsReadyRef.current && elapsed >= dur) setTimeout(lift, reducedMotion ? 80 : 260);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const cap = setTimeout(lift, dur + 5200);
    return () => { cancelAnimationFrame(raf); clearTimeout(cap); };
  }, [onDone, reducedMotion]);

  return (
    <AnimatePresence>
      {!gone && (
        <div className="fixed inset-0 z-[100] overflow-hidden" data-testid="preloader">
          {/* vertical panels that sweep up on reveal */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: PANELS }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-full"
                style={{ background: "#EFEBE3" }}
                initial={{ y: "0%" }}
                animate={{ y: phase === "lift" ? "-100%" : "0%" }}
                transition={{ duration: reducedMotion ? 0.24 : 0.75, delay: reducedMotion ? 0 : phase === "lift" ? i * 0.07 : 0, ease: [0.76, 0, 0.24, 1] }}
              />
            ))}
          </div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: phase === "lift" ? 0 : 1 }}
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(191,85,55,0.12), transparent 28%), radial-gradient(circle at 52% 56%, rgba(53,89,78,0.09), transparent 30%)",
            }}
          />

          {/* content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            animate={{ opacity: phase === "lift" ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* progress ring */}
            <div className="relative">
              <svg width="240" height="240" viewBox="0 0 240 240" className="rotate-[-90deg]">
                <circle cx="120" cy="120" r={R} fill="none" stroke="rgba(27,26,22,0.12)" strokeWidth="2" />
                <circle
                  cx="120" cy="120" r={R} fill="none" stroke="#BF5537" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - count / 100)}
                  style={{ transition: "stroke-dashoffset 0.12s linear" }}
                />
              </svg>

              {/* scattered letters assembling into the name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex">
                  {letters.map((ch, i) => {
                    const sc = reducedMotion ? { x: 0, y: 0, rot: 0 } : scatter(i + 1);
                    return (
                      <motion.span
                        key={i}
                        className={`font-serif-display text-3xl sm:text-4xl ${ch === "P" ? "italic text-[#BF5537]" : "text-[#1B1A16]"}`}
                        initial={{ x: sc.x, y: sc.y, rotate: sc.rot, opacity: 0, filter: reducedMotion ? "blur(0px)" : "blur(6px)" }}
                        animate={{ x: 0, y: 0, rotate: 0, opacity: ch === " " ? 0 : 1, filter: "blur(0px)" }}
                        transition={{ type: "spring", stiffness: 120, damping: 14, delay: reducedMotion ? 0 : 0.15 + i * 0.06 }}
                        style={{ display: "inline-block", width: ch === " " ? "0.5rem" : "auto" }}
                      >
                        {ch === " " ? "\u00A0" : ch}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="font-serif-display text-5xl sm:text-6xl text-[#1B1A16] tabular-nums">{String(count).padStart(3, "0")}</span>
              <span className="font-mono-accent text-[10px] tracking-[0.3em] uppercase text-[#6E685B] leading-tight">Full Stack<br />Cloud Engineer</span>
            </div>

            <p className="mt-6 font-mono-accent text-[10px] tracking-[0.4em] uppercase text-[#6E685B] overflow-hidden">
              <motion.span
                className="inline-block"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                Loading the 3D signature
              </motion.span>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AVATARS } from "../data/portfolio";

// One consistent character; poses crossfade in place (no vanish/replace).
// Her head actively looks toward the cursor everywhere — she feels alive & interactive.
const STATES = {
  Home: { src: AVATARS.hero, side: "center", scale: 1, tag: "Hello, I'm Mansi" },
  About: { src: AVATARS.wave, side: "left", scale: 0.98, tag: "A little about me" },
  Skills: { src: AVATARS.coding, side: "right", scale: 1.0, tag: "Building, always" },
  Work: { src: AVATARS.present, side: "left", scale: 0.98, tag: "My journey" },
  Projects: { src: AVATARS.present, side: "left", scale: 0.82, tag: "Take a look" },
  Contact: { src: AVATARS.wave, side: "right", scale: 0.98, tag: "Let's talk" },
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export default function Avatar({ active, ready = true }) {
  const state = STATES[active] || STATES.Home;
  const side = state.side;
  const isCenter = side === "center";

  const wrapRef = useRef(null);

  // entrance only fires AFTER the preloader lifts, so it's actually seen
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setEntered(true), 150);
      return () => clearTimeout(t);
    }
  }, [ready]);

  // cursor tracking, smoothed with springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15, mass: 0.4 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const rotateY = useTransform(sx, (v) => v * 42); // head turns toward cursor
  const rotateX = useTransform(sy, (v) => -v * 26); // head tilts up/down
  const driftX = useTransform(sx, (v) => v * 26); // parallax
  const driftY = useTransform(sy, (v) => v * 14);

  useEffect(() => {
    const lastMove = { t: 0 };
    const onMove = (e) => {
      lastMove.t = Date.now();
      // look toward the cursor relative to HER head position (not the window center)
      const r = wrapRef.current?.getBoundingClientRect();
      const headX = r ? r.left + r.width / 2 : window.innerWidth / 2;
      const headY = r ? r.top + r.height * 0.18 : window.innerHeight * 0.3;
      const dx = (e.clientX - headX) / (window.innerWidth * 0.5);
      const dy = (e.clientY - headY) / (window.innerHeight * 0.6);
      mx.set(clamp(dx, -0.7, 0.7));
      my.set(clamp(dy, -0.5, 0.6));
    };
    window.addEventListener("mousemove", onMove);

    // idle gaze-drift: when the cursor is still, she gently looks around on her own
    let raf;
    const loop = () => {
      if (Date.now() - lastMove.t > 2200) {
        const t = Date.now() / 1000;
        mx.set(Math.sin(t * 0.55) * 0.32);
        my.set(Math.sin(t * 0.85 + 1.2) * 0.12 - 0.03);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-0 z-20 pointer-events-none hidden lg:block"
      data-testid="3d-avatar-placeholder"
      style={{
        height: "80vh",
        width: "40vw",
        maxWidth: 520,
        left: side === "right" ? "auto" : side === "center" ? "50%" : "2vw",
        right: side === "right" ? "2vw" : "auto",
        transform: isCenter ? "translateX(-50%)" : "none",
        transition: "left 1s cubic-bezier(0.22,1,0.36,1), right 1s cubic-bezier(0.22,1,0.36,1)",
        perspective: 1200,
      }}
    >
      {/* unique entrance: she materializes feet-first through a scan sweep, blur → sharp (after preloader) */}
      <motion.div
        className="relative h-full w-full"
        initial={{ clipPath: "inset(100% 0 0 0)", filter: "blur(14px)", scale: 1.1, opacity: 0 }}
        animate={entered
          ? { clipPath: "inset(0% 0 0 0)", filter: "blur(0px)", scale: 1, opacity: 1 }
          : { clipPath: "inset(100% 0 0 0)", filter: "blur(14px)", scale: 1.1, opacity: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* terracotta scan line that rises with the reveal */}
        <motion.div
          className="absolute left-0 right-0 h-[3px] z-30 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, #BF5537, transparent)", boxShadow: "0 0 22px 6px rgba(191,85,55,0.55)" }}
          initial={{ top: "100%", opacity: 0 }}
          animate={entered ? { top: ["100%", "0%", "0%"], opacity: [0, 1, 0] } : { top: "100%", opacity: 0 }}
          transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.75, 1] }}
        />

        {/* natural weight-shift sway + subtle breathing (idle life) */}
        <motion.div
          className="relative h-full w-full animate-floaty"
          animate={{ rotate: [0, -1.1, 0, 1.1, 0], x: [0, -5, 0, 5, 0], scaleY: [1, 1, 0.992, 1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
          style={{ transformOrigin: "center bottom" }}
        >
          {/* live cursor-follow head tracking (applies on every section) */}
          <motion.div
            className="relative h-full w-full"
            style={{
              rotateX,
              rotateY,
              x: driftX,
              y: driftY,
              scale: state.scale,
              transformStyle: "preserve-3d",
              transformOrigin: "center 30%",
            }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[55%] h-6 rounded-full blur-xl" style={{ background: "rgba(27,26,22,0.2)" }} />

            <AnimatePresence mode="sync">
              <motion.img
                key={state.src}
                src={state.src}
                alt="Mansi avatar"
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain select-none drop-shadow-[0_24px_40px_rgba(27,26,22,0.18)]"
              />
            </AnimatePresence>

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 1.4 }}
              className="font-mono-accent absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-[#BF5537] bg-[#F7F4ED]/80 backdrop-blur px-3 py-1 rounded-full border border-[rgba(27,26,22,0.12)]"
            >
              {state.tag}
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AVATARS } from "../data/portfolio";

// One consistent character; poses crossfade in place. Body stays still;
// on the frontal Home pose her eyes follow the cursor.
const STATES = {
  Home: { src: AVATARS.hero, side: "center", scale: 1, tag: "Hello, I'm Mansi", eyes: true },
  About: { src: AVATARS.wave, side: "left", scale: 0.98, tag: "A little about me" },
  Skills: { src: AVATARS.coding, side: "right", scale: 1.0, tag: "Building, always" },
  Work: { src: AVATARS.present, side: "left", scale: 0.98, tag: "My journey" },
  Projects: { src: AVATARS.present, side: "left", scale: 0.82, tag: "Take a look" },
  Contact: { src: AVATARS.wave, side: "right", scale: 0.98, tag: "Let's talk" },
};

// eye centres for the hero pose, as % of the image box (measured from hero.png)
const HERO_EYES = { left: { x: 36.4, y: 9.0 }, right: { x: 51.0, y: 8.9 }, size: 5.4 };

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function Eye({ x, y, size, sx, sy }) {
  // iris shifts a small % of its own size toward the cursor
  const ix = useTransform(sx, (v) => `${clamp(v, -0.9, 0.9) * 26}%`);
  const iy = useTransform(sy, (v) => `${clamp(v, -0.9, 0.9) * 22}%`);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      style={{ left: `${x}%`, top: `${y}%`, width: `${size}%`, aspectRatio: "1 / 0.66", borderRadius: "50%" }}
    >
      {/* thin sclera sliver (kept dim so it doesn't read as googly) */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 45%, #E8DFD1 0%, #d8ccba 100%)" }} />
      {/* dark iris that fills most of the eye (like her render) + pupil */}
      <motion.div className="absolute inset-0" style={{ x: ix, y: iy }}>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: "82%", height: "104%", background: "radial-gradient(circle at 40% 36%, #6a4529 0%, #3a2415 52%, #1c1109 100%)" }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: "50%", height: "50%", background: "#0d0805" }} />
          <div className="absolute rounded-full" style={{ width: "24%", height: "24%", left: "20%", top: "14%", background: "rgba(255,255,255,0.92)" }} />
        </div>
      </motion.div>
      {/* upper lash-line / lid shadow to keep her almond, lined look */}
      <div className="absolute left-0 right-0 top-0" style={{ height: "42%", background: "linear-gradient(180deg, rgba(20,13,8,0.85) 0%, rgba(20,13,8,0.25) 55%, rgba(20,13,8,0) 100%)" }} />
      <div className="absolute left-0 right-0 top-0" style={{ height: "16%", background: "#140d07" }} />
    </div>
  );
}

export default function Avatar({ active, ready = true }) {
  const state = STATES[active] || STATES.Home;
  const side = state.side;
  const isCenter = side === "center";

  const wrapRef = useRef(null);

  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setEntered(true), 150);
      return () => clearTimeout(t);
    }
  }, [ready]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 170, damping: 16, mass: 0.35 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  useEffect(() => {
    const lastMove = { t: 0 };
    const onMove = (e) => {
      lastMove.t = Date.now();
      const r = wrapRef.current?.getBoundingClientRect();
      const headX = r ? r.left + r.width / 2 : window.innerWidth / 2;
      const headY = r ? r.top + r.height * 0.12 : window.innerHeight * 0.25;
      const dx = (e.clientX - headX) / (window.innerWidth * 0.42);
      const dy = (e.clientY - headY) / (window.innerHeight * 0.6);
      mx.set(clamp(dx, -1, 1));
      my.set(clamp(dy, -1, 1));
    };
    window.addEventListener("mousemove", onMove);

    // idle: eyes drift gently on their own when the cursor is still
    let raf;
    const loop = () => {
      if (Date.now() - lastMove.t > 2600) {
        const t = Date.now() / 1000;
        mx.set(Math.sin(t * 0.5) * 0.4);
        my.set(Math.sin(t * 0.8 + 1.1) * 0.22);
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
      }}
    >
      {/* one-time entrance reveal (after preloader); body then stays still */}
      <motion.div
        className="relative h-full w-full"
        initial={{ clipPath: "inset(100% 0 0 0)", filter: "blur(14px)", scale: 1.1, opacity: 0 }}
        animate={entered
          ? { clipPath: "inset(0% 0 0 0)", filter: "blur(0px)", scale: 1, opacity: 1 }
          : { clipPath: "inset(100% 0 0 0)", filter: "blur(14px)", scale: 1.1, opacity: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute left-0 right-0 h-[3px] z-30 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, #BF5537, transparent)", boxShadow: "0 0 22px 6px rgba(191,85,55,0.55)" }}
          initial={{ top: "100%", opacity: 0 }}
          animate={entered ? { top: ["100%", "0%", "0%"], opacity: [0, 1, 0] } : { top: "100%", opacity: 0 }}
          transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.75, 1] }}
        />

        {/* stationary body */}
        <div className="relative h-full w-full" style={{ transform: `scale(${state.scale})`, transformOrigin: "center bottom" }}>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[55%] h-6 rounded-full blur-xl" style={{ background: "rgba(27,26,22,0.2)" }} />

          {/* image + (hero) eye overlay share the same bottom-anchored box */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full" style={{ aspectRatio: "366 / 1099" }}>
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

            {state.eyes && entered && (
              <>
                <Eye x={HERO_EYES.left.x} y={HERO_EYES.left.y} size={HERO_EYES.size} sx={sx} sy={sy} />
                <Eye x={HERO_EYES.right.x} y={HERO_EYES.right.y} size={HERO_EYES.size} sx={sx} sy={sy} />
              </>
            )}
          </div>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 1.4 }}
            className="font-mono-accent absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-[#BF5537] bg-[#F7F4ED]/80 backdrop-blur px-3 py-1 rounded-full border border-[rgba(27,26,22,0.12)]"
          >
            {state.tag}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

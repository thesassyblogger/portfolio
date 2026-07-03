import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AVATARS } from "../data/portfolio";

// One consistent character; poses crossfade in place (no vanish/replace).
// On Home she subtly tilts to follow the cursor.
const STATES = {
  Home: { src: AVATARS.hero, side: "center", scale: 1, tag: "Hello, I'm Mansi" },
  About: { src: AVATARS.wave, side: "left", scale: 0.98, tag: "A little about me" },
  Skills: { src: AVATARS.coding, side: "right", scale: 1.0, tag: "Building, always" },
  Work: { src: AVATARS.present, side: "left", scale: 0.98, tag: "My journey" },
  Projects: { src: AVATARS.present, side: "left", scale: 0.82, tag: "Take a look" },
  Travel: { src: AVATARS.wave, side: "right", scale: 0.7, tag: "Wanderlust" },
  Style: { src: AVATARS.present, side: "left", scale: 0.7, tag: "After hours" },
  Contact: { src: AVATARS.wave, side: "right", scale: 0.98, tag: "Let's talk" },
};

export default function Avatar({ active }) {
  const state = STATES[active] || STATES.Home;
  const side = state.side;
  const isCenter = side === "center";
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    if (active !== "Home") { setTilt({ rx: 0, ry: 0 }); return; }
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setTilt({ ry: nx * 16, rx: -ny * 10 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <div
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
      {/* entrance */}
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* float loop */}
        <div className="relative h-full w-full animate-floaty">
          {/* cursor tilt */}
          <div
            className="relative h-full w-full"
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${state.scale})`,
              transformStyle: "preserve-3d",
              transition: "transform 0.35s ease-out",
              transformOrigin: "center bottom",
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

            <span className="font-mono-accent absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-[#BF5537] bg-[#F7F4ED]/80 backdrop-blur px-3 py-1 rounded-full border border-[rgba(27,26,22,0.12)]">
              {state.tag}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

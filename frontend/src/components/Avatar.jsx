import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AVATARS } from "../data/portfolio";

// Position/pose config per active section (desktop). Values are viewport-based.
const STATES = {
  Home: { src: AVATARS.hero, x: "0%", scale: 1, rot: 0, tag: "Hi, I'm Mansi" },
  About: { src: AVATARS.waving, x: "0%", scale: 0.95, rot: -3, tag: "Nice to meet you" },
  Skills: { src: AVATARS.coding, x: "0%", scale: 0.98, rot: 0, tag: "Building things" },
  Work: { src: AVATARS.coding, x: "0%", scale: 0.92, rot: 2, tag: "Shipping code" },
  Projects: { src: AVATARS.coding, x: "0%", scale: 0.92, rot: -2, tag: "Let's build" },
  Cosmos: { src: AVATARS.space, x: "0%", scale: 1.02, rot: 0, tag: "To the stars" },
  Style: { src: AVATARS.fashion, x: "0%", scale: 1, rot: 0, tag: "Styled up" },
  Contact: { src: AVATARS.traveling, x: "0%", scale: 0.95, rot: 0, tag: "Say hello" },
};

// Which side the avatar docks to for a given section
const SIDE = {
  Home: "center",
  About: "left",
  Skills: "right",
  Work: "right",
  Projects: "left",
  Cosmos: "center",
  Style: "right",
  Contact: "left",
};

export default function Avatar({ active }) {
  const state = STATES[active] || STATES.Home;
  const side = SIDE[active] || "center";

  const sidePos = {
    left: "6vw",
    right: "auto",
    center: "50%",
  };

  const isCenter = side === "center";

  return (
    <div
      className="fixed bottom-0 z-20 pointer-events-none hidden lg:block"
      data-testid="3d-avatar-placeholder"
      style={{
        height: "82vh",
        left: side === "right" ? "auto" : side === "center" ? "50%" : "5vw",
        right: side === "right" ? "5vw" : "auto",
        transform: isCenter ? "translateX(-50%)" : "none",
        transition: "left 1.1s cubic-bezier(0.22,1,0.36,1), right 1.1s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="relative h-full flex items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.src}
            initial={{ opacity: 0, y: 40, scale: state.scale * 0.9 }}
            animate={{ opacity: 1, y: 0, scale: state.scale, rotate: state.rot }}
            exit={{ opacity: 0, y: -30, scale: state.scale * 0.92 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full animate-float-slow"
          >
            {/* glow halo */}
            <div
              className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[70%] h-[55%] rounded-full blur-3xl -z-10"
              style={{ background: "radial-gradient(circle, rgba(129,140,248,0.35), transparent 70%)" }}
            />
            <img
              src={state.src}
              alt="Mansi avatar"
              className="h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] select-none"
              draggable={false}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono-accent absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.25em] uppercase text-[#818cf8] bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10"
            >
              {state.tag}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

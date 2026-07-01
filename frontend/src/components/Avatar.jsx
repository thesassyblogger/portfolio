import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AVATARS } from "../data/portfolio";

const STATES = {
  Home: { src: AVATARS.hero, side: "center", scale: 1, tag: "Hello, I'm Mansi" },
  About: { src: AVATARS.wave, side: "left", scale: 0.96, tag: "A little about me" },
  Skills: { src: AVATARS.coding, side: "right", scale: 0.98, tag: "Always building" },
  Work: { src: AVATARS.present, side: "left", scale: 0.96, tag: "My journey" },
  Contact: { src: AVATARS.wave, side: "right", scale: 0.96, tag: "Let's talk" },
};

export default function Avatar({ active }) {
  // Hide on Projects so the rotating gallery is the sole focus
  const state = STATES[active];
  const hidden = !state;
  const side = state?.side || "center";
  const isCenter = side === "center";

  return (
    <div
      className="fixed bottom-0 z-20 pointer-events-none hidden lg:block"
      data-testid="3d-avatar-placeholder"
      style={{
        height: "80vh",
        left: side === "right" ? "auto" : side === "center" ? "50%" : "3vw",
        right: side === "right" ? "3vw" : "auto",
        transform: isCenter ? "translateX(-50%)" : "none",
        opacity: hidden ? 0 : 1,
        transition:
          "left 1s cubic-bezier(0.22,1,0.36,1), right 1s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
      }}
    >
      <div className="relative h-full flex items-end">
        <AnimatePresence mode="wait">
          {!hidden && (
            <motion.div
              key={state.src}
              initial={{ opacity: 0, y: 40, scale: state.scale * 0.92 }}
              animate={{ opacity: 1, y: 0, scale: state.scale }}
              exit={{ opacity: 0, y: -24, scale: state.scale * 0.94 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full animate-floaty"
            >
              <div
                className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[62%] h-6 rounded-full blur-xl -z-10"
                style={{ background: "rgba(27,26,22,0.18)" }}
              />
              <img
                src={state.src}
                alt="Mansi avatar"
                className="h-full w-auto object-contain drop-shadow-[0_24px_40px_rgba(27,26,22,0.18)] select-none"
                draggable={false}
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="font-mono-accent absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-[#BF5537] bg-[#F7F4ED]/80 backdrop-blur px-3 py-1 rounded-full border border-[rgba(27,26,22,0.12)]"
              >
                {state.tag}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

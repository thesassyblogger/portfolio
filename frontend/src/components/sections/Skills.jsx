import React, { useState } from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../../data/portfolio";

const MARQUEE = ["REACT", "NODE", "AWS", "KUBERNETES", "TERRAFORM", "DOCKER", "SPRING BOOT", "MONGODB", "GRAPHQL", "PYTHON", "CI/CD", "THREE.JS"];

export default function Skills() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="skills" data-testid="skills-section" className="relative py-28 lg:py-40 overflow-hidden">
      <span className="pointer-events-none select-none absolute right-4 top-24 hidden lg:block font-serif-display text-[12rem] leading-none text-[#1B1A16]/[0.04]">02</span>

      {/* marquee strip */}
      <div className="relative mb-16 border-y border-[rgba(27,26,22,0.14)] py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="font-serif-display text-3xl sm:text-5xl text-[#1B1A16] mx-6 opacity-80">{m} <span className="text-[#BF5537]">✦</span></span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:mr-[34%] max-w-2xl mb-12">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(02) — Capabilities</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1B1A16] leading-tight">
            The stack I <span className="italic text-[#BF5537]">command</span>.
          </h2>
        </div>

        {/* interactive accordion-style list — unique, editorial */}
        <div className="lg:mr-[30%] border-t border-[rgba(27,26,22,0.14)]">
          {SKILL_GROUPS.map((group, gi) => {
            const open = openIdx === gi;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
                data-testid={`skill-group-${gi}`}
                className="border-b border-[rgba(27,26,22,0.14)]"
              >
                <button
                  onClick={() => setOpenIdx(open ? -1 : gi)}
                  className="w-full flex items-center justify-between py-6 group text-left"
                  data-cursor="hover"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono-accent text-[11px] text-[#BF5537]">0{gi + 1}</span>
                    <h3 className={`font-serif-display text-3xl sm:text-4xl transition-colors ${open ? "text-[#BF5537]" : "text-[#1B1A16] group-hover:text-[#BF5537]"}`}>{group.label}</h3>
                  </div>
                  <span className="font-mono-accent text-2xl text-[#1B1A16] transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-7 flex flex-wrap gap-2">
                    {group.items.map((item, ii) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ delay: open ? ii * 0.03 : 0 }}
                        className="font-mono-accent text-[11px] text-[#4a463d] border border-[rgba(27,26,22,0.16)] px-3 py-1.5 hover:border-[#BF5537]/50 hover:-translate-y-0.5 transition-all"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

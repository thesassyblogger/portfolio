import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:mr-[38%] max-w-2xl">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#818cf8] mb-6">// 02 — Capabilities</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            The stack I <span className="italic text-[#818cf8]">command</span>.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:mr-[34%]">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              data-testid={`skill-group-${gi}`}
              className="group bg-white/[0.02] border border-white/[0.08] p-7 hover:border-[#818cf8]/40 transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="font-serif-display text-2xl text-white">{group.label}</h3>
                <span className="font-mono-accent text-[10px] text-zinc-600">{group.tag}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono-accent text-[11px] text-zinc-300 border border-white/10 px-3 py-1.5 group-hover:border-white/25 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

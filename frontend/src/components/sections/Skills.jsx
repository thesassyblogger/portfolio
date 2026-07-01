import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../../data/portfolio";

const MARQUEE = ["REACT", "NODE", "AWS", "KUBERNETES", "TERRAFORM", "DOCKER", "SPRING BOOT", "MONGODB", "GRAPHQL", "PYTHON", "CI/CD", "THREE.JS"];

export default function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="relative py-28 lg:py-40 overflow-hidden">
      {/* marquee strip */}
      <div className="relative mb-16 border-y border-[rgba(27,26,22,0.14)] py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="font-serif-display text-3xl sm:text-5xl text-[#1B1A16] mx-6 opacity-80">
              {m} <span className="text-[#BF5537]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:mr-[36%] max-w-2xl mb-14">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(02) — Capabilities</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1B1A16] leading-tight">
            The stack I <span className="italic text-[#BF5537]">command</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:mr-[32%]">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 50, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              whileHover={{ y: -6 }}
              data-testid={`skill-group-${gi}`}
              className="group bg-[#F7F4ED] border border-[rgba(27,26,22,0.12)] p-7 hover:border-[#BF5537]/50 transition-colors duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="font-serif-display text-2xl text-[#1B1A16]">{group.label}</h3>
                <span className="font-mono-accent text-[10px] text-[#9a9384]">{group.tag}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="font-mono-accent text-[11px] text-[#4a463d] border border-[rgba(27,26,22,0.14)] px-3 py-1.5 group-hover:border-[#BF5537]/40 transition-colors">
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

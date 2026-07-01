import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "../../data/portfolio";

export default function Experience() {
  return (
    <section id="work" data-testid="experience-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:ml-[40%] max-w-2xl">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#818cf8] mb-6">// 03 — Experience</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-14">
            Where I've <span className="italic text-[#818cf8]">built</span>.
          </h2>

          <div className="relative border-l border-white/10 pl-8 space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-testid={`experience-item-${i}`}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-[#818cf8] shadow-[0_0_20px_rgba(129,140,248,0.8)]" />
                <p className="font-mono-accent text-[11px] tracking-[0.15em] uppercase text-zinc-500">{exp.period} · {exp.location}</p>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white mt-2">{exp.role}</h3>
                <p className="text-[#c7d2fe] mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.points.map((p, pi) => (
                    <li key={pi} className="text-zinc-400 text-sm leading-relaxed flex gap-3">
                      <span className="text-[#818cf8] mt-1">—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

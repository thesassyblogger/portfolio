import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCE } from "../../data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="work" data-testid="experience-section" className="relative py-28 lg:py-40 overflow-hidden">
      <span className="pointer-events-none select-none absolute right-6 bottom-16 hidden lg:block font-serif-display text-[12rem] leading-none text-[#1B1A16]/[0.04]">03</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:ml-[38%] max-w-2xl">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(03) — Experience</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1B1A16] leading-tight mb-14">
            Where I've <span className="italic text-[#BF5537]">built</span>.
          </h2>

          <div ref={ref} className="relative pl-10">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(27,26,22,0.14)]" />
            <motion.div className="absolute left-0 top-0 w-px bg-[#BF5537] origin-top" style={{ scaleY, height: "100%" }} />

            <div className="space-y-8">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  data-testid={`experience-item-${i}`}
                  data-cursor="hover"
                  className="group relative bg-[#F7F4ED] border border-[rgba(27,26,22,0.12)] p-6 hover:border-[#BF5537]/40 transition-colors"
                >
                  {/* pulsing node */}
                  <span className="absolute -left-[46px] top-7 w-3.5 h-3.5 rounded-full bg-[#BF5537] ring-4 ring-[#EFEBE3]">
                    <span className="absolute inset-0 rounded-full bg-[#BF5537] animate-ping opacity-40" />
                  </span>

                  {/* large faint index */}
                  <span className="pointer-events-none absolute right-5 top-3 font-serif-display text-6xl sm:text-7xl leading-none text-[#1B1A16]/[0.06] group-hover:text-[#BF5537]/10 transition-colors">0{i + 1}</span>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1B1A16]">{exp.role}</h3>
                      <p className="text-[#BF5537]">{exp.company}</p>
                    </div>
                    <p className="font-mono-accent text-[10px] tracking-[0.12em] uppercase text-[#6E685B] text-right shrink-0">{exp.period}<br/>{exp.location}</p>
                  </div>

                  {/* details reveal taller on hover */}
                  <ul className="mt-4 space-y-2 max-h-0 opacity-0 overflow-hidden group-hover:max-h-60 group-hover:opacity-100 group-hover:mt-4 transition-all duration-500">
                    {exp.points.map((p, pi) => (
                      <li key={pi} className="text-[#4a463d] text-sm leading-relaxed flex gap-3">
                        <span className="text-[#BF5537] mt-1">—</span><span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono-accent text-[10px] tracking-[0.15em] uppercase text-[#9a9384] group-hover:hidden">Hover to expand →</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

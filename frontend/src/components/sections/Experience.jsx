import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCE } from "../../data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="work" data-testid="experience-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:ml-[38%] max-w-2xl">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(03) — Experience</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1B1A16] leading-tight mb-14">
            Where I've <span className="italic text-[#BF5537]">built</span>.
          </h2>

          <div ref={ref} className="relative pl-8">
            {/* animated draw line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(27,26,22,0.14)]" />
            <motion.div className="absolute left-0 top-0 w-px bg-[#BF5537] origin-top" style={{ scaleY, height: "100%" }} />

            <div className="space-y-12">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  data-testid={`experience-item-${i}`}
                  className="relative"
                >
                  <span className="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-[#BF5537] ring-4 ring-[#EFEBE3]" />
                  <p className="font-mono-accent text-[11px] tracking-[0.15em] uppercase text-[#6E685B]">{exp.period} · {exp.location}</p>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1B1A16] mt-2">{exp.role}</h3>
                  <p className="text-[#BF5537] mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.points.map((p, pi) => (
                      <li key={pi} className="text-[#4a463d] text-sm leading-relaxed flex gap-3">
                        <span className="text-[#BF5537] mt-1">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

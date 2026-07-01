import React from "react";
import { motion } from "framer-motion";
import { PROFILE, CERTS } from "../../data/portfolio";

const headline = "From Mumbai's buzz to Regina's calm — I turn ideas into resilient, beautiful software.";

export default function About() {
  const words = headline.split(" ");
  return (
    <section id="about" data-testid="about-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:ml-[38%] max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6"
          >
            (01) — About
          </motion.p>

          {/* word-by-word blur reveal */}
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[#1B1A16] flex flex-wrap gap-x-3">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={/Regina|Mumbai/.test(w) ? "italic text-[#BF5537]" : ""}
              >
                {w}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-y-5 text-[#4a463d] leading-relaxed"
          >
            <p>
              I'm a Full Stack Cloud Engineer who lives at the intersection of solid infrastructure
              and considered design. {PROFILE.summary}
            </p>
            <p>
              Off the keyboard, I love styling myself and chasing new places — an eye for detail that
              flows straight back into the way I build products. Great engineering and great taste
              come from the same place: curiosity.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { k: "Based in", v: "Regina, CA" },
              { k: "Origin", v: "Mumbai, IN" },
              { k: "Focus", v: "Cloud + MERN" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                data-testid={`about-stat-${s.k.toLowerCase().replace(/\s/g, "-")}`}
              >
                <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B]">{s.k}</p>
                <p className="font-serif-display text-2xl text-[#1B1A16] mt-1">{s.v}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-12">
            <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B] mb-4">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <span key={c} className="font-mono-accent text-[11px] text-[#4a463d] border border-[rgba(27,26,22,0.16)] px-3 py-1.5 rounded-full bg-[#F7F4ED]">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

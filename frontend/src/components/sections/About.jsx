import React from "react";
import { motion } from "framer-motion";
import { PROFILE, CERTS } from "../../data/portfolio";

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1 } }),
};

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* content offset to the right, avatar docks left */}
        <div className="lg:ml-[40%] max-w-2xl">
          <motion.p
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#818cf8] mb-6"
          >
            // 01 — About
          </motion.p>

          <motion.h2
            variants={fade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl leading-tight text-white"
          >
            From the streets of <span className="italic text-[#818cf8]">Mumbai</span> to the
            prairie skies of <span className="italic text-[#c7d2fe]">Regina</span>.
          </motion.h2>

          <motion.div
            variants={fade}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 space-y-5 text-zinc-400 leading-relaxed"
          >
            <p>
              I'm a 21-year-old Full Stack Cloud Engineer who thrives at the intersection of
              robust infrastructure and beautiful design. {PROFILE.summary}
            </p>
            <p>
              When I'm not orchestrating Kubernetes clusters or tuning CI/CD pipelines, you'll
              find me styling an outfit, chasing new horizons, or losing myself in the stars.
              I believe great engineering and great taste come from the same place — curiosity.
            </p>
          </motion.div>

          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6"
          >
            {[
              { k: "Based in", v: "Regina, CA" },
              { k: "Origin", v: "Mumbai, IN" },
              { k: "Focus", v: "Cloud + MERN" },
            ].map((s) => (
              <div key={s.k} data-testid={`about-stat-${s.k.toLowerCase().replace(/\s/g, "-")}`}>
                <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-zinc-500">{s.k}</p>
                <p className="font-serif-display text-2xl text-white mt-1">{s.v}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fade}
            custom={4}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-4">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="font-mono-accent text-[11px] text-zinc-300 border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.03]"
                >
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

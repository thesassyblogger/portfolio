import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-14">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#818cf8] mb-6">// 04 — Selected Work</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Things I've <span className="italic text-[#818cf8]">engineered</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              data-testid={`project-card-${i}`}
              className="group relative block bg-white/[0.02] border border-white/[0.08] p-8 overflow-hidden hover:border-[#818cf8]/40 transition-colors duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                   style={{ background: "radial-gradient(circle at 80% 0%, rgba(129,140,248,0.12), transparent 60%)" }} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="font-mono-accent text-[11px] text-zinc-500">{p.year}</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#818cf8] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white mt-4 leading-snug group-hover:text-[#c7d2fe] transition-colors">
                  {p.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mt-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono-accent text-[10px] text-zinc-400 border border-white/10 px-2.5 py-1">{s}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

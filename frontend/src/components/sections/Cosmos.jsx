import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SPACE = "https://images.unsplash.com/photo-1712508818673-f9e3875b94b6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";
const NEBULA = "https://images.unsplash.com/photo-1679615845580-8691c78fd7d3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

export default function Cosmos() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="cosmos" data-testid="cosmos-section" ref={ref} className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#818cf8] mb-6">// 05 — Travel & Cosmos</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-7xl text-white leading-tight">
            Grounded on Earth, <span className="italic text-[#818cf8]">dreaming</span> of galaxies.
          </h2>
          <p className="text-zinc-400 mt-6 leading-relaxed">
            Every journey — from prairie lakes to imagined nebulae — fuels the way I see design and code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <motion.div style={{ y: y1 }} className="md:col-span-5 md:mt-12 relative overflow-hidden group" data-testid="cosmos-photo-travel-1">
            <img src="/photos/mansi_2.jpg" alt="Mansi travelling by the lake" className="w-full h-[520px] object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-mono-accent text-[11px] tracking-[0.2em] uppercase text-white">Regina Beach, SK</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:col-span-7 relative overflow-hidden group" data-testid="cosmos-photo-space-1">
            <img src={SPACE} alt="Deep space galaxy" className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[#050505]/20" />
            <div className="absolute bottom-0 inset-x-0 p-6">
              <p className="font-serif-display italic text-3xl text-white">"We are made of star-stuff."</p>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:col-span-7 relative overflow-hidden group" data-testid="cosmos-photo-space-2">
            <img src={NEBULA} alt="Spiral nebula" className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>

          <motion.div style={{ y: y1 }} className="md:col-span-5 relative overflow-hidden group" data-testid="cosmos-photo-travel-2">
            <img src="/photos/mansi_3.jpg" alt="Mansi exploring outdoors" className="w-full h-[440px] object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-mono-accent text-[11px] tracking-[0.2em] uppercase text-white">Wandering the prairies</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";

export default function Style() {
  return (
    <section id="style" data-testid="style-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 relative"
            data-testid="style-photo"
          >
            <div className="relative overflow-hidden">
              <img
                src="/photos/mansi_1.jpg"
                alt="Mansi in a red saree"
                className="w-full h-[640px] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-[#818cf8] text-black px-6 py-4">
              <p className="font-serif-display text-2xl leading-none">Vol. 01</p>
              <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase mt-1">Editorial</p>
            </div>
          </motion.div>

          <div className="md:col-span-6 md:pl-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#818cf8] mb-6"
            >
              // 06 — Style & Self
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05]"
            >
              Code is craft.
              <br />
              <span className="italic text-[#818cf8]">So is</span> the way I dress.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 leading-relaxed mt-8 max-w-md"
            >
              Styling myself is my daily design practice — a study in balance, contrast and
              detail. The same instinct that pairs a red saree with silver jewellery is the one
              that shapes clean architectures and elegant interfaces.
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-serif-display italic text-2xl text-white mt-10 border-l-2 border-[#818cf8] pl-6"
            >
              "Elegance is the only beauty that never fades — in fabric and in code."
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

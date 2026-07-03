import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STYLE } from "../../data/portfolio";

function EditorialImage({ img, index, className, progress, drift }) {
  const y = useTransform(progress, [0, 1], [drift, -drift]);
  return (
    <motion.figure
      style={{ y }}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`style-image-${index}`}
      data-cursor="hover"
      className={`group relative overflow-hidden bg-[#F7F4ED] border border-[rgba(27,26,22,0.12)] ${className}`}
    >
      <img
        src={img.src}
        alt={img.caption}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <figcaption className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-[#1B1A16]/70 backdrop-blur-sm px-4 py-2">
        <span className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#EFEBE3]">{img.caption}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function Style() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [a, b, c, d] = STYLE.images;

  return (
    <section id="style" data-testid="style-section" ref={ref} className="relative py-28 lg:py-40 overflow-hidden">
      <span className="pointer-events-none select-none absolute -right-4 top-24 hidden lg:block font-serif-display text-[13rem] leading-none text-[#1B1A16]/[0.04]">STYLE</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(06) — Off Hours</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[#1B1A16]">
            Style is just <span className="italic text-[#BF5537]">system design</span> for the self.
          </h2>
          <p className="mt-6 text-[#4a463d] leading-relaxed">{STYLE.blurb}</p>
        </div>

        {/* editorial magazine spread — asymmetric, overlapping */}
        <div className="relative grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-7 lg:col-span-4 lg:col-start-1">
            <EditorialImage img={a} index={0} progress={scrollYProgress} drift={40} className="aspect-[3/4]" />
          </div>

          <div className="col-span-5 lg:col-span-3 lg:col-start-5 self-end lg:-mb-16">
            <EditorialImage img={b} index={1} progress={scrollYProgress} drift={70} className="aspect-[3/4]" />
            <p className="mt-3 font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B] hidden lg:block">
              // detail is a discipline
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-24 flex flex-col justify-center">
            <EditorialImage img={c} index={2} progress={scrollYProgress} drift={55} className="aspect-[4/5]" />
          </div>

          <div className="col-span-8 lg:col-span-3 lg:col-start-3 lg:mt-4">
            <EditorialImage img={d} index={3} progress={scrollYProgress} drift={30} className="aspect-[4/3]" />
          </div>

          <div className="col-span-4 lg:col-span-3 lg:col-start-7 self-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-serif-display italic text-2xl lg:text-3xl text-[#1B1A16] leading-snug"
            >
              The same eye that <span className="text-[#BF5537]">notices a seam</span> notices a bug.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

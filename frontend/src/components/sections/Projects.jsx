import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, ArrowUpRight, X, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../../data/portfolio";

const N = PROJECTS.length;
const THETA = 360 / N;

export default function Projects() {
  const [dims, setDims] = useState({ cardW: 240, cardH: 320, radius: 360 });
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fs, setFs] = useState(false);
  const [selected, setSelected] = useState(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const moved = useRef(0);
  const angleRef = useRef(0);
  angleRef.current = angle;
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  // pause rotation when section is off-screen (perf)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // lock page scroll while fullscreen overlay is open
  useEffect(() => {
    document.body.style.overflow = fs ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [fs]);

  // responsive sizing
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      let cardW, cardH;
      if (w < 640) { cardW = 165; cardH = 230; }
      else if (w < 1024) { cardW = 210; cardH = 290; }
      else { cardW = fs ? 300 : 250; cardH = fs ? 400 : 330; }
      const need = (cardW / 2) / Math.tan(Math.PI / N);
      const radius = Math.round(Math.max(need * 1.1, cardW * 1.25) + (fs ? 90 : 26));
      setDims({ cardW, cardH, radius });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [fs]);

  // auto-rotate loop
  useEffect(() => {
    let raf;
    const tick = () => {
      if (autoPlay && !paused && !dragging.current && !selected && (inView || fs)) {
        setAngle((a) => (a + 0.16) % 360);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, selected, inView, fs, autoPlay]);

  const onDown = (e) => {
    dragging.current = true;
    moved.current = 0;
    setAutoPlay(false);
    lastX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = x - lastX.current;
    moved.current += Math.abs(dx);
    lastX.current = x;
    setAngle((a) => a + dx * 0.28);
  };
  const onUp = () => { dragging.current = false; };

  const StageInner = (
    <div
      className="relative select-none"
      style={{ height: dims.cardH + 50, perspective: 1100 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); onUp(); }}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      data-testid="project-cylinder"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transformStyle: "preserve-3d",
          transform: `translate(-50%,-50%) translateZ(${-dims.radius}px) rotateY(${angle}deg)`,
          transition: (autoPlay || dragging.current) ? "none" : "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          width: dims.cardW,
          height: dims.cardH,
        }}
      >
        {PROJECTS.map((p, i) => {
          const eff = ((i * THETA + angle) % 360 + 360) % 360;
          const front = Math.cos((eff * Math.PI) / 180);
          const opacity = 0.25 + 0.75 * ((front + 1) / 2);
          const isFront = eff < 30 || eff > 330;
          return (
            <div
              key={p.name}
              className="absolute inset-0 cursor-pointer"
              style={{
                transform: `rotateY(${i * THETA}deg) translateZ(${dims.radius}px)`,
                opacity,
                pointerEvents: front > -0.5 ? "auto" : "none",
              }}
              onClick={() => { if (moved.current < 6) window.open(p.link, "_blank", "noopener,noreferrer"); }}
              data-testid={`project-card-${i}`}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden border transition-transform duration-300"
                style={{
                  borderColor: isFront ? p.hue : "rgba(27,26,22,0.15)",
                  boxShadow: isFront ? `0 24px 50px -12px ${p.hue}55` : "0 10px 30px rgba(27,26,22,0.12)",
                  background: "#F7F4ED",
                  transform: isFront ? "scale(1.04)" : "scale(1)",
                }}
              >
                <div className="h-1/2 relative flex items-center justify-center overflow-hidden" style={{ background: p.image ? "#ffffff" : `linear-gradient(135deg, ${p.hue}, ${p.hue}bb)` }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} draggable={false} className="absolute inset-0 w-full h-full object-contain" />
                  ) : (
                    <span className="font-serif-display text-white/95 text-5xl leading-none">{p.name.charAt(0)}</span>
                  )}
                </div>
                <div className="h-1/2 p-4 flex flex-col">
                  <p className="font-mono-accent text-[9px] tracking-[0.2em] uppercase text-[#6E685B]">{p.kind}</p>
                  <h4 className="font-serif-display text-xl text-[#1B1A16] leading-tight mt-1">{p.name}</h4>
                  <div className="mt-auto flex items-center gap-1 text-[#BF5537] font-mono-accent text-[10px] uppercase tracking-wider">
                    View <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* fullscreen toggle */}
      <button
        onClick={() => setFs((v) => !v)}
        data-testid="project-fullscreen-toggle"
        className="absolute top-2 right-2 z-10 p-2.5 rounded-full bg-[#1B1A16] text-[#EFEBE3] hover:bg-[#BF5537] transition-colors"
        aria-label="Toggle fullscreen gallery"
      >
        {fs ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <section id="projects" ref={sectionRef} data-testid="projects-section" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-10">
          <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-[#BF5537] mb-6">(04) — Selected Work</p>
          <h2 className="font-serif-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1B1A16] leading-tight">
            A rotating gallery of <span className="italic text-[#BF5537]">things I've built</span>.
          </h2>
          <p className="text-[#6E685B] text-sm mt-4 font-mono-accent tracking-wide">Drag to spin · click a card to visit the project · ⤢ expand</p>
        </div>

        {/* inline stage (fixed height/width feel) */}
        {!fs && (
          <div className="rounded-2xl border border-[rgba(27,26,22,0.12)] bg-[#EFEBE3]/40 backdrop-blur-sm py-8">
            {StageInner}
          </div>
        )}
      </div>

      {/* fullscreen overlay */}
      <AnimatePresence>
        {fs && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#EFEBE3] overflow-hidden"
            data-testid="project-fullscreen-overlay"
          >
            <div className="w-full px-4">{StageInner}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-6 bg-[#1B1A16]/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            data-testid="project-detail-modal"
          >
            <motion.div
              initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#F7F4ED] border border-[rgba(27,26,22,0.15)] rounded-2xl overflow-hidden"
            >
              <div className="h-44 relative flex items-end p-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${selected.hue}, ${selected.hue}bb)` }}>
                {selected.image && <img src={selected.image} alt={selected.name} className="absolute inset-0 w-full h-full object-cover object-top" />}
                <span className="relative font-serif-display text-white text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{selected.name}</span>
                <button onClick={() => setSelected(null)} data-testid="project-detail-close" className="absolute top-3 right-3 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 z-10">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <p className="font-mono-accent text-[10px] tracking-[0.2em] uppercase text-[#6E685B]">{selected.kind} · {selected.year}</p>
                <p className="text-[#4a463d] leading-relaxed mt-3">{selected.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {selected.stack.map((s) => (
                    <span key={s} className="font-mono-accent text-[10px] text-[#4a463d] border border-[rgba(27,26,22,0.16)] px-2.5 py-1">{s}</span>
                  ))}
                </div>
                <a
                  href={selected.link} target="_blank" rel="noreferrer"
                  data-testid="project-detail-link"
                  className="inline-flex items-center gap-2 mt-6 font-mono-accent text-xs tracking-[0.15em] uppercase bg-[#1B1A16] text-[#EFEBE3] px-6 py-3 hover:bg-[#BF5537] transition-colors"
                >
                  {selected.live ? <><ExternalLink className="w-4 h-4" /> Visit Site</> : <><Github className="w-4 h-4" /> View Code</>}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

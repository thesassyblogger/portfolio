import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NAV, PROFILE } from "../data/portfolio";

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          data-testid="nav-logo"
          className="font-serif-display text-xl tracking-tight text-white hover:text-[#818cf8] transition-colors"
        >
          Mansi<span className="text-[#818cf8]">.</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <button
              key={item}
              onClick={() => go(item)}
              data-testid={`nav-${item.toLowerCase()}`}
              className={`font-mono-accent text-xs tracking-[0.15em] uppercase transition-colors ${
                active === item ? "text-[#818cf8]" : "text-zinc-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          data-testid="nav-github-cta"
          className="hidden md:inline-flex font-mono-accent text-xs tracking-[0.15em] uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors"
        >
          GitHub
        </a>

        <button
          className="md:hidden text-white font-mono-accent text-xs uppercase tracking-wider"
          onClick={() => setOpen((v) => !v)}
          data-testid="nav-mobile-toggle"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 overflow-hidden"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                data-testid={`nav-mobile-${item.toLowerCase()}`}
                className="font-mono-accent text-left text-sm tracking-[0.15em] uppercase text-zinc-300 hover:text-[#818cf8]"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

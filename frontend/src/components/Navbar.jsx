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
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#EFEBE3]/80 backdrop-blur-xl border-b border-[rgba(27,26,22,0.12)]" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} data-testid="nav-logo" className="font-serif-display text-xl tracking-tight text-[#1B1A16] hover:text-[#BF5537] transition-colors">
          Mansi<span className="text-[#BF5537]">.</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <button
              key={item}
              onClick={() => go(item)}
              data-testid={`nav-${item.toLowerCase()}`}
              className={`font-mono-accent text-xs tracking-[0.15em] uppercase transition-colors ${
                active === item ? "text-[#BF5537]" : "text-[#6E685B] hover:text-[#1B1A16]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <a href={PROFILE.github} target="_blank" rel="noreferrer" data-testid="nav-github-cta" className="hidden md:inline-flex font-mono-accent text-xs tracking-[0.15em] uppercase border border-[rgba(27,26,22,0.3)] px-4 py-2 hover:bg-[#1B1A16] hover:text-[#EFEBE3] transition-colors">
          GitHub
        </a>

        <button className="md:hidden text-[#1B1A16] font-mono-accent text-xs uppercase tracking-wider" onClick={() => setOpen((v) => !v)} data-testid="nav-mobile-toggle">
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="md:hidden bg-[#F7F4ED] border-t border-[rgba(27,26,22,0.12)] overflow-hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {NAV.map((item) => (
              <button key={item} onClick={() => go(item)} data-testid={`nav-mobile-${item.toLowerCase()}`} className="font-mono-accent text-left text-sm tracking-[0.15em] uppercase text-[#1B1A16] hover:text-[#BF5537]">
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

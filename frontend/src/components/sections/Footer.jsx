import React from "react";
import { PROFILE } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-serif-display text-xl text-white">
          Mansi Patel<span className="text-[#818cf8]">.</span>
        </p>
        <p className="font-mono-accent text-[11px] tracking-[0.15em] uppercase text-zinc-500">
          Designed & built with ✦ in Regina · {new Date().getFullYear()}
        </p>
        <div className="flex gap-6">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="font-mono-accent text-[11px] uppercase tracking-wider text-zinc-400 hover:text-[#818cf8]">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="font-mono-accent text-[11px] uppercase tracking-wider text-zinc-400 hover:text-[#818cf8]">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

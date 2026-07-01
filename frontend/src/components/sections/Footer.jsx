import React from "react";
import { PROFILE } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative border-t border-[rgba(27,26,22,0.14)] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-serif-display text-xl text-[#1B1A16]">Mansi Patel<span className="text-[#BF5537]">.</span></p>
        <p className="font-mono-accent text-[11px] tracking-[0.15em] uppercase text-[#6E685B]">
          Designed & built in Regina · {new Date().getFullYear()}
        </p>
        <div className="flex gap-6">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="font-mono-accent text-[11px] uppercase tracking-wider text-[#4a463d] hover:text-[#BF5537]">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="font-mono-accent text-[11px] uppercase tracking-wider text-[#4a463d] hover:text-[#BF5537]">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect, useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import CosmicBackground from "@/components/CosmicBackground";
import Avatar from "@/components/Avatar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Cosmos from "@/components/sections/Cosmos";
import Style from "@/components/sections/Style";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const SECTION_MAP = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["work", "Work"],
  ["projects", "Projects"],
  ["cosmos", "Cosmos"],
  ["style", "Style"],
  ["contact", "Contact"],
];

function App() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = SECTION_MAP.find(([id]) => id === entry.target.id);
            if (found) setActive(found[1]);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTION_MAP.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App grain relative min-h-screen">
      <CosmicBackground />
      <Navbar active={active} />
      <Avatar active={active} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Cosmos />
        <Style />
        <Contact />
        <Footer />
      </main>

      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#121212",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#F4F4F5",
            fontFamily: "Space Mono, monospace",
            fontSize: "12px",
          },
        }}
      />
    </div>
  );
}

export default App;

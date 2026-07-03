import React, { useEffect, useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import AmbientBackground from "@/components/AmbientBackground";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Avatar from "@/components/Avatar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const SECTION_MAP = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["work", "Work"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

function App() {
  const [active, setActive] = useState("Home");
  const skipPreload = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("fast");
  const [loaded, setLoaded] = useState(skipPreload);

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
  }, [loaded]);

  return (
    <div className="App grain relative min-h-screen">
      <CustomCursor />
      {!skipPreload && <Preloader onDone={() => setLoaded(true)} />}
      <AmbientBackground />
      <Navbar active={active} />
      <Avatar active={active} ready={loaded} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#F7F4ED",
            border: "1px solid rgba(27,26,22,0.15)",
            color: "#1B1A16",
            fontFamily: "Space Mono, monospace",
            fontSize: "12px",
          },
        }}
      />
    </div>
  );
}

export default App;

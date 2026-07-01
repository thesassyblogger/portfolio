import React, { useEffect, useRef, useState } from "react";

// Creative custom cursor: a lagging ring + precise dot, grows over interactive elements.
export default function CustomCursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("cursor-none");

    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e) => {
      const t = e.target.closest("a,button,[role=button],input,textarea,[data-cursor='hover']");
      setHover(!!t);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);

    let raf;
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          width: hover ? 56 : 34,
          height: hover ? 56 : 34,
          marginLeft: hover ? -28 : -17,
          marginTop: hover ? -28 : -17,
          borderColor: "#BF5537",
          backgroundColor: hover ? "rgba(191,85,55,0.12)" : "transparent",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full"
        style={{
          width: down ? 5 : 7,
          height: down ? 5 : 7,
          marginLeft: -3.5,
          marginTop: -3.5,
          background: "#1B1A16",
          opacity: hover ? 0 : 1,
          transition: "opacity 0.15s, width 0.1s, height 0.1s",
        }}
      />
    </>
  );
}

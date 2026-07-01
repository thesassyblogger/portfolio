import React, { useMemo } from "react";

// Soft, neutral ambient background — floating warm blobs + subtle grid. No space theme.
export default function AmbientBackground() {
  const blobs = useMemo(
    () => [
      { c: "rgba(191,85,55,0.16)", size: 620, top: "-8%", left: "-6%", d: "26s" },
      { c: "rgba(53,89,78,0.12)", size: 540, top: "45%", left: "62%", d: "32s" },
      { c: "rgba(201,146,46,0.12)", size: 460, top: "72%", left: "8%", d: "38s" },
    ],
    []
  );
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" data-testid="ambient-background" aria-hidden>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#F1EDE5 0%, #EAE4D8 55%, #EFE9DE 100%)" }} />
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: b.size, height: b.size, top: b.top, left: b.left, background: b.c,
            animation: `blobmove ${b.d} ease-in-out infinite`,
          }}
        />
      ))}
      {/* faint grid lines */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1B1A16 1px, transparent 1px), linear-gradient(to bottom, #1B1A16 1px, transparent 1px)",
          backgroundSize: "78px 78px",
        }}
      />
    </div>
  );
}

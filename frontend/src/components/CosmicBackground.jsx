import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";

function Starfield({ count = 2600 }) {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#c7d2fe"),
      new THREE.Color("#818cf8"),
      new THREE.Color("#f0abfc"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}

function FloatingRing() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.4 - 0.6;
    }
  });
  return (
    <mesh ref={ref} position={[3, -1, -3]}>
      <torusGeometry args={[2.4, 0.012, 16, 120]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.35} />
    </mesh>
  );
}

function ParallaxRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// CSS-only starfield used when WebGL is unavailable
function CSSStarfield() {
  const stars = useMemo(() => {
    const shadow = [];
    for (let i = 0; i < 220; i++) {
      shadow.push(`${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #fff`);
    }
    return shadow.join(", ");
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        style={{ width: 2, height: 2, background: "transparent", boxShadow: stars, borderRadius: "50%" }}
        className="opacity-70"
      />
      <div
        style={{ width: 2, height: 2, background: "transparent", boxShadow: stars, transform: "translate(600px,900px)" }}
        className="opacity-50"
      />
    </div>
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

export default function CosmicBackground() {
  const webgl = typeof window !== "undefined" && hasWebGL();

  const Fallback = (
    <div className="absolute inset-0">
      <CSSStarfield />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 30%, rgba(129,140,248,0.14), transparent 55%)" }} />
    </div>
  );

  return (
    <div className="fixed inset-0 z-0" data-testid="cosmic-webgl-canvas">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-[#050505] to-[#0b0710]" />
      {webgl ? (
        <ErrorBoundary fallback={Fallback}>
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}>
            <Starfield />
            <FloatingRing />
            <ParallaxRig />
          </Canvas>
        </ErrorBoundary>
      ) : (
        Fallback
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, rgba(129,140,248,0.10), transparent 55%)" }} />
    </div>
  );
}

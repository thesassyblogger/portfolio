import React, { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Real-time WebGL 3D avatar (rigged model, tinted to the editorial palette).
const STATES = {
  Home: { side: "center", scale: 1.0, tag: "Hello, I'm Mansi", clip: "idle" },
  About: { side: "left", scale: 0.98, tag: "A little about me", clip: "agree" },
  Skills: { side: "right", scale: 1.0, tag: "Building, always", clip: "idle", hide: true },
  Work: { side: "left", scale: 0.98, tag: "My journey", clip: "idle" },
  Projects: { side: "left", scale: 0.86, tag: "Take a look", clip: "idle" },
  Contact: { side: "right", scale: 0.98, tag: "Let's talk", clip: "agree" },
};

function EnvSetup() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Model({ pointer, scale, clip }) {
  const gltf = useLoader(GLTFLoader, "/models/avatar.glb");
  const rot = useRef();
  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), [gltf.scene]);
  const actions = useMemo(() => {
    const m = {};
    gltf.animations.forEach((a) => (m[a.name] = mixer.clipAction(a)));
    return m;
  }, [gltf.animations, mixer]);

  // tint the model to a warm bronze / terracotta sculpture
  useEffect(() => {
    gltf.scene.traverse((o) => {
      if (o.isMesh && o.material) {
        o.frustumCulled = false;
        o.material.color = new THREE.Color("#c46b45");
        o.material.metalness = 0.35;
        o.material.roughness = 0.42;
        o.material.emissive = new THREE.Color("#3a1608");
        o.material.emissiveIntensity = 0.08;
        o.material.needsUpdate = true;
      }
    });
  }, [gltf.scene]);

  useEffect(() => {
    const name = actions[clip] ? clip : "idle";
    const act = actions[name];
    if (!act) return;
    act.reset().fadeIn(0.5).play();
    return () => act.fadeOut(0.5);
  }, [clip, actions]);

  useFrame((_, delta) => {
    mixer.update(delta);
    if (rot.current) {
      const p = pointer.current;
      rot.current.rotation.y += (p.x * 0.6 - rot.current.rotation.y) * 0.06;
      rot.current.rotation.x += (-p.y * 0.14 - rot.current.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={rot} scale={scale}>
      <group position={[0, -0.9, 0]}>
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

export default function Avatar({ active, ready = true }) {
  const state = STATES[active] || STATES.Home;
  const side = state.side;
  const isCenter = side === "center";

  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setEntered(true), 200);
      return () => clearTimeout(t);
    }
  }, [ready]);

  // normalized cursor (-1..1) with idle drift, read inside useFrame
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const last = { t: 0 };
    const onMove = (e) => {
      last.t = Date.now();
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const loop = () => {
      if (Date.now() - last.t > 2400) {
        const t = Date.now() / 1000;
        pointer.current.x = Math.sin(t * 0.5) * 0.55;
        pointer.current.y = Math.sin(t * 0.8 + 1) * 0.2;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed bottom-0 z-20 pointer-events-none hidden lg:block"
      data-testid="3d-avatar-placeholder"
      style={{
        height: "82vh",
        width: "40vw",
        maxWidth: 540,
        left: side === "right" ? "auto" : side === "center" ? "50%" : "1vw",
        right: side === "right" ? "1vw" : "auto",
        transform: isCenter ? "translateX(-50%)" : "none",
        transition: "left 1s cubic-bezier(0.22,1,0.36,1), right 1s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease",
        opacity: state.hide || !entered ? 0 : 1,
      }}
    >
      {/* soft contact shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[46%] h-8 rounded-[50%] blur-2xl"
        style={{ background: "rgba(27,26,22,0.28)" }}
      />

      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
        camera={{ position: [0, 0, 3.6], fov: 32 }}
        style={{ background: "transparent" }}
      >
        <EnvSetup />
        <ambientLight intensity={0.45} />
        <hemisphereLight args={["#fff6ea", "#40302400", 0.5]} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} color="#fff2e0" />
        <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#BF5537" />
        <Suspense fallback={null}>
          <Model pointer={pointer} scale={state.scale} clip={state.clip} />
        </Suspense>
      </Canvas>

      {/* tag bubble */}
      <span
        className="font-mono-accent absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-[#BF5537] bg-[#F7F4ED]/80 backdrop-blur px-3 py-1 rounded-full border border-[rgba(27,26,22,0.12)]"
        style={{ opacity: entered ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }}
      >
        {state.tag}
      </span>
    </div>
  );
}

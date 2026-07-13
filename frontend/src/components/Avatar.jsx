import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils";

const MODEL_URL = "/models/mansi-power-suit.draco.glb";

const STATES = {
  Home: {
    side: "center",
    tag: "Hello, I'm Mansi",
    accent: "#BF5537",
    secondary: "#35594E",
    opacity: 1,
    scale: 1.1,
    frame: { height: "94vh", width: "54vw", maxWidth: 820 },
    scene: { rotY: 0, rotX: -0.045, z: 0.22, y: -0.05, modelScale: 1.08, follow: 0.16, lift: 0.07 },
    glyph: "arrival",
  },
  About: {
    side: "left",
    tag: "A little about me",
    accent: "#BF5537",
    secondary: "#C9922E",
    opacity: 1,
    scale: 0.98,
    scene: { rotY: 0.18, rotX: -0.06, z: 0, y: -0.03, modelScale: 0.98, follow: 0.06, lift: 0.02 },
    glyph: "orbit",
  },
  Skills: {
    side: "right",
    tag: "Systems unlocked",
    accent: "#35594E",
    secondary: "#BF5537",
    opacity: 0.46,
    scale: 0.9,
    scene: { rotY: -0.26, rotX: -0.06, z: -0.12, y: -0.05, modelScale: 0.94, follow: 0.04, lift: 0.02 },
    glyph: "skills",
  },
  Work: {
    side: "left",
    tag: "Tracing the build path",
    accent: "#C9922E",
    secondary: "#BF5537",
    opacity: 0.78,
    scale: 0.92,
    scene: { rotY: 0.12, rotX: -0.07, z: -0.08, y: -0.04, modelScale: 0.96, follow: 0.05, lift: 0.02 },
    glyph: "timeline",
  },
  Projects: {
    side: "left",
    tag: "Take a look",
    accent: "#BF5537",
    secondary: "#35594E",
    opacity: 0.68,
    scale: 0.88,
    scene: { rotY: 0.28, rotX: -0.05, z: -0.08, y: -0.08, modelScale: 0.92, follow: 0.04, lift: 0.02 },
    glyph: "gallery",
  },
  Motion: {
    side: "center",
    tag: "Motion system online",
    accent: "#35594E",
    secondary: "#C9922E",
    opacity: 0.72,
    scale: 0.92,
    scene: { rotY: 0, rotX: -0.08, z: -0.1, y: -0.04, modelScale: 0.96, follow: 0.06, lift: 0.02 },
    glyph: "skills",
  },
  Contact: {
    side: "right",
    tag: "Let's talk",
    accent: "#BF5537",
    secondary: "#5B4AA0",
    opacity: 0.34,
    scale: 0.88,
    scene: { rotY: -0.34, rotX: -0.05, z: -0.18, y: -0.05, modelScale: 0.94, follow: 0.04, lift: 0.02 },
    glyph: "send",
  },
};

const ACTION_BY_SECTION = {
  Home: "idle",
  About: "agree",
  Skills: "walk",
  Work: "headShake",
  Projects: "idle",
  Contact: "agree",
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function useMouseTarget(enabled = true) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return undefined;

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.x = clamp(x, -1, 1);
      mouseRef.current.y = clamp(y, -1, 1);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled]);

  return mouseRef;
}

function configureLoader(loader) {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
  loader.setMeshoptDecoder(MeshoptDecoder);
}

function findClip(clips, active) {
  const wanted = ACTION_BY_SECTION[active] || "idle";
  return clips.find((clip) => clip.name?.toLowerCase() === wanted.toLowerCase()) || clips.find((clip) => clip.name?.toLowerCase().includes("idle")) || clips[0];
}

function ModelAvatar({ active, reducedMotion, mouseRef }) {
  const stateConfig = STATES[active] || STATES.Home;
  const gltf = useLoader(GLTFLoader, MODEL_URL, configureLoader);
  const model = useMemo(() => cloneSkeleton(gltf.scene), [gltf.scene]);
  const groupRef = useRef(null);
  const mixerRef = useRef(null);
  const actionRef = useRef(null);
  const rigRef = useRef({ head: null, leftEye: null, rightEye: null, neck: null });

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    model.position.sub(center);
    model.position.y -= size.y * 0.02;
    model.scale.setScalar(2.38 / maxAxis);

    model.traverse((child) => {
      const name = child.name?.toLowerCase() || "";
      if (name.includes("head") && !name.includes("top")) rigRef.current.head = child;
      if (name.includes("neck")) rigRef.current.neck = child;
      if (name.includes("lefteye") || name.includes("left_eye")) rigRef.current.leftEye = child;
      if (name.includes("righteye") || name.includes("right_eye")) rigRef.current.rightEye = child;

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.FrontSide;
          child.material.roughness = Math.min(child.material.roughness ?? 0.72, 0.82);
          child.material.metalness = Math.max(child.material.metalness ?? 0.02, 0.02);
          child.material.needsUpdate = true;
        }
      }
    });
  }, [model]);

  useEffect(() => {
    if (!gltf.animations?.length) return undefined;

    const mixer = new THREE.AnimationMixer(model);
    mixerRef.current = mixer;
    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
      mixerRef.current = null;
    };
  }, [gltf.animations, model]);

  useEffect(() => {
    if (!mixerRef.current || !gltf.animations?.length) return;

    const clip = findClip(gltf.animations, active);
    if (!clip) return;

    const next = mixerRef.current.clipAction(clip);
    next.reset().fadeIn(0.35).play();
    if (actionRef.current && actionRef.current !== next) actionRef.current.fadeOut(0.35);
    actionRef.current = next;
  }, [active, gltf.animations]);

  useFrame((frameState, delta) => {
    mixerRef.current?.update(delta);
    if (!groupRef.current) return;

    const amp = reducedMotion ? 0 : 1;
    const elapsed = frameState.clock.elapsedTime;
    const target = stateConfig.scene;
    const breath = Math.sin(elapsed * 1.15) * 0.022 * amp;
    const sway = Math.sin(elapsed * 0.42) * 0.028 * amp;
    const pointer = mouseRef?.current || { x: 0, y: 0 };
    const follow = (target.follow || 0) * amp;
    const lookY = pointer.x * follow;
    const lookX = -pointer.y * follow * 0.48;
    const leanZ = -pointer.x * follow * 0.12;

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, target.rotX + lookX + sway * 0.25, 5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, target.rotY + lookY + sway, 5, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, leanZ + Math.sin(elapsed * 0.35) * 0.008 * amp, 5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, target.y + breath, 4, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, target.z, 4, delta);
    const nextScale = THREE.MathUtils.damp(groupRef.current.scale.x, target.modelScale, 4, delta);
    groupRef.current.scale.setScalar(nextScale);

    const rig = rigRef.current;
    if (rig.neck) {
      rig.neck.rotation.x = THREE.MathUtils.damp(rig.neck.rotation.x, lookX * 0.26, 6, delta);
      rig.neck.rotation.y = THREE.MathUtils.damp(rig.neck.rotation.y, lookY * 0.32, 6, delta);
    }
    if (rig.head) {
      rig.head.rotation.x = THREE.MathUtils.damp(rig.head.rotation.x, lookX * 0.58, 7, delta);
      rig.head.rotation.y = THREE.MathUtils.damp(rig.head.rotation.y, lookY * 0.72, 7, delta);
      rig.head.rotation.z = THREE.MathUtils.damp(rig.head.rotation.z, leanZ * 0.3, 7, delta);
    }
    [rig.leftEye, rig.rightEye].forEach((eye) => {
      if (!eye) return;
      eye.rotation.x = THREE.MathUtils.damp(eye.rotation.x, lookX * 1.8, 9, delta);
      eye.rotation.y = THREE.MathUtils.damp(eye.rotation.y, lookY * 2.2, 9, delta);
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function CinematicRings({ active, reducedMotion }) {
  const ringA = useRef(null);
  const ringB = useRef(null);
  const cfg = STATES[active] || STATES.Home;

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (ringA.current) {
      ringA.current.rotation.z += delta * 0.22;
      ringA.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    }
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.16;
      ringB.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.27) * 0.1;
    }
  });

  return (
    <group position={[0, -0.22, -0.35]}>
      <mesh ref={ringA} rotation={[Math.PI / 2.35, 0, 0]}>
        <torusGeometry args={[1.34, 0.008, 12, 160]} />
        <meshBasicMaterial color={cfg.accent} transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.75, 0.2, 0.6]}>
        <torusGeometry args={[1.05, 0.006, 12, 140]} />
        <meshBasicMaterial color={cfg.secondary} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function ParticleHalo({ active, reducedMotion }) {
  const pointsRef = useRef(null);
  const cfg = STATES[active] || STATES.Home;
  const geometry = useMemo(() => {
    const count = 72;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = i * 1.914;
      const radius = 0.55 + ((i * 17) % 42) / 58;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = -0.2 + ((i * 29) % 100) / 82;
      positions[i * 3 + 2] = Math.sin(angle) * (radius * 0.34) - 0.2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.035;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.018} color={cfg.accent} transparent opacity={active === "Home" ? 0.42 : 0.25} depthWrite={false} />
    </points>
  );
}

function SectionGlyphs({ active, reducedMotion }) {
  const groupRef = useRef(null);
  const cfg = STATES[active] || STATES.Home;

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * (cfg.glyph === "gallery" ? 0.32 : 0.18);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
  });

  if (cfg.glyph === "skills") {
    return (
      <group ref={groupRef} position={[0.72, 1.26, 0.22]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 8;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.42, Math.sin(angle * 1.6) * 0.08, Math.sin(angle) * 0.42]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial color={i % 2 ? cfg.accent : cfg.secondary} roughness={0.48} />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (cfg.glyph === "gallery") {
    return (
      <group ref={groupRef} position={[0.88, 1.08, 0.15]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[0, (i - 1.5) * 0.18, i * -0.025]} rotation={[0, -0.35, 0.06]}>
            <boxGeometry args={[0.48, 0.12, 0.012]} />
            <meshStandardMaterial color={i % 2 ? cfg.accent : "#F7F4ED"} roughness={0.5} metalness={0.05} />
          </mesh>
        ))}
      </group>
    );
  }

  if (cfg.glyph === "timeline") {
    return (
      <group ref={groupRef} position={[0.86, 0.85, 0.22]}>
        <mesh>
          <boxGeometry args={[0.02, 0.95, 0.02]} />
          <meshBasicMaterial color={cfg.accent} transparent opacity={0.55} />
        </mesh>
        {[-0.4, 0, 0.4].map((y, i) => (
          <mesh key={y} position={[0, y, 0]}>
            <sphereGeometry args={[0.06 + i * 0.01, 18, 18]} />
            <meshStandardMaterial color={i === 1 ? cfg.secondary : cfg.accent} roughness={0.35} />
          </mesh>
        ))}
      </group>
    );
  }

  if (cfg.glyph === "send") {
    return (
      <group ref={groupRef} position={[-0.72, 1.04, 0.15]} rotation={[0.25, 0.2, -0.5]}>
        <mesh>
          <coneGeometry args={[0.16, 0.58, 3]} />
          <meshStandardMaterial color={cfg.secondary} roughness={0.42} emissive={cfg.secondary} emissiveIntensity={0.08} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={[0.76, 1.2, 0.12]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.012, 12, 80]} />
        <meshBasicMaterial color={cfg.accent} transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshStandardMaterial color={cfg.secondary} />
      </mesh>
    </group>
  );
}

function ReactiveLight({ active, mouseRef, reducedMotion }) {
  const ref = useRef(null);
  const cfg = STATES[active] || STATES.Home;

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    const pointer = mouseRef?.current || { x: 0, y: 0 };
    const target = new THREE.Vector3(pointer.x * 1.2, 1.45 - pointer.y * 0.72, 2.35);
    ref.current.position.lerp(target, 1 - Math.exp(-delta * 5));
  });

  return <pointLight ref={ref} color={cfg.accent} intensity={active === "Home" ? 0.72 : 0.34} distance={4.2} />;
}

function AvatarScene({ active, reducedMotion, mouseRef }) {
  const cfg = STATES[active] || STATES.Home;

  return (
    <Canvas
      camera={{ position: [0, 0.9, 4.9], fov: 35 }}
      dpr={[1, 1.7]}
      shadows
      gl={{ alpha: true, antialias: true }}
      className="h-full w-full"
    >
      <ambientLight intensity={1.18} />
      <directionalLight position={[2.5, 4, 3]} intensity={2.1} castShadow />
      <directionalLight position={[-3, 2.5, 2]} intensity={0.9} color={cfg.secondary} />
      <spotLight position={[0, 3.5, 4]} angle={0.4} penumbra={0.65} intensity={1.45} color={cfg.accent} />
      <Suspense fallback={null}>
        <ReactiveLight active={active} mouseRef={mouseRef} reducedMotion={reducedMotion} />
        <ParticleHalo active={active} reducedMotion={reducedMotion} />
        <CinematicRings active={active} reducedMotion={reducedMotion} />
        <ModelAvatar active={active} reducedMotion={reducedMotion} mouseRef={mouseRef} />
        <SectionGlyphs active={active} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default function Avatar({ active, ready = true, reducedMotion = false }) {
  const state = STATES[active] || STATES.Home;
  const side = state.side;
  const isCenter = side === "center";
  const wrapRef = useRef(null);
  const mouseRef = useMouseTarget(!reducedMotion);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setEntered(true), reducedMotion ? 20 : 150);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [ready, reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-0 z-20 pointer-events-none hidden lg:block"
      data-testid="3d-avatar-placeholder"
      style={{
        height: state.frame?.height || "86vh",
        width: state.frame?.width || "40vw",
        maxWidth: state.frame?.maxWidth || 580,
        left: side === "right" ? "auto" : side === "center" ? "50%" : "2vw",
        right: side === "right" ? "2vw" : "auto",
        transform: isCenter ? "translateX(-50%)" : "none",
        transition:
          "left 1s cubic-bezier(0.22,1,0.36,1), right 1s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
        perspective: 1200,
        opacity: state.opacity,
      }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ clipPath: "inset(100% 0 0 0)", filter: "blur(14px)", scale: 1.1, opacity: 0 }}
        animate={
          entered
            ? { clipPath: "inset(0% 0 0 0)", filter: "blur(0px)", scale: state.scale, opacity: 1 }
            : { clipPath: "inset(100% 0 0 0)", filter: "blur(14px)", scale: 1.1, opacity: 0 }
        }
        transition={{ duration: reducedMotion ? 0.2 : 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute left-0 right-0 h-[3px] z-30 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${state.accent}, transparent)`, boxShadow: `0 0 22px 6px ${state.accent}66` }}
          initial={{ top: "100%", opacity: 0 }}
          animate={entered && !reducedMotion ? { top: ["100%", "0%", "0%"], opacity: [0, 1, 0] } : { top: "100%", opacity: 0 }}
          transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.75, 1] }}
        />

        <div className="relative h-full w-full">
          <motion.div className="relative h-full w-full" style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[58%] h-6 rounded-full blur-xl" style={{ background: "rgba(27,26,22,0.22)" }} />
            <div
              className="absolute left-1/2 top-[12%] h-[58%] w-[58%] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${state.accent}22, transparent 64%)` }}
            />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full" style={{ aspectRatio: "366 / 1099" }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key="mansi-3d-avatar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 select-none drop-shadow-[0_24px_40px_rgba(27,26,22,0.18)]"
                >
                  <AvatarScene active={active} reducedMotion={reducedMotion} mouseRef={mouseRef} />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={entered ? { opacity: state.tag ? 1 : 0, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: reducedMotion ? 0 : 1.1 }}
              className="font-mono-accent absolute left-1/2 top-[14%] -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-[#BF5537] bg-[#F7F4ED]/80 backdrop-blur px-3 py-1 rounded-full border border-[rgba(27,26,22,0.12)]"
              style={{ color: state.accent }}
            >
              {state.tag}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

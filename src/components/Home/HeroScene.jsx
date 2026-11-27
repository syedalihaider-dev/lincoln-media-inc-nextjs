"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { CASE_STUDIES } from "@/data/work";
import { SERVICES } from "@/data/services";
import { useAdaptiveDpr } from "@/components/Common/AdaptiveDpr";

const CYAN = new THREE.Color("#36e4d0");
const VIOLET = new THREE.Color("#3b5bff");
const START_Z = 7;
const END_Z = -52;

// The studio's own imagery as textures — the static files directly (image optimisation is off; see next.config.mjs)
const tex = (img) => img.src;

/**
 * The plates: the studio's work and disciplines, hung in a long corridor of space.
 * Laid out left/right of a clear centre lane so the headline and the AI orb stay readable.
 */
function usePlates(count) {
  return useMemo(() => {
    const pool = [];
    const n = Math.max(CASE_STUDIES.length, SERVICES.length);
    for (let i = 0; i < n; i++) {
      if (CASE_STUDIES[i]) pool.push(CASE_STUDIES[i].image);
      if (SERVICES[i]) pool.push(SERVICES[i].image);
    }
    const out = [];
    for (let i = 0; i < Math.min(count, pool.length); i++) {
      const side = i % 2 ? 1 : -1;
      const r = (k) => (Math.sin(i * 91.7 + k * 13.1) * 0.5 + 0.5); // stable pseudo-random
      out.push({
        url: tex(pool[i]),
        x: side * (2.5 + r(1) * 2.6),
        y: (r(2) - 0.5) * 3.6,
        z: -1.5 - i * 3.3 - r(3) * 1.2,
        w: 2.1 + r(4) * 1.5,
        ry: -side * (0.22 + r(5) * 0.28),
        rz: (r(6) - 0.5) * 0.12,
        frame: i % 3 === 0,
      });
    }
    return out;
  }, [count]);
}

function Plate({ map, p, state }) {
  const mesh = useRef();
  const edge = useRef();
  const aspect = map.image ? map.image.height / map.image.width : 0.66;
  const h = p.w * aspect;
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(p.w * 1.08, h * 1.08 + 0.04)), [p.w, h]);
  useEffect(() => { map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4; }, [map]);

  useFrame(({ camera, clock }) => {
    const d = camera.position.z - p.z; // distance in front of the camera
    // Fade in from the dark far end, fade out just before passing the lens
    const fadeIn = 1 - THREE.MathUtils.smoothstep(d, 16, 34);
    const fadeOut = THREE.MathUtils.smoothstep(d, 0.4, 2.6);
    const o = fadeIn * fadeOut;
    mesh.current.material.opacity = o;
    if (edge.current) edge.current.material.opacity = o * 0.7;
    const t = clock.elapsedTime;
    mesh.current.position.y = p.y + Math.sin(t * 0.4 + p.z) * 0.08;
    mesh.current.rotation.y = p.ry + state.current.px * 0.06;
    if (edge.current) edge.current.position.y = mesh.current.position.y;
  });

  return (
    <group position={[p.x, 0, p.z]} rotation={[0, 0, p.rz]}>
      <mesh ref={mesh} position={[0, p.y, 0]} rotation={[0, p.ry, 0]}>
        <planeGeometry args={[p.w, h]} />
        <meshBasicMaterial map={map} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      {p.frame && (
        <lineSegments ref={edge} geometry={edges} position={[0, p.y, 0.02]} rotation={[0, p.ry, 0]}>
          <lineBasicMaterial color={CYAN} transparent opacity={0} />
        </lineSegments>
      )}
    </group>
  );
}

function Plates({ plates, state }) {
  const maps = useTexture(plates.map((p) => p.url));
  return plates.map((p, i) => <Plate key={p.url} map={maps[i]} p={p} state={state} />);
}

// Fine signal dust along the corridor — the same cyan/violet as the guide's orb
function Dust({ count }) {
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, r = 1.6 + Math.random() * 7;
      pos.set([Math.cos(a) * r, Math.sin(a) * r * 0.6, START_Z - Math.random() * (START_Z - END_Z + 8)], i * 3);
      const c = CYAN.clone().lerp(VIOLET, Math.random());
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Scroll dollies the camera down the corridor; the pointer sways it
function Rig({ state }) {
  const { camera } = useThree();
  useFrame((_, dt) => {
    const s = state.current;
    const k = 1 - Math.pow(0.0015, dt);
    const z = THREE.MathUtils.lerp(START_Z, END_Z, s.progress) + s.arrive * 14;
    camera.position.z += (z - camera.position.z) * k;
    camera.position.x += (s.px * 0.9 - camera.position.x) * k * 0.6;
    camera.position.y += (-s.py * 0.5 - camera.position.y) * k * 0.6;
    camera.rotation.z += (-s.px * 0.04 - camera.rotation.z) * k * 0.5;
  });
  return null;
}

/**
 * Hero 3D layer. `state` is a ref Hero.jsx writes into:
 *   progress 0–1 (scroll through the corridor), arrive 1→0 (entrance fly-in), px/py pointer (-0.5…0.5)
 */
export default function HeroScene({ state, compact = false }) {
  const plates = usePlates(compact ? 8 : 16);
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  const [dpr, monitor] = useAdaptiveDpr(compact ? 1.5 : 1.75);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 52, near: 0.1, far: 60, position: [0, 0, START_Z + 14] }}
        aria-hidden="true"
      >
        {monitor}
        <Rig state={state} />
        <Dust count={compact ? 500 : 1400} />
        <Suspense fallback={null}>
          <Plates plates={plates} state={state} />
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useOnScreen } from "@/components/Common/SceneKit";

const N = 9; // slices
const W = 5.1, H = 3.4; // the photograph's 3:2 plane, in world units
// where each slice starts: [dx, dy, dz, rotY] — a scattered, noisy market that settles
const SCATTER = [
  [-0.9, 0.7, -2.6, 0.5], [-0.4, -0.9, 1.6, -0.35], [-0.2, 1.1, -1.2, 0.4], [0.1, -0.5, 2.3, -0.6], [0, 0.9, -2.9, 0.3],
  [0.2, -1.2, 1.1, -0.45], [0.35, 0.4, -1.8, 0.55], [0.6, -0.8, 2.6, -0.3], [0.9, 1.0, -0.7, 0.4],
];
const damp = THREE.MathUtils.damp;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Slices({ src, progress }) {
  const tex = useTexture(src);
  useMemo(() => { tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4; }, [tex]);
  const { viewport } = useThree();
  // each slice samples its own strip of the photograph
  const geos = useMemo(() => Array.from({ length: N }, (_, i) => {
    const g = new THREE.PlaneGeometry(W / N, H);
    const uv = g.attributes.uv;
    for (let k = 0; k < uv.count; k++) uv.setX(k, (i + uv.getX(k)) / N);
    return g;
  }), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geos[0]), [geos]);
  const group = useRef();
  const meshes = useRef([]);
  const lines = useRef([]);
  const p = useRef(0);

  useFrame((_, dt) => {
    p.current = damp(p.current, progress.current, 4.5, dt);
    const e = ease(Math.min(1, p.current / 0.7));
    const r = 1 - e;
    const late = Math.max(0, (p.current - 0.7) / 0.3);
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const [dx, dy, dz, ry] = SCATTER[i];
      m.position.set(-W / 2 + ((i + 0.5) * W) / N + dx * r, dy * r, dz * r);
      m.rotation.y = ry * r;
      m.material.opacity = 0.35 + 0.65 * e;
      const l = lines.current[i];
      if (l) l.material.opacity = 0.7 * r;
    });
    const g = group.current;
    // fits the photograph to the right of the copy, whatever the viewport's shape
    const fit = Math.min(1, (viewport.width * 0.56) / W);
    g.scale.setScalar(fit * (1 + late * 0.06));
    g.position.x = viewport.width / 2 - (W * fit) / 2 - viewport.width * 0.06;
    g.rotation.y = -0.62 * r;
    g.rotation.x = 0.18 * r;
  });

  return (
    <group ref={group}>
      {geos.map((geo, i) => (
        <mesh key={i} ref={(el) => (meshes.current[i] = el)} geometry={geo}>
          <meshBasicMaterial map={tex} transparent toneMapped={false} side={THREE.DoubleSide} />
          <lineSegments ref={(el) => (lines.current[i] = el)} geometry={edges}>
            <lineBasicMaterial color="#36e4d0" transparent opacity={0.7} />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}

/**
 * CryptoSouk's chart photograph cut into nine vertical slices, scattered in depth with a cyan edge
 * each — a noisy market. Scrolling (`progress`, a ref written by the section's ScrollTrigger)
 * pulls them into one calm, legible image: the brief, made visible. No React renders while scrolling.
 */
export default function AssemblyScene({ src, progress }) {
  const wrap = useRef(null);
  const on = useOnScreen(wrap, "120px");
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <Canvas frameloop={on ? "always" : "never"} dpr={[1, 1.75]} camera={{ fov: 36, position: [0, 0, 7.4] }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <Slices src={src} progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

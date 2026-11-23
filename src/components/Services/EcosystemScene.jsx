"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneBoundary from "@/components/Common/SceneBoundary";
import { UiPanel, Dust, useOnScreen } from "@/components/Common/SceneKit";

/* "Many capabilities. One digital ecosystem." A lit core — a faceted shell around a glowing heart —
   with one interface panel per discipline travelling a tilted orbit around it, each wired to the core
   by a line of light that carries pulses outward. The orbit turns on its own; scrolling widens it,
   tilts it and pushes the camera through. The panel nearest the viewer is reported via onFront. */

const KIND = { web: "browser", mobile: "mobile", ux: "wireframe", marketing: "chart", brand: "brand", commerce: "commerce", video: "video", animation: "animation" };

function Core({ progress }) {
  const shell = useRef(null), heart = useRef(null), rings = useRef(null);
  const ico = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.15, 1)), []);
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime, p = progress.current;
    shell.current.rotation.y += dt * 0.15;
    shell.current.rotation.x += dt * 0.07;
    const k = 1 + Math.sin(t * 1.6) * 0.04 + p * 0.35;
    heart.current.scale.setScalar(k);
    rings.current.rotation.z += dt * 0.1;
    rings.current.children[1].rotation.x += dt * 0.12;
  });
  return (
    <group>
      <lineSegments ref={shell} geometry={ico}><lineBasicMaterial color="#36e4d0" transparent opacity={0.75} /></lineSegments>
      <mesh ref={heart}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshBasicMaterial color="#36e4d0" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh><sphereGeometry args={[0.3, 24, 24]} /><meshBasicMaterial color="#eef1f7" toneMapped={false} /></mesh>
      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.3, 0, 0]}><torusGeometry args={[1.75, 0.006, 6, 120]} /><meshBasicMaterial color="#36e4d0" transparent opacity={0.5} /></mesh>
        <mesh rotation={[Math.PI / 1.7, 0.6, 0]}><torusGeometry args={[2.1, 0.005, 6, 120]} /><meshBasicMaterial color="#7b8cff" transparent opacity={0.35} /></mesh>
      </group>
    </group>
  );
}

function Orbit({ items, progress, pointer, small, onFront }) {
  const group = useRef(null);
  const panels = useRef([]);
  const lines = useRef(null);
  const beads = useRef(null);
  const n = items.length;
  const angle = useRef(0);
  const front = useRef(-1);
  const face = useMemo(() => new THREE.Quaternion(), []);
  const linePos = useMemo(() => new Float32Array(n * 6), [n]);
  const beadPos = useMemo(() => new Float32Array(n * 3), [n]);

  useFrame((s, dt) => {
    const p = progress.current, t = s.clock.elapsedTime;
    angle.current += dt * (0.09 + p * 0.05);
    const rx = (small ? 3.4 : 4.6) + p * 2.2, rz = (small ? 2.2 : 2.6) + p * 1.2;
    // panels face the camera: undo the group's own tilt, then take the camera's rotation
    face.copy(group.current.quaternion).invert().multiply(s.camera.quaternion);
    let best = -Infinity, bi = 0;
    panels.current.forEach((m, i) => {
      if (!m) return;
      const a = angle.current + (i / n) * Math.PI * 2;
      const x = Math.cos(a) * rx, z = Math.sin(a) * rz, y = Math.sin(a * 2 + i) * 0.45 + Math.sin(a) * (0.9 + p * 0.8);
      m.position.set(x, y, z);
      m.quaternion.copy(face);
      const sc = 0.82 + ((z / rz) + 1) * 0.16;
      m.scale.setScalar(sc);
      if (z > best) { best = z; bi = i; }
      linePos.set([0, 0, 0, x, y, z], i * 6);
      const f = (t * 0.45 + i * 0.13) % 1;
      beadPos.set([x * f, y * f, z * f], i * 3);
    });
    lines.current.geometry.attributes.position.needsUpdate = true;
    beads.current.geometry.attributes.position.needsUpdate = true;
    if (bi !== front.current) { front.current = bi; onFront?.(bi); }
    // the whole system leans with the cursor and tips as you scroll
    const g = group.current;
    g.rotation.x += ((0.18 + p * 0.35) + pointer.current.y * 0.18 - g.rotation.x) * 0.05;
    g.rotation.z += (-pointer.current.x * 0.12 - g.rotation.z) * 0.05;
  });

  return (
    <group ref={group} position={small ? [0, 1.7, 0] : [2.6, 0.4, 0]}>
      <Core progress={progress} />
      <lineSegments ref={lines}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[linePos, 3]} /></bufferGeometry>
        <lineBasicMaterial color="#36e4d0" transparent opacity={0.22} />
      </lineSegments>
      <points ref={beads}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[beadPos, 3]} /></bufferGeometry>
        <pointsMaterial size={0.12} color="#eef1f7" transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      {items.map((c, i) => (
        <UiPanel
          key={c.key}
          ref={(el) => { panels.current[i] = el; }}
          kind={KIND[c.key] || "browser"}
          label={c.short}
          w={c.key === "mobile" ? 0.95 : 2.2}
          aspect={c.key === "mobile" ? 2.05 : 0.66}
          px={c.key === "mobile" ? 320 : 512}
        />
      ))}
    </group>
  );
}

function Camera({ progress, pointer }) {
  useFrame((s) => {
    const p = progress.current, c = s.camera;
    c.position.x += (pointer.current.x * 1.2 - c.position.x) * 0.04;
    c.position.y += (1.2 - pointer.current.y * 0.6 - c.position.y) * 0.04;
    c.position.z += (13 - p * 5 - c.position.z) * 0.08;
    c.lookAt(0, 0, 0);
  });
  return null;
}

/** The Services hero's 3D ecosystem. `progress` and `pointer` are refs; `onFront(i)` fires when the nearest discipline changes. */
export default function EcosystemScene({ items, progress, pointer, small = false, onFront }) {
  const wrap = useRef(null);
  const visible = useOnScreen(wrap);
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <SceneBoundary>
        <Canvas frameloop={visible ? "always" : "never"} dpr={small ? 1 : [1, 1.6]} gl={{ alpha: true, antialias: !small, powerPreference: "high-performance" }} camera={{ position: [0, 1.2, 13], fov: 42 }}>
          <fog attach="fog" args={["#010307", 10, 24]} />
          <Camera progress={progress} pointer={pointer} />
          <Orbit items={items} progress={progress} pointer={pointer} small={small} onFront={onFront} />
          <Dust count={small ? 100 : 320} spread={[26, 14, 16]} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

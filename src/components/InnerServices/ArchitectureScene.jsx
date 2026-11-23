"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneBoundary from "@/components/Common/SceneBoundary";
import { Dust, useOnScreen } from "@/components/Common/SceneKit";

/* A digital architecture: four hexagonal platforms stacked on a lit core — one per layer of the
   stack — each ringed by nodes, one per technology. The active layer lifts and lights; the stack
   turns and opens up as the section scrolls. `progress` and `active` are refs. */

const CYAN = new THREE.Color("#36e4d0");
const DIM = new THREE.Color("#1d4f5a");

function Platform({ i, count, active, progress, radius }) {
  const g = useRef(null);
  const ring = useRef(null);
  const slab = useMemo(() => new THREE.CylinderGeometry(radius, radius, 0.12, 6), [radius]);
  const edges = useMemo(() => new THREE.EdgesGeometry(slab), [slab]);
  const nodes = useMemo(() => Array.from({ length: count }, (_, k) => (k / count) * Math.PI * 2), [count]);
  const edgeMat = useRef(null), slabMat = useRef(null);
  // one material and one box for every node on this platform, so they light together
  const nodeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: DIM.clone(), toneMapped: false }), []);
  const nodeGeo = useMemo(() => new THREE.BoxGeometry(0.12, 0.12, 0.12), []);
  useFrame((s, dt) => {
    const on = active.current === i, p = progress.current;
    const gap = 1.05 + p * 0.35;
    const y = (i - 1.5) * gap + (on ? 0.18 : 0);
    g.current.position.y += (y - g.current.position.y) * 0.08;
    const sc = on ? 1.06 : 1;
    g.current.scale.x += (sc - g.current.scale.x) * 0.08;
    g.current.scale.z = g.current.scale.x;
    ring.current.rotation.y += dt * (i % 2 ? -0.18 : 0.14) * (on ? 2 : 1);
    edgeMat.current.color.lerp(on ? CYAN : DIM, 0.08);
    edgeMat.current.opacity += ((on ? 1 : 0.5) - edgeMat.current.opacity) * 0.08;
    slabMat.current.opacity += ((on ? 0.32 : 0.12) - slabMat.current.opacity) * 0.08;
    nodeMat.color.lerp(on ? CYAN : DIM, 0.08);
  });
  return (
    <group ref={g} position={[0, (i - 1.5) * 1.05, 0]}>
      <mesh geometry={slab}><meshBasicMaterial ref={slabMat} color="#0d2a33" transparent opacity={0.12} depthWrite={false} /></mesh>
      <lineSegments geometry={edges}><lineBasicMaterial ref={edgeMat} color="#1d4f5a" transparent opacity={0.5} /></lineSegments>
      <group ref={ring}>
        {nodes.map((a, k) => (
          <mesh key={k} geometry={nodeGeo} material={nodeMat} position={[Math.cos(a) * (radius + 0.35), 0.12, Math.sin(a) * (radius + 0.35)]} />
        ))}
      </group>
    </group>
  );
}

function Core({ progress }) {
  const bead = useRef(null);
  useFrame((s) => {
    const t = (s.clock.elapsedTime * 0.35) % 1;
    const h = 2.7;
    bead.current.position.y = -h + t * h * 2;
  });
  return (
    <group>
      <mesh><cylinderGeometry args={[0.035, 0.035, 5.4, 8]} /><meshBasicMaterial color="#36e4d0" transparent opacity={0.6} toneMapped={false} /></mesh>
      <mesh><cylinderGeometry args={[0.22, 0.22, 5.4, 16, 1, true]} /><meshBasicMaterial color="#36e4d0" transparent opacity={0.06} depthWrite={false} side={THREE.DoubleSide} /></mesh>
      <mesh ref={bead}><sphereGeometry args={[0.09, 12, 12]} /><meshBasicMaterial color="#eef1f7" toneMapped={false} /></mesh>
    </group>
  );
}

function Stack({ layers, active, progress, pointer, small }) {
  const g = useRef(null);
  useFrame((s, dt) => {
    const p = progress.current;
    g.current.rotation.y += dt * 0.08;
    const tx = 0.05 + p * 0.12 + pointer.current.y * 0.1;
    g.current.rotation.x += (tx - g.current.rotation.x) * 0.05;
    g.current.rotation.z += (pointer.current.x * 0.12 - g.current.rotation.z) * 0.05;
  });
  return (
    <group ref={g} scale={small ? 0.8 : 1}>
      <Core progress={progress} />
      {layers.map((l, i) => <Platform key={l.name} i={i} count={l.items.length} active={active} progress={progress} radius={1.5 + i * 0.12} />)}
    </group>
  );
}

export default function ArchitectureScene({ layers, active, progress, pointer, small = false }) {
  const wrap = useRef(null);
  const visible = useOnScreen(wrap);
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <SceneBoundary>
        <Canvas frameloop={visible ? "always" : "never"} dpr={small ? 1 : [1, 1.6]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 4.2, 10.5], fov: 40 }} onCreated={({ camera }) => camera.lookAt(0, -0.2, 0)}>
          <Stack layers={layers} active={active} progress={progress} pointer={pointer} small={small} />
          <Dust count={small ? 60 : 160} spread={[14, 9, 8]} size={0.04} opacity={0.4} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

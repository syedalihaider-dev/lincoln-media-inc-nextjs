"use client";
import { useMemo } from "react";
import * as THREE from "three";

/* One small 3D object per service, built from primitives: dark metal bodies with cyan edges.
   Shared by the Services hero (all eight orbiting) and the capability showcase (one at a time). */

const INK = "#0b1a1c"; // teal-black: reads as the brand ink, never as blue
const CYAN = "#36e4d0";

function Edged({ geometry, position, rotation, color = INK, edge = CYAN, opacity = 0.9 }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 20), [geometry]);
  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.32} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={edge} transparent opacity={opacity} />
      </lineSegments>
    </group>
  );
}

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);

function Web() {
  const g = useMemo(() => ({ frame: box(2, 1.3, 0.08), bar: box(2, 0.16, 0.12), a: box(0.8, 0.5, 0.1), b: box(0.9, 0.08, 0.1), c: box(0.6, 0.08, 0.1) }), []);
  return (
    <group>
      <Edged geometry={g.frame} />
      <Edged geometry={g.bar} position={[0, 0.57, 0.03]} color="#0f3a38" />
      <Edged geometry={g.a} position={[-0.5, 0.05, 0.08]} color="#124a46" />
      <Edged geometry={g.b} position={[0.45, 0.2, 0.08]} />
      <Edged geometry={g.c} position={[0.3, 0.02, 0.08]} />
    </group>
  );
}
function Mobile() {
  const g = useMemo(() => ({ body: box(0.85, 1.7, 0.1), screen: box(0.72, 1.4, 0.04), btn: new THREE.CylinderGeometry(0.06, 0.06, 0.04, 20) }), []);
  return (
    <group rotation={[0, 0, -0.12]}>
      <Edged geometry={g.body} />
      <Edged geometry={g.screen} position={[0, 0.04, 0.06]} color="#0f3d3a" />
      <Edged geometry={g.btn} position={[0, -0.75, 0.06]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}
function Marketing() {
  const g = useMemo(() => [0.45, 0.75, 1.05, 1.45].map((h) => box(0.3, h, 0.3)), []);
  return (
    <group position={[0, -0.4, 0]}>
      {g.map((geo, i) => <Edged key={i} geometry={geo} position={[-0.6 + i * 0.4, geo.parameters.height / 2, 0]} color={i === 3 ? "#155a57" : INK} />)}
    </group>
  );
}
function Ux() {
  const g = useMemo(() => box(1.5, 1, 0.04), []);
  return (
    <group>
      {[0, 1, 2].map((i) => <Edged key={i} geometry={g} position={[i * 0.25 - 0.25, i * -0.2 + 0.2, i * 0.35 - 0.35]} color={i === 2 ? "#0f3d3a" : INK} opacity={0.55 + i * 0.2} />)}
    </group>
  );
}
function Commerce() {
  const g = useMemo(() => ({ bag: box(1.2, 1.3, 0.55), handle: new THREE.TorusGeometry(0.32, 0.04, 10, 40, Math.PI) }), []);
  return (
    <group position={[0, -0.15, 0]}>
      <Edged geometry={g.bag} />
      <Edged geometry={g.handle} position={[0, 0.65, 0]} color={CYAN} />
    </group>
  );
}
function Brand() {
  const g = useMemo(() => new THREE.OctahedronGeometry(0.95, 0), []);
  return <Edged geometry={g} rotation={[0.3, 0.4, 0]} color="#0f3d3a" />;
}
function Video() {
  const g = useMemo(() => ({ reel: new THREE.TorusGeometry(0.75, 0.12, 14, 48), hub: new THREE.CylinderGeometry(0.16, 0.16, 0.2, 24), hole: new THREE.CylinderGeometry(0.16, 0.16, 0.18, 20) }), []);
  return (
    <group>
      <Edged geometry={g.reel} />
      <Edged geometry={g.hub} rotation={[Math.PI / 2, 0, 0]} color="#155a57" />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return <Edged key={i} geometry={g.hole} position={[Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0]} rotation={[Math.PI / 2, 0, 0]} />;
      })}
    </group>
  );
}
function Animation() {
  const g = useMemo(() => new THREE.IcosahedronGeometry(0.9, 0), []);
  return <Edged geometry={g} color="#0d3330" />;
}

export const SHAPES = { web: Web, mobile: Mobile, marketing: Marketing, ux: Ux, commerce: Commerce, brand: Brand, video: Video, animation: Animation };

// Lights that suit the shapes: a cyan key, a cool fill, a hint of violet from below
export function ShapeLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#7ff0e2" />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color="#1fa89a" />
      <pointLight position={[0, 0, 4]} intensity={6} distance={12} color="#36e4d0" />
    </>
  );
}

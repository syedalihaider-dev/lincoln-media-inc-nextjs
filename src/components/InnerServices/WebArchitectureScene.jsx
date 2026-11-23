"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneBoundary from "@/components/Common/SceneBoundary";
import { UiPanel, GridFloor, Dust, Link, useOnScreen } from "@/components/Common/SceneKit";

/* "A digital product being constructed in 3D space": a website made of three stacked layers
   (wireframe → layout grid → finished page) with satellites around it — code, a phone, a site map,
   interface components — wired to it by lines of light. Pieces fly in from the dark and lock into
   place one after another; scrolling pulls the layers apart so you see how the page is built. */

const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

function Piece({ to, rot = [0, 0, 0], delay = 0, spread = 0, layer = 0, progress, children }) {
  const ref = useRef(null);
  const from = useMemo(() => new THREE.Vector3(to[0] * 1.6, to[1] * 1.6 - 1, to[2] - 9), [to]);
  const target = useMemo(() => new THREE.Vector3(...to), [to]);
  const seed = useMemo(() => Math.random() * 10, []);
  useFrame((s) => {
    const t = s.clock.elapsedTime, p = progress.current;
    const k = ease((t - 0.3 - delay) / 1.8);
    const g = ref.current;
    g.position.lerpVectors(from, target, k);
    // scroll: layers separate in depth, satellites drift outward
    g.position.z += layer * p * 1.8;
    g.position.x += spread * p * Math.sign(to[0] || 1) * 1.2;
    g.position.y += Math.sin(t * 0.6 + seed) * 0.06;
    g.rotation.set(rot[0] + (1 - k) * 0.6, rot[1] + (1 - k) * -0.8, rot[2]);
    g.scale.setScalar(0.6 + k * 0.4);
  });
  return <group ref={ref}>{children}</group>;
}

function Structure({ pointer, progress, small, code }) {
  const group = useRef(null);
  useFrame(() => {
    const g = group.current;
    g.rotation.y += ((small ? -0.2 : -0.32) + pointer.current.x * 0.32 - g.rotation.y) * 0.05;
    g.rotation.x += (0.05 + pointer.current.y * 0.12 - g.rotation.x) * 0.05;
  });
  const links = useMemo(() => [
    [[0, 0.3, 0], [-2.3, 2.0, 0.5]],
    [[0, 0.3, 0], [2.9, -0.9, 1.2]],
    [[0, 0.3, 0], [2.6, 2.2, -1.2]],
    [[0, 0.3, 0], [0.9, -2.05, 1.5]],
  ], []);
  return (
    <group ref={group} position={small ? [0, 1.7, -1] : [3.4, 0.3, 0]} scale={small ? 0.62 : 1}>
      {/* the page in three layers */}
      <Piece to={[0.35, 0.55, -1.4]} delay={0} layer={-1.4} progress={progress}><UiPanel kind="wireframe" w={4.4} edge={0.4} /></Piece>
      <Piece to={[0.18, 0.42, -0.7]} delay={0.25} layer={-0.7} progress={progress}><UiPanel kind="layout" w={4.4} edge={0.4} opacity={0.85} /></Piece>
      <Piece to={[0, 0.3, 0]} delay={0.5} layer={0.4} progress={progress}><UiPanel kind="browser" w={4.6} edge={0.7} label="yourbrand.com" /></Piece>
      {/* satellites */}
      <Piece to={small ? [-2.6, -1.0, 1.0] : [-2.3, 2.0, 0.5]} rot={[0, 0.3, 0]} delay={0.9} spread={1} progress={progress}><UiPanel kind="code" w={2.6} lines={code} /></Piece>
      <Piece to={[2.9, -0.9, 1.2]} rot={[0, -0.35, 0]} delay={1.1} spread={1} progress={progress}><UiPanel kind="mobile" w={1.15} aspect={2.05} px={360} /></Piece>
      {!small && <Piece to={[2.6, 2.2, -1.2]} rot={[0, -0.2, 0]} delay={1.3} spread={1} progress={progress}><UiPanel kind="sitemap" w={2.2} /></Piece>}
      {!small && <Piece to={[0.9, -2.05, 1.5]} rot={[-0.2, 0, 0]} delay={1.5} spread={1} progress={progress}><UiPanel kind="component" w={1.6} aspect={0.62} px={420} /></Piece>}
      {!small && links.map(([a, b], i) => <Link key={i} from={a} to={b} offset={i * 0.27} speed={0.32} opacity={0.22} />)}
    </group>
  );
}

function Camera({ progress, small }) {
  useFrame((s) => {
    const p = progress.current;
    s.camera.position.z += ((small ? 13 : 10.5) - p * 2.4 - s.camera.position.z) * 0.08;
    s.camera.position.y += (0.2 + p * 1.2 - s.camera.position.y) * 0.08;
    s.camera.lookAt(small ? 0 : 1.1, p * 0.7, 0);
  });
  return null;
}

/** The Web Development hero's 3D environment. `pointer` and `progress` are refs (no re-renders). */
export default function WebArchitectureScene({ pointer, progress, small = false, code }) {
  const wrap = useRef(null);
  const visible = useOnScreen(wrap);
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <SceneBoundary>
        <Canvas frameloop={visible ? "always" : "never"} dpr={small ? 1 : [1, 1.6]} gl={{ alpha: true, antialias: !small, powerPreference: "high-performance" }} camera={{ position: [0, 0.2, 10.5], fov: 40 }}>
          <fog attach="fog" args={["#03050b", 9, 26]} />
          <Camera progress={progress} small={small} />
          <Structure pointer={pointer} progress={progress} small={small} code={code} />
          <GridFloor y={-3} opacity={small ? 0.22 : 0.3} />
          <Dust count={small ? 90 : 260} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}


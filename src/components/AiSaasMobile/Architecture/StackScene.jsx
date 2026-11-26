"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { UiPanel, useOnScreen } from "@/components/Common/SceneKit";

const GAP = 0.62;
const damp = THREE.MathUtils.damp;

/** The posts that tie the layers together, growing with the stack */
function Posts({ progress, n, w, h }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const pts = [];
    for (const [x, z] of [[-w / 2, -h / 2], [w / 2, -h / 2], [-w / 2, h / 2], [w / 2, h / 2]]) pts.push(x, 0, z, x, 1, z);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [w, h]);
  useFrame((_, dt) => {
    const top = Math.max(0.001, (n - 1) * GAP * Math.min(1, progress.current * 1.08));
    ref.current.scale.y = damp(ref.current.scale.y, top, 6, dt);
  });
  return (
    <lineSegments ref={ref} geometry={geo} position={[0, -((n - 1) * GAP) / 2, 0]} scale={[1, 0.001, 1]}>
      <lineBasicMaterial color="#36e4d0" transparent opacity={0.35} />
    </lineSegments>
  );
}

function Layer({ i, n, step, progress, active }) {
  const ref = useRef();
  const target = -((n - 1) * GAP) / 2 + i * GAP;
  useFrame((_, dt) => {
    const g = ref.current;
    const shown = progress.current * n > i - 0.15; // a layer lands as its stage is reached
    const on = active.current === i;
    g.position.y = damp(g.position.y, shown ? target + (on ? 0.22 : 0) : target - 2.4, 5, dt);
    g.rotation.y = damp(g.rotation.y, shown ? 0 : -0.5, 5, dt);
    const o = shown ? (on ? 1 : 0.55) : 0;
    g.children[0].children.forEach((m) => { m.material.opacity = damp(m.material.opacity, m.type === "LineSegments" ? o * (on ? 0.9 : 0.3) : o, 6, dt); });
  });
  return (
    <group ref={ref} position={[0, target - 2.4, 0]}>
      <UiPanel kind={step.panel} label={step.label} w={4} aspect={0.62} opacity={0} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

function Rig({ progress }) {
  useFrame(({ camera, clock }, dt) => {
    const p = progress.current;
    const a = -0.6 + p * 0.9 + Math.sin(clock.elapsedTime * 0.15) * 0.04;
    const r = 8.4 - p * 0.8;
    camera.position.x = damp(camera.position.x, Math.sin(a) * r, 3, dt);
    camera.position.z = damp(camera.position.z, Math.cos(a) * r, 3, dt);
    camera.position.y = damp(camera.position.y, 4.6 - p * 1.4, 3, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * The exploded product stack: seven interface layers (canvas-drawn panels) laid flat and stacked.
 * `progress` (0–1) and `active` (index) are refs written by the section's ScrollTrigger, so scrolling
 * never re-renders React — the frame loop reads them.
 */
export default function StackScene({ steps, progress, active, small }) {
  const wrap = useRef(null);
  const on = useOnScreen(wrap, "100px");
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <Canvas frameloop={on ? "always" : "never"} dpr={small ? [1, 1.25] : [1, 1.75]} camera={{ fov: 34, position: [-4.7, 4.6, 6.8] }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Rig progress={progress} />
        {steps.map((s, i) => <Layer key={s.name} i={i} n={steps.length} step={s} progress={progress} active={active} />)}
        <Posts progress={progress} n={steps.length} w={4} h={4 * 0.62} />
      </Canvas>
    </div>
  );
}

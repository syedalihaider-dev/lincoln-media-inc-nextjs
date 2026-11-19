"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SERVICE_CATEGORIES } from "@/data/service-categories";
import SceneBoundary from "@/components/Common/SceneBoundary";
import { SHAPES, ShapeLights } from "./ServiceShapes";

// Each service object travels its own tilted ellipse around the centre, turning as it goes
function Orbiter({ Shape, i, n, progress, pointer }) {
  const g = useRef(null);
  const phase = (i / n) * Math.PI * 2;
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.16, p = progress.current;
    const a = phase + t;
    const rx = 5.4 + p * 5, ry = 2.3 + p * 1.6;
    g.current.position.set(Math.cos(a) * rx + pointer.current.x * 0.6, Math.sin(a * 1.3) * ry * 0.55 + Math.sin(a) * 0.6, Math.sin(a) * 2.6 - p * 2);
    g.current.rotation.set(t * 0.9 + i, t * 1.4 + i * 0.7, 0);
    const s = 0.62 + (Math.sin(a) + 1) * 0.12;
    g.current.scale.setScalar(s);
  });
  return <group ref={g}><Shape /></group>;
}

function Rig({ progress, pointer }) {
  useFrame((state) => {
    const p = progress.current, cam = state.camera;
    cam.position.x += (pointer.current.x * 0.8 - cam.position.x) * 0.05;
    cam.position.y += (-pointer.current.y * 0.5 - cam.position.y) * 0.05;
    cam.position.z += ((11 - p * 6) - cam.position.z) * 0.08;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

/** The Services hero's 3D environment: all eight service objects orbiting the headline. Refs only. */
export default function ServicesOrbit({ progress, pointer, small = false }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  const list = small ? SERVICE_CATEGORIES.filter((_, i) => i % 2 === 0) : SERVICE_CATEGORIES;
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <SceneBoundary>
        <Canvas frameloop={visible ? "always" : "never"} dpr={small ? 1 : [1, 1.75]} gl={{ alpha: true, antialias: !small }} camera={{ position: [0, 0, 11], fov: 42 }}>
          <ShapeLights />
          <Rig progress={progress} pointer={pointer} />
          {list.map((c, i) => <Orbiter key={c.key} Shape={SHAPES[c.key]} i={i} n={list.length} progress={progress} pointer={pointer} />)}
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

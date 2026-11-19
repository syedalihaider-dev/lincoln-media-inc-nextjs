"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import SceneBoundary from "@/components/Common/SceneBoundary";
import { SHAPES, ShapeLights } from "@/components/Services/ServiceShapes";

const LAYERS = 5;

// A stack of the service's object receding into depth — it fans apart as `progress` (scroll) grows
function Stack({ Shape, progress, pointer }) {
  const group = useRef(null);
  const layers = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime, p = progress.current;
    group.current.rotation.y += ((-0.55 + pointer.current.x * 0.5 + Math.sin(t * 0.25) * 0.08) - group.current.rotation.y) * 0.05;
    group.current.rotation.x += ((0.18 + pointer.current.y * 0.3) - group.current.rotation.x) * 0.05;
    layers.current.forEach((l, i) => {
      if (!l) return;
      const spread = 0.75 + p * 1.6;
      l.position.set(i * 0.18 * (1 + p), Math.sin(t * 0.7 + i) * 0.06 - i * 0.12, -i * spread);
      l.rotation.z = Math.sin(t * 0.3 + i * 0.6) * 0.04;
    });
  });
  return (
    <group ref={group} scale={1.25}>
      {Array.from({ length: LAYERS }, (_, i) => (
        <group key={i} ref={(el) => (layers.current[i] = el)}><Shape /></group>
      ))}
    </group>
  );
}

/** The inner-service hero's 3D layer, drawn from the service's motif (SHAPES key). Refs only. */
export default function InnerHeroScene({ motif = "web", progress, pointer, small = false }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  const Shape = SHAPES[motif] || SHAPES.web;
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <SceneBoundary>
        <Canvas frameloop={visible ? "always" : "never"} dpr={small ? 1 : [1, 1.75]} gl={{ alpha: true, antialias: !small }} camera={{ position: [0.6, 0.4, 6.2], fov: 40 }}>
          <ShapeLights />
          <Stack Shape={Shape} progress={progress} pointer={pointer} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

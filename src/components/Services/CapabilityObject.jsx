"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SERVICE_CATEGORIES } from "@/data/service-categories";
import SceneBoundary from "@/components/Common/SceneBoundary";
import { SHAPES, ShapeLights } from "./ServiceShapes";

// Each service's object: grows in and spins up when its service is on screen, shrinks away when it leaves
function Slot({ Shape, index, active, pointer }) {
  const g = useRef(null);
  useFrame((state, dt) => {
    const on = active.current === index;
    const s = g.current.scale.x + ((on ? 1.55 : 0.0001) - g.current.scale.x) * Math.min(1, dt * 5);
    g.current.scale.setScalar(s);
    g.current.rotation.y += dt * (on ? 0.5 : 2.5);
    g.current.rotation.x += ((pointer.current.y * 0.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.15) - g.current.rotation.x) * 0.05;
    g.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.08;
    g.current.visible = s > 0.01;
  });
  return <group ref={g} scale={0.0001}><Shape /></group>;
}

/** The capability showcase's 3D object: the active service's shape, turning. `active`/`pointer` are refs. */
export default function CapabilityObject({ active, pointer }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <SceneBoundary>
        <Canvas frameloop={visible ? "always" : "never"} dpr={[1, 1.75]} gl={{ alpha: true }} camera={{ position: [0, 0, 6], fov: 38 }}>
          <ShapeLights />
          {SERVICE_CATEGORIES.map((c, i) => <Slot key={c.key} Shape={SHAPES[c.key]} index={i} active={active} pointer={pointer} />)}
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

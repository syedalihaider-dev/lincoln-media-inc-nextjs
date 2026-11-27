"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useAdaptiveDpr } from "@/components/Common/AdaptiveDpr";

const CYAN = new THREE.Color("#36e4d0");
const R = 4.3; // ring radius
const H = 2.85; // panel height
const tex = (img) => img.src; // static file directly (image optimisation is off; see next.config.mjs)

// One curved panel on the ring, its photograph cropped to "cover" the arc
function Panel({ map, index, count, state }) {
  const mesh = useRef();
  const step = (Math.PI * 2) / count;
  const theta = step * 0.8;
  const arc = R * theta;

  const geo = useMemo(() => new THREE.CylinderGeometry(R, R, H, 40, 1, true, -theta / 2, theta), [theta]);
  const edge = useMemo(() => {
    // Hairline brackets top and bottom of the panel
    const pts = [];
    for (const y of [H / 2 + 0.09, -H / 2 - 0.09]) {
      for (let k = 0; k < 24; k++) {
        const a0 = -theta / 2 + (theta * k) / 24, a1 = -theta / 2 + (theta * (k + 1)) / 24;
        pts.push(new THREE.Vector3(Math.sin(a0) * R, y, Math.cos(a0) * R), new THREE.Vector3(Math.sin(a1) * R, y, Math.cos(a1) * R));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [theta]);

  useEffect(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    const ia = map.image ? map.image.width / map.image.height : 1.5;
    const pa = arc / H;
    if (ia > pa) { map.repeat.set(pa / ia, 1); map.offset.set((1 - pa / ia) / 2, 0); }
    else { map.repeat.set(1, ia / pa); map.offset.set(0, (1 - ia / pa) / 2); }
    map.needsUpdate = true;
  }, [map, arc]);

  const mat = useRef();
  const line = useRef();
  useFrame((_, dt) => {
    // Brighten the panel facing the camera, dim the rest of the ring
    const d = Math.abs(index - state.current.active);
    const target = d < 0.5 ? 1 : 0.16;
    const k = 1 - Math.pow(0.002, dt);
    mat.current.color.setScalar(mat.current.color.r + (target - mat.current.color.r) * k);
    line.current.material.opacity += ((d < 0.5 ? 0.9 : 0.15) - line.current.material.opacity) * k;
  });

  return (
    <group rotation={[0, index * step, 0]}>
      <mesh ref={mesh} geometry={geo}>
        <meshBasicMaterial ref={mat} map={map} side={THREE.FrontSide} toneMapped={false} color="#ffffff" />
      </mesh>
      <lineSegments ref={line} geometry={edge}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

function Ring({ images, state }) {
  const group = useRef();
  const maps = useTexture(images.map(tex));
  const count = images.length;
  const step = (Math.PI * 2) / count;

  const floor = useMemo(() => {
    // Instrument ring on the floor: a circle with a tick for every discipline
    const pts = [];
    const r = R + 0.55, y = -H / 2 - 0.55;
    for (let k = 0; k < 160; k++) {
      const a0 = (k / 160) * Math.PI * 2, a1 = ((k + 1) / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.sin(a0) * r, y, Math.cos(a0) * r), new THREE.Vector3(Math.sin(a1) * r, y, Math.cos(a1) * r));
    }
    for (let i = 0; i < count; i++) {
      const a = i * step;
      pts.push(new THREE.Vector3(Math.sin(a) * r, y, Math.cos(a) * r), new THREE.Vector3(Math.sin(a) * (r + 0.35), y, Math.cos(a) * (r + 0.35)));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [count, step]);

  useFrame((_, dt) => {
    const s = state.current;
    const k = 1 - Math.pow(0.004, dt);
    // Continuous with the scroll (s.turn), so the ring moves *with* the visitor, not on a timer
    const targetY = -s.turn * step;
    group.current.rotation.y += (targetY - group.current.rotation.y) * k;
    group.current.rotation.x += ((0.06 + s.py * 0.08) - group.current.rotation.x) * k * 0.5;
    group.current.position.x += (s.px * -0.3 - group.current.position.x) * k * 0.5;
  });

  return (
    <group ref={group}>
      {maps.map((m, i) => <Panel key={i} map={m} index={i} count={count} state={state} />)}
      <lineSegments geometry={floor}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

/**
 * Services carousel. `state` is a ref Services.jsx writes into:
 *   turn (fractional index the ring faces, follows the scroll), active (integer index), px/py pointer
 */
export default function ServicesRing({ images, state }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(false);
  const [dpr, monitor] = useAdaptiveDpr(1.75);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={dpr}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 30, position: [0, 0.7, R + 9.6], near: 0.1, far: 40 }}
        onCreated={({ camera }) => camera.lookAt(0, -0.15, R)}
        aria-hidden="true"
      >
        {monitor}
        <Suspense fallback={null}>
          <Ring images={images} state={state} />
        </Suspense>
      </Canvas>
    </div>
  );
}

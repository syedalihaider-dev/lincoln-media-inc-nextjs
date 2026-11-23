"use client";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { drawPanel } from "@/lib/uiCanvas";

/* Shared parts for the services' 3D scenes: interface panels, a travelling grid floor, drifting dust,
   and a hook that stops a canvas from rendering while it is off screen. */

/** true while `ref` is on screen — pass to <Canvas frameloop={visible ? "always" : "never"}> */
export function useOnScreen(ref, margin = "0px") {
  const [on, setOn] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, margin]);
  return on;
}

/** A flat interface panel (see src/lib/uiCanvas.js) with a faint cyan edge. `w` is its width in world units. */
export const UiPanel = forwardRef(function UiPanel({ kind, w = 3, label, lines, px = 640, aspect = 0.66, opacity = 1, edge = 0.5, ...rest }, ref) {
  const h = w * aspect;
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(drawPanel(kind, { width: px, height: Math.round(px * aspect), label, lines }));
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [kind, px, aspect, label, lines]);
  const geo = useMemo(() => new THREE.PlaneGeometry(w, h), [w, h]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  useEffect(() => () => { tex.dispose(); geo.dispose(); edges.dispose(); }, [tex, geo, edges]);
  return (
    <group ref={ref} {...rest}>
      <mesh geometry={geo}>
        <meshBasicMaterial map={tex} transparent opacity={opacity} toneMapped={false} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {edge > 0 && (
        <lineSegments geometry={edges} scale={[1.004, 1.006, 1]}>
          <lineBasicMaterial color="#36e4d0" transparent opacity={edge * opacity} />
        </lineSegments>
      )}
    </group>
  );
});

const gridVert = /* glsl */ `
  varying vec2 vUv; varying vec3 vPos;
  void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const gridFrag = /* glsl */ `
  uniform float uTime; uniform float uSpeed; uniform float uOpacity;
  varying vec2 vUv; varying vec3 vPos;
  float line(float v, float w) { float d = abs(fract(v) - 0.5); return smoothstep(w, 0.0, 0.5 - d); }
  void main() {
    vec2 p = vPos.xy * 0.5;
    p.y += uTime * uSpeed;
    float g = max(line(p.x, 0.035), line(p.y, 0.035));
    float fade = smoothstep(0.0, 0.45, vUv.y) * smoothstep(1.0, 0.55, vUv.y) * (1.0 - abs(vUv.x - 0.5) * 1.6);
    gl_FragColor = vec4(vec3(0.21, 0.89, 0.82), g * fade * uOpacity);
  }`;

/** A floor of cyan grid lines flowing toward the viewer */
export function GridFloor({ y = -2.6, size = 60, speed = 0.35, opacity = 0.35 }) {
  const mat = useRef(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uSpeed: { value: speed }, uOpacity: { value: opacity } }), [speed, opacity]);
  useFrame((s) => { mat.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -size * 0.3]}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial ref={mat} vertexShader={gridVert} fragmentShader={gridFrag} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}

/** Slow motes of light rising through the scene */
export function Dust({ count = 300, spread = [22, 12, 14], size = 0.05, color = "#bff7ef", opacity = 0.55 }) {
  const ref = useRef(null);
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) a.set([(Math.random() - 0.5) * spread[0], (Math.random() - 0.5) * spread[1], (Math.random() - 0.5) * spread[2] - 2], i * 3);
    return a;
  }, [count, spread]);
  useFrame((_, dt) => {
    const a = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = a.array[i * 3 + 1] + dt * 0.18;
      if (y > spread[1] / 2) y = -spread[1] / 2;
      a.array[i * 3 + 1] = y;
    }
    a.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

/** A line between two points with a bead of light travelling along it */
export function Link({ from, to, speed = 0.4, offset = 0, opacity = 0.35 }) {
  const bead = useRef(null);
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints([a, b]), [a, b]);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((s) => {
    const t = (s.clock.elapsedTime * speed + offset) % 1;
    bead.current.position.lerpVectors(a, b, t);
    bead.current.material.opacity = Math.sin(t * Math.PI);
  });
  return (
    <group>
      <line geometry={geo}>
        <lineBasicMaterial color="#36e4d0" transparent opacity={opacity} />
      </line>
      <mesh ref={bead}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#eef1f7" transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

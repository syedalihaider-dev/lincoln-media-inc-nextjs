"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneBoundary from "@/components/Common/SceneBoundary";

/* "A digital world being constructed behind the typography": a field of points rippling like a
   surface of data, wireframe blocks rising out of it as if being built, and light travelling along
   its grid lines. One draw call for the field (a small shader), a handful of line meshes. */

const COLS = 120, ROWS = 46, GAP = 0.26;

const vert = /* glsl */ `
  uniform float uTime; uniform vec2 uMouse; uniform float uBuild;
  attribute float aSeed;
  varying float vAlpha; varying float vLift;
  void main() {
    vec3 p = position;
    float w = sin(p.x * 0.55 + uTime * 0.6) * 0.16 + sin(p.z * 0.9 + uTime * 0.45) * 0.12;
    float d = distance(p.xz, uMouse);
    float bump = exp(-d * d * 0.35) * 0.55;
    p.y += (w + bump) * uBuild;
    vLift = bump;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + aSeed * 1.6 + bump * 6.0) * (8.0 / -mv.z);
    vAlpha = smoothstep(26.0, 6.0, -mv.z) * (0.35 + aSeed * 0.5) * uBuild;
  }`;
const frag = /* glsl */ `
  varying float vAlpha; varying float vLift;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    vec3 col = mix(vec3(0.21, 0.89, 0.82), vec3(0.93, 0.95, 0.97), vLift);
    gl_FragColor = vec4(col, vAlpha);
  }`;

function Field({ pointer, progress }) {
  const mat = useRef(null);
  const geo = useMemo(() => {
    const pos = new Float32Array(COLS * ROWS * 3), seed = new Float32Array(COLS * ROWS);
    let k = 0;
    for (let z = 0; z < ROWS; z++) for (let x = 0; x < COLS; x++) {
      pos.set([(x - COLS / 2) * GAP, 0, -z * GAP + 2], k * 3);
      seed[k++] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, -3) }, uBuild: { value: 0 } }), []);
  useFrame((state, dt) => {
    const u = mat.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uBuild.value = Math.min(1, u.uBuild.value + dt * 0.6);
    u.uMouse.value.lerp(new THREE.Vector2(pointer.current.x * 14, -3 - pointer.current.y * 6), 0.06);
    state.camera.position.y += ((2.4 + progress.current * 1.6) - state.camera.position.y) * 0.06;
    state.camera.position.x += (pointer.current.x * 0.8 - state.camera.position.x) * 0.04;
    state.camera.lookAt(0, 0, -5);
  });
  return (
    <points geometry={geo}>
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// Wireframe blocks rising out of the field one after another — the "construction"
function Blocks({ progress }) {
  const group = useRef(null);
  const blocks = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: 16 }, (_, i) => ({ x: r(-12, 12), z: r(-9, -2), w: r(0.6, 1.8), d: r(0.5, 1.4), h: r(0.6, 3.2), delay: i * 0.18 + r(0, 0.4) }));
  }, []);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.children.forEach((m, i) => {
      const b = blocks[i];
      const grow = THREE.MathUtils.clamp((t - 0.6 - b.delay) / 1.4, 0, 1);
      const e = 1 - Math.pow(1 - grow, 3);
      const h = Math.max(0.001, b.h * e * (1 + progress.current * 0.5));
      m.scale.set(b.w, h, b.d);
      m.position.set(b.x, h / 2, b.z);
      m.material.opacity = 0.18 + e * 0.35;
    });
  });
  return (
    <group ref={group}>
      {blocks.map((b, i) => (
        <lineSegments key={i} geometry={edges}>
          <lineBasicMaterial color="#36e4d0" transparent opacity={0} />
        </lineSegments>
      ))}
    </group>
  );
}

// Light running along the grid lines
function Trails() {
  const ref = useRef(null);
  const N = 18;
  const data = useMemo(() => Array.from({ length: N }, () => ({ z: -Math.floor(Math.random() * ROWS) * GAP + 2, speed: 2 + Math.random() * 4, offset: Math.random() * 40, dir: Math.random() > 0.5 ? 1 : -1 })), []);
  const pos = useMemo(() => new Float32Array(N * 3), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime, half = (COLS / 2) * GAP;
    data.forEach((d, i) => {
      const x = (((t * d.speed + d.offset) % (half * 2)) - half) * d.dir;
      pos.set([x, 0.02, d.z], i * 3);
    });
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial size={0.16} color="#eef1f7" transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/** The inner-service hero's background. `pointer` and `progress` are refs (no re-renders). */
export default function InnerHeroField({ pointer, progress, small = false }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <SceneBoundary>
        <Canvas frameloop={visible ? "always" : "never"} dpr={small ? 1 : [1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 2.4, 6], fov: 50 }}>
          <Field pointer={pointer} progress={progress} />
          <Blocks progress={progress} />
          {!small && <Trails />}
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

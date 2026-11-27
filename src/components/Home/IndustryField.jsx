"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { INDUSTRIES } from "@/data/home";
import { useAdaptiveDpr } from "@/components/Common/AdaptiveDpr";

const CYAN = new THREE.Color("#36e4d0");
const CYAN_2 = new THREE.Color("#7ff0e2");
const VIOLET = new THREE.Color("#3b5bff");
const N = 2400; // particles shared by every shape
const DUST = 0.16; // share of particles that drift around the drawing instead of tracing it
const SPAN = 2.3; // world units across the 24-unit icon grid

/* Each industry's line icon (the same paths the old cards drew) sampled into N points in 3D:
   points follow the strokes with a little depth, the rest is loose dust around them. */
function sampleShapes() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  document.body.appendChild(svg);
  const shapes = INDUSTRIES.map((ind, s) => {
    const paths = ind.icon.map((d) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
      return { p, len: p.getTotalLength() };
    });
    const total = paths.reduce((a, x) => a + x.len, 0);
    const out = new Float32Array(N * 3);
    const lineCount = Math.round(N * (1 - DUST));
    let rnd = mulberry(s * 977 + 13);
    for (let i = 0; i < N; i++) {
      let x, y, z;
      if (i < lineCount) {
        // Walk the strokes evenly, with slight jitter so the line has a body
        let at = (i / lineCount) * total;
        const seg = paths.find((q) => (at <= q.len ? true : ((at -= q.len), false))) || paths[paths.length - 1];
        const pt = seg.p.getPointAtLength(Math.min(at, seg.len));
        x = pt.x + (rnd() - 0.5) * 0.35;
        y = pt.y + (rnd() - 0.5) * 0.35;
        z = (rnd() - 0.5) * 2.2;
      } else {
        // Dust: a loose halo around the drawing, deeper in z
        const a = rnd() * Math.PI * 2, r = 7 + rnd() * 9;
        x = 12 + Math.cos(a) * r;
        y = 12 + Math.sin(a) * r * 0.8;
        z = (rnd() - 0.5) * 9;
      }
      out[i * 3] = ((x - 12) / 24) * SPAN;
      out[i * 3 + 1] = (-(y - 12) / 24) * SPAN;
      out[i * 3 + 2] = (z / 24) * SPAN;
    }
    paths.forEach(({ p }) => p.remove());
    return out;
  });
  svg.remove();
  return shapes;
}

// Small seeded random so each shape samples the same way every visit
function mulberry(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Constellation({ shapes, active, pointer, progress }) {
  const points = useRef(null);
  const group = useRef(null);
  const { positions, colors, speed } = useMemo(() => {
    const positions = new Float32Array(shapes[0]);
    const colors = new Float32Array(N * 3);
    const speed = new Float32Array(N);
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      c.copy(CYAN).lerp(i % 7 === 0 ? VIOLET : CYAN_2, Math.random() * 0.8);
      colors.set([c.r, c.g, c.b], i * 3);
      speed[i] = 0.025 + Math.random() * 0.06; // each particle travels at its own pace: the morph ripples
    }
    return { positions, colors, speed };
  }, [shapes]);

  const local = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, dt) => {
    const g = group.current, attr = points.current?.geometry.attributes.position;
    if (!g || !attr) return;
    const t = state.clock.elapsedTime;
    const target = shapes[active.current] || shapes[0];
    const px = pointer.current.x, py = pointer.current.y, inside = pointer.current.inside;
    // Cursor position in the drawing's plane (undo the group's tilt roughly by working in screen space)
    local.set(px * 2.2, py * 1.5, 0);
    const k = Math.min(1, dt * 60);
    const arr = attr.array;
    for (let i = 0; i < N; i++) {
      const j = i * 3;
      let tx = target[j], ty = target[j + 1];
      const tz = target[j + 2];
      if (inside) {
        // Particles part around the cursor like dust around a hand
        const dx = tx - local.x, dy = ty - local.y, d2 = dx * dx + dy * dy;
        if (d2 < 0.36) { const f = (0.36 - d2) * 1.6; tx += dx * f; ty += dy * f; }
      }
      const s = speed[i] * k;
      arr[j] += (tx - arr[j]) * s;
      arr[j + 1] += (ty - arr[j + 1]) * s + Math.sin(t * 0.9 + i) * 0.0006;
      arr[j + 2] += (tz - arr[j + 2]) * s;
    }
    attr.needsUpdate = true;
    // Slow turn, steered by the cursor and by how far through the chapter we are
    const turn = Math.sin(t * 0.25) * 0.22 + px * 0.35 + (progress.current - 0.5) * 0.6;
    g.rotation.y += (turn - g.rotation.y) * 0.05;
    g.rotation.x += (-py * 0.22 - g.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.021} sizeAttenuation vertexColors transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

/**
 * The 3D layer of the Industries chapter: each industry's line icon rebuilt as a cloud of cyan
 * particles that re-forms into the next industry as the chapter scrolls, and parts around the cursor.
 * `active`, `pointer` and `progress` are refs, so scrolling never re-renders React.
 */
export default function IndustryField({ active, pointer, progress }) {
  const wrap = useRef(null);
  const [shapes, setShapes] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dpr, monitor] = useAdaptiveDpr(1.75);

  useEffect(() => setShapes(sampleShapes()), []);
  // Only render frames while the chapter is on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      {shapes && (
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={dpr}
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 4.2], fov: 40 }}
        >
          {monitor}
          <Constellation shapes={shapes} active={active} pointer={pointer} progress={progress} />
        </Canvas>
      )}
    </div>
  );
}

"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STACK } from "@/data/home";

const CYAN = new THREE.Color("#36e4d0");
const VIOLET = new THREE.Color("#3b5bff");
const PAPER = new THREE.Color("#eef1f7");
const rnd = (i, k) => Math.sin(i * 127.1 + k * 311.7) * 0.5 + 0.5; // stable pseudo-random

// Hubs on a sphere (one per stack group), each technology a node orbiting its hub
function useLayout() {
  return useMemo(() => {
    const n = STACK.length, R = 2.15;
    return STACK.map((g, gi) => {
      const y = 1 - ((gi + 0.5) / n) * 2, r = Math.sqrt(1 - y * y), th = gi * Math.PI * (3 - Math.sqrt(5));
      const hub = new THREE.Vector3(Math.cos(th) * r * R, y * R * 0.8, Math.sin(th) * r * R);
      const items = g.items.map((name, ii) => {
        const a = (ii / g.items.length) * Math.PI * 2 + rnd(gi, ii);
        const d = 0.55 + rnd(ii, gi) * 0.45;
        const off = new THREE.Vector3(Math.cos(a) * d, Math.sin(a) * d * 0.8, (rnd(gi + ii, 3) - 0.5) * 0.8);
        return { name, pos: hub.clone().add(off) };
      });
      return { group: g.group, hub, items };
    });
  }, []);
}

function Cluster({ data, index, state }) {
  const lines = useRef(), nodes = useRef(), hubMesh = useRef();
  const { geoLines, geoNodes } = useMemo(() => {
    const pts = [];
    data.items.forEach((it) => pts.push(data.hub, it.pos));
    pts.push(data.hub, new THREE.Vector3(0, 0, 0)); // spoke to the core
    const gl = new THREE.BufferGeometry().setFromPoints(pts);
    const gn = new THREE.BufferGeometry().setFromPoints(data.items.map((i) => i.pos));
    return { geoLines: gl, geoNodes: gn };
  }, [data]);

  useFrame((_, dt) => {
    const f = state.current.focus;
    const on = f === index, off = f > -1 && !on;
    const k = 1 - Math.pow(0.003, dt);
    const lm = lines.current.material, nm = nodes.current.material;
    lm.opacity += ((on ? 0.85 : off ? 0.08 : 0.32) - lm.opacity) * k;
    nm.size += ((on ? 0.14 : 0.075) - nm.size) * k;
    nm.color.lerp(on ? CYAN : off ? VIOLET : PAPER, k);
    hubMesh.current.scale.setScalar(hubMesh.current.scale.x + ((on ? 1.8 : 1) - hubMesh.current.scale.x) * k);
  });

  return (
    <group>
      <lineSegments ref={lines} geometry={geoLines}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.32} depthWrite={false} />
      </lineSegments>
      <points ref={nodes} geometry={geoNodes}>
        <pointsMaterial color={PAPER} size={0.075} sizeAttenuation transparent depthWrite={false} />
      </points>
      <mesh ref={hubMesh} position={data.hub}>
        <octahedronGeometry args={[0.07, 0]} />
        <meshBasicMaterial color={CYAN} wireframe />
      </mesh>
    </group>
  );
}

// Data pulses running from every hub into the core and back out
function Pulses({ layout }) {
  const ref = useRef();
  const count = layout.length * 3;
  const pos = useMemo(() => new Float32Array(count * 3), [count]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const hub = layout[i % layout.length].hub;
      const u = (t * 0.32 + i * 0.37) % 1;
      const w = i % 2 ? u : 1 - u;
      pos[i * 3] = hub.x * w; pos[i * 3 + 1] = hub.y * w; pos[i * 3 + 2] = hub.z * w;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial color={CYAN} size={0.09} sizeAttenuation transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

const tmp = new THREE.Vector3();

function Network({ state, labels }) {
  const layout = useLayout();
  const root = useRef(), core = useRef();
  const dust = useMemo(() => {
    const n = 700, p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 3 + rnd(i, 1) * 4, a = rnd(i, 2) * Math.PI * 2, b = Math.acos(2 * rnd(i, 3) - 1);
      p.set([r * Math.sin(b) * Math.cos(a), r * Math.cos(b), r * Math.sin(b) * Math.sin(a)], i * 3);
    }
    return p;
  }, []);

  useFrame(({ clock, camera, size }, dt) => {
    const s = state.current, t = clock.elapsedTime;
    const k = 1 - Math.pow(0.01, dt);
    let ty, tx;
    if (s.focus > -1) {
      // Swing the chosen cluster round to face the visitor
      const h = layout[s.focus].hub;
      ty = -Math.atan2(h.x, h.z);
      tx = Math.atan2(h.y, Math.hypot(h.x, h.z)) * 0.8;
    } else {
      ty = t * 0.06 + s.progress * 2.2 + s.px * 0.6;
      tx = 0.15 + s.py * 0.3;
    }
    // Unwrap so the shortest way round is taken
    const cur = root.current.rotation.y;
    ty = cur + Math.atan2(Math.sin(ty - cur), Math.cos(ty - cur));
    root.current.rotation.y += (ty - cur) * k;
    root.current.rotation.x += (tx - root.current.rotation.x) * k;
    core.current.rotation.y = t * 0.4;
    core.current.rotation.z = t * 0.25;

    // Pin the DOM labels (rendered by Technology.jsx) to their nodes: project each into screen space
    const box = labels?.current;
    if (!box) return;
    root.current.updateMatrixWorld();
    for (const el of box.children) {
      const g = +el.dataset.g, i = el.dataset.i;
      const p = i === undefined ? layout[g]?.hub : layout[g]?.items[+i]?.pos;
      if (!p) continue;
      tmp.copy(p).applyMatrix4(root.current.matrixWorld);
      const back = tmp.z < -0.4; // behind the core
      tmp.project(camera);
      el.style.transform = `translate3d(${((tmp.x + 1) / 2) * size.width}px, ${((1 - tmp.y) / 2) * size.height}px, 0)`;
      el.style.opacity = back ? 0.25 : 1;
    }
  });

  return (
    <group ref={root}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.9} />
      </mesh>
      {layout.map((d, i) => <Cluster key={d.group} data={d} index={i} state={state} />)}
      <Pulses layout={layout} />
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[dust, 3]} /></bufferGeometry>
        <pointsMaterial color={VIOLET} size={0.025} sizeAttenuation transparent opacity={0.6} depthWrite={false} />
      </points>
    </group>
  );
}

/**
 * The stack as a living network. `state` is a ref Technology.jsx writes into:
 *   progress 0–1 (scroll), focus (-1 or the hovered stack group), px/py pointer.
 * `labels` is a ref to a DOM layer whose children carry data-g (group) and optional data-i (item).
 */
export default function TechNetwork({ state, labels, frameloop = "always" }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8.8], fov: 40 }} gl={{ antialias: true, alpha: true }} frameloop={frameloop} aria-hidden="true">
      <Network state={state} labels={labels} />
    </Canvas>
  );
}

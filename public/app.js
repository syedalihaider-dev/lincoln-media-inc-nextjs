/* The Lincoln Media — immersive guide experience
 * - Futuristic background (nebula, perspective grid, stars) rendered in a full-screen shader
 * - Particle orb that tilts toward the cursor; its surface ripples and a ring of sound waves
 *   around it moves with the guide's voice
 * - A soft female guide (Kokoro voice) whose words appear on screen as she speaks them
 * - Replies to each answer; says the visitor's name live when the in-browser voice model is ready
 */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  // Bump when the recorded voice clips are regenerated so browsers fetch the new audio
  const VOICE_VERSION = 6;
  const clipUrl = (key) => `assets/voice/${key}.mp3?v=${VOICE_VERSION}`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LINES = window.VOICE_LINES || {};
  // Recorded clips are fetched a step ahead of when the guide speaks them (in the order she uses them)
  // and kept in memory, so each line starts the moment it's due instead of waiting on the network.
  const clipBlobs = new Map(), clipJobs = new Map();
  function preloadClips(keys) {
    let chain = Promise.resolve();
    keys.filter((k) => LINES[k] && !clipJobs.has(k)).forEach((k) => {
      const job = chain
        .then(() => fetch(clipUrl(k)))
        .then((r) => (r.ok ? r.blob() : null))
        .then((b) => { if (b) clipBlobs.set(k, URL.createObjectURL(b)); else clipJobs.delete(k); })
        .catch(() => clipJobs.delete(k));
      clipJobs.set(k, job);
      chain = job;
    });
    return chain;
  }
  const clipSrc = (key) => clipBlobs.get(key) || clipUrl(key);
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* =====================================================================
   * 1. RENDERER + FUTURISTIC BACKGROUND
   * ===================================================================== */
  const COUNT = innerWidth < 700 ? 12000 : 26000;
  const renderer = new THREE.WebGLRenderer({ canvas: $("#field"), antialias: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.autoClear = false;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 7;

  const bgScene = new THREE.Scene(), bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const bgUniforms = {
    uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uMouse: { value: new THREE.Vector2() },
    uColA: { value: new THREE.Color("#36e4d0") }, uColB: { value: new THREE.Color("#3b5bff") }, uLevel: { value: 0 },
    uSite: { value: 0 }, // 0 = experience background, 1 = the website's plain near-black
  };
  const bgMat = new THREE.ShaderMaterial({
    uniforms: bgUniforms, depthTest: false, depthWrite: false,
    extensions: { derivatives: true },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: `
      varying vec2 vUv; uniform float uTime, uLevel, uSite; uniform vec2 uRes, uMouse; uniform vec3 uColA, uColB;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.03; a *= .5; } return v; }
      void main(){
        vec2 uv = vUv; float asp = uRes.x / uRes.y;
        vec2 p = (uv - .5) * vec2(asp, 1.) + uMouse * .05;
        vec3 col = vec3(.010, .014, .032);
        // drifting nebula
        float n = fbm(p * 1.5 + vec2(uTime * .012, -uTime * .008));
        float n2 = fbm(p * 3.0 - vec2(uTime * .018, 0.) + n * 1.4);
        col += uColB * pow(n2, 2.6) * .42;
        col += uColA * pow(fbm(p * 2.1 + n2 + uTime * .01), 3.4) * .30;
        // halo behind the head, brighter while the guide speaks
        col += mix(uColA, uColB, .45) * .14 * exp(-dot(p, p) * 2.2) * (1. + uLevel * 1.8);
        // perspective grid floor moving toward the viewer
        float horizon = .34;
        if (uv.y < horizon) {
          float d = horizon - uv.y;
          float z = .16 / d;
          vec2 g = vec2((uv.x - .5) * asp * z, z + uTime * .45);
          vec2 gl = abs(fract(g) - .5) / fwidth(g);
          float line = 1. - min(min(gl.x, gl.y), 1.);
          float fade = smoothstep(0., .22, d) * exp(-z * .09);
          col += mix(uColA, uColB, .3) * line * fade * .38;
          col += uColB * .05 * fade;
        }
        // horizon glow line
        col += uColA * .35 * exp(-abs(uv.y - horizon) * 120.) * smoothstep(0., .6, 1. - abs(uv.x - .5) * 1.5);
        // twinkling stars above the horizon
        vec2 sg = floor(uv * uRes / 2.5);
        float s = hash(sg); float tw = .5 + .5 * sin(uTime * 2.2 + s * 60.);
        col += vec3(.75, .9, 1.) * step(.9986, s) * tw * smoothstep(horizon, horizon + .12, uv.y);
        // slow scanning light bar
        col += uColA * .045 * smoothstep(.012, 0., abs(uv.y - fract(uTime * .035)));
        // vignette
        vec2 v = (uv - .5) * vec2(1.05, 1.25);
        col *= 1. - dot(v, v) * 1.15;
        col = mix(col, vec3(.043, .039, .059), uSite);
        float st = hash(floor(uv * uRes / 3.));
        col += vec3(.8, .8, .85) * step(.9982, st) * (.5 + .5 * sin(uTime * 1.6 + st * 80.)) * uSite * .7;
        gl_FragColor = vec4(col, 1.);
      }`,
  });
  bgScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat));

  /* =====================================================================
   * 2. PARTICLE SHAPES
   * ===================================================================== */
  const rnd = (a = 1) => (Math.random() * 2 - 1) * a;
  const shapes = {
    neural(i) {
      const layers = 5, perLayer = 9, L = i % layers, N = (i * 7) % perLayer;
      const x = (L - 2) * 1.25, y = (N - 4) * 0.48 * (L % 2 ? 0.8 : 1);
      if (i % 4 === 0) {
        const L2 = Math.min(L + 1, layers - 1), N2 = (i * 13) % perLayer, t = Math.random();
        const x2 = (L2 - 2) * 1.25, y2 = (N2 - 4) * 0.48 * (L2 % 2 ? 0.8 : 1);
        return [x + (x2 - x) * t, y + (y2 - y) * t, rnd(0.05)];
      }
      return [x + rnd(0.08), y + rnd(0.08), rnd(0.08)];
    },
    grid(i) {
      const plane = i % 3, along = Math.random() - 0.5, line = Math.floor(Math.random() * 9) / 8 - 0.5;
      const [gx, gy] = i % 2 ? [line, along] : [along, line];
      return [gx * 4.4 + (plane - 1) * 0.35, gy * 2.8 + (plane - 1) * 0.35, (plane - 1) * 0.9 + rnd(0.02)];
    },
    phone(i) {
      const w = 1.7, h = 3.4;
      if (i % 3 === 0) {
        const t = Math.random() * 2 * (w + h); let x, y;
        if (t < w) { x = t - w / 2; y = h / 2; }
        else if (t < w + h) { x = w / 2; y = h / 2 - (t - w); }
        else if (t < 2 * w + h) { x = w / 2 - (t - w - h); y = -h / 2; }
        else { x = -w / 2; y = -h / 2 + (t - 2 * w - h); }
        return [x, y, rnd(0.04)];
      }
      return [rnd(w / 2 - 0.12), rnd(h / 2 - 0.25), rnd(0.12)];
    },
    helix(i) {
      const t = (i / COUNT) * Math.PI * 14, s = i % 2 ? Math.PI : 0;
      return [Math.cos(t + s) * 1.3 + rnd(0.05), (i / COUNT - 0.5) * 6, Math.sin(t + s) * 1.3 + rnd(0.05)];
    },
    drift() { return [rnd(9), rnd(5.5), rnd(4) - 2]; },
  };
  const makeShape = (fn) => { const a = new Float32Array(COUNT * 3); for (let i = 0; i < COUNT; i++) a.set(fn(i), i * 3); return a; };
  const targets = Object.fromEntries(Object.keys(shapes).map((k) => [k, makeShape(shapes[k])]));

  // The orb: a glowing particle shell, a faint inner core, and two thin orbit rings.
  // Normals point outward; their length marks the layer (1 = shell/rings, .4 = inner dust).
  const ORB_R = 1.8;
  const orbNormals = new Float32Array(COUNT * 3);
  targets.orb = (() => {
    const a = new Float32Array(COUNT * 3), golden = Math.PI * (3 - Math.sqrt(5));
    const nShell = Math.floor(COUNT * 0.72), nRing = Math.floor(COUNT * 0.08);
    const tilt = (v, ax, az) => {
      let [x, y, z] = v; const cx = Math.cos(ax), sx = Math.sin(ax), cz = Math.cos(az), sz = Math.sin(az);
      [y, z] = [y * cx - z * sx, y * sx + z * cx];
      return [x * cz - y * sz, x * sz + y * cz, z];
    };
    for (let i = 0; i < COUNT; i++) {
      let p, n;
      if (i < nShell) {
        // Evenly spread over the sphere (Fibonacci lattice) with a little jitter so it reads as particles, not a grid
        const y = 1 - (i / (nShell - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
        n = [Math.cos(th) * r, y, Math.sin(th) * r];
        const rr = ORB_R * (1 + rnd(0.012));
        p = n.map((c) => c * rr + rnd(0.006));
      } else if (i < nShell + nRing) {
        const k = i - nShell, which = k % 2, th = Math.random() * Math.PI * 2;
        const R = ORB_R * (which ? 1.22 : 1.32) + rnd(0.008);
        n = tilt([Math.cos(th), 0, Math.sin(th)], which ? 1.15 : -0.95, which ? 0.35 : -0.5);
        p = n.map((c) => c * R);
      } else {
        const z = rnd(1), th = Math.random() * Math.PI * 2, sq = Math.sqrt(1 - z * z);
        const dir = [sq * Math.cos(th), sq * Math.sin(th), z], r = ORB_R * 0.92 * Math.pow(Math.random(), 0.6);
        p = dir.map((c) => c * r); n = dir.map((c) => c * 0.4);
      }
      a.set(p, i * 3); orbNormals.set(n, i * 3);
    }
    return a;
  })();

  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(targets.orb);
  const seeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) seeds[i] = Math.random();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(orbNormals, 3));
  geo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

  const uniforms = {
    uTime: { value: 0 }, uSize: { value: 3.4 * renderer.getPixelRatio() }, uPulse: { value: 0 },
    uColA: { value: new THREE.Color("#36e4d0") }, uColB: { value: new THREE.Color("#3b5bff") },
    uLit: { value: 1 },            // 1 = orb (lit, rippling), 0 = flat glow (other shapes)
    uVoice: { value: 0 },          // 0..1 voice loudness
  };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float seed;
      uniform float uTime, uSize, uPulse, uLit, uVoice;
      varying float vSeed, vDepth, vLight, vRim;
      void main(){
        vec3 p = position;
        vec3 n = normalize(normal + 1e-5);
        float shell = smoothstep(.6, .9, length(normal));
        // Surface waves race across the orb while she speaks; it breathes gently when quiet
        float w = .55 * sin(n.y * 7. + uTime * 5.2) + .45 * sin(dot(n, vec3(.8, .3, .55)) * 11. - uTime * 6.7);
        float breathe = .018 * sin(uTime * 1.3 + seed * 6.28) + .02 * sin(uTime * .8);
        p += n * uLit * (uVoice * (.2 * w * shell + .1) + breathe);
        // Inner dust swirls slowly
        p += (1. - shell) * uLit * .05 * vec3(sin(uTime*.9+seed*40.), cos(uTime*.7+seed*30.), sin(uTime*.6+seed*20.));
        p += .06 * (1. - uLit) * vec3(sin(uTime*.7+seed*40.), cos(uTime*.6+seed*30.), sin(uTime*.5+seed*20.));
        p *= 1. + uPulse * .06 * sin(seed*6.28 + uTime*3.);
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        gl_Position = projectionMatrix * mv;
        vec3 nv = normalize(normalMatrix * n);
        float key = max(dot(nv, normalize(vec3(-.5, .55, .7))), 0.);
        vRim = pow(1. - abs(nv.z), 3.) * shell;
        // Bright glowing edge (fresnel), softer face, dim core; everything lifts when she speaks
        float lit = (.16 + key * .75 + vRim * 1.5) * mix(.55, 1., shell) * (1. + uVoice * .7);
        vLight = mix(1., lit, uLit);
        gl_PointSize = uSize * (.6 + seed) * (6. / -mv.z) * mix(1., .8 + vRim * .6, uLit);
        vSeed = seed; vDepth = -mv.z;
      }`,
    fragmentShader: `
      uniform vec3 uColA, uColB; uniform float uLit; varying float vSeed, vDepth, vLight, vRim;
      void main(){
        float d = length(gl_PointCoord - .5); if (d > .5) discard;
        float a = smoothstep(.5, 0., d) * (.35 + .65*vSeed) * clamp(9./vDepth - .4, .15, 1.);
        vec3 col = mix(uColA, uColB, mix(vSeed, clamp(1. - vRim * 1.2, 0., 1.), uLit * .7));
        gl_FragColor = vec4(col * 1.25 * vLight, a * clamp(vLight, .12, 1.));
      }`,
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  /* Voice ring: a circle of particles around the orb that faces the camera. Spikes rise and fall
     with the voice's frequencies (mirrored left/right), and three waveform lines trace the
     actual sound wave around the circle. It stays calm and breathing when she's quiet. */
  const ring = (() => {
    const BINS = 160, PER = 14, LINES = 3, LPTS = 640;
    const N = BINS * PER + LINES * LPTS;
    const R = ORB_R * 1.36;
    const rpos = new Float32Array(N * 3), tone = new Float32Array(N), rseed = new Float32Array(N);
    for (let i = 0; i < N; i++) { rseed[i] = Math.random(); tone[i] = i < BINS * PER ? (i % PER) / (PER - 1) : 0.15 + 0.35 * Math.floor((i - BINS * PER) / LPTS); }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(rpos, 3));
    g.setAttribute("tone", new THREE.BufferAttribute(tone, 1));
    g.setAttribute("seed", new THREE.BufferAttribute(rseed, 1));
    const ru = { uSize: uniforms.uSize, uColA: uniforms.uColA, uColB: uniforms.uColB, uAlpha: { value: 1 }, uVoice: uniforms.uVoice };
    const m = new THREE.ShaderMaterial({
      uniforms: ru, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float tone, seed; uniform float uSize; varying float vT, vS;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (.55 + seed * .7) * (6. / -mv.z);
          vT = tone; vS = seed;
        }`,
      fragmentShader: `
        uniform vec3 uColA, uColB; uniform float uAlpha, uVoice; varying float vT, vS;
        void main(){
          float d = length(gl_PointCoord - .5); if (d > .5) discard;
          float a = smoothstep(.5, 0., d) * uAlpha * (.35 + .65 * vS) * (.55 + uVoice * .8);
          gl_FragColor = vec4(mix(uColA, uColB, vT) * 1.3, a * (1. - vT * .45));
        }`,
    });
    const obj = new THREE.Points(g, m);
    obj.renderOrder = 2;
    scene.add(obj);
    const amp = new Float32Array(BINS), line = new Float32Array(LINES * LPTS);
    function update(t, lv, spec, wave) {
      const half = BINS / 2;
      for (let b = 0; b < BINS; b++) {
        // Mirror so the left and right halves match, like a symmetric visualiser
        const k = b < half ? b : BINS - 1 - b;
        let v;
        if (spec) { const bin = 2 + Math.floor((k / half) * 70); v = Math.pow(spec[bin] / 255, 1.6) * 1.15; }
        else v = lv * (0.45 + 0.55 * Math.abs(Math.sin(k * 0.61 + t * 11) * Math.cos(k * 0.23 - t * 7)));
        const idle = 0.035 + 0.025 * Math.sin(t * 1.4 + k * 0.35) + 0.015 * Math.sin(t * 2.3 - k * 0.9);
        const target = idle + v * 0.95;
        amp[b] += (target - amp[b]) * (target > amp[b] ? 0.55 : 0.12);
        const a = (b / BINS) * Math.PI * 2 + Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
        for (let j = 0; j < PER; j++) {
          const i = b * PER + j, f = j / (PER - 1);
          // A spike reaching outward (and a shorter one inward) from the base circle
          const r = R + (f - 0.3) * amp[b] * 1.3 + (rseed[i] - 0.5) * 0.012;
          rpos[i * 3] = ca * r; rpos[i * 3 + 1] = sa * r; rpos[i * 3 + 2] = 0;
        }
      }
      const base = BINS * PER;
      for (let l = 0; l < LINES; l++) {
        const rad = R - 0.09 - l * 0.06, gain = 0.9 - l * 0.22, ph = l * 2.1;
        for (let q = 0; q < LPTS; q++) {
          const idx = l * LPTS + q, u = q / LPTS, mirror = u < 0.5 ? u * 2 : (1 - u) * 2;
          let v = wave ? wave[Math.floor(mirror * 480) + l * 24] || 0 : lv * 0.35 * Math.sin(mirror * 40 + t * 14 + ph);
          v = v * 1.4 * gain + 0.012 * Math.sin(u * Math.PI * 12 + t * (1.2 + l * 0.4) + ph);
          line[idx] += (v - line[idx]) * 0.35;
          const a = u * Math.PI * 2 + Math.PI / 2, r = rad + line[idx], i = base + idx;
          rpos[i * 3] = Math.cos(a) * r; rpos[i * 3 + 1] = Math.sin(a) * r; rpos[i * 3 + 2] = 0;
        }
      }
      g.attributes.position.needsUpdate = true;
    }
    return { obj, update, uniforms: ru };
  })();


  let current = "orb", spin = 0, morphFrom = new Float32Array(pos), morphT = 1;
  function morph(name) {
    if (name === current || !targets[name]) return;
    morphFrom.set(pos); current = name; morphT = 0;
    if (name === "orb") spin = points.rotation.y;
    sfx.whoosh();
  }


  // Where the orb sits on the studio site: each section sets an anchor while you scroll (site.js)
  const anchor = { x: 0, y: 0, s: 1 }, anchorNow = { x: 0, y: 0, s: 1 };
  let spinKick = 0;

  const palette = { ai: ["#36e4d0", "#7b5bff"], saas: ["#5ab0ff", "#36e4d0"], mobile: ["#ffb35c", "#ff5c8a"], unsure: ["#36e4d0", "#3b5bff"],
    design: ["#ff5cd6", "#7b5bff"], marketing: ["#ffd25c", "#ff5c8a"], web: ["#5ab0ff", "#7b5bff"], ecom: ["#5cffa8", "#36e4d0"],
    chatbot: ["#36e4d0", "#ff5cd6"], automation: ["#ffb35c", "#36e4d0"], crm: ["#7b5bff", "#5ab0ff"] };
  // Orb shape for the plan screen, per build type
  const SHAPES = { ai: "neural", chatbot: "neural", automation: "neural", saas: "grid", web: "grid", ecom: "grid", crm: "grid", mobile: "phone" };
  let colTarget = palette.unsure;
  const tint = (key) => (colTarget = palette[key] || palette.unsure);
  // Each question gets its own colour; the orb, waves, background and HUD all fade into it
  const STEP_COLORS = {
    gate: palette.unsure, intro: palette.unsure,
    name: ["#a98bff", "#4f6bff"], email: ["#ff6bd5", "#7b5bff"], build: ["#ffb35c", "#ff5c8a"],
    stage: ["#5cffa8", "#2fb5ff"], priority: ["#ff7a5c", "#ffc35c"], timeline: ["#ffe28a", "#5ab0ff"],
    reading: ["#bff6ff", "#7b5bff"],
  };
  const colA = new THREE.Color(), colB = new THREE.Color();

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let siteMode = false;
  addEventListener("pointermove", (e) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; });

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.position.z = innerWidth < 700 ? 9.5 : 7;
    camera.updateProjectionMatrix();
    bgUniforms.uRes.value.set(innerWidth * renderer.getPixelRatio(), innerHeight * renderer.getPixelRatio());
  }
  addEventListener("resize", resize); resize();

  /* =====================================================================
   * 3. AMBIENT SOUND (synthesised; no audio files)
   * ===================================================================== */
  const sfx = (() => {
    let ctx, master, on = false;
    function init() {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      const filter = ctx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = 900; filter.Q.value = 0.7;
      filter.connect(master);
      const lfo = ctx.createOscillator(), lfoGain = ctx.createGain();
      lfo.frequency.value = 0.05; lfoGain.gain.value = 420; lfo.connect(lfoGain).connect(filter.frequency); lfo.start();
      [73.42, 110, 146.83, 220, 329.63].forEach((f, i) => [-4, 4].forEach((det) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = i < 2 ? "sine" : "triangle"; o.frequency.value = f; o.detune.value = det;
        g.gain.value = i < 2 ? 0.05 : 0.02; o.connect(g).connect(filter); o.start();
      }));
    }
    function set(v) {
      if (!ctx) init();
      if (ctx.state === "suspended") ctx.resume();
      on = v;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(on ? 0.35 : 0, ctx.currentTime + 1.2);
      return on;
    }
    function blip(freq = 880, dur = 0.12, vol = 0.06) {
      if (!on) return;
      const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
      o.type = "sine"; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(freq * 1.5, t + dur);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur);
    }
    function whoosh() {
      if (!on) return;
      const t = ctx.currentTime, len = 1.4, buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = buf; bp.type = "bandpass"; bp.Q.value = 2;
      bp.frequency.setValueAtTime(200, t); bp.frequency.exponentialRampToValueAtTime(2400, t + len * 0.6); bp.frequency.exponentialRampToValueAtTime(300, t + len);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.08, t + 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      src.connect(bp).connect(g).connect(ctx.destination); src.start(t);
    }
    const chime = () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => setTimeout(() => blip(f, 0.9, 0.04), i * 140));
    function noise(len) {
      const b = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * len), ctx.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = ctx.createBufferSource(); s.buffer = b; return s;
    }
    // Metallic "chk": a short noise burst through a ringing resonant filter (like a switch or rifle bolt)
    function clack(t, freq = 2400, vol = 0.22, len = 0.05) {
      const n = noise(len), bp = ctx.createBiquadFilter(), g = ctx.createGain();
      bp.type = "bandpass"; bp.frequency.value = freq; bp.Q.value = 9;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      n.connect(bp).connect(g).connect(ctx.destination); n.start(t);
    }
    // Radio-style square beep, band-limited so it sounds like it comes through a headset
    function radioBeep(t, freq, dur, vol = 0.05) {
      const o = ctx.createOscillator(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = "square"; o.frequency.value = freq;
      bp.type = "bandpass"; bp.frequency.value = 1800; bp.Q.value = 1.2;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.004);
      g.gain.setValueAtTime(vol, t + dur - 0.01); g.gain.linearRampToValueAtTime(0.0001, t + dur);
      o.connect(bp).connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur + 0.02);
    }
    // Tactical menu select: hard metallic click, then a quick two-tone radio confirm
    function submit() {
      if (!on) return;
      const t = ctx.currentTime;
      clack(t, 2600, 0.28, 0.045);
      clack(t + 0.012, 900, 0.16, 0.06);
      radioBeep(t + 0.05, 1320, 0.055);
      radioBeep(t + 0.12, 1760, 0.08);
    }
    // Hover tick: tiny dry click
    const tick = () => { if (on) clack(ctx.currentTime, 3200, 0.08, 0.02); };
    // Slider swipe: a short airy swish that sweeps in the swipe direction, plus a soft glassy tap as the card lands
    function swipe(dir = 1) {
      if (!on) return;
      const t = ctx.currentTime, len = 0.22, n = noise(len), bp = ctx.createBiquadFilter(), g = ctx.createGain(), pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      bp.type = "bandpass"; bp.Q.value = 1.4;
      bp.frequency.setValueAtTime(dir > 0 ? 700 : 2600, t); bp.frequency.exponentialRampToValueAtTime(dir > 0 ? 2600 : 700, t + len);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      let node = n.connect(bp).connect(g);
      if (pan) { pan.pan.setValueAtTime(-0.5 * dir, t); pan.pan.linearRampToValueAtTime(0.5 * dir, t + len); node = node.connect(pan); }
      node.connect(ctx.destination); n.start(t); n.stop(t + len);
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(dir > 0 ? 1180 : 990, t + 0.1);
      og.gain.setValueAtTime(0.0001, t + 0.1); og.gain.exponentialRampToValueAtTime(0.035, t + 0.11); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(og).connect(ctx.destination); o.start(t + 0.1); o.stop(t + 0.32);
    }
    // "Thinking": quiet data ticks over a low pulse; returns a stop function
    function processing() {
      if (!on) return () => {};
      const out = ctx.createGain(), t0 = ctx.currentTime;
      out.gain.setValueAtTime(0.0001, t0); out.gain.exponentialRampToValueAtTime(1, t0 + 0.2); out.connect(ctx.destination);
      const hum = ctx.createOscillator(), hg = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      hum.type = "sine"; hum.frequency.value = 110; hg.gain.value = 0.02; lfo.frequency.value = 3.2; lg.gain.value = 0.015;
      lfo.connect(lg).connect(hg.gain); hum.connect(hg).connect(out); hum.start(); lfo.start();
      const notes = [1318.5, 1567.98, 1975.53, 2349.32, 2637.02];
      const iv = setInterval(() => {
        const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "square"; o.frequency.value = notes[(Math.random() * notes.length) | 0];
        g.gain.setValueAtTime(0.006, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        o.connect(g).connect(out); o.start(t); o.stop(t + 0.06);
      }, 85);
      return () => {
        clearInterval(iv);
        const t = ctx.currentTime;
        out.gain.cancelScheduledValues(t); out.gain.setValueAtTime(out.gain.value, t); out.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        hum.stop(t + 0.3); lfo.stop(t + 0.3);
      };
    }
    return { set, blip, whoosh, chime, submit, tick, swipe, processing, get on() { return on; }, get ctx() { return ctx; } };
  })();

  /* =====================================================================
   * 4. VOICE — plays Kokoro clips, measures loudness for the jaw,
   *    falls back to the browser's softest female voice
   * ===================================================================== */
  const voice = (() => {
    let audio = null, analyser = null, buf = null, token = 0, level = 0, flap = 0, active = false, pending = null;
    let browserVoice = null;
    const pickVoice = () => {
      const vs = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
      const pref = ["Samantha", "Ava", "Zoe", "Allison", "Google UK English Female", "Microsoft Aria", "Microsoft Jenny", "Karen", "Moira", "Tessa"];
      return pref.map((n) => vs.find((v) => v.name.includes(n))).find(Boolean) || vs[0] || null;
    };
    if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = () => (browserVoice = pickVoice());

    let fbuf = null;
    // Frequency bars and raw waveform for the voice ring (null when nothing is playing through the analyser)
    function spectrum() {
      if (!(audio && !audio.paused && analyser)) return null;
      if (!fbuf) fbuf = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(fbuf); return fbuf;
    }
    function waveform() {
      if (!(audio && !audio.paused && analyser)) return null;
      analyser.getFloatTimeDomainData(buf); return buf;
    }
    function ensureAnalyser() {
      const ctx = sfx.ctx; if (!ctx) return false;
      if (!analyser) { analyser = ctx.createAnalyser(); analyser.fftSize = 1024; analyser.connect(ctx.destination); buf = new Float32Array(analyser.fftSize); }
      return true;
    }
    function raw() {
      if (audio && !audio.paused && analyser) {
        analyser.getFloatTimeDomainData(buf);
        let s = 0; for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
        return Math.min(1, Math.sqrt(s / buf.length) * 7);
      }
      return active ? flap : 0;
    }
    // Smoothed mouth openness: fast attack, slower release, like real speech
    function update() { const r = raw(); level += (r - level) * (r > level ? 0.6 : 0.2); flap *= 0.88; return level; }
    function finish(ok) { active = false; if (pending) { const p = pending; pending = null; p(ok); } }
    function stop() {
      token++;
      if (audio) { audio.pause(); audio = null; }
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      finish(false);
    }
    function browserSay(text, my, onProgress) {
      if (!("speechSynthesis" in window)) return finish(false);
      const u = new SpeechSynthesisUtterance(text);
      browserVoice = browserVoice || pickVoice();
      if (browserVoice) u.voice = browserVoice;
      u.rate = 0.9; u.pitch = 1.08; u.volume = 0.85;
      u.onstart = () => my === token && (active = true);
      u.onboundary = (e) => { if (my !== token) return; flap = 0.9; onProgress && onProgress(e.charIndex / text.length); };
      u.onend = u.onerror = () => { if (my !== token) return; onProgress && onProgress(1); finish(true); };
      speechSynthesis.speak(u);
    }
    // Plays a clip (URL) and reports progress 0..1; resolves true when finished, false if interrupted
    function play(url, fallbackText, onProgress) {
      stop();
      const my = token;
      return new Promise((resolve) => {
        pending = resolve;
        if (!sfx.on) return finish(false);
        const a = new Audio(url); audio = a;
        let failed = false;
        const fail = () => { if (failed || my !== token) return; failed = true; audio = null; browserSay(fallbackText, my, onProgress); };
        try { if (ensureAnalyser()) sfx.ctx.createMediaElementSource(a).connect(analyser); } catch (_) {}
        a.onplaying = () => { if (my === token) active = true; };
        const tick = () => {
          if (my !== token || audio !== a) return;
          if (a.duration && isFinite(a.duration)) onProgress && onProgress(a.currentTime / a.duration);
          if (!a.ended) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        a.onended = () => { if (my !== token) return; audio = null; onProgress && onProgress(1); finish(true); };
        a.onerror = fail;
        a.play().catch(fail);
      });
    }
    return { play, stop, update, spectrum, waveform, get speaking() { return active; } };
  })();

  /* Live voice for the visitor's name: Kokoro running in the browser (free, open source).
     Loads in the background during the intro on capable desktops; otherwise we use the pre-recorded line. */
  const live = (() => {
    let worker = null, loading = null, ready = false, seq = 0;
    const waiting = new Map();
    const capable = innerWidth >= 900 && (navigator.deviceMemory || 8) >= 4 && !/Mobi|Android/i.test(navigator.userAgent);
    // The model runs in a background thread so the face keeps animating while it thinks
    const SRC = `
      import { KokoroTTS } from "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js";
      let tts = null;
      self.onmessage = async (e) => {
        const { id, type, text } = e.data;
        try {
          if (type === "load") tts = tts || await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8", device: "wasm" });
          if (type === "say") { const a = await tts.generate(text, { voice: "af_heart", speed: 1.15 }); self.postMessage({ id, ok: true, blob: a.toBlob() }); return; }
          self.postMessage({ id, ok: true });
        } catch (err) { self.postMessage({ id, ok: false }); }
      };`;
    function call(type, text) {
      return new Promise((resolve) => { const id = ++seq; waiting.set(id, resolve); worker.postMessage({ id, type, text }); });
    }
    let server = false; // true when our server can speak lines (fast, no download for the visitor)
    function startWorker() {
      if (!capable) return false;
      try {
        worker = new Worker(URL.createObjectURL(new Blob([SRC], { type: "text/javascript" })), { type: "module" });
        worker.onmessage = (e) => { const r = waiting.get(e.data.id); if (r) { waiting.delete(e.data.id); r(e.data); } };
        return call("load").then((r) => !!r.ok);
      } catch (_) { return false; }
    }
    function warm() {
      if (loading) return loading;
      // Prefer the server voice; fall back to running the model in the browser
      loading = fetch("/api/say", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null)).catch(() => null)
        .then((r) => (r && r.ok ? (server = true) : startWorker()))
        .then((ok) => (ready = !!ok));
      return loading;
    }
    async function speakOnServer(text) {
      const r = await fetch("/api/say", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
      return r.ok ? URL.createObjectURL(await r.blob()) : null;
    }
    // Returns an object URL of the spoken line, or null if not ready within the time limit
    async function say(text, timeoutMs = 8000) {
      if (!ready) return null;
      const job = (server ? speakOnServer(text) : call("say", text).then((r) => (r.ok && r.blob ? URL.createObjectURL(r.blob) : null))).catch(() => null);
      return Promise.race([job, wait(timeoutMs).then(() => null)]);
    }
    return { warm, say, get ready() { return ready; }, get loading() { return loading; } };
  })();

  /* =====================================================================
   * 5. CAPTIONS — words appear as the guide speaks them
   * ===================================================================== */
  const answers = { name: "", email: "", build: "", stage: "", priority: "", timeline: "" };
  let flow = 0; // increments whenever the experience moves on; stale async work checks it and stops

  function renderWords(el, show) {
    const n = answers.name;
    const text = show.replace("{name}", n ? `, ${n}` : "");
    const nameWords = new Set(show.includes("{name}") && n ? n.split(" ") : []);
    const spans = text.split(/\s+/).filter(Boolean).map((w) => {
      const s = document.createElement("span");
      s.className = "w"; s.textContent = w;
      if (nameWords.has(w.replace(/[^\p{L}\p{M}'-]/gu, ""))) s.classList.add("nm");
      return s;
    });
    el.replaceChildren(...spans);
    return spans;
  }
  function revealTo(spans, frac) {
    const total = spans.reduce((a, s) => a + s.textContent.length + 1, 0);
    let acc = 0; const target = frac * total * 1.05 + 1;
    spans.forEach((s) => { if (acc <= target) s.classList.add("on"); acc += s.textContent.length + 1; });
  }
  async function typeOut(spans, my) {
    for (const s of spans) { if (my !== flow) return; if (!s.classList.contains("on")) { s.classList.add("on"); await wait(120); } }
  }
  // Speak + show a line. `clip` overrides the audio file (e.g. a live-generated name line).
  async function present(el, key, my, clip) {
    const line = LINES[key]; if (!line) return;
    const spans = renderWords(el, line.show);
    setStatus("SPEAKING");
    const ok = sfx.on ? await voice.play(clip || clipSrc(key), line.say, (f) => revealTo(spans, f)) : false;
    if (my !== flow) return;
    if (ok) revealTo(spans, 1); else await typeOut(spans, my);
    if (my === flow) setStatus("LISTENING");
  }

  /* =====================================================================
   * 6. FLOW
   * ===================================================================== */
  const QUESTIONS = ["name", "email", "build", "stage", "priority", "timeline", "reading", "result"];
  let stepName = "gate";
  const progressVal = $("#progressVal"), progressBar = $("#progressBar");
  let shownProgress = 0;
  function setProgress(p) {
    progressBar.style.width = p + "%";
    const from = shownProgress, start = performance.now();
    (function count(now) {
      const k = Math.min(1, (now - start) / 700);
      progressVal.textContent = Math.round(from + (p - from) * k) + "%";
      if (k < 1) requestAnimationFrame(count); else shownProgress = p;
    })(start);
  }
  const statusEl = $("#status");
  const setStatus = (s) => (statusEl.textContent = s);

  function show(name) {
    stepName = name;
    $$(".step").forEach((s) => s.classList.toggle("is-active", s.dataset.step === name));
    const step = $(`.step[data-step="${name}"]`);
    step.classList.remove("ready");
    const qi = QUESTIONS.indexOf(name);
    if (qi > -1) setProgress(Math.round((qi / (QUESTIONS.length - 1)) * 100));
    uniforms.uPulse.value = 1;
    if (name === "result") tint(answers.build);
    else if (STEP_COLORS[name]) colTarget = STEP_COLORS[name];
    sfx.blip(440 + Math.max(qi, 0) * 90);
    // Fetch what she may say next: this question's replies, then the following question (or the plan lines)
    if (sfx.on && qi > -1) {
      const acks = Object.keys(LINES).filter((k) => k.startsWith(`ack-${name}-`));
      const next = name === "reading" ? [`result-${answers.build || "unsure"}`, "result", "unlock"] : [QUESTIONS[qi + 1], name === "name" ? "email-bad" : ""];
      preloadClips([...acks, ...next]);
    }
    return step;
  }

  async function enter(name) {
    const my = ++flow;
    voice.stop();
    const step = show(name);
    paintSkip();
    if (name === "reading") morph("helix");
    else if (name === "result") morph(SHAPES[answers.build] || "orb");
    else morph("orb");

    if (name === "intro") return runIntro(my, step);
    if (name === "reading") return runReading(my, step);
    if (name === "result") return runResult(my, step);

    const h = $("[data-say]", step);
    let clip = null;
    if (name === "email" && sfx.on) {
      // Processing sound while the guide "thinks". The line with the visitor's name is generated
      // live (usually pre-made while they typed). The wait is capped: if the voice model is still
      // downloading (it is ~90 MB on a first visit), she says the recorded line instead of
      // keeping the visitor waiting — the "thinking" beat stays the same length either way.
      setStatus("PROCESSING");
      const stopProc = sfx.processing();
      const minThink = wait(1100);
      try {
        if (answers.name) {
          if (!live.ready && live.loading) await Promise.race([live.loading, wait(1100)]);
          if (live.ready && my === flow) clip = await nameLine(answers.name, 3500);
        }
        await minThink;
      } catch (_) { clip = null; } // never get stuck here — fall back to the recorded line
      stopProc();
      if (my !== flow) return;
    }
    await present(h, name, my, clip);
    if (my !== flow) return;
    step.classList.add("ready");
    if (name === "name" || name === "email") setTimeout(() => $(`#${name}Input`).focus(), 300);
  }

  async function runIntro(my, step) {
    live.warm();
    const cap = $("#introCaption");
    for (let i = 1; i <= 6; i++) {
      cap.classList.add("out"); await wait(i === 1 ? 500 : 280); if (my !== flow) return;
      cap.classList.remove("out");
      await present(cap, `intro-${i}`, my);
      if (my !== flow) return;
      await wait(sfx.on ? 260 : 650); if (my !== flow) return;
    }
    step.classList.add("ready");
  }

  // The guide replies to an answer, then moves to the next question
  async function reply(key, next) {
    const my = ++flow;
    voice.stop();
    show("reply");
    const cap = $("#replyCaption");
    await present(cap, key, my);
    if (my !== flow) return;
    await wait(sfx.on ? 200 : 500);
    if (my === flow) enter(next);
  }

  // Gate
  function startExperience(withSound) {
    setSound(withSound);
    if (withSound) {
      // The intro's lines first (they play right away), then the first questions
      preloadClips(["intro-1", "intro-2", "intro-3", "intro-4", "intro-5", "intro-6", "name", "email"]);
      live.warm();
    }
    $(".hud-ring").style.opacity = "";
    enter("intro");
  }
  $("#enterSound").addEventListener("click", () => startExperience(true));
  $("#enterSilent").addEventListener("click", () => startExperience(false));
  // Always on screen. Skipping (at any point) removes the talking guide completely and opens the
  // studio site at its hero ("01 / HOME"); scrolling up can't bring the guide back (until a reload).
  $("#skipIntro").addEventListener("click", () => {
    ++flow; voice.stop();
    document.body.classList.add("skipped");   // CSS hides the whole guided experience
    $(".hud-ring").style.opacity = "";
    unlockSite();
    window.LM.siteMode(true);
    scrollTo(0, 0);
    setTimeout(() => { if (window.ScrollTrigger) ScrollTrigger.refresh(); if (window.LMSite) window.LMSite.scrollTo(0, true); }, 300);
  });
  function paintSkip() { $("#skipIntro").textContent = stepName === "gate" || stepName === "intro" ? "SKIP INTRO →" : "SKIP TO WEBSITE →"; }
  $("[data-begin]").addEventListener("click", () => enter("name"));

  // Start voicing "Nice to meet you, <name>" as soon as the visitor pauses typing
  const nameClips = new Map();
  const cleanName = (v) => v.replace(/[^\p{L}\p{M}' .-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 40);
  function nameLine(n, budget = 8000) {
    if (!LINES.email) return Promise.resolve(null);
    if (!nameClips.has(n)) nameClips.set(n, live.say(LINES.email.say.replace("Nice to meet you.", `Nice to meet you, ${n}.`), 12000));
    return Promise.race([nameClips.get(n), wait(budget).then(() => null)]);
  }
  let nameTimer = 0, primeWhenReady = false;
  $("#nameInput").addEventListener("input", (e) => {
    clearTimeout(nameTimer);
    const n = cleanName(e.target.value);
    if (n.length < 2 || !sfx.on) return;
    if (live.ready) nameTimer = setTimeout(() => nameLine(n), 600);
    // The model finished loading after they started typing: make the line as soon as it's ready
    else if (live.loading && !primeWhenReady) {
      primeWhenReady = true;
      live.loading.then(() => {
        const v = cleanName($("#nameInput").value);
        if (live.ready && sfx.on && v.length > 1 && stepName === "name") nameLine(v);
      });
    }
  });
  $("#nameInput").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    answers.name = cleanName(e.target.value);
    sfx.submit();
    e.target.blur();
    enter("email");
  });

  // Email: check it looks real before moving on; the guide asks again if it doesn't
  const emailOk = (v) => /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(v);
  const emailHint = $("#emailHint"), hintHTML = emailHint.innerHTML;
  $("#emailInput").addEventListener("input", () => { emailHint.classList.remove("err"); emailHint.innerHTML = hintHTML; });
  $("#emailInput").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const v = e.target.value.trim();
    if (!emailOk(v)) {
      emailHint.classList.add("err"); emailHint.textContent = "PLEASE CHECK YOUR EMAIL";
      $(".field-box", e.target.closest(".field")).animate([{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }], { duration: 260 });
      sfx.blip(220, 0.18, 0.05);
      if (sfx.on) { voice.stop(); voice.play(clipSrc("email-bad"), LINES["email-bad"].say); }
      return;
    }
    answers.email = v;
    sfx.submit();
    e.target.blur();
    enter("build");
  });

  const NEXT = { build: "stage", stage: "priority", priority: "timeline", timeline: "reading" };
  /* Options sit on a curved, neon slider: the centre card is in focus, the rest bend away along an arc.
     Browse with the arrows, drag/swipe, the mouse wheel or ← →; click a card (or press Enter) to choose. */
  const sliders = new Map();
  $$(".choices").forEach((group) => {
    const key = group.dataset.key, btns = $$("button", group);
    const track = document.createElement("div"); track.className = "arc-track";
    btns.forEach((b) => track.appendChild(b));
    const hint = Object.assign(document.createElement("p"), { className: "mono arc-hint", innerHTML: "SWIPE <b>&larr; &rarr;</b> &nbsp;·&nbsp; CLICK TO CHOOSE" });
    group.classList.add("arc");
    group.append(track, hint);

    let active = Math.floor((btns.length - 1) / 2), dragX = 0;
    const layout = () => {
      // Cards sit on a cylinder: the centre faces you, neighbours turn and fall back into depth
      const small = innerWidth < 700, step = small ? 30 : 22, R = small ? 400 : 720;
      btns.forEach((b, i) => {
        const d = i - active - dragX, ad = Math.abs(d), max = small ? 1.6 : 2.6;
        b.style.transform = `translate(-50%, 0) translateZ(${-R}px) rotateY(${d * step}deg) translateZ(${R}px)`;
        b.style.opacity = ad > max ? 0 : Math.max(0.15, 1 - ad * 0.32);
        b.style.zIndex = 100 - Math.round(ad * 10);
        b.style.pointerEvents = ad > max ? "none" : "";
        b.classList.toggle("is-center", Math.round(d) === 0);
        b.tabIndex = i === active ? 0 : -1;
      });
    };
    const go = (i, quiet) => {
      const n = Math.max(0, Math.min(btns.length - 1, i));
      if (n !== active && !quiet) sfx.swipe(Math.sign(n - active));
      active = n; layout();
    };
    const pick = (i) => {
      if (!group.closest(".step").classList.contains("ready") || group.dataset.locked) return;
      go(i, true);
      const btn = btns[i];
      group.dataset.locked = "1";
      sfx.submit();
      btns.forEach((b) => b.classList.remove("picked"));
      btn.classList.add("picked");
      answers[key] = btn.dataset.value;
      setTimeout(() => { delete group.dataset.locked; reply(`ack-${key}-${btn.dataset.value}`, NEXT[key]); }, 450);
    };

    // Drag / swipe (a real drag never counts as a click)
    let startX = null, moved = false;
    let dragOver = 0;
    track.addEventListener("pointerdown", (e) => { startX = e.clientX; moved = false; dragOver = active; group.classList.add("dragging"); });
    addEventListener("pointermove", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX, gap = innerWidth < 700 ? 200 : 300;
      if (Math.abs(dx) > 6) moved = true;
      dragX = Math.max(-active - 0.4, Math.min(btns.length - 1 - active + 0.4, -dx / gap));
      const over = Math.round(active + dragX);
      if (over !== dragOver) { if (over >= 0 && over < btns.length) sfx.swipe(Math.sign(over - dragOver)); dragOver = over; }
      layout();
    });
    addEventListener("pointerup", () => {
      if (startX === null) return;
      startX = null; group.classList.remove("dragging");
      const target = Math.round(active + dragX); dragX = 0; go(target, true);
    });
    btns.forEach((b, i) => b.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; return; } pick(i); }));
    btns.forEach((b, i) => b.addEventListener("mouseenter", () => { if (i !== active) b.classList.add("peek"); }));
    btns.forEach((b) => b.addEventListener("mouseleave", () => b.classList.remove("peek")));

    // Mouse wheel / trackpad scrolls through the options
    let wheelAcc = 0, wheelT = 0;
    group.addEventListener("wheel", (e) => {
      const v = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      e.preventDefault(); wheelAcc += v;
      const now = performance.now();
      if (Math.abs(wheelAcc) > 40 && now - wheelT > 160) { go(active + Math.sign(wheelAcc)); wheelAcc = 0; wheelT = now; }
    }, { passive: false });

    addEventListener("resize", layout);
    layout();
    sliders.set(group, { go: (d) => go(active + d), pick: () => pick(active), pickAt: (i) => i < btns.length && pick(i), reset: () => { active = Math.floor((btns.length - 1) / 2); layout(); } });
  });

  addEventListener("keydown", (e) => {
    if (document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (scrollY > innerHeight / 2) return;
    const step = $(".step.is-active"); if (!step) return;
    if (e.key === "Enter") {
      if (stepName === "gate") { e.preventDefault(); startExperience(true); }
      else if (stepName === "intro") { e.preventDefault(); enter("name"); }
      else { const g = $(".choices", step), sl = g && sliders.get(g); if (sl) { e.preventDefault(); sl.pick(); } }
      return;
    }
    const group = $(".choices", step), sl = group && sliders.get(group);
    if (!sl) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); sl.go(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); sl.go(1); }
  });

  /* ---------- plan generation ---------- */
  const LIB = {
    build: {
      ai: { title: "The Intelligence Builder", stack: ["Custom LLM assistant trained on your data", "Retrieval (RAG) over docs, CRM and tickets", "Agent workflows wired into your tools", "Evaluation + guardrails dashboard"] },
      saas: { title: "The Platform Architect", stack: ["Multi-tenant web platform", "Subscription billing and plans", "Admin console and analytics", "Public API and integrations"] },
      mobile: { title: "The Pocket Pioneer", stack: ["iOS + Android app (React Native or Flutter)", "Design system tuned for touch", "Push, offline mode and analytics", "App Store + Google Play launch"] },
      design: { title: "The Brand Visionary", stack: ["Brand identity, logo and visual language", "UX research and user journeys", "UI design system in Figma", "Motion and interaction guidelines"] },
      marketing: { title: "The Growth Engine", stack: ["Technical SEO audit and fixes", "Content and keyword strategy", "Paid social and search campaigns", "Analytics and conversion tracking"] },
      web: { title: "The Digital Storefront", stack: ["Fast, responsive website or web app", "Headless CMS your team can edit", "SEO-ready structure and performance", "Analytics, forms and integrations"] },
      ecom: { title: "The Commerce Captain", stack: ["Shopify or custom storefront", "Payments, shipping and inventory sync", "Conversion-focused product pages", "Email flows and abandoned-cart recovery"] },
      chatbot: { title: "The Agent Maker", stack: ["AI chatbot trained on your content", "Agent actions wired into your tools", "Website, WhatsApp and Slack channels", "Conversation analytics and guardrails"] },
      automation: { title: "The Time Saver", stack: ["Map and prioritise manual workflows", "Integrations between your apps (APIs)", "AI steps for documents and email", "Monitoring, alerts and audit trail"] },
      crm: { title: "The Command Center", stack: ["Custom CRM tailored to your pipeline", "Real-time dashboards and reports", "Roles, permissions and audit log", "Integrations with email, billing and ads"] },
      unsure: { title: "The Open Horizon", stack: ["Discovery sprint to pick the right product", "Clickable prototype in two weeks", "Technical roadmap and estimate", "A build partner for what follows"] },
    },
    stage: {
      idea: "You're starting from an idea, so the first win is proof: a focused MVP in front of real users fast.",
      prototype: "You already have a prototype, so the job is hardening it — architecture, security and polish that hold up under real traffic.",
      live: "You're live and growing, so we focus on performance, infrastructure and the features that move retention.",
      rebuild: "You're live but held back by the current build, so we plan a staged rebuild that never takes the product offline.",
    },
    priority: {
      speed: "Speed is the priority — tight scope, weekly releases, and no feature that doesn't earn its place in v1.",
      scale: "Reliability is the priority — load testing, observability and a cloud setup that scales without a rewrite.",
      experience: "Experience is the priority — research-led design and motion that make the product feel effortless.",
      automation: "Automation is the priority — AI agents and integrations that take repetitive work off your team's plate.",
    },
    timeline: { "6w": 6, "3m": 12, "6m": 24, flex: 16 },
  };
  function localPlan(a) {
    const b = LIB.build[a.build] || LIB.build.unsure, weeks = LIB.timeline[a.timeline] || 12;
    const w = (f) => Math.max(1, Math.round(weeks * f));
    const s = `${LIB.stage[a.stage] || ""} ${LIB.priority[a.priority] || ""}`.trim();
    return {
      archetype: b.title,
      lede: a.name ? `${a.name}, ${s.charAt(0).toLowerCase()}${s.slice(1)}` : s,
      stack: b.stack,
      plan: [
        `Weeks 1–${w(0.15)}: Discover — workshops, audit, success metrics`,
        `Weeks ${w(0.15) + 1}–${w(0.35)}: Define & design — architecture, flows, prototype`,
        `Weeks ${w(0.35) + 1}–${w(0.85)}: Build — two-week sprints with live demos`,
        `Week ${w(1)}: Launch — release, monitoring, handover`,
      ],
    };
  }
  // Optional live AI plan via /api/plan (see api/plan.js); falls back to the local plan
  async function aiPlan(a) {
    try {
      const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 9000);
      const r = await fetch("/api/plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a), signal: ctrl.signal });
      clearTimeout(to);
      if (!r.ok) throw 0;
      const j = await r.json();
      if (j && j.archetype && Array.isArray(j.stack) && Array.isArray(j.plan)) return j;
    } catch (_) {}
    return localPlan(a);
  }

  /* Cost estimate (USD): a base range per build type, adjusted for stage, priority and timeline */
  const COST = {
    base: { design: [6, 14], marketing: [5, 12], web: [8, 20], ecom: [14, 32], saas: [35, 85], ai: [30, 75], mobile: [25, 60], chatbot: [10, 26], automation: [8, 22], crm: [20, 48], unsure: [10, 25] },
    team: { design: 3, marketing: 3, web: 3, ecom: 4, saas: 6, ai: 5, mobile: 5, chatbot: 4, automation: 3, crm: 5, unsure: 3 },
    stage: { idea: 1, prototype: 0.85, live: 0.95, rebuild: 1.15 },
    priority: { speed: 1, scale: 1.15, experience: 1.1, automation: 1.05 },
    timeline: { "6w": 1.25, "3m": 1, "6m": 1.05, flex: 0.95 },
    split: [["Discover", 0.1], ["Design", 0.2], ["Build", 0.55], ["Launch & QA", 0.15]],
  };
  function estimate(a) {
    const [lo, hi] = COST.base[a.build] || COST.base.unsure;
    const m = (COST.stage[a.stage] || 1) * (COST.priority[a.priority] || 1) * (COST.timeline[a.timeline] || 1);
    const r = (v) => Math.max(3, Math.round(v * m)) * 1000;
    const low = r(lo), high = Math.max(r(hi), low + 2000);
    return { low, high, team: (COST.team[a.build] || 3) + (a.timeline === "6w" ? 1 : 0), weeks: LIB.timeline[a.timeline] || 12 };
  }
  const money = (v) => "$" + (v >= 1000 ? Math.round(v / 1000) + "k" : v);
  function countUp(el, to, fmt, ms = 1400) {
    if (reduced) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    (function f(now) { const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(to * e); if (k < 1) requestAnimationFrame(f); })(t0);
  }

  let plan = null;
  async function runReading(my, step) {
    setStatus("ANALYZING");
    const [p] = await Promise.all([aiPlan(answers), present($("[data-say]", step), "reading", my), wait(2600)]);
    if (my !== flow) return;
    plan = p;
    enter("result");
  }

  function typeInto(el, text, speed = 14) {
    el.textContent = "";
    if (reduced) { el.textContent = text; return; }
    let i = 0; (function t() { el.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(t, speed); })();
  }
  async function runResult(my, step) {
    const p = plan || localPlan(answers);
    $("#archetype").textContent = p.archetype;
    typeInto($("#resultLede"), p.lede);
    const est = estimate(answers);
    $("#resultId").textContent = "PLAN LM-" + String(Math.floor(1000 + Math.random() * 9000));
    countUp($("#costLow"), est.low, (v) => money(Math.round(v / 1000) * 1000));
    countUp($("#costHigh"), est.high, (v) => money(Math.round(v / 1000) * 1000));
    $("#costNote").textContent = answers.build === "marketing" ? "USD · first 3 months" : "USD · one-time build";
    countUp($("#statWeeks"), est.weeks, (v) => Math.round(v) + " wks", 1100);
    countUp($("#statTeam"), est.team, (v) => String(Math.round(v)), 900);
    countUp($("#statFit"), 92 + Math.floor(Math.random() * 7), (v) => Math.round(v) + "%", 1300);
    // Budget split by phase
    const mid = (est.low + est.high) / 2;
    $("#costBar").replaceChildren(...COST.split.map(([, f], i) => { const d = document.createElement("i"); d.style.setProperty("--w", f * 100 + "%"); d.style.setProperty("--d", i * 0.12 + "s"); return d; }));
    $("#costLegend").replaceChildren(...COST.split.map(([n, f]) => { const li = document.createElement("li"); li.innerHTML = `<b></b>${n}<span>~${money(Math.round((mid * f) / 1000) * 1000)}</span>`; return li; }));
    // What we'd build: numbered tiles
    $("#resultStack").replaceChildren(...p.stack.map((t, i) => { const li = document.createElement("li"); li.style.setProperty("--d", 0.3 + i * 0.08 + "s"); li.innerHTML = `<span class="mono">${String(i + 1).padStart(2, "0")}</span>`; li.append(t); return li; }));
    // Roadmap: "Weeks 1–2: Discover — detail" → week label, phase name, detail
    $("#planTitle").textContent = `ROADMAP · ${est.weeks} WEEKS`;
    $("#resultPlan").replaceChildren(...p.plan.map((t, i) => {
      const li = document.createElement("li"); li.style.setProperty("--d", 0.4 + i * 0.1 + "s");
      const c = t.indexOf(":"), when = c > -1 ? t.slice(0, c) : "", rest = c > -1 ? t.slice(c + 1).trim() : t;
      const [name, ...more] = rest.split(/\s+[—-]\s+/);
      const w = document.createElement("span"); w.className = "mono"; w.textContent = when;
      const n = document.createElement("b"); n.textContent = name;
      const d = document.createElement("small"); d.textContent = more.join(" — ");
      li.append(w, n, d); return li;
    }));
    prefillContact();
    sfx.chime();
    setStatus("COMPLETE");
    step.classList.add("ready");
    // Open the site (and scrolling) as soon as the plan is on screen — don't wait for the voice to finish
    unlockSite();
    const expected = (LIB.build[answers.build] || LIB.build.unsure).title;
    const key = p.archetype === expected ? `result-${answers.build || "unsure"}` : "result";
    const line = LINES[key];
    if (sfx.on && line) await voice.play(clipSrc(key), line.say);
    else await wait(1600);
    if (my !== flow) return;
    await present($("#unlockHint"), "unlock", my);
    if (my === flow) setStatus("ONLINE");
  }

  function prefillContact() {
    const f = $("#contactForm");
    if (answers.name) f.name.value = answers.name;
    if (answers.email) f.email.value = answers.email;
    // Match what they're building to the studio's service list
    const SERVICE = { web: "Web Development", ecom: "E-commerce Web Development", design: "Digital Branding & Communication", marketing: "Digital Marketing" };
    if (answers.build) f.service.value = SERVICE[answers.build] || "AI, SaaS & Mobile Apps";
    // Pre-select the budget range that matches the estimate
    if (answers.build) { const m = (estimate(answers).low + estimate(answers).high) / 2; f.budget.value = m < 5000 ? "Under $5k" : m < 15000 ? "$5k – $15k" : m < 50000 ? "$15k – $50k" : "$50k+"; }
    if (plan && plan.archetype && !f.message.value) f.message.value = `Hi, I'm ${answers.name || "interested in working together"}. The guide suggested "${plan.archetype}" for my project.`;
  }

  $("#restartBtn").addEventListener("click", () => {
    Object.keys(answers).forEach((k) => (answers[k] = ""));
    $$(".picked").forEach((b) => b.classList.remove("picked"));
    sliders.forEach((sl) => sl.reset());
    $("#nameInput").value = ""; $("#emailInput").value = ""; plan = null; tint("unsure");
    if (window.LMSite) window.LMSite.scrollTo(0); else scrollTo({ top: 0, behavior: "smooth" });
    enter("name");
  });

  function unlockSite() {
    const site = $("#site");
    if (site.classList.contains("shown")) return;
    site.classList.add("shown");
    site.setAttribute("aria-hidden", "false");
    document.body.classList.remove("locked");
    requestAnimationFrame(() => requestAnimationFrame(() => site.classList.add("visible")));
    sfx.whoosh();
    // Give the page a frame to lay out, then start the scroll animations (site.js)
    setTimeout(() => window.LMSite && window.LMSite.init(), 120);
  }

  // Deep links from the inner pages (e.g. index.html#services) open the studio site directly,
  // skipping the guided questions. The plan experience is still there at the top of the page.
  const SITE_IDS = ["stories", "manifesto", "work", "industries", "services", "process", "about", "numbers", "clients", "contact"];
  const deep = location.hash.slice(1);
  // Always start the guide at the top: don't let the browser restore an old scroll position on reload
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!SITE_IDS.includes(deep)) { scrollTo(0, 0); addEventListener("load", () => { if (document.body.classList.contains("locked")) scrollTo(0, 0); }); }
  if (SITE_IDS.includes(deep)) {
    $(".hud-ring").style.opacity = "";
    unlockSite();
    // site.js loads after this file, so wait until both are ready
    addEventListener("DOMContentLoaded", () => {
      // the old #manifesto section was replaced by client stories
      const el = document.getElementById(deep === "manifesto" ? "stories" : deep);
      if (window.LMSite) window.LMSite.goTo(el); else el.scrollIntoView();
    });
  }

  /* =====================================================================
   * 7. SOUND TOGGLE
   * ===================================================================== */
  const soundBtn = $("#soundBtn");
  function paintSound(on) {
    soundBtn.setAttribute("aria-pressed", on);
    $("[data-on]", soundBtn).classList.toggle("active", on);
    $("[data-off]", soundBtn).classList.toggle("active", !on);
  }
  function setSound(on) {
    sfx.set(on); paintSound(on);
    try { localStorage.setItem("lm-sound", on ? "on" : "off"); } catch (_) {}
    if (!on) voice.stop();
  }
  try { paintSound(localStorage.getItem("lm-sound") !== "off"); } catch (_) {}
  // While the gate is up, quietly fetch her first two lines (~80 KB) so "Hello there." starts on the click
  addEventListener("load", () => setTimeout(() => { if (stepName === "gate" && !document.body.classList.contains("skipped")) preloadClips(["intro-1", "intro-2"]); }, 600));
  soundBtn.addEventListener("click", () => setSound(!sfx.on));

  /* =====================================================================
   * 8. SCROLL, MENU, CURSOR, HUD, FORM
   * ===================================================================== */
  // Bridge for site.js (the studio site below the experience)
  window.LM = {
    // Move the talking orb to a section's spot (x, y in scene units; sc = size hint from the page)
    blob: (x, y, sc) => { anchor.x = x; anchor.y = y * 0.85; anchor.s = 0.25 + sc * 0.3; },
    velocity: (v) => (spinKick = Math.max(spinKick, Math.min(2, Math.abs(v) * 0.02))),
    siteMode(on) {
      if (on === siteMode) return;
      siteMode = on;
      document.body.classList.toggle("in-site", on);
      if (on) { morph("orb"); colTarget = palette.unsure; }
      else {
        anchor.x = 0; anchor.y = 0; anchor.s = 1;
        morph(stepName === "result" ? (SHAPES[answers.build] || "orb") : "orb");
        colTarget = stepName === "result" ? (palette[answers.build] || palette.unsure) : (STEP_COLORS[stepName] || palette.unsure);
      }
    },
    sfx: (k) => { if (k === "tick") sfx.tick(); else if (k === "select") sfx.submit(); else if (k === "whoosh") sfx.whoosh(); },
  };

  const menu = $("#menu"), menuBtn = $("#menuBtn");
  const setMenu = (open) => { menu.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); menu.setAttribute("aria-hidden", !open); sfx.blip(open ? 520 : 390); };
  menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("[data-close]").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  const cursor = $(".cursor");
  addEventListener("pointermove", (e) => { cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; });
  document.addEventListener("pointerover", (e) => cursor.classList.toggle("hover", !!e.target.closest("a, button, input, select, textarea")));

  // Voice meter bars + NYC clock
  const bars = $("#bars"), barEls = [];
  for (let i = 0; i < 14; i++) { const b = document.createElement("i"); bars.appendChild(b); barEls.push(b); }
  const clock = $("#clock");
  const tickClock = () => { clock.textContent = "NYC " + new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: false }); };
  tickClock(); setInterval(tickClock, 1000);

  // The enquiry goes to the site's lead endpoint (/api/lead → SMTP), tagged as the homepage form
  const contactForm = $("#contactForm");
  let formStarted = 0, formSending = false;
  contactForm.addEventListener("focusin", () => { if (!formStarted) formStarted = Date.now(); });
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (formSending) return;
    const note = $("#formNote");
    const d = Object.fromEntries(new FormData(e.target));
    const submitBtn = e.target.querySelector('[type="submit"]');
    formSending = true;
    if (submitBtn) submitBtn.disabled = true;
    note.textContent = "Sending your enquiry…";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "homepage",
          pageUrl: location.href,
          elapsed: formStarted ? Date.now() - formStarted : null,
          website: d.website || "",
          fields: { name: d.name, email: d.email, company: d.company || "", service: d.service, budget: d.budget, message: d.message },
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || "");
      note.textContent = "Thank you — your enquiry has reached our team. We'll be in touch shortly.";
      e.target.reset();
      formStarted = 0;
      sfx.chime();
    } catch (err) {
      note.textContent = err.message || "Something went wrong while sending your message. Please try again or contact us directly.";
    } finally {
      formSending = false;
      if (submitBtn) submitBtn.disabled = false;
    }
  });
  $("#year").textContent = new Date().getFullYear();

  /* =====================================================================
   * 9. RENDER LOOP
   * ===================================================================== */
  const clockGL = new THREE.Clock();
  const root = document.documentElement;
  (function tick() {
    const dt = Math.min(clockGL.getDelta(), 0.05), t = clockGL.elapsedTime;
    uniforms.uTime.value = t; bgUniforms.uTime.value = t;
    uniforms.uPulse.value *= 0.95;

    // voice → jaw, glow, HUD
    const lv = voice.update();
    uniforms.uVoice.value = Math.min(1, lv * 1.2);
    bgUniforms.uLevel.value += (lv - bgUniforms.uLevel.value) * 0.2;
    root.style.setProperty("--lv", lv.toFixed(3));
    for (let i = 0; i < barEls.length; i++) {
      const h = 2 + lv * 28 * (0.45 + 0.55 * Math.abs(Math.sin(t * 9 + i * 1.7)));
      barEls[i].style.height = h.toFixed(1) + "px";
    }

    if (morphT < 1) {
      morphT = Math.min(1, morphT + dt / (reduced ? 0.01 : 1.6));
      const k = ease(morphT), to = targets[current];
      for (let i = 0; i < pos.length; i++) {
        const kk = Math.min(1, Math.max(0, k * 1.25 - seeds[(i / 3) | 0] * 0.25));
        pos[i] = morphFrom[i] + (to[i] - morphFrom[i]) * kk;
      }
      geo.attributes.position.needsUpdate = true;
    }
    colA.set(colTarget[0]); colB.set(colTarget[1]);
    uniforms.uColA.value.lerp(colA, 0.03); uniforms.uColB.value.lerp(colB, 0.03);
    root.style.setProperty("--accent", "#" + uniforms.uColA.value.getHexString());
    root.style.setProperty("--accent-2", "#" + uniforms.uColB.value.getHexString());
    bgUniforms.uColA.value.lerp(colA, 0.03); bgUniforms.uColB.value.lerp(colB, 0.03);
    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
    bgUniforms.uMouse.value.set(mouse.x, -mouse.y);

    const isOrb = current === "orb";
    uniforms.uLit.value += ((isOrb ? 1 : 0) - uniforms.uLit.value) * 0.05;
    ring.uniforms.uAlpha.value += ((isOrb && morphT > 0.6 ? 1 : 0) - ring.uniforms.uAlpha.value) * 0.06;
    if (ring.uniforms.uAlpha.value > 0.01) {
      ring.obj.visible = true;
      ring.update(t, lv, voice.spectrum(), voice.waveform());
      ring.obj.rotation.set(0, 0, 0);
      ring.obj.position.set(anchorNow.x + mouse.x * 0.25, anchorNow.y - mouse.y * 0.18, 0);
      ring.obj.scale.setScalar(anchorNow.s);
    } else ring.obj.visible = false;

    if (isOrb) {
      // Turns slowly, faster while speaking; tilts toward the cursor
      if (!reduced) spin += dt * (0.12 + lv * 0.5 + spinKick);
      points.rotation.y += (spin + mouse.x * 1.1 - points.rotation.y) * 0.06;
      points.rotation.x += (mouse.y * 0.6 - points.rotation.x) * 0.06;
      const sc = anchorNow.s * (1 + lv * 0.05);
      points.scale.setScalar(points.scale.x + (sc - points.scale.x) * 0.3);
      points.position.set(anchorNow.x + mouse.x * 0.25, anchorNow.y - mouse.y * 0.18, 0);
      scene.rotation.y += (0 - scene.rotation.y) * 0.05;
    } else {
      points.scale.setScalar(points.scale.x + (1 - points.scale.x) * 0.1);
      points.position.multiplyScalar(0.9);
      if (!reduced) points.rotation.y += dt * (current === "helix" ? 0.6 : 0.08);
      points.rotation.x = mouse.y * 0.5;
      scene.rotation.y += (mouse.x * 0.5 - scene.rotation.y) * 0.05;
    }

    // Ease the orb toward its current anchor (centre during the experience, per-section on the site)
    const kAsp = Math.min(1, innerWidth / innerHeight / 1.6);
    anchorNow.x += (anchor.x * kAsp - anchorNow.x) * 0.05;
    anchorNow.y += (anchor.y - anchorNow.y) * 0.05;
    anchorNow.s += (anchor.s - anchorNow.s) * 0.05;
    spinKick *= 0.94;
    const sizeT = (siteMode ? 1.7 : 3.4) * renderer.getPixelRatio();
    uniforms.uSize.value += (sizeT - uniforms.uSize.value) * 0.05;
    renderer.clear();
    renderer.render(bgScene, bgCam);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  })();
})();

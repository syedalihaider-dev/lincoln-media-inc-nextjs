/* Inner pages: a light version of the home page's 3D layer (nebula glow, drifting stars,
 * the guide's particle orb) plus the menu and cursor. site.js handles the scroll animations. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener("pointermove", (e) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; });

  // Menu (small screens) + cursor
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  if (menu && menuBtn) {
    const setMenu = (open) => { menu.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); menu.setAttribute("aria-hidden", !open); };
    menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
    menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
    addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  }
  const cursor = $(".cursor");
  if (cursor) {
    addEventListener("pointermove", (e) => { cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; });
    document.addEventListener("pointerover", (e) => cursor.classList.toggle("hover", !!e.target.closest("a, button, input, select, textarea")));
  }
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();

  if (!window.THREE) return;
  const canvas = $("#field");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.autoClear = false;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 7;

  // Background: deep space with a soft red/violet glow and a horizon line
  const bgScene = new THREE.Scene(), bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const bgU = {
    uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uMouse: { value: new THREE.Vector2() },
    uColA: { value: new THREE.Color("#36e4d0") }, uColB: { value: new THREE.Color("#3b5bff") }, uLevel: { value: 0 }, uSite: { value: 0 },
  };
  // Same navy background as the guided experience
  bgScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: bgU, depthTest: false, depthWrite: false, extensions: { derivatives: true },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",
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
  })));

  // Stars
  const N = innerWidth < 700 ? 1600 : 3200, sp = new Float32Array(N * 3), ss = new Float32Array(N);
  for (let i = 0; i < N; i++) { sp.set([(Math.random() - .5) * 20, (Math.random() - .5) * 12, -Math.random() * 8], i * 3); ss[i] = Math.random(); }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(sp, 3)); sg.setAttribute("seed", new THREE.BufferAttribute(ss, 1));
  const su = { uTime: { value: 0 }, uSize: { value: 2 * renderer.getPixelRatio() } };
  const stars = new THREE.Points(sg, new THREE.ShaderMaterial({
    uniforms: su, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `attribute float seed; uniform float uTime, uSize; varying float vS;
      void main(){ vec3 p = position; p.y += sin(uTime * .2 + seed * 30.) * .06; vec4 mv = modelViewMatrix * vec4(p, 1.);
        gl_Position = projectionMatrix * mv; gl_PointSize = uSize * (.4 + seed) * (6. / -mv.z); vS = seed; }`,
    fragmentShader: `varying float vS; uniform float uTime;
      void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard;
        float tw = .55 + .45 * sin(uTime * (1. + vS * 3.) + vS * 50.);
        gl_FragColor = vec4(mix(vec3(.75, .95, 1.), vec3(.21, .89, .82), step(.93, vS)), smoothstep(.5, 0., d) * tw * .8); }`,
  }));
  scene.add(stars);

  /* The guide's particle orb (same look as the home page): a glowing particle shell with two
     orbit rings and a ring of soft waves around it. It moves to a spot per section while you scroll. */
  const ORB_R = 1.8, COUNT = innerWidth < 700 ? 9000 : 18000;
  const op = new Float32Array(COUNT * 3), on = new Float32Array(COUNT * 3), os = new Float32Array(COUNT);
  const rnd = (a = 1) => (Math.random() * 2 - 1) * a, golden = Math.PI * (3 - Math.sqrt(5));
  const nShell = Math.floor(COUNT * 0.72), nRing = Math.floor(COUNT * 0.08);
  const tilt = ([x, y, z], ax, az) => { const cx = Math.cos(ax), sx = Math.sin(ax), cz = Math.cos(az), sz = Math.sin(az); [y, z] = [y * cx - z * sx, y * sx + z * cx]; return [x * cz - y * sz, x * sz + y * cz, z]; };
  for (let i = 0; i < COUNT; i++) {
    let pos, n;
    if (i < nShell) { const y = 1 - (i / (nShell - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i; n = [Math.cos(th) * r, y, Math.sin(th) * r]; pos = n.map((c) => c * ORB_R * (1 + rnd(0.012))); }
    else if (i < nShell + nRing) { const w = (i - nShell) % 2, th = Math.random() * Math.PI * 2; n = tilt([Math.cos(th), 0, Math.sin(th)], w ? 1.15 : -0.95, w ? 0.35 : -0.5); pos = n.map((c) => c * ORB_R * (w ? 1.22 : 1.32)); }
    else { const z = rnd(1), th = Math.random() * Math.PI * 2, q = Math.sqrt(1 - z * z), d = [q * Math.cos(th), q * Math.sin(th), z], r = ORB_R * 0.92 * Math.pow(Math.random(), 0.6); pos = d.map((c) => c * r); n = d.map((c) => c * 0.4); }
    op.set(pos, i * 3); on.set(n, i * 3); os[i] = Math.random();
  }
  const og = new THREE.BufferGeometry();
  og.setAttribute("position", new THREE.BufferAttribute(op, 3)); og.setAttribute("normal", new THREE.BufferAttribute(on, 3)); og.setAttribute("seed", new THREE.BufferAttribute(os, 1));
  const ou = { uTime: { value: 0 }, uSize: { value: 3.4 * renderer.getPixelRatio() }, uColA: { value: new THREE.Color("#36e4d0") }, uColB: { value: new THREE.Color("#3b5bff") } };
  const orb = new THREE.Points(og, new THREE.ShaderMaterial({
    uniforms: ou, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `attribute float seed; uniform float uTime, uSize; varying float vSeed, vDepth, vLight, vRim;
      void main(){
        vec3 n = normalize(normal + 1e-5); float shell = smoothstep(.6, .9, length(normal));
        vec3 p = position + n * (.018 * sin(uTime * 1.3 + seed * 6.28) + .02 * sin(uTime * .8));
        p += (1. - shell) * .05 * vec3(sin(uTime*.9+seed*40.), cos(uTime*.7+seed*30.), sin(uTime*.6+seed*20.));
        vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;
        vec3 nv = normalize(normalMatrix * n); float key = max(dot(nv, normalize(vec3(-.5, .55, .7))), 0.);
        vRim = pow(1. - abs(nv.z), 3.) * shell;
        vLight = (.16 + key * .75 + vRim * 1.5) * mix(.55, 1., shell);
        gl_PointSize = uSize * (.6 + seed) * (6. / -mv.z) * (.8 + vRim * .6); vSeed = seed; vDepth = -mv.z; }`,
    fragmentShader: `uniform vec3 uColA, uColB; varying float vSeed, vDepth, vLight, vRim;
      void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard;
        float a = smoothstep(.5, 0., d) * (.35 + .65*vSeed) * clamp(9./vDepth - .4, .15, 1.);
        vec3 col = mix(uColA, uColB, mix(vSeed, clamp(1. - vRim * 1.2, 0., 1.), .7));
        gl_FragColor = vec4(col * 1.25 * vLight, a * clamp(vLight, .12, 1.)); }`,
  }));
  scene.add(orb);

  // Wave ring around the orb (gentle idle motion — no voice on these pages)
  const BINS = 160, PER = 10, RR = ORB_R * 1.36, RN = BINS * PER;
  const rp = new Float32Array(RN * 3), rt = new Float32Array(RN), rs = new Float32Array(RN);
  for (let i = 0; i < RN; i++) { rt[i] = (i % PER) / (PER - 1); rs[i] = Math.random(); }
  const rg = new THREE.BufferGeometry();
  rg.setAttribute("position", new THREE.BufferAttribute(rp, 3)); rg.setAttribute("tone", new THREE.BufferAttribute(rt, 1)); rg.setAttribute("seed", new THREE.BufferAttribute(rs, 1));
  const ring = new THREE.Points(rg, new THREE.ShaderMaterial({
    uniforms: ou, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
    vertexShader: `attribute float tone, seed; uniform float uSize; varying float vT, vS;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); gl_Position = projectionMatrix * mv; gl_PointSize = uSize * (.55 + seed * .7) * (6. / -mv.z); vT = tone; vS = seed; }`,
    fragmentShader: `uniform vec3 uColA, uColB; varying float vT, vS;
      void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard;
        gl_FragColor = vec4(mix(uColA, uColB, vT) * 1.3, smoothstep(.5, 0., d) * (.35 + .65 * vS) * .55 * (1. - vT * .45)); }`,
  }));
  scene.add(ring);
  function updateRing(t, boost) {
    for (let b = 0; b < BINS; b++) {
      const k = b < BINS / 2 ? b : BINS - 1 - b;
      const amp = 0.04 + 0.03 * Math.sin(t * 1.4 + k * 0.35) + 0.02 * Math.sin(t * 2.3 - k * 0.9) + boost * (0.5 + 0.5 * Math.sin(k * 0.6 + t * 9));
      const a = (b / BINS) * Math.PI * 2 + Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
      for (let j = 0; j < PER; j++) { const i = b * PER + j, r = RR + (rt[i] - 0.3) * amp * 1.3 + (rs[i] - 0.5) * 0.012; rp[i * 3] = ca * r; rp[i * 3 + 1] = sa * r; rp[i * 3 + 2] = 0; }
    }
    rg.attributes.position.needsUpdate = true;
  }

  const anchor = { x: 2.5, y: 0, s: 0.7 }, now = { x: 2.5, y: 0, s: 0.7 };
  let spin = 0, kick = 0;
  window.LM = {
    blob: (x, y, sc) => { anchor.x = x; anchor.y = y * 0.85; anchor.s = 0.25 + sc * 0.3; },
    velocity: (v) => (kick = Math.max(kick, Math.min(2, Math.abs(v) * 0.02))),
    siteMode() {}, sfx() {},
  };

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight; camera.position.z = innerWidth < 700 ? 9.5 : 7; camera.updateProjectionMatrix();
    bgU.uRes.value.set(innerWidth * renderer.getPixelRatio(), innerHeight * renderer.getPixelRatio());
  }
  addEventListener("resize", resize); resize();

  const clock = new THREE.Clock();
  (function tick() {
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
    su.uTime.value = t; bgU.uTime.value = t; bgU.uMouse.value.set(mouse.x, -mouse.y);
    if (!reduced) stars.rotation.y = mouse.x * 0.08 + t * 0.004;
    stars.position.y = (scrollY / innerHeight) * 0.35 % 12;
    ou.uTime.value = t; kick *= 0.94;
    const k = Math.min(1, innerWidth / innerHeight / 1.6);
    now.x += (anchor.x * k - now.x) * 0.05; now.y += (anchor.y - now.y) * 0.05; now.s += (anchor.s - now.s) * 0.05;
    if (!reduced) spin += dt * (0.12 + kick);
    orb.rotation.y += (spin + mouse.x * 1.1 - orb.rotation.y) * 0.06;
    orb.rotation.x += (mouse.y * 0.6 - orb.rotation.x) * 0.06;
    orb.position.set(now.x + mouse.x * 0.25, now.y - mouse.y * 0.18, 0); orb.scale.setScalar(now.s);
    ring.position.copy(orb.position); ring.scale.setScalar(now.s);
    updateRing(t, Math.min(0.5, kick * 0.25));
    renderer.clear(); renderer.render(bgScene, bgCam); renderer.render(scene, camera);
    requestAnimationFrame(tick);
  })();
})();

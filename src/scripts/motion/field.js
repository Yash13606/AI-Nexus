/** Hero particle field — raw WebGL, no three.js, no R3F.
 *
 *  WHAT IT DRAWS, and why it is not a particle demo.
 *
 *  Four helical strands wound around one vertical axis, tapering to a neck at
 *  each end, banded by sixteen rings where all four strands pass through the
 *  same height. That is the section's argument as an object: four products,
 *  one spine, meeting on a shared structure at regular intervals. The rings are
 *  what stop it reading as drifting confetti — they are visibly regular, so the
 *  eye reads a built thing rotating rather than particles moving.
 *
 *  Each strand takes one platform hue, and the hues are read out of the CSS
 *  tokens at init rather than restated here, so the field cannot drift from
 *  --color-medorbit / -edvation / -advohub / -trustproperty. The strands sit
 *  90 degrees apart, which is what keeps the four identifiable at distance
 *  instead of averaging to mud. Ring points take the blend of the two strands
 *  they sit between; that blend is the only place the hues mix, and it happens
 *  exactly where the structure says they meet.
 *
 *  NOTE ON DESIGN.md non-negotiable 8. The old rule is that platform colour
 *  identifies and never decorates, and the recovered CSS field refused hue for
 *  that reason. It holds. This is /platforms/ — the page whose subject is the
 *  set of four — so four hues at once, one per strand, is identification: it is
 *  the only image on the site where all four are true simultaneously. A single
 *  hue here would be decoration. Four is the argument. §16 records this as
 *  section-scoped, not a general licence.
 *
 *  COST. Geometry is built once on the CPU and never touched again. The whole
 *  per-frame CPU cost is two damping multiplies, three uniform writes and one
 *  drawArrays — which is why it survives a 4x CPU throttle unchanged. Rotation,
 *  perspective, depth fade and sprite shape all happen on the GPU. There is no
 *  matrix library because there is no matrix: the vertex shader does two axis
 *  rotations and one divide.
 *
 *  Caller owns the four bail decisions (reduced motion, core count, viewport,
 *  and this module never loading at all). The one failure it owns itself is
 *  context creation, which cannot be tested for in advance — see initField's
 *  return contract. */

const STRANDS = 4;
const PER_STRAND = 2200;
const RINGS = 16;
const PER_RING = 150;
const HAZE = 800;
const COUNT = STRANDS * PER_STRAND + RINGS * PER_RING + HAZE; // 12,000

/** Reference hero height, in CSS pixels. The form is drawn at this scale
 *  wherever it appears, so /platforms/ and the four detail pages show one
 *  object at one size rather than five of it at five. */
const REF_H = 620;

const TAU = Math.PI * 2;
const HEIGHT = 2.1;
const R0 = 0.66;
const TURNS = 1.35;

/** Radius profile. Tapers to a narrow neck at both ends, so the silhouette is a
 *  spindle rather than a cylinder — a cylinder rotating is ambiguous, a spindle
 *  rotating is obviously a solid. */
const radiusAt = (t) => R0 * (0.16 + 0.84 * Math.pow(Math.sin(Math.PI * t), 0.75));

/** #rrggbb from a custom property, to 0..1 float triples. Falls back to the
 *  literal only if the token has gone missing, which would itself be a bug. */
function hue(el, name, fallback) {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  const m = /^#?([0-9a-f]{6})$/i.exec(raw);
  const n = parseInt(m ? m[1] : fallback, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const DEFAULT_HUES = '--color-medorbit,--color-edvation,--color-advohub,--color-trustproperty';
const FALLBACK = ['0e7c7b', 'b45309', '8e1f3f', '6d28d9'];

/** Four strand colours, from `data-hues` on the canvas.
 *
 *  /platforms/ names all four platform tokens — four products, one spine, and
 *  §16.5 argues why four hues at once is identification there rather than
 *  decoration. A single platform page names one token instead, and the four
 *  strands become four TONES of it: the structure still reads as four wound
 *  strands, but the page stays in its own colour, which is what §6 requires
 *  everywhere except the page whose subject is the set.
 *
 *  Tones vary in BOTH directions — negative toward ink, positive toward paper.
 *  Blending only toward paper was the first attempt and it washed three of the
 *  four strands out: at 0.5 a strand is half white and all but disappears on a
 *  Paper hero. One darker, one at full strength and two lighter keeps four
 *  distinguishable filaments while the page stays in one colour. */
const TONES = [-0.26, 0, 0.2, 0.4];

function strandHues(el) {
  const names = (el.dataset.hues || DEFAULT_HUES).split(',').map((n) => n.trim()).filter(Boolean);
  const base = names.map((n, i) => hue(el, n, FALLBACK[i] || FALLBACK[0]));
  if (base.length >= STRANDS) return base.slice(0, STRANDS);
  const c = base[0];
  return TONES.map((t) => c.map((v) => (t >= 0 ? v + (1 - v) * t : v * (1 + t))));
}

const VERT = `
attribute vec3 a_pos;
attribute vec3 a_col;
attribute vec2 a_meta;
uniform float u_t;
uniform vec2 u_par;
uniform float u_aspect;
uniform float u_px;
uniform float u_ox;
uniform float u_fit;
varying vec3 v_col;
varying float v_a;
void main() {
  vec3 p = a_pos * (1.0 + 0.018 * sin(u_t * 0.42));
  float ay = u_t * 0.085 + u_par.x;
  float cy = cos(ay), sy = sin(ay);
  p = vec3(p.x * cy + p.z * sy, p.y, p.z * cy - p.x * sy);
  float ax = 0.28 + u_par.y;
  float cx = cos(ax), sx = sin(ax);
  p = vec3(p.x, p.y * cx - p.z * sx, p.z * cx + p.y * sx);
  float zc = max(3.05 - p.z, 0.05);
  float w = 1.9 / zc;
  gl_Position = vec4(p.x * w * u_fit / u_aspect + u_ox, p.y * w * u_fit, 0.0, 1.0);
  gl_PointSize = u_px * a_meta.y * w * u_fit;
  v_a = a_meta.x * mix(0.09, 0.60, clamp((3.95 - zc) / 1.8, 0.0, 1.0));
  v_col = a_col;
}`;

/* Premultiplied out, blended with ONE / ONE_MINUS_SRC_ALPHA. That is the only
   combination that composites a transparent canvas over page content without
   haloing — straight alpha over a premultiplied canvas fringes every sprite. */
const FRAG = `
precision mediump float;
varying vec3 v_col;
varying float v_a;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = dot(d, d);
  if (r > 0.25) discard;
  float a = v_a * smoothstep(0.25, 0.05, r);
  gl_FragColor = vec4(v_col * a, a);
}`;

function build(hues) {
  // Interleaved: pos.xyz, col.rgb, alphaScale, sizeScale.
  const data = new Float32Array(COUNT * 8);
  let o = 0;
  const put = (x, y, z, c, a, s) => {
    data[o] = x; data[o + 1] = y; data[o + 2] = z;
    data[o + 3] = c[0]; data[o + 4] = c[1]; data[o + 5] = c[2];
    data[o + 6] = a; data[o + 7] = s;
    o += 8;
  };

  for (let s = 0; s < STRANDS; s++) {
    for (let i = 0; i < PER_STRAND; i++) {
      const t = i / (PER_STRAND - 1);
      const ang = t * TURNS * TAU + (s * TAU) / STRANDS;
      // Jitter gives the strand thickness. Held near 3% of radius: enough to
      // read as a bundle of filaments, not enough to blur the four apart.
      const r = radiusAt(t) * (1 + (Math.random() - 0.5) * 0.06);
      const wob = (Math.random() - 0.5) * 0.014;
      put(Math.cos(ang) * r, (t - 0.5) * HEIGHT + wob, Math.sin(ang) * r, hues[s], 1, 1);
    }
  }

  for (let k = 0; k < RINGS; k++) {
    const t = (k + 0.5) / RINGS;
    const r = radiusAt(t) * 1.02;
    const y = (t - 0.5) * HEIGHT;
    for (let i = 0; i < PER_RING; i++) {
      const ang = (i / PER_RING) * TAU;
      // Which two strands is this point between, and how far along. The mix is
      // the only hue blending in the field, and it lands on the structure.
      const f = ((ang - t * TURNS * TAU) / TAU) * STRANDS;
      const a = ((Math.floor(f) % STRANDS) + STRANDS) % STRANDS;
      const b = (a + 1) % STRANDS;
      const u = f - Math.floor(f);
      const c = [0, 1, 2].map((j) => hues[a][j] * (1 - u) + hues[b][j] * u);
      put(Math.cos(ang) * r, y + (Math.random() - 0.5) * 0.01, Math.sin(ang) * r, c, 0.5, 0.85);
    }
  }

  // Thin outer shell. Reads as atmosphere at this alpha, and softens a
  // silhouette that is otherwise a hard geometric edge. Deliberately sparse —
  // this is the part that becomes confetti if it is overfed.
  for (let i = 0; i < HAZE; i++) {
    const u = Math.random() * 2 - 1;
    const ang = Math.random() * TAU;
    const rr = R0 * (1.18 + Math.random() * 0.55);
    const sr = Math.sqrt(1 - u * u) * rr;
    put(
      Math.cos(ang) * sr,
      u * (HEIGHT * 0.52),
      Math.sin(ang) * sr,
      hues[(Math.random() * STRANDS) | 0],
      0.22,
      0.7
    );
  }
  return data;
}

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
}

/** Returns true once the first frame is on screen, false if WebGL is
 *  unavailable or the program failed to link. A false return is the caller's
 *  signal to leave the static gradient at full strength — the canvas is never
 *  shown empty. */
export function initField(canvas) {
  const gl =
    canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
    }) || canvas.getContext('experimental-webgl');
  if (!gl) return false;

  const prog = gl.createProgram();
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return false;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
  gl.useProgram(prog);

  const hues = strandHues(canvas);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, build(hues), gl.STATIC_DRAW);
  const stride = 32;
  [
    ['a_pos', 3, 0],
    ['a_col', 3, 12],
    ['a_meta', 2, 24],
  ].forEach(([name, size, off]) => {
    const loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, off);
  });

  const u = (n) => gl.getUniformLocation(prog, n);
  const uT = u('u_t');
  const uPar = u('u_par');
  const uAspect = u('u_aspect');
  const uPx = u('u_px');
  const uOx = u('u_ox');
  const uFit = u('u_fit');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  // DPR capped at 1.5. Above that this is pure fill-rate spend on sprites a
  // couple of pixels across, which no one can see.
  let dpr = 1;
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.max(canvas.clientWidth, 1);
    const h = Math.max(canvas.clientHeight, 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uAspect, w / h);
    gl.uniform1f(uPx, dpr * 3.6);
    /* The form sits in the empty right of the hero, clear of the text column.
       Below 1100px there is no empty right, so the component drops the whole
       canvas box under the text instead and the form centres in it — and the
       nudge goes with it, because there is nothing to be clear of.

       `data-ox-shift` is in clip space, where the canvas spans -1..1, so 0.1 is
       5% of the canvas width. The detail pages pass one: their text column is
       narrower than the index's, which leaves the form sitting closer to the
       words than it does there. */
    const shift = w >= 1100 ? parseFloat(el.dataset.oxShift || '0') || 0 : 0;
    gl.uniform1f(uOx, w >= 1100 ? 0.46 + shift : 0);

    /* The projection fits the canvas HEIGHT, so without this the form is as
       big as its hero — and the heroes are not the same height. AdvoHub's lede
       runs to ten lines and its spindle came out noticeably larger than
       MedOrbit's. u_fit rescales to a fixed reference so the object is the
       same size on every page, and only ever shrinks: on a hero shorter than
       the reference it stays fitted rather than overflowing. */
    gl.uniform1f(uFit, Math.min(REF_H, h) / h);
  }
  size();
  new ResizeObserver(size).observe(canvas);

  // Damped cursor parallax. 0.045 per frame is ~350ms to settle: the field
  // trails the pointer with visible weight instead of tracking it. Rotation
  // rather than translation, because translating a perspective object reads as
  // sliding a picture and rotating reads as turning an object.
  let tx = 0, ty = 0, cx = 0, cy = 0;
  if (matchMedia('(pointer: fine)').matches) {
    addEventListener(
      'pointermove',
      (e) => {
        tx = (e.clientX / innerWidth - 0.5) * 0.34;
        ty = (e.clientY / innerHeight - 0.5) * 0.16;
      },
      { passive: true }
    );
  }

  // Never runs while it cannot be seen: off-screen or backgrounded tab.
  let visible = true;
  let raf = 0;
  const t0 = performance.now();

  function frame(now) {
    raf = requestAnimationFrame(frame);
    cx += (tx - cx) * 0.045;
    cy += (ty - cy) * 0.045;
    gl.uniform1f(uT, (now - t0) / 1000);
    gl.uniform2f(uPar, cx, cy);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, COUNT);
  }
  function run(on) {
    if (on && !raf) raf = requestAnimationFrame(frame);
    else if (!on && raf) (cancelAnimationFrame(raf), (raf = 0));
  }
  new IntersectionObserver(
    ([e]) => ((visible = e.isIntersecting), run(visible && !document.hidden)),
    { threshold: 0 }
  ).observe(canvas);
  document.addEventListener('visibilitychange', () => run(visible && !document.hidden));

  // One synchronous frame before returning, so the caller only crossfades once
  // there is genuinely something to crossfade to.
  frame(performance.now());
  return true;
}

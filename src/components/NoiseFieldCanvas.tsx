"use client";

import { useEffect, useRef } from "react";

// The moving noise field, WebGL 1 so it runs everywhere. It sits over the
// still frame in NoiseField.tsx and removes itself when it cannot draw.

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res; uniform float u_t; uniform float u_dark;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); vec2 s = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), s.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), s.x), s.y);
}
float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int k = 0; k < 5; k++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; } return v; }
void main() {
  // uv.y runs 0 at the top of the canvas to 1 at the bottom (the ground)
  vec2 uv = vec2(gl_FragCoord.x / u_res.x, 1.0 - gl_FragCoord.y / u_res.y);
  float aspect = u_res.x / u_res.y;
  vec3 paper = mix(vec3(0.980, 0.976, 0.965), vec3(0.051, 0.047, 0.133), step(0.5, u_dark));
  vec3 indigo = vec3(0.173, 0.188, 0.525);
  vec3 orange = vec3(0.949, 0.404, 0.133);
  vec2 q = vec2(uv.x * aspect * 2.2, uv.y * 2.2) + vec2(u_t * 0.09, -u_t * 0.035);
  float n = fbm(q + 0.35 * fbm(q * 1.7 - u_t * 0.06));
  float ground = smoothstep(0.15, 0.95, uv.y);
  n = (n - 0.42) * 1.6 * ground;
  vec3 c = paper;
  c = mix(c, orange, clamp(n, 0.0, 1.0) * 0.55);
  c = mix(c, indigo, clamp(n - 0.55, 0.0, 1.0) * 0.9);
  float g = hash(gl_FragCoord.xy + vec2(fract(u_t * 61.0) * 917.0, fract(u_t * 37.0) * 613.0)) - 0.5;
  c = c + g * 0.09 * (0.35 + ground);
  gl_FragColor = vec4(c, 1.0);
}`;

export default function NoiseFieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let stop = false;
    const bail = (why: string) => {
      console.info(`[NoiseField] still frame: ${why}`);
      canvas.remove();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bail("prefers-reduced-motion");
      return;
    }
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!gl) {
      bail("no WebGL");
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) throw new Error("createShader failed");
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader compile failed");
      return sh;
    };
    let prog: WebGLProgram | null = null;
    try {
      prog = gl.createProgram();
      if (!prog) throw new Error("createProgram failed");
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link failed");
    } catch (e) {
      bail(e instanceof Error ? e.message : String(e));
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");
    const uDark = gl.getUniformLocation(prog, "u_dark");

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const draw = (t: number) => {
      size();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, t);
      gl.uniform1f(uDark, dark.matches ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let visible = true;
    const io = new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
    });
    io.observe(canvas);
    const onLost = (e: Event) => {
      e.preventDefault();
      stop = true;
      bail("context lost");
    };
    canvas.addEventListener("webglcontextlost", onLost);
    const t0 = performance.now();
    const loop = (now: number) => {
      if (stop) return;
      if (visible) draw((now - t0) / 1000);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    return () => {
      stop = true;
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="lineup__canvas" aria-hidden="true" />;
}

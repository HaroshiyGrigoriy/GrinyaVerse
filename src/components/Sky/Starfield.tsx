// src/components/Sky/StarField.tsx
import React, { useEffect, useRef } from "react";
import "./starfield.scss";

/** Лёгкий звездный фон:
 *  три параллакс-слоя, оффскрин-спрайты, ограничение FPS.
 */

// --- ТЮНИНГ ---
const PARALLAX = { FAR: 0.25, MID: 0.6, NEAR: 1.0 };
const DENSITY  = { FAR: 0.35, MID: 0.45, NEAR: 0.25 }; // на 10k CSS-пикселей
const BRIGHT_RATIO = { FAR: 0.01, MID: 0.02, NEAR: 0.03 };

const CAMERA_BASE_SPEED = 10;
const CAMERA_EASE = 1.4;
const TARGET_INTERVAL = 4.5;
const TARGET_JITTER = 0.6;

const PULSE = 0.05;     // «дыхание»
const TWINKLE = 0.10;   // мерцание
const NEAR_WANDER_SPEED = 1.2;
const NEAR_WANDER_AMP = 0.7;
const MAX_FPS = 45;

// --- ТИПЫ ---
type Star = {
  x: number; y: number;
  r: number; alpha: number;
  phase: number; freq: number;
  bright?: boolean;
  wp?: number; wa?: number; ws?: number;
};

// --- УТИЛИТЫ ---
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const mod = (n: number, m: number) => ((n % m) + m) % m;

// --- СПРАЙТЫ ---
function makeStarSprite(dpr: number, coreR: number, glowMul: number) {
  const size = Math.ceil((coreR * (2 + glowMul * 2)) * 2);
  const s = Math.max(8 * dpr, size);
  const off = document.createElement("canvas");
  off.width = off.height = s;
  const ctx = off.getContext("2d")!;
  ctx.clearRect(0, 0, s, s);

  const cx = s / 2, cy = s / 2;

  // гало (однократно)
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.35;
  ctx.shadowBlur = coreR * (2.6 * glowMul);
  ctx.shadowColor = "rgba(255,255,255,0.55)";
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
  ctx.fill();

  // ядро
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(0.4, coreR * 0.8), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  return off;
}

function makeBackground(w: number, h: number) {
  const off = document.createElement("canvas");
  off.width = w; off.height = h;
  const ctx = off.getContext("2d")!;
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,w,h);

  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "rgba(6,12,41,1)");
  g.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

  const neb = ctx.createRadialGradient(w*0.25, h*0.2, 0, w*0.25, h*0.2, Math.max(w,h)*0.7);
  neb.addColorStop(0, "rgba(8,24,19,0.10)");
  neb.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = neb; ctx.fillRect(0,0,w,h);

  return off;
}

// --- ГЕНЕРАЦИЯ ---
function genLayer(count: number, w: number, h: number, dpr: number, mul: number, withWander: boolean, brightRatio: number): Star[] {
  const arr: Star[] = [];
  for (let i = 0; i < count; i++) {
    const bright = Math.random() < brightRatio;
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 0.6 + 0.55) * mul * dpr,  // 0.55..1.15 dpx
      alpha: 0.55 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      freq: 0.6 + Math.random() * 0.6,
      bright,
      ...(withWander ? { wp: Math.random()*Math.PI*2, wa: NEAR_WANDER_AMP*dpr, ws: NEAR_WANDER_SPEED } : {}),
    });
  }
  return arr;
}

// --- РИСОВАНИЕ ---
function drawStarSprite(
  ctx: CanvasRenderingContext2D,
  s: Star,
  camX: number, camY: number,
  parallax: number,
  sprite: HTMLCanvasElement,
  brightSprite: HTMLCanvasElement
) {
  let x = s.x + camX * parallax;
  let y = s.y + camY * parallax;

  if (s.wp !== undefined && s.wa && s.ws) {
    x += Math.cos(s.wp) * s.wa;
    y += Math.sin(s.wp * 0.8) * s.wa;
  }

  const coreR = Math.max(0.45, s.r * (1 + Math.sin(s.phase * 0.7) * PULSE));
  const tw = 1 - TWINKLE * 0.5 + Math.sin(s.phase) * (TWINKLE * 0.5);
  const a = clamp(s.alpha * tw, 0.08, 1);

  const img = s.bright ? brightSprite : sprite;

  // масштаб спрайта под coreR
const scale = (coreR / (img.width / 8)) + 0.35;
  const sw = img.width * scale;
  const sh = img.height * scale;

  ctx.globalAlpha = a;
  ctx.drawImage(img, x - sw / 2, y - sh / 2, sw, sh);
  ctx.globalAlpha = 1;
}

function drawLayer(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  w: number, h: number,
  camX: number, camY: number,
  parallax: number,
  sprite: HTMLCanvasElement,
  brightSprite: HTMLCanvasElement
) {
  for (const s of stars) {
    const xWrapped = mod(s.x + camX * parallax, w);
    const yWrapped = mod(s.y + camY * parallax, h);
    ctx.save();
    ctx.translate(
      xWrapped - (s.x + camX * parallax),
      yWrapped - (s.y + camY * parallax)
    );
    drawStarSprite(ctx, s, camX, camY, parallax, sprite, brightSprite);
    ctx.restore();
  }
}

// === КОМПОНЕНТ ===
const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true }); if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    ctx.imageSmoothingEnabled = true;

    let w = 0, h = 0;
    let far: Star[] = [], mid: Star[] = [], near: Star[] = [];

    // кэш
    let bg: HTMLCanvasElement | null = null;
    let sprite!: HTMLCanvasElement;
    let brightSprite!: HTMLCanvasElement;

    // камера
    let camX = 0, camY = 0;
    let camVX = 0, camVY = 0;
    let targetVX = 0, targetVY = 0;
    let timeToRetarget = TARGET_INTERVAL;

    const ease = (cur: number, target: number, t: number) =>
      cur + (target - cur) * (1 - Math.exp(-CAMERA_EASE * t));

    function pickNewTarget() {
      const angle = Math.random() * Math.PI * 2;
      const mag = CAMERA_BASE_SPEED * (0.4 + Math.random() * TARGET_JITTER);
      targetVX = Math.cos(angle) * mag * dpr;
      targetVY = Math.sin(angle) * mag * dpr;
      timeToRetarget = TARGET_INTERVAL;
    }

    function resize() {
      if(!ctx)return;
      if(!canvas)return;
      const cssW = window.innerWidth, cssH = window.innerHeight;
      w = Math.floor(cssW * dpr); h = Math.floor(cssH * dpr);
      canvas.width = w; canvas.height = h;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      // фон кэшируем
      bg = makeBackground(w, h);

      const area10k = (cssW * cssH) / 10_000;
      const farCount  = Math.floor(area10k * DENSITY.FAR);
      const midCount  = Math.floor(area10k * DENSITY.MID);
      const nearCount = Math.floor(area10k * DENSITY.NEAR);

      far  = genLayer(farCount,  w, h, dpr, 0.85, false, BRIGHT_RATIO.FAR);
      mid  = genLayer(midCount,  w, h, dpr, 1.00, false, BRIGHT_RATIO.MID);
      near = genLayer(nearCount, w, h, dpr, 1.25, true,  BRIGHT_RATIO.NEAR);

      // спрайты
      sprite = makeStarSprite(dpr, 1.0 * dpr, 1.0);
      brightSprite = makeStarSprite(dpr, 1.2 * dpr, 1.25);

      camX = camY = 0; camVX = camVY = 0;
      pickNewTarget();

      // первичный кадр
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,w,h);
      if (bg) ctx.drawImage(bg, 0, 0);
      drawLayer(ctx, far,  w, h, camX, camY, PARALLAX.FAR, sprite, brightSprite);
      drawLayer(ctx, mid,  w, h, camX, camY, PARALLAX.MID, sprite, brightSprite);
      drawLayer(ctx, near, w, h, camX, camY, PARALLAX.NEAR, sprite, brightSprite);
    }

    function update(dt: number) {
      camVX = ease(camVX, targetVX, dt);
      camVY = ease(camVY, targetVY, dt);
      camX += camVX * dt;
      camY += camVY * dt;

      timeToRetarget -= dt;
      if (timeToRetarget <= 0) pickNewTarget();

      const adv = (arr: Star[]) => {
        for (const s of arr) {
          s.phase += s.freq * dt;
          if (s.wp !== undefined && s.ws) s.wp += s.ws * dt;
        }
      };
      adv(far); adv(mid); adv(near);
    }

    let prev = performance.now();
    const minFrame = 1000 / MAX_FPS;

    function frame(t: number) {
      if(!ctx)return;
      const elapsed = t - prev;
      if (elapsed < minFrame) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min(0.05, elapsed / 1000);
      prev = t;

      update(dt);

      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0, 0, w, h);
      if (bg) ctx.drawImage(bg, 0, 0);
      drawLayer(ctx, far,  w, h, camX, camY, PARALLAX.FAR, sprite, brightSprite);
      drawLayer(ctx, mid,  w, h, camX, camY, PARALLAX.MID, sprite, brightSprite);
      drawLayer(ctx, near, w, h, camX, camY, PARALLAX.NEAR, sprite, brightSprite);

      rafRef.current = requestAnimationFrame(frame);
    }

    function onVis() {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (rafRef.current == null) {
        prev = performance.now();
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    rafRef.current = requestAnimationFrame((t) => { prev = t; frame(t); });

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // ← useEffect закрыт

  // JSX-возврат компонента:
  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default StarField;

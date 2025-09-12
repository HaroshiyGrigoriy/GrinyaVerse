import React, { useEffect, useRef } from "react";
import "./starfield.scss";

type Props = {
  densityPer10k?: number;
  speed?: number;
  twinkle?: number;
  meteorChance?: number;

  label?: string;
  labelSize?: number;
  labelOpacity?: number;
  labelColor?: string;
  labelGlow?: boolean;
  labelY?: number;
  labelParallax?: number;
};

type Star = {
  x: number; y: number;
  z: number;             // 0..1
  size: number;          // px (DPR-aware)
  alpha: number;         // 0..1
  phase: number;         // мерцание
  twFreq: number;        // частота мерцания
  vx: number; vy: number;// скорость (px/s)
};

type Meteor = {
  x: number; y: number;
  vx: number; vy: number;
  life: number;          // 0..1
  width: number;
};

const Starfield: React.FC<Props> = ({
  densityPer10k = 1.8,
  speed = 24,
  twinkle = 0.5,
  meteorChance = 0.06,
  label = "Ждите релиза G-Verse",
  labelSize = 28,
  labelOpacity = 0.2,
  labelColor = "#eaf2ff",
  labelGlow = false,
  labelY = 0.58,
  labelParallax = 0.08,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // слои
    const Z_FAR = 0.33;
    const Z_MID = 0.66;

    // дрейф
    const DRIFT = { x: -1, y: -0.42 };
    const driftLen = Math.hypot(DRIFT.x, DRIFT.y) || 1;
    const dirX = DRIFT.x / driftLen;
    const dirY = DRIFT.y / driftLen;

    let w = 0, h = 0;
    const stars: Star[] = [];
    let meteors: Meteor[] = [];

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    function makeStar(): Star {
      const z = Math.pow(Math.random(), 1.6);
      const base = speed * (0.25 + z * 1.25);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        size: Math.max(0.6, z * 1.8) * dpr,
        alpha: 0.35 + z * 0.55,
        phase: Math.random() * Math.PI * 2,
        twFreq: rand(0.6, 1.3),
        vx: dirX * base * dpr,
        vy: dirY * base * dpr,
      };
    }

    function spawnMeteor() {
      const side = Math.random() < 0.5 ? "right" : "bottom";
      const entryPad = 0.1;
      const base = speed * 5 * dpr;
      let x = w * (1 + entryPad), y = Math.random() * h * (0.2 + Math.random() * 0.8);
      if (side === "bottom") { x = Math.random() * w * (0.2 + Math.random() * 0.8); y = h * (1 + entryPad); }
      const angle = Math.atan2(dirY, dirX) + rand(-0.15, 0.15);
      const vx = Math.cos(angle) * base;
      const vy = Math.sin(angle) * base;
      meteors.push({ x, y, vx, vy, life: 1, width: 1.5 * dpr });
      if (meteors.length > 3) meteors.shift();
    }

    function resize() {
      const c = canvasRef.current;
  if (!c) return;

  const { innerWidth, innerHeight } = window;
  w = Math.floor(innerWidth * dpr);
  h = Math.floor(innerHeight * dpr);

  c.width = w;
  c.height = h;
  c.style.width = `${innerWidth}px`;
  c.style.height = `${innerHeight}px`;

      const area10k = (innerWidth * innerHeight) / 10_000;
      const target = Math.max(300, Math.min(2200, Math.floor(area10k * densityPer10k)));

      if (stars.length === 0) {
        for (let i = 0; i < target; i++) stars.push(makeStar());
      } else if (stars.length < target) {
        for (let i = stars.length; i < target; i++) stars.push(makeStar());
      } else if (stars.length > target) {
        stars.length = target;
      }

      if (prefersReduced) drawStatic();
    }

    // ---- рисовалки принимают ctx явно (TS знает: не null) ----
    function drawBackground(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#080d1a");
      g.addColorStop(1, "#0f1630");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const rg = ctx.createRadialGradient(w * 0.22, h * 0.18, 0, w * 0.22, h * 0.18, w * 0.6);
      rg.addColorStop(0, "rgba(56,211,159,0.10)");
      rg.addColorStop(1, "rgba(56,211,159,0.00)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
    }

    function drawLabel(ctx: CanvasRenderingContext2D) {
      if (!label) return;
      const off = 120 * labelParallax * dpr;
      const x = (w / 2) + dirX * off;
      const y = (h * labelY);

      const px = Math.round(labelSize * dpr);
      ctx.font = `700 ${px}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.globalAlpha = Math.max(0, Math.min(1, labelOpacity));

      if (labelGlow) {
        ctx.save();
        ctx.shadowColor = "rgba(56,211,159,0.28)";
        ctx.shadowBlur = 24 * dpr;
        ctx.fillStyle = labelColor;
        ctx.fillText(label, x, y);
        ctx.restore();
      } else {
        ctx.fillStyle = labelColor;
        ctx.fillText(label, x, y);
      }

      ctx.lineWidth = Math.max(1, Math.round(1 * dpr));
      ctx.strokeStyle = "rgba(8,18,31,0.35)";
      ctx.strokeText(label, x, y);

      ctx.globalAlpha = 1;
    }

    function updateStars(dt: number) {
      for (const s of stars) {
        s.x += s.vx * dt; s.y += s.vy * dt;
        if (s.x < -16) s.x = w + 16;
        if (s.y < -16) s.y = h + 16;
        s.phase += s.twFreq * dt;
      }
    }

    function renderStarsAnimated(ctx: CanvasRenderingContext2D, zMin: number, zMax: number) {
      for (const s of stars) {
        if (s.z < zMin || s.z >= zMax) continue;
        const tw = 1 - twinkle * 0.5 + Math.sin(s.phase) * (twinkle * 0.5);
        ctx.globalAlpha = Math.max(0.05, Math.min(1, s.alpha * tw));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff"; ctx.fill();

        ctx.globalAlpha *= 0.45;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff"; ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function renderStarsStatic(ctx: CanvasRenderingContext2D, zMin: number, zMax: number) {
      for (const s of stars) {
        if (s.z < zMin || s.z >= zMax) continue;
        ctx.globalAlpha = s.alpha * 0.9;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff"; ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function drawStatic() {
      const ctx = ctxRef.current;
      if (!ctx) return;
      drawBackground(ctx);
      renderStarsStatic(ctx, 0, Z_FAR);
      renderStarsStatic(ctx, Z_FAR, Z_MID);
      drawLabel(ctx);
      renderStarsStatic(ctx, Z_MID, 1.01);
    }

    let prev = performance.now();
    function frame(t: number) {
      const ctx = ctxRef.current;
      if (!ctx) return;

      const dt = Math.min(0.05, (t - prev) / 1000);
      prev = t;

      drawBackground(ctx);
      updateStars(dt);
      renderStarsAnimated(ctx, 0, Z_FAR);
      renderStarsAnimated(ctx, Z_FAR, Z_MID);
      drawLabel(ctx);

      if (Math.random() < meteorChance * dt) spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * dt; m.y += m.vy * dt; m.life -= dt * 0.6;

        const tail = 80 * dpr;
        const nx = m.x - (m.vx / (speed * 5 * dpr)) * tail;
        const ny = m.y - (m.vy / (speed * 5 * dpr)) * tail;
        const grad = ctx.createLinearGradient(m.x, m.y, nx, ny);
        grad.addColorStop(0, "rgba(255,255,255,0.9)");
        grad.addColorStop(1, "rgba(255,255,255,0.0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(nx, ny); ctx.stroke();

        ctx.globalAlpha = Math.max(0, m.life);
        ctx.beginPath(); ctx.arc(m.x, m.y, m.width * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();
        ctx.globalAlpha = 1;

        if (m.life <= 0 || m.x < -50 || m.y < -50) meteors.splice(i, 1);
      }

      renderStarsAnimated(ctx, Z_MID, 1.01);

      rafRef.current = requestAnimationFrame(frame);
    }

    function onVis() {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!prefersReduced && rafRef.current == null) {
        prev = performance.now();
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    resize();

    if (!prefersReduced) {
      prev = performance.now();
      rafRef.current = requestAnimationFrame(frame);
    } else {
      drawStatic();
    }

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctxRef.current = null;
    };
  }, [
    densityPer10k, speed, twinkle, meteorChance,
    label, labelSize, labelOpacity, labelColor, labelGlow, labelY, labelParallax
  ]);

  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Starfield;

import React, { useEffect, useRef } from "react";
import "./starfield.scss";

type Star = {
  x: number; y: number;
  z: number; r: number;
  baseAlpha: number; twinkle: number; phase: number;
  vx: number; vy: number;
};

type Nebula = {
  color: string;
  alpha: number;
  width: number;
  softness: number;
  noiseScale: number;
  octaves: number;
  speed: number;
  rotate: number;
  parallax: number;
  curve: { p0:[number,number], p1:[number,number], p2:[number,number], p3:[number,number] };
  tex?: HTMLCanvasElement;
  off: number;

  // НОВОЕ ↓
  colors?: string[];      // массив цветов для градиента вдоль кривой
  baseHue?: number;       // базовый оттенок (0..360) если хочется анимировать HSL
  hueSwing?: number;      // амплитуда колебания оттенка в градусах
  hueSpeed?: number;      // скорость колебания оттенка
};


type Props = {
  starCount?: number;
  parallax?: number;
  breathe?: number;
  driftSpeed?: number;
  className?: string;

  // прежняя «полоса плотности» для звёзд (можно оставить как было)
  useBand?: boolean;
  bandAngleDeg?: number;
  bandWidth?: number;
  softness?: number;
  bgDensity?: number;
  boost?: number;
  fadeEnds?: boolean;
  showVeil?: boolean;

  // новое:
  nebulaeEnabled?: boolean;
};

const H = (deg: number) => ((deg % 360) + 360) % 360;
const hslaStr = (h: number, s = 80, l = 65, a = 1) => `hsla(${H(h)}, ${s}%, ${l}%, ${a})`;

const StarField: React.FC<Props> = ({
  starCount = 3950,
  parallax   = 52,
  breathe    = 0.003,
  driftSpeed = 0.015,
  className,

  useBand      = true,
  bandAngleDeg = 35,
  bandWidth    = 180,
  softness     = 140,
  bgDensity    = 0.06,
  boost        = 0.92,
  fadeEnds     = true,
  showVeil     = true,

  nebulaeEnabled = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef  = useRef<Star[]>([]);
  const rafRef    = useRef<number | null>(null);

  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // --- маска для плотности звёзд (как в прошлой версии) ---
  const maskDataRef = useRef<Uint8ClampedArray | null>(null);
  const maskSizeRef = useRef<{ w: number; h: number } | null>(null);

  // --- NEBULAE ---
const nebulaeRef = useRef<Nebula[]>([
  {
    color: "hsla(285, 85%, 72%, 1)", alpha: 0.32,
    width: 420, softness: 180, noiseScale: 1.6, octaves: 4,
    speed: 0.013, rotate: -0.10, parallax: 18, off: 0,
    curve: { p0:[0.05,0.70], p1:[0.30,0.40], p2:[0.65,0.60], p3:[0.95,0.35] },
    colors: ["hsla(290,85%,72%,1)","hsla(210,70%,65%,1)","hsla(40,90%,70%,1)"],
    baseHue: 290, hueSwing: 12, hueSpeed: 0.15
  },
  {
    color: "hsla(165, 70%, 62%, 1)", alpha: 0.26,
    width: 360, softness: 140, noiseScale: 2.1, octaves: 3,
    speed: 0.017, rotate: 0.08, parallax: 24, off: 0,
    curve: { p0:[0.10,0.85], p1:[0.35,0.55], p2:[0.55,0.80], p3:[0.90,0.55] },
    colors: ["hsla(180,70%,65%,1)","hsla(165,70%,62%,1)","hsla(120,65%,60%,1)"],
    baseHue: 170, hueSwing: 10, hueSpeed: 0.18
  },
  {
    color: "hsla(35, 90%, 70%, 1)",  alpha: 0.18,
    width: 520, softness: 220, noiseScale: 1.2, octaves: 5,
    speed: 0.009, rotate: 0.00, parallax: 12, off: 0,
    curve: { p0:[0.00,0.40], p1:[0.25,0.25], p2:[0.60,0.35], p3:[1.00,0.20] },
    colors: ["hsla(20,90%,72%,1)","hsla(35,90%,70%,1)","hsla(55,90%,65%,1)"],
    baseHue: 35, hueSwing: 8, hueSpeed: 0.12
  }
]);

  // --- маленький набор функций шума (value-noise + fbm) ---
  const hash = (x: number, y: number, s: number) => {
    // стабильный детерминированный хэш
    return fract(Math.sin(x*127.1 + y*311.7 + s*17.73) * 43758.5453);
  };
  const fract = (x: number) => x - Math.floor(x);
  const smooth = (t: number) => t*t*(3 - 2*t); // smoothstep
  const noise2D = (x: number, y: number, s: number) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi,       yf = y - yi;
    const a = hash(xi,   yi,   s);
    const b = hash(xi+1, yi,   s);
    const c = hash(xi,   yi+1, s);
    const d = hash(xi+1, yi+1, s);
    const u = smooth(xf), v = smooth(yf);
    return lerp(lerp(a,b,u), lerp(c,d,u), v);
  };
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const fbm = (x: number, y: number, oct: number, s: number) => {
    let f = 0, amp = 0.5, freq = 1;
    for (let i=0;i<oct;i++) {
      f += amp * noise2D(x*freq, y*freq, s+i*19.19);
      freq *= 2; amp *= 0.5;
    }
    return f;
  };

  function makeNoiseTexture(w: number, h: number, color: string, scale: number, octaves: number, seed: number) {
    const tex = document.createElement("canvas");
    tex.width = w; tex.height = h;
    const tctx = tex.getContext("2d")!;
    const img = tctx.createImageData(w, h);
    const data = img.data;

    for (let j=0;j<h;j++) {
      for (let i=0;i<w;i++) {
        const u = i / w, v = j / h;
        let n = fbm(u*scale, v*scale, octaves, seed);
        // нормализуем в 0..1 и слегка усилим контраст
        n = Math.pow(Math.max(0, Math.min(1, n)), 1.2);

        // раскрасим: цвет зададим сверху, альфу — от шума
        const idx = (j*w + i)*4;
        // парсим цвет в rgba (простой приём: нарисуем пиксель и прочитаем)
        // но чтобы не усложнять, возьмём белый и окрасим позже через globalCompositeOperation
        data[idx+0] = 255;
        data[idx+1] = 255;
        data[idx+2] = 255;
        data[idx+3] = Math.floor(255 * n);
      }
    }
    tctx.putImageData(img, 0, 0);

    // затемним края плавно (виньетка), чтобы тайлинг был мягче
    tctx.globalCompositeOperation = "destination-in";
    const g = tctx.createRadialGradient(w*0.5, h*0.5, 0, w*0.5, h*0.5, Math.max(w,h)*0.55);
    g.addColorStop(0.0, "rgba(0,0,0,1)");
    g.addColorStop(1.0, "rgba(0,0,0,0)");
    tctx.fillStyle = g;
    tctx.fillRect(0,0,w,h);

    // вернём белую «дымку» — её будем красить цветом через multiply/overlay при рендере
    return tex;
  }

  // вспомогательная отрисовка кубической кривой
  function strokeCubic(ctx: CanvasRenderingContext2D, w: number, h: number, curve: Nebula["curve"], width: number) {
    const {p0,p1,p2,p3} = curve;
    const [x0,y0] = [p0[0]*w, p0[1]*h];
    const [x1,y1] = [p1[0]*w, p1[1]*h];
    const [x2,y2] = [p2[0]*w, p2[1]*h];
    const [x3,y3] = [p3[0]*w, p3[1]*h];
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  // маска плотности звёзд (как раньше)
  function buildStarMask(sw: number, sh: number) {
    const m = document.createElement("canvas");
    m.width = sw; m.height = sh;
    const mctx = m.getContext("2d")!;
    if (useBand) {
      const angle = (bandAngleDeg * Math.PI) / 180;
      mctx.save();
      mctx.translate(sw/2, sh/2);
      mctx.rotate(angle);
      const half = Math.max(2, (bandWidth/2)|0);
      const soft = Math.max(1, (softness|0));

      const gy = mctx.createLinearGradient(0, -sh, 0, sh);
      const T = (y:number)=>(y+sh)/(2*sh);
      const y0 = -(half+soft), y1=-half, y2=half, y3=half+soft;
      gy.addColorStop(0, "rgba(0,0,0,0)");
      gy.addColorStop(T(y0), "rgba(0,0,0,0)");
      gy.addColorStop(T(y1), "rgba(0,0,0,1)");
      gy.addColorStop(T(y2), "rgba(0,0,0,1)");
      gy.addColorStop(T(y3), "rgba(0,0,0,0)");
      gy.addColorStop(1, "rgba(0,0,0,0)");
      mctx.fillStyle = gy;
      mctx.fillRect(-sw,-sh, sw*2, sh*2);

      if (fadeEnds) {
        mctx.globalCompositeOperation = "destination-in";
        const gx = mctx.createLinearGradient(-sw,0,sw,0);
        gx.addColorStop(0.00, "rgba(0,0,0,0)");
        gx.addColorStop(0.15, "rgba(0,0,0,1)");
        gx.addColorStop(0.85, "rgba(0,0,0,1)");
        gx.addColorStop(1.00, "rgba(0,0,0,0)");
        mctx.fillStyle = gx;
        mctx.fillRect(-sw,-sh, sw*2, sh*2);
      }
      mctx.restore();
    }
    const data = mctx.getImageData(0,0,sw,sh).data;
    maskDataRef.current = data;
    maskSizeRef.current = { w: sw, h: sh };
  }

  function alphaAt(x: number, y: number): number {
    const ms = maskSizeRef.current;
    const data = maskDataRef.current;
    if (!ms || !data) return 0;
    const xi = Math.max(0, Math.min(ms.w-1, x|0));
    const yi = Math.max(0, Math.min(ms.h-1, y|0));
    const idx = (yi*ms.w + xi)*4 + 3;
    return data[idx] / 255;
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = 0, h = 0;
    const margin = 80;

    // генерим звёзды (с отбором по маске)
    const makeStars = (count: number) => {
      const arr: Star[] = [];
      let attempts = 0, maxAttempts = count*50;
      while (arr.length < count && attempts < maxAttempts) {
        attempts++;
        const z = Math.pow(Math.random(), 2.2);
        const r = 0.2 + z*0.6;
        const x = -margin + Math.random()*(w + margin*2);
        const y = -margin + Math.random()*(h + margin*2);
        const p = Math.min(1, bgDensity + boost * alphaAt(x,y));
        if (Math.random() < p) {
          const ang = Math.random()*Math.PI*2;
          const speed = driftSpeed * (0.4 + z*0.8);
          arr.push({
            x,y,z,r,
            baseAlpha: 0.25 + z*0.5,
            twinkle: 0.6 + Math.random()*1.2,
            phase: Math.random()*Math.PI*2,
            vx: Math.cos(ang)*speed,
            vy: Math.sin(ang)*speed
          });
        }
      }
      while (arr.length < count) {
        const z = Math.pow(Math.random(), 2.2);
        const r = 0.2 + z*0.6;
        const x = -margin + Math.random()*(w + margin*2);
        const y = -margin + Math.random()*(h + margin*2);
        const ang = Math.random()*Math.PI*2;
        const speed = driftSpeed * (0.4 + z*0.8);
        arr.push({
          x,y,z,r,
          baseAlpha: 0.22 + z*0.45,
          twinkle: 0.6 + Math.random()*1.2,
          phase: Math.random()*Math.PI*2,
          vx: Math.cos(ang)*speed,
          vy: Math.sin(ang)*speed
        });
      }
      return arr;
    };

    // оффскрин для сборки туманности
    const tmp = document.createElement("canvas");
    const tctx = tmp.getContext("2d")!;

    const buildNebulae = () => {
      if (!nebulaeEnabled) return;
      // низкое разрешение шумовой текстуры (быстро), потом масштабируем
      const TW = 768, TH = 768;
      nebulaeRef.current.forEach((n, i) => {
        n.tex = makeNoiseTexture(TW, TH, n.color, n.noiseScale, n.octaves, i*13.37 + 1.234);
        n.off = Math.random()*1000;
      });
    };

    const drawNebulae = (time: number) => {
      if (!nebulaeEnabled) return;
      nebulaeRef.current.forEach((n) => {
        if (!n.tex) return;

        // собираем слой на временном канвасе, чтобы применить маску-кривую
        tmp.width = w; tmp.height = h;
        // 1) заливаем «дымку» (белая шумовая текстура)
        tctx.save();
        tctx.globalCompositeOperation = "source-over";
        tctx.clearRect(0,0,w,h);

        // параллакс с указателя + медленное вращение/поток
        const depthShiftX = pointer.current.x * n.parallax;
        const depthShiftY = pointer.current.y * n.parallax;

        const tex = n.tex!;
        const scale = Math.max(w/tex.width, h/tex.height) * 1.4; // чуть больше экрана
        const ox = (w - tex.width*scale)/2 + depthShiftX*0.6;
        const oy = (h - tex.height*scale)/2 + depthShiftY*0.6;

        // движение текстуры
        n.off += n.speed;
        tctx.translate(w/2, h/2);
        tctx.rotate(n.rotate + n.off*0.05);
        tctx.translate(-w/2, -h/2);

        // слегка «дышим» непрозрачностью, даёт объём
        const breathe = 0.06 * Math.sin(time*0.2 + n.off*0.7);

        tctx.globalAlpha = Math.max(0, Math.min(1, n.alpha + breathe));
        tctx.drawImage(tex, ox, oy, tex.width*scale, tex.height*scale);

        // 2) красим в цвет туманности
   tctx.globalCompositeOperation = "source-atop";

// концы кривой в экранных координатах
const { p0, p3 } = n.curve;
const [gx0, gy0] = [p0[0]*w, p0[1]*h];
const [gx1, gy1] = [p3[0]*w, p3[1]*h];

const grad = tctx.createLinearGradient(gx0, gy0, gx1, gy1);

if (n.colors && n.colors.length >= 2) {
  // фиксированная палитра из пресета
  const stops = n.colors;
  const step = 1 / (stops.length - 1);
  stops.forEach((c, i) => grad.addColorStop(i * step, c));
} else if (n.baseHue !== undefined) {
  // динамическая HSL-палитра (легкая «радуга» во времени)
  const tHue = n.baseHue + Math.sin(time * (n.hueSpeed ?? 0.15) + n.off*0.3) * (n.hueSwing ?? 0);
  grad.addColorStop(0.00, hslaStr(tHue + 0, 85, 72, 1));
  grad.addColorStop(0.50, hslaStr(tHue + 40, 80, 66, 1));
  grad.addColorStop(1.00, hslaStr(tHue + 90, 90, 60, 1));
} else {
  // запасной вариант: один цвет (как раньше)
  grad.addColorStop(0, n.color);
  grad.addColorStop(1, n.color);
}

tctx.fillStyle = grad;
tctx.fillRect(0, 0, w, h);

        // 3) делаем мягкую кривую-маску (blur)
        tctx.globalCompositeOperation = "destination-in";
        tctx.filter = `blur(${n.softness}px)`;
        tctx.strokeStyle = "rgba(0,0,0,1)";
        strokeCubic(tctx, w, h, n.curve, n.width);
        tctx.stroke();
        tctx.filter = "none";

        tctx.restore();

        // 4) выводим слой на основной canvas с add-смешиванием
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 1;
        ctx.drawImage(tmp, 0, 0);
        ctx.restore();
      });
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildStarMask(w, h);
      starsRef.current = makeStars(starCount);
      buildNebulae();
    };

    const onMove = (e: MouseEvent) => {
      const cx = w/2, cy = h/2;
      pointer.current.tx = (e.clientX - cx)/w;
      pointer.current.ty = (e.clientY - cy)/h;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const cx = w/2, cy = h/2;
      pointer.current.tx = (e.touches[0].clientX - cx)/w;
      pointer.current.ty = (e.touches[0].clientY - cy)/h;
    };
    const onLeave = () => { pointer.current.tx = 0; pointer.current.ty = 0; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

    let t = 0;
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      t += 0.016;

      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.08;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.08;

      // дрейф звёзд
      for (const s of starsRef.current) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < -margin) s.x += (w + margin*2);
        else if (s.x > w+margin) s.x -= (w + margin*2);
        if (s.y < -margin) s.y += (h + margin*2);
        else if (s.y > h+margin) s.y -= (h + margin*2);
      }

      ctx.clearRect(0,0,w,h);

      // лёгкая вуаль (как была)
      if (showVeil) {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0.10, "rgba(122, 92, 255, 0.10)");
        g.addColorStop(0.55, "rgba(56, 211, 159, 0.06)");
        g.addColorStop(0.95, "rgba(122, 92, 255, 0.00)");
        ctx.fillStyle = g;
        ctx.fillRect(0,0,w,h);
      }

      // ТУМАННОСТИ (добавляют объём и цвет)
      drawNebulae(t);

      // ЗВЁЗДЫ
      const cx = w/2, cy = h/2;
      const breatheFactor = 1 + Math.sin(t * 0.35) * breathe;
      for (const s of starsRef.current) {
        const depth = 0.35 + s.z * 1.1;
        const dx = s.x - cx, dy = s.y - cy;
        let px = cx + dx * breatheFactor;
        let py = cy + dy * breatheFactor;
        px += pointer.current.x * parallax * depth * 1.2;
        py += pointer.current.y * parallax * depth * 1.2;
        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.twinkle + s.phase));

        ctx.globalAlpha = alpha;
        ctx.beginPath(); ctx.arc(px, py, s.r, 0, Math.PI*2);
        ctx.fillStyle = "#fff"; ctx.fill();

        ctx.globalAlpha = alpha * 0.35;
        ctx.beginPath(); ctx.arc(px, py, s.r*2.2, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
    };
  }, [starCount, parallax, breathe, driftSpeed,
      useBand, bandAngleDeg, bandWidth, softness, bgDensity, boost, fadeEnds, showVeil,
      nebulaeEnabled]);

  return (
    <div className={className ?? "starfield"} aria-hidden="true">
      <canvas ref={canvasRef} ></canvas>
    </div>
    
  );
};

export default StarField;

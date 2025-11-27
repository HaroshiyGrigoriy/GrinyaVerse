import { useEffect } from "react";

export default function useStarfield(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };
    resize();

    let width = window.innerWidth;
    let height = window.innerHeight;
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    // Ещё больше звёзд для яркого космического фона
    const STAR_COUNT = clamp(Math.floor((width * height) / 1000), 600, 3000);
    const stars = Array.from({ length: STAR_COUNT }).map(() =>
      newStar(width, height)
    );

    let raf;
    const draw = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Полностью прозрачный фон - звёзды на тёмном фоне body
      ctx.clearRect(0, 0, width, height);

      // Звёзды - делаем очень яркими и заметными
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
        const tw = 0.7 + 0.3 * Math.sin((s.phase += s.twinkle));
        const r = s.r * tw;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        // Делаем звёзды очень яркими
        ctx.fillStyle = `rgba(255,255,255,${0.95 * tw})`;
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 15 * tw;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

function newStar(width, height) {
  // Делаем звёзды крупнее и ярче для лучшей видимости
  const r = Math.random() * 2 + 0.5;
  const speed = 0.05 + Math.random() * 0.25;
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    phase: Math.random() * Math.PI * 2,
    twinkle: 0.02 + Math.random() * 0.03,
  };
}

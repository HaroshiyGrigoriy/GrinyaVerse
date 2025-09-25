import React,{useRef, useEffect} from "react";
import './FullCanvas.module.scss';
import { Scene } from './core/Scene';
import { StarLayer } from './layers/StarLayer';
import { StarBeltLayer } from "./layers/StarBeltLayer";
import { BeltGradientLayer } from "./layers/BeltGradientLayer";

const palette = ["#8ecbff", "#7ff2df", "#b999ff", "#ffffff"];
const weights = [0.5, 0.2, 0.15, 0.15];

const FullCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement| null>(null);
  const sceneRef = useRef<Scene| null>(null); 


  useEffect(()=> {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx= canvas.getContext('2d');
    if(!ctx) return;
     const dpr = window.devicePixelRatio || 1;
      let widthCSS = 0;
      let heightCSS = 0;
    const resizeCanvas = () => {
     widthCSS =  window.innerWidth;
     heightCSS = window.innerHeight;

      canvas.width = Math.max(1,Math.floor(widthCSS * dpr));
      canvas.height = Math.max(1,Math.floor(heightCSS * dpr));

     canvas.style.width = `${widthCSS}px`;
     canvas.style.height = `${heightCSS}px`;
    
      ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.imageSmoothingEnabled = true;
      (ctx as any).imageSmoothingQuality = "high";
    };

const rebuildScene = () => {
  const scene = new Scene({width:widthCSS, height: heightCSS });

scene.addLayer(
  new StarLayer(widthCSS, heightCSS, {
    count:1500,
    radius: [0.35, 1.5],
    alpha: [0.25, 0.8],
    parallaxPx: 16,
    twinkleAmp: 0.35,
    twinkleFreq: [0.4, 1.0],
    colors: palette,
   colorWeights: weights, // снизу→верх меняется оттенок
    driftPxPerSec: { x: 1, y: 0 },
  })
);
// scene.addLayer(
//   new BeltGradientLayer(widthCSS, heightCSS, {
//     beltY: 0.50,
//     thickness: 1560,
//     opacity: 0.20,
//     parallaxPx: 10,
//     // stops можно не передавать — дефолт уже хороший
//   })
// );
scene.addLayer(
  new StarBeltLayer(widthCSS, heightCSS, {
    count: 2200,
    beltY: 0.35,
    thickness: 420,
    radius: [0.25, 1.7],
    alpha: [0.45, 1.2],
    parallaxPx: 14,
    twinkleAmp: 0.2,
    twinkleFreq: [0.6, 1.3],
    colors: palette,
    colorMode: "palette", // тут просто случайные оттенки из палитры
  })
);

  scene.addLayer(
    new StarLayer(widthCSS,heightCSS, {
      count:1250,
      radius:[0.4,2.2],
      alpha: [0.5, 1.2],
      parallaxPx: 28,
      twinkleAmp: 0.28,
      twinkleFreq: [0.8, 1.8],
    })
  );
  sceneRef.current = scene;
};


    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeCanvas();
        sceneRef.current?.resize(widthCSS, heightCSS);
        rebuildScene();
      }, 120);};

       const onPointerMove = (e: PointerEvent) => {
      if (!sceneRef.current) return;
      const nx = (e.clientX / widthCSS) * 2 - 1;   // -1..1
      const ny = (e.clientY / heightCSS) * 2 - 1;  // -1..1
      sceneRef.current.setPointerTarget(nx, ny);
    };

    resizeCanvas();
    rebuildScene();


     window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

       let last = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const dt = Math.max(0, Math.min(50, now - last)); // clamp
      last = now;

      // очистка в CSS-координатах
      ctx.clearRect(0, 0, widthCSS, heightCSS);

      // апдейт и рендер
      sceneRef.current?.update(dt, now / 1000);
      sceneRef.current?.render(ctx);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas"/>;
};

export default FullCanvas;
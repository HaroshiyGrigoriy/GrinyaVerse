import React,{useRef, useEffect} from "react";
import './FullCanvas.module.scss';
import { Scene } from './core/Scene';
import { StarLayer } from './layers/StarLayer';


const FullCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement| null>(null);
  const sceneRef = useRef<Scene| null>(null); 


  useEffect(()=> {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx= canvas.getContext('2d');
    if(!ctx) return;
     const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
     const width =  canvas.width = window.innerWidth * dpr;
     const height = canvas.height = window.innerHeight * dpr;
       canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    
      ctx.setTransform(dpr,0,0,dpr,0,0);

      const scene = new Scene();
      scene.addLayer(new StarLayer(1500,width,height));
      sceneRef.current = scene;
    };
   
    resizeCanvas();
    window.addEventListener('resize',resizeCanvas);
    let lastTime= performance.now();

    const render = (time: number) => {
      const dt = time - lastTime;
      lastTime=time;

      ctx.clearRect(0,0,canvas.width,canvas.height);

      sceneRef.current?.update(dt);
      sceneRef.current?.render(ctx);
      
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      };
},[]);
return <canvas ref = {canvasRef} className="canvas" />;
};

export default FullCanvas;
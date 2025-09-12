import React, {useRef, useEffect} from "react";
import "./starfield.scss";
import { s } from "framer-motion/client";


type Star = {
    width: number,
    height: number,
    radiuse: number,
    color: string,
    alpha: number
}

function generateStars (count: number, canvas: HTMLCanvasElement): Star[]{
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    stars.push({
      width: Math.random() * canvas.width,
      height: Math.random() * canvas.height,
      radiuse: 0.8 + Math.random() * 1.8,
      color: "#fff",
      alpha: 0.5 +Math.random() * 0.5
    });
  }
  return stars;
}

function drawStars(ctx: CanvasRenderingContext2D,stars: Star[]){
  for(const star of stars) {
    ctx.beginPath();
        ctx.arc(
      star.width,
      star.height,
      star.radiuse,
      0,
      Math.PI*2
    ); //указал куда ткнуть и координаты с размером кисти
    //закрыл функцию arc
    ctx.fillStyle = star.color;
    ctx.globalAlpha = star.alpha;
    ctx.fill();
  }
  ctx.globalAlpha=1;
}

const StarField: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement | null >(null) ;

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d",{alpha: true});
    if(!ctx) return;

    const dpr =Math.max(1,window.devicePixelRatio || 1);

    function resizeCanvas() {
      
      if (!canvas) return;
      if(!ctx) return;
      const { innerWidth , innerHeight} = window;
      canvas.width = Math.floor(innerWidth *dpr);
      canvas.height =  Math.floor(innerHeight *dpr);

      canvas.style.width = `${innerWidth}px`;
      canvas.style.height= `${innerHeight}px`;
      ctx.fillStyle= "#22a0a0";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      const stars = generateStars(100,canvas);
      drawStars(ctx,stars);
      ctx.globalAlpha = 1;

    }
    resizeCanvas();
    window.addEventListener('resize',resizeCanvas);

    return() => {
      window.removeEventListener('resize',resizeCanvas);
    }

    

  }, []);
  return(
    <div className="starfield" aria-hidden='true'>
      <canvas ref={canvasRef}/>
    </div>
  )
}

export default StarField;
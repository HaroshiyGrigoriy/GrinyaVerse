import React, {useRef, useEffect} from "react";
import "./starfield.scss";

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

      const centerWidth= canvas.width/2;
      const centerHeight=canvas.height/2;

      const starPxRadius = 2;

      ctx.beginPath();
      ctx.arc(centerWidth,centerHeight, starPxRadius,0,Math.PI*2);
      ctx.fillStyle = "#fff";
      ctx.globalAlpha = 1;
      ctx.fill();
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
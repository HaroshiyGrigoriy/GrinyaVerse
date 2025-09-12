import React, {useRef, useEffect} from "react";
import "./starfield.scss";




const StarField: React.FC = () => {
  const stars = [
  { 
    width: 234,
    height: 212,
    radiuse: 2,
    color: "#fff",
    alpha: 1 
  },
  {   width: 246,
    height: 514,
    radiuse: 2,
    color: "#fff",
    alpha: 1
  },
  {   width: 612 ,
    height: 327,
    radiuse: 2,
    color: "#fff",
    alpha: 1
  },
  {   width: 544,
    height: 937,
    radiuse: 2,
    color: "#fff",
    alpha: 1},
]
;
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


  for (const star of stars){
    ctx.beginPath();//поставил перо
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
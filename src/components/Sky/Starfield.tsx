import React, {useRef, useEffect} from "react";
import "./starfield.scss";

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null > (null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d",{alpha: true});
    if(!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height=window.innerHeight;

    ctx.fillStyle= "#22a0a0";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }, []);
  return(
    <div className="starfield" aria-hidden='true'>
      <canvas ref={canvasRef}/>
    </div>
  )
}

export default StarField;
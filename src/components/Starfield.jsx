import { useRef } from "react";
import useStarfield from "../lib/useStarfield";


export default function Starfield(){
const ref = useRef(null);
useStarfield(ref);
return (
<>
<canvas ref={ref} className="starfield" aria-hidden></canvas>
<div className="space-overlay" aria-hidden></div>
</>
);
}
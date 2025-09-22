import { Layer } from "../core/Layer";
import {type Star} from "../types/star";
import { generateStars } from "../utils/star.utils";

export class StarLayer extends Layer{
private stars: Star[] = [];
private width: number;
private height: number;

constructor(count:number, width:number, height: number) {
  super();
  this.width= width;
  this.height = height;
  this.stars = generateStars(count,width,height);
}

render(ctx: CanvasRenderingContext2D):void{
    for(const s of this.stars) {
    ctx.globalAlpha = s.baseAlpha;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
update(dt: number) {
  this.stars.forEach(star => {
    star.baseAlpha += Math.sin(performance.now() / 1000 + star.r) * 0.005;
    star.baseAlpha = Math.min(Math.max(star.baseAlpha, 0.6), 1.6);
  });
}

}

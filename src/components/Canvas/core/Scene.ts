import { Layer } from "./Layer";
type SceneOpts = {width: number, height: number};

export class Scene {

  width: number;
  height: number;
  private layers: Layer[] = [];

  private pointer = {x: 0, y: 0};
  private pointerTarget = {x: 0, y:0};
  private pointerEase = 0.08;

  constructor(opts: SceneOpts) {
    this.width = opts.width;
    this.height =  opts.height;
  }
  addLayer(layer: Layer){
    this.layers.push(layer);
    layer.onAdd(this);
  }

  resize(w: number, h: number){
    this.width = w;
    this.height = h;
    for(const l of this.layers) l.resize(w,h);
  }


  setPointerTarget(nx: number,ny: number){
    this.pointerTarget.x=Math.max(-1, Math.min(1, nx));
    this.pointerTarget.y=Math.max(-1, Math.min(1, ny));
  }

  get pointerNorm(){
    return this.pointer;
  }

 
  update(dt: number,t: number) {
    this.pointer.x += (this.pointerTarget.x - this.pointer.x)*this.pointerEase;
    this.pointer.y += (this.pointerTarget.y - this.pointer.y)*this.pointerEase;
    
    for(const l of this.layers)
      l.update(dt,t);
    
  }

   render(ctx: CanvasRenderingContext2D):void {
    for(const layer of this.layers) {
      layer.render(ctx);
    }
  }
}
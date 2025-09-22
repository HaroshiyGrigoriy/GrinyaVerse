import { Layer } from "./Layer";

export class Scene {
  private layers: Layer[] = [];

  addLayer(layer: Layer):void{
    this.layers.push(layer);
  }

  render(ctx: CanvasRenderingContext2D):void {
    for(const layer of this.layers) {
      layer.render(ctx);
    }
  }

  update(dt: number):void {
    for(const layer of this.layers){
      layer.update?.(dt);
    }
  }
}
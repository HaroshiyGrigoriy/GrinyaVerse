//все что может быть нарисовано наследуется от этого класса
import type { Scene } from "./Scene";

export abstract class Layer {
  protected scene!: Scene;

  onAdd(scene: Scene) {
    this.scene = scene;
    this.resize(scene.width,scene.height);
  }

  resize(_w: number, _h: number): void{

  }
  update(dt: number,_t: number): void{

  }
  abstract render (ctx: CanvasRenderingContext2D):void;

}
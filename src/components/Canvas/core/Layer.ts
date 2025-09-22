//все что может быть нарисовано наследуется от этого класса

export abstract class Layer {
  abstract render (ctx: CanvasRenderingContext2D):void;
  update?(dt: number): void;
}
// src/components/Canvas/layers/BeltGradientLayer.ts
import { Layer } from "../core/Layer";

type Stop = { offset: number; color: string }; // offset 0..1
type Opts = {
  beltY?: number;      // 0..1
  thickness?: number;  // px
  opacity?: number;    // 0..1
  stops?: Stop[];      // массив цветов для градиента
  parallaxPx?: number; // глубина смещения
};

export class BeltGradientLayer extends Layer {
  private w = 0;
  private h = 0;
  private beltY: number;
  private thickness: number;
  private opacity: number;
  private stops: Stop[];
  private parallaxPx: number;

  constructor(width: number, height: number, opts: Opts = {}) {
    super();
    this.w = width; this.h = height;
    this.beltY = opts.beltY ?? 0.45;
    this.thickness = opts.thickness ?? 160;
    this.opacity = opts.opacity ?? 0.6;
    this.parallaxPx = opts.parallaxPx ?? 10;

    // Голубой → бирюзовый → фиолетовый
    this.stops = opts.stops ?? [
      { offset: 0.0, color: "rgba(126, 203, 255, 1)" },  // #7ecbff
      { offset: 0.5, color: "rgba(127, 242, 223, 1)" },  // #7ff2df
      { offset: 1.0, color: "rgba(185, 153, 255, 1)" },  // #b999ff
    ];
  }

  resize(w: number, h: number): void {
    this.w = w; this.h = h;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const yCenter = this.h * this.beltY;
    const y1 = Math.max(0, yCenter - this.thickness / 2);
    const y2 = Math.min(this.h, yCenter + this.thickness / 2);

    // параллакс
    const nx = this.scene.pointerNorm.x;
    const ny = this.scene.pointerNorm.y;
    const offX = -nx * this.parallaxPx;
    const offY = -ny * this.parallaxPx;

    ctx.save();

    // режим смешивания: screen (если нет — можно 'lighter')
    const prevComp = ctx.globalCompositeOperation;
    try { ctx.globalCompositeOperation = "screen"; } catch { ctx.globalCompositeOperation = "lighter"; }

    // прозрачность
    const prevAlpha = ctx.globalAlpha;
    ctx.globalAlpha = this.opacity;

    // линейный градиент по вертикали
    const grad = ctx.createLinearGradient(0, y1, 0, y2);
    for (const s of this.stops) grad.addColorStop(s.offset, s.color);

    ctx.fillStyle = grad;
    ctx.fillRect(offX, y1 + offY, this.w, y2 - y1);

    // восстановление
    ctx.globalAlpha = prevAlpha;
    ctx.globalCompositeOperation = prevComp;
    ctx.restore();
  }
}

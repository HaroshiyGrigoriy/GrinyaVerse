import { Layer } from "../core/Layer";
import type { Star } from "../types/star";
import { makeStarBelt } from "../utils/star.utils";
import { createStarSprite } from "../StarSprite";

type Opts = {
  count: number;
  beltY?: number;        // 0..1
  thickness?: number;    // px
  radius: [number, number];
  alpha: [number, number];
  twinkleAmp?: number;
  twinkleFreq?: [number, number];
  parallaxPx?: number;
  colors?: string[];                // <— палитра
  colorMode?: "palette" | "byY";    // <— режим

};

export class StarBeltLayer extends Layer {
  private stars: Star[] = [];
   private sprites: HTMLCanvasElement[] = [];
  private colors: string[];
  private colorMode: "palette" | "byY";
  private w = 0;
  private h = 0;

  private beltY: number;
  private thickness: number;
  private radius: [number, number];
  private alpha: [number, number];
  private twinkleAmp: number;
  private twinkleFreq: [number, number];
  private parallaxPx: number;

  constructor(width: number, height: number, opts: Opts) {
    super();
    this.w = width;
    this.h = height;

    this.beltY = opts.beltY ?? 0.5;
    this.thickness = opts.thickness ?? 120;
    this.radius = opts.radius;
    this.alpha = opts.alpha;
    this.twinkleAmp = opts.twinkleAmp ?? 0.2;
    this.twinkleFreq = opts.twinkleFreq ?? [0.6, 1.4];
    this.parallaxPx = opts.parallaxPx ?? 14;

    this.colors= opts.colors ?? ["#8ecbff", "#7ff2df", "#b999ff", "#ffffff"];
    this.colorMode = opts.colorMode ?? "palette";
    this.sprites = this.colors.map((c) => createStarSprite(64, c));
    this.stars = makeStarBelt(opts.count, width, height, this.beltY, this.thickness, {
      radius: this.radius,
      alpha: this.alpha,
      twinkleFreq: this.twinkleFreq,
            palette: this.colorMode === "palette" ? this.colors : undefined,

    });
  }

  resize(w: number, h: number): void {
    this.w = w; this.h = h;
    this.stars = makeStarBelt(this.stars.length, w, h, this.beltY, this.thickness, {
      radius: this.radius,
      alpha: this.alpha,
      twinkleFreq: this.twinkleFreq,
      palette: this.colorMode === "palette" ? this.colors : undefined,
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    const t = performance.now() / 1000;
    const nx = this.scene.pointerNorm.x;
    const ny = this.scene.pointerNorm.y;
    const offX = -nx * this.parallaxPx;
    const offY = -ny * this.parallaxPx;

    const amp = this.twinkleAmp;
    const nColors = this.sprites.length;

    for (const s of this.stars) {
      const tw = Math.sin(s.phase + s.twinkle * t);
      const tw01 = 0.5 + 0.5 * tw;
      const a = Math.max(0, Math.min(1, s.baseAlpha * (1 - amp + amp * tw01)));

      let sprite = this.sprites[0];
      if (this.colorMode === "palette" && typeof s.ci === "number") {
        sprite = this.sprites[s.ci % nColors];
      } else if (this.colorMode === "byY") {
        const idx = Math.max(0, Math.min(nColors - 1, Math.floor((s.y / this.h) * nColors)));
        sprite = this.sprites[idx];
      }

      const size = s.r * 2;
      ctx.globalAlpha = a;
      ctx.drawImage(sprite, s.x + offX - s.r, s.y + offY - s.r, size, size);
    }
    ctx.globalAlpha = 1;
  }

}

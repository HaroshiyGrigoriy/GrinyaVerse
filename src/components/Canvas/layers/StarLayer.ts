import { Layer } from "../core/Layer";
import { type Star } from "../types/star";
import { makeStarField } from "../utils/star.utils";
import { createStarSprite } from "../StarSprite";
import { randInt, pickWeighted } from "../utils/random";
type StarLayerOpts = {
  count: number;
  radius: [number, number];
  alpha: [number, number];
  twinkleAmp?: number;
  twinkleFreq?: [number, number];
  parallaxPx?: number;
  colors?: string[];
  /** Веса для палитры (та же длина, что и colors). Необязательно. */
  colorWeights?: number[];
  driftPxPerSec?: { x: number; y: number };
};

export class StarLayer extends Layer {
  private stars: Star[] = [];

  private sprites: HTMLCanvasElement[] = []; // <— несколько спрайтов
  private colors: string[] = [];
  private colorWeights?: number[];

  private w = 0;
  private h = 0;
  private t = 0;



  private parallaxPx: number;
  private twinkleAmp: number;
  private twinkleFreq: [number, number];
  private radiusRange: [number, number];
  private alphaRange: [number, number];


  private drift = { x: 0, y: 0 };
  private driftSpeed = { x: 0, y: 0 };

  constructor(width: number, height: number, opts: StarLayerOpts) {
    super();
    this.w = width;
    this.h = height;

     this.colors = opts.colors ?? ["#8ecbff", "#7ff2df", "#b999ff", "#ffffff"];
     this.colorWeights = opts.colorWeights;

     this.sprites = this.colors.map((c) => createStarSprite(64, c));

    this.radiusRange = opts.radius;
    this.alphaRange = opts.alpha;
    this.twinkleAmp = opts.twinkleAmp ?? 0.2;
    this.twinkleFreq = opts.twinkleFreq ?? [0.6, 1.4];
    this.parallaxPx = opts.parallaxPx ?? 12;
    this.driftSpeed = opts.driftPxPerSec ?? { x: 0, y: 0 };


    

    // Генерация звёзд: если мы в режиме 'palette', то положим ci сразу
    this.stars = makeStarField(opts.count, width, height, {
      radius: this.radiusRange,
      alpha: this.alphaRange,
      twinkleFreq: this.twinkleFreq,
    }).map(s => ({...s, ci:this.pickColorIndex()}));
  }

private pickColorIndex(): number {
    if (this.colorWeights && this.colorWeights.length === this.colors.length) {
      return pickWeighted(this.colorWeights);
    }
    return randInt(0, this.colors.length - 1);
  }

  resize(w: number, h: number): void {
    this.w = w; this.h = h;
    this.stars = makeStarField(this.stars.length, w, h, {
      radius: this.radiusRange,
      alpha: this.alphaRange,
      twinkleFreq: this.twinkleFreq,
       }).map(s => ({...s, ci:this.pickColorIndex()}));
  }

  update(dt: number, t: number): void {
    this.t = t;
    const s = dt / 1000;
    this.drift.x += this.driftSpeed.x * s;
    this.drift.y += this.driftSpeed.y * s;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const nx = this.scene.pointerNorm.x;
    const ny = this.scene.pointerNorm.y;
    const offX = -nx * this.parallaxPx + this.drift.x;
    const offY = -ny * this.parallaxPx + this.drift.y;

    const t = this.t;
    const amp = this.twinkleAmp;

    for (const s of this.stars) {
      // мерцание
      const tw = Math.sin(s.phase + s.twinkle * t);
      const tw01 = 0.5 + 0.5 * tw;
      const a = clamp01(s.baseAlpha * (1 - amp + amp * tw01));

      // выбор спрайта: либо заранее присвоенный индекс палитры, либо по Y


      const size = s.r * 2;
      ctx.globalAlpha = a;
       const sprite = this.sprites[s.ci ?? 0];
      ctx.drawImage(sprite, s.x + offX - s.r, s.y + offY - s.r, size, size);
    }

    ctx.globalAlpha = 1;
  }
}

function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
import { type Star } from "../types/star";
import { rand, randBias, randNormal } from "./random";

type CommonOpts = {
  radius: [number, number];
  alpha: [number, number];
  twinkleFreq?: [number, number];
    palette?: string[];
};

export function makeStarField(
  count: number,
  w: number,
  h: number,
  opts: CommonOpts
): Star[] {
  const [rMin, rMax] = opts.radius;
  const [aMin, aMax] = opts.alpha;
  const [fMin, fMax] = opts.twinkleFreq ?? [0.6, 1.4];

  const arr: Star[] = [];
  for (let i = 0; i < count; i++) {
        const ci = opts.palette ? Math.floor(Math.random() * opts.palette.length) : undefined;
    arr.push({
      x: rand(0, w),
      y: rand(0, h),
      r: randBias(rMin, rMax, 2),
      baseAlpha: rand(aMin, aMax),
      twinkle: rand(fMin, fMax),
      phase: rand(0, Math.PI * 2),
      ci,
    });
  }
  return arr;
}

export function makeStarBelt(
  count: number,
  w: number,
  h: number,
  beltyNorm = 0.5,
  thickness = 120,
  opts: CommonOpts
): Star[] {
  const yCenter = h * beltyNorm;
  const stars: Star[] = [];

  const [rMin, rMax] = opts.radius;
  const [aMin, aMax] = opts.alpha;
  const [fMin, fMax] = opts.twinkleFreq ?? [0.6, 1.4];

  for (let i = 0; i < count; i++) {
    const y = yCenter + randNormal(0, thickness * 0.25);
        const ci = opts.palette ? Math.floor(Math.random() * opts.palette.length) : undefined;
    stars.push({
      x: rand(0, w),
      y,
      r: randBias(rMin, rMax, 1.7),
      baseAlpha: rand(aMin, aMax),
      twinkle: rand(fMin, fMax),
      phase: rand(0, Math.PI * 2),
      ci,
    });
  }
  return stars;
}

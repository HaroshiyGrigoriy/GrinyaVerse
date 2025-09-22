import { type Star} from '../types/star';

export function generateStars(count: number, width: number, height: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.2,
      baseAlpha: Math.random() * 2.2 + 0.4,
    });
  }
  return stars;
}
export function withAlpha(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const hh = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(hh, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

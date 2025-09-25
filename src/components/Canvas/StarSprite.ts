export function createStarSprite(size = 64, color = "#ffffff") {
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = size;

  const ctx = cnv.getContext("2d")!;
  const r = size / 2;

  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0.0, color);
  grad.addColorStop(0.25, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.35)");
  grad.addColorStop(1.0, "rgba(255,255,255,0)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  return cnv;
}

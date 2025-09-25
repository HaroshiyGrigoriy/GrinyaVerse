export const rand = (min = 0, max =1) => min + Math.random() * (max - min);

export const randBias = (min: number, max: number , power = 2) =>
  min+(max-min) * Math.pow(Math.random(), power);

export function randNormal(mean = 0, std = 1){
let u =0;
let v = 0;

while ( u === 0 ) u = Math.random();
while ( v === 0 ) v = Math.random();
const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

return mean + z *std;
}

export const randInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1));


export function pickWeighted(weights: number[]){
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for(let i = 0; i < weights.length;i++){
    r -= weights[i];
    if(r <= 0) return i;
  }
  return weights.length-1;
}
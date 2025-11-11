/*************************
 * Data: Curated Color Set
 *************************/
const COLOR_DB = [
  { name:"Scarlet", family:"red", hex:"#FF2400", tags:["warm","vivid","brand"], popularity:96 },
  { name:"Crimson", family:"red", hex:"#DC143C", tags:["classic","deep"], popularity:92 },
  { name:"Coral", family:"orange", hex:"#FF7F50", tags:["soft","friendly"], popularity:88 },
  { name:"Amber", family:"yellow", hex:"#FFBF00", tags:["alert","brand"], popularity:90 },
  { name:"Chartreuse", family:"yellow", hex:"#DFFF00", tags:["neon","fresh"], popularity:75 },
  { name:"Emerald", family:"green", hex:"#2ECC71", tags:["success","nature"], popularity:95 },
  { name:"Forest", family:"green", hex:"#228B22", tags:["earth","deep"], popularity:78 },
  { name:"Teal", family:"teal", hex:"#008080", tags:["balanced","cool"], popularity:80 },
  { name:"Cyan", family:"teal", hex:"#00B7EB", tags:["aqua","bright"], popularity:84 },
  { name:"Azure", family:"blue", hex:"#007FFF", tags:["brand","primary"], popularity:97 },
  { name:"Royal Blue", family:"blue", hex:"#4169E1", tags:["trust","classic"], popularity:91 },
  { name:"Indigo", family:"indigo", hex:"#4B0082", tags:["mystic","deep"], popularity:77 },
  { name:"Violet", family:"violet", hex:"#8A2BE2", tags:["creative","bold"], popularity:86 },
  { name:"Magenta", family:"pink", hex:"#FF00FF", tags:["neon","accent"], popularity:89 },
  { name:"Rose", family:"pink", hex:"#E91E63", tags:["brand","fem"], popularity:87 },
  { name:"Brown", family:"brown", hex:"#8B4513", tags:["earth","warm"], popularity:70 },
  { name:"Taupe", family:"brown", hex:"#483C32", tags:["neutral","fashion"], popularity:65 },
  { name:"Slate", family:"gray", hex:"#708090", tags:["neutral","ui"], popularity:90 },
  { name:"Charcoal", family:"black", hex:"#27272A", tags:["neutral","ui"], popularity:93 },
  { name:"Ivory", family:"white", hex:"#FFFFF0", tags:["neutral","paper"], popularity:82 }
];
/***********************
 * Utilities
 ***********************/
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const clamp = (v,min,max)=> Math.min(max, Math.max(min,v));
// Normalize hex strings to full 7-character '#RRGGBB' uppercase. Accepts 3- or 6-digit input.
function normalizeHex(hex){
  if(!hex || typeof hex !== 'string') return '#000000';
 let s = hex.trim().replace(/^#/, '');
  if(/^[0-9a-fA-F]{3}$/.test(s)) s = s.split('').map(c=>c+c).join('');
  if(!/^[0-9a-fA-F]{6}$/.test(s)){
    console.warn('normalizeHex: invalid hex provided', hex);
    return '#000000';
  }
  return '#' + s.toUpperCase();
}

const hexToRgb = hex => {
  const n = normalizeHex(hex);
  const r = parseInt(n.slice(1,3), 16);
const g = parseInt(n.slice(3,5), 16);
  const b = parseInt(n.slice(5,7), 16);
  return { r,g,b };
};
const rgbToHex = ({r,g,b}) => '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
function rgbToHsl(r,g,b){
r/=255; g/=255; b/=255; const max=Math.max(r,g,b), min=Math.min(r,g,b); let h,s,l=(max+min)/2;
  if(max===min){h=s=0;} else { const d=max-min; s=l>0.5? d/(2-max-min) : d/(max+min);
    switch(max){ case r: h=(g-b)/d+(g<b?6:0); break; case g: h=(b-r)/d+2; break; case b: h=(r-g)/d+4; break; } h/=6; }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
}
function hslToRgb(h,s,l){
  h/=360; s/=100; l/=100; if(s===0){ const v=Math.round(l*255); return {r:v,g:v,b:v}; }
  const hue2rgb=(p,q,t)=>{ if(t<0) t+=1; if(t>1) t-=1; if(t<1/6) return p+(q-p)*6*t; if(t<1/2) return q; if(t<2/3) return p+(q-p)*(2/3-t)*6; return p; };
  const q = l<0.5 ? l*(1+s) : l+s-l*s; const p = 2*l-q;
  const r = Math.round(hue2rgb(p,q,h+1/3)*255);
  const g = Math.round(hue2rgb(p,q,h)*255);
  const b = Math.round(hue2rgb(p,q,h-1/3)*255);
  return {r,g,b};
}
































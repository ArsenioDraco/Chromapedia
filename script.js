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
































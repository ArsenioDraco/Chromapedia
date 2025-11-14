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
function contrastRatio(hexA, hexB){
  const L = hex => {
    const {r,g,b} = hexToRgb(hex);
    const sr=[r,g,b].map(v=>{ v/=255; return v<=.03928? v/12.92 : Math.pow((v+.055)/1.055, 2.4); });
    return .2126*sr[0]+.7152*sr[1]+.0722*sr[2];
  };
  const La=L(hexA), Lb=L(hexB);
  const lighter=Math.max(La,Lb), darker=Math.min(La,Lb);
  return ((lighter+0.05)/(darker+0.05));
}
function slugify(name){ return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function shade(hex, step){ // step in [-5..5], negative = darker
  const {r,g,b} = hexToRgb(hex);
  let {h,s,l} = rgbToHsl(r,g,b);
  const delta = step*6; // 6% per step
  l = clamp(l + delta, 0, 100);
  const rgb = hslToRgb(h,s,l); return rgbToHex(rgb);
}
/***********************
 * Robust copy with fallback + visual feedback
 ***********************/
async function copyTextToClipboard(text){
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.left = '0';
      ta.style.width = '1px';
      ta.style.height = '1px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if(!ok) throw new Error('execCommand failed');
    }
    showToast('Copied to clipboard');
    return true;
  }catch(err){
    console.warn('copy failed', err);
    showToast('Could not copy — select and press Ctrl/Cmd+C', true);
    return false;
  }
}
function showToast(text, isError=false){
  const t = document.createElement('div'); t.className='toast'; t.textContent = text; if(isError) t.style.background='rgba(120,20,20,.9)';
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.transition='opacity .25s'; t.style.opacity='0'; setTimeout(()=> t.remove(),250); }, 1600);
}
/***********************
 * State & Rendering
 ***********************/
let state = {
  query: '',
  family: '',
  sort: 'pop',
  colors: [...COLOR_DB],
  theme: localStorage.getItem('theme') || 'auto'
};
function applyTheme(){
  if(state.theme==='dark') document.documentElement.style.colorScheme='dark';
  else if(state.theme==='light') document.documentElement.style.colorScheme='light';
  else document.documentElement.style.colorScheme='normal';
}
applyTheme();

function renderGrid(){
  const root = $('#results');
  let list = state.colors.slice();
  const q = state.query.trim().toLowerCase();
  if(state.family) list = list.filter(c=>c.family===state.family);
  if(q){
    list = list.filter(c=> [c.name, c.family, c.hex, ...(c.tags||[])].join(' ').toLowerCase().includes(q) );
  }

  switch(state.sort){
    case 'name': list.sort((a,b)=> a.name.localeCompare(b.name)); break;
    case 'hue': list.sort((a,b)=> rgbToHsl(...Object.values(hexToRgb(a.hex))).h - rgbToHsl(...Object.values(hexToRgb(b.hex))).h ); break;
    case 'light': list.sort((a,b)=> rgbToHsl(...Object.values(hexToRgb(a.hex))).l - rgbToHsl(...Object.values(hexToRgb(b.hex))).l ); break;
    default: list.sort((a,b)=> (b.popularity||0)-(a.popularity||0));
  }
  root.innerHTML = '';
  if(!list.length){ $('#empty').hidden=false; return; } else { $('#empty').hidden=true; }
  const frag = document.createDocumentFragment();
  list.forEach(c=> frag.appendChild(cardEl(c)));
  root.appendChild(frag);
}

function cardEl(color){
  const {name, hex, family} = color; const id = slugify(name);
  const card = document.createElement('article'); card.tabIndex=0; card.className='card'; card.setAttribute('role','article'); card.dataset.slug=id;
  const normalizedHex = normalizeHex(hex);
  const sw = document.createElement('div'); sw.className='swatch'; sw.style.background=normalizedHex; sw.style.color = contrastRatio(normalizedHex, '#000')>4.5? '#000' : '#fff'; sw.textContent=name;
  const actions = document.createElement('div'); actions.className='actions';
  const copy = iconBtn('Copy HEX', copyIcon(), ()=> copyTextToClipboard(normalizedHex));
  const open = iconBtn('Open details', openIcon(), ()=> openPanel(color));
  const link = iconBtn('Deep link', linkIcon(), ()=> { history.pushState({},'',`#color/${id}`); openPanel(color); });
  actions.append(copy, open, link);
const meta = document.createElement('div'); meta.className='meta';
  const nameEl = document.createElement('div'); nameEl.className='name'; nameEl.textContent = `${name} · ${family}`;
  const codes = document.createElement('div'); codes.className='codes';
  const {r,g,b}=hexToRgb(normalizedHex); const hsl=rgbToHsl(r,g,b);
  codes.textContent = `${normalizedHex}  •  rgb(${r}, ${g}, ${b})  •  hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`;
  const tags = document.createElement('div'); tags.className='tags';
  (color.tags||[]).forEach(t=>{ const chip=document.createElement('span'); chip.className='chip'; chip.textContent=t; tags.appendChild(chip); });
  meta.append(nameEl, codes, tags);

  card.append(sw, actions, meta);
  card.addEventListener('click', e=> { if(e.target.closest('.icon-btn')) return; openPanel(color); });
  card.addEventListener('keydown', e=> { if(e.key==='Enter' || e.key===' ') { e.preventDefault(); openPanel(color); }});
  return card;
}

function openPanel(color){
  const drawer = $('#drawer'); drawer.classList.remove('hidden'); drawer.setAttribute('aria-hidden','false');
  const title = $('#panelTitle'); title.textContent = `${color.name} — ${normalizeHex(color.hex)}`;
  const content = $('#panelContent'); content.innerHTML='';
// Swatch + Tokens
  const top = document.createElement('div'); top.style.display='grid'; top.style.gap='12px';
  const sw = document.createElement('div'); sw.className='pair';
  const sample = document.createElement('div'); sample.className='sample'; sample.style.background=normalizeHex(color.hex); sample.style.color = contrastRatio(normalizeHex(color.hex),'#000')>4.5?'#000':'#fff'; sample.style.height='120px'; sample.textContent = color.name;
  const cap = document.createElement('div'); cap.className='caption';
  const codes = document.createElement('div'); codes.innerHTML = `<strong>Hex</strong> ${normalizeHex(color.hex)} &nbsp; <strong>RGB</strong> ${Object.values(hexToRgb(normalizeHex(color.hex))).join(', ')} &nbsp; <strong>HSL</strong> ${Object.values(rgbToHsl(...Object.values(hexToRgb(normalizeHex(color.hex))))).join(' / ')}`;
  const copyBtn = miniButton('Copy HEX', ()=> copyTextToClipboard(normalizeHex(color.hex)));
  cap.append(codes, copyBtn); sw.append(sample, cap);
  top.append(sw);
// Shades & Tints
  const shadesBlock = document.createElement('div');
  const h3 = document.createElement('h3'); h3.textContent='Shades & Tints'; shadesBlock.appendChild(h3);
  const shadeRow = document.createElement('div'); shadeRow.className='pair-row';
  for(let i=-5;i<=5;i++){
    const c = shade(color.hex, i);
    const p = document.createElement('div'); p.className='pair';
    const s = document.createElement('div'); s.className='sample'; s.style.background=c; s.style.color = contrastRatio(c,'#000')>4.5?'#000':'#fff'; s.textContent = i===0? 'Base' : (i<0? `${Math.abs(i)*6}% darker` : `${i*6}% lighter`);
    const cap2 = document.createElement('div'); cap2.className='caption';
    cap2.innerHTML = `<span class="codes">${c}</span>`;
    const b = miniButton('Copy', ()=> copyTextToClipboard(c)); cap2.appendChild(b);
    p.append(s, cap2); shadeRow.appendChild(p);
  }
  shadesBlock.appendChild(shadeRow);
 // WCAG Pairings
  const wcag = document.createElement('div');
  const h4 = document.createElement('h3'); h4.textContent='WCAG Contrast'; wcag.appendChild(h4);
  const pairs = document.createElement('div'); pairs.className='pair-row';
  const pairAgainst = ['#000000', '#111827', '#374151', '#9CA3AF', '#FFFFFF'];
  pairAgainst.forEach(bg=>{
    const p = document.createElement('div'); p.className='pair';
    const s = document.createElement('div'); s.className='sample'; s.style.background=bg; s.style.color=normalizeHex(color.hex); s.textContent='Aa';
    const ratio = contrastRatio(normalizeHex(color.hex), bg);
    const cap2 = document.createElement('div'); cap2.className='caption';
    cap2.innerHTML = `<span>${bg}</span><strong>${ratio.toFixed(2)}:1</strong>`;
    p.append(s, cap2); pairs.appendChild(p);
  });
  wcag.appendChild(pairs);
// Tokens
  const tokens = document.createElement('div');
  const h5 = document.createElement('h3'); h5.textContent='Copy‑Ready Tokens'; tokens.appendChild(h5);
  const pre = document.createElement('pre'); pre.className='codes';
  const slug = slugify(color.name);
  const tokenText = `--color-${slug}: ${normalizeHex(color.hex)};\n.color-${slug}{ color: var(--color-${slug}); }\n.bg-${slug}{ background: var(--color-${slug}); }`;
  pre.textContent = tokenText; tokens.appendChild(pre);

  // Assemble
  content.append(top, shadesBlock, wcag, tokens);

  // Copy token button
  $('#copyToken').onclick = ()=> copyTextToClipboard(tokenText);

  // Ensure the panel is focusable and keyboard scrollable
  setTimeout(()=>{ $('#panel').focus(); }, 50);
}

function closePanel(){ const drawer=$('#drawer'); drawer.setAttribute('aria-hidden','true'); drawer.classList.add('hidden'); }



































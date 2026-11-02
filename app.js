'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'$'+n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',');
const fmtSize=n=>(Math.round(n*10)/10).toString();
const I={
  bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  x:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  cam:'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  send:'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  stop:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  up:'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4"/></svg>',
  filter:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  hat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M5 18v-3a7 7 0 0 1 14 0v3M10 8V5h4v3"/></svg>',
  bld:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/></svg>',
  shop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9 5.5 4h13L20 9M4 9h16v11H4zM4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M10 20v-5h4v5"/></svg>',
  doc:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
};

/* ---------- product illustrations (non-catalogue ranges) ---------- */
const PLATE={white:['#FAFBFC','#DCE1E8','#C5CCD6'],black:['#2A2E36','#16191F','#0E1015'],grey:['#C9CFD8','#A7AFBB','#8D96A3']};
function plate(c,w=150,h=96,x=25,y=32){const p=PLATE[c]||PLATE.white;return `<rect x="${x+2}" y="${y+4}" width="${w}" height="${h}" rx="10" fill="#000" opacity=".12"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${p[0]}" stroke="${p[1]}"/><rect x="${x+5}" y="${y+5}" width="${w-10}" height="${h-10}" rx="7" fill="none" stroke="${p[1]}" opacity=".6"/>`}
function socket(cx,cy,c){const s=(PLATE[c]||PLATE.white)[2];const f=c==='black'?'#0b0c0f':'#59606B';return `<circle cx="${cx}" cy="${cy}" r="17" fill="${(PLATE[c]||PLATE.white)[1]}" opacity=".55"/><rect x="${cx-10}" y="${cy-9}" width="4" height="10" rx="1.5" fill="${f}" transform="rotate(-30 ${cx-8} ${cy-4})"/><rect x="${cx+6}" y="${cy-9}" width="4" height="10" rx="1.5" fill="${f}" transform="rotate(30 ${cx+8} ${cy-4})"/><rect x="${cx-2}" y="${cy+3}" width="4" height="9" rx="1.5" fill="${f}"/>`}
function rocker(x,y,c,w=22,h=12){const p=PLATE[c]||PLATE.white;return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${p[1]}"/><rect x="${x+2}" y="${y+2}" width="${w-4}" height="${h-5}" rx="2" fill="${p[0]}"/>`}
function illus(k,c='white'){
  const o='<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Product illustration">',e='</svg>';
  const blue='#2F7CF6';
  switch(k){
  case 'gpo2':return o+plate(c)+rocker(43,42,c)+rocker(135,42,c)+socket(62,90,c)+socket(138,90,c)+e;
  case 'gpo1':return o+plate(c,92,110,54,25)+rocker(89,36,c)+socket(100,92,c)+e;
  case 'gpousb':return o+plate(c)+rocker(43,42,c)+rocker(135,42,c)+socket(62,92,c)+socket(138,92,c)+`<rect x="93" y="68" width="14" height="7" rx="2" fill="#1d2129"/><rect x="94" y="84" width="12" height="6" rx="3" fill="#1d2129"/><circle cx="100" cy="103" r="2" fill="${blue}"/>`+e;
  case 'wgpo':return o+`<rect x="44" y="18" width="112" height="128" rx="12" fill="#D5DAE1" stroke="#B5BDC8"/><rect x="52" y="28" width="96" height="108" rx="9" fill="#EEF1F5" stroke="#C5CCD6"/><path d="M58 36h84v24H58z" fill="#fff" opacity=".6"/>${socket(100,98,'white')}`+e;
  case 'sw1':return o+plate(c,92,110,54,25)+`<rect x="70" y="40" width="60" height="80" rx="6" fill="${(PLATE[c]||PLATE.white)[1]}" opacity=".7"/><rect x="73" y="43" width="54" height="74" rx="5" fill="${(PLATE[c]||PLATE.white)[0]}"/><circle cx="100" cy="106" r="2.2" fill="${blue}"/>`+e;
  case 'sw2':return o+plate(c,92,110,54,25)+`<rect x="68" y="40" width="30" height="80" rx="5" fill="${(PLATE[c]||PLATE.white)[1]}"/><rect x="102" y="40" width="30" height="80" rx="5" fill="${(PLATE[c]||PLATE.white)[1]}"/><rect x="70" y="42" width="26" height="74" rx="4" fill="${(PLATE[c]||PLATE.white)[0]}"/><rect x="104" y="42" width="26" height="74" rx="4" fill="${(PLATE[c]||PLATE.white)[0]}"/>`+e;
  case 'dimmer':return o+plate(c,92,110,54,25)+`<circle cx="100" cy="80" r="24" fill="${(PLATE[c]||PLATE.white)[1]}"/><circle cx="100" cy="80" r="20" fill="${(PLATE[c]||PLATE.white)[0]}"/><rect x="98.5" y="62" width="3" height="10" rx="1.5" fill="${blue}"/>`+e;
  case 'rcbo':case 'mcb':{const t=k==='rcbo';return o+`<rect x="74" y="14" width="${t?52:40}" height="132" rx="4" fill="#F7F8FA" stroke="#C9D0DA"/><rect x="74" y="56" width="${t?52:40}" height="48" fill="#E9EDF2"/><rect x="${t?88:84}" y="66" width="20" height="28" rx="3" fill="#1C2028"/><rect x="${t?91:87}" y="68" width="14" height="12" rx="2" fill="#2E343F"/><rect x="${t?84:80}" y="24" width="${t?32:28}" height="10" rx="2" fill="#DDE2E9"/><rect x="${t?84:80}" y="126" width="${t?32:28}" height="10" rx="2" fill="#DDE2E9"/>${t?`<circle cx="115" cy="112" r="4" fill="${blue}"/>`:''}`+e}
  case 'iso':return o+`<rect x="62" y="14" width="76" height="132" rx="4" fill="#F7F8FA" stroke="#C9D0DA"/><rect x="62" y="56" width="76" height="48" fill="#E9EDF2"/><rect x="78" y="64" width="44" height="32" rx="4" fill="#C8352E"/><rect x="82" y="67" width="36" height="13" rx="3" fill="#E04A41"/><rect x="72" y="24" width="56" height="10" rx="2" fill="#DDE2E9"/><rect x="72" y="126" width="56" height="10" rx="2" fill="#DDE2E9"/>`+e;
  case 'spd':return o+`<rect x="70" y="14" width="60" height="132" rx="4" fill="#F7F8FA" stroke="#C9D0DA"/><rect x="78" y="52" width="44" height="56" rx="4" fill="#E3E8EF"/><circle cx="100" cy="72" r="6" fill="#2BB673"/><path d="M96 86l6-4-3 8 6-4" stroke="#1C2028" stroke-width="2" fill="none"/>`+e;
  case 'enc':return o+`<rect x="30" y="16" width="140" height="130" rx="8" fill="#E4E8EE" stroke="#B9C1CC"/><rect x="40" y="26" width="120" height="110" rx="5" fill="#F7F9FB" stroke="#CDD3DC"/><rect x="40" y="58" width="120" height="16" fill="#D3D9E1"/><rect x="40" y="96" width="120" height="16" fill="#D3D9E1"/>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${46+i*11}" y="56" width="9" height="20" rx="1" fill="#fff" stroke="#C9D0DA"/>`).join('')}<rect x="156" y="70" width="6" height="20" rx="3" fill="#9AA4B2"/>`+e;
  case 'busbar':return o+`<rect x="20" y="66" width="160" height="16" rx="3" fill="#C9874C"/><rect x="20" y="66" width="160" height="6" rx="3" fill="#E1A26A"/>${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<rect x="${26+i*13}" y="50" width="6" height="18" fill="#D69457"/>`).join('')}<rect x="20" y="82" width="160" height="10" rx="3" fill="#2B3240"/>`+e;
  case 'conduit':return o+`<g transform="rotate(-18 100 80)"><rect x="18" y="66" width="164" height="30" rx="4" fill="#D8DDE4"/><rect x="18" y="66" width="164" height="9" fill="#EEF1F5"/><ellipse cx="182" cy="81" rx="6" ry="15" fill="#BAC2CD"/><ellipse cx="182" cy="81" rx="3.5" ry="11" fill="#7F8896"/></g>`+e;
  case 'corr':return o+`<g transform="rotate(-18 100 80)">${Array.from({length:22},(_,i)=>`<rect x="${20+i*7.4}" y="65" width="6" height="32" rx="3" fill="${i%2?'#D9DEE5':'#C5CCD5'}"/>`).join('')}</g>`+e;
  case 'saddle':return o+`<path d="M40 112h34a26 26 0 0 1 52 0h34" stroke="#C3CAD4" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M40 112h34a26 26 0 0 1 52 0h34" stroke="#E8ECF1" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="52" cy="112" r="3" fill="#7F8896"/><circle cx="148" cy="112" r="3" fill="#7F8896"/>`+e;
  case 'downlight':return o+`<ellipse cx="100" cy="88" rx="72" ry="30" fill="#E6EAF0"/><ellipse cx="100" cy="84" rx="72" ry="30" fill="#F8FAFC" stroke="#CDD4DE"/><ellipse cx="100" cy="84" rx="50" ry="20" fill="#DCE9FF"/><ellipse cx="100" cy="84" rx="38" ry="14" fill="#fff"/><ellipse cx="100" cy="84" rx="54" ry="22" fill="none" stroke="${blue}" stroke-width="3" opacity=".7"/>`+e;
  case 'pir':return o+`<ellipse cx="100" cy="116" rx="54" ry="14" fill="#E3E7ED"/><path d="M48 112a52 50 0 0 1 104 0z" fill="#F8FAFC" stroke="#CDD4DE"/><path d="M76 108a24 30 0 0 1 48 0z" fill="#E2E7EE"/><circle cx="100" cy="96" r="3" fill="${blue}"/>`+e;
  case 'usb':return o+plate(c,92,110,54,25)+`<rect x="86" y="58" width="28" height="12" rx="2.5" fill="#1d2129"/><rect x="88" y="88" width="24" height="10" rx="5" fill="#1d2129"/><circle cx="100" cy="114" r="2.2" fill="${blue}"/>`+e;
  case 'data':return o+plate(c,92,110,54,25)+`<rect x="82" y="62" width="36" height="32" rx="3" fill="#1d2129"/><rect x="92" y="88" width="16" height="7" fill="#1d2129"/><path d="M88 66h24" stroke="#C9A646" stroke-width="3" stroke-dasharray="2 2"/>`+e;
  default:return o+plate(c)+e;
  }
}

/* ---------- catalogue ---------- */
const CATS=[
 {id:'switches',code:'SP',name:'Switches & Power Points',blurb:'Power outlets, switch plates, mechanisms, USB chargers and weatherproof outlets, switches and isolators.',art:()=>`<img src="${RIMG('Bakelite_GPOD_and_GPOD_15__153')}" alt="">`},
 {id:'accessories',code:'EA',name:'Electrical Accessories',blurb:'Mounting blocks, junction boxes, batten holders, ceiling roses, connectors and the parts that finish a job.',art:()=>`<img src="${RIMG('Accessories_Mounting_blocks__38')}" alt="">`},
 {id:'circuit-protection',code:'CP',name:'Circuit Protection',blurb:'Service fuse holders, fuse links and breaker lugs.',art:()=>`<img src="${RIMG('SERVICE_FUSES_Service_Fuses__129')}" alt="">`},
 {id:'switchboards',code:'SD',name:'Switchboards & Distribution',blurb:'Active, neutral and clear links for switchboards, plus mechanical lugs.',art:()=>`<img src="${RIMG('Active_Links_LA10__77')}" alt="">`},
 {id:'conduit',code:'CM',name:'Conduit & Cable Management',blurb:'Full and half saddles for 16 to 50 mm conduit.',art:()=>`<img src="${RIMG('Saddles_Full_Saddles__113')}" alt="">`},
 {id:'lugs',code:'LC',name:'Lugs and Connectors',blurb:'Cable lugs, connectors and splices in copper, aluminium and bi-metal.',art:()=>`<img src="${DATA.imgs['2']}" alt="">`},
];
const SUBS={bimetal:'Bi-metal lugs',copper:'Copper lugs',aluminium:'Aluminium lugs',mechanical:'Mechanical lugs',connectors:'Connectors & splices'};
const SUB_ORDER=['bimetal','copper','aluminium','mechanical','connectors'];
const MATS={bimetal:'Bi-metal',copper:'Copper',aluminium:'Aluminium',mechanical:'Aluminium alloy',connectors:'Mixed'};

function lugPrice(f,v){
  const s=v.size, s2=v.size2||0;
  const r={bimetal:[2.2,.072],copper:[.42,.036],aluminium:[.9,.03],mechanical:[19,.11],connectors:[1.1,.05]}[f.sub];
  let p=r[0]+r[1]*Math.max(s,s2)*(f.sub==='connectors'&&/cau-conn|dsl|bcrl|pbl-a|gtl/.test(f.id)?1.5:1);
  if(/cau-p/.test(f.id))p*=1.6; if(/dtl-2|bl-lp|cal-lpb|dtg/.test(f.id)&&/2/.test(v.code))p*=1.25; if(/gl-mv|mc$/.test(f.id))p*=1.8; if(/t45|t90/.test(f.id))p*=1.2;
  let h=0;for(const ch of f.id)h=(h*31+ch.charCodeAt(0))%997;p*=.9+(h%23)/100;
  return Math.max(.28,Math.round(p*100)/100);
}
function vLabel(f,v){
  if(f.id==='mcl'||f.id==='mc') return `${fmtSize(v.size)} to ${fmtSize(v.size2)} mm²${v.stud?`, M${v.stud}`:''}`;
  if(v.size2) return `${fmtSize(v.size)} / ${fmtSize(v.size2)} mm²`;
  return `${fmtSize(v.size)} mm²${v.stud?`, ${v.stud} mm hole`:''}`;
}
// Public family names: no supplier series codes (supplier references are internal only)
const FAMILY_NAMES={'cau-a':'Bi-metal Lug, IEC 61238-1','cau-b':'Bi-metal Lug, 16 to 1000 mm²','cau-c':'Bi-metal Lug, DIN 48201 Cable','bl':'Bi-metal Lug, AS/NZS 4325','dtl-f':'Bi-metal Lug, Square Narrow Palm','dtl-g':'Bi-metal Lug, High-purity Copper Palm','blt':'Bi-metal Lug, Copper Washer Type','dtl':'Bi-metal Lug, General Purpose','bl-p':'Bi-metal Lug, Range 2','gtl':'Bi-metal Connector, In-line','sc':'Copper Cable Lug, Standard','cl':'Copper Cable Lug, AS 4325.1','hup':'Copper Cable Lug, Compact','t':'Copper Cable Lug, Range 2','jm':'Copper Cable Lug, Range 3','scb':'Bell-mouth Copper Cable Lug','jg':'Copper Cable Lug, Range 4','dtg':'Copper Cable Lug, 1 or 2 Holes','m':'Copper Cable Connector, Compact','casb':'Copper Connector, Tin-plated','gt-g':'Copper Connector, Plain'};
const P=[], BYID={}, BYCODE={}, BYSUP={}, BYNORM={};
for(const f of DATA.families){
  if(!f.variants.length) continue;
  const p={id:f.id,name:FAMILY_NAMES[f.id]||f.name,kind:'lug',sub:f.sub,cats:['lugs',...f.extra,...(f.sub==='mechanical'?['switchboards']:[])],mat:f.mat,desc:f.desc,specs:{Material:f.mat,...f.specs},img:DATA.imgs[String(f.img)],page:f.page,
    variants:f.variants.map(v=>({...v,label:vLabel(f,v)}))};
  p.variants.forEach(v=>v.price=lugPrice(f,v));
  P.push(p);
}
// Real Ampwell range from the finished data sheets (DATA.real). Photos are the data sheet photos.
const COLORS={white:'#F6F7F9',black:'#1E2127',grey:'#B8BFC9'};
const RIMG=k=>DATA.real.imgs[k];
const UNIT={'Amp':v=>v+' A','Gang':v=>v+' gang','Holes':v=>v+' holes','Pack qty':v=>'Pack of '+v,'Conduit (mm)':v=>v+' mm','Mechanisms':v=>v+(v==='1'?' mechanism':' mechanisms'),'H (mm)':v=>v+' mm deep','Motor start':v=>'Motor start '+v};
for(const f of DATA.real.families){
  const cols=new Set(f.rows.map(r=>r.color).filter(Boolean));
  const p={id:f.id,name:f.name,kind:'core',cats:[f.cat],desc:f.desc,cols:f.cols,model:f.model||null,imgs:f.imgs,
    specs:Object.fromEntries(Object.entries(f.specs).map(([k,v])=>[k,Array.isArray(v)?v.join('; '):v])),
    colorVariants:cols.size>1};
  p.specs['RCM / EESS']='Ampwell registration to be confirmed';
  p.variants=f.rows.map(r=>{
    const lab=f.key.map(k=>(UNIT[f.cols[k]]||(x=>x))(r.vals[k])).filter(Boolean).join(', ')||'Standard';
    let pr=f.price;const val=c=>r.vals[f.cols.indexOf(c)];
    if(val('Pack qty'))pr*=+val('Pack qty');if(val('Gang'))pr*=1+.45*(+val('Gang')-1);if(val('Mechanisms'))pr*=1+.08*(+val('Mechanisms')-1);
    if(val('Amp')==='15')pr*=1.12;if(r.color==='black')pr*=1.08;if(/4 Pole/.test(r.vals.join(' ')))pr*=1.35;if(/Mini/.test(r.vals.join(' ')))pr*=.8;
    if(/^(BPA|BPN)3/.test(r.sup))pr*=1.6;if(/\/13$/.test(r.sup))pr*=1.15;
    return {code:r.sup,label:lab,vals:r.vals,color:r.color||null,img:r.img||null,price:Math.round(pr*100)/100};
  });
  P.push(p);
}
const normCode=s=>String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
for(const c of CATS){let n=0;for(const p of P.filter(p=>p.cats[0]===c.id)){n++;const ff=String(n).padStart(2,'0');p.fam=`AW-${c.code}-${ff}`;
  p.variants.forEach((v,k)=>{v.sup=v.code;v.code=`${p.fam}${String(k+1).padStart(2,'0')}`})}}
for(const p of P){BYID[p.id]=p;for(const v of p.variants){BYCODE[v.code]=[p,v];BYNORM[normCode(v.code)]=[p,v];BYSUP[v.sup.toUpperCase()]=[p,v]}p.from=Math.min(...p.variants.map(v=>v.price));}
// internal lookup (sample data only): Ampwell code first, then supplier reference
function findCode(c){c=String(c||'').toUpperCase();return BYCODE[c]||BYNORM[normCode(c)]||BYSUP[c]||null}
function catCount(c){return P.filter(p=>p.cats.includes(c)).length}
function imgOf(p,v){if(p.kind==='lug')return p.img;return RIMG((v&&v.img)||p.imgs[0])}
function artOf(p,v){return `<img src="${imgOf(p,v)}" alt="${esc(p.name)}" loading="lazy"${p.kind==='core'?' class="photo"':''}>`}
function catName(id){return (CATS.find(c=>c.id===id)||{}).name||''}
function sizeRange(p){const s=p.variants.map(v=>v.size).filter(Boolean);if(!s.length)return '';const a=Math.min(...s),b=Math.max(...s,...p.variants.map(v=>v.size2||0));return `${fmtSize(a)} to ${fmtSize(b)} mm²`}
function seriesLabel(p){return p.fam}
let AUTH=(()=>{try{return JSON.parse(localStorage.getItem('ampwell:auth'))}catch(e){return null}})();
const canPrice=()=>!!(AUTH&&AUTH.approved);
function priceHTML(v,opts={}){return canPrice()?`${money(v.price)}${opts.suffix||''}`:`<button type="button" class="link login-link" data-act="login">${opts.short?'Log in for price':'Log in to view pricing'}</button>`}
const DELIVERY_FREE_OVER=300, DELIVERY_FEE=15;
const TOTAL_SKUS=P.reduce((a,p)=>a+p.variants.length,0);

/* ---------- deterministic smart search ---------- */
const STD=[1.5,2.5,4,6,10,16,25,35,50,70,95,120,150,185,240,300,400,500,630,800,1000];
function parseJob(q){
  const s=' '+q.toLowerCase().replace(/²/g,'2')+' ';
  const out={raw:q,sizes:[],stud:null,cable:null,term:null,flex:false,join:false,breaker:false,holes2:false,angle:null,mv:false,words:[]};
  const m=s.match(/\bm\s?(\d{1,2})\b/)||s.match(/(\d{1,2})\s?mm\s?(?:stud|bolt|hole)/)||s.match(/(?:stud|bolt|hole)\s?(?:of\s)?m?(\d{1,2})\b/);
  if(m) out.stud=+m[1];
  for(const n of s.matchAll(/(\d+(?:\.\d+)?)\s?(?:mm2|mm\^2|sq\s?mm|sqmm|mm|sq)?/g)){const v=+n[1];if(STD.includes(v)&&v!==out.stud&&(v>=16||/mm|sq/.test(n[0])))out.sizes.push(v)}
  if(!out.sizes.length){for(const n of s.matchAll(/\b(\d+(?:\.\d+)?)\b/g)){const v=+n[1];if(STD.includes(v)&&v!==out.stud)out.sizes.push(v)}}
  const al=/\b(al|alu|alum|aluminium|aluminum)\b/.test(s), cu=/\b(cu|copper)\b/.test(s);
  const iAl=s.search(/\b(al|alu|alum|aluminium|aluminum)\b/), iCu=s.search(/\b(cu|copper)\b/);
  if(al&&cu){out.cable=iAl<iCu?'al':'cu';out.term=iAl<iCu?'cu':'al'}
  else if(al)out.cable='al'; else if(cu)out.cable='cu';
  if(/bi-?metal|bimetal/.test(s)){out.cable='al';out.term='cu'}
  if(/busbar|bus bar|copper bar|cu bar/.test(s)&&out.cable==='al')out.term='cu';
  if(/flex|fine.?strand|class 5|welding cable|bell.?mouth/.test(s))out.flex=true;
  if(/connector|joint|splice|in-?line|through|reduc|butt/.test(s))out.join=true;
  if(/breaker|mccb|tunnel|\bpin\b|cb lug/.test(s))out.breaker=true;
  if(/2 hole|two hole|2-hole|double hole|long palm/.test(s))out.holes2=true;
  if(/45/.test(s)&&/angle|deg|°|45°/.test(s))out.angle=45; if(/90/.test(s)&&/angle|deg|°|right/.test(s))out.angle=90;
  if(/\b(11|22|33)\s?kv|medium voltage|\bmv\b/.test(s))out.mv=true;
  out.words=s.split(/[^a-z0-9.\-/]+/).filter(w=>w.length>2&&!/^(the|and|for|with|onto|into|mm2|mm|cable|lug|lugs|to|of)$/.test(w));
  return out;
}
function familyFits(p,j){
  if(p.kind!=='lug')return 0;
  let sc=0;
  const isConn=p.sub==='connectors';
  if(j.join){sc+=isConn?6:-4}else if(isConn)sc-=3;
  if(j.cable==='al'&&j.term==='cu'){sc+=p.sub==='bimetal'||/cau-conn|dsl|bcrl|pbl-a|gtl/.test(p.id)?7:(p.sub==='mechanical'?1:-8)}
  else if(j.cable==='al'){sc+=['aluminium','bimetal','mechanical'].includes(p.sub)||/gl|alk/.test(p.id)?4:-6}
  else if(j.cable==='cu'){sc+=p.sub==='copper'||/gty|clk|^m$|casr|casb|gt-g/.test(p.id)?5:-5}
  if(j.flex)sc+=/cl-bm|scb\b|scb$/.test(p.id)?6:-1;
  if(j.breaker)sc+=/mccb|calcb|pbl$/.test(p.id)?8:-2;
  if(j.holes2)sc+=/dtl-2|bl-lp|cal-lpb|dtg/.test(p.id)?7:-1;
  if(j.angle)sc+=p.id===('t'+j.angle)?10:-2;
  if(j.mv)sc+=/gl-mv|mc$/.test(p.id)?8:-1;
  return sc;
}
function bestVariant(p,j){
  let vs=p.variants;
  if(j.sizes.length){const t=j.sizes[0];const ex=vs.filter(v=>v.size===t||(v.size2&&v.size<=t&&t<=v.size2&&(p.id==='mcl'||p.id==='mc')));if(!ex.length)return null;vs=ex;if(j.sizes[1]){const e2=vs.filter(v=>v.size2===j.sizes[1]);if(e2.length)vs=e2}}
  if(j.stud){const ex=vs.filter(v=>v.stud===j.stud);if(ex.length)vs=ex;else if(vs.some(v=>v.stud))return {v:vs[0],studMiss:true}}
  return {v:vs[0]};
}
function smartSearch(q,limit=8){
  q=(q||'').trim(); if(!q)return [];
  const nq=normCode(q);
  if(BYNORM[nq]){const [p,v]=BYNORM[nq];return [{p,v,score:100}]}
  if(/^AW[A-Z]{2}\d{2}$/.test(nq)){const fp=P.find(p=>normCode(p.fam)===nq);if(fp)return [{p:fp,v:null,score:100}]}
  const j=parseJob(q), res=[];
  const ql=q.toLowerCase();
  for(const p of P){
    let sc=familyFits(p,j);
    const hay=(p.name+' '+p.desc+' '+p.cats.map(catName).join(' ')+' '+(p.sub?SUBS[p.sub]:'')+' '+p.fam).toLowerCase();
    let tw=0;for(const w of j.words){const ws=w.replace(/s$/,'');if(hay.includes(w)||(ws.length>3&&hay.includes(ws)))tw+=w.length>4?3:2}
    if(nq.length>=4&&nq.startsWith('AW')&&p.variants.some(v=>normCode(v.code).startsWith(nq)))tw+=12;
    sc+=tw;
    let bv=null;
    if(p.kind==='lug'&&j.sizes.length){bv=bestVariant(p,j);if(!bv){sc-=6}else sc+=3+(bv.studMiss?-1:2)}
    if(p.kind==='core'&&tw>0){const nums=(q.match(/\d+(?:\.\d+)?/g)||[]);if(nums.length){const hit=p.variants.find(v=>nums.every(n=>(v.vals||[]).some(x=>x===n||x.startsWith(n+' '))));if(hit){bv={v:hit};sc+=4}}}
    if(sc>2||(tw>0&&p.kind==='core'))res.push({p,v:bv?bv.v:null,studMiss:bv&&bv.studMiss,score:sc,tw});
  }
  // product names and words beat bare size matches
  const best=Math.max(0,...res.map(r=>r.tw));
  if(best>=3){for(let i=res.length-1;i>=0;i--)if(!res[i].tw)res.splice(i,1)}
  res.sort((a,b)=>b.score-a.score);
  return res.slice(0,limit);
}

/* ---------- lug finder logic ---------- */
function finderResults(o){
  // o: {cable:'al'|'cu', job:'cu'|'al'|'breaker'|'join', size, stud, flex, size2}
  let fams=[];
  const lug=p=>p.kind==='lug';
  if(o.job==='join'){
    if(o.cable==='al'&&o.other==='cu')fams=P.filter(p=>/^(cau-conn|dsl|bcrl|pbl-a|gtl)$/.test(p.id));
    else if(o.cable==='al')fams=P.filter(p=>/^(gl-mv|gl1|alk|alkr|mc)$/.test(p.id));
    else fams=P.filter(p=>/^(gty|clk|m|casr|casb|gt-g)$/.test(p.id));
  }else if(o.job==='breaker'){fams=P.filter(p=>o.cable==='al'?/^(pbl|mccb)$/.test(p.id):/^calcb$/.test(p.id))}
  else if(o.cable==='al'&&o.job==='cu')fams=P.filter(p=>lug(p)&&p.sub==='bimetal');
  else if(o.cable==='al')fams=P.filter(p=>lug(p)&&(p.sub==='aluminium'||p.sub==='mechanical'));
  else fams=P.filter(p=>lug(p)&&p.sub==='copper'&&(!o.flex||/cl-bm|scb/.test(p.id)));
  const out=[];
  for(const p of fams){
    for(const v of p.variants){
      if(o.size){
        if(p.id==='mcl'||p.id==='mc'){if(!(v.size<=o.size&&o.size<=v.size2))continue}
        else if(v.size!==o.size)continue;
      }
      if(o.stud&&v.stud&&v.stud!==o.stud)continue;
      out.push({p,v,exactStud:o.stud?v.stud===o.stud:false});
    }
  }
  out.sort((a,b)=>(b.exactStud-a.exactStud)||(a.v.price-b.v.price));
  return out;
}

/* ---------- quote state ---------- */
const store={get(k,d){try{const v=localStorage.getItem('ampwell:'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('ampwell:'+k,JSON.stringify(v))}catch(e){}}};
let QUOTE=store.get('quote',[]).filter(i=>BYCODE[i.code.toUpperCase()]);
function saveQuote(){store.set('quote',QUOTE);const n=QUOTE.reduce((a,i)=>a+i.qty,0);const b=$('#qbadge');b.textContent=n>99?'99+':n;b.hidden=!n;if($('#qdrawer').classList.contains('open'))renderQuote();if($('#reqitems')&&!document.activeElement?.dataset?.rqi)drawReqItems()}
function addToQuote(code,qty=1,silent){
  const hit=BYCODE[String(code).toUpperCase()]||BYNORM[normCode(code)];if(!hit)return false;
  qty=Math.max(1,Math.min(99999,Math.round(+qty||1)));
  const ex=QUOTE.find(i=>i.code===hit[1].code);if(ex)ex.qty+=qty;else QUOTE.push({code:hit[1].code,qty});
  saveQuote();if(!silent)toast(`Added ${qty} × ${hit[1].code} to your quote`,'View quote',()=>openDrawer('q'));return true;
}
function quoteTotals(){let sub=0;for(const i of QUOTE){const [,v]=BYCODE[i.code.toUpperCase()];sub+=v.price*i.qty}const del=!sub||sub>=DELIVERY_FREE_OVER?0:DELIVERY_FEE;const gst=(sub+del)*.1;return {sub,del,gst,total:sub+del+gst}}
function totalsHTML(){
  if(!canPrice())return `<div class="price-gate"><b>Prices are for trade account holders.</b> <button type="button" class="link login-link" data-act="login">Log in</button> to see prices, delivery and totals. You can still request a quote without logging in.</div>`;
  const t=quoteTotals();
  return `<div class="tot num"><span>Subtotal ex GST</span><span>${money(t.sub)}</span></div><div class="tot num"><span>Delivery <small>(free over ${money(DELIVERY_FREE_OVER)} ex GST)</small></span><span>${t.del?money(t.del):'Free'}</span></div><div class="tot num"><span>GST 10%</span><span>${money(t.gst)}</span></div><div class="tot big num"><span>Total inc GST</span><span>${money(t.total)}</span></div>`;
}

/* ---------- toast / modal / drawers ---------- */
let toastT;
function toast(msg,act,fn){const t=$('#toast');t.innerHTML=`<span>${esc(msg)}</span>${act?`<button>${esc(act)}</button>`:''}`;if(act)t.querySelector('button').onclick=()=>{t.classList.remove('on');fn()};t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),3800)}
function modal(html){const m=$('#modal');$('#mbox').innerHTML=html;m.classList.add('on');const f=$('#mbox input,#mbox textarea,#mbox button');f&&f.focus()}
function closeModal(){$('#modal').classList.remove('on')}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.closest('[data-close]'))closeModal()});
function openDrawer(w){closeMenu();const d=w==='q'?$('#qdrawer'):$('#adrawer');if(w==='q')renderQuote();else renderAsk();d.classList.add('open');$('#scrim').classList.add('on');setTimeout(()=>{const f=d.querySelector('textarea,button');f&&f.focus()},120)}
function closeDrawers(){$$('.drawer').forEach(d=>d.classList.remove('open'));$('#scrim').classList.remove('on');const s=$('.side.sheet');if(s)s.classList.remove('sheet')}
$('#scrim').onclick=closeDrawers;
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawers();closeModal();closeMenu()}});
function closeMenu(){$('#menu').classList.remove('open')}

/* ---------- nav & routing ---------- */
const NAV=[['home','Home'],['products','Products'],['solutions','Solutions'],['trade','Trade account'],['resources','Resources'],['about','About'],['contact','Contact']];
function navHTML(cur){return NAV.map(([h,l])=>`<a href="#${h}" ${cur===h?'aria-current="page"':''}>${l}</a>`).join('')}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-act]');if(!a)return;
  const act=a.dataset.act;
  if(act==='ask'){e.preventDefault();openDrawer('a')}
  else if(act==='quote'){e.preventDefault();openDrawer('q')}
  else if(act==='menu'){$('#menu').classList.add('open');$('#mnav').innerHTML=navHTML(route().name);if(!$('#menu .menu-close')){$('#menu').insertAdjacentHTML('afterbegin',`<button class="hbtn menu-close" style="color:var(--dark);background:none;border:0;width:44px;height:44px;cursor:pointer" aria-label="Close menu" onclick="closeMenu()">${I.x}</button>`)}}
  else if(act==='search'){e.preventDefault();nav('products');setTimeout(()=>{const i=$('#catq');i&&i.focus()},60)}
  else if(act==='add'){e.preventDefault();addToQuote(a.dataset.code,+(a.dataset.qty||1))}
  else if(act==='trade-form')tradeForm(a.dataset.kind);
  else if(act==='login')loginInfo();
});
$('#menu').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
// Page addresses use letters, digits and hyphens only (#p-gpod, #c-switches), so they work on the published link too.
let ROUTE=(location.hash||'#home').slice(1)||'home';
function route(){const h=ROUTE;if(h==='request')return {name:'request'};
  if(/^p[-_]/.test(h))return {name:'product',id:h.slice(2)};
  if(/^c-/.test(h))return {name:'products',cat:h.slice(2)};if(h.startsWith('cat_'))return {name:'products',cat:h.slice(4)};
  return {name:NAV.some(n=>n[0]===h)?h:'home'}}
function nav(h){h=String(h||'home').replace(/^#/,'');ROUTE=h;try{if(location.hash.slice(1)!==h)location.hash=h}catch(e){}go()}
// every in-page link goes through nav(), so it works even where the address bar can't change
document.addEventListener('click',e=>{
  if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  const h=a.getAttribute('href').slice(1);if(!h)return;
  const r=/^(p[-_]|c-|cat_)/.test(h)||h==='request'||NAV.some(n=>n[0]===h);
  if(!r){const t=document.getElementById(h);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}return}
  e.preventDefault();closeDrawers();closeMenu();nav(h)});
function go(){if(GAL){GAL.dispose();GAL=null}const r=route();closeMenu();closeDrawers();$('#nav').innerHTML=navHTML(r.name==='product'?'products':r.name);
  const v={home:vHome,products:vProducts,product:vProduct,solutions:vSolutions,trade:vTrade,resources:vResources,about:vAbout,contact:vContact,request:vRequest}[r.name]||vHome;
  $('#app').innerHTML='';v(r);window.scrollTo(0,0);document.title=(r.name==='home'?'Ampwell | Electrical products for the trade':(r.name==='product'&&BYID[r.id]?BYID[r.id].name:r.name==='request'?'Request a quote':(NAV.find(n=>n[0]===r.name)||[,''])[1])+' | Ampwell');}
window.addEventListener('hashchange',()=>{const h=(location.hash||'#home').slice(1)||'home';if(h!==ROUTE){ROUTE=h;go()}});

/* ---------- shared bits ---------- */
function card(p){
  const v=p.variants[0], n=p.variants.length;
  const sw=p.colorVariants?[...new Map(p.variants.filter(x=>COLORS[x.color]).map(x=>[x.color,x])).values()]:[];
  const dots=sw.length>1?`<span class="dots">${sw.map((x,i)=>`<button type="button" class="sw" data-sw="${p.id}" data-c="${esc(x.code)}" aria-label="${esc(x.color[0].toUpperCase()+x.color.slice(1))}" aria-pressed="${i===0}" style="background:${COLORS[x.color]}"></button>`).join('')}<span style="margin-left:4px">${n} ${n===1?'variant':'variants'}</span></span>`:`<span>${n} ${p.kind==='lug'?'sizes':'variants'}${p.kind==='lug'?'<br><small>'+sizeRange(p)+'</small>':''}</span>`;
  return `<article class="pc"><a class="stage" href="#p-${p.id}" aria-label="${esc(p.name)}">${artOf(p)}</a>
  <div class="body"><span class="code">${esc(p.fam)}</span>
  <h3><a href="#p-${p.id}">${esc(p.name)}</a></h3><span class="cat">${esc(p.kind==='lug'?SUBS[p.sub]:catName(p.cats[0]))}</span>
  <p>${esc(p.desc)}</p>
  <div class="meta">${dots}<span>${canPrice()?`from <span class="price num">${money(p.from)}</span>`:priceHTML(null,{short:true})}</span></div>
  <div class="act">${n===1?`<button class="btn btn-navy btn-sm" data-act="add" data-code="${esc(v.code)}">${I.plus} Add to quote</button>`:`<a class="btn btn-navy btn-sm" href="#p-${p.id}">${p.kind==='lug'?'Choose size':'Choose variant'}</a>`}</div></div></article>`;
}
function vrow(p,v,extra=''){return `<div class="vrow"><a class="th" href="#p-${p.id}">${artOf(p,v)}</a><div><span class="code num">${esc(v.code)}</span><b>${esc(p.name)}</b><small class="num">${esc(v.label)}${canPrice()?` &nbsp; ${money(v.price)} ex GST`:''}${extra}</small></div><button class="icon-btn" data-act="add" data-code="${esc(v.code)}" aria-label="Add ${esc(v.code)} to quote">${I.plus}</button></div>`}
function footer(){
  $('#foot').innerHTML=`<div class="wrap"><section class="cta-band glow" style="padding:10px 0 60px"><h2 class="disp h2">Let’s power your next project.</h2><div class="hero-cta"><a class="btn btn-blue" href="#request">Request a quote</a><a class="btn btn-line" href="#contact" >Contact Ampwell</a></div></section>
  <a class="logo" href="#home"><img src="${$('.logo img').src}" alt=""><b>AMP<span>WELL</span></b></a>
  <p style="max-width:46ch;margin:14px 0 18px">Electrical products for Australian electricians and commercial projects.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-white btn-sm" data-act="trade-form" data-kind="account">Open a trade account</button></div>
  <div class="cols"><div></div><div><h4>Products</h4>${CATS.map(c=>`<a href="#c-${c.id}">${c.name}</a>`).join('')}</div>
  <div><h4>Trade</h4><a href="#trade">Trade accounts</a><a href="#" data-act="trade-form" data-kind="account">Trade registration</a><a href="#" data-act="login">Trade login</a><a href="#request">Request a quote</a><a href="#resources">Technical resources</a></div>
  <div><h4>Company</h4><a href="#solutions">Solutions</a><a href="#about">About Ampwell</a><a href="#contact">Contact</a><a href="mailto:sales@ampwell.com.au">sales@ampwell.com.au</a></div></div>
  <div class="legal"><span>© ${new Date().getFullYear()} Ampwell. Powering a safer tomorrow.</span><span>Trade prices are shown to approved trade account holders after logging in. All prices ex GST.</span></div></div>`;
}

/* ---------- HOME ---------- */
const FEATURED=['gpod','swplate','usbmech','wpdouble','ceilingrose','linkactive','cau-a','sc'];
function vHome(){
  const app=$('#app');
  app.innerHTML=`
  <section class="dark glow grid-lines hero"><div class="wrap">
    <div>
      <h1 class="disp h1">Powering what’s next.</h1>
      <p class="lede">Modern electrical products engineered for performance, designed for professionals and built for tomorrow.</p>
      <div class="hero-cta"><a class="btn btn-blue" href="#products">Explore products</a><a class="btn btn-line" href="#trade">Become a trade partner</a></div>
    </div>
    <div class="hero-art"><img src="${DATA.hero}" alt="Ampwell bi-metal cable lug">
      <div class="spec s1"><span><b>Aluminium barrel</b><br>99.6% pure, compound filled</span><i></i></div>
      <div class="spec s2"><i></i><span><b>Copper palm</b><br>99.9% pure, friction welded</span></div><p class="cap" style="position:absolute;bottom:0;left:0;right:0">Bi-metal lug, 16 to 1000 mm²</p></div>
  </div><div style="height:36px"></div></section>

  <section class="sec navy glow"><div class="wrap">
    <div class="sh"><h2 class="disp h2">Featured products.</h2><a class="btn btn-line" href="#products">View all products</a></div>
    <div class="rail frail" id="frail">${FEATURED.map(id=>card(BYID[id])).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sh"><div><h2 class="disp h2">Products built for professionals.</h2><p class="lede">Seven ranges covering the products electricians specify and install every week. ${TOTAL_SKUS.toLocaleString()} part numbers, each with its specification published.</p></div></div>
    <div class="rail" id="rail">${CATS.map(c=>`<a class="range" href="#c-${c.id}"><div class="art">${c.art()}</div><div class="body"><span class="count">${catCount(c.id)} products</span><h3>${c.name}</h3><p>${c.blurb}</p><span class="btn btn-white btn-sm">Explore products</span></div></a>`).join('')}</div>
  </div></section>

  <section class="sec navy glow"><div class="wrap">
    <h2 class="disp h2">Every detail matters.</h2>
    <p class="lede">The difference between a good product and a frustrating one shows up on site: a terminal that is hard to reach, a plate that sits proud of the wall, a code that does not match the docket. Ampwell is built around getting those details right.</p>
    <div class="values"><div><h3>Quality</h3><p>Products developed or selected with quality as a priority, and specifications published only once they are verified.</p></div><div><h3>Innovation</h3><p>Modern product thinking and continuous improvement, from slimmer profiles to USB-C built into the plate.</p></div><div><h3>Reliability</h3><p>Electrical products designed around practical professional requirements, and supply you can plan a project around.</p></div><div><h3>Value</h3><p>Commercially competitive pricing for contractors and project buyers, with account pricing for approved trade customers.</p></div></div>
  </div></section>

  <section class="sec"><div class="wrap split">
    <div><h2 class="disp h2">Built for the trade.</h2><p class="lede">Ampwell sells through the trade. Open a trade account for account pricing, saved product lists and quick re-ordering.</p></div>
    <div class="tcard">${I.hat}<h3>Electrical contractors</h3><p>Open a trade account to request account pricing, save product lists and re-order what you use most.</p><button class="btn btn-blue" data-act="trade-form" data-kind="account">Open a trade account</button></div>
  </div></section>`;
}
let PENDING_SEL=null;

/* ---------- finder ---------- */
const FS={cable:'al',job:'cu',size:240,stud:12,flex:false,other:'cu'};
function renderFinder(el){
  const segs=(k,opts)=>`<div class="seg">${opts.map(([v,l])=>`<button type="button" class="lchip" aria-pressed="${FS[k]===v}" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div>`;
  el.innerHTML=`<div class="panel">
    <div class="fq"><span class="lbl">1. Cable conductor</span>${segs('cable',[['al','Aluminium'],['cu','Copper']])}</div>
    <div class="fq"><span class="lbl">2. Terminating onto</span>${segs('job',[['cu','Copper terminal or busbar'],['al','Aluminium terminal'],['breaker','Breaker tunnel'],['join','Another cable']])}
      ${FS.job==='join'?`<div style="margin-top:10px">${segs('other',[['cu','Copper cable'],['al','Aluminium cable']])}</div>`:''}</div>
    <div class="fq"><label for="fsize">3. Conductor size</label><select id="fsize" class="sel num">${STD.filter(s=>s>=1.5).map(s=>`<option value="${s}" ${FS.size===s?'selected':''}>${s} mm²</option>`).join('')}</select></div>
    <div class="fq"><label for="fstud">4. Stud or bolt size</label><select id="fstud" class="sel num"><option value="">Any</option>${[4,5,6,8,10,12,14,16,20].map(s=>`<option value="${s}" ${FS.stud===s?'selected':''}>M${s}</option>`).join('')}</select></div>
    ${FS.cable==='cu'&&FS.job!=='join'&&FS.job!=='breaker'?`<label class="toggle"><input type="checkbox" id="fflex" ${FS.flex?'checked':''}> Fine-stranded flexible cable</label>`:''}
  </div><div><div id="fres"></div></div>`;
  $$('.lchip',el).forEach(b=>b.onclick=()=>{FS[b.dataset.k]=b.dataset.v;renderFinder(el)});
  $('#fsize',el).onchange=e=>{FS.size=+e.target.value;renderFinder(el)};
  $('#fstud',el).onchange=e=>{FS.stud=e.target.value?+e.target.value:null;renderFinder(el)};
  const fx=$('#fflex',el);if(fx)fx.onchange=e=>{FS.flex=e.target.checked;renderFinder(el)};
  const r=finderResults(FS), box=$('#fres',el);
  const why={cu:FS.cable==='al'?'Aluminium onto copper needs a bi-metal lug. The friction-welded joint keeps the two metals from corroding where they meet.':'Copper to copper: tin-plated copper lugs, rated to 155 °C.',al:'Aluminium onto aluminium: tin-plated or bare aluminium lugs, or a mechanical lug with shear-off bolts.',breaker:'Narrow pin and palm lugs that fit the terminal tunnel of moulded-case breakers.',join:'In-line connectors and splices, including bi-metal and reducing types.'}[FS.job];
  box.innerHTML=`<p class="resinfo"><b style="color:var(--text)">${r.length} matching part number${r.length===1?'':'s'}.</b> ${why}</p>`+(r.length?`<div class="vlist">${r.slice(0,8).map(({p,v,exactStud})=>vrow(p,v,FS.stud&&v.stud&&exactStud?' &nbsp;<span class="status st-ok">M'+FS.stud+' hole</span>':'')).join('')}</div>${r.length>8?`<p class="resinfo" style="margin-top:12px">Showing 8 of ${r.length}. Pick a stud size to narrow it down.</p>`:''}`:`<div class="empty">Nothing in the range at ${FS.size} mm² for this job. Try a neighbouring size, or <button class="link" data-act="ask">ask Amp</button> for an alternative.</div>`);
}

/* ---------- PRODUCTS ---------- */
const CF={q:'',cats:new Set(),subs:new Set(),size:'',stud:'',sort:'rel',show:24};
function vProducts(r){
  if(r.cat!==undefined){CF.cats=new Set(r.cat?[r.cat]:[]);CF.subs.clear();CF.show=24}
  const c=r.cat&&CATS.find(x=>x.id===r.cat);
  $('#app').innerHTML=`<section class="navy glow" style="padding:40px 0 34px"><div class="wrap"><div class="crumbs" style="color:var(--on-ink-muted)"><a href="#home">Home</a><span>/</span><a href="#products">Products</a>${c?`<span>/</span><span>${esc(c.name)}</span>`:''}</div>
    <h1 class="disp h2">${esc(c?c.name:'All products')}.</h1><p class="lede">${esc(c?c.blurb:`${P.length} product families and ${TOTAL_SKUS.toLocaleString()} part numbers across seven ranges.`)}</p></div></section>
    ${r.cat==='lugs'?`<section class="sec" style="padding:44px 0 40px;border-bottom:1px solid var(--line)"><div class="wrap">
      <div class="sh"><div><h2 class="disp h2">The right lug in four taps.</h2><p class="lede">Tell us what you are terminating. We narrow ${P.filter(p=>p.kind==='lug').length} lug and connector families down to the exact part numbers that fit.</p></div></div>
      <div class="finder" id="finder"></div></div></section>`:''}
    <div class="wrap" style="padding-top:26px"><div class="layout"><aside class="side" id="side"></aside><div>
      <div class="toolbar"><label class="searchbox">${I.search}<input id="catq" placeholder="Search by name, part code or job" value="${esc(CF.q)}" aria-label="Search products"></label>
      <button class="btn btn-line btn-sm filters-btn" id="fbtn">${I.filter} Filters</button>
      <select class="sel" id="sort" style="width:auto;border-radius:999px;padding:10px 14px"><option value="rel">Most relevant</option><option value="az">Name A to Z</option>${canPrice()?'<option value="lo">Price, low to high</option><option value="hi">Price, high to low</option>':''}</select></div>
      <p class="resinfo" id="rinfo"></p><div class="pgrid" id="grid"></div><div class="more" id="more"></div></div></div></div>`;
  if(!canPrice()&&/lo|hi/.test(CF.sort))CF.sort='rel';$('#sort').value=CF.sort;
  renderSide();renderGrid();
  if($('#finder'))renderFinder($('#finder'));
  let t;$('#catq').addEventListener('input',e=>{clearTimeout(t);t=setTimeout(()=>{CF.q=e.target.value;CF.show=24;renderGrid()},120)});
  $('#sort').onchange=e=>{CF.sort=e.target.value;renderGrid()};
  $('#fbtn').onclick=()=>{$('#side').classList.add('sheet');$('#scrim').classList.add('on')};
}
function filtered(){
  let list=P.slice();
  if(CF.cats.size)list=list.filter(p=>p.cats.some(c=>CF.cats.has(c)));
  if(CF.subs.size)list=list.filter(p=>CF.subs.has(p.sub));
  if(CF.size)list=list.filter(p=>p.variants.some(v=>v.size===+CF.size||(v.size2&&(p.id==='mcl'||p.id==='mc')&&v.size<=+CF.size&&+CF.size<=v.size2)));
  if(CF.stud)list=list.filter(p=>p.variants.some(v=>v.stud===+CF.stud));
  let scores=null;
  if(CF.q.trim()){const r=smartSearch(CF.q,999);scores=new Map(r.map(x=>[x.p.id,x.score]));list=list.filter(p=>scores.has(p.id))}
  const s=CF.sort;
  if(s==='az')list.sort((a,b)=>a.name.localeCompare(b.name));else if(s==='lo')list.sort((a,b)=>a.from-b.from);else if(s==='hi')list.sort((a,b)=>b.from-a.from);
  else if(scores)list.sort((a,b)=>scores.get(b.id)-scores.get(a.id));
  return list;
}
function renderSide(){
  const sizes=[...new Set(P.flatMap(p=>p.variants.map(v=>v.size)).filter(Boolean))].sort((a,b)=>a-b).filter(s=>STD.includes(s));
  const showSubs=!CF.cats.size||CF.cats.has('lugs')||CF.cats.has('circuit-protection')||CF.cats.has('switchboards');
  $('#side').innerHTML=`<div class="grp" style="display:flex;justify-content:space-between;align-items:center"><h4 style="margin:0">Filters</h4><button class="link" id="clr">Clear all</button></div>
  <div class="grp"><h4>Range</h4>${CATS.map(c=>`<label class="opt"><span><input type="checkbox" data-cat="${c.id}" ${CF.cats.has(c.id)?'checked':''}>${c.name}</span><em>${catCount(c.id)}</em></label>`).join('')}</div>
  ${showSubs?`<div class="grp"><h4>Lugs & connectors</h4>${SUB_ORDER.map(s=>`<label class="opt"><span><input type="checkbox" data-sub="${s}" ${CF.subs.has(s)?'checked':''}>${SUBS[s]}</span><em>${P.filter(p=>p.sub===s).length}</em></label>`).join('')}</div>
  <div class="grp"><h4>Conductor size</h4><select class="sel num" id="fsz"><option value="">Any size</option>${sizes.map(s=>`<option ${+CF.size===s?'selected':''} value="${s}">${s} mm²</option>`).join('')}</select></div>
  <div class="grp"><h4>Stud hole</h4><select class="sel num" id="fst"><option value="">Any</option>${[4,5,6,8,10,12,14,16,20].map(s=>`<option ${+CF.stud===s?'selected':''} value="${s}">${s} mm (M${s})</option>`).join('')}</select></div>`:''}
  <div class="grp" style="border:0"><button class="btn btn-blue btn-block filters-btn" id="done">Show results</button></div>`;
  $$('#side [data-cat]').forEach(i=>i.onchange=()=>{i.checked?CF.cats.add(i.dataset.cat):CF.cats.delete(i.dataset.cat);CF.show=24;renderSide();renderGrid()});
  $$('#side [data-sub]').forEach(i=>i.onchange=()=>{i.checked?CF.subs.add(i.dataset.sub):CF.subs.delete(i.dataset.sub);CF.show=24;renderGrid()});
  const a=$('#fsz'),b=$('#fst');if(a)a.onchange=()=>{CF.size=a.value;renderGrid()};if(b)b.onchange=()=>{CF.stud=b.value;renderGrid()};
  $('#clr').onclick=()=>{CF.cats.clear();CF.subs.clear();CF.size='';CF.stud='';CF.q='';$('#catq').value='';renderSide();renderGrid()};
  $('#done').onclick=closeDrawers;
}
function renderGrid(){
  const list=filtered();
  $('#rinfo').textContent=`${list.length} product${list.length===1?'':'s'}${CF.q?` for “${CF.q}”`:''}`;
  $('#grid').innerHTML=list.length?list.slice(0,CF.show).map(card).join(''):`<div class="empty" style="grid-column:1/-1">No products match these filters. <button class="link" onclick="document.getElementById('clr').click()">Clear filters</button>${AI.sample?' or <button class="link" data-act="ask">ask Amp</button>':''}.</div>`;
  $('#more').innerHTML=list.length>CF.show?`<button class="btn btn-line">Show ${Math.min(24,list.length-CF.show)} more</button>`:'';
  const m=$('#more button');if(m)m.onclick=()=>{CF.show+=24;renderGrid()};
}

/* ---------- PRODUCT ---------- */
function vProduct(r){
  const p=BYID[r.id];if(!p){nav('products');return}
  let sel=p.variants[0];
  if(PENDING_SEL){const h=BYCODE[PENDING_SEL.toUpperCase()];if(h&&h[0]===p)sel=h[1];PENDING_SEL=null}
  const isLug=p.kind==='lug';
  const sizes=isLug?[...new Set(p.variants.map(v=>v.size+'|'+(v.size2||'')))]:[];
  const related=P.filter(x=>x!==p&&(isLug?x.sub===p.sub:x.cats[0]===p.cats[0])).slice(0,4);
  $('#app').innerHTML=`<div class="wrap"><div class="crumbs" style="padding-top:22px"><a href="#home">Home</a><span>/</span><a href="#c-${p.cats[0]}">${esc(catName(p.cats[0]))}</a>${isLug?`<span>/</span><span>${SUBS[p.sub]}</span>`:''}</div>
  <div class="pdp"><div><div class="gal" id="gal"></div></div></div>
  <div><span class="code" style="font-weight:700;color:var(--muted);font-size:13px">${esc(isLug?SUBS[p.sub]:catName(p.cats[0]))}</span><h1>${esc(p.name)}</h1><p class="desc">${esc(p.desc)}</p>
    <div class="buy"><div class="fq"><span class="lbl">${isLug?'Conductor size':p.colorVariants?'Finish':'Variant'}</span><div class="sizes" id="opt1"></div></div>
    <div class="fq" id="opt2wrap"></div>
    <div class="row" style="margin-top:6px"><div><span class="sku num" id="sku"></span><div style="color:var(--muted);font-size:14px" id="vl"></div></div><div class="pr num" id="pr"></div></div>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px"><div class="qty" style="flex:none"><button type="button" id="qm" aria-label="Decrease">−</button><input id="qv" type="number" inputmode="numeric" min="1" value="${isLug?10:1}" aria-label="Quantity"><button type="button" id="qp" aria-label="Increase">+</button></div><button class="btn btn-navy" style="flex:1 1 150px" id="addb">${I.plus} Add to quote</button></div></div>
    <dl class="specs">${Object.entries(p.specs).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}<dt>Part numbers</dt><dd class="num">${p.variants.length}</dd></dl>
    <div class="ai-card" id="pq"><span class="ai-tag">${I.bolt} Ask about this product</span><form id="pqf" style="display:flex;gap:8px;margin-top:10px"><input class="sel" id="pqi" placeholder="${isLug?'e.g. Which size for a 120 mm² Al cable on M12?':'e.g. Will this suit a bathroom?'}" style="border-radius:999px"><button class="btn btn-blue btn-sm" type="submit">Ask</button></form><div class="ai-out" id="pqo"></div></div>
  </div></div>
  ${p.variants.length>1?`<section style="padding-bottom:40px"><div class="sh" style="margin-bottom:14px"><h2 class="disp h3">All ${p.variants.length} part numbers</h2>${p.variants.length>12?`<label class="searchbox" style="max-width:280px;flex:0 1 280px">${I.search}<input id="vf" placeholder="${isLug?'Filter, e.g. 95 or M12':'Filter part numbers'}" aria-label="Filter part numbers"></label>`:''}</div>
  <div class="tbl-wrap" style="max-height:520px;overflow:auto"><table class="t num"><thead><tr><th>Ampwell part number</th>${isLug?'<th>Conductor</th><th>Stud hole</th>':p.cols.map(c=>`<th>${esc(c)}</th>`).join('')}${canPrice()?'<th>Price ex GST</th>':''}<th></th></tr></thead><tbody id="vt"></tbody></table></div></section>`:''}
  <section style="padding:20px 0 80px"><h2 class="disp h3" style="margin-bottom:18px">Often specified with</h2><div class="pgrid w4">${related.map(card).join('')}</div></section></div>`;
  const opt1=$('#opt1'), o2=$('#opt2wrap');
  function pick(v){sel=v;
    $('#sku').textContent=v.code;$('#vl').textContent=v.label;$('#pr').innerHTML=canPrice()?`${money(v.price)}<small>each, your trade price ex GST</small>`:`<button type="button" class="btn btn-line btn-sm" data-act="login">Log in to view pricing</button>`;
    if(GAL)GAL.set(v);
    // opt1 state
    $$('.lchip',opt1).forEach(b=>b.setAttribute('aria-pressed',isLug?b.dataset.v===(v.size+'|'+(v.size2||'')):b.dataset.v===v.code));
    if(isLug){const same=p.variants.filter(x=>x.size===v.size&&(x.size2||'')===(v.size2||''));
      o2.innerHTML=same.length>1?`<span class="lbl">${p.id==='mcl'?'Palm hole':'Stud hole'}</span><div class="sizes">${same.map(x=>`<button type="button" class="lchip num" aria-pressed="${x===v}" data-c="${esc(x.code)}">${x.stud?x.stud+' mm':x.code}</button>`).join('')}</div>`:'';
      $$('[data-c]',o2).forEach(b=>b.onclick=()=>pick(BYCODE[b.dataset.c.toUpperCase()][1]));}
    $$('#vt tr').forEach(tr=>tr.classList.toggle('on',tr.dataset.c===v.code));
  }
  opt1.innerHTML=isLug?sizes.map(s=>{const [a,b]=s.split('|');return `<button type="button" class="lchip num" data-v="${s}">${b&&(p.id==='mcl'||p.id==='mc')?fmtSize(+a)+' to '+fmtSize(+b):b?fmtSize(+a)+' / '+fmtSize(+b):fmtSize(+a)}</button>`}).join('')
    :p.variants.map(v=>`<button type="button" class="lchip" data-v="${esc(v.code)}">${v.color?`<span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:${COLORS[v.color]};border:1px solid var(--line);margin-right:6px;vertical-align:-1px"></span>`:''}${esc(v.label)}</button>`).join('');
  $$('.lchip',opt1).forEach(b=>b.onclick=()=>pick(isLug?p.variants.find(v=>(v.size+'|'+(v.size2||''))===b.dataset.v):BYCODE[b.dataset.v.toUpperCase()][1]));
  const qv=$('#qv');$('#qm').onclick=()=>qv.value=Math.max(1,(+qv.value||1)-1);$('#qp').onclick=()=>qv.value=(+qv.value||0)+1;
  $('#addb').onclick=()=>addToQuote(sel.code,+qv.value||1);
  const vt=$('#vt');
  function rows(f=''){if(!vt)return;f=f.trim().toLowerCase().replace(/^m(\d)/,'$1');
    const list=p.variants.filter(v=>!f||v.code.toLowerCase().includes(f)||String(v.size).startsWith(f)||String(v.stud||'')===f||(v.vals||[]).join(' ').toLowerCase().includes(f)||v.label.toLowerCase().includes(f));
    vt.innerHTML=list.map(v=>`<tr data-c="${esc(v.code)}" class="${v===sel?'on':''}"><td><b>${esc(v.code)}</b></td>${isLug?`<td>${(p.id==='mcl'||p.id==='mc')?fmtSize(v.size)+' to '+fmtSize(v.size2):v.size2?fmtSize(v.size)+' / '+fmtSize(v.size2):fmtSize(v.size)} mm²</td><td>${v.stud?(p.id==='mcl'||p.id==='mc'?'M':'')+v.stud+(p.id==='mcl'||p.id==='mc'?'':' mm'):'–'}</td>`:v.vals.map(x=>`<td style="white-space:normal">${esc(x||'–')}</td>`).join('')}${canPrice()?`<td>${money(v.price)}</td>`:''}<td style="text-align:right"><button class="btn btn-line" data-act="add" data-code="${esc(v.code)}" data-qty="${isLug?10:1}">Add ${isLug?10:1}</button></td></tr>`).join('')||`<tr><td colspan="5" style="color:var(--muted)">No part numbers match “${esc(f)}”.</td></tr>`;
    $$('tr[data-c]',vt).forEach(tr=>tr.addEventListener('click',e=>{if(!e.target.closest('button'))pick(BYCODE[tr.dataset.c.toUpperCase()][1])}));
  }
  rows();const vf=$('#vf');if(vf)vf.oninput=()=>rows(vf.value);
  GAL=mountGallery($('#gal'),p,sel,nv=>pick(nv));
  pick(sel);
  $('#pqf').onsubmit=e=>{e.preventDefault();askProduct(p,sel,$('#pqi').value)};
  if(!AI.sample)$('#pq').hidden=true;
}

/* ---------- SOLUTIONS ---------- */
function vSolutions(){
  $('#app').innerHTML=`<section class="navy glow grid-lines" style="padding:56px 0 50px"><div class="wrap"><h1 class="disp h1" style="font-size:clamp(40px,7vw,86px)">Solutions.</h1><p class="lede">Help finding the right part, fast. Identify an old part from a photo, ask Amp a technical question, or send us your list for pricing.</p></div></section>
  <section class="sec" style="padding-top:44px"><div class="wrap"><div class="cards3" style="margin-top:0">
    <div class="lcard" id="photoCard"><h3>Identify a part from a photo</h3><p>Photograph an old lug or connector on site. Amp identifies the family and likely size, then shows the Ampwell equivalent.</p><button class="btn btn-line" style="margin-top:14px" id="photoBtn">${I.cam} Identify from a photo</button><div id="photoOut"></div></div>
    <div class="lcard" id="askCard"><h3>Ask a technical question</h3><p>Amp knows all ${TOTAL_SKUS.toLocaleString()} part numbers and can check sizes, studs and compatibility for you.</p><button class="btn btn-line" style="margin-top:14px" data-act="ask">Ask Amp</button></div>
    <div class="lcard"><h3>Request a quote</h3><p>Add products as you browse, then send us your details. Your selected products are attached to the request.</p><a class="btn btn-blue" style="margin-top:14px" href="#request">Request a quote</a></div>
  </div></div></section>`;
  $('#photoBtn').onclick=()=>pickFile('image/*',f=>identifyPhoto(f,$('#photoOut')));
  if(!AI.sample){$('#photoCard').hidden=true;$('#askCard').hidden=true}
}

/* ---------- TRADE ---------- */
function vTrade(){
  $('#app').innerHTML=`<section class="navy glow" style="padding:56px 0 60px"><div class="wrap split"><div><h1 class="disp h1" style="font-size:clamp(40px,7vw,86px)">Built for the trade.</h1><p class="lede">Ampwell sells through the trade. Open a trade account for account pricing, saved product lists and quick re-ordering.</p></div>
  <div class="tcard">${I.hat}<h3>Electrical contractors</h3><p>Open a trade account to request account pricing, save product lists and re-order what you use most.</p><button class="btn btn-blue" data-act="trade-form" data-kind="account">Open a trade account</button></div></div></section>
  <section class="sec"><div class="wrap split"><div><h2 class="disp h2">How trade pricing works.</h2><div class="prose"><p>Trade prices are shown only to approved trade account holders once they log in. Anyone can build a quote list and request a quote without an account.</p><p>Project and volume pricing is quoted per job. Add products to your quote as you browse, then request a quote and our team returns a priced quotation.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="btn btn-blue" href="#request">Request a quote</a><button class="btn btn-line" data-act="login">Trade login</button></div></div>
  <div class="stats"><div><b>${TOTAL_SKUS.toLocaleString()}</b><span>part numbers</span></div><div><b>${P.length}</b><span>product families</span></div><div><b>7</b><span>product ranges</span></div><div><b>1</b><span>reference per quote</span></div></div></div></section>`;
}
function abnValid(s){const d=String(s).replace(/\s/g,'');if(!/^\d{11}$/.test(d))return false;const w=[10,1,3,5,7,9,11,13,15,17,19];const n=d.split('').map(Number);n[0]-=1;return n.reduce((t,x,k)=>t+x*w[k],0)%89===0}
function tradeForm(){
  const st=['NSW','VIC','QLD','WA','SA','TAS','ACT','NT'];
  modal(`<h2>Open a trade account</h2><p style="color:var(--muted);margin:0 0 18px">For licensed electrical contractors. Accounts stay inactive until our team approves them.</p><form id="tf" novalidate>
   <div class="two"><div class="field"><label for="tf1">Contact name *</label><input id="tf1" autocomplete="name"></div><div class="field"><label for="tf2">Business name *</label><input id="tf2" autocomplete="organization"></div></div>
   <div class="field"><label for="tf3">ABN *</label><input id="tf3" inputmode="numeric" placeholder="11 digits"></div>
   <div class="two"><div class="field"><label for="tf4">Electrical contractor licence number *</label><input id="tf4"></div><div class="field"><label for="tf5">Licence state *</label><select id="tf5"><option value="">Choose</option>${st.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
   <div class="two"><div class="field"><label for="tf6">Email *</label><input id="tf6" type="email" autocomplete="email"></div><div class="field"><label for="tf7">Phone *</label><input id="tf7" type="tel" autocomplete="tel"></div></div>
   <div class="field"><label for="tf8">Expected monthly spend</label><select id="tf8"><option>Under $1,000</option><option>$1,000 to $5,000</option><option>$5,000 to $20,000</option><option>Over $20,000</option></select></div>
   <p id="tferr" role="alert" style="color:var(--bad);font-size:14px;margin:0 0 12px" hidden></p>
   <div style="display:flex;gap:10px"><button class="btn btn-blue" type="submit" style="flex:1">Submit application</button><button class="btn btn-line" type="button" data-close>Cancel</button></div></form>`);
  $('#tf').onsubmit=e=>{e.preventDefault();const v=id=>$('#'+id).value.trim(),err=$('#tferr');
    const miss=[['tf1','contact name'],['tf2','business name'],['tf3','ABN'],['tf4','licence number'],['tf5','licence state'],['tf6','email'],['tf7','phone']].filter(([id])=>!v(id)).map(x=>x[1]);
    if(miss.length){err.textContent=`Please add your ${miss.join(', ')}.`;err.hidden=false;return}
    if(!abnValid(v('tf3'))){err.textContent='That ABN doesn’t look right. Check the 11 digits.';err.hidden=false;return}
    if(!/^\S+@\S+\.\S+$/.test(v('tf6'))){err.textContent='Please check your email address.';err.hidden=false;return}
    const body=`Trade account application\n\nContact: ${v('tf1')}\nBusiness: ${v('tf2')}\nABN: ${v('tf3')}\nLicence: ${v('tf4')} (${v('tf5')})\nEmail: ${v('tf6')}\nPhone: ${v('tf7')}\nExpected monthly spend: ${v('tf8')}`;
    $('#mbox').innerHTML=`<span class="status st-ok">Application ready</span><h2 style="margin-top:12px">Thanks, ${esc(v('tf1').split(' ')[0])}</h2><p style="color:var(--muted)">Your account stays inactive until our team checks your ABN and licence and approves it. This prototype has no back office yet, so the application is sent to the Ampwell team by email.</p><a class="btn btn-blue btn-block" target="_blank" rel="noopener" href="mailto:sales@ampwell.com.au?subject=${encodeURIComponent('Trade account application: '+v('tf2'))}&body=${encodeURIComponent(body)}">Email application to Ampwell</a><button class="btn btn-line btn-block" style="margin-top:8px" data-close>Close</button>`};
}
function setAuth(x){AUTH=x;try{x?localStorage.setItem('ampwell:auth',JSON.stringify(x)):localStorage.removeItem('ampwell:auth')}catch(e){}updateLoginBtn();saveQuote();go()}
function updateLoginBtn(){const b=$('#loginBtn');if(!b)return;b.classList.toggle('on',!!AUTH);b.setAttribute('aria-label',AUTH?'Trade account, logged in':'Trade log in');const l=$('#loginLbl');if(l)l.textContent=AUTH?'Account':'Log in'}
function loginInfo(){
  if(AUTH){modal(`<h2>Trade account</h2><dl class="specs" style="margin:10px 0 18px"><dt>Logged in as</dt><dd>${esc(AUTH.email)}</dd><dt>Business</dt><dd>${esc(AUTH.business)}</dd><dt>Status</dt><dd><span class="status st-ok">Approved</span></dd><dt>Price list</dt><dd>Demo trade price list</dd></dl><div style="display:grid;gap:8px"><button class="btn btn-blue" id="lo">Log out</button><button class="btn btn-line" data-close>Close</button></div>`);$('#lo').onclick=()=>{closeModal();setAuth(null);toast('Logged out. Prices are hidden again.')};return}
  modal(`<h2>Trade log in</h2><p style="color:var(--muted);margin:0 0 16px">Log in to see your trade prices, delivery and totals.</p><form id="lf" novalidate><div class="field"><label for="l1">Email</label><input id="l1" type="email" autocomplete="username"></div><div class="field"><label for="l2">Password</label><input id="l2" type="password" autocomplete="current-password"></div><p id="lerr" role="alert" style="color:var(--bad);font-size:14px;margin:0 0 12px" hidden></p><button class="btn btn-blue btn-block" type="submit">Log in</button></form>
   <p class="demo-note" style="margin-top:14px">Prototype: any email and a password of 6 or more characters signs you in to an approved demo trade account. The real site uses verified accounts, admin approval and optional MFA.</p>
   <p style="margin:14px 0 0;font-size:14.5px">No account yet? <button class="link" style="font-size:14.5px" data-act="trade-form" data-kind="account">Apply for a trade account</button></p>`);
  $('#lf').onsubmit=e=>{e.preventDefault();const em=$('#l1').value.trim(),pw=$('#l2').value;const err=$('#lerr');
    if(!/^\S+@\S+\.\S+$/.test(em)||pw.length<6){err.textContent='Check your email and password.';err.hidden=false;return}
    closeModal();setAuth({email:em,business:'Demo Electrical Pty Ltd',approved:true});toast('Logged in. Trade prices are now shown.')};
}

/* ---------- RESOURCES ---------- */
function vResources(){
  const ref=[[1.5,'4 to 6'],[2.5,'4 to 6'],[6,'5 to 8'],[10,'6 to 8'],[16,'6 to 10'],[25,'8 to 10'],[35,'8 to 12'],[50,'8 to 12'],[70,'10 to 12'],[95,'10 to 12'],[120,'12 to 16'],[150,'12 to 16'],[185,'12 to 16'],[240,'12 to 16'],[300,'16 to 20'],[400,'16 to 20'],[630,'16 to 20']];
  const avail=s=>P.filter(p=>p.kind==='lug'&&p.variants.some(v=>v.size===s)).length;
  $('#app').innerHTML=`<section class="navy glow" style="padding:56px 0 50px"><div class="wrap"><h1 class="disp h1" style="font-size:clamp(40px,7vw,86px)">Technical resources.</h1><p class="lede">Selection guides, standards and quick references for the lugs and connectors range.</p></div></section>
  <section class="sec" style="padding-top:44px"><div class="wrap">
  <div class="cards3" style="margin-top:0">
    <div class="lcard"><h3>When to use bi-metal</h3><p>Aluminium cable landing on copper (a busbar, a breaker terminal, an isolator) needs a bi-metal lug. Direct contact between the two metals in the presence of moisture causes galvanic corrosion, which raises resistance and heat at the joint. The friction-welded transition keeps the dissimilar metals apart at the contact face.</p></div>
    <div class="lcard"><h3>Flexible cable needs a bell mouth</h3><p>Fine-stranded flexible conductors are larger in diameter than standard stranded conductors of the same cross-section, and they splay after stripping. Bell-mouth lugs funnel the strands into the barrel so none are left outside the crimp.</p></div>
    <div class="lcard"><h3>Inspection hole or sealed barrel</h3><p>An inspection hole lets you confirm the conductor is fully inserted before crimping. Where moisture or oil ingress matters, choose a sealed barrel (no inspection hole) or a long palm, long barrel lug that is silver-soldered at the palm.</p></div>
  </div>
  <div class="split" style="margin-top:60px"><div><h2 class="disp h3">Conductor size quick reference</h2><p style="color:var(--muted)">Typical stud sizes for each conductor size, and how many Ampwell lug families stock it. Always confirm against the equipment terminal and the manufacturer’s crimp tool and die.</p>
    <div class="tbl-wrap"><table class="t num"><thead><tr><th>Conductor</th><th>Typical stud</th><th>Lug families</th><th></th></tr></thead><tbody>${ref.map(([s,st])=>`<tr><td><b>${s} mm²</b></td><td>M${st.replace(' to ',' to M')}</td><td>${avail(s)}</td><td style="text-align:right"><a class="btn btn-line" style="padding:7px 12px;font-size:13px" href="#products" onclick="CF.size='${s}';CF.cats=new Set(['lugs'])">View</a></td></tr>`).join('')}</tbody></table></div></div>
    <div><h2 class="disp h3">Standards referenced</h2><div class="tbl-wrap"><table class="t"><tbody>${[['IEC 61238-1','Compression and mechanical connectors for power cables, test methods'],['AS/NZS 4325.1','Compression and mechanical connectors for power cables (Australia and New Zealand)'],['DIN 46235','Compression cable lugs for copper conductors'],['DIN 46239','Compression cable lugs for aluminium conductors'],['DIN 46267','Compression connectors (butt splices)'],['DIN 48201','Stranded conductors'],['EN 50483-4','Test requirements for LV aerial bundled cable connectors'],['AS/NZS 3000','Wiring Rules']].map(([a,b])=>`<tr><td><b>${a}</b></td><td style="white-space:normal">${b}</td></tr>`).join('')}</tbody></table></div>
    <div class="ai-card" style="margin-top:22px" id="rq"><span class="ai-tag">${I.bolt} Technical question?</span><p style="color:var(--muted);margin:6px 0 12px;font-size:15px">Amp answers from the Ampwell catalogue and links the matching part numbers.</p><button class="btn btn-blue" data-act="ask">Ask Amp</button></div></div></div>
  </div></section>`;
  if(!AI.sample)$('#rq').hidden=true;
}

/* ---------- ABOUT / CONTACT ---------- */
function vAbout(){
  $('#app').innerHTML=`<section class="navy glow grid-lines" style="padding:56px 0 60px"><div class="wrap"><h1 class="disp h1" style="font-size:clamp(40px,7vw,86px)">Powering a safer tomorrow.</h1><p class="lede">Ampwell makes and sources electrical products for Australian electricians, wholesalers, builders and commercial projects.</p></div></section>
  <section class="sec"><div class="wrap split"><div class="prose"><h2 class="disp h3" style="margin-bottom:10px">Why we exist</h2><p>Most of what goes wrong with an electrical install isn’t dramatic. It’s a lug that doesn’t quite match the terminal, a code on the docket that doesn’t match the box, a spec sheet that can’t be found when the inspector asks. We built Ampwell around those details.</p><p>Every product page shows exactly what has been verified: material, standards, dimensions and the full list of part numbers. Where a range is growing, we say so.</p><p>We sell through the trade, and we design for the people who install our products every day.</p></div>
  <div><div class="stats" style="margin-top:0"><div><b>${TOTAL_SKUS.toLocaleString()}</b><span>part numbers</span></div><div><b>${P.length}</b><span>product families</span></div><div><b>7</b><span>product ranges</span></div><div><b>AU</b><span>trade focused</span></div></div></div></div></section>`;
}
function vContact(){
  $('#app').innerHTML=`<section class="navy glow" style="padding:56px 0 50px"><div class="wrap"><h1 class="disp h1" style="font-size:clamp(40px,7vw,86px)">Contact <span class="brand">Ampwell</span>.</h1><p class="lede">Product questions, trade accounts or project pricing. We reply within one business day.</p></div></section>
  <section class="sec" style="padding-top:44px"><div class="wrap split"><form class="panel" id="cf"><div class="two"><div class="field"><label for="c1">Name</label><input id="c1" required autocomplete="name"></div><div class="field"><label for="c2">Company</label><input id="c2" autocomplete="organization"></div></div><div class="two"><div class="field"><label for="c3">Email</label><input id="c3" type="email" required autocomplete="email"></div><div class="field"><label for="c4">Enquiry type</label><select id="c4"><option>Product question</option><option>Project pricing</option><option>Trade account</option><option>Something else</option></select></div></div><div class="field"><label for="c5">Message</label><textarea id="c5" rows="5" required></textarea></div><button class="btn btn-blue btn-block" type="submit">Send message</button></form>
  <div><div class="lcard"><h3>Sales</h3><p><a href="mailto:sales@ampwell.com.au">sales@ampwell.com.au</a></p></div><div class="lcard" style="margin-top:14px"><h3>Fastest answer</h3><p>For product selection, Amp knows the whole catalogue and can build a quote with you.</p><button class="btn btn-line" style="margin-top:12px" data-act="ask">Ask Amp</button></div></div></div></section>`;
  $('#cf').onsubmit=e=>{e.preventDefault();const b=`${$('#c4').value}\n\nName: ${$('#c1').value}\nCompany: ${$('#c2').value}\nEmail: ${$('#c3').value}\n\n${$('#c5').value}`;modal(`<h2>Ready to send</h2><p style="color:var(--muted)">This preview site doesn’t have a back office connected yet, so your message goes to the Ampwell team by email.</p><a class="btn btn-blue btn-block" target="_blank" rel="noopener" href="mailto:sales@ampwell.com.au?subject=${encodeURIComponent($('#c4').value)}&body=${encodeURIComponent(b)}">Email sales@ampwell.com.au</a><button class="btn btn-line btn-block" style="margin-top:8px" data-close>Close</button>`)};
}


/* ---------- REQUEST A QUOTE ---------- */
function vRequest(){
  $('#app').innerHTML=`<section class="navy glow" style="padding:56px 0 50px"><div class="wrap"><h1 class="disp h1" style="font-size:clamp(40px,7vw,86px)">Request a quote.</h1><p class="lede">Fill in your details. The products you’ve selected are attached to your request, and our team comes back with a priced quotation.</p></div></section>
  <section class="sec" style="padding-top:40px"><div class="wrap split" id="reqwrap">
    <form class="panel" id="reqf" novalidate>
      <h2 style="margin:0 0 6px;font-size:20px">Your details</h2><p id="reqcount" style="margin:0 0 16px;font-size:14px;color:var(--muted)"></p>
      <div class="two"><div class="field"><label for="r1">Name *</label><input id="r1" required autocomplete="name"></div><div class="field"><label for="r2">Company</label><input id="r2" autocomplete="organization"></div></div>
      <div class="two"><div class="field"><label for="r3">Email *</label><input id="r3" type="email" required autocomplete="email"></div><div class="field"><label for="r4">Phone</label><input id="r4" type="tel" autocomplete="tel"></div></div>
      <div class="two"><div class="field"><label for="r5">Project or job name</label><input id="r5"></div><div class="field"><label for="r6">Delivery postcode</label><input id="r6" inputmode="numeric" autocomplete="postal-code"></div></div>
      <div class="field"><label for="r7">Required by</label><input id="r7" type="date"></div>
      <div class="field"><label for="r8">Notes</label><textarea id="r8" rows="4" placeholder="Anything we should know, or products you couldn’t find"></textarea></div>
      <p class="err" id="rerr" role="alert" style="color:var(--bad);font-size:14px;margin:0 0 12px" hidden></p>
      <button class="btn btn-blue btn-block" type="submit">Send quote request</button>
    </form>
    <div class="panel" id="reqitems"></div>
  </div></section>`;
  drawReqItems();
  $('#reqf').onsubmit=e=>{e.preventDefault();
    const err=$('#rerr'),need=[['r1','your name'],['r3','your email']].filter(([id])=>!$('#'+id).value.trim()).map(x=>x[1]);
    if(need.length){err.textContent=`Please add ${need.join(' and ')}.`;err.hidden=false;return}
    if(!/^\S+@\S+\.\S+$/.test($('#r3').value.trim())){err.textContent='Please check your email address.';err.hidden=false;return}
    if(!QUOTE.length&&!$('#r8').value.trim()){err.textContent='Add at least one product, or tell us what you need in the notes.';err.hidden=false;return}
    err.hidden=true;
    const ref='AMP-Q'+Date.now().toString(36).toUpperCase().slice(-6);
    const f=id=>$('#'+id).value.trim();
    const lines=QUOTE.map(i=>{const [p,v]=BYCODE[i.code.toUpperCase()];return `${i.qty} x ${v.code}  ${p.name} (${v.label})`});
    const body=`Quote request ${ref}\n\nName: ${f('r1')}\nCompany: ${f('r2')}\nEmail: ${f('r3')}\nPhone: ${f('r4')}\nProject: ${f('r5')}\nPostcode: ${f('r6')}\nRequired by: ${f('r7')}\n\nProducts:\n${lines.join('\n')||'(none, see notes)'}\n\nNotes:\n${f('r8')}`;
    const t=quoteTotals();
    $('#reqwrap').innerHTML=`<div class="panel"><span class="status st-ok">Request ready</span><h2 class="num" style="margin:12px 0 6px;font-size:26px">${ref}</h2><p style="color:var(--muted);margin:0 0 18px">Quote this reference when you talk to us. ${QUOTE.length} product line${QUOTE.length===1?'':'s'} attached${canPrice()?`, total ${money(t.total)} inc GST and delivery`:''}. This prototype doesn’t have a back office connected yet, so the request is sent to the Ampwell team by email.</p>
      <a class="btn btn-blue btn-block" target="_blank" rel="noopener" href="mailto:sales@ampwell.com.au?subject=${encodeURIComponent('Quote request '+ref)}&body=${encodeURIComponent(body.slice(0,1800))}">Email request to sales</a>
      <button class="btn btn-line btn-block" style="margin-top:8px" id="rcsv">Download product list (CSV)</button>
      <a class="btn btn-line btn-block" style="margin-top:8px" href="#products">Back to products</a></div>
      <div class="panel"><h2 style="margin:0 0 12px;font-size:20px">Attached products</h2>${QUOTE.length?QUOTE.map(i=>{const [p,v]=BYCODE[i.code.toUpperCase()];return `<div class="tot num" style="margin:8px 0"><span>${i.qty} × <b>${esc(v.code)}</b> ${esc(p.name)}</span></div>`}).join(''):'<p style="color:var(--muted)">No products attached. Your notes explain what you need.</p>'}</div>`;
    $('#rcsv').onclick=downloadCSV;window.scrollTo(0,0);
  };
}
function drawReqItems(){
  const el=$('#reqitems');if(!el)return;const t=quoteTotals();
  const rc=$('#reqcount');if(rc)rc.innerHTML=QUOTE.length?`<span class="status st-ok">${QUOTE.length} product line${QUOTE.length===1?'':'s'} attached</span> <a href="#reqitems" onclick="event.preventDefault();document.getElementById('reqitems').scrollIntoView({behavior:'smooth'})" style="margin-left:6px">Review</a>`:'No products attached yet.';
  el.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px"><h2 style="margin:0;font-size:20px">Selected products</h2><span style="color:var(--muted);font-size:14px">${QUOTE.length} line${QUOTE.length===1?'':'s'}</span></div>
  ${QUOTE.length?QUOTE.map((i,ix)=>{const [p,v]=BYCODE[i.code.toUpperCase()];return `<div class="qi"><a class="th" href="#p-${p.id}">${artOf(p,v)}</a><div><b>${esc(p.name)}</b><small class="num">${esc(v.code)}, ${esc(v.label)}</small><div class="ctl"><div class="qty"><button type="button" data-rq="${ix}" data-d="-1" aria-label="Decrease">−</button><input class="num" data-rqi="${ix}" type="number" inputmode="numeric" value="${i.qty}" aria-label="Quantity"><button type="button" data-rq="${ix}" data-d="1" aria-label="Increase">+</button></div><span class="num" style="font-weight:650">${canPrice()?money(v.price*i.qty):''}</span></div><button class="link" data-rrm="${ix}" style="margin-top:6px">Remove</button></div></div>`}).join('')
   +`<div style="margin-top:14px">${totalsHTML()}</div>`
   :`<div class="empty" style="margin-top:14px">No products selected yet. Add products as you browse, or describe what you need in the notes.</div>`}
  <a class="btn btn-line btn-block" style="margin-top:14px" href="#products">Add more products</a>`;
  $$('[data-rq]',el).forEach(b=>b.onclick=()=>{const i=QUOTE[+b.dataset.rq];i.qty=Math.max(1,i.qty+ +b.dataset.d);saveQuote();drawReqItems()});
  $$('[data-rqi]',el).forEach(n=>n.onchange=()=>{QUOTE[+n.dataset.rqi].qty=Math.max(1,Math.round(+n.value||1));saveQuote();drawReqItems()});
  $$('[data-rrm]',el).forEach(b=>b.onclick=()=>{QUOTE.splice(+b.dataset.rrm,1);saveQuote();drawReqItems()});
}

/* ---------- QUOTE DRAWER ---------- */
function renderQuote(){
  const d=$('#qdrawer');const {sub,gst,total}=quoteTotals();
  d.innerHTML=`<header><h2>Your quote</h2><button class="icon-btn" onclick="closeDrawers()" aria-label="Close">${I.x}</button></header>
  <div class="scroll">${QUOTE.length?QUOTE.map((i,ix)=>{const [p,v]=BYCODE[i.code.toUpperCase()];return `<div class="qi"><a class="th" href="#p-${p.id}">${artOf(p,v)}</a><div><b>${esc(p.name)}</b><small class="num">${esc(v.code)}, ${esc(v.label)}</small><div class="ctl"><div class="qty"><button data-q="${ix}" data-d="-1" aria-label="Decrease">−</button><input class="num" data-qi="${ix}" type="number" inputmode="numeric" value="${i.qty}" aria-label="Quantity"><button data-q="${ix}" data-d="1" aria-label="Increase">+</button></div><span class="num" style="font-weight:650">${canPrice()?money(v.price*i.qty):''}</span></div><button class="link" data-rm="${ix}" style="margin-top:6px">Remove</button></div></div>`}).join('')
   +`<div id="qrev" style="margin-top:16px"></div>`:`<div class="empty" style="margin-top:10px"><b style="color:var(--text);display:block;margin-bottom:6px">Your quote is empty</b>Add products as you browse, then request a quote with them attached.<div style="display:grid;gap:8px;margin-top:16px"><a class="btn btn-blue" href="#products" onclick="closeDrawers()">Browse products</a></div></div>`}</div>
  ${QUOTE.length?`<footer>${totalsHTML()}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">${AI.sample?`<button class="btn btn-line btn-sm" id="qreview">${I.bolt.replace('<svg','<svg width="16" height="16"')} Check my quote</button>`:''}<button class="btn btn-line btn-sm" id="qcsv" ${AI.sample?'':'style="grid-column:1/-1"'}>Download CSV</button></div>
  <button class="btn btn-blue btn-block" style="margin-top:8px" id="qsubmit">Request a quote</button></footer>`:''}`;
  $$('[data-q]',d).forEach(b=>b.onclick=()=>{const i=QUOTE[+b.dataset.q];i.qty=Math.max(1,i.qty+ +b.dataset.d);saveQuote()});
  $$('[data-qi]',d).forEach(inp=>inp.onchange=()=>{QUOTE[+inp.dataset.qi].qty=Math.max(1,Math.round(+inp.value||1));saveQuote()});
  $$('[data-rm]',d).forEach(b=>b.onclick=()=>{QUOTE.splice(+b.dataset.rm,1);saveQuote()});
  const r=$('#qreview');if(r)r.onclick=reviewQuote;
  const c=$('#qcsv');if(c)c.onclick=downloadCSV;
  const s=$('#qsubmit');if(s)s.onclick=()=>{closeDrawers();nav('request')};
  $$('a',d).forEach(a=>a.addEventListener('click',()=>{if(a.getAttribute('href')?.startsWith('#'))closeDrawers()}));
}
function quoteCSV(){const pr=canPrice();const rows=[['Ampwell part number','Description','Variant','Qty',...(pr?['Unit price ex GST','Line total ex GST']:[])]];for(const i of QUOTE){const [p,v]=BYCODE[i.code.toUpperCase()];rows.push([v.code,p.name,v.label,i.qty,...(pr?[v.price.toFixed(2),(v.price*i.qty).toFixed(2)]:[])])}const t=quoteTotals();if(pr)rows.push([],['','','','','Subtotal ex GST',t.sub.toFixed(2)],['','','','','Delivery',t.del.toFixed(2)],['','','','','GST',t.gst.toFixed(2)],['','','','','Total inc GST',t.total.toFixed(2)]);return rows.map(r=>r.map(c=>/[",\n]/.test(String(c))?`"${String(c).replace(/"/g,'""')}"`:c).join(',')).join('\n')}
async function downloadCSV(){
  const dl=await AI.downloads;
  if(!dl){modal(`<h2>Quote as CSV</h2><p style="color:var(--muted)">Downloads aren’t available in this view. Copy the table below instead.</p><textarea class="ta" readonly>${esc(quoteCSV())}</textarea><button class="btn btn-line btn-block" style="margin-top:10px" data-close>Close</button>`);return}
  try{await dl.save({filename:`Ampwell-quote-${new Date().toISOString().slice(0,10)}.csv`,data:new Blob([quoteCSV()],{type:'text/csv'})});toast('Quote saved as CSV')}catch(e){if(e&&e.code!=='declined')toast('The download didn’t go through. Try again.')}
}
function submitQuote(){closeModal();nav('request')}
function pickFile(accept,cb){const f=$('#fileIn');f.accept=accept;f.value='';f.onchange=()=>{if(f.files[0])cb(f.files[0])};f.click()}

/* ---------- 3D product viewer + interactive galleries ---------- */
let GAL=null;
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER=matchMedia('(hover: hover)').matches;
const THREE_KINDS=new Set(['gpo2','gpo1','gpousb','wgpo','sw1','sw2','dimmer','usb','data','downlight','rcbo','mcb','iso','spd','pir']);
const FIN={white:{c:0xF2F3F5,r:.42,m:0,cc:.25,bg:['#E6EAF0','#F8F9FB'],name:'Matte white'},black:{c:0x17191E,r:.26,m:.08,cc:.9,bg:['#DCE2EB','#F4F6F9'],name:'Gloss black'},grey:{c:0x8C95A1,r:.3,m:.7,cc:.25,bg:['#D5DBE4','#EEF1F5'],name:'Brushed grey'},wgrey:{c:0xC4CAD2,r:.5,m:0,cc:.1,bg:['#E3E7ED','#F6F7F9'],name:'UV-stable grey'}};
function finishOf(p,v){if(p.realPhoto&&v&&v.color&&FIN[v.color])return v.color;if(p.colorVariants)return v.color==='grey'&&p.art==='wgpo'?'wgrey':v.color;if(p.art==='downlight')return /black/i.test(v.label)?'black':'white';if(p.art==='wgpo')return 'wgrey';return 'white'}
function loadThree(){
  if(window.THREE)return Promise.resolve(window.THREE);
  if(!loadThree.p)loadThree.p=new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=()=>window.THREE?res(window.THREE):rej();s.onerror=()=>{loadThree.p=null;rej()};document.head.appendChild(s);setTimeout(()=>rej(),12000)});
  return loadThree.p;
}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

function mountGallery(el,p,v,onPick){
  if(GAL){GAL.dispose();GAL=null}
  if(p.kind==='core')return photoGallery(el,p,v,onPick);
  return tiltGallery(el,p,v,onPick);
}

/* ---- real product photos: thumbnails, tap to zoom, optional 3D view ---- */
function photoGallery(el,p,v,onPick){
  el.className='gal pgal';
  const has3d=p.model&&THREE_KINDS.has(p.model);
  const keys=[...new Set([...p.imgs,...p.variants.map(x=>x.img).filter(Boolean)])];
  el.innerHTML=`<div class="pg-view"><div class="pg-photo"><div class="zoom" tabindex="0" role="button" aria-label="Zoom into the product photo"><img alt="${esc(p.name)}" draggable="false"></div></div>${has3d?'<div class="pg-3d" hidden></div>':''}</div>
   <div class="pg-bar">${keys.length>1?`<div class="pg-thumbs" role="group" aria-label="Product photos">${keys.map((k,i)=>`<button type="button" class="pg-th" data-k="${k}" aria-label="Photo ${i+1}"><img src="${RIMG(k)}" alt=""></button>`).join('')}</div>`:''}
   ${has3d?`<div class="vbtns pg-tabs" role="group" aria-label="View"><button type="button" data-tab="photo" aria-pressed="true">Photo</button><button type="button" data-tab="3d" aria-pressed="false">3D</button></div>`:''}</div>`;
  const z=$('.zoom',el),img=$('img',z),host=$('.pg-3d',el);
  let cur=null,zoomed=false,v3=null;
  function show(k,anim){if(k===cur)return;cur=k;$$('.pg-th',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===k));
    if(anim&&!REDUCED){img.animate([{opacity:1},{opacity:0}],{duration:120,fill:'forwards'}).onfinish=()=>{img.src=RIMG(k);img.animate([{opacity:0},{opacity:1}],{duration:220,fill:'forwards'})}}else img.src=RIMG(k)}
  const pan=e=>{if(!zoomed)return;const r=z.getBoundingClientRect();img.style.transformOrigin=`${((e.clientX-r.left)/r.width*100).toFixed(1)}% ${((e.clientY-r.top)/r.height*100).toFixed(1)}%`};
  const toggle=e=>{zoomed=!zoomed;z.classList.toggle('on',zoomed);if(e&&e.clientX)pan(e)};
  z.addEventListener('click',toggle);z.addEventListener('pointermove',pan);z.addEventListener('pointerleave',()=>{if(zoomed)toggle()});
  z.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  $$('.pg-th',el).forEach(b=>b.onclick=()=>{tab('photo');show(b.dataset.k,true)});
  function tab(t){$$('[data-tab]',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.tab===t));
    if(!host)return;host.hidden=t!=='3d';$('.pg-photo',el).hidden=t==='3d';
    if(t==='3d'&&!v3){const sh=Object.assign(Object.create(p),{art:p.model,colorVariants:false,realPhoto:true});const box=document.createElement('div');host.appendChild(box);v3=viewer3D(box,sh,v,onPick)}}
  $$('[data-tab]',el).forEach(b=>b.onclick=()=>tab(b.dataset.tab));
  function set(nv,first){v=nv;show(v.img||(cur&&!p.variants.some(x=>x.img===cur&&x!==v)?cur:p.imgs[0]),!first);if(v3)v3.set(v)}
  set(v,true);
  return (GAL={set,dispose(){if(v3)v3.dispose()}});
}

/* ---- photo / drawing gallery with 3D tilt, light sheen and size morph ---- */
function tiltGallery(el,p,v,onPick){
  const isLug=p.kind==='lug';
  el.className='gal glug';
  const src=isLug?p.img:null;
  el.innerHTML=`<div class="tilt"><div class="tilt-in">${isLug?`<img src="${src}" alt="${esc(p.name)}" draggable="false"><span class="sheen" style="--m:url('${src}')"></span>`:illus(p.art,v.color||'white')}</div></div>
   <div class="gfloor"></div>${isLug?'<span class="size-pop num" aria-live="polite"></span>':''}<span class="g-hint">${HOVER?'Move over the product to tilt it':'Drag to tilt'}</span>
   <span class="src">${isLug?`Product photo from the Ampwell lugs and connectors catalogue, p.${p.page}`:'Illustrative render'}</span>`;
  const tilt=$('.tilt',el),inn=$('.tilt-in',el),hint=$('.g-hint',el),pop=$('.size-pop',el);
  let down=false;
  const move=e=>{if(!HOVER&&!down)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    tilt.style.transition='transform .12s ease-out';tilt.style.transform=`rotateX(${(-y*26).toFixed(2)}deg) rotateY(${(x*34).toFixed(2)}deg)`;
    el.style.setProperty('--sx',(x+.5)*100+'%');el.style.setProperty('--sy',(y+.5)*100+'%');hint.style.opacity=0};
  const reset=()=>{down=false;tilt.style.transition='transform .8s cubic-bezier(.2,.8,.2,1)';tilt.style.transform=''};
  el.onpointermove=move;el.onpointerleave=reset;el.onpointerdown=e=>{down=true;move(e)};el.onpointerup=()=>{if(!HOVER)reset()};el.onpointercancel=reset;
  const lmin=Math.log(1.5),lmax=Math.log(1000);
  function set(nv,first){
    v=nv;
    if(isLug){const s=Math.max(...[v.size,v.size2||0].filter(Boolean));const k=.66+.4*Math.min(1,Math.max(0,(Math.log(s)-lmin)/(lmax-lmin)));
      inn.style.setProperty('--scale',k.toFixed(3));
      if(pop){pop.textContent=v.label.replace(/, .*$/,'');pop.classList.remove('go');void pop.offsetWidth;pop.classList.add('go')}
      if(!first&&!REDUCED){tilt.animate([{transform:'rotateY(0deg)'},{transform:'rotateY(-22deg) rotateX(6deg)'},{transform:'rotateY(0deg)'}],{duration:700,easing:'cubic-bezier(.3,.7,.3,1)'})}}
    else if(p.colorVariants){inn.innerHTML=illus(p.art,v.color);if(!first&&!REDUCED)inn.firstElementChild.animate([{transform:'rotateY(90deg)',opacity:.3},{transform:'rotateY(0)',opacity:1}],{duration:520,easing:'cubic-bezier(.2,.8,.2,1)'})}
  }
  set(v,true);
  return {set,dispose(){}};
}

/* ---- real-time 3D (three.js r128) ---- */
function viewer3D(el,p,v,onPick){
  el.className='gal g3';
  const fin0=finishOf(p,v);
  el.style.setProperty('--g1',FIN[fin0].bg[0]);el.style.setProperty('--g2',FIN[fin0].bg[1]);
  const hints={wgpo:'Drag to rotate. Tap the lid to open it.',downlight:'Drag to rotate. Tap the light to switch it on.',dimmer:'Drag to rotate. Tap the knob to dim.',pir:'Drag to rotate. Tap the sensor.',data:'Drag to rotate.',usb:'Drag to rotate.'};
  const hintTxt=hints[p.art]||(['rcbo','mcb','iso','spd'].includes(p.art)?'Drag to rotate. Tap the toggle.':'Drag to rotate. Tap a switch to flick it.');
  el.innerHTML=`<div class="g3-fallback">${illus(p.art,v.color||'white')}</div><canvas aria-label="Interactive 3D model of ${esc(p.name)}. Drag to rotate." role="img"></canvas>
   <span class="g-chip"><b>3D</b> <span id="g3fin">${esc(FIN[fin0].name)}</span></span><span class="g-hint">${esc(hintTxt)}</span><span class="g-depth" hidden></span>
   <div class="gtools"><div class="vbtns" role="group" aria-label="Camera view">${['Front','Angle','Side'].map((n,i)=>`<button type="button" data-view="${n}" aria-pressed="${i===1}">${n}</button>`).join('')}</div>
   ${p.colorVariants?`<div class="swat" role="group" aria-label="Finish">${p.variants.map(x=>`<button type="button" data-code="${esc(x.code)}" aria-label="${esc(x.label)}" aria-pressed="${x===v}" style="--sw:${COLORS[x.color]}"></button>`).join('')}</div>`:''}</div>
   <span class="g3-load">Loading 3D view</span>`;
  const canvas=$('canvas',el),hint=$('.g-hint',el),depthEl=$('.g-depth',el);
  let disposed=false,api={set(nv){v=nv;syncSw()},dispose(){disposed=true}};
  function syncSw(){$$('.swat button',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.code===v.code))}
  $$('.swat button',el).forEach(b=>b.onclick=()=>{const hit=BYCODE[b.dataset.code.toUpperCase()];if(hit)onPick(hit[1])});
  loadThree().then(T=>{if(disposed)return;start(T)}).catch(()=>{el.classList.add('g3-off');$('.g3-load',el).remove();$('.gtools',el).remove();$('.g-chip',el).remove();hint.remove()});

  function start(T){
    let renderer;
    try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'})}catch(e){el.classList.add('g3-off');return}
    $('.g3-load',el)?.remove();el.classList.add('g3-on');
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
    renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
    const scene=new T.Scene();
    const camera=new T.PerspectiveCamera(30,1,1,4000);
    const pm=new T.PMREMGenerator(renderer);const env=new T.Scene();
    env.add(new T.Mesh(new T.BoxGeometry(400,400,400),new T.MeshBasicMaterial({color:0x6b7380,side:T.BackSide})));
    const panel=(w,h,x,y,z,rx,ry,c)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(c,c,c*1.04),side:T.DoubleSide}));m.position.set(x,y,z);m.rotation.set(rx,ry,0);env.add(m)};
    panel(220,90,0,190,40,Math.PI/2,0,5.5);panel(90,200,-190,40,60,0,Math.PI/2,2.6);panel(70,160,190,20,-20,0,-Math.PI/2,1.6);panel(240,40,0,-60,190,0,0,1.3);
    scene.environment=pm.fromScene(env,.035).texture;
    const key=new T.DirectionalLight(0xffffff,1.25);key.position.set(90,140,160);scene.add(key);
    const rim=new T.DirectionalLight(0xbcd2ff,.55);rim.position.set(-160,40,-120);scene.add(rim);
    scene.add(new T.HemisphereLight(0xffffff,0x9aa3b2,.35));

    const root=new T.Group();scene.add(root);
    const model=buildModel(T,p,v);root.add(model.G);
    const box=new T.Box3().setFromObject(model.G);const sz=new T.Vector3();box.getSize(sz);const ctr=new T.Vector3();box.getCenter(ctr);model.G.position.sub(ctr);
    const maxDim=Math.max(sz.x,sz.y,sz.z*.6);
    const cv=document.createElement('canvas');cv.width=cv.height=128;const cx=cv.getContext('2d');const gr=cx.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(15,23,42,.55)');gr.addColorStop(1,'rgba(15,23,42,0)');cx.fillStyle=gr;cx.fillRect(0,0,128,128);
    const shadow=new T.Mesh(new T.PlaneGeometry(sz.x*1.3,Math.max(sz.z,30)*1.6),new T.MeshBasicMaterial({map:new T.CanvasTexture(cv),transparent:true,depthWrite:false,opacity:.55}));
    shadow.rotation.x=-Math.PI/2;shadow.position.y=-sz.y/2-14;scene.add(shadow);

    let tw=null;
    function targetsFor(f){const F=FIN[f];return model.tint.map(([m,k])=>({m,c:new T.Color(F.c).convertSRGBToLinear().multiplyScalar(k),r:F.r,mt:F.m,cc:F.cc}))}
    targetsFor(fin0).forEach(t=>{t.m.color.copy(t.c);t.m.roughness=t.r;t.m.metalness=t.mt;if('clearcoat'in t.m)t.m.clearcoat=t.cc});

    const VIEWS={Front:[0,0],Angle:[-.62,.2],Side:[-1.5,.04]};
    let yaw=VIEWS.Angle[0],pitch=VIEWS.Angle[1],vy=0,vp=0,tYaw=null,tPitch=null,dragging=false,last={x:0,y:0},moved=0,idleAt=performance.now(),spin=null;
    function fit(){const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();const d=maxDim/(.536*.62*Math.min(1,camera.aspect));camera.position.set(0,sz.y*.06,d);camera.lookAt(0,0,0)}
    const ro=new ResizeObserver(fit);ro.observe(el);fit();
    function setView(n){[tYaw,tPitch]=VIEWS[n];$$('[data-view]',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===n));
      if(n==='Side'&&model.depthText){depthEl.textContent=model.depthText;depthEl.hidden=false}else depthEl.hidden=true;idleAt=performance.now()+4000}
    $$('[data-view]',el).forEach(b=>b.onclick=()=>setView(b.dataset.view));
    const ray=new T.Raycaster(),ndc=new T.Vector2();
    canvas.addEventListener('pointerdown',e=>{dragging=true;moved=0;last={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);tYaw=tPitch=null;hint.style.opacity=0});
    canvas.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-last.x,dy=e.clientY-last.y;moved+=Math.abs(dx)+Math.abs(dy);last={x:e.clientX,y:e.clientY};vy=dx*.0105;vp=dy*.007;yaw+=vy;pitch=Math.max(-.6,Math.min(.75,pitch+vp));idleAt=performance.now()});
    const up=e=>{if(!dragging)return;dragging=false;idleAt=performance.now();
      if(moved<6){const r=canvas.getBoundingClientRect();ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,camera);
        const hit=ray.intersectObjects(model.G.children,true).find(h=>{let o=h.object;while(o&&!o.userData.toggle)o=o.parent;return o});
        if(hit){let o=hit.object;while(!o.userData.toggle)o=o.parent;const t=o.userData.toggle;t.set(!t.on);canvas.style.cursor='pointer'}}};
    canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
    canvas.addEventListener('pointermove',e=>{if(dragging||!HOVER)return;const r=canvas.getBoundingClientRect();ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,camera);const h=ray.intersectObjects(model.G.children,true).some(h=>{let o=h.object;while(o&&!o.userData.toggle)o=o.parent;return o});canvas.style.cursor=h?'pointer':'grab'});

    api.set=nv=>{const prevLabel=v.label;v=nv;syncSw();const f=finishOf(p,v);$('#g3fin',el).textContent=FIN[f].name;
      el.style.setProperty('--g1',FIN[f].bg[0]);el.style.setProperty('--g2',FIN[f].bg[1]);
      if(model.label)model.label(v);
      tw={t0:performance.now(),dur:REDUCED?200:1000,from:model.tint.map(([m])=>({c:m.color.clone(),r:m.roughness,mt:m.metalness,cc:m.clearcoat||0})),to:targetsFor(f)};
      if(!REDUCED&&prevLabel!==v.label)spin={t0:performance.now(),dur:1100,base:yaw};};
    api.dispose=()=>{disposed=true;ro.disconnect();renderer.dispose();try{renderer.forceContextLoss()}catch(e){}scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){[].concat(o.material).forEach(m=>{m.map&&m.map.dispose();m.dispose()})}})};

    let prev=performance.now();
    (function loop(now){
      if(disposed)return;requestAnimationFrame(loop);
      const dt=Math.min(.05,(now-prev)/1000);prev=now;
      if(!dragging){
        if(tYaw!==null){yaw+=(tYaw-yaw)*Math.min(1,dt*6);pitch+=(tPitch-pitch)*Math.min(1,dt*6);if(Math.abs(tYaw-yaw)<.002)tYaw=null}
        else{yaw+=vy;pitch=Math.max(-.6,Math.min(.75,pitch+vp));vy*=.92;vp*=.9}
      }
      let sway=0;if(!dragging&&!REDUCED&&now-idleAt>2500&&tYaw===null){sway=Math.sin((now-idleAt-2500)/1600)*.16*Math.min(1,(now-idleAt-2500)/1500)}
      let spinOff=0;if(spin){const k=Math.min(1,(now-spin.t0)/spin.dur);spinOff=ease(k)*Math.PI*2;if(k>=1){spin=null;spinOff=0}}
      root.rotation.y=yaw+sway+spinOff;root.rotation.x=pitch;
      if(tw){const k=Math.min(1,(now-tw.t0)/tw.dur);const e=ease(Math.max(0,Math.min(1,(k-.15)/.6)));
        tw.to.forEach((t,i)=>{const f=tw.from[i];t.m.color.copy(f.c).lerp(t.c,e);t.m.roughness=f.r+(t.r-f.r)*e;t.m.metalness=f.mt+(t.mt-f.mt)*e;if('clearcoat'in t.m)t.m.clearcoat=f.cc+(t.cc-f.cc)*e});if(k>=1)tw=null}
      model.tick(dt,now);
      renderer.render(scene,camera);
    })(prev);
  }
  return api;
}

function buildModel(T,p,v){
  const k=p.art,G=new T.Group(),tint=[],tickers=[];let depthText='',label=null;
  const phys=o=>new T.MeshPhysicalMaterial(o);
  const body=phys({color:0xffffff,roughness:.42,clearcoat:.25,clearcoatRoughness:.4});
  const recess=phys({color:0xffffff,roughness:.6});
  const rock=phys({color:0xffffff,roughness:.3,clearcoat:.6,clearcoatRoughness:.2});
  tint.push([body,1],[recess,.9],[rock,1.03]);
  const dark=new T.MeshStandardMaterial({color:0x121418,roughness:.65});const hole=new T.MeshBasicMaterial({color:0x07080a});
  const metal=new T.MeshStandardMaterial({color:0xb8bfc8,metalness:.85,roughness:.28});
  const fixedWhite=phys({color:new T.Color(0xF4F5F7).convertSRGBToLinear(),roughness:.5,clearcoat:.15});
  const M=(g,m)=>new T.Mesh(g,m);
  const rr=(w,h,r)=>{const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s};
  const rbox=(w,h,d,r,b)=>{b=Math.max(.05,Math.min(b,d/2-.02,r-.02,w/4,h/4));const g=new T.ExtrudeGeometry(rr(w-2*b,h-2*b,Math.max(.05,r-b)),{depth:Math.max(.04,d-2*b),bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:4,curveSegments:10});g.center();return g};
  const toggleOf=(obj,set,on)=>{const t={on,set(x){this.on=x;set(x)}};obj.userData.toggle=t;set(on);return t};
  function led(x,y,z,col=0x3b82f6){const m=new T.MeshStandardMaterial({color:0x0b1220,emissive:col,emissiveIntensity:0});m.userData.ti=0;const s=M(new T.SphereGeometry(1.4,18,12),m);s.scale.z=.5;s.position.set(x,y,z);G.add(s);tickers.push(dt=>{m.emissiveIntensity+=(m.userData.ti-m.emissiveIntensity)*Math.min(1,dt*10)});return m}
  function rocker(x,y,z,w,h,ledMat,on){const piv=new T.Group();piv.position.set(x,y,z);const r=M(rbox(w,h,3.4,Math.min(w,h)*.24,1),rock);r.position.z=1.4;piv.add(r);G.add(piv);
    tickers.push(dt=>{piv.rotation.x+=(piv.userData.tx-piv.rotation.x)*Math.min(1,dt*14)});
    return toggleOf(piv,o=>{piv.userData.tx=o?-.14:.14;if(ledMat)ledMat.userData.ti=o?2.8:0},on)}
  function socket(x,y,z){const rc=M(new T.CylinderGeometry(14,14,.8,48),recess);rc.rotation.x=Math.PI/2;rc.position.set(x,y,z+.1);G.add(rc);
    const sl=(dx,dy,r)=>{const s=M(new T.BoxGeometry(2.3,7.8,1.4),hole);s.position.set(x+dx,y+dy,z+.6);s.rotation.z=r;G.add(s)};sl(-5.7,3.2,-.52);sl(5.7,3.2,.52);sl(0,-5.4,0)}
  function usbA(x,y,z){const o=M(rbox(13,5.4,1.8,1,.3),dark);o.position.set(x,y,z+.5);G.add(o);const t=M(new T.BoxGeometry(10.4,1.6,.6),metal);t.position.set(x,y+.9,z+1.3);G.add(t)}
  function usbC(x,y,z){const o=M(rbox(9.6,3.7,1.8,1.8,.3),dark);o.position.set(x,y,z+.5);G.add(o);const t=M(new T.BoxGeometry(6.4,.7,.5),metal);t.position.set(x,y,z+1.4);G.add(t)}
  const PL=new Set(['gpo2','gpo1','gpousb','wgpo','sw1','sw2','dimmer','usb','data']);
  if(PL.has(k)){
    const wide=k==='gpo2'||k==='gpousb';let W=wide?116:74,H=wide?74:116,D=7;if(k==='wgpo'){W=86;H=126;D=12}
    G.add(M(rbox(W,H,D,9,1.9),body));
    const z=D/2;const inner=M(rbox(W-10,H-10,.8,6,.3),body);inner.position.z=z+.2;G.add(inner);
    const zf=z+.6;
    if(wide){const l1=led(-15,23,zf+.4),l2=led(43,23,zf+.4);rocker(-29,23,zf,13,7.6,l1,true);rocker(29,23,zf,13,7.6,l2,false);socket(-29,-7,zf);socket(29,-7,zf);
      if(k==='gpousb'){usbA(0,4,zf);usbC(0,-8,zf);led(0,-19,zf+.4,0x22c55e).userData.ti=2.2}}
    else if(k==='gpo1'||k==='wgpo'){const l=led(12,34,zf+.4);rocker(0,34,zf,13,7.6,l,true);socket(0,-2,zf);
      if(k==='wgpo'){const hinge=new T.Group();hinge.position.set(0,H/2-7,z+1);G.add(hinge);
        const lidMat=phys({color:new T.Color(0xdfe5ec).convertSRGBToLinear(),roughness:.08,transparent:true,opacity:.42,clearcoat:1,depthWrite:false});
        const lid=M(rbox(W-8,H-16,9,8,1.6),lidMat);lid.position.set(0,-(H-16)/2,5);hinge.add(lid);
        tickers.push(dt=>{hinge.rotation.x+=(hinge.userData.tx-hinge.rotation.x)*Math.min(1,dt*6)});
        toggleOf(hinge,o=>{hinge.userData.tx=o?-1.25:0},false)}}
    else if(k==='sw1'){const l=led(0,-47,zf+.4);rocker(0,2,zf,40,66,l,false)}
    else if(k==='sw2'){const a=led(-10.5,-47,zf+.4),b=led(10.5,-47,zf+.4);rocker(-10.5,2,zf,19.5,66,a,true);rocker(10.5,2,zf,19.5,66,b,false)}
    else if(k==='dimmer'){const kn=new T.Group();kn.position.set(0,4,zf);G.add(kn);const c=M(new T.CylinderGeometry(15,16,9,64),rock);c.rotation.x=Math.PI/2;c.position.z=4.5;kn.add(c);
      const cap=M(new T.CylinderGeometry(13.5,13.5,.6,64),recess);cap.rotation.x=Math.PI/2;cap.position.z=9.2;kn.add(cap);
      const ind=new T.MeshStandardMaterial({color:0x1d4ed8,emissive:0x3b82f6,emissiveIntensity:1.6});const mk=M(new T.BoxGeometry(1.8,7,1),ind);mk.position.set(0,8,9.6);kn.add(mk);
      kn.userData.tz=-.6;tickers.push(dt=>{kn.rotation.z+=(kn.userData.tz-kn.rotation.z)*Math.min(1,dt*7)});
      let lvl=1;toggleOf(kn,()=>{lvl=(lvl+1)%5;kn.userData.tz=-.6-lvl*.95;ind.emissiveIntensity=.4+lvl*.5},false)}
    else if(k==='usb'){usbA(0,14,zf);usbC(0,-4,zf);led(0,-30,zf+.4,0x22c55e).userData.ti=2.2}
    else if(k==='data'){const j=M(rbox(16,14,2.4,1.6,.4),dark);j.position.set(0,6,zf+.6);G.add(j);
      const gold=new T.MeshStandardMaterial({color:0xd4af37,metalness:1,roughness:.3});for(let i=0;i<8;i++){const c=M(new T.BoxGeometry(.7,3,.4),gold);c.position.set(-5.25+i*1.5,9,zf+2);G.add(c)}
      const tab=M(new T.BoxGeometry(6,2.2,.6),dark);tab.position.set(0,-2.6,zf+1.6);G.add(tab)}
    depthText=k==='wgpo'?`${D} mm deep, IP56 hinged lid`:`Sits ${D} mm off the wall`;
  }else if(k==='downlight'){
    const flange=M(new T.CylinderGeometry(52,52,2.4,96),body);flange.rotation.x=Math.PI/2;G.add(flange);
    const lip=M(new T.TorusGeometry(48.5,2.6,24,120),body);lip.position.z=1;G.add(lip);
    const refl=M(new T.CylinderGeometry(42,27,17,96,1,true),phys({color:0xffffff,metalness:.95,roughness:.16,side:T.DoubleSide}));refl.rotation.x=Math.PI/2;refl.position.z=-7.5;G.add(refl);
    const lensM=new T.MeshStandardMaterial({color:0xfff6e4,emissive:0xfff0d2,emissiveIntensity:1.8});const lens=M(new T.CircleGeometry(27.5,96),lensM);lens.position.z=-15.8;G.add(lens);
    const sink=M(new T.CylinderGeometry(30,30,26,48),new T.MeshStandardMaterial({color:0x3a404a,metalness:.7,roughness:.4}));sink.rotation.x=Math.PI/2;sink.position.z=-30;G.add(sink);
    for(let i=0;i<14;i++){const f=M(new T.BoxGeometry(2,12,24),metal);const a=i/14*Math.PI*2;f.position.set(Math.cos(a)*33,Math.sin(a)*33,-30);f.rotation.z=a+Math.PI/2;G.add(f)}
    const glow=new T.PointLight(0xfff1d6,0,180);glow.position.set(0,0,10);G.add(glow);
    lensM.userData.ti=1.8;tickers.push(dt=>{lensM.emissiveIntensity+=(lensM.userData.ti-lensM.emissiveIntensity)*Math.min(1,dt*8);glow.intensity=lensM.emissiveIntensity*.5});
    toggleOf(lens,o=>{lensM.userData.ti=o?1.8:.04},true);
    depthText='90 mm cut-out, low-profile body';
  }else if(['rcbo','mcb','iso','spd'].includes(k)){
    const mods=k==='iso'?2:1,W=17.6*mods;
    G.add(M(rbox(W,90,44,2.4,.9),fixedWhite));
    const front=M(rbox(W,46,18,2.4,.9),fixedWhite);front.position.z=29;G.add(front);
    for(const y of[36,-36]){const win=M(new T.BoxGeometry(W-4,8,1),dark);win.position.set(0,y,22.2);G.add(win);for(let i=0;i<mods;i++){const s=M(new T.CylinderGeometry(2.6,2.6,1.2,20),metal);s.rotation.x=Math.PI/2;s.position.set(-W/2+8.8+i*17.6,y,22.6);G.add(s)}}
    const piv=new T.Group();piv.position.set(0,6,38);G.add(piv);
    const lev=M(rbox(W*.62,18,10,2,.7),k==='iso'?phys({color:new T.Color(0xc8352e).convertSRGBToLinear(),roughness:.35,clearcoat:.6}):phys({color:0x16181d,roughness:.4,clearcoat:.4}));lev.position.set(0,0,5);piv.add(lev);
    tickers.push(dt=>{piv.rotation.x+=(piv.userData.tx-piv.rotation.x)*Math.min(1,dt*14)});
    const stat=new T.MeshStandardMaterial({color:0x0b1220,emissive:0x22c55e,emissiveIntensity:0});
    const sw=M(new T.BoxGeometry(W*.5,3,.6),stat);sw.position.set(0,19,38.2);G.add(sw);
    toggleOf(piv,o=>{piv.userData.tx=o?-.42:.42;stat.emissiveIntensity=o?2:0},true);
    if(k==='rcbo'){const b=M(new T.CylinderGeometry(3,3,2.4,24),phys({color:new T.Color(0x2563eb).convertSRGBToLinear(),roughness:.3,clearcoat:.8}));b.rotation.x=Math.PI/2;b.position.set(0,-28,23);G.add(b)}
    const cv=document.createElement('canvas');cv.width=256;cv.height=Math.round(256*14/(W-3));const tex=new T.CanvasTexture(cv);tex.encoding=T.sRGBEncoding;tex.anisotropy=4;
    const lab=M(new T.PlaneGeometry(W-3,14),new T.MeshBasicMaterial({map:tex,transparent:true}));lab.position.set(0,-12,38.05);G.add(lab);
    const flash=new T.MeshBasicMaterial({color:0x3b82f6,transparent:true,opacity:0});const fl=M(new T.PlaneGeometry(W-1,16),flash);fl.position.set(0,-12,38.1);G.add(fl);let fT=0;
    tickers.push(dt=>{if(fT>0){fT=Math.max(0,fT-dt*1.6);flash.opacity=fT*.55}});
    label=nv=>{const c=cv.getContext('2d');c.clearRect(0,0,cv.width,cv.height);c.fillStyle='#1C2028';c.textAlign='center';c.textBaseline='middle';
      const r=nv.label.replace(/\s/g,'');const main=k==='rcbo'?`C${r.replace('A','')}`:k==='mcb'?`C${r.replace('A','')}`:k==='iso'?r:'40kA';
      c.font=`800 ${Math.round(cv.height*.5)}px Archivo, Arial, sans-serif`;c.fillText(main,cv.width/2,cv.height*.4);
      c.font=`600 ${Math.round(cv.height*.2)}px Archivo, Arial, sans-serif`;c.fillText(k==='rcbo'?'30 mA  6 kA':k==='spd'?'TYPE 2':'6 kA  Ampwell',cv.width/2,cv.height*.8);tex.needsUpdate=true;fT=1};
    label(v);fT=0;
    depthText=`${mods} module${mods>1?'s':''} wide, 35 mm DIN rail`;
  }else if(k==='pir'){
    const base=M(new T.CylinderGeometry(42,44,9,96),body);base.rotation.x=Math.PI/2;G.add(base);
    const dome=M(new T.SphereGeometry(31,22,11,0,Math.PI*2,0,Math.PI/2),phys({color:0xffffff,roughness:.18,clearcoat:.8,flatShading:true}));dome.rotation.x=Math.PI/2;dome.position.z=4.5;G.add(dome);tint.push([dome.material,1]);
    const l=led(0,-36,5,0xef4444);
    const ringM=new T.MeshBasicMaterial({color:0x3b82f6,transparent:true,opacity:0,depthWrite:false});const ring=M(new T.TorusGeometry(34,1.2,10,96),ringM);ring.position.z=5;G.add(ring);let pt=-1;
    tickers.push(dt=>{if(pt>=0){pt+=dt*.9;ring.scale.setScalar(1+pt*1.6);ringM.opacity=Math.max(0,.8*(1-pt));if(pt>=1){pt=-1;ringM.opacity=0;l.userData.ti=0}}});
    let armed=false;toggleOf(dome,()=>{if(!armed){armed=true;return}pt=0;ring.scale.setScalar(1);l.userData.ti=3},false);
    depthText='360° coverage, 6 m range';
  }
  return {G,tint,label,depthText,tick:(dt,now)=>tickers.forEach(f=>f(dt,now))};
}

/* ---- product cards: live swatches + hover tilt ---- */
document.addEventListener('click',e=>{
  const b=e.target.closest('.sw[data-sw]');if(!b)return;e.preventDefault();
  const p=BYID[b.dataset.sw],hit=BYCODE[b.dataset.c.toUpperCase()];if(!p||!hit)return;
  const card=b.closest('.pc'),stage=$('.stage',card);
  $$('.sw',card).forEach(x=>x.setAttribute('aria-pressed',x===b));
  const im=stage.querySelector('img'),src=imgOf(p,hit[1]);
  if(im&&im.getAttribute('src')!==src){im.src=src;if(!REDUCED)im.animate([{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'})}
  stage.href=`#p-${p.id}`;stage.dataset.sel=hit[1].code;
});
document.addEventListener('click',e=>{const s=e.target.closest('.pc .stage[data-sel]');if(s)PENDING_SEL=s.dataset.sel},true);
if(HOVER&&!REDUCED){
  document.addEventListener('pointermove',e=>{
    const s=e.target.closest('.pc .stage,.hero-art');
    $$('.tilting').forEach(x=>{if(x!==s){x.classList.remove('tilting');const a=x.querySelector('img,svg');if(a)a.style.transform=''}});
    if(!s)return;const a=s.querySelector('img,svg');if(!a)return;
    const r=s.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    s.classList.add('tilting');
    const base=s.classList.contains('hero-art')?' rotate(-8deg)':'';
    a.style.transform=`perspective(700px) rotateX(${(-y*16).toFixed(1)}deg) rotateY(${(x*22).toFixed(1)}deg) translateZ(14px)${base}`;
  },{passive:true});
}

/* ---------- AI runtime (lights up only where the viewer provides it) ---------- */
const AI={sample:null,images:false,tools:false,downloads:Promise.resolve(null)};
const ERR={not_granted:'Amp needs your permission to use Claude. Allow it in the artifact’s permissions to use AI features.',rate_limited:'Amp is busy right now. Try again in a minute.',session_expired:'Your session has expired. Sign in again to use Amp.',refused:'Amp can’t help with that request. Try rephrasing it.',empty_completion:'Amp didn’t come back with an answer. Try asking more simply.',invalid_json:'Amp’s answer couldn’t be read. Try again.',image_rejected:'That image couldn’t be used. Try a JPG or PNG under 5 MB.',prompt_too_large:'That’s too much to send at once. Try a shorter schedule.'};
const errText=e=>ERR[e&&e.code]||(AI.preview?'Amp couldn’t connect from here. The AI features run inside Claude and on the published site.':'Something interrupted Amp. Try again.');
function aiOff(e){if(e&&['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(e.code)){AI.sample=null;document.documentElement.classList.remove('ai')}}
const thinking='<span class="thinking"><i></i><i></i><i></i> Thinking</span>';

function catIndex(){
  return P.map(p=>{
    if(p.kind==='lug'){const st=[...new Set(p.variants.map(v=>v.stud).filter(Boolean))].sort((a,b)=>a-b);
      return `${p.id} | ${p.fam} ${p.name} | ${SUBS[p.sub]} | ${sizeRange(p)}${st.length?` | holes ${st.join('/')} mm`:''} | e.g. ${p.variants.slice(0,2).map(v=>v.code).join(', ')}`}
    return `${p.id} | ${p.name} | ${catName(p.cats[0])} | variants: ${p.variants.map(v=>v.code+' ('+v.label+')').join(', ')}`}).join('\n');
}
function resolveLine(fid,size,stud,size2,code){
  if(code&&findCode(code))return findCode(code);
  const p=BYID[fid];if(!p)return null;
  let vs=p.variants;
  if(size!=null){const s=+size;vs=vs.filter(v=>(p.id==='mcl'||p.id==='mc')?(v.size<=s&&s<=v.size2):v.size===s);if(size2!=null){const f2=vs.filter(v=>v.size2===+size2);if(f2.length)vs=f2}}
  if(!vs.length)return null;
  if(stud!=null){const f=vs.filter(v=>v.stud===+stud);if(f.length)vs=f}
  return [p,vs[0]];
}
const RULES=`You are Amp, the product assistant for Ampwell, an Australian electrical products brand that sells through the trade (electricians, wholesalers, builders). Use Australian English. Be brief and practical: short paragraphs or a few bullet points, no headings.
Rules:
- Only recommend Ampwell part numbers that appear in the catalogue index or in tool results. Never invent a part number. If the range has no fit, say so plainly and suggest the closest option.
- Aluminium conductors onto copper terminals or busbars need bi-metal lugs. Fine-stranded flexible copper suits bell-mouth lugs. Breaker tunnels suit pin or MCCB lugs.
- Use Ampwell part numbers only (format AW-LC-0412), written exactly as given, so the site can turn them into buttons. Never mention supplier or manufacturer codes.
- Prices are only for approved trade customers who are logged in. Only mention a price if a tool result includes one.
- Remind users to confirm against the equipment terminal, crimp tool and die, and AS/NZS 3000 when it matters for safety. Don't give advice that replaces a licensed electrician's judgement.
- Use the search_catalogue and get_product tools to check sizes. Use add_to_quote only when the user asks you to add something.

Ampwell catalogue index (id | name | group | size range | holes | example codes):
`;
const TOOLS=()=>[
 {name:'search_catalogue',description:'Search the Ampwell catalogue with a plain-English job description and/or a part code. Returns up to 6 product families with the best matching part number for the size and stud given. Use it to check what exists before recommending.',
  inputSchema:{type:'object',properties:{query:{type:'string',description:'e.g. "240mm2 aluminium to copper busbar M12" or "SC95"'}},required:['query']},
  execute:({query})=>{toolNote('Searching the catalogue');return smartSearch(String(query||''),6).map(({p,v,studMiss})=>({id:p.id,name:p.name,group:p.kind==='lug'?SUBS[p.sub]:catName(p.cats[0]),best_match:v?{code:v.code,label:v.label,...(canPrice()?{price_ex_gst:v.price}:{}),stud_not_exact:!!studMiss}:null,size_range:sizeRange(p)||undefined}))}},
 {name:'get_product',description:'Get one product family by id: specs and every part number with its size, hole and indicative price. Use before answering detailed size questions.',
  inputSchema:{type:'object',properties:{id:{type:'string'},size_mm2:{type:'number',description:'optional: only return variants of this conductor size'}},required:['id']},
  execute:({id,size_mm2})=>{const p=BYID[String(id)];if(!p)throw new Error('No product with id '+id);toolNote('Reading '+p.name);let vs=p.variants;if(size_mm2!=null)vs=vs.filter(v=>v.size===+size_mm2||(v.size2&&v.size<=+size_mm2&&+size_mm2<=v.size2));return {id:p.id,name:p.name,description:p.desc,specs:p.specs,variants:vs.slice(0,80).map(v=>({code:v.code,label:v.label,...(canPrice()?{price_ex_gst:v.price}:{})})),more:Math.max(0,vs.length-80)}}},
 {name:'add_to_quote',description:'Add a part number to the user’s quote. Only call this when the user has asked to add parts. Returns ok or an error.',
  inputSchema:{type:'object',properties:{code:{type:'string'},qty:{type:'number'}},required:['code','qty']},
  execute:({code,qty})=>{if(!addToQuote(String(code),+qty||1,true))throw new Error('Unknown part number '+code);toolNote(`Added ${+qty||1} × ${code} to the quote`);toast(`Amp added ${+qty||1} × ${code} to your quote`,'View quote',()=>openDrawer('q'));return 'ok'}},
];
function linkify(html){return html.replace(/\b([A-Z]{1,6}(?:-[A-Z]{1,4})?-?[0-9][A-Za-z0-9.\-\/x]*)\b/g,(m)=>{const k=m.replace(/[.]$/,'');return BYCODE[k.toUpperCase()]?`<button class="codechip" data-act="add" data-code="${esc(BYCODE[k.toUpperCase()][1].code)}" title="Add to quote">${esc(k)} ${I.plus.replace('width="16" height="16"','width="13" height="13"')}</button>`+m.slice(k.length):m})}
function md(t){
  const lines=esc(t).split('\n');let h='',inL=false;
  for(let l of lines){l=l.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/`([^`]+)`/g,'$1');
    if(/^\s*[-*•]\s+/.test(l)){if(!inL){h+='<ul>';inL=true}h+='<li>'+l.replace(/^\s*[-*•]\s+/,'')+'</li>'}
    else{if(inL){h+='</ul>';inL=false}if(l.trim())h+='<p>'+l.replace(/^#+\s*/,'')+'</p>'}}
  if(inL)h+='</ul>';return linkify(h);
}

/* ---------- Ask Amp chat ---------- */
let CHAT=[], chatCtl=null, chatImg=null;
function toolNote(t){const n=$('#toolnote');if(n)n.innerHTML=`<span class="tool-note">${I.search.replace('<svg','<svg width="14" height="14"')} ${esc(t)}</span>`}
function renderAsk(){
  const d=$('#adrawer');
  if(!AI.sample){d.innerHTML=`<header><h2>Ask Amp</h2><button class="icon-btn" onclick="closeDrawers()" aria-label="Close">${I.x}</button></header><div class="scroll"><div class="empty">Amp isn’t available in this view. Use the search and the lug finder in the meantime.</div></div>`;return}
  d.innerHTML=`<header><span class="ai-tag" style="font-size:15px">${I.bolt}</span><h2>Ask Amp</h2>${CHAT.length?'<button class="link" id="newchat">New chat</button>':''}<button class="icon-btn" onclick="closeDrawers()" aria-label="Close">${I.x}</button></header>
  ${AI.preview?'<p class="demo-note" style="margin:0;padding:8px 16px;background:var(--stage)">Prototype preview: Amp replies with sample answers.</p>':''}<div class="scroll" id="chatscroll"><div class="msgs" id="msgs"></div></div>
  <footer><div id="imgprev"></div><div class="composer">${AI.images?`<button class="icon-btn" id="camb" aria-label="Add a photo">${I.cam}</button>`:''}<textarea id="chatin" rows="1" placeholder="Ask Amp anything"></textarea><button class="icon-btn" id="sendb" style="background:var(--dark);color:#fff;border-color:var(--dark)" aria-label="Send">${I.send}</button></div></footer>`;
  drawMsgs();
  const ta=$('#chatin');ta.oninput=()=>{ta.style.height='auto';ta.style.height=Math.min(140,ta.scrollHeight)+'px'};
  ta.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#sendb').click()}};
  $('#sendb').onclick=()=>{if(chatCtl){chatCtl.abort();return}const v=ta.value.trim();if(v||chatImg){ta.value='';askAmp(v)}};
  const nc=$('#newchat');if(nc)nc.onclick=()=>{CHAT=[];renderAsk()};
  const cb=$('#camb');if(cb)cb.onclick=()=>pickFile('image/*',f=>{chatImg=f;$('#imgprev').innerHTML=`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:13px;color:var(--muted)"><img src="${URL.createObjectURL(f)}" style="width:44px;height:44px;object-fit:cover;border-radius:8px" alt="">Photo attached <button class="link" id="rmimg">Remove</button></div>`;$('#rmimg').onclick=()=>{chatImg=null;$('#imgprev').innerHTML=''}});
}
function drawMsgs(){
  const m=$('#msgs');if(!m)return;
  m.innerHTML=CHAT.length?CHAT.map(x=>x.role==='user'?`<div class="msg u">${x.img?`<img class="up" src="${x.img}" alt="Attached photo">`:''}${esc(x.content)}</div>`:`<div class="msg a">${x.pending&&!x.content?thinking:md(x.content)}${x.err?`<p style="color:var(--bad);font-size:13.5px">${esc(x.err)}</p>`:''}</div>`).join('')+'<div id="toolnote"></div>'
  :`<div class="msg a"><p>G’day, I’m Amp. I know all ${TOTAL_SKUS.toLocaleString()} Ampwell part numbers. Tell me what you’re terminating or building and I’ll find the parts, check sizes and add them to your quote.</p></div><div class="sugg">${['What lug for 185mm² Al onto a copper busbar, M12?','I’m fitting out a 3-bed house. What switches and power points do I need?','Difference between SC and bell-mouth lugs?',`Add 20 × ${findCode('SC35-10')[1].code} to my quote`].map(s=>`<button class="lchip">${s}</button>`).join('')}</div>`;
  $$('.sugg .lchip',m).forEach(b=>b.onclick=()=>askAmp(b.textContent));
  const s=$('#chatscroll');if(s)s.scrollTop=s.scrollHeight;
}
async function askAmp(q){
  if(!AI.sample)return;
  if(!$('#adrawer').classList.contains('open'))openDrawer('a');
  const img=chatImg;chatImg=null;const ip=$('#imgprev');if(ip)ip.innerHTML='';
  CHAT.push({role:'user',content:q||'What is this part? Find the Ampwell equivalent.',img:img?URL.createObjectURL(img):null});
  const a={role:'assistant',content:'',pending:true};CHAT.push(a);drawMsgs();
  chatCtl=new AbortController();const sb=$('#sendb');if(sb)sb.innerHTML=I.stop;
  const hist=CHAT.slice(0,-1).filter(x=>x.content).slice(-12).map(x=>({role:x.role,content:x.content}));
  if(img)hist[hist.length-1].content+='\n\n(The user attached a photo. Identify the part type, likely conductor size and hole from it, then find the Ampwell equivalent.)';
  const turns=[{role:'user',content:RULES+catIndex()},...hist];
  try{
    const opts={signal:chatCtl.signal,cache:false,onText:({text})=>{a.content=text;a.pending=false;drawMsgs()}};
    if(AI.tools){opts.tools=TOOLS();delete opts.cache}
    if(img&&AI.images)opts.images=[img];
    const r=await AI.sample(turns,opts);a.content=r.text;
  }catch(e){a.content=e.text||a.content;if(e.code!=='cancelled')a.err=errText(e);aiOff(e)}
  a.pending=false;chatCtl=null;drawMsgs();const sb2=$('#sendb');if(sb2)sb2.innerHTML=I.send;
}

/* ---------- product page question ---------- */
let pqCtl=null;
async function askProduct(p,v,q){
  if(!AI.sample||!q.trim())return;const out=$('#pqo');pqCtl&&pqCtl.abort();pqCtl=new AbortController();out.innerHTML=thinking;
  const info=`Product: ${p.name}\nDescription: ${p.desc}\nSpecs: ${Object.entries(p.specs).map(([k,x])=>k+': '+x).join('; ')}\nCurrently selected: ${v.code} (${v.label}, ${money(v.price)} ex GST)\nAll part numbers: ${p.variants.map(x=>x.code+' = '+x.label).join('; ').slice(0,6000)}`;
  try{const r=await AI.sample(`${RULES}(index omitted, answer about this product only, and say if another Ampwell family would suit better)\n\n${info}\n\nQuestion: ${q}`,{signal:pqCtl.signal,onText:({text})=>{out.innerHTML=md(text)}});out.innerHTML=md(r.text)}
  catch(e){if(e.code!=='cancelled')out.innerHTML=(e.text?md(e.text):'')+`<p style="color:var(--bad)">${esc(errText(e))}</p>`;aiOff(e)}
}

/* ---------- schedule matcher ---------- */
const SAMPLE_SCHED=`Project: Warehouse fit-out, Unit 4
Main switchboard
- 4 x 240mm2 AL XLPE to Cu busbar, M12 lugs
- 4 x 95 sq mm Cu flexible (welding cable) lugs M10
- 2 x 63A main switch 2P
- 12 x RCBO 16A
Sub-board
- 1 x 24 pole surface enclosure
- 20 x SC lugs 35mm2 M10
- join 185 Al to 120 Cu x 3
Office
- 18 double GPO white
- 6 GPO w/ USB-C black
- 24 x 90mm LED downlights
- 6 x 1 gang switch white
- 3 x Cat6 data
- 100m 20mm corrugated conduit
- 2 x EV charger 7kW`;
let schedRows=[], schedCtl=null;
function renderSched(){
  const el=$('#sched');if(!el)return;
  if(!AI.sample){el.innerHTML=`<span class="ai-tag">${I.bolt} Schedule matcher</span><h3 style="margin:8px 0 6px">Send us your schedule</h3><p style="color:var(--muted)">AI matching isn’t available in this view. Email your schedule and our team will match it for you.</p><a class="btn btn-blue btn-block" href="mailto:sales@ampwell.com.au?subject=Project%20schedule" target="_blank" rel="noopener">Email sales@ampwell.com.au</a>`;return}
  el.innerHTML=`<span class="ai-tag">${I.bolt} Schedule matcher</span><h3 style="margin:8px 0 12px;font-size:21px">Paste or upload your schedule</h3>
  <textarea class="ta" id="schedta" placeholder="One item per line, e.g. 4 x 240mm2 Al to Cu busbar M12"></textarea>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 14px"><button class="lchip" id="sfile">${I.doc.replace('width="22" height="22"','width="15" height="15" style="vertical-align:-3px"')} Upload CSV or text</button>${AI.images?`<button class="lchip" id="simg">${I.cam.replace('width="19" height="19"','width="15" height="15" style="vertical-align:-3px"')} Photo of a schedule</button>`:''}<button class="lchip" id="ssample">Try a sample schedule</button></div>
  <div id="simgprev"></div><button class="btn btn-blue btn-block" id="sgo">Match to the Ampwell range</button><div id="sres" style="margin-top:16px"></div>`;
  let img=null;
  $('#ssample').onclick=()=>{$('#schedta').value=SAMPLE_SCHED};
  $('#sfile').onclick=()=>pickFile('.csv,.txt,.tsv,text/plain,text/csv',f=>{if(f.size>400000){toast('That file is too large. Use one under 400 KB.');return}f.text().then(t=>{$('#schedta').value=t.slice(0,20000)})});
  const si=$('#simg');if(si)si.onclick=()=>pickFile('image/*',f=>{img=f;$('#simgprev').innerHTML=`<p style="font-size:13.5px;color:var(--muted);margin:0 0 10px">Photo attached: ${esc(f.name)} <button class="link" id="srm">Remove</button></p>`;$('#srm').onclick=()=>{img=null;$('#simgprev').innerHTML=''}});
  $('#sgo').onclick=()=>matchSchedule($('#schedta').value,img);
}
async function matchSchedule(text,img){
  const res=$('#sres'),btn=$('#sgo');
  if(!text.trim()&&!img){res.innerHTML='<p style="color:var(--bad)">Paste some schedule lines or attach a photo first.</p>';return}
  if(schedCtl){schedCtl.abort();return}
  schedCtl=new AbortController();btn.textContent='Stop';res.innerHTML=thinking+' <span style="color:var(--muted);font-size:14px">Matching each line to the range</span>';
  const prompt=`${RULES}${catIndex()}

Task: match each line of the electrical schedule below to the Ampwell catalogue. Lines that are headings or notes should be skipped. For each item line return:
- "text": the original line, shortened to under 40 characters
- "qty": the quantity as a number (default 1; for conduit sold per length, convert metres to the number of lengths or coils sensibly and say so in note)
- "family": the catalogue id from the index that fits, or null if Ampwell has nothing suitable
- "size": conductor size in mm² for lugs and connectors (the first size for joints), else null
- "size2": second conductor size for reducing or joining connectors, else null
- "stud": stud or hole diameter in mm if stated, else null
- "code": for non-lug products, the exact variant code from the index (choose the colour or rating stated); else null
- "status": "match" if confident, "check" if you made an assumption, "gap" if not in the range
- "note": under 8 words, the assumption made or why it is a gap, or ""
Keep the JSON compact (no spaces or line breaks) and include at most 25 lines.
Reply with only JSON: {"lines":[{"text":"...","qty":4,"family":"cau-a","size":240,"size2":null,"stud":12,"code":null,"status":"match","note":"Al to Cu needs bi-metal"}]}

Schedule:
${text.slice(0,20000)||'(see attached photo)'}`;
  try{
    const opts={signal:schedCtl.signal,modelTier:'default'};if(img&&AI.images)opts.images=[img];
    const out=await AI.sample.json(prompt,opts);
    const lines=Array.isArray(out?.lines)?out.lines:[];
    schedRows=lines.map(l=>{const hit=l.family||l.code?resolveLine(l.family,l.size,l.stud,l.size2,l.code):null;
      let status=l.status==='gap'||!hit?'gap':(l.status==='check'||(l.stud&&hit&&hit[1].stud&&hit[1].stud!==+l.stud))?'check':'match';
      let note=l.note||'';if(!hit&&l.family&&BYID[l.family])note=`No ${l.size} mm² size in ${BYID[l.family].name}`;
      return {text:String(l.text||''),qty:Math.max(1,Math.round(+l.qty||1)),hit,status,note,on:status!=='gap'}});
    drawSched();
  }catch(e){res.innerHTML=e.code==='cancelled'?'':`<p style="color:var(--bad)">${esc(errText(e))}</p>`;aiOff(e)}
  schedCtl=null;btn.textContent='Match to the Ampwell range';
}
function drawSched(){
  const res=$('#sres');const n={match:0,check:0,gap:0};schedRows.forEach(r=>n[r.status]++);
  res.innerHTML=`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><span class="status st-ok">${n.match} matched</span><span class="status st-warn">${n.check} to check</span><span class="status st-bad">${n.gap} not in range</span></div>
  <div class="vlist">${schedRows.map((r,i)=>`<div class="vrow" style="grid-template-columns:auto 1fr"><input type="checkbox" data-si="${i}" ${r.on?'checked':''} ${r.hit?'':'disabled'} aria-label="Include line" style="width:19px;height:19px;accent-color:var(--blue)"><div><small style="display:block">${esc(r.text)}</small>${r.hit?`<span class="code num">${esc(r.hit[1].code)}</span> <span class="num" style="font-size:13.5px">× <input type="number" data-sq="${i}" value="${r.qty}" min="1" style="width:64px;border:1px solid var(--line);border-radius:8px;padding:3px 6px;background:var(--bg)" aria-label="Quantity"></span><b style="font-size:14px">${esc(r.hit[0].name)}</b><small class="num">${esc(r.hit[1].label)}, ${money(r.hit[1].price)} ea</small>`:''}<div style="margin-top:4px"><span class="status ${r.status==='match'?'st-ok':r.status==='check'?'st-warn':'st-bad'}">${r.status==='match'?'Matched':r.status==='check'?'Check':'Not in range'}</span> <small>${esc(r.note)}</small></div></div></div>`).join('')}</div>
  <button class="btn btn-navy btn-block" style="margin-top:14px" id="sadd">Add selected lines to quote</button>`;
  $$('[data-si]',res).forEach(c=>c.onchange=()=>{schedRows[+c.dataset.si].on=c.checked});
  $$('[data-sq]',res).forEach(c=>c.onchange=()=>{schedRows[+c.dataset.sq].qty=Math.max(1,+c.value||1)});
  $('#sadd').onclick=()=>{let k=0;for(const r of schedRows)if(r.on&&r.hit){addToQuote(r.hit[1].code,r.qty,true);k++}toast(`Added ${k} line${k===1?'':'s'} to your quote`,'View quote',()=>openDrawer('q'))};
}

/* ---------- photo ID ---------- */
async function identifyPhoto(f,el){
  el.innerHTML='<div style="margin-top:14px">'+thinking+'</div>';
  try{
    const r=await AI.sample.json(`${RULES}${catIndex()}

Identify the lug or connector in the photo and choose the closest Ampwell family from the index. Estimate the conductor size from any markings (barrels are often stamped with size and hole, e.g. "95-12") or from proportions. Reply with only JSON: {"what":"short description","family":"id or null","size":95,"stud":12,"confidence":"high|medium|low","why":"under 25 words"}`,{images:[f]});
    const hit=r&&r.family?resolveLine(r.family,r.size,r.stud):null;
    el.innerHTML=`<div style="margin-top:16px"><img src="${URL.createObjectURL(f)}" alt="Your photo" style="width:100%;max-height:200px;object-fit:contain;background:var(--stage);border-radius:12px"><p style="margin:12px 0 6px"><b>${esc(r.what||'Part identified')}</b> <span class="status ${r.confidence==='high'?'st-ok':'st-warn'}">${esc(r.confidence||'low')} confidence</span></p><p style="color:var(--muted);font-size:14.5px;margin:0 0 12px">${esc(r.why||'')}</p>${hit?vrow(hit[0],hit[1]):r.family&&BYID[r.family]?`<a class="btn btn-line" href="#p-${r.family}">View ${esc(BYID[r.family].name)}</a>`:'<p class="empty">No close match in the Ampwell range.</p>'}</div>`;
  }catch(e){el.innerHTML=`<p style="color:var(--bad)">${esc(errText(e))}</p>`;aiOff(e)}
}

/* ---------- quote review ---------- */
async function reviewQuote(){
  const box=$('#qrev');box.innerHTML='<div class="ai-card">'+thinking+'</div>';
  const list=QUOTE.map(i=>{const [p,v]=BYCODE[i.code.toUpperCase()];return `${i.qty} x ${v.code} | ${p.name} | ${v.label} | family ${p.id}`}).join('\n');
  try{
    const r=await AI.sample.json(`${RULES}${catIndex()}

Review this quote as an experienced electrical wholesaler would. Look for likely gaps or mismatches (e.g. aluminium cable but only copper lugs, lugs without a matching size, power points without switches, breakers without an enclosure, odd quantities). Keep it short and don't invent problems. Reply with only JSON: {"summary":"one sentence","checks":[{"level":"ok|warn","text":"under 20 words"}],"suggest":[{"family":"id","size":null,"stud":null,"code":null,"qty":1,"why":"under 15 words"}]} with at most 4 checks and 3 suggestions.

Quote:
${list}`,{modelTier:'default'});
    const sug=(r.suggest||[]).map(s=>({s,hit:resolveLine(s.family,s.size,s.stud,null,s.code)})).filter(x=>x.hit);
    box.innerHTML=`<div class="ai-card"><span class="ai-tag">${I.bolt} Amp’s check</span><p style="margin:8px 0 10px;font-size:15px">${esc(r.summary||'')}</p>${(r.checks||[]).map(c=>`<p style="margin:6px 0;font-size:14px"><span class="status ${c.level==='warn'?'st-warn':'st-ok'}">${c.level==='warn'?'Check':'OK'}</span> ${esc(c.text)}</p>`).join('')}${sug.length?`<p style="font-weight:650;font-size:14px;margin:14px 0 8px">Suggested additions</p><div class="vlist">${sug.map(({s,hit})=>vrow(hit[0],hit[1],'<br>'+esc(s.why||''))).join('')}</div>`:''}</div>`;
  }catch(e){box.innerHTML=`<p style="color:var(--bad)">${esc(errText(e))}</p>`;aiOff(e)}
}


/* ---------- Job Kit Builder ---------- */
const KIT_JOBS=[
 ['House rewire','Full rewire of a 3-bedroom, 2-bathroom house. Single phase, new switchboard, LED downlights throughout, white slimline fittings.'],
 ['Kitchen renovation','Kitchen renovation: new power points along the bench with two USB-C outlets, downlights, a dimmer for the dining pendant area.'],
 ['Switchboard upgrade','Replace an old ceramic-fuse board in a house with a new 24 pole enclosure, main switch, RCBOs on every circuit and surge protection.'],
 ['Aluminium mains','Terminate 4 x 240 mm² aluminium mains into a copper busbar with M12 studs, plus 120 mm² copper sub-mains to two sub-boards.'],
 ['Office fit-out','Small office fit-out for 12 desks: power and data at each desk, LED downlights with motion sensors, conduit for the cable runs.'],
];
let kitCtl=null, KIT=null;
function renderKit(el){
  if(!el)return;
  if(!AI.sample){el.innerHTML=`<div class="ai-card"><p style="margin:0;color:var(--muted)">Amp isn’t available in this view.</p></div>`;return}
  el.innerHTML=`<div class="finder" style="margin-top:0"><div class="ai-card">
    <span class="lbl" style="display:block;font-weight:650;font-size:14.5px;margin-bottom:9px">Start from a common job</span>
    <div class="seg" id="kitjobs">${KIT_JOBS.map(([t],i)=>`<button type="button" class="lchip" data-k="${i}">${t}</button>`).join('')}</div>
    <label for="kitta" style="display:block;font-weight:650;font-size:14.5px;margin:18px 0 9px">Or describe your job</label>
    <textarea class="ta" id="kitta" style="min-height:120px" placeholder="e.g. Rewire a 2-bed unit, white fittings, 8 downlights, new board with RCBOs"></textarea>
    <button class="btn btn-blue btn-block" style="margin-top:12px" id="kitgo">${I.bolt.replace('<svg','<svg width="17" height="17"')} Build my kit</button>
    <p style="font-size:12.5px;color:var(--muted);margin:10px 0 0">Amp only uses real Ampwell part numbers. Check quantities against your drawings before ordering.</p>
  </div><div id="kitres">${KIT?'':`<div class="empty" style="height:100%;display:grid;place-items:center;min-height:260px"><div><b style="color:var(--text);display:block;margin-bottom:6px">Your parts list appears here</b>Grouped by board and area, ready to add to your quote in one tap.</div></div>`}</div></div>`;
  $$('#kitjobs .lchip',el).forEach(b=>b.onclick=()=>{$$('#kitjobs .lchip',el).forEach(x=>x.setAttribute('aria-pressed',x===b));$('#kitta',el).value=KIT_JOBS[+b.dataset.k][1]});
  $('#kitgo',el).onclick=()=>buildKit($('#kitta',el).value,el);
  if(KIT)drawKit(el);
}
async function buildKit(desc,el){
  const res=$('#kitres',el),btn=$('#kitgo',el);
  if(!desc.trim()){res.innerHTML='<div class="empty">Describe the job or pick a common job first.</div>';return}
  if(kitCtl){kitCtl.abort();return}
  kitCtl=new AbortController();btn.innerHTML=I.stop+' Stop';
  res.innerHTML=`<div class="ai-card">${thinking} <span style="color:var(--muted);font-size:14px">Planning circuits and picking parts</span></div>`;
  const prompt=`${RULES}${catIndex()}

Task: plan the Ampwell parts for this job. Think like an experienced Australian electrician estimating a job. Use typical quantities for the job size and state your main assumptions. Only use catalogue ids and codes from the index. Lugs and connectors need a size (and stud if relevant). Keep it to at most 14 items in 2 to 4 groups (e.g. "Switchboard", "Kitchen", "Lighting"). Mention in "gaps" anything the job needs that Ampwell doesn't sell (cable, EV chargers, smoke alarms).
Reply with only compact JSON, no extra words:
{"title":"short job title","assumptions":["under 12 words each, max 3"],"groups":[{"name":"Switchboard","items":[{"family":"id","code":"exact variant code for non-lug products or null","size":null,"stud":null,"qty":1,"why":"under 8 words"}]}],"gaps":["under 8 words each, max 3"]}

Job: ${desc.slice(0,2000)}`;
  try{
    const out=await AI.sample.json(prompt,{signal:kitCtl.signal,modelTier:'default'});
    const groups=(out&&Array.isArray(out.groups)?out.groups:[]).map(g=>({name:String(g.name||'Parts'),items:(g.items||[]).map(it=>{const hit=resolveLine(it.family,it.size,it.stud,null,it.code);return {hit,qty:Math.max(1,Math.round(+it.qty||1)),why:String(it.why||''),on:!!hit}}).filter(x=>x.hit)})).filter(g=>g.items.length);
    if(!groups.length)throw {code:'empty_completion'};
    KIT={title:String(out.title||'Your kit'),assumptions:(out.assumptions||[]).slice(0,3).map(String),gaps:(out.gaps||[]).slice(0,3).map(String),groups};
    drawKit(el);
  }catch(e){res.innerHTML=e.code==='cancelled'?'':`<div class="empty" style="color:var(--bad)">${esc(errText(e))}</div>`;aiOff(e)}
  kitCtl=null;btn.innerHTML=I.bolt.replace('<svg','<svg width="17" height="17"')+' Build my kit';
}
function drawKit(el){
  const res=$('#kitres',el);if(!res||!KIT)return;
  const tot=()=>KIT.groups.flatMap(g=>g.items).filter(i=>i.on).reduce((a,i)=>a+i.hit[1].price*i.qty,0);
  res.innerHTML=`<div class="panel" style="padding:20px">
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:start;flex-wrap:wrap"><div><span class="ai-tag">${I.bolt} Amp’s kit</span><h3 style="margin:4px 0 0;font-size:20px">${esc(KIT.title)}</h3></div><div style="text-align:right"><b class="num" style="font-size:20px" id="kittot">${money(tot())}</b><small style="display:block;color:var(--muted);font-size:12.5px">indicative, ex GST</small></div></div>
    ${KIT.assumptions.length?`<p style="font-size:13.5px;color:var(--muted);margin:10px 0 0"><b style="color:var(--text)">Assumed:</b> ${KIT.assumptions.map(esc).join('; ')}</p>`:''}
    ${KIT.groups.map((g,gi)=>`<h4 style="margin:18px 0 8px;font-size:14.5px">${esc(g.name)}</h4><div class="vlist">${g.items.map((it,ii)=>`<div class="vrow" style="grid-template-columns:auto 56px 1fr;gap:10px"><input type="checkbox" data-kg="${gi}" data-ki="${ii}" ${it.on?'checked':''} aria-label="Include" style="width:19px;height:19px;accent-color:var(--dark)"><a class="th" style="width:56px;height:46px" href="#p-${it.hit[0].id}">${artOf(it.hit[0],it.hit[1])}</a><div><span class="code num">${esc(it.hit[1].code)}</span> <span class="num" style="font-size:13.5px">× <input type="number" min="1" data-kq="${gi}.${ii}" value="${it.qty}" style="width:60px;border:1px solid var(--line);border-radius:8px;padding:3px 6px;background:var(--bg)" aria-label="Quantity"></span><b style="font-size:14px">${esc(it.hit[0].name)}</b><small>${esc(it.hit[1].label)}${it.why?'. '+esc(it.why):''}</small></div></div>`).join('')}</div>`).join('')}
    ${KIT.gaps.length?`<p style="font-size:13.5px;margin:16px 0 0"><span class="status st-warn">Not in range</span> <span style="color:var(--muted)">${KIT.gaps.map(esc).join('; ')}</span></p>`:''}
    ${AI.preview?'<p class="demo-note">Prototype preview: this kit is sample data.</p>':''}
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px"><button class="btn btn-navy" style="flex:1 1 200px" id="kitadd">${I.plus} Add kit to quote</button><button class="btn btn-line" style="flex:1 1 140px" id="kitask">Refine with Amp</button></div></div>`;
  const all=KIT.groups;
  $$('[data-kg]',res).forEach(c=>c.onchange=()=>{all[+c.dataset.kg].items[+c.dataset.ki].on=c.checked;$('#kittot').textContent=money(tot())});
  $$('[data-kq]',res).forEach(c=>c.onchange=()=>{const [g,i]=c.dataset.kq.split('.');all[+g].items[+i].qty=Math.max(1,Math.round(+c.value||1));$('#kittot').textContent=money(tot())});
  $('#kitadd').onclick=()=>{let k=0;for(const g of all)for(const i of g.items)if(i.on){addToQuote(i.hit[1].code,i.qty,true);k++}toast(`Added ${k} line${k===1?'':'s'} to your quote`,'View quote',()=>openDrawer('q'))};
  $('#kitask').onclick=()=>{const list=all.flatMap(g=>g.items.filter(i=>i.on).map(i=>`${i.qty} x ${i.hit[1].code}`)).join(', ');openDrawer('a');askAmp(`I'm planning: ${KIT.title}. Your suggested kit is: ${list}. What should I double-check, and is anything missing?`)};
}

/* ---------- schedule upload (reference design) ---------- */
const UPL_ACCEPT='.pdf,.xls,.xlsx,.csv,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp,.heic';
const EXT_COL={pdf:'#D93A2B',xls:'#1D7A45',xlsx:'#1D7A45',csv:'#1D7A45',doc:'#2B5DCB',docx:'#2B5DCB',txt:'#5A6477',png:'#7A4FD0',jpg:'#7A4FD0',jpeg:'#7A4FD0',webp:'#7A4FD0',heic:'#7A4FD0'};
const fmtBytes=b=>b<1024?b+' B':b<1048576?(b/1024).toFixed(0)+' KB':(b/1048576).toFixed(1)+' MB';
function renderUpload(el){
  if(!el)return;
  const st={files:[],desc:'',open:false,busy:false,ctl:null};
  const inp=document.createElement('input');inp.type='file';inp.multiple=true;inp.accept=UPL_ACCEPT;inp.hidden=true;
  function addFiles(list){
    const bad=[];
    for(const f of list){const ext=(f.name.split('.').pop()||'').toLowerCase();
      if(!EXT_COL[ext]){bad.push(`${f.name} isn’t a supported file type`);continue}
      if(f.size>20*1048576){bad.push(`${f.name} is over 20 MB`);continue}
      if(st.files.length>=10){bad.push('Up to 10 files per schedule');break}
      if(!st.files.some(x=>x.name===f.name&&x.size===f.size))st.files.push(f)}
    draw(bad.join('. ')+(bad.length?'.':''));
  }
  inp.onchange=()=>{addFiles([...inp.files]);inp.value=''};
  function draw(err=''){
    el.innerHTML=`<button type="button" class="dz" id="dz"><span class="ring">${I.up.replace('width="26" height="26"','width="30" height="30"')}</span><b>Upload product schedule</b><span>PDF, Excel, CSV, Word or images, up to 20 MB each</span></button>
    ${st.files.length?`<div class="files">${st.files.map((f,k)=>{const ext=(f.name.split('.').pop()||'').toLowerCase();return `<div class="file"><span class="ext" style="background:${EXT_COL[ext]}">${ext.toUpperCase().slice(0,4)}</span><div><b>${esc(f.name)}</b><small>${fmtBytes(f.size)}</small></div><button class="icon-btn" style="width:34px;height:34px" data-rmf="${k}" aria-label="Remove ${esc(f.name)}">${I.x.replace('width="20" height="20"','width="16" height="16"')}</button></div>`}).join('')}</div>`:''}
    <button type="button" class="desc-row" id="descrow" aria-expanded="${st.open}">${I.doc}<span>No schedule yet? Describe the project and we’ll help you build the list.</span></button>
    ${st.open?`<div class="desc-box"><textarea class="ta" id="desc" placeholder="e.g. New 3-bedroom home, single phase, 20 downlights, white slimline switches and power points, 24 pole board with RCBOs">${esc(st.desc)}</textarea></div>`:''}
    ${err?`<p class="err" role="alert">${esc(err)}</p>`:''}
    <button class="btn btn-blue btn-block" style="margin-top:16px;padding:16px 22px;font-size:16px" id="ugo">Request project pricing</button>
    <div id="uout"></div>`;
    el.appendChild(inp);
    const dz=$('#dz',el);
    dz.onclick=()=>inp.click();
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('over')};dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');addFiles([...e.dataTransfer.files])};
    $$('[data-rmf]',el).forEach(b=>b.onclick=()=>{st.files.splice(+b.dataset.rmf,1);draw()});
    $('#descrow',el).onclick=()=>{st.open=!st.open;draw();if(st.open)setTimeout(()=>{const t=$('#desc',el);t&&t.focus()},30)};
    const d=$('#desc',el);if(d)d.oninput=()=>{st.desc=d.value};
    $('#ugo',el).onclick=run;
  }
  async function run(){
    if(!st.files.length&&!st.desc.trim()){draw(st.open?'Describe the project, or upload a schedule.':'Upload a schedule, or describe the project below.');return}
    const out=$('#uout',el), btn=$('#ugo',el);
    btn.disabled=true;$('#dz',el).style.pointerEvents='none';
    const n=st.files.length;
    const steps=[n?`Reading ${n} file${n>1?'s':''}`:'Reading your project description','Matching each line to the Ampwell range','Checking for anything we don’t supply'];
    out.innerHTML=`<div class="panel" style="margin-top:16px"><ol class="prog">${steps.map(s=>`<li><i></i>${esc(s)}</li>`).join('')}</ol></div>`;
    const lis=$$('.prog li',out);
    let result;
    try{
      const pr=getScheduleMatch(st);
      for(let k=0;k<lis.length;k++){lis[k].className='on';await new Promise(r=>setTimeout(r,700+k*250));if(k<lis.length-1){lis[k].className='done';lis[k].firstChild.innerHTML='✓'}}
      result=await pr;
      lis[lis.length-1].className='done';lis[lis.length-1].firstChild.innerHTML='✓';
    }catch(e){out.innerHTML=`<p class="err">${esc(errText(e))}</p>`;btn.disabled=false;$('#dz',el).style.pointerEvents='';return}
    btn.hidden=true;showMatches(out,result,st);
  }
  draw();
}
async function getScheduleMatch(st){
  // Prototype: sample data. Published build: AI.sample with text files / images.
  if(AI.preview||!AI.sample){await new Promise(r=>setTimeout(r,2100));return st.files.length?FAKE_SCHEDULE():fakeKitLines(st.desc)}
  let text=st.desc||'';const imgs=[];
  for(const f of st.files){const ext=f.name.split('.').pop().toLowerCase();if(['csv','txt'].includes(ext))text+='\n'+(await f.text()).slice(0,15000);else if(['png','jpg','jpeg','webp'].includes(ext))imgs.push(f)}
  if(!text.trim()&&!imgs.length)return FAKE_SCHEDULE();
  const out=await AI.sample.json(SCHED_PROMPT(text),imgs.length?{images:imgs.slice(0,3)}:{});
  return (out.lines||[]).map(l=>({text:String(l.text||''),qty:+l.qty||1,family:l.family,size:l.size,size2:l.size2,stud:l.stud,code:l.code,status:l.status,note:l.note}));
}
function showMatches(out,lines,st){
  schedRows=lines.map(l=>{const hit=l.family||l.code?resolveLine(l.family,l.size,l.stud,l.size2,l.code):null;const status=!hit?'gap':(l.status==='check'?'check':'match');return {text:l.text,qty:Math.max(1,Math.round(+l.qty||1)),hit,status,note:l.note||'',on:!!hit}});
  const ref='AMP-P'+Date.now().toString(36).toUpperCase().slice(-6);
  out.innerHTML=`<div class="panel" style="margin-top:16px"><div style="display:flex;justify-content:space-between;align-items:start;gap:10px;flex-wrap:wrap"><div><span class="ai-tag">${I.bolt} Matched to the Ampwell range</span><h3 style="margin:4px 0 0;font-size:19px">${st.files.length?esc(st.files[0].name.replace(/\.[^.]+$/,'')):'Your project list'}</h3></div><span class="status st-ok num">Ref ${ref}</span></div><div id="sres" style="margin-top:14px"></div>
  ${AI.preview?'<p class="demo-note">Prototype preview: these matches are sample data.</p>':''}</div>`;
  drawSched();
  const add=$('#sadd',out);
  add.textContent='Add matched lines and request pricing';
  add.onclick=()=>{let k=0;for(const r of schedRows)if(r.on&&r.hit){addToQuote(r.hit[1].code,r.qty,true);k++}saveQuote();toast(`Added ${k} lines to your quote`);submitQuote()};
  add.insertAdjacentHTML('afterend','<button class="btn btn-line btn-block" style="margin-top:8px" id="sonly">Add to quote only</button>');
  $('#sonly',out).onclick=()=>{let k=0;for(const r of schedRows)if(r.on&&r.hit){addToQuote(r.hit[1].code,r.qty,true);k++}toast(`Added ${k} line${k===1?'':'s'} to your quote`,'View quote',()=>openDrawer('q'))};
}
const SCHED_PROMPT=text=>`${RULES}${catIndex()}\n\nTask: match each line of the electrical schedule below to the Ampwell catalogue. Reply with only compact JSON {"lines":[{"text":"under 40 chars","qty":1,"family":"id or null","size":null,"size2":null,"stud":null,"code":null,"status":"match|check|gap","note":"under 8 words"}]}, at most 25 lines.\n\nSchedule:\n${text.slice(0,20000)}`;

/* ---------- sample data for the prototype ---------- */
const FAKE_SCHEDULE=()=>[
 {text:'Main switchboard: 240mm² Al XLPE to Cu bar, M12',qty:8,family:'bl',size:240,stud:12,status:'match',note:'Al to Cu needs bi-metal'},
 {text:'Sub-main 120mm² Cu, M12 lugs',qty:6,family:'sc',size:120,stud:12,status:'match',note:''},
 {text:'95mm² flex Cu (welding cable) M10',qty:4,family:'cl-bm',size:95,stud:10,status:'match',note:'Bell mouth for fine strand'},
 {text:'Joint 185 Al to 120 Cu',qty:3,family:'bcrl',size:185,size2:120,status:'check',note:'Confirm size pair on site'},
 {text:'Main switch 63A 2P',qty:2,code:'AW-ISO-2P-63A',status:'match',note:''},
 {text:'RCBO 16A 30mA',qty:12,code:'AW-RCBO-1P-16A',status:'match',note:''},
 {text:'Surface board 24 pole',qty:1,code:'AW-SB-24POLE',status:'match',note:''},
 {text:'Double GPO, white',qty:18,code:'AW-GPO2-SL-WH',status:'match',note:''},
 {text:'GPO with USB-C, black',qty:6,code:'AW-GPO2-USBC-BK',status:'match',note:''},
 {text:'LED downlight 90mm',qty:24,code:'AW-DL-90-WHITETRIM',status:'check',note:'Trim colour not stated, white assumed'},
 {text:'Cat6 data outlet',qty:8,code:'AW-DATA-C6-WH',status:'match',note:''},
 {text:'20mm corrugated conduit, 100 m',qty:4,code:'AW-CCON-20MM',status:'check',note:'4 coils of 25 m'},
 {text:'EV charger 7kW',qty:2,family:null,status:'gap',note:'EV chargers not in range'},
 {text:'TPS 2.5mm² cable, 500 m',qty:1,family:null,status:'gap',note:'Cable not supplied'},
];
const FAKE_KITS={
 house:{title:'3-bedroom house rewire',assumptions:['Single phase supply','About 12 circuits','White fittings'],gaps:['TPS cable','RCBOs','Smoke alarms'],groups:[
  {name:'Power',items:[{code:'GPOD',qty:22,why:'About 4 per room'},{code:'GPOS',qty:4,why:'Fridge, dishwasher, microwave'},{code:'BWGPOD',qty:2,why:'Patio and garage'}]},
  {name:'Lighting',items:[{code:'SP1',qty:10,why:'Single rooms'},{code:'SP2',qty:4,why:'Kitchen and living'},{code:'BH',qty:6,why:'Garage and storage'}]},
  {name:'Switchboard',items:[{code:'LA10',qty:1,why:'Active distribution'},{code:'LN10',qty:1,why:'Neutral distribution'},{code:'HRC80BW',qty:1,why:'Service fuse holder'},{code:'SF80A',qty:1,why:'Fuse link'}]}]},
 kitchen:{title:'Kitchen renovation',assumptions:['Existing board has capacity'],gaps:['Downlights'],groups:[{name:'Power',items:[{code:'GPOD',qty:6,why:'Benchtop'},{code:'MUSBD',qty:2,why:'USB charging'}]}]},
 board:{title:'Switchboard upgrade',assumptions:['Single phase'],gaps:['RCBOs'],groups:[{name:'Switchboard',items:[{code:'LA10',qty:1,why:'Actives'},{code:'LN10',qty:1,why:'Neutrals'}]}]},
 alum:{title:'Aluminium mains termination',assumptions:['4 x 240 mm² Al mains'],gaps:['Heat-shrink boots'],groups:[{name:'Main switchboard',items:[{family:'bl',size:240,stud:12,qty:4,why:'Al mains onto Cu bar'}]}]},
 office:{title:'Office fit-out',assumptions:['Power at every desk'],gaps:['Cat6 cable'],groups:[{name:'Desks',items:[{code:'GPOD',qty:12,why:'One per desk'},{code:'Mech Cat6',qty:24,why:'Two per desk'}]}]},
};
function pickKit(desc){const d=(desc||'').toLowerCase();if(/alumin|\bal\b|mains|240/.test(d))return FAKE_KITS.alum;if(/kitchen/.test(d))return FAKE_KITS.kitchen;if(/board|fuse|rcbo/.test(d)&&!/house|home|bed/.test(d))return FAKE_KITS.board;if(/office|desk|commercial|fit-?out/.test(d))return FAKE_KITS.office;return FAKE_KITS.house}
function fakeKitLines(desc){const k=pickKit(desc);return k.groups.flatMap(g=>g.items.map(i=>({text:`${g.name}: ${i.why}`,qty:i.qty,family:i.family||null,size:i.size||null,stud:i.stud||null,code:i.code||null,status:'match',note:''}))).concat(k.gaps.map(g=>({text:g,qty:1,family:null,status:'gap',note:'Not in the Ampwell range'})))}
function chatAnswer(q){
  const s=q.toLowerCase();
  const m=q.match(/add\s+(\d+)\s*(?:x|×)?\s*([A-Za-z]{1,6}[A-Za-z0-9\-\/.]*\d[A-Za-z0-9\-\/.]*)/i);
  const mh=m&&(BYCODE[m[2].toUpperCase()]||BYNORM[normCode(m[2])]);if(mh){addToQuote(mh[1].code,+m[1],true);const [p,v]=mh;return `Done. I’ve added ${m[1]} × ${v.code} (${p.name}, ${v.label}) to your quote${canPrice()?`, about ${money(v.price*+m[1])} ex GST`:''}.\n\nAnything else for this job?`}
  if(/differen|vs|versus|compare/.test(s)&&/bell|sc/.test(s))return `**Standard copper lugs** (e.g. ${findCode('SC35-10')[1].code}) are the everyday tin-plated copper lug for standard stranded cable.\n\n**Bell-mouth lugs** (e.g. ${findCode('CL35-10BM')[1].code}) have a flared entry for fine-stranded flexible cable, which is fatter than standard cable of the same size and splays after stripping.\n\n- Standard building cable: ${findCode('SC35-10')[0].fam}\n- Flexible or welding cable: ${findCode('CL35-10BM')[0].fam}`;
  if(/house|home|bed|apartment|unit/.test(s)){const k=FAKE_KITS.house;return `For a typical 3-bedroom home I’d start with:\n- ${k.groups.flatMap(g=>g.items).slice(0,6).map(i=>`${i.qty} × ${(findCode(i.code)||[0,{code:i.code}])[1].code} (${i.why.toLowerCase()})`).join('\n- ')}\n\nWant me to add these to your quote? You can then request a quote with them attached.`}
  const j=parseJob(q);let r=smartSearch(q,8).filter(x=>x.v);if(j.stud)r.sort((a,b)=>((b.v.stud===j.stud)-(a.v.stud===j.stud)));r=r.slice(0,3);
  if(r.length){const [a,b]=r;return `I’d go with **${a.v.code}**, ${a.p.name}, ${a.v.label}${canPrice()?`, ${money(a.v.price)} ex GST`:''}.${a.p.sub==='bimetal'?' Aluminium onto copper needs bi-metal so the two metals don’t corrode at the joint.':''}${b?`\n\nAlternative: ${b.v.code} (${b.p.name}).`:''}\n\nConfirm the crimp die and the terminal before you order. Tap a part number to add it to your quote.`}
  const r2=smartSearch(q,3);
  if(r2.length)return `These look closest in the Ampwell range:\n- ${r2.map(x=>`${x.p.name} (${sizeRange(x.p)||catName(x.p.cats[0])})`).join('\n- ')}\n\nTell me the conductor size and stud and I’ll pick the exact part number.`;
  return `I can help with that. Tell me the cable material (copper or aluminium), the conductor size and what it’s landing on, and I’ll find the exact Ampwell part number.`;
}
function mockSample(){
  const wait=(ms,signal)=>new Promise((res,rej)=>{const t=setTimeout(res,ms);if(signal)signal.addEventListener('abort',()=>{clearTimeout(t);rej({code:'cancelled'})})});
  async function call(input,opts={}){
    const last=typeof input==='string'?input:input[input.length-1].content;
    let ans;
    if(/^Question: /m.test(last)){const p=BYID[route().id];const v=p&&p.variants[0];ans=p?`Good question. ${p.name} covers ${p.variants.length} part numbers${p.kind==='lug'?` from ${sizeRange(p)}`:''}. ${p.desc.split('. ')[0]}.\n\nFor your situation, start with **${v.code}** and confirm against the terminal before ordering.`:'I’ll need a bit more detail to answer that.'}
    else if(opts.images&&opts.images.length)ans=`That looks like a tin-plated copper lug, about 95 mm² with a 12 mm hole. The Ampwell equivalent is **${findCode('SC95-12')[1].code}**.\n\nIf the barrel is aluminium, use the bi-metal **${findCode('BL95-12')[1].code}** instead.`;
    else ans=chatAnswer(String(last).split('\n').pop());
    await wait(650,opts.signal);
    const words=ans.split(/(\s+)/);let t='';
    for(let k=0;k<words.length;k+=4){t+=words.slice(k,k+4).join('');opts.onText&&opts.onText({text:t,delta:''});await wait(28,opts.signal)}
    return {text:ans,truncated:false};
  }
  call.json=async(input,opts={})=>{
    await wait(1300,opts.signal);
    const t=String(input);
    if(/plan the Ampwell parts/.test(t))return pickKit(t.split('Job:').pop());
    if(/electrical schedule below/.test(t))return {lines:FAKE_SCHEDULE()};
    if(/Identify the lug/.test(t))return {what:'Tin-plated copper cable lug, 95 mm² with a 12 mm hole',family:'sc',size:95,stud:12,confidence:'high',why:'Copper barrel with an inspection hole; the palm stamp reads 95 mm² and a 12 mm hole.'};
    if(/Review this quote/.test(t)){const fams=new Set(QUOTE.map(i=>BYCODE[i.code.toUpperCase()][0].id));const checks=[{level:'ok',text:'Part numbers and sizes are consistent'}];const suggest=[];
      if(fams.has('servicefuse')&&!fams.has('fuselink')){checks.push({level:'warn',text:'Fuse holder listed but no fuse links'});suggest.push({code:'SF80A',why:'80 A fuse link for the holder'})}
      if(fams.has('linkactive')&&!fams.has('linkneutral')){checks.push({level:'warn',text:'Active link without a matching neutral link'});suggest.push({code:'LN10',why:'Matching neutral link'})}
      if([...fams].some(f=>BYID[f].sub==='bimetal'))checks.push({level:'ok',text:'Bi-metal lugs used for aluminium to copper'});
      if([...fams].some(f=>/^gpo/.test(f))&&!fams.has('swplate')){checks.push({level:'warn',text:'Power points but no light switches'});suggest.push({code:'SP1',why:'1 gang switch plate'})}
      if(!suggest.length)suggest.push({code:'MB16',why:'Mounting blocks for surface fixing'});
      return {summary:`${QUOTE.length} lines checked. Mostly complete, with ${checks.filter(c=>c.level==='warn').length||'no'} thing${checks.filter(c=>c.level==='warn').length===1?'':'s'} to look at.`,checks,suggest}}
    return {};
  };
  call.limits=async()=>({maxPromptBytes:262144,tools:{maxCount:8},images:{maxCount:3,maxInputBytes:5e6,mediaTypes:['image/jpeg','image/png','image/webp']}});
  return call;
}

/* ---------- boot ---------- */
// Prototype: AI features use sample data everywhere. Set to false to use live Claude on the published site.
const PROTOTYPE=true;
AI.sample=mockSample();AI.images=true;AI.tools=true;AI.preview=true;document.documentElement.classList.add('ai');
saveQuote();footer();updateLoginBtn();go();
(async()=>{
  const use=window.claude&&typeof window.claude.use==='function'?window.claude.use.bind(window.claude):null;
  if(!use)return;
  AI.downloads=use('downloads').catch(()=>null);
  if(PROTOTYPE)return;
  const s=await use('sample').catch(()=>null);
  if(!s)return;
  AI.sample=s;AI.preview=false;
  try{const lim=await s.limits();AI.images=!!lim.images;AI.tools=!!lim.tools}catch(e){}
  go();
})();

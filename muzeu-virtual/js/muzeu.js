/* Muzeul Liceului Alexandru cel Bun — full istoric vibe: poartă + săli vii + dosar + sunet */
(function(){
'use strict';
const NR_RAME = 8;
const redus = matchMedia('(prefers-reduced-motion: reduce)').matches;

function hashId(s){
  let h = 0;
  for(let i = 0; i < s.length; i++){ h = (h * 33 + s.charCodeAt(i)) | 0; }
  return Math.abs(h);
}
function ramaPentru(o){ return (hashId(o.id) % NR_RAME) + 1; }
function poze(o){ return (o.imagini && o.imagini.length ? o.imagini : [o.imagine]); }
function roman(n){
  const t = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let s = '';
  for(const [v,r] of t){ while(n >= v){ s += r; n -= v; } }
  return s || 'I';
}
function codArticol(o){
  const i = MUZEU.obiecte.findIndex(x => x.id === o.id);
  return '#' + String(i + 1).padStart(5, '0');
}

/* ---- sunet de arhivă: acustic-cald, sintetizat WebAudio, fără fișiere ---- */
const Sunet = (function(){
  let ctx = null, master = null;
  let activ = (function(){
    try{
      const v = localStorage.getItem('muzeu-sunet');
      if(v !== null) return v === '1';
    }catch(e){}
    return !(MUZEU && MUZEU.muzeu && MUZEU.muzeu.sunet === false);
  })();
  function ac(){
    if(!ctx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return null;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = .5;
      const rev = ctx.createDelay(1); rev.delayTime.value = .16;
      const fb = ctx.createGain(); fb.gain.value = .25;
      const wet = ctx.createGain(); wet.gain.value = .3;
      master.connect(ctx.destination);
      master.connect(rev); rev.connect(fb); fb.connect(rev); rev.connect(wet); wet.connect(ctx.destination);
    }
    if(ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function partial(frec, dur, vol, cand){
    const c = ac(); if(!c) return;
    const t = c.currentTime + (cand || 0);
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = frec;
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + .008);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + .05);
  }
  function hartieZg(dur, vol, f0, f1, cand){
    const c = ac(); if(!c) return;
    const t0 = c.currentTime + (cand || 0);
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for(let i = 0; i < len; i++){ const w = Math.random() * 2 - 1; last = (last + .04 * w) / 1.04; d[i] = last * 3.2 * (1 - i / len); }
    const src = c.createBufferSource(); src.buffer = buf;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = .6;
    f.frequency.setValueAtTime(f0 || 1400, t0);
    f.frequency.exponentialRampToValueAtTime(f1 || 400, t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || .10, t0 + .03);
    g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(master); src.start(t0);
  }
  function thump(frec, dur, vol, cand){
    if(!activ || redus) return;
    try{
      const c = ac(); if(!c) return;
      const t = c.currentTime + (cand || 0);
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(frec, t);
      o.frequency.exponentialRampToValueAtTime(Math.max(30, frec * .55), t + dur);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + .012);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + dur + .05);
    }catch(e){}
  }
  function ok(){ return activ && !redus; }
  return {
    get activ(){ return activ; },
    comuta(){
      activ = !activ;
      try{ localStorage.setItem('muzeu-sunet', activ ? '1' : '0'); }catch(e){}
      return activ;
    },
    /* clopot de alamă: parțiale inarmonice cu stingere lungă */
    clopot(){
      if(!ok()) return;
      try{
        partial(523.25, 2.2, .10); partial(1244, 1.6, .045, .005);
        partial(1567, 1.3, .03, .008); partial(2093, 1.0, .018, .012);
        partial(261.6, 2.4, .05, .01);
      }catch(e){}
    },
    /* foșnet moale de hârtie, fără șuierat */
    hartie(){ if(!ok()) return; try{ hartieZg(.24, .11, 1500, 380); }catch(e){} },
    /* pași pe lemn: comozi, discreți */
    pas(){ thump(78, .16, .07); },
    /* sigiliu/pecete: bufnet moale */
    pecete(){ thump(150, .22, .08); thump(82, .3, .07, .04); },
    /* ușă grea de lemn: gliss descendent + frecare */
    usa(){
      if(!ok()) return;
      try{
        const c = ac(); if(!c) return;
        const t = c.currentTime;
        const o = c.createOscillator(), g = c.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(92, t);
        o.frequency.linearRampToValueAtTime(54, t + .9);
        const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 320;
        g.gain.setValueAtTime(.0001, t);
        g.gain.exponentialRampToValueAtTime(.035, t + .1);
        g.gain.exponentialRampToValueAtTime(.0001, t + 1.0);
        o.connect(f); f.connect(g); g.connect(master);
        o.start(t); o.stop(t + 1.05);
        hartieZg(.9, .03, 500, 180, .05);
        thump(60, .35, .06, .95);
      }catch(e){}
    }
  };
})();

/* praf subtil — culoarea se schimbă per sală */
const PrafViu = { culoare: '#ffe9b0' };
(function praf(){
  const c = document.getElementById('praf');
  if(!c || redus || !c.getContext) return;
  const x = c.getContext('2d');
  if(!x) return;
  const usorDinStart = matchMedia('(pointer:coarse)').matches || innerWidth < 700;
  if(usorDinStart) document.body.classList.add('usor');
  let W, H, P = [];
  function dim(){
    W = c.width = innerWidth; H = c.height = innerHeight;
    const n = usorDinStart ? 25 : 80;
    P = [];
    for(let i = 0; i < n; i++) P.push({x: Math.random()*W, y: Math.random()*H, r: .6 + Math.random()*1.8, v: .12 + Math.random()*.35, o: .15 + Math.random()*.4});
  }
  dim(); addEventListener('resize', dim);
  let cadre = 0, t0 = performance.now(), oprit = false;
  (function f(){
    if(oprit) return;
    x.clearRect(0, 0, W, H); x.fillStyle = PrafViu.culoare;
    for(const p of P){
      p.y -= p.v; p.x += Math.sin(p.y * .01) * .15;
      if(p.y < -4){ p.y = H + 4; p.x = Math.random() * W; }
      x.globalAlpha = p.o; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill();
    }
    x.globalAlpha = 1;
    cadre++;
    if(cadre === 210){
      const fps = cadre / ((performance.now() - t0) / 1000);
      if(fps < 25){ oprit = true; document.body.classList.add('usor'); x.clearRect(0, 0, W, H); return; }
    }
    requestAnimationFrame(f);
  })();
})();

const stepperEl = document.getElementById('stepper');
const pista = document.getElementById('car-pista');
const salon = document.getElementById('salon');
const fer = document.getElementById('fereastra');
let salaCurenta = MUZEU.sali[0].id;
let obiecte = [];
let imaginiVizon = [], idxVizon = 0;
let idx = 0;

/* ---- raion + sat (harta Moldovei) ---- */
let DATE_RAIOANE = (typeof RAIOANE !== 'undefined' && RAIOANE.raioane) ? RAIOANE.raioane : [];
let blocIstoric = false; /* true când aplicăm o stare din Back/Forward: URL-ul nu se rescrie */
let cerereRaion = 0; /* gardă contra click-urilor rapide pe raioane în timpul încărcării */
let raionCurent = 'chisinau';
let satCurent = null;
function raionInfo(id){ return DATE_RAIOANE.find(r => r.id === id) || null; }
function tipRaion(id){
  const r = raionInfo(id);
  if(r && r.tip === 'municipiu') return 'Municipiul';
  if(r && r.tip === 'autonomie') return 'Unitatea';
  return 'Raionul';
}
function numeRaion(id){ const r = raionInfo(id); return r ? r.nume : 'Chișinău'; }
function numeSat(rid, sid){
  const r = raionInfo(rid);
  const s = r && r.sate ? r.sate.find(x => x.id === sid) : null;
  return s ? s.nume : null;
}
function countSat(rid, sid){
  return MUZEU.obiecte.filter(o => (o.raion || 'chisinau') === rid && (!o.sat || o.sat === sid)).length;
}

function listaSala(id){
  return MUZEU.obiecte.filter(o =>
    o.sala === id &&
    (o.raion || 'chisinau') === raionCurent &&
    (!satCurent || !o.sat || o.sat === satCurent));
}

/* ---- router URL nou: ?home | ?raion[/sat] | ?DOS-00001 | ?…&dosar=DOS-00001 ----
 * La încărcare proaspătă se onorează doar dosarul; restul pornește la ?home. */
const PAGINA = 'index.html';
function parseURLNou(){
  if(window.__cms && window.__cms.parseQuery) return window.__cms.parseQuery(location.search);
  return {view:'home', raion:null, sat:null, dosar:null};
}
function dosarIdDe(o){ return String((o && (o.dosarId || o.id)) || '').toUpperCase(); }
function gasesteDosar(id){
  id = String(id || '').toUpperCase();
  return MUZEU.obiecte.find(o => dosarIdDe(o) === id) || null;
}
/* Așteaptă datele leneșe ale raionului (sate + dosare), apoi continuă. */
function asiguraDateRaion(rid, done){
  const r = raionInfo(rid);
  if(r && r._plin){ done(); return; }
  if(window.__cms && window.__cms.incarcaRaion){
    window.__cms.incarcaRaion(rid).then(function(){
      if(window.__muzeu) window.__muzeu.dateGata(rid);
      done();
    }).catch(function(){ done(); });
  } else done();
}
/* Cârlige pentru loaderul în etape (cms.js): re-randează ce e pe ecran. */
window.__muzeu = {
  dateGata(rid){
    if(rid !== raionCurent) return;
    randareSate();
    obiecte = listaSala(salaCurenta);
    idx = 0;
    randareCarusel();
    if(esteDeschis()) umpleFereastra();
    actualizeazaFooter();
  }
};

/* ---- stepper (cu buton înapoi la hartă) ---- */
function randareStepper(){
  stepperEl.innerHTML =
    `<button class="inapoi" id="btn-harta" title="Înapoi la harta Moldovei">← HARTA</button>` +
    MUZEU.sali.map(s =>
    `<a href="#sala=${s.id}" data-sala="${s.id}" class="${s.id === salaCurenta ? 'on' : ''}">${s.nume}</a>`
  ).join('');
  document.getElementById('btn-harta').addEventListener('click', () => { Sunet.pas(); intoarceLaHarta(); });
  stepperEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); Sunet.pas(); alegeSala(a.dataset.sala, 'push'); });
  });
  const on = stepperEl.querySelector('.on');
  if(on) on.scrollIntoView({block: 'nearest', inline: 'center'});
}

/* ---- footer viu: raion + sat (buton) ---- */
function actualizeazaFooter(){
  const fr = document.getElementById('f-raion');
  const chip = document.getElementById('sate-stare');
  const bs = document.getElementById('btn-sate');
  const ns = satCurent ? numeSat(raionCurent, satCurent) : null;
  if(fr) fr.textContent = tipRaion(raionCurent) + ' ' + numeRaion(raionCurent);
  if(chip) chip.textContent = ns ? ns : 'Toate satele';
  if(bs) bs.title = ns ? 'Schimbi satul (' + ns + ')' : 'Vezi satele raionului';
  document.title = (ns ? ns + ' · ' : '') + numeRaion(raionCurent) + ' — Muzeul Școlar';
}

/* ---- cartușul sălii ---- */
function randareCartus(){
  const s = MUZEU.sali.find(x => x.id === salaCurenta) || MUZEU.sali[0];
  const i = MUZEU.sali.findIndex(x => x.id === salaCurenta);
  const icon = document.getElementById('cartus-icon');
  const nume = document.getElementById('cartus-nume');
  const desc = document.getElementById('cartus-desc');
  const nr = document.getElementById('cartus-nr');
  if(icon) icon.textContent = s.icon || '◆';
  if(nume) nume.textContent = s.nume;
  if(desc) desc.textContent = s.descriere || '';
  if(nr) nr.textContent = 'SALA ' + roman(i + 1);
  document.body.dataset.sala = s.id;
  if(s.perete) document.body.style.setProperty('--perete', s.perete);
  if(s.lambriu) document.body.style.setProperty('--lambriu', s.lambriu);
  const prafuri = {
    'sala-documentelor': '#d8e8d5', 'sala-scolii': '#cfd8f0', 'sala-naturii': '#d8f0c8',
    'sala-mestesugurilor': '#ffc890', 'sala-gospodariei': '#ffe0a0', 'sala-marturiilor': '#e0c8e8'
  };
  PrafViu.culoare = prafuri[s.id] || '#ffe9b0';
  umpleModalSala(s, i);
}

/* ---- modal sala: detaliile sălii curente ---- */
function umpleModalSala(s, i){
  const icon = document.getElementById('ms-icon');
  const nume = document.getElementById('ms-nume');
  const nr = document.getElementById('ms-nr');
  const desc = document.getElementById('ms-descriere');
  const tipice = document.getElementById('ms-tipice');
  const contor = document.getElementById('ms-contor');
  const acum = document.getElementById('ms-acum');
  const invitatie = document.getElementById('ms-invitatie');
  if(!nume) return;
  if(icon) icon.textContent = s.icon || '◆';
  if(nume) nume.textContent = s.nume;
  if(nr) nr.textContent = 'SALA ' + roman(i + 1);
  if(desc) desc.textContent = s.descriere || '';
  if(tipice){
    tipice.innerHTML = (s.obiecte_tipice || []).map(t => `<li>${t}</li>`).join('') || '<li>—</li>';
  }
  const inSala = MUZEU.obiecte.filter(o => o.sala === s.id);
  if(contor) contor.textContent = inSala.length
    ? (inSala.length === 1 ? 'Un singur obiect te așteaptă aici:' : inSala.length + ' obiecte te așteaptă aici:')
    : 'Sala e încă goală — prima poveste poate fi a ta.';
  if(acum){
    acum.innerHTML = inSala.length
      ? inSala.map((o, k) => `<li data-obiect="${o.id}" role="button" tabindex="0">${o.titlu}</li>`).join('')
      : '<li class="ms-gol" style="cursor:default;border-style:dashed">Adaugă primul obiect prin butonul de pe hartă</li>';
  }
  if(invitatie) invitatie.textContent = s.invitatie || '';
}
function esteModalSalaDeschis(){ return document.body.classList.contains('modal-sala-deschis'); }
function deschideModalSala(){
  inchide();
  inchideSate();
  const m = document.getElementById('modal-sala');
  const f = document.getElementById('modal-sala-fundal');
  if(!m || !f || esteModalSalaDeschis()) return;
  Sunet.hartie();
  m.hidden = false; f.hidden = false;
  void m.offsetWidth;
  document.body.classList.add('modal-sala-deschis');
  const x = document.getElementById('modal-sala-inchide');
  if(x) x.focus({preventScroll:true});
}
function inchideModalSala(){
  if(!esteModalSalaDeschis()) return;
  document.body.classList.remove('modal-sala-deschis');
  const m = document.getElementById('modal-sala');
  const f = document.getElementById('modal-sala-fundal');
  setTimeout(() => {
    if(!esteModalSalaDeschis()){ if(m) m.hidden = true; if(f) f.hidden = true; }
  }, redus ? 0 : 320);
}
function leagaModalSala(){
  const cart = document.getElementById('cartus-sala');
  const x = document.getElementById('modal-sala-inchide');
  const f = document.getElementById('modal-sala-fundal');
  const acum = document.getElementById('ms-acum');
  if(cart){
    cart.addEventListener('click', () => { if(esteModalSalaDeschis()) inchideModalSala(); else deschideModalSala(); });
    cart.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); deschideModalSala(); } });
  }
  if(x) x.addEventListener('click', inchideModalSala);
  if(f) f.addEventListener('click', inchideModalSala);
  if(acum){
    acum.addEventListener('click', e => {
      const li = e.target.closest('li[data-obiect]');
      if(!li) return;
      const id = li.getAttribute('data-obiect');
      const k = obiecte.findIndex(o => o.id === id);
      if(k < 0) return;
      inchideModalSala();
      idx = k;
      randareCarusel();
      deschide();
    });
    acum.addEventListener('keydown', e => {
      const li = e.target.closest('li[data-obiect]');
      if(li && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); li.click(); }
    });
  }
}

/* ---- carusel ---- */
function etichetaFila(i, total){
  return 'FILA ' + roman(i + 1) + ' DIN ' + roman(total);
}
function cardHTML(o, i, total, clasa){
  const r = ramaPentru(o);
  return `<div class="cadru-card ${clasa}" data-i="${i}" role="button" tabindex="0" aria-label="${o.titlu}, ${etichetaFila(i, total)}">
    <div class="cadru rama-${r}">
      <span class="car-badge">${etichetaFila(i, total)}</span>
      <div class="paspartu">
        <img src="${poze(o)[0]}" alt="${o.titlu}" loading="lazy" decoding="async" fetchpriority="${clasa === 'centru' ? 'high' : 'low'}" draggable="false" onerror="this.src='https://picsum.photos/seed/${o.id}/600/500'">
        <div class="sticla"></div>
      </div>
      <div class="glare"></div>
    </div>
  </div>`;
}
/* ---- tilt 3D + glare pe rama centrală ---- */
const tiltFin = matchMedia('(pointer:fine)').matches && !redus;
function leagaTilt(){
  const card = pista.querySelector('.cadru-card.centru');
  const cadru = card && card.querySelector('.cadru');
  if(!card || !cadru || !tiltFin) return;
  const glare = cadru.querySelector('.glare');
  let rect = null, raf = 0, tx = 0, ty = 0, activ = false;
  function aplica(){
    raf = 0;
    if(!activ || !rect || !rect.width) return;
    const px = Math.max(0, Math.min(1, (tx - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (ty - rect.top) / rect.height));
    cadru.style.transform = `rotateX(${((0.5 - py) * 8).toFixed(2)}deg) rotateY(${((px - 0.5) * 10).toFixed(2)}deg) scale(1.02)`;
    cadru.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
    cadru.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
    if(glare) glare.style.opacity = '1';
  }
  card.addEventListener('pointerenter', e => {
    activ = true; tx = e.clientX; ty = e.clientY;
    rect = card.getBoundingClientRect();
    cadru.style.transition = 'transform 0s';
    if(!raf) raf = requestAnimationFrame(aplica);
  });
  card.addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    if(!rect) rect = card.getBoundingClientRect();
    if(!raf) raf = requestAnimationFrame(aplica);
  });
  card.addEventListener('pointerleave', () => {
    activ = false;
    if(raf){ cancelAnimationFrame(raf); raf = 0; }
    cadru.style.transition = 'transform .6s cubic-bezier(.2,.9,.25,1)';
    cadru.style.transform = '';
    if(glare) glare.style.opacity = '0';
  });
}
function randareCarusel(dir){
  const n = obiecte.length;
  if(!n){
    pista.innerHTML = '<div class="car-gol"><div class="car-gol-paspartu"><p class="car-gol-rand1">Nu există încă obiecte aici.</p><p class="car-gol-rand2">Alege alt sat sau adaugă primul exponat.</p></div></div>';
    document.getElementById('car-titlu').textContent = '';
    const mc0 = document.getElementById('mob-contor');
    if(mc0) mc0.textContent = '—';
    document.getElementById('btn-descopera').style.display = 'none';
    return;
  }
  document.getElementById('btn-descopera').style.display = '';
  idx = ((idx % n) + n) % n;
  if(!dir || redus) delete pista.dataset.dir;
  else pista.dataset.dir = dir > 0 ? 'stanga' : 'dreapta';
  const ant = obiecte[(idx - 1 + n) % n], cur = obiecte[idx], urm = obiecte[(idx + 1) % n];
  const ingust = innerWidth < 1100;
  pista.innerHTML =
    (ingust ? '' : cardHTML(ant, (idx - 1 + n) % n, n, 'lat')) +
    cardHTML(cur, idx, n, 'centru') +
    (ingust ? '' : cardHTML(urm, (idx + 1) % n, n, 'lat'));
  const titluEl = document.getElementById('car-titlu');
  titluEl.textContent = cur.titlu;
  if(dir && !redus && titluEl.animate){
    try{ titluEl.animate([{opacity: 0, transform: 'translateY(8px)'}, {opacity: 1, transform: 'none'}], {duration: 320, easing: 'cubic-bezier(.2,.9,.25,1)'}); }catch(e){}
  }
  const mc = document.getElementById('mob-contor');
  if(mc) mc.textContent = etichetaFila(idx, n);
  pista.querySelectorAll('.cadru-card').forEach(c => {
    const go = () => {
      if(Date.now() - ultimulSwipe < 500) return;
      const i = +c.dataset.i;
      if(i === idx) deschide();
      else { const d = (i === (idx + 1) % n) ? 1 : -1; idx = i; Sunet.hartie(); randareCarusel(d); if(esteDeschis()) umpleFereastra(); }
    };
    c.addEventListener('click', go);
    c.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(); } });
  });
  leagaTilt();
}

/* ---- dosar de arhivă ---- */
function esteDeschis(){ return document.body.classList.contains('deschis'); }
function actualizeazaBtnDosar(){
  const b = document.getElementById('btn-descopera');
  if(!b) return;
  b.textContent = esteDeschis() ? 'ÎNCHIDE DOSARUL' : 'DESCHIDE DOSARUL';
  b.setAttribute('aria-expanded', esteDeschis() ? 'true' : 'false');
}
function umpleFereastra(){
  const o = obiecte[idx];
  if(!o) return;
  const sala = MUZEU.sali.find(s => s.id === o.sala);
  const imgs = poze(o);
  document.getElementById('f-badge').textContent = sala ? sala.nume : '';
  const inv = document.getElementById('f-inv');
  if(inv) inv.textContent = codArticol(o);
  const st = document.getElementById('f-stampila');
  if(st) st.textContent = (o.perioada || '') + (o.an ? ' · Anul ' + o.an : '');
  document.getElementById('f-titlu').textContent = o.titlu;
  const mare = document.getElementById('f-mare');
  const fundal = document.getElementById('f-mare-fundal');
  mare.src = imgs[0]; mare.alt = o.titlu;
  if(fundal) fundal.style.backgroundImage = 'url("' + imgs[0] + '")';
  const afis = imgs.slice(0, 5);
  imaginiVizon = afis.slice(); idxVizon = 0;
  document.getElementById('f-mini').innerHTML = afis.map((u, k) =>
    `<span class="mini${k === 0 ? ' on' : ''}" data-k="${k}" role="button" tabindex="0" aria-label="Imagine ${k + 1} — ${o.titlu}"><span class="mini-fundal" style="background-image:url('${u}')"></span><img src="${u}" alt="Imagine ${k + 1} — ${o.titlu}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${o.id}/200/150'"></span>`
  ).join('');
  document.getElementById('f-mini').querySelectorAll('.mini').forEach(t => {
    const arata = () => {
      Sunet.hartie();
      idxVizon = +t.dataset.k;
      mare.src = afis[+t.dataset.k];
      if(fundal) fundal.style.backgroundImage = 'url("' + afis[+t.dataset.k] + '")';
      document.getElementById('f-mini').querySelectorAll('.mini').forEach(x => x.classList.remove('on'));
      t.classList.add('on');
    };
    t.addEventListener('click', arata);
    t.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); arata(); } });
  });
  const pv = document.getElementById('f-poveste-text');
  pv.textContent = '„' + (o.poveste || o.descriere_scurta || '') + '”';
  document.getElementById('f-poveste').classList.remove('deschis');
  const btnPv = document.getElementById('f-poveste-btn');
  btnPv.textContent = 'Citește toată descrierea ↓';
  const arataBtn = () => { btnPv.hidden = !(pv.scrollHeight > pv.clientHeight + 1); };
  requestAnimationFrame(arataBtn);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(arataBtn);
  document.getElementById('f-fisa').innerHTML =
    `<dt>Material</dt><dd>${o.material || '-'}</dd>` +
    `<dt>Dimensiuni</dt><dd>${o.dimensiuni || '-'}</dd>` +
    `<dt>Autor</dt><dd>${o.autor || '-'}</dd>` +
    `<dt>Locația obiectului</dt><dd>${o.locatie_fizica || '-'}</dd>`;
}
function deschide(){
  if(!obiecte.length) return;
  inchideSate();
  inchideModalSala();
  umpleFereastra();
  Sunet.hartie();
  const o = obiecte[idx];
  if(o && o.vedeta) setTimeout(() => Sunet.clopot(), 180);
  if(esteDeschis()) return;
  comutaDosarMare(false);
  fer.hidden = false;
  void fer.offsetWidth;
  document.body.classList.add('deschis');
  salon.classList.add('deschis');
  actualizeazaBtnDosar();
  document.getElementById('f-inchide').focus({preventScroll:true});
  if(innerWidth < 861){
    requestAnimationFrame(() => fer.scrollIntoView({behavior: redus ? 'auto' : 'smooth', block: 'nearest'}));
  }
  scrieURL('push', 'muzeu');
}
function inchide(){
  if(!esteDeschis()) return;
  Sunet.pecete();
  document.body.classList.remove('deschis');
  salon.classList.remove('deschis');
  actualizeazaBtnDosar();
  comutaDosarMare(false);
  inchideVizor(true);
  setTimeout(() => { if(!esteDeschis()) fer.hidden = true; }, redus ? 0 : 320);
  scrieURL('push');
}
function esteDosarMare(){ return document.body.classList.contains('dosar-mare'); }
function comutaDosarMare(forta){
  const mare = (typeof forta === 'boolean') ? forta : !esteDosarMare();
  if(mare && !esteDeschis()) return;
  const b = document.getElementById('f-mareste');
  const f = document.getElementById('fereastra-fundal');
  if(mare){
    if(f) f.hidden = false;
    document.body.classList.add('dosar-mare');
  } else {
    document.body.classList.remove('dosar-mare');
    setTimeout(() => { if(!esteDosarMare() && f) f.hidden = true; }, redus ? 0 : 320);
  }
  if(b){
    b.textContent = mare ? '❐' : '⛶';
    b.setAttribute('aria-expanded', mare ? 'true' : 'false');
    const et = mare ? 'Revino la panoul lateral' : 'Mărește dosarul';
    b.setAttribute('aria-label', et); b.title = et;
  }
  if(mare) Sunet.hartie();
}
function esteVizonDeschis(){ return document.body.classList.contains('vizor-deschis'); }
function arataVizon(){
  const n = imaginiVizon.length;
  if(!n) return;
  idxVizon = ((idxVizon % n) + n) % n;
  const img = document.getElementById('vizor-img');
  img.src = imaginiVizon[idxVizon];
  const o = obiecte[idx];
  img.alt = (o ? o.titlu + ' — ' : '') + 'Imagine ' + (idxVizon + 1);
  document.getElementById('vizor-caption').textContent =
    (o ? o.titlu + ' · ' : '') + 'Imagine ' + (idxVizon + 1) + ' din ' + n;
}
function deschideVizor(){
  if(!imaginiVizon.length) return;
  arataVizon();
  Sunet.hartie();
  document.getElementById('vizor').hidden = false;
  const f = document.getElementById('vizor-fundal');
  if(f) f.hidden = false;
  document.body.classList.add('vizor-deschis');
  document.getElementById('vizor-inchide').focus({preventScroll:true});
}
function inchideVizor(silent){
  if(!esteVizonDeschis()) return;
  if(!silent) Sunet.pecete();
  document.body.classList.remove('vizor-deschis');
  setTimeout(() => {
    if(!esteVizonDeschis()){
      document.getElementById('vizor').hidden = true;
      const f = document.getElementById('vizor-fundal');
      if(f) f.hidden = true;
    }
  }, redus ? 0 : 320);
  const cadru = document.getElementById('f-mare-cadru');
  if(cadru) cadru.focus({preventScroll:true});
}
function pasVizon(d){
  if(!esteVizonDeschis() || !imaginiVizon.length) return;
  idxVizon = (idxVizon + d + imaginiVizon.length) % imaginiVizon.length;
  Sunet.hartie();
  arataVizon();
}
/* ---- panoul satelor (stânga, oglinda dosarului) ---- */
const panSate = document.getElementById('sate');
function esteSateDeschis(){ return document.body.classList.contains('sate-deschis'); }
function randareSate(){
  const r = raionInfo(raionCurent);
  const titlu = document.getElementById('sate-titlu');
  const lista = document.getElementById('sate-lista');
  if(!r || !titlu || !lista) return;
  titlu.textContent = tipRaion(raionCurent) + ' ' + r.nume;
  const sate = r.sate || [];
  let html = `<button class="sat ${!satCurent ? 'on' : ''}" data-sat="">Toate satele<span class="sat-nr">${MUZEU.obiecte.filter(o => (o.raion || 'chisinau') === raionCurent).length}</span></button>`;
  html += sate.map(s =>
    `<button class="sat ${satCurent === s.id ? 'on' : ''}" data-sat="${s.id}">${s.nume}<span class="sat-nr">${countSat(raionCurent, s.id)}</span></button>`
  ).join('');
  lista.innerHTML = html;
  lista.querySelectorAll('.sat').forEach(b => {
    b.addEventListener('click', () => alegeSat(b.dataset.sat || null));
  });
}
function deschideSate(){
  inchide();
  inchideModalSala(); /* excludere reciprocă între cele trei ferestre */
  asiguraDateRaion(raionCurent, function(){
    randareSate();
    if(esteSateDeschis()) return;
    if(!panSate) return;
    Sunet.hartie();
    panSate.hidden = false;
    void panSate.offsetWidth;
    document.body.classList.add('sate-deschis');
    salon.classList.add('sate-deschis'); /* caruselul alunecă la dreapta, oglinda dosarului */
    const inc = document.getElementById('sate-inchide');
    if(inc) inc.focus({preventScroll:true});
  });
}
function inchideSate(){
  if(!esteSateDeschis()) return;
  document.body.classList.remove('sate-deschis');
  salon.classList.remove('sate-deschis');
  setTimeout(() => { if(!esteSateDeschis() && panSate) panSate.hidden = true; }, redus ? 0 : 320);
}
function alegeSat(sid){
  if(sid && !numeSat(raionCurent, sid)) sid = null;
  satCurent = sid;
  idx = 0;
  Sunet.hartie();
  obiecte = listaSala(salaCurenta);
  randareSate();
  randareCarusel();
  if(esteDeschis()) umpleFereastra();
  actualizeazaFooter();
  scrieURL('push');
}
function scrieURL(metoda, stare){
  /* stare: 'muzeu' | 'acasa' | undefined=autodetect (clasele se schimbă asincron la intrări/ieșiri) */
  let inMuzeu;
  if(stare === 'muzeu') inMuzeu = true;
  else if(stare === 'acasa') inMuzeu = false;
  else inMuzeu = document.body.classList.contains('poarta-deschisa');
  let u;
  if(inMuzeu && esteDeschis() && obiecte[idx]){
    u = PAGINA + '?' + raionCurent + (satCurent ? '/' + satCurent : '') + '&dosar=' + dosarIdDe(obiecte[idx]);
  } else if(inMuzeu){
    u = PAGINA + '?' + raionCurent + (satCurent ? '/' + satCurent : '');
  } else {
    u = PAGINA + '?home';
  }
  try{
    if(!blocIstoric && metoda === 'push') history.pushState(null, '', u);
    else history.replaceState(null, '', u);
  }catch(e){}
}

function pasul(d){
  if(!obiecte.length) return;
  idx = (idx + d + obiecte.length) % obiecte.length;
  Sunet.hartie();
  randareCarusel(d);
  if(esteDeschis()){ umpleFereastra(); scrieURL(); }
}

/* ---- alegere sală ---- */
function alegeSala(id, scrie){
  if(!MUZEU.sali.some(s => s.id === id)) id = MUZEU.sali[0].id;
  inchide();
  salaCurenta = id;
  obiecte = listaSala(id);
  idx = 0;
  randareStepper();
  randareCartus();
  randareCarusel();
  actualizeazaFooter();
  if(scrie) scrieURL(scrie === 'push' ? 'push' : 'replace');
}

/* ---- poarta-hartă: harta Moldovei; click raion pilot → ușile se deschid ---- */
function toastPoarta(msg){
  const t = document.getElementById('toast-poarta');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('arata');
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.remove('arata'), 2600);
}
function tipNume(r){
  if(!r) return 'Raionul';
  if(r.tip === 'municipiu') return 'Municipiul';
  if(r.tip === 'autonomie') return 'Unitatea';
  return 'Raionul';
}
function alegeRaion(id){
  const info = raionInfo(id);
  if(!info || info.stare !== 'pilot'){
    const g = document.querySelector('#harta-svg .raion[data-id="' + id + '"]');
    toastPoarta(tipNume(info) + ' ' + ((g && g.getAttribute('data-nume')) || id) + ' intră în curând în muzeu.');
    return;
  }
  const tichet = ++cerereRaion;
  asiguraDateRaion(id, function(){
    if(tichet !== cerereRaion) return; /* utilizatorul a ales deja alt raion între timp */
    raionCurent = id;
    satCurent = null;
    idx = 0;
    alegeSala(MUZEU.sali[0].id, false);
    randareSate();
    actualizeazaFooter();
    scrieURL('push', 'muzeu');
    intra();
  });
}
function intoarceLaHarta(){
  inchide();
  inchideSate();
  /* URL explicit ?home: clasele se șterg asincron, deci scrieURL() ar calcula greșit ?raion */
  try{
    if(!blocIstoric) history.pushState(null, '', PAGINA + '?home');
    else history.replaceState(null, '', PAGINA + '?home');
  }catch(e){}
  if(redus){
    document.body.classList.remove('poarta-deschisa', 'intrare-gata', 'usile-deschise', 'poarta-pleaca');
    document.getElementById('poarta').hidden = false;
      return;
  }
  document.body.classList.remove('poarta-deschisa', 'intrare-gata');
  Sunet.usa();
  setTimeout(() => {
    const p = document.getElementById('poarta');
    p.hidden = false;
    void p.offsetWidth;
    document.body.classList.remove('usile-deschise', 'poarta-pleaca');
      const mh = document.getElementById('harta-svg');
    if(mh) mh.focus({preventScroll:true});
  }, 60);
}
/* harta SVG din poartă: hover premium (mărire + plăcuță) + click raion */
function leagaHartaPoarta(){
  const svg = document.getElementById('harta-svg');
  if(!svg) return;
  const placuta = document.getElementById('harta-placuta');
  const parinte = svg.parentElement;
  function pozitioneaza(g){
    if(!placuta || !parinte) return;
    try{
      const t = g.querySelector('text');
      const r = (t || g).getBoundingClientRect();
      const pr = parinte.getBoundingClientRect();
      placuta.style.left = (r.left - pr.left + r.width / 2) + 'px';
      placuta.style.top = (r.top - pr.top) + 'px';
    }catch(e){}
  }
  function scoate(g){
    if(!placuta) return;
    placuta.textContent = g.getAttribute('data-nume') || '';
    placuta.classList.add('arata');
    pozitioneaza(g);
  }
  function ascunde(){
    if(!placuta) return;
    placuta.classList.remove('arata');
  }
  svg.querySelectorAll('.raion').forEach(g => {
    g.addEventListener('click', () => alegeRaion(g.getAttribute('data-id')));
    g.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); alegeRaion(g.getAttribute('data-id')); } });
    g.addEventListener('pointerenter', e => {
      /* pe touch nu arătăm plăcuța: tap-ul navighează direct */
      if(e.pointerType && e.pointerType !== 'mouse') return;
      scoate(g);
    });
    g.addEventListener('pointerleave', ascunde);
    g.addEventListener('focus', () => scoate(g));
    g.addEventListener('blur', ascunde);
  });
}
/* ---- butonul de contribuire (formularul vine în curând) ---- */
function leagaContribuie(){
  const b = document.getElementById('btn-contribuie');
  if(!b) return;
  b.addEventListener('click', () => {
    Sunet.hartie();
    toastPoarta('Mulțumim! Formularul de contribuire va fi disponibil în curând.');
  });
}
function leagaPoarta(sariDirect){
  const poarta = document.getElementById('poarta');
  if(!poarta) return;
  leagaHartaPoarta();
  leagaContribuie();
  leagaModalSala();
  let semnat = false;
  try{ semnat = sessionStorage.getItem('muzeu-intrat') === '1'; }catch(e){}
  if(sariDirect || semnat){
    document.body.classList.add('poarta-deschisa', 'intrare-gata');
    poarta.hidden = true;
    return;
  }
  setTimeout(() => {
    if(!poarta.hidden){
      const mh = document.getElementById('harta-svg');
      if(mh) mh.focus({preventScroll:true});
    }
  }, 400);
}
function intra(){
  const poarta = document.getElementById('poarta');
  if(!poarta) return;
  if(document.body.classList.contains('poarta-deschisa') || document.body.classList.contains('poarta-pleaca')) return;
  if(redus){
    document.body.classList.add('poarta-deschisa', 'intrare-gata');
    try{ sessionStorage.setItem('muzeu-intrat', '1'); }catch(e){}
    poarta.hidden = true;
    return;
  }
  document.body.classList.add('poarta-pleaca');
  Sunet.usa();
  setTimeout(() => { document.body.classList.add('usile-deschise'); }, 450);
  setTimeout(() => Sunet.clopot(), 1400);
  setTimeout(() => {
    document.body.classList.add('poarta-deschisa', 'intrare-gata');
    /* pleaca rămâne până se stinge overlay-ul — altfel harta reapare o fracțiune */
    try{ sessionStorage.setItem('muzeu-intrat', '1'); }catch(e){}
    setTimeout(() => {
      poarta.hidden = true;
      document.body.classList.remove('usile-deschise', 'poarta-pleaca');
    }, 700);
  }, 1650);
}

/* ---- buton sunet ---- */
function leagaSunet(){
  const b = document.getElementById('btn-sunet');
  const stare = document.getElementById('sunet-stare');
  if(!b) return;
  function desen(){
    b.setAttribute('aria-pressed', Sunet.activ ? 'true' : 'false');
    if(stare) stare.textContent = Sunet.activ ? 'SUNET: DA' : 'SUNET: NU';
  }
  desen();
  b.addEventListener('click', () => { Sunet.comuta(); desen(); if(Sunet.activ) Sunet.hartie(); });
}

/* ---- evenimente ---- */
document.getElementById('car-next').addEventListener('click', () => pasul(1));
document.getElementById('car-prev').addEventListener('click', () => pasul(-1));
document.getElementById('mob-next').addEventListener('click', () => pasul(1));
document.getElementById('mob-prev').addEventListener('click', () => pasul(-1));
document.getElementById('btn-descopera').addEventListener('click', () => { if(esteDeschis()) inchide(); else deschide(); });
document.getElementById('f-inchide').addEventListener('click', inchide);
document.getElementById('f-mareste').addEventListener('click', () => comutaDosarMare());
document.getElementById('fereastra-fundal').addEventListener('click', e => { e.stopPropagation(); comutaDosarMare(false); });
const cadruMare = document.getElementById('f-mare-cadru');
if(cadruMare){
  cadruMare.addEventListener('click', deschideVizor);
  cadruMare.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); deschideVizor(); } });
}
document.getElementById('vizor-inchide').addEventListener('click', () => inchideVizor());
document.getElementById('vizor-fundal').addEventListener('click', e => { e.stopPropagation(); inchideVizor(); });
document.getElementById('vizor-prev').addEventListener('click', () => pasVizon(-1));
document.getElementById('vizor-next').addEventListener('click', () => pasVizon(1));
document.getElementById('btn-sate').addEventListener('click', () => { if(esteSateDeschis()) inchideSate(); else deschideSate(); });
document.getElementById('sate-inchide').addEventListener('click', inchideSate);
document.getElementById('f-prev').addEventListener('click', () => pasul(-1));
document.getElementById('f-next').addEventListener('click', () => pasul(1));
document.getElementById('f-poveste-btn').addEventListener('click', () => {
  const pv = document.getElementById('f-poveste');
  const deschis = pv.classList.toggle('deschis');
  document.getElementById('f-poveste-btn').textContent = deschis ? 'Arată mai puțin ↑' : 'Citește toată descrierea ↓';
  Sunet.hartie();
});
addEventListener('keydown', e => {
  if(esteVizonDeschis() && e.key === 'ArrowRight'){ pasVizon(1); return; }
  if(esteVizonDeschis() && e.key === 'ArrowLeft'){ pasVizon(-1); return; }
  const poartaDeschisa = document.body.classList.contains('poarta-deschisa');
  if(e.key === 'Escape'){
    if(esteModalSalaDeschis()) inchideModalSala();
    else if(esteVizonDeschis()) inchideVizor();
    else if(esteDeschis() && esteDosarMare()) comutaDosarMare(false);
    else if(esteDeschis()) inchide();
    else if(esteSateDeschis()) inchideSate();
  }
  else if(e.key === 'ArrowRight' && !esteDeschis() && !esteModalSalaDeschis() && poartaDeschisa) pasul(1);
  else if(e.key === 'ArrowLeft' && !esteDeschis() && !esteModalSalaDeschis() && poartaDeschisa) pasul(-1);
});
let sx = null, ultimulSwipe = 0;
pista.addEventListener('pointerdown', e => { sx = e.clientX; });
pista.addEventListener('pointerup', e => {
  if(sx === null) return;
  const dx = e.clientX - sx; sx = null;
  if(Math.abs(dx) > 10) ultimulSwipe = Date.now();
  if(Math.abs(dx) > 45) pasul(dx < 0 ? 1 : -1);
});
addEventListener('resize', () => randareCarusel());

/* ---- click pe loc gol închide panoul activ (dosar, sate sau modal sală) ---- */
document.addEventListener('click', e => {
  if(!esteDeschis() && !esteSateDeschis() && !esteModalSalaDeschis()) return;
  const t = e.target;
  /* conținutul panourilor */
  if(t.closest && (t.closest('#fereastra') || t.closest('#sate') || t.closest('#modal-sala') || t.closest('#vizor'))) return;
  /* comutatoarele și acțiunile funcționale — nu sunt „loc gol” */
  if(t.closest && (t.closest('#btn-descopera') || t.closest('#btn-sate') || t.closest('#btn-sunet') ||
    t.closest('#btn-harta') || t.closest('.cadru-card') || t.closest('.stepper') || t.closest('#cartus-sala'))) return;
  if(esteModalSalaDeschis()) inchideModalSala();
  else if(esteDeschis()) inchide();
  else if(esteSateDeschis()) inchideSate();
});

/* ---- pornire (?home = harta; ?DOS-00001 = modalul dosarului) ----
 * Regula: la încărcare proaspătă se onorează DOAR dosarul.
 * Orice altceva (inclusiv refresh din browsing) pornește la ?home. */
function pornesteAcasa(){
  raionCurent = 'chisinau';
  satCurent = null;
  alegeSala(MUZEU.sali[0].id, false);
  randareSate();
  actualizeazaFooter();
  try{ history.replaceState(null, '', PAGINA + '?home'); }catch(e){}
  leagaPoarta(false);
}
function deschideDosarInitial(dosId){
  const o = gasesteDosar(dosId);
  if(!o){
    pornesteAcasa();
    setTimeout(() => toastPoarta('Dosarul ' + dosId + ' nu există sau nu e publicat.'), 600);
    return;
  }
  raionCurent = o.raion || 'chisinau';
  satCurent = o.sat || null;
  alegeSala(o.sala || MUZEU.sali[0].id, false);
  idx = Math.max(0, obiecte.findIndex(x => x === o));
  randareCarusel();
  randareSate();
  actualizeazaFooter();
  try{ history.replaceState(null, '', PAGINA + '?' + dosId); }catch(e){}
  leagaPoarta(true);
  setTimeout(() => { blocIstoric = true; deschide(); blocIstoric = false; }, 350);
}
/* ---- butonul Back/Forward al browserului ---- */
function aplicaIstoric(){
  const st = parseURLNou();
  inchideModalSala();
  if(st.view === 'home'){
    blocIstoric = true;
    if(esteDeschis()) inchide();
    if(esteSateDeschis()) inchideSate();
    intoarceLaHarta();
    blocIstoric = false;
    return;
  }
  const rid = (st.raion && raionInfo(st.raion) && raionInfo(st.raion).stare === 'pilot') ? st.raion : raionCurent;
  asiguraDateRaion(rid, function(){
    blocIstoric = true;
    try{
      const eraInMuzeu = document.body.classList.contains('poarta-deschisa');
      raionCurent = rid;
      satCurent = (st.sat && numeSat(rid, st.sat)) ? st.sat : null;
      idx = 0;
      obiecte = listaSala(salaCurenta);
      randareStepper();
      randareCartus();
      randareCarusel();
      randareSate();
      actualizeazaFooter();
      if(!eraInMuzeu) intra();
      if(st.dosar){
        const o = gasesteDosar(st.dosar);
        if(o){
          idx = Math.max(0, obiecte.findIndex(x => x === o));
          randareCarusel();
          if(!esteDeschis()) deschide();
          else { umpleFereastra(); scrieURL(); }
        } else if(esteDeschis()) inchide();
      } else if(esteDeschis()) inchide();
    } finally { blocIstoric = false; }
  });
}
addEventListener('popstate', aplicaIstoric);

(function start(){
  leagaSunet();
  actualizeazaBtnDosar();
  const boot = (window.__boot || {view:'home'});
  if(boot.view === 'dosar' && boot.dosar){
    deschideDosarInitial(String(boot.dosar).toUpperCase());
    return;
  }
  pornesteAcasa();
})();
})();

/* STHETIC · datos de maqueta + interacciones */
const { $, $$, money, toast, productArt, productCard } = UI;
const IMG = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
UI.init({ brand: 'depizone', waText: 'Hola STHETIC, quiero cotizar depilación láser', waBubble: '¿Cotizamos tus zonas? 💙' });
const cart = UI.Cart({ brand: 'depizone', freeShip: 300, shipCost: 0, extraLabel: 'Evaluación', freeLabel: 'un facial de regalo', installments: 6, title: 'Tu plan', checkoutLabel: 'Reservar y pagar', checkoutMsg: '¡Plan reservado! Te escribimos por WhatsApp para agendar 💙' });

/* ---------- Zonas (precio por sesión) ---------- */
const Z = {
  rostro: { n: 'Rostro completo', p: 89 }, bozo: { n: 'Bozo', p: 39 }, axilas: { n: 'Axilas', p: 59 }, brazos: { n: 'Brazos completos', p: 119 },
  abdomen: { n: 'Línea alba / abdomen', p: 69 }, bikini: { n: 'Bikini brasilero', p: 99 }, piernas: { n: 'Piernas completas', p: 159 }, mediasp: { n: 'Medias piernas', p: 99 },
  pecho: { n: 'Pecho', p: 99 }, nuca: { n: 'Nuca', p: 45 }, espalda: { n: 'Espalda completa', p: 149 }, gluteos: { n: 'Glúteos', p: 89 }, manos: { n: 'Manos y dedos', p: 39 }
};
const PLANS = [{ s: 1, d: 0, n: '1 sesión', sub: 'Prueba' }, { s: 6, d: .35, n: '6 sesiones', sub: 'Recomendado' }, { s: 8, d: .49, n: '8 sesiones', sub: 'Resultado total' }];
let sel = new Set(['axilas']), plan = 2, view = 'front', sex = 'f';

/* SVG del cuerpo: formas base + zonas clicables */
function bodySVG() {
  const w = sex === 'm' ? 1.1 : 1;
  const torsoW = 76 * w, tx = 100 - torsoW / 2;
  const base = `
    <ellipse class="body" cx="100" cy="42" rx="25" ry="31"/>
    <rect class="body" x="90" y="68" width="20" height="18" rx="6"/>
    <path class="body" d="M${tx} 92 Q100 80 ${tx + torsoW} 92 L${tx + torsoW - 4} ${sex === 'f' ? 160 : 175} Q${tx + torsoW + 6} 200 ${tx + torsoW - 2} 226 L${tx + 2} 226 Q${tx - 6} 200 ${tx + 4} ${sex === 'f' ? 160 : 175} Z"/>
    <rect class="body" x="${tx - 22}" y="90" width="20" height="150" rx="10"/>
    <rect class="body" x="${tx + torsoW + 2}" y="90" width="20" height="150" rx="10"/>
    <ellipse class="body" cx="${tx - 12}" cy="252" rx="10" ry="14"/><ellipse class="body" cx="${tx + torsoW + 12}" cy="252" rx="10" ry="14"/>
    <rect class="body" x="68" y="220" width="30" height="200" rx="14"/><rect class="body" x="102" y="220" width="30" height="200" rx="14"/>`;
  const zf = `
    <ellipse class="zone" data-z="rostro" cx="100" cy="40" rx="24" ry="29"/>
    <ellipse class="zone" data-z="bozo" cx="100" cy="58" rx="10" ry="4.5"/>
    <circle class="zone" data-z="axilas" cx="${tx + 6}" cy="100" r="9"/><circle class="zone" data-z="axilas" cx="${tx + torsoW - 6}" cy="100" r="9"/>
    <rect class="zone" data-z="brazos" x="${tx - 22}" y="112" width="20" height="128" rx="10"/><rect class="zone" data-z="brazos" x="${tx + torsoW + 2}" y="112" width="20" height="128" rx="10"/>
    ${sex === 'm' ? `<rect class="zone" data-z="pecho" x="${tx + 8}" y="100" width="${torsoW - 16}" height="44" rx="14"/>` : ''}
    <rect class="zone" data-z="abdomen" x="84" y="${sex === 'm' ? 150 : 132}" width="32" height="${sex === 'm' ? 44 : 62}" rx="12"/>
    <path class="zone" data-z="bikini" d="M76 202 L124 202 L112 232 Q100 240 88 232 Z"/>
    <ellipse class="zone" data-z="manos" cx="${tx - 12}" cy="252" rx="10" ry="14"/><ellipse class="zone" data-z="manos" cx="${tx + torsoW + 12}" cy="252" rx="10" ry="14"/>
    <rect class="zone" data-z="piernas" x="68" y="238" width="30" height="92" rx="14"/><rect class="zone" data-z="piernas" x="102" y="238" width="30" height="92" rx="14"/>
    <rect class="zone" data-z="mediasp" x="68" y="332" width="30" height="88" rx="14"/><rect class="zone" data-z="mediasp" x="102" y="332" width="30" height="88" rx="14"/>`;
  const zb = `
    <rect class="zone" data-z="nuca" x="88" y="62" width="24" height="22" rx="8"/>
    <path class="zone" data-z="espalda" d="M${tx + 4} 94 Q100 84 ${tx + torsoW - 4} 94 L${tx + torsoW - 8} 196 L${tx + 8} 196 Z"/>
    <rect class="zone" data-z="brazos" x="${tx - 22}" y="96" width="20" height="144" rx="10"/><rect class="zone" data-z="brazos" x="${tx + torsoW + 2}" y="96" width="20" height="144" rx="10"/>
    <path class="zone" data-z="gluteos" d="M72 200 L128 200 Q134 230 116 238 Q100 240 84 238 Q66 230 72 200 Z"/>
    <rect class="zone" data-z="piernas" x="68" y="242" width="30" height="88" rx="14"/><rect class="zone" data-z="piernas" x="102" y="242" width="30" height="88" rx="14"/>
    <rect class="zone" data-z="mediasp" x="68" y="332" width="30" height="88" rx="14"/><rect class="zone" data-z="mediasp" x="102" y="332" width="30" height="88" rx="14"/>`;
  const hair = view === 'back' ? `<path d="M75 30 Q100 0 125 30 Q128 56 118 64 L82 64 Q72 56 75 30Z" fill="#3b2a22"/>` : `<path d="M75 34 Q100 2 125 34 Q118 18 100 18 Q82 18 75 34Z" fill="#3b2a22"/>`;
  $('#bmSvg').innerHTML = base + (sex === 'f' ? hair.replace('fill', 'opacity=".95" fill') : hair) + (view === 'front' ? zf : zb);
  $$('#bmSvg .zone').forEach(z => z.classList.toggle('is-on', sel.has(z.dataset.z)));
}
const tip = $('#bmTip');
$('#bmSvg').addEventListener('mousemove', e => {
  const z = e.target.closest('.zone'); if (!z) return tip.style.opacity = 0;
  const r = $('.bm-stage').getBoundingClientRect();
  tip.style.left = (e.clientX - r.left + 14) + 'px'; tip.style.top = (e.clientY - r.top - 10) + 'px';
  tip.textContent = `${Z[z.dataset.z].n} · S/ ${Z[z.dataset.z].p}/sesión`; tip.style.opacity = 1;
});
$('#bmSvg').addEventListener('mouseleave', () => tip.style.opacity = 0);
$('#bmSvg').addEventListener('click', e => {
  const z = e.target.closest('.zone'); if (!z) return;
  const k = z.dataset.z; sel.has(k) ? sel.delete(k) : sel.add(k);
  if (sel.has(k)) toast(`${Z[k].n} agregada`, '✦');
  renderQuote();
});
$('#segView').addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (!b) return; view = b.dataset.v; $$('#segView button').forEach(x => x.classList.toggle('is-on', x === b)); bodySVG(); });
$('#segSex').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; sex = b.dataset.s; $$('#segSex button').forEach(x => x.classList.toggle('is-on', x === b)); bodySVG(); });

function calc() {
  const base = [...sel].reduce((a, k) => a + Z[k].p, 0);
  const pl = PLANS[plan];
  const multi = sel.size >= 4 ? .1 : sel.size >= 2 ? .05 : 0;
  const full = base * pl.s;
  const total = Math.round(full * (1 - pl.d) * (1 - multi));
  return { base, full, total, multi, pl };
}
function renderQuote() {
  bodySVG();
  $('#bmCount').textContent = sel.size;
  $('#qZones').innerHTML = sel.size ? [...sel].map(k => `<span class="qz">${Z[k].n}<button data-rmz="${k}" aria-label="Quitar">✕</button></span>`).join('') : '<small style="color:var(--muted)">Aún no eliges zonas. Toca el cuerpo 👈</small>';
  const c = calc();
  $('#plans').innerHTML = PLANS.map((p, i) => `<button class="plan ${i === plan ? 'is-on' : ''}" data-plan="${i}">${p.d ? `<span class="save">-${p.d * 100}%</span>` : ''}<b>${p.n}</b><small>${p.sub}</small></button>`).join('');
  $('#multi').innerHTML = c.multi ? `🎉 ¡Descuento multizona aplicado! <b>-${c.multi * 100}% extra</b> por elegir ${sel.size} zonas.` : `💡 Elige <b>${2 - sel.size} zona(s) más</b> y obtén 5% extra (10% desde 4 zonas).`;
  if (sel.size >= 2 && sel.size < 4) $('#multi').innerHTML += ` Agrega <b>${4 - sel.size} más</b> para llegar a -10%.`;
  $('#qTotal').textContent = 'S/ ' + c.total.toLocaleString('es-PE');
  $('#qOld').textContent = c.full > c.total ? 'S/ ' + c.full.toLocaleString('es-PE') : '';
  $('#qCuota').textContent = c.total ? `· 6 cuotas de S/ ${(c.total / 6).toFixed(0)}` : '';
}
$('#qZones').addEventListener('click', e => { const b = e.target.closest('[data-rmz]'); if (b) { sel.delete(b.dataset.rmz); renderQuote(); } });
$('#plans').addEventListener('click', e => { const b = e.target.closest('[data-plan]'); if (b) { plan = +b.dataset.plan; renderQuote(); } });
$('#qAdd').addEventListener('click', () => {
  if (!sel.size) return toast('Selecciona al menos una zona', '👆');
  const c = calc();
  cart.add({ id: 'plan-' + [...sel].sort().join('-') + '-' + plan, name: `Láser · ${[...sel].map(k => Z[k].n).join(', ')}`, brand: 'STHETIC', variant: c.pl.n, price: c.total, shape: 'device', c1: '#bff0ff', c2: '#0aa5e8', bg: '#eaf7fd' });
});
renderQuote();

/* ---------- Hero: zona rápida ---------- */
const HERO = ['axilas', 'bozo', 'bikini', 'piernas', 'rostro', 'espalda'];
let hz = 'axilas';
function renderHero() {
  $('#heroZones').innerHTML = HERO.map(k => `<button class="zp ${k === hz ? 'is-on' : ''}" data-hz="${k}">${Z[k].n}</button>`).join('');
  const per = Math.round(Z[hz].p * .51 * 1.6);
  $('#heroPrice').textContent = 'S/ ' + Math.round(Z[hz].p * .51 + 19);
  $('#heroOld').textContent = 'S/ ' + Math.round(Z[hz].p + 37);
}
$('#heroZones').addEventListener('click', e => { const b = e.target.closest('[data-hz]'); if (b) { hz = b.dataset.hz; renderHero(); } });
$('#heroAdd').addEventListener('click', () => { const p = +$('#heroPrice').textContent.replace('S/ ', ''); cart.add({ id: 'hero-' + hz, name: `Pack 8 sesiones · ${Z[hz].n}`, brand: 'STHETIC', price: p * 8, shape: 'device', c1: '#bff0ff', c2: '#0aa5e8', bg: '#eaf7fd' }); });
renderHero();

/* ---------- Servicios ---------- */
const SVC = [
  ['⚡', 'Depilación Láser', 'Diodo triple onda para todo tipo de piel.', 'Desde S/ 39'],
  ['✨', 'Blanqueamiento Láser', 'Axilas, entrepierna, codos y zona íntima.', 'Desde S/ 137'],
  ['🌀', 'Corporal 360', 'Exfoliación, hidratación y reafirmación.', 'Desde S/ 180'],
  ['💎', 'Hollywood Peel', 'Carbon peel para poros y luminosidad.', 'Desde S/ 189'],
  ['💧', 'Faciales BLUESKIN', 'Limpieza profunda y protocolos de glow.', 'Desde S/ 120']
];
$('#services').innerHTML = SVC.map((s, i) => `<a href="#promos" class="svc" data-reveal data-delay="${i * 80}"><div class="ic">${s[0]}</div><h4>${s[1]}</h4><p>${s[2]}</p><span>${s[3]} →</span></a>`).join('');

/* ---------- Promos (tratamientos como productos) ---------- */
const T = (id, name, price, old, tag, c1, c2, shape = 'device') => ({ id, brand: 'STHETIC', name, price, old, shape, c1, c2, bg: '#eef8fd', rating: 4.9, reviews: 120 + id.length * 37, tags: tag ? [{ t: tag, c: 'tag--pri' }] : [] });
const PROMOS = [
  T('t1', 'Depilación Láser – Axilas (8 ses.)', 392, 768, 'Más pedido', '#bff0ff', '#0aa5e8'),
  T('t2', 'Depilación Láser – Bikini Brasilero', 330, null, 'Destacado', '#d9d2ff', '#7b61ff'),
  T('t3', 'Depilación Láser – Piernas Completas', 450, 620, 'Promo', '#bff0ff', '#0574a8'),
  T('t4', 'Blanqueamiento Láser – Zona Íntima', 870, 930, null, '#ffe0ef', '#e0478a'),
  T('t5', 'Hollywood Peel – Renovación Facial', 189, 240, 'Nuevo', '#222', '#555'),
  T('t6', 'Blanqueamiento Láser – Axilas', 137, 155, null, '#ffe0ef', '#e0478a'),
  T('t7', 'Exfoliación Corporal – Full Body', 220, null, null, '#d6f5e6', '#1fa971'),
  T('t8', 'Limpieza Facial Profunda', 120, 150, 'Recomendado', '#dff6ff', '#29a3d6')
];
$('#promoRail').innerHTML = PROMOS.map(p => productCard(p, cart)).join('');

/* ---------- Productos BLUESKIN ---------- */
const PRODS = [
  { id: 'b1', brand: 'BLUESKIN', name: 'Gel Calmante Post Láser Aloe 200 ml', price: 49, cat: 'post', shape: 'tube', c1: '#d9f6ff', c2: '#0aa5e8', bg: '#eef9ff', rating: 4.9, reviews: 812, tags: [{ t: 'Top', c: 'tag--pri' }] },
  { id: 'b2', brand: 'BLUESKIN', name: 'Protector Solar Invisible SPF50+', price: 69, old: 85, shape: 'tube', c1: '#fff1c4', c2: '#0aa5e8', bg: '#fffaea', rating: 4.8, reviews: 540 },
  { id: 'b3', brand: 'BLUESKIN', name: 'Sérum Aclarante Niacinamida 10%', price: 89, shape: 'dropper', c1: '#e4ddff', c2: '#7b61ff', bg: '#f4f1ff', rating: 4.8, reviews: 390, tags: [{ t: 'Nuevo', c: 'tag--new' }] },
  { id: 'b4', brand: 'BLUESKIN', name: 'Exfoliante Corporal Anti Vellos Encarnados', price: 59, old: 72, shape: 'jar', c1: '#d6f5e6', c2: '#1fa971', bg: '#eefbf4', rating: 4.7, reviews: 266 },
  { id: 'b5', brand: 'BLUESKIN', name: 'Agua Termal Calmante 150 ml', price: 45, shape: 'bottle', c1: '#dff6ff', c2: '#29a3d6', bg: '#effaff', rating: 4.7, reviews: 198 },
  { id: 'b6', brand: 'BLUESKIN', name: 'Crema Blanqueadora Zonas Íntimas', price: 79, old: 99, shape: 'tube', c1: '#ffe0ef', c2: '#e0478a', bg: '#fff1f7', rating: 4.6, reviews: 455 },
  { id: 'b7', brand: 'BLUESKIN', name: 'Kit Post Láser: gel + SPF + exfoliante', price: 149, old: 177, shape: 'jar', c1: '#bff0ff', c2: '#062538', bg: '#eaf7fd', rating: 5, reviews: 132, tags: [{ t: 'Kit', c: 'tag--pri' }] },
  { id: 'b8', brand: 'BLUESKIN', name: 'Desodorante Sin Aluminio Sensitive', price: 32, shape: 'stick', c1: '#f2f2f2', c2: '#0aa5e8', bg: '#f6fbfe', rating: 4.5, reviews: 220 }
];
UI.quickView([...PROMOS, ...PRODS], cart, { shipNote: 'Agenda tu primera sesión al confirmar · 6 cuotas sin intereses', defaultDesc: 'Protocolo realizado por especialistas certificadas con láser diodo triple onda y enfriamiento zafiro.' });
$('#prodGrid').innerHTML = PRODS.map(p => productCard(p, cart)).join('');

/* ---------- Calculadora ---------- */
const FT = ['#f7e1d0', '#eccab0', '#d9a882', '#b98058', '#8c5737', '#5b3621'];
let ft = 2;
const zonesCalc = Object.entries(Z);
$('#calcZone').innerHTML = zonesCalc.map(([k, z]) => `<option value="${k}">${z.n}</option>`).join('');
$('#calcZone').value = 'axilas';
function renderCalc() {
  $('#fototipos').innerHTML = FT.map((c, i) => `<button class="ft ${i === ft ? 'is-on' : ''}" style="background:${c};color:${i > 3 ? 'rgba(255,255,255,.8)' : ''}" data-ft="${i}">${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</button>`).join('');
  const g = +$('#grosor').value, zk = $('#calcZone').value;
  const ses = Math.min(10, 5 + (g === 3 ? 2 : g === 1 ? 0 : 1) + (ft >= 4 ? 1 : 0) + (['rostro', 'bozo'].includes(zk) ? 2 : 0));
  $('#cSes').textContent = ses;
  $('#sessBar').innerHTML = Array.from({ length: 10 }, (_, i) => `<span class="${i < ses ? 'on' : ''}"></span>`).join('');
  $('#cTxt').innerHTML = `Para <b>${Z[zk].n.toLowerCase()}</b> con fototipo <b>${['I', 'II', 'III', 'IV', 'V', 'VI'][ft]}</b> y vello <b>${['fino', 'medio', 'grueso'][g - 1]}</b>, cada 4–6 semanas. Precio estimado: <b>S/ ${Math.round(Z[zk].p * ses * .6)}</b> con descuento de pack.`;
  $('#cAdd').onclick = () => cart.add({ id: 'calc-' + zk + ses, name: `${ses} sesiones · ${Z[zk].n}`, brand: 'STHETIC', price: Math.round(Z[zk].p * ses * .6), shape: 'device', c1: '#bff0ff', c2: '#7b61ff' });
}
$('#fototipos').addEventListener('click', e => { const b = e.target.closest('[data-ft]'); if (b) { ft = +b.dataset.ft; renderCalc(); } });
$('#grosor').addEventListener('input', renderCalc);
$('#calcZone').addEventListener('change', renderCalc);
renderCalc();

/* ---------- Antes / después ---------- */
const BA = [['1518611012118-696072aa579a', 'Piernas completas', '6 sesiones'], ['1544005313-94ddf0286df2', 'Bozo y rostro', '8 sesiones'], ['1519823551278-64ac92734fb1', 'Espalda', '6 sesiones']];
$('#baRow').innerHTML = BA.map((b, i) => `<div data-reveal data-delay="${i * 120}" style="background:var(--surface);border-radius:var(--radius);padding:12px;border:1px solid var(--line)">
  <div class="ba"><div class="ba__img ba__img--before" style="background-image:url('${IMG(b[0])}')"></div><div class="ba__img ba__img--after" style="background-image:url('${IMG(b[0])}')"></div><span class="ba__lbl ba__lbl--l">ANTES</span><span class="ba__lbl ba__lbl--r">DESPUÉS</span><div class="ba__handle"></div></div>
  <div style="display:flex;justify-content:space-between;padding:14px 6px 4px"><b>${b[1]}</b><span class="tag">${b[2]}</span></div></div>`).join('');

/* ---------- Sedes ---------- */
const SEDES = [['Miraflores', 'Av. José Pardo 610', '🌊', true], ['San Isidro', 'Av. Javier Prado Este 480', '🏙️', true], ['Surco', 'C.C. Jockey Plaza, 2do piso', '🛍️', true], ['San Miguel', 'C.C. Plaza San Miguel', '🎡', false], ['Los Olivos', 'C.C. MegaPlaza, Local 214', '🌳', true], ['Arequipa', 'C.C. Real Plaza Cayma', '🌋', true]];
$('#sedesGrid').innerHTML = SEDES.slice(0, 4).concat(SEDES.slice(4)).map((s, i) => `<div class="sede-c" data-reveal data-delay="${i * 60}"><div class="sede-c__top">${s[2]}<span class="open"><span class="dot-live" style="${s[3] ? '' : 'background:#e0475f'}"></span>${s[3] ? 'Abierto ahora' : 'Cierra pronto'}</span></div>
  <div class="sede-c__body"><b>STHETIC ${s[0]}</b><small>${s[1]}</small><small>Lun–Sáb 9:00–21:00 · Dom 10:00–18:00</small><a href="https://wa.me/51943387184" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700;margin-top:6px">Agendar aquí →</a></div></div>`).join('');

/* ---------- FAQ ---------- */
const FAQ = [
  ['¿Duele la depilación láser?', 'Nuestro láser diodo cuenta con enfriamiento zafiro a -4 °C. La mayoría de clientas siente solo un leve calor o cosquilleo.'],
  ['¿Cada cuánto son las sesiones?', 'Cada 4 a 6 semanas en el cuerpo y cada 3 a 4 semanas en el rostro, según la fase de crecimiento del vello.'],
  ['¿Puedo hacerlo si tengo piel morena?', 'Sí. La triple onda (755, 808 y 1064 nm) es segura para todos los fototipos, del I al VI.'],
  ['¿Qué cuidados debo tener después?', 'Evita el sol directo 48 h, usa protector SPF50 y aplica gel calmante BLUESKIN. No uses cera ni pinzas entre sesiones.'],
  ['¿Puedo pagar en cuotas?', 'Sí, hasta 6 cuotas sin intereses con tarjetas participantes, además de Yape y Plin.']
];
$('#faq').innerHTML = FAQ.map((f, i) => `<details ${i === 0 ? 'open' : ''}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');

UI.socialProof([
  { who: 'Camila de Miraflores', what: 'separó <b>Axilas · 8 sesiones</b>', when: 'hace 4 min', art: productArt(PROMOS[0]) },
  { who: 'Renzo de Surco', what: 'reservó <b>Espalda completa</b>', when: 'hace 9 min', art: productArt(PROMOS[2]) },
  { who: 'Mafer de San Borja', what: 'compró <b>Kit Post Láser</b>', when: 'hace 15 min', art: productArt(PRODS[6]) }
]);
UI.crossSell($('#cross'), 'depizone');
UI.Group.onChange(() => UI.crossSell($('#cross'), 'depizone'));
UI.reveal();

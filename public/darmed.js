/* IRRADIA · datos de maqueta + interacciones */
const { $, $$, money, toast, productArt, productCard } = UI;
const IMG = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

UI.init({ brand: 'darmed', whatsapp: false });

/* ---------- Tratamientos ---------- */
const AREAS = {
  facial: { label: 'Facial', img: '1570172619644-dfd03ed5d881', items: [
    { n: 'Toxina Botulínica', d: 'Suaviza líneas de expresión en frente, entrecejo y patas de gallo con un resultado natural y descansado.', time: '30 min', ses: '1 sesión', rec: 'Inmediata', price: 690, old: 850, tag: 'Más pedido', res: 2 },
    { n: 'Ácido Hialurónico', d: 'Relleno de labios, ojeras y surcos para recuperar volumen e hidratación profunda.', time: '45 min', ses: '1 sesión', rec: '24 h', price: 1150, tag: 'Premium', res: 1 },
    { n: 'Armonización Facial', d: 'Diseño integral del rostro: mentón, mandíbula, pómulos y perfil con técnicas combinadas.', time: '90 min', ses: '1–2 sesiones', rec: '48 h', price: 2490, old: 3200, tag: '-22%', res: 2 },
    { n: 'Bioestimuladores de colágeno', d: 'Sculptra y Radiesse para estimular tu propio colágeno y mejorar la firmeza a largo plazo.', time: '45 min', ses: '2–3 sesiones', rec: '24 h', price: 1590, tag: 'Nuevo', res: 4 },
    { n: 'Peeling químico', d: 'Renueva la piel, unifica el tono y reduce manchas con ácidos de grado médico.', time: '40 min', ses: '3–4 sesiones', rec: '3–5 días', price: 280, res: 3 },
    { n: 'Hydrafacial', d: 'Limpieza profunda, exfoliación e hidratación en un solo paso. Glow instantáneo.', time: '50 min', ses: 'Mensual', rec: 'Inmediata', price: 350, old: 420, tag: 'Glow', res: 1 },
    { n: 'Cicatrices de acné', d: 'Combinación de microneedling, láser y subcisión para alisar la textura de la piel.', time: '60 min', ses: '4–6 sesiones', rec: '2–3 días', price: 420, res: 4 },
    { n: 'Tratamiento de manchas', d: 'Protocolo despigmentante para melasma, lentigos y manchas post-inflamatorias.', time: '45 min', ses: '4 sesiones', rec: '1–2 días', price: 320, res: 3 }
  ]},
  corporal: { label: 'Corporal', img: '1519823551278-64ac92734fb1', items: [
    { n: 'Reducción de medidas', d: 'Radiofrecuencia, cavitación y lipoláser para moldear abdomen, cintura y piernas.', time: '60 min', ses: '8 sesiones', rec: 'Inmediata', price: 890, old: 1200, tag: 'Pack', res: 3 },
    { n: 'Reafirmación corporal', d: 'Tecnología de radiofrecuencia multipolar que tensa y mejora la calidad de la piel.', time: '50 min', ses: '6 sesiones', rec: 'Inmediata', price: 720, res: 3 },
    { n: 'Celulitis', d: 'Protocolo combinado de ondas de choque y mesoterapia para piel de naranja.', time: '45 min', ses: '8 sesiones', rec: 'Inmediata', price: 680, tag: 'Top', res: 3 },
    { n: 'Drenaje linfático', d: 'Masaje manual especializado para desinflamar, eliminar toxinas y mejorar la circulación.', time: '60 min', ses: '10 sesiones', rec: 'Inmediata', price: 120, res: 1 },
    { n: 'Post-operatorio', d: 'Acompañamiento tras lipoescultura y abdominoplastía para mejores resultados.', time: '60 min', ses: '10–15 sesiones', rec: 'Inmediata', price: 1100, res: 2 },
    { n: 'Estrías', d: 'Microneedling y plasma rico en plaquetas para mejorar color y profundidad.', time: '45 min', ses: '5 sesiones', rec: '2 días', price: 450, res: 4 }
  ]},
  capilar: { label: 'Capilar', img: '1521590832167-7bcbfaa6381f', items: [
    { n: 'Plasma rico en plaquetas', d: 'Estimula el folículo con tus propios factores de crecimiento para frenar la caída.', time: '50 min', ses: '3–4 sesiones', rec: 'Inmediata', price: 390, old: 480, tag: 'Top', res: 3 },
    { n: 'Mesoterapia capilar', d: 'Cóctel de vitaminas, biotina y minoxidil aplicado directamente en el cuero cabelludo.', time: '30 min', ses: '6 sesiones', rec: 'Inmediata', price: 260, res: 3 },
    { n: 'Microneedling capilar', d: 'Activa la regeneración y mejora la absorción de activos en zonas de menor densidad.', time: '40 min', ses: '4 sesiones', rec: '24 h', price: 300, res: 3 },
    { n: 'Láser capilar LLLT', d: 'Fotobiomodulación de baja intensidad para fortalecer y engrosar la fibra capilar.', time: '25 min', ses: '12 sesiones', rec: 'Inmediata', price: 640, tag: 'Nuevo', res: 4 },
    { n: 'Diagnóstico tricológico', d: 'Tricoscopía digital para identificar el tipo de alopecia y diseñar tu tratamiento.', time: '30 min', ses: '1 sesión', rec: '—', price: 0, tag: 'Gratis', res: 1 }
  ]}
};
let area = 'facial', tIdx = 0;
function renderAreas() {
  $('#areaTabs').innerHTML = Object.entries(AREAS).map(([k, a]) => `<button class="chip ${k === area ? 'is-active' : ''}" data-area="${k}" aria-pressed="${k === area}">${a.label}</button>`).join('');
  $('#tList').innerHTML = AREAS[area].items.map((t, i) => `<button class="titem ${i === tIdx ? 'is-active' : ''}" data-t="${i}" aria-pressed="${i === tIdx}"><div><b>${t.n}</b><small>${t.time} · ${t.ses}</small></div><span class="from">${t.price ? 'S/ ' + t.price : 'Gratis'}</span></button>`).join('');
  const t = AREAS[area].items[tIdx];
  const steps = ['Día 1', 'Semana 1', 'Mes 1', 'Mes 3'];
  $('#tDetail').innerHTML = `<div class="tdetail" key="${area + tIdx}">
    <div class="tdetail__img"><img src="${IMG(AREAS[area].img, 900)}" alt="${t.n}">${t.tag ? `<span class="tag tag--pri">${t.tag}</span>` : ''}</div>
    <div class="tdetail__body">
      <span class="eyebrow">${AREAS[area].label}</span>
      <h3>${t.n}</h3><p>${t.d}</p>
      <div class="specs"><div><small>Duración</small><b>${t.time}</b></div><div><small>Sesiones</small><b>${t.ses}</b></div><div><small>Recuperación</small><b>${t.rec}</b></div></div>
      <div><small style="font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)">Resultados visibles</small>
        <div class="timeline" style="margin-top:8px">${steps.map((_, i) => `<span class="${i < t.res ? 'on' : ''}"></span>`).join('')}</div>
        <div class="tl-labels">${steps.map(s => `<span>${s}</span>`).join('')}</div></div>
      <div class="tdetail__price"><div><small style="color:var(--muted)">Desde</small><br><b>${t.price ? 'S/ ' + t.price : 'Gratis'}</b> ${t.old ? `<s style="color:var(--muted)">S/ ${t.old}</s>` : ''}</div>
        <div style="display:flex;gap:8px"><button class="btn btn--ghost btn--sm" data-plan="${t.n}">♡ Guardar</button><a href="#reservar" class="btn btn--sm" data-book="${t.n}">Reservar</a></div></div>
    </div></div>`;
}
function selectArea(event) {
  const control = event.target.closest('[data-area]');
  if (!control || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (area !== control.dataset.area) {
    area = control.dataset.area;
    tIdx = 0;
    renderAreas();
  }
  if (control.tagName === 'A') event.preventDefault();
  const tab = $(`#areaTabs [data-area="${area}"]`);
  tab.focus({ preventScroll: true });
  if (control.tagName === 'A') $('#tratamientos').scrollIntoView();
}
const gallery = $('#careOptions');
const galleryScenes = {
  facial: { title: 'Piel y <em>armonización.</em>', description: 'Explora opciones de cuidado facial, desde limpieza e hidratación hasta procedimientos de armonización.', action: 'Ver tratamientos faciales', topics: ['Limpieza facial', 'Hidratación', 'Armonización'] },
  corporal: { title: 'Cuidado del <em>contorno corporal.</em>', description: 'Consulta opciones para firmeza, contorno, estrías y cuidado posoperatorio.', action: 'Ver tratamientos corporales', topics: ['Firmeza', 'Contorno', 'Cuidado posoperatorio'] },
  capilar: { title: 'Cuidado desde <em>la raíz.</em>', description: 'Conoce la evaluación del cuero cabelludo y las opciones para la caída o pérdida de densidad.', action: 'Ver tratamientos capilares', topics: ['Cuero cabelludo', 'Caída del cabello', 'Densidad'] }
};
gallery.addEventListener('click', event => {
  const link = event.target.closest('[data-scene-link]');
  if (!link) {
    selectArea(event);
    return;
  }
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const key = link.dataset.sceneLink;
  if (key === gallery.dataset.scene) return;
  const next = galleryScenes[key];
  $('.care-gallery__nav [aria-current]', gallery).removeAttribute('aria-current');
  link.setAttribute('aria-current', 'true');
  $('#care-description').innerHTML = `<h3>${next.title}</h3><p>${next.description}</p>
    <ul class="care-gallery__topics" aria-label="Opciones en esta área">${next.topics.map(topic => `<li>${topic}</li>`).join('')}</ul>`;
  const action = $('[data-area]', gallery);
  action.dataset.area = key;
  action.textContent = next.action;
  gallery.dataset.scene = key;
});
$('#areaTabs').addEventListener('click', selectArea);
$('#heroAreas').addEventListener('click', selectArea);
$('#tList').addEventListener('click', event => {
  const control = event.target.closest('[data-t]');
  if (!control || tIdx === Number(control.dataset.t)) return;
  tIdx = Number(control.dataset.t);
  renderAreas();
  $(`#tList [data-t="${tIdx}"]`).focus({ preventScroll: true });
});
$('#tDetail').addEventListener('click', e => {
  const p = e.target.closest('[data-plan]'); if (p) toast(`<b>${p.dataset.plan}</b> guardado en tu plan`, '♡');
  const b = e.target.closest('[data-book]'); if (b) { $('#bTreat').value = b.dataset.book; updateSummary(); }
});
renderAreas();

/* Mega menú */
$('#megaMenu').innerHTML = Object.values(AREAS).map(a => `<div><h5>${a.label.toUpperCase()}</h5><ul>${a.items.map(i => `<li><a href="#tratamientos">${i.n}</a></li>`).join('')}</ul></div>`).join('') +
  `<a href="#promos" class="mega__promo"><img src="${IMG('1515377905703-c4788e51af15', 600)}" alt=""><div><span class="tag tag--hot">-30%</span><h4 style="font-family:var(--font-display);font-size:1.6rem;margin-top:8px">Black Beauty Week</h4><small>Paquetes premium con precio congelado</small></div></a>`;

/* ---------- Paquetes ---------- */
const PACKS = [
  { n: 'Glow Express', p: 490, o: 680, l: ['Hydrafacial completo', 'Peeling enzimático', 'Mascarilla LED', 'Evaluación dermatológica'] },
  { n: 'Rejuvenecimiento Total', p: 1890, o: 2700, star: true, l: ['Toxina botulínica (3 zonas)', 'Ácido hialurónico 1 ml', 'Bioestimulador de colágeno', '2 Hydrafacial de regalo', 'Control a los 15 días'] },
  { n: 'Body Sculpt', p: 1290, o: 1790, l: ['8 sesiones de reducción', '4 drenajes linfáticos', 'Radiofrecuencia corporal', 'Plan nutricional'] }
];
$('#packs').innerHTML = PACKS.map((k, i) => `<div class="pack ${k.star ? 'pack--star' : ''}" data-reveal data-delay="${i * 120}">
  ${k.star ? '<span class="pack__ribbon">MÁS VENDIDO</span>' : ''}
  <h4>${k.n}</h4><div class="pack__price"><b>S/ ${k.p.toLocaleString('es-PE')}</b><s>S/ ${k.o.toLocaleString('es-PE')}</s></div>
  <small style="opacity:.7">o 6 cuotas de S/ ${(k.p / 6).toFixed(0)} sin intereses</small>
  <ul class="pack__list">${k.l.map(x => `<li>${x}</li>`).join('')}</ul>
  <button class="btn" data-pack="${i}">Separar con S/ 50</button></div>`).join('');

/* ---------- Resultados ---------- */
const RESULTS = [
  { t: 'Acné eliminado', img: '1515377905703-c4788e51af15', who: 'Mariela, 26', q: 'Después de años luchando contra el acné, hoy luzco una piel limpia y radiante.', tr: '6 sesiones · Peeling + Láser' },
  { t: 'Rejuvenecimiento', img: '1544005313-94ddf0286df2', who: 'Carmen, 48', q: 'Me veo descansada y natural. Nadie nota qué me hice, solo que me veo increíble.', tr: 'Botox + Hialurónico' },
  { t: 'Cicatriz atenuada', img: '1524504388940-b1c1722653e1', who: 'Javier, 34', q: 'Tenía una cicatriz que me acomplejaba. Ahora apenas se nota. Totalmente agradecido.', tr: '4 sesiones · Microneedling' }
];
$('#results').innerHTML = RESULTS.map((r, i) => `<div class="result-card" data-reveal data-delay="${i * 120}">
  <div class="ba"><div class="ba__img ba__img--before" style="background-image:url('${IMG(r.img, 800)}')"></div><div class="ba__img ba__img--after" style="background-image:url('${IMG(r.img, 800)}')"></div>
  <span class="ba__lbl ba__lbl--l">ANTES</span><span class="ba__lbl ba__lbl--r">DESPUÉS</span><div class="ba__handle"></div></div>
  <div class="result-card__body"><h4>${r.t}</h4><p>“${r.q}”</p><div class="who"><span>${r.who}</span><span class="tag">${r.tr}</span></div></div></div>`).join('');

/* ---------- Productos ---------- */
const PRODUCTS = [
  { id: 'd1', brand: 'SkinCeuticals', name: 'C E Ferulic Sérum Antioxidante 30 ml', price: 649, old: 760, cat: 'Sérums', shape: 'dropper', c1: '#f6d48f', c2: '#b8752b', bg: '#fdf4e4', rating: 4.9, reviews: 412, tags: [{ t: 'Top ventas', c: 'tag--pri' }] },
  { id: 'd2', brand: 'La Roche-Posay', name: 'Anthelios UVMune 400 Fluido SPF50+', price: 119, cat: 'Protección', shape: 'tube', c1: '#ffe9a8', c2: '#f39c12', bg: '#fff8e6', rating: 4.8, reviews: 1290, tags: [{ t: 'Esencial' }] },
  { id: 'd3', brand: 'ISDIN', name: 'Isdinceutics Flavo-C Ultraglican', price: 189, old: 215, cat: 'Antiedad', shape: 'dropper', c1: '#ffd0c2', c2: '#d9534f', bg: '#fff0ec', rating: 4.7, reviews: 386 },
  { id: 'd4', brand: 'Avène', name: 'Cicalfate+ Crema Reparadora Post-tratamiento', price: 79, cat: 'Post-tratamiento', shape: 'tube', c1: '#e3f1ff', c2: '#3b7dd8', bg: '#eef6ff', rating: 4.9, reviews: 958, tags: [{ t: 'Post láser' }] },
  { id: 'd5', brand: 'CeraVe', name: 'Limpiador Espumoso para piel grasa 236 ml', price: 69, cat: 'Limpieza', shape: 'pump', c1: '#dff3ff', c2: '#1b6fb3', bg: '#eef8ff', rating: 4.8, reviews: 2140 },
  { id: 'd6', brand: 'IRRADIA Lab', name: 'Ácido Hialurónico Multi-peso 2% Booster', price: 129, old: 159, cat: 'Sérums', shape: 'dropper', c1: '#f3d3e0', c2: '#7a1a4f', bg: '#fbeff4', rating: 5, reviews: 233, tags: [{ t: 'Exclusivo', c: 'tag--new' }] },
  { id: 'd7', brand: 'Bioderma', name: 'Sensibio H2O Agua Micelar 500 ml', price: 89, cat: 'Limpieza', shape: 'bottle', c1: '#ffe0ea', c2: '#e05d8a', bg: '#fff1f5', rating: 4.8, reviews: 3011 },
  { id: 'd8', brand: 'Heliocare', name: '360° Water Gel SPF50+ Color', price: 135, old: 149, cat: 'Protección', shape: 'tube', c1: '#f4dcc8', c2: '#a8673d', bg: '#fbf1e9', rating: 4.7, reviews: 512 },
  { id: 'd9', brand: 'IRRADIA Lab', name: 'Retinal 0.1% Crema Noche Renovadora', price: 159, cat: 'Antiedad', shape: 'jar', c1: '#e8d5f5', c2: '#6b3fa0', bg: '#f6effc', rating: 4.9, reviews: 178, tags: [{ t: 'Nuevo', c: 'tag--new' }] },
  { id: 'd10', brand: 'SkinCeuticals', name: 'Hydrating B5 Gel Hidratante 30 ml', price: 389, cat: 'Sérums', shape: 'dropper', c1: '#d9f3f5', c2: '#2a9aa6', bg: '#eefafb', rating: 4.8, reviews: 301 },
  { id: 'd11', brand: 'Uriage', name: 'Bariéderm Cica-Crema Reparadora', price: 72, old: 89, cat: 'Post-tratamiento', shape: 'tube', c1: '#e4f4ea', c2: '#2f8f5b', bg: '#f0faf4', rating: 4.6, reviews: 274 },
  { id: 'd12', brand: 'IRRADIA Lab', name: 'Kit Post-Botox: limpiador + sérum + SPF', price: 249, old: 320, cat: 'Post-tratamiento', shape: 'jar', c1: '#f6dbe6', c2: '#c8a06a', bg: '#fdf3f6', rating: 5, reviews: 96, tags: [{ t: 'Kit', c: 'tag--pri' }] }
];
const cart = UI.Cart({ brand: 'darmed', freeShip: 199, installments: 6, checkoutMsg: '¡Pedido IRRADIA simulado! Te llegará en 24 h 🚚' });
UI.quickView(PRODUCTS, cart);
const CATS = ['Todos', ...new Set(PRODUCTS.map(p => p.cat))];
let cat = 'Todos';
function renderShop() {
  $('#shopFilters').innerHTML = CATS.map(c => `<button class="chip ${c === cat ? 'is-active' : ''}" data-cat="${c}">${c}</button>`).join('');
  const list = PRODUCTS.filter(p => cat === 'Todos' || p.cat === cat).slice(0, 8);
  $('#shopGrid').innerHTML = list.map(p => productCard(p, cart)).join('');
  $$('#shopGrid [data-reveal]').forEach((el, i) => setTimeout(() => el.classList.add('is-in'), 60 * i));
}
$('#shopFilters').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { cat = b.dataset.cat; renderShop(); } });
renderShop();

/* ---------- Diagnóstico ---------- */
const QUIZ = [
  { q: '¿Cómo describirías tu piel?', o: [['💧', 'Seca', 'Tirante, opaca'], ['✨', 'Grasa', 'Brillo y poros visibles'], ['🌗', 'Mixta', 'Zona T grasa'], ['🌸', 'Sensible', 'Se enrojece fácil']] },
  { q: '¿Cuál es tu principal preocupación?', o: [['⏳', 'Arrugas', 'Líneas de expresión'], ['🎯', 'Acné', 'Brotes o marcas'], ['☀️', 'Manchas', 'Tono desigual'], ['🫧', 'Flacidez', 'Pérdida de firmeza']] },
  { q: '¿Cuánto tiempo dedicas a tu rutina?', o: [['⚡', '2 minutos', 'Lo básico'], ['🧴', '5 minutos', '3 pasos'], ['💆‍♀️', '10+ minutos', 'Amo mi skincare'], ['🤷‍♀️', 'Nada aún', 'Quiero empezar']] }
];
const REC = { Arrugas: ['Toxina Botulínica', ['d1', 'd9', 'd2']], Acné: ['Peeling químico', ['d5', 'd6', 'd2']], Manchas: ['Tratamiento de manchas', ['d3', 'd8', 'd7']], Flacidez: ['Bioestimuladores de colágeno', ['d9', 'd6', 'd8']] };
let qStep = 0, answers = [];
function renderQuiz() {
  $$('#qSteps span').forEach((s, i) => s.classList.toggle('on', i <= qStep));
  if (qStep < QUIZ.length) {
    const s = QUIZ[qStep];
    $('#quizMain').innerHTML = `<small style="color:var(--muted);font-weight:700;letter-spacing:.14em">PASO ${qStep + 1} DE 3</small><h4>${s.q}</h4>
      <div class="opts">${s.o.map(o => `<button class="opt" data-ans="${o[1]}"><span class="e">${o[0]}</span><span><b>${o[1]}</b><small>${o[2]}</small></span></button>`).join('')}</div>
      ${qStep ? '<button class="btn btn--ghost btn--sm" id="qBack" style="align-self:flex-start">← Atrás</button>' : ''}`;
  } else {
    const r = REC[answers[1]];
    const prods = r[1].map(id => PRODUCTS.find(p => p.id === id));
    $('#quizMain').innerHTML = `<div class="quiz-result"><span class="tag tag--pri" style="justify-self:start">Tu diagnóstico</span>
      <h4 style="font-family:var(--font-display);font-size:2rem">Piel ${answers[0].toLowerCase()} con foco en ${answers[1].toLowerCase()}</h4>
      <p style="color:var(--muted)">Te recomendamos <b style="color:var(--primary)">${r[0]}</b> y esta rutina de ${answers[2].toLowerCase()}:</p>
      <div class="routine">${prods.map((p, i) => `<div>${productArt(p)}<span>${['Mañana', 'Tratamiento', 'Protección'][i]}<br><small style="color:var(--muted)">${p.brand}</small></span></div>`).join('')}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="qAddAll">Agregar rutina · ${money(prods.reduce((a, p) => a + p.price, 0))}</button><a href="#reservar" class="btn btn--ghost" id="qBook">Reservar ${r[0]}</a><button class="btn btn--ghost" id="qRestart">↺ Repetir</button></div></div>`;
    $('#qAddAll').onclick = () => prods.forEach(p => cart.add(p));
    $('#qBook').onclick = () => { $('#bTreat').value = r[0]; updateSummary(); };
    $('#qRestart').onclick = () => { qStep = 0; answers = []; showQuizStep(); };
  }
}
function showQuizStep() {
  renderQuiz();
  const heading = $('#quizMain h4');
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}
$('#quizMain').addEventListener('click', e => {
  const b = e.target.closest('[data-ans]'); if (b) { answers[qStep] = b.dataset.ans; qStep++; showQuizStep(); }
  if (e.target.id === 'qBack') { qStep--; showQuizStep(); }
});
renderQuiz();

/* ---------- Equipo ---------- */
const TEAM = [
  { n: 'Dra. Daniela Armas', r: 'Directora médica · Medicina estética', img: '1494790108377-be9c29b29330', x: '14 años · Fellow AMWC Mónaco', on: true },
  { n: 'Dr. Martín Salazar', r: 'Dermatólogo · Láser y cicatrices', img: '1500648767791-00dcc994a43e', x: 'CMP 45821 · RNE 2290', on: true },
  { n: 'Dra. Lucía Ferreyra', r: 'Armonización facial', img: '1544005313-94ddf0286df2', x: 'Formación en Brasil y España', on: false },
  { n: 'Lic. Andrea Paredes', r: 'Cosmiatra · Corporal', img: '1524504388940-b1c1722653e1', x: '+3,000 sesiones realizadas', on: true }
];
$('#team').innerHTML = TEAM.map((d, i) => `<div class="doc" data-reveal data-delay="${i * 100}">
  <img src="${IMG(d.img, 600)}" alt="${d.n}" loading="lazy">
  <span class="doc__badge"><span class="live-dot" style="${d.on ? '' : 'background:#aaa;animation:none'}"></span>${d.on ? 'Disponible hoy' : 'Próx. lunes'}</span>
  <div class="doc__info"><b>${d.n}</b><small>${d.r}</small><div class="doc__more"><p>${d.x}</p><a href="#reservar" class="btn btn--sm btn--block" data-doc="${i}">Agendar con ${d.n.split(' ')[0]} ${d.n.split(' ')[1]}</a></div></div></div>`).join('');

/* ---------- Reservas ---------- */
const allT = Object.values(AREAS).flatMap(a => a.items);
$('#bTreat').innerHTML = Object.values(AREAS).map(a => `<optgroup label="${a.label}">${a.items.map(i => `<option>${i.n}</option>`).join('')}</optgroup>`).join('');
let bDoc = 0, bDay = 1, bSlot = null;
const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const today = new Date();
function renderBooking() {
  $('#bDocs').innerHTML = TEAM.map((d, i) => `<button class="chip ${i === bDoc ? 'is-active' : ''}" data-bdoc="${i}">${d.n.replace('Dra. ', '').replace('Dr. ', '').replace('Lic. ', '')}</button>`).join('');
  $('#bDays').innerHTML = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(d.getDate() + i); return `<button class="day ${i === bDay ? 'is-active' : ''}" data-bday="${i}" ${d.getDay() === 0 ? 'disabled' : ''}><small>${i === 0 ? 'Hoy' : DAYS[d.getDay()]}</small><b>${d.getDate()}</b></button>`; }).join('');
  const slots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:30', '17:30', '18:30', '19:30'];
  $('#bSlots').innerHTML = slots.map((s, i) => { const busy = (i * 7 + bDay * 3 + bDoc * 5) % 4 === 0; return `<button class="slot ${s === bSlot ? 'is-active' : ''}" data-slot="${s}" ${busy ? 'disabled' : ''}>${s}</button>`; }).join('');
  updateSummary();
}
function updateSummary() {
  const t = allT.find(x => x.n === $('#bTreat').value) || allT[0];
  const d = new Date(today); d.setDate(d.getDate() + bDay);
  const values = {
    sTreat: t.n,
    sDoc: TEAM[bDoc].n,
    sDate: d.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }),
    sTime: bSlot || 'Elige un horario',
    sPrice: t.price ? 'S/ ' + t.price.toLocaleString('es-PE') : 'Gratis'
  };
  for (const [id, value] of Object.entries(values)) {
    const field = document.getElementById(id);
    if (field.textContent !== value) field.textContent = value;
  }
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-bdoc]'); if (a) { bDoc = +a.dataset.bdoc; bSlot = null; renderBooking(); }
  const b = e.target.closest('[data-bday]'); if (b) { bDay = +b.dataset.bday; bSlot = null; renderBooking(); }
  const c = e.target.closest('[data-slot]'); if (c) { bSlot = c.dataset.slot; renderBooking(); }
  const d = e.target.closest('[data-doc]'); if (d) { bDoc = +d.dataset.doc; renderBooking(); }
  const k = e.target.closest('[data-pack]'); if (k) { cart.add({ id: 'pk' + k.dataset.pack, name: 'Adelanto · ' + PACKS[k.dataset.pack].n, brand: 'Paquete IRRADIA', price: 50, shape: 'syringe', c1: '#f3d3e0', c2: '#7a1a4f' }); const c2 = $('#cupos'); c2.textContent = Math.max(1, +c2.textContent - 1); }
});
$('#bTreat').addEventListener('change', updateSummary);
$('#bConfirm').addEventListener('click', () => {
  if (!bSlot) return toast('Elige un horario disponible', '⏰');
  const name = ($('#bName').value.trim() || 'Paciente').replace(/[<>&"']/g, '');
  $('#okText').innerHTML = `${name}, te esperamos el <b>${$('#sDate').textContent}</b> a las <b>${bSlot}</b> con ${TEAM[bDoc].n} para <b>${$('#sTreat').textContent}</b>. Te enviamos la confirmación por WhatsApp.`;
  $('#okCode').textContent = 'CÓDIGO · DRM-' + Math.floor(10000 + Math.random() * 89999);
  const t = allT.find(x => x.n === $('#bTreat').value) || allT[0];
  const d = new Date(today); d.setDate(d.getDate() + bDay);
  const [hh, mm] = bSlot.split(':').map(Number);
  UI.Group.addBooking({ brand: 'darmed', client: name, phone: $('#bPhone').value.trim(), treat: t.n, doc: TEAM[bDoc].n, docIdx: bDoc, date: d.toISOString().slice(0, 10), start: bSlot, end: `${String(hh + 1).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, price: t.price, status: 'Programado', source: 'Web IRRADIA' });
  $('#okText').insertAdjacentHTML('beforeend', '<br><br><a href="agendamiento.html" style="color:var(--primary);font-weight:700;text-decoration:underline">Ver la cita en la agenda clínica →</a>');
  bSlot = null; renderBooking();
  UI.openModal('okModal');
});
renderBooking();

/* ---------- Testimonios ---------- */
const TESTIS = [
  { q: 'El mejor trato que he recibido. La doctora me explicó todo y el resultado de mis labios es súper natural.', n: 'Valeria R.', t: 'Ácido hialurónico', img: '1517841905240-472988babdf9' },
  { q: 'Bajé 9 cm de cintura con el pack corporal. Las chicas son un amor y siempre puntuales.', n: 'Rosa M.', t: 'Body Sculpt', img: '1494790108377-be9c29b29330' },
  { q: 'Mi caída de cabello se detuvo al tercer mes de PRP. Totalmente recomendado.', n: 'Diego L.', t: 'Plasma capilar', img: '1500648767791-00dcc994a43e' }
];
$('#testis').innerHTML = TESTIS.map((t, i) => `<div class="testi" data-reveal data-delay="${i * 120}"><span class="stars">★★★★★</span><p>“${t.q}”</p><div class="testi__who"><img src="${IMG(t.img, 120)}" alt=""><div><b>${t.n}</b><small>${t.t} · paciente verificado</small></div></div></div>`).join('');

/* ---------- FAQ ---------- */
const FAQ = [
  ['¿La evaluación tiene costo?', 'No. Tu primera evaluación con un médico estético es totalmente gratuita y sin compromiso.'],
  ['¿Los tratamientos duelen?', 'Usamos anestesia tópica y técnicas de mínima invasión. La mayoría de pacientes describe solo una leve molestia.'],
  ['¿Cuánto duran los resultados de la toxina botulínica?', 'Entre 4 y 6 meses según tu metabolismo. Incluimos un control gratuito a los 15 días.'],
  ['¿Puedo pagar en cuotas?', 'Sí, hasta 6 cuotas sin intereses con tarjetas participantes. También aceptamos Yape y Plin.'],
  ['¿Qué productos utilizan?', 'Solo marcas con registro sanitario DIGEMID: Allergan, Galderma, Merz y Teoxane, entre otras.']
];
$('#faq').innerHTML = FAQ.map((f, i) => `<details ${i === 0 ? 'open' : ''}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');

/* ---------- Instagram ---------- */
const INSTA = ['1570172619644-dfd03ed5d881', '1515377905703-c4788e51af15', '1556228578-8c89e6adf883', '1519823551278-64ac92734fb1', '1620916566398-39f1143ab7be', '1522335789203-aabd1fc54bc9'];
$('#insta').innerHTML = INSTA.map((id, i) => `<a href="#" data-likes="${(1.2 + i * .7).toFixed(1)}K"><img src="${IMG(id, 400)}" alt="" loading="lazy"></a>`).join('');

/* ---------- Sedes ---------- */
const SEDES = [
  { n: 'San Isidro', a: 'López de Ayala 1515', h: 'Lun–Sáb 9:00–20:00', x: 38, y: 46 },
  { n: 'Miraflores', a: 'Av. Larco 820, piso 3', h: 'Lun–Sáb 10:00–21:00', x: 56, y: 70 },
  { n: 'Surco', a: 'Av. Primavera 1340', h: 'Lun–Dom 9:00–19:00', x: 72, y: 34 }
];
let sede = 0;
function renderSedes() {
  $('#sedes').innerHTML = SEDES.map((s, i) => `<div class="sede ${i === sede ? 'is-active' : ''}" data-sede="${i}"><b>📍 IRRADIA ${s.n}</b><small>${s.a}</small><small>🕘 ${s.h}</small></div>`).join('') +
    `<a class="btn" href="https://wa.me/51943387184" target="_blank" rel="noopener">WhatsApp · 943 387 184</a>`;
  const s = SEDES[sede]; $('#pin').style.left = s.x + '%'; $('#pin').style.top = s.y + '%';
  $('#pinCard').innerHTML = `<b>IRRADIA ${s.n}</b><br><small>${s.a}</small>`;
}
$('#sedes').addEventListener('click', e => { const b = e.target.closest('[data-sede]'); if (b) { sede = +b.dataset.sede; renderSedes(); } });
renderSedes();

/* ---------- Búsqueda ---------- */
const INDEX = [...allT.map(t => ({ n: t.n, s: 'Tratamiento', h: '#tratamientos' })), ...PRODUCTS.map(p => ({ n: p.name, s: p.brand, h: '#tienda' }))];
$('#searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  const r = q ? INDEX.filter(x => x.n.toLowerCase().includes(q) || x.s.toLowerCase().includes(q)).slice(0, 8) : [];
  $('#searchRes').innerHTML = r.length ? r.map(x => `<a href="${x.h}" data-close style="padding:12px 14px;border-radius:12px;background:var(--soft);display:flex;justify-content:space-between"><b>${x.n}</b><small style="color:var(--muted)">${x.s}</small></a>`).join('') : (q ? '<p style="color:var(--muted)">Sin resultados. Prueba con “ojeras” o “sérum”.</p>' : '<div class="chips"><span class="chip">Botox</span><span class="chip">Hydrafacial</span><span class="chip">Celulitis</span><span class="chip">Protector solar</span></div>');
});
$('#searchInput').dispatchEvent(new Event('input'));
$('#searchRes').addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) { $('#searchInput').value = c.textContent; $('#searchInput').dispatchEvent(new Event('input')); } });

UI.crossSell($('#cross'), 'darmed');
UI.Group.onChange(() => UI.crossSell($('#cross'), 'darmed'));
UI.reveal();

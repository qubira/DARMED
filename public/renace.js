/* NUTRI · datos de maqueta + interacciones */
const { $, $$, money, toast, productArt, productCard } = UI;
const IMG = (id, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
UI.init({ brand: 'renace', waText: 'Hola NUTRI, quiero hacer un pedido', waBubble: '¿Te ayudamos a elegir? 💕' });

/* ---------- Catálogo ---------- */
const P = (id, brand, name, price, old, cat, shape, c1, c2, bg, rating, reviews, extra = {}) => ({ id, brand, name, price, old, cat, shape, c1, c2, bg, rating, reviews, ...extra });
const PRODUCTS = [
  P('r1', 'Laneige', 'Lip Sleeping Mask Berry 20 g', 89.9, 109.9, 'Skincare', 'jar', '#ffc2d6', '#e0306f', '#fff0f5', 4.9, 3420, { tags: [{ t: 'Viral', c: 'tag--pri' }], kb: 'Tratamiento' }),
  P('r2', 'COSRX', 'Advanced Snail 96 Mucin Power Essence', 79.9, null, 'Skincare', 'pump', '#f1f1e8', '#a89f7a', '#fbfaf3', 4.9, 5120, { tags: [{ t: 'Best seller', c: 'tag--new' }], kb: 'Esencia' }),
  P('r3', 'Beauty of Joseon', 'Relief Sun Rice + Probiotics SPF50+', 69.9, 84.9, 'Skincare', 'tube', '#fff3c9', '#d9a521', '#fffbea', 4.9, 4410, { kb: 'Protector' }),
  P('r4', 'Tocobo', 'Cotton Soft Sun Stick SPF50+', 59.9, null, 'Skincare', 'stick', '#e8f3ff', '#3d7fd6', '#f2f8ff', 4.7, 980, { tags: [{ t: 'Nuevo', c: 'tag--new' }], kb: 'Protector' }),
  P('r5', 'Anua', 'Heartleaf 77% Soothing Toner 250 ml', 99.9, 119.9, 'Skincare', 'bottle', '#e3f4e1', '#4f9a52', '#f2faf1', 4.8, 2210, { kb: 'Tónico' }),
  P('r6', 'Round Lab', '1025 Dokdo Cleanser espuma suave', 64.9, null, 'Skincare', 'tube', '#dff0ff', '#2a6fb5', '#eef7ff', 4.7, 1302, { kb: 'Limpiador' }),
  P('r7', 'Neutrogena', 'Serum Facial Anti-Arrugas Retinol Boost', 114, null, 'Dermo', 'dropper', '#e9e1ff', '#5b3fb5', '#f5f1ff', 4.6, 620, { tags: [{ t: 'Nuevo', c: 'tag--new' }], kb: 'Sérum' }),
  P('r8', 'Revox', 'Pack Glicólico + Hialurónico + Niacinamida', 80.73, 89.7, 'Dermo', 'dropper', '#f6f6f6', '#222222', '#fafafa', 4.7, 1840, { kb: 'Sérum' }),
  P('r9', 'Skin1004', 'Madagascar Centella Ampoule 100 ml', 89.9, 104.9, 'Skincare', 'dropper', '#f4ead6', '#a17a3a', '#fbf6ec', 4.8, 1560, { kb: 'Sérum' }),
  P('r10', 'Tony Moly', 'Tomatox Magic Massage Pack', 68.9, null, 'Skincare', 'jar', '#ffd3cc', '#e2463a', '#fff2f0', 4.6, 712, { kb: 'Tratamiento' }),
  P('r11', 'Isntree', 'Hyaluronic Acid Water Essence', 84.9, null, 'Skincare', 'bottle', '#dff6ff', '#29a3d6', '#effbff', 4.8, 830, { kb: 'Esencia' }),
  P('r12', 'Mario Badescu', 'Facial Spray Aloe, Herbs & Rosewater', 79, null, 'Skincare', 'bottle', '#ffe1e8', '#d9507a', '#fff3f6', 4.8, 2900, { kb: 'Tónico' }),
  P('r13', 'Maybelline', 'Máscara Colossal Bubble a prueba de agua', 57.9, null, 'Maquillaje', 'tube', '#ffd9ec', '#d6338a', '#fff1f8', 4.5, 540, { tags: [{ t: 'Nuevo', c: 'tag--new' }] }),
  P('r14', 'Maybelline', 'Instant Age Rewind Eraser Corrector', 46.42, 61.9, 'Maquillaje', 'stick', '#f3d2b5', '#b9784a', '#fbf2ea', 4.7, 3880),
  P('r15', 'Clinique', 'Chubby Stick Cheek Colour Balm', 111.2, 139, 'Maquillaje', 'stick', '#ffc6cf', '#e0566d', '#fff2f4', 4.6, 410),
  P('r16', 'Essence', 'Gloss Choco Bomb Shiny Lipgloss', 7.9, null, 'Maquillaje', 'lipstick', '#c98a6b', '#6b3a26', '#f9efe9', 4.4, 6200, { tags: [{ t: 'Viral', c: 'tag--pri' }] }),
  P('r17', 'Sheglam', 'Color Bloom Liquid Blush', 34.9, 44.9, 'Maquillaje', 'dropper', '#ffb3c7', '#f0457a', '#fff0f4', 4.7, 2310),
  P('r18', 'Rare Beauty', 'Soft Pinch Luminous Powder Blush', 129, null, 'Maquillaje', 'compact', '#ffc9b9', '#e9775a', '#fff3ef', 4.9, 1870),
  P('r19', 'Olaplex', 'N°7 Bonding Oil 30 ml', 132, null, 'Cabello', 'dropper', '#f2f2f2', '#1d1d1d', '#f8f8f8', 4.8, 4300, { tags: [{ t: 'Top', c: 'tag--new' }] }),
  P('r20', 'Olaplex', 'N°3 Hair Perfector 100 ml', 149, 179, 'Cabello', 'tube', '#f2f2f2', '#1d1d1d', '#f8f8f8', 4.9, 5100),
  P('r21', 'Salon In', 'Duo Hydra Repair Shampoo + Acondicionador', 139.04, 173.8, 'Cabello', 'pump', '#d9f0ff', '#2c7cc4', '#eef8ff', 4.6, 340),
  P('r22', 'Petrizzio', 'Body Lotion Vainilla & Coco 500 ml', 39.9, null, 'Corporal', 'pump', '#fff0d9', '#d69a3c', '#fffaf1', 4.5, 870),
  P('r23', 'Daise Beauty', 'Exfoliante Corporal Vainilla', 46.9, null, 'Corporal', 'jar', '#fbe3c8', '#c08447', '#fff6ec', 4.7, 1220),
  P('r24', 'Sol de Janeiro', 'Brazilian Crush Cheirosa 62 Mist', 159, 189, 'Fragancias', 'perfume', '#ffd8c2', '#f08a4b', '#fff3ec', 4.9, 3900, { tags: [{ t: 'Viral', c: 'tag--pri' }] }),
  P('r25', 'Ariana Grande', 'Cloud Eau de Parfum 100 ml', 279, 329, 'Fragancias', 'perfume', '#e7dcff', '#8c6ad8', '#f6f2ff', 4.8, 1450),
  P('r26', 'Victoria\'s Secret', 'Bare Vanilla Fragrance Mist', 99, null, 'Fragancias', 'perfume', '#fbe0c8', '#c7894f', '#fff6ee', 4.7, 2650),
  P('r27', 'Pixi', 'Glow Tonic 5% Ácido Glicólico 250 ml', 109, 129, 'Dermo', 'bottle', '#ffe9c2', '#e2a32a', '#fff9ec', 4.8, 2700, { kb: 'Tónico' }),
  P('r28', 'Laneige', 'Water Bank Blue Hyaluronic Cream', 169, 199, 'Skincare', 'jar', '#d6ecff', '#2b6fd6', '#eef6ff', 4.8, 1120, { kb: 'Crema' }),
  P('r29', 'COSRX', 'The Retinol 0.1 Cream', 89.9, null, 'Skincare', 'tube', '#efe6ff', '#6d4bc4', '#f7f3ff', 4.7, 960, { kb: 'Crema' }),
  P('r30', 'Dr. Jart+', 'Cicapair Tiger Grass Color Correcting', 189, 219, 'Skincare', 'jar', '#dff3e4', '#2e8b57', '#f1faf3', 4.8, 1780, { kb: 'Crema' })
];
const cart = UI.Cart({ brand: 'renace', freeShip: 199, shipCost: 9.9, installments: 3, emptyText: 'Tu próximo favorito te está esperando 💕', checkoutMsg: '¡Pedido simulado! Llega en 1 hora ⚡' });
UI.quickView(PRODUCTS, cart, { shipNote: 'Pide hoy y recíbelo en 1 h · Regalo incluido 🎁' });

/* ---------- Slider ---------- */
const SLIDES = [
  { bg: 'linear-gradient(120deg,#ffd6e5,#ffb3cc)', eb: 'Hasta 50% dscto', t: 'Los productos<br>más TOP 🛍️', d: 'Tus favoritos de skincare y maquillaje con descuentos que no se repiten.', p: ['r1', 'r3', 'r17'] },
  { bg: 'linear-gradient(120deg,#e9e1ff,#cbb8ff)', eb: 'Fragancias', t: 'Haz match<br>con tu aroma', d: 'Mists y perfumes para cada vibe. Gourmand, floral o fresco.', p: ['r24', 'r25', 'r26'] },
  { bg: 'linear-gradient(120deg,#dff2ff,#b8e2ff)', eb: 'Cabello', t: 'Resetea tu<br>cabello', d: 'Repara, nutre y suaviza post verano con Olaplex y Salon In.', p: ['r19', 'r20', 'r21'] }
];
let sI = 0, sTimer;
$('#slider').insertAdjacentHTML('afterbegin', SLIDES.map((s, i) => `<div class="slide ${i === 0 ? 'is-on' : ''}" style="background:${s.bg}">
  <div class="slide__txt"><span class="tag">${s.eb}</span><h2>${s.t}</h2><p>${s.d}</p><a href="#catalogo" class="btn">Ver todo →</a></div>
  <div class="slide__art">${s.p.map(id => `<div class="p">${productArt(PRODUCTS.find(x => x.id === id))}</div>`).join('')}</div></div>`).join(''));
function goSlide(i) {
  sI = (i + SLIDES.length) % SLIDES.length;
  $$('.slide').forEach((s, k) => s.classList.toggle('is-on', k === sI));
  $('#sDots').innerHTML = SLIDES.map((_, k) => `<button class="${k === sI ? 'is-on' : ''}" data-s="${k}" aria-label="Slide ${k + 1}"></button>`).join('');
  clearTimeout(sTimer); sTimer = setTimeout(() => goSlide(sI + 1), 6000);
}
$('#sDots').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (b) goSlide(+b.dataset.s); });
goSlide(0);
$('#sideB').innerHTML = `
  <a href="#coreana" class="side-b" style="background:#111;color:#fff">${productArt(PRODUCTS[1])}<span class="tag tag--hot" style="align-self:flex-start;margin-bottom:10px">K-Beauty</span><h3>Rutina coreana<br>-15%</h3></a>
  <a href="#points" class="side-b" style="background:#fff3c9">${productArt(PRODUCTS[2])}<span class="tag" style="align-self:flex-start;margin-bottom:10px">NUTRI Points</span><h3>Regalos en<br>tooodas tus compras</h3></a>`;

/* ---------- Categorías ---------- */
const CIRCLES = [['Coreana', 'r2'], ['Skincare', 'r5'], ['Dermo', 'r7'], ['Maquillaje', 'r18'], ['Cabello', 'r19'], ['Corporal', 'r23'], ['Fragancias', 'r24'], ['Ofertas', 'r16']];
$('#circles').innerHTML = CIRCLES.map(([n, id], i) => `<a href="#catalogo" class="circle" data-reveal data-delay="${i * 60}" data-gocat="${n}"><div class="circle__img">${productArt(PRODUCTS.find(p => p.id === id))}</div>${n}</a>`).join('');

/* ---------- Rails ---------- */
const flashIds = ['r14', 'r15', 'r21', 'r8', 'r24', 'r25', 'r1', 'r17', 'r30'];
$('#flashRail').innerHTML = flashIds.map((id, i) => {
  const p = PRODUCTS.find(x => x.id === id); const left = 4 + (i * 7) % 20;
  return productCard(p, cart).replace('</div></article>', `<div class="stock">¡Quedan solo <b>${left}</b>! <div class="meter"><span style="width:${100 - left * 3}%"></span></div></div></div></article>`);
}).join('');
$('#newRail').innerHTML = ['r13', 'r7', 'r4', 'r16', 'r29', 'r11', 'r9', 'r27'].map(id => productCard(PRODUCTS.find(x => x.id === id), cart)).join('');

/* ---------- Rutina coreana ---------- */
const STEPS = [
  { n: 'Limpiador', d: 'Doble limpieza suave', k: 'Limpiador' },
  { n: 'Tónico', d: 'Equilibra el pH', k: 'Tónico' },
  { n: 'Esencia / Sérum', d: 'Tratamiento concentrado', k: ['Esencia', 'Sérum'] },
  { n: 'Crema', d: 'Sella la hidratación', k: ['Crema', 'Tratamiento'] },
  { n: 'Protector solar', d: 'Siempre, todos los días', k: 'Protector' }
];
let curStep = 0; const chosen = {};
function renderRoutine() {
  $('#steps').innerHTML = STEPS.map((s, i) => `<div class="step ${i === curStep ? 'is-active' : ''} ${chosen[i] ? 'done' : ''}" data-step="${i}"><span class="step__n">${chosen[i] ? '✓' : i + 1}</span><div><b>${s.n}</b><small>${chosen[i] ? PRODUCTS.find(p => p.id === chosen[i]).brand : s.d}</small></div></div>`).join('');
  const keys = [].concat(STEPS[curStep].k);
  $('#picks').innerHTML = PRODUCTS.filter(p => keys.includes(p.kb)).slice(0, 6).map(p => `<button class="pick ${chosen[curStep] === p.id ? 'is-on' : ''}" data-pick="${p.id}">${productArt(p)}<div><small style="color:var(--muted)">${p.brand}</small><b>${p.name}</b><span style="font-weight:800">${money(p.price)}</span></div></button>`).join('');
  const sel = Object.values(chosen).map(id => PRODUCTS.find(p => p.id === id));
  const sum = sel.reduce((a, p) => a + p.price, 0);
  $('#rCount').textContent = sel.length;
  $('#rTotal').textContent = money(sum * .85);
  $('#rOld').textContent = sum ? money(sum) : '';
}
$('#steps').addEventListener('click', e => { const s = e.target.closest('[data-step]'); if (s) { curStep = +s.dataset.step; renderRoutine(); } });
$('#picks').addEventListener('click', e => {
  const b = e.target.closest('[data-pick]'); if (!b) return;
  chosen[curStep] = b.dataset.pick;
  if (curStep < STEPS.length - 1) setTimeout(() => { curStep++; renderRoutine(); }, 250);
  renderRoutine();
});
$('#rAdd').addEventListener('click', () => {
  const ids = Object.values(chosen); if (!ids.length) return toast('Elige al menos un producto por paso', '💡');
  ids.forEach(id => { const p = PRODUCTS.find(x => x.id === id); cart.add({ ...p, id: p.id + '-k', price: +(p.price * .85).toFixed(2), variant: 'Rutina -15%' }); });
});
renderRoutine();

/* ---------- Shade finder ---------- */
const SKIN = [['#f6dcc8', 'Porcelana 110', '#fff3ea'], ['#eac2a2', 'Marfil 120', '#fbefe6'], ['#d9a57f', 'Beige 220', '#f7ebe1'], ['#c48a63', 'Canela 310', '#f3e6dc'], ['#a26a46', 'Caramelo 330', '#efe2d8'], ['#7a4a2e', 'Mocha 360', '#ebdfd6']];
const LIPS = [['#d94b6a', 'Rose Petal'], ['#b5283f', 'Ruby Kiss'], ['#e98a7a', 'Peach Nude'], ['#8c3a4d', 'Berry Wine'], ['#c56d6b', 'Rosewood']];
const BLUSH = [['#ff9db0', 'Pink Pop'], ['#ff9f7a', 'Coral'], ['#e07b7b', 'Mauve'], ['#d98a5f', 'Bronze']];
let sh = { s: 2, l: 0, b: 0 };
function renderShade() {
  $('#skinSw').innerHTML = SKIN.map((c, i) => `<button class="sw ${i === sh.s ? 'is-on' : ''}" style="background:${c[0]}" data-sh="s" data-i="${i}" title="${c[1]}"></button>`).join('');
  $('#lipSw').innerHTML = LIPS.map((c, i) => `<button class="sw ${i === sh.l ? 'is-on' : ''}" style="background:${c[0]}" data-sh="l" data-i="${i}" title="${c[1]}"></button>`).join('');
  $('#blushSw').innerHTML = BLUSH.map((c, i) => `<button class="sw ${i === sh.b ? 'is-on' : ''}" style="background:${c[0]}" data-sh="b" data-i="${i}" title="${c[1]}"></button>`).join('');
  const s = SKIN[sh.s], l = LIPS[sh.l], b = BLUSH[sh.b];
  $('#face').style.background = s[0]; $('#faceBg').style.background = s[2];
  $('#face i').style.background = l[0]; $$('#face b').forEach(x => x.style.background = b[0]);
  const items = [
    { id: 'sh-f' + sh.s, brand: 'Maybelline', name: `Fit Me Base Matte · ${s[1]}`, price: 54.9, shape: 'pump', c1: s[0], c2: s[0], bg: s[2] },
    { id: 'sh-l' + sh.l, brand: 'Sheglam', name: `Labial Mate · ${l[1]}`, price: 29.9, shape: 'lipstick', c1: l[0], c2: '#222', bg: '#fff3f5' },
    { id: 'sh-b' + sh.b, brand: 'Rare Beauty', name: `Soft Pinch Blush · ${b[1]}`, price: 129, shape: 'compact', c1: b[0], c2: '#e9d7c7', bg: '#fff5ef' }
  ];
  $('#matches').innerHTML = items.map((p, i) => `<div class="match">${productArt(p)}<div style="flex:1"><small style="color:var(--muted)">${p.brand}</small><br><b>${p.name}</b><br><b>${money(p.price)}</b></div><button class="add-btn" data-shadd="${i}">${UI.ICON.plus}</button></div>`).join('');
  $('#matches').onclick = e => { const a = e.target.closest('[data-shadd]'); if (a) cart.add(items[+a.dataset.shadd]); };
}
document.addEventListener('click', e => { const b = e.target.closest('[data-sh]'); if (b) { sh[b.dataset.sh] = +b.dataset.i; renderShade(); } });
renderShade();

/* ---------- Catálogo con filtros ---------- */
const CATS = [...new Set(PRODUCTS.map(p => p.cat))];
const BRANDS = [...new Set(PRODUCTS.map(p => p.brand))].sort();
let F = { cats: new Set(), brands: new Set(), max: 350, sale: false, q: '', sort: 'pop', shown: 9 };
$('#filters').innerHTML = `
  <div><h5>Categoría</h5>${CATS.map(c => `<label><input type="checkbox" data-fc="${c}"> ${c} <small style="margin-left:auto">${PRODUCTS.filter(p => p.cat === c).length}</small></label>`).join('')}</div>
  <div><h5>Precio máx.: <span id="maxV">S/ 350</span></h5><input type="range" min="10" max="350" value="350" id="maxR"></div>
  <div><h5>Ofertas</h5><label><input type="checkbox" id="saleOnly"> Solo con descuento</label></div>
  <div style="grid-column:1/-1"><h5>Marcas</h5><div style="max-height:200px;overflow:auto">${BRANDS.map(b => `<label><input type="checkbox" data-fb="${b}"> ${b}</label>`).join('')}</div></div>
  <button class="btn btn--ghost btn--sm" id="clearF">Limpiar filtros</button>`;
function renderCatalog() {
  let list = PRODUCTS.filter(p => (!F.cats.size || F.cats.has(p.cat)) && (!F.brands.size || F.brands.has(p.brand)) && p.price <= F.max && (!F.sale || p.old) &&
    (!F.q || (p.name + p.brand + p.cat).toLowerCase().includes(F.q)));
  const off = p => p.old ? 1 - p.price / p.old : 0;
  list.sort({ pop: (a, b) => b.reviews - a.reviews, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, off: (a, b) => off(b) - off(a), rate: (a, b) => b.rating - a.rating }[F.sort]);
  $('#resCount').innerHTML = `<b style="color:var(--text)">${list.length}</b> productos encontrados`;
  $('#catGrid').innerHTML = list.length ? list.slice(0, F.shown).map(p => productCard(p, cart)).join('') : '<div class="empty-state">😢 No encontramos productos con esos filtros.<br><br><button class="btn btn--sm" onclick="document.getElementById(\'clearF\').click()">Limpiar filtros</button></div>';
  $$('#catGrid [data-reveal]').forEach((el, i) => setTimeout(() => el.classList.add('is-in'), 40 * i));
  $('#more').style.display = list.length > F.shown ? '' : 'none';
}
$('#filters').addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.fc) t.checked ? F.cats.add(t.dataset.fc) : F.cats.delete(t.dataset.fc);
  if (t.dataset.fb) t.checked ? F.brands.add(t.dataset.fb) : F.brands.delete(t.dataset.fb);
  if (t.id === 'saleOnly') F.sale = t.checked;
  F.shown = 9; renderCatalog();
});
$('#maxR').addEventListener('input', e => { F.max = +e.target.value; $('#maxV').textContent = 'S/ ' + F.max; renderCatalog(); });
$('#clearF').addEventListener('click', () => { F = { ...F, cats: new Set(), brands: new Set(), max: 350, sale: false, q: '', shown: 9 }; $$('#filters input[type=checkbox]').forEach(c => c.checked = false); $('#maxR').value = 350; $('#maxV').textContent = 'S/ 350'; $('#topSearch').value = ''; renderCatalog(); });
$('#sort').addEventListener('change', e => { F.sort = e.target.value; renderCatalog(); });
$('#more').addEventListener('click', () => { F.shown += 6; renderCatalog(); });
$('#topSearch').addEventListener('input', e => { F.q = e.target.value.toLowerCase().trim(); F.shown = 9; renderCatalog(); });
$('#topSearch').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('catalogo').scrollIntoView(); });
document.addEventListener('click', e => {
  const c = e.target.closest('[data-gocat]'); if (!c) return;
  const map = { Coreana: 'Skincare', Ofertas: null };
  const cat = c.dataset.gocat in map ? map[c.dataset.gocat] : c.dataset.gocat;
  $('#clearF').click();
  if (cat) { F.cats.add(cat); const cb = $(`[data-fc="${cat}"]`); if (cb) cb.checked = true; }
  if (c.dataset.gocat === 'Ofertas') { F.sale = true; $('#saleOnly').checked = true; }
  renderCatalog();
});
renderCatalog();

/* ---------- UGC ---------- */
const UGC = [
  ['1517841905240-472988babdf9', '@vale.glow', 'Mi piel nunca estuvo tan hidratada con la Lip Sleeping Mask 😍', 'Laneige'],
  ['1494790108377-be9c29b29330', '@cami.skin', 'El protector de Beauty of Joseon no deja nada blanco. ¡Amor!', 'Beauty of Joseon'],
  ['1524504388940-b1c1722653e1', '@lu.makeup', 'El blush de Rare Beauty vale cada sol, dura todo el día.', 'Rare Beauty'],
  ['1544005313-94ddf0286df2', '@andre.hair', 'Olaplex N°7 salvó mi cabello después del decolorado.', 'Olaplex']
];
$('#ugc').innerHTML = UGC.map((u, i) => `<div class="ugc-card" data-reveal data-delay="${i * 90}"><div class="ugc-card__img"><img src="${IMG(u[0], 500)}" alt="" loading="lazy"><span>${u[1]}</span></div><div class="t"><span class="stars">★★★★★</span><p style="margin:6px 0">${u[2]}</p><small style="color:var(--pink);font-weight:700">Comprado: ${u[3]}</small></div></div>`).join('');

/* ---------- Marcas ---------- */
const MB = ['LANEIGE', 'COSRX', 'OLAPLEX', 'MARIO BADESCU', 'pixi', 'REVOX', 'SHEGLAM', 'ANUA', 'BEAUTY OF JOSEON', 'RARE BEAUTY', 'PETRIZZIO', 'TONY MOLY'];
$('#brandTrack').innerHTML = [...MB, ...MB].map(b => `<span class="marquee__item">${b}</span>`).join('');

UI.socialProof([
  { who: 'Fernanda de Miraflores', what: 'compró <b>Lip Sleeping Mask</b>', when: 'hace 2 min', art: productArt(PRODUCTS[0]) },
  { who: 'Daniela de San Borja', what: 'compró <b>Olaplex N°7</b>', when: 'hace 6 min', art: productArt(PRODUCTS[18]) },
  { who: 'Sofía de Surco', what: 'armó su <b>rutina coreana</b>', when: 'hace 11 min', art: productArt(PRODUCTS[1]) }
]);
UI.crossSell($('#cross'), 'renace');
UI.Group.onChange(() => UI.crossSell($('#cross'), 'renace'));
UI.reveal();

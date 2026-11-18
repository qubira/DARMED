/* =========================================================
   GRUPO DARMED · Master (todos los módulos) — maqueta con datos
   ========================================================= */
const { $, $$, toast, Group, esc, store } = UI;
const { I, BRANDS } = Admin;
const BM = UI.BRAND_META, KEYS = Object.keys(BM);
const S = n => 'S/ ' + Math.round(n).toLocaleString('es-PE');
const S2 = n => 'S/ ' + Number(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const K = n => n >= 1000 ? 'S/ ' + (n / 1000).toFixed(n >= 1e5 ? 0 : 1) + 'k' : 'S/ ' + Math.round(n);
const bchip = k => `<span class="bchip"><i style="background:${BM[k].c}"></i>${BM[k].n}</span>`;
const brandOk = k => Admin.state.brand === 'all' || Admin.state.brand === k;
const user = Group.user();

/* ---------- Datos semilla (determinísticos) ---------- */
let sd = 11; const rnd = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
const BASE = { darmed: 9800, renace: 6200, integrativa: 1400, depizone: 5400 };
const SERIES = {}; KEYS.forEach(k => SERIES[k] = Array.from({ length: 90 }, (_, i) => BASE[k] * (0.78 + rnd() * .44) * (1 + i / 380) * (new Date(Date.now() - (89 - i) * 864e5).getDay() === 0 ? .45 : 1)));
const NAMES = ['Valeria Ríos', 'Carmen Paz', 'Lucía Torres', 'Andrea Vega', 'Rosa Medina', 'Diego León', 'Fernanda Soto', 'Camila Ruiz', 'Sofía Herrera', 'Renzo Castro', 'Mafer Quispe', 'Daniela Flores', 'Gabriela Núñez', 'Paula Ibáñez', 'Jorge Salas', 'Natalia Rey', 'Ximena Prado', 'Alonso Vidal'];
const COL = ['#a8336f', '#4252d6', '#2f8a5b', '#b26b00', '#0b97d4', '#ea4c89', '#6b4fc4', '#0f766e'];
const METHODS = ['Visa', 'Yape', 'Mastercard', 'Plin', 'Efectivo', 'AMEX'];
const SEDES = [
  { id: 's1', n: 'San Isidro', b: 'darmed', dir: 'López de Ayala 1515', resp: 'Dra. Daniela Armas', cab: 6, occ: 82, vtas: 148200, staff: 14 },
  { id: 's2', n: 'Miraflores', b: 'darmed', dir: 'Av. Larco 820, piso 3', resp: 'Dr. Martín Salazar', cab: 4, occ: 74, vtas: 96400, staff: 9 },
  { id: 's3', n: 'Jockey Plaza', b: 'renace', dir: 'C.C. Jockey Plaza, 2do piso', resp: 'Valentina Cruz', cab: 0, occ: 0, vtas: 118300, staff: 7 },
  { id: 's4', n: 'Surco', b: 'depizone', dir: 'Av. Primavera 1340', resp: 'Lic. Paola Ríos', cab: 5, occ: 88, vtas: 87600, staff: 8 },
  { id: 's5', n: 'Los Olivos', b: 'depizone', dir: 'C.C. MegaPlaza, Local 214', resp: 'Lic. Sandra Huamán', cab: 3, occ: 69, vtas: 52100, staff: 5 },
  { id: 's6', n: 'Camino Real', b: 'integrativa', dir: 'Av. Camino Real 1120', resp: 'Dra. Sofía Benavides', cab: 4, occ: 0, vtas: 0, staff: 6, soon: true }
];
const CATALOG = [
  { id: 'c1', b: 'darmed', n: 'Toxina botulínica (3 zonas)', p: 690, cat: 'Tratamiento' }, { id: 'c2', b: 'darmed', n: 'Ácido hialurónico 1 ml', p: 1150, cat: 'Tratamiento' }, { id: 'c3', b: 'darmed', n: 'Hydrafacial', p: 350, cat: 'Tratamiento' }, { id: 'c4', b: 'darmed', n: 'Peeling químico', p: 280, cat: 'Tratamiento' },
  { id: 'c5', b: 'darmed', n: 'C E Ferulic 30 ml', p: 649, cat: 'Producto' }, { id: 'c6', b: 'renace', n: 'Lip Sleeping Mask', p: 89.9, cat: 'Producto' }, { id: 'c7', b: 'renace', n: 'Olaplex N°7', p: 132, cat: 'Producto' }, { id: 'c8', b: 'renace', n: 'Snail 96 Mucin', p: 79.9, cat: 'Producto' },
  { id: 'c9', b: 'depizone', n: 'Láser axilas · sesión', p: 59, cat: 'Tratamiento' }, { id: 'c10', b: 'depizone', n: 'Láser piernas · sesión', p: 159, cat: 'Tratamiento' }, { id: 'c11', b: 'depizone', n: 'Gel post láser', p: 49, cat: 'Producto' }, { id: 'c12', b: 'integrativa', n: 'Suero Glow Drip', p: 240, cat: 'Tratamiento' }
];
const seedOrders = Array.from({ length: 46 }, (_, i) => { const b = KEYS[[0, 1, 3, 0, 1, 3, 0, 2, 1, 0][i % 10]]; const items = CATALOG.filter(c => c.b === b); const it = items[i % items.length]; const q = 1 + (i % 3 === 0 ? 1 : 0);
  return { id: 's' + i, type: 'order', brand: b, code: b.slice(0, 3).toUpperCase() + '-' + (48210 + i * 37), client: NAMES[i % NAMES.length], label: `${q}× ${it.n}`, amount: it.p * q, method: METHODS[i % 6], sede: SEDES.find(s => s.b === b).n, t: Date.now() - (i + 1) * 2.9 * 3600e3, status: i % 11 === 4 ? 'Reembolsado' : i % 7 === 2 ? 'Pendiente' : 'Pagado' }; });
const posSales = () => store.get('gd-pos', []);
const webOrders = () => Group.events().filter(e => e.type === 'order').map(o => ({ ...o, method: 'Web · tarjeta', sede: 'Tienda online', status: 'Por despachar', web: true }));
const allOrders = () => [...webOrders(), ...posSales(), ...seedOrders].filter(o => brandOk(o.brand)).sort((a, b) => b.t - a.t);
const brandWeb = k => webOrders().concat(posSales()).filter(o => o.brand === k).reduce((a, o) => a + o.amount, 0);

const CLIENTS = NAMES.map((n, i) => { const brands = KEYS.filter((_, j) => (i + j) % 3 !== 2).slice(0, 1 + i % 3); return { id: 'cl' + i, n, mail: n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(' ', '.') + '@gmail.com', tel: '9' + String(41000000 + i * 1234567).slice(0, 8), brands, visits: 28 - i, ltv: 9200 - i * 430, last: Date.now() - (i * 2 + 1) * 864e5, seg: ['VIP', 'Frecuente', 'Frecuente', 'Nuevo', 'En riesgo'][i % 5], sede: SEDES[i % 5].n, birth: `${(i % 28) + 1}/${(i % 12) + 1}` }; });
const INV = [
  ['C E Ferulic Sérum 30 ml', 'darmed', 'Dermocosmética', 8, 10, 412, 'San Isidro'], ['Toxina botulínica 100U', 'darmed', 'Insumo médico', 24, 15, 980, 'San Isidro'], ['Ácido hialurónico 1 ml', 'darmed', 'Insumo médico', 31, 20, 610, 'Miraflores'], ['Sculptra vial', 'darmed', 'Insumo médico', 6, 8, 1450, 'San Isidro'],
  ['Kit Post-Botox', 'darmed', 'Dermocosmética', 14, 8, 160, 'Miraflores'], ['Lip Sleeping Mask Berry', 'renace', 'Skincare', 4, 12, 48, 'Jockey Plaza'], ['Olaplex N°7 30 ml', 'renace', 'Cabello', 46, 15, 78, 'Jockey Plaza'], ['Snail 96 Mucin Essence', 'renace', 'Skincare', 19, 15, 42, 'Jockey Plaza'],
  ['Relief Sun SPF50+', 'renace', 'Skincare', 62, 20, 36, 'Jockey Plaza'], ['Soft Pinch Blush', 'renace', 'Maquillaje', 9, 10, 70, 'Jockey Plaza'], ['Gel calmante post láser', 'depizone', 'Post láser', 62, 30, 18, 'Surco'], ['Protector SPF50+ BLUESKIN', 'depizone', 'Post láser', 11, 20, 26, 'Los Olivos'],
  ['Gel conductor 5 L', 'depizone', 'Insumo', 7, 6, 95, 'Surco'], ['Ampollas Vitamina C IV', 'integrativa', 'Sueroterapia', 120, 50, 22, 'Camino Real'], ['NAD+ 250 mg', 'integrativa', 'Sueroterapia', 18, 20, 210, 'Camino Real']
].map((r, i) => ({ id: 'p' + i, n: r[0], b: r[1], cat: r[2], stock: r[3], min: r[4], cost: r[5], sede: r[6], sku: `SKU-${r[1].slice(0, 2).toUpperCase()}${1040 + i * 7}`, venc: i % 5 === 3 ? '12/2026' : `0${(i % 9) + 1}/2027` }));
const ROLES = [
  { id: 'master', n: 'Master', d: 'Acceso total al grupo', c: '#a8336f' }, { id: 'admin', n: 'Administrador de sede', d: 'Gestión de una sede', c: '#4252d6' },
  { id: 'cajero', n: 'Cajero', d: 'Caja y ventas', c: '#b26b00' }, { id: 'agendador', n: 'Agendador', d: 'Agenda y clientes', c: '#0b97d4' }, { id: 'doctor', n: 'Doctor', d: 'Agenda propia y fichas', c: '#2f8a5b' }
];
const MODS = ['Dashboard', 'Reportes', 'Caja', 'Agendamientos', 'Clientes', 'Inventario', 'Usuarios', 'Configuración'];
const ACTS = ['Ver', 'Crear', 'Editar', 'Eliminar'];
const defPerm = { master: () => true, admin: (m, a) => m !== 'Configuración' || a === 'Ver', cajero: (m, a) => ['Caja', 'Clientes'].includes(m) ? a !== 'Eliminar' : m === 'Dashboard' && a === 'Ver', agendador: (m, a) => ['Agendamientos', 'Clientes'].includes(m) ? a !== 'Eliminar' : m === 'Dashboard' && a === 'Ver', doctor: (m, a) => (m === 'Agendamientos' && a !== 'Eliminar') || (m === 'Clientes' && a === 'Ver') };
let PERMS = store.get('gd-perms', null) || Object.fromEntries(ROLES.map(r => [r.id, Object.fromEntries(MODS.map(m => [m, ACTS.filter(a => defPerm[r.id](m, a))]))]));
let USERS = store.get('gd-users', null) || [
  ['Daniela Armas', 'gerencia@grupodarmed.pe', 'master', 'San Isidro', 'Activo', 0.2], ['Martín Salazar', 'm.salazar@grupodarmed.pe', 'doctor', 'Miraflores', 'Activo', 3], ['Karla Mendoza', 'agenda@grupodarmed.pe', 'agendador', 'San Isidro', 'Activo', 1],
  ['Lucía Ferreyra', 'l.ferreyra@grupodarmed.pe', 'doctor', 'San Isidro', 'Activo', 26], ['Valentina Cruz', 'v.cruz@renace.pe', 'admin', 'Jockey Plaza', 'Activo', 5], ['Paola Ríos', 'p.rios@depizone.pe', 'admin', 'Surco', 'Activo', 9],
  ['Jhon Quispe', 'caja.surco@depizone.pe', 'cajero', 'Surco', 'Activo', 2], ['Milagros Tello', 'caja.si@grupodarmed.pe', 'cajero', 'San Isidro', 'Suspendido', 410], ['Sofía Benavides', 's.benavides@integrativa.pe', 'admin', 'Camino Real', 'Invitado', null]
].map((u, i) => ({ id: 'u' + i, n: u[0], mail: u[1], role: u[2], sede: u[3], st: u[4], last: u[5] == null ? null : Date.now() - u[5] * 3600e3, mfa: i % 3 !== 2 }));

/* ---------- Navegación ---------- */
const VIEWS = { dashboard: ['Dashboard', vDashboard], reportes: ['Reportes', vReportes], caja: ['Caja y ventas', vCaja], clientes: ['Clientes', vClientes], inventario: ['Inventario', vInventario], usuarios: ['Usuarios', vUsuarios], roles: ['Roles y permisos', vRoles], sedes: ['Sedes', vSedes], historial: ['Historial', vHistorial], config: ['Configuración', vConfig] };
let cur = 'dashboard';
function go(v) {
  if (!VIEWS[v]) v = 'dashboard'; cur = v;
  $$('.view').forEach(x => x.classList.toggle('on', x.id === 'v-' + v));
  $$('.side [data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === v));
  Admin.setTitle(VIEWS[v][0]); document.title = VIEWS[v][0] + ' | Grupo DARMED';
  VIEWS[v][1]($('#v-' + v)); scrollTo({ top: 0 });
}
function boot() {
  Admin.mount({ page: 'master', active: cur, title: VIEWS[cur][0], onBrand: () => go(cur), onTheme: () => go(cur),
    search: q => q.length < 2 ? [] : [
      ...CLIENTS.filter(c => c.n.toLowerCase().includes(q)).slice(0, 4).map(c => ({ g: 'Clientes', n: c.n, ic: 'user', sub: c.seg, fn: () => { go('clientes'); clientSheet(c); } })),
      ...allOrders().filter(o => (o.code || '').toLowerCase().includes(q)).slice(0, 3).map(o => ({ g: 'Ventas', n: o.code + ' · ' + o.client, ic: 'receipt', sub: S(o.amount), fn: () => { go('caja'); orderSheet(o); } })),
      ...INV.filter(p => p.n.toLowerCase().includes(q)).slice(0, 3).map(p => ({ g: 'Inventario', n: p.n, ic: 'box', sub: p.stock + ' und', fn: () => { go('inventario'); invSheet(p); } }))
    ] });
}
addEventListener('hashchange', () => go(location.hash.slice(1)));
const head = (t, p, act = '') => `<div class="ph"><div><h1>${t}</h1><p>${p}</p></div><div class="ph__act">${act}</div></div>`;
const kpi = (l, ic, v, d, up, sp, c) => `<div class="card kpi"><div class="lbl"><span class="ico">${I(ic)}</span>${l}</div><b>${v}</b><div class="foot">${d ? `<span class="delta ${up ? 'up' : 'down'}">${up ? '↑' : '↓'} ${d}</span> vs periodo ant.` : ''}</div>${sp ? Admin.spark(sp, c || '#a8336f') : ''}</div>`;

/* ================= DASHBOARD ================= */
let range = 30;
function vDashboard(el) {
  const ks = KEYS.filter(brandOk);
  const tot = k => SERIES[k].slice(-range).reduce((a, b) => a + b, 0) + brandWeb(k);
  const sum = ks.reduce((a, k) => a + tot(k), 0);
  const daily = Array.from({ length: range }, (_, i) => ks.reduce((a, k) => a + SERIES[k][90 - range + i], 0));
  const ev = Group.events();
  const greet = new Date().getHours() < 12 ? 'Buenos días' : new Date().getHours() < 19 ? 'Buenas tardes' : 'Buenas noches';
  el.innerHTML = head(`${greet}, ${user ? esc(user.name.split(' ')[0]) : 'equipo'}`, `Resumen de ${Admin.BRANDS[Admin.state.brand].n.toLowerCase()} · ${new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}`,
    `<div class="seg" id="rng">${[7, 30, 90].map(r => `<button class="${r === range ? 'on' : ''}" data-r="${r}">${r} días</button>`).join('')}</div><button class="btn btn--ghost" onclick="UI.toast('Reporte exportado (maqueta)','⤓')">${I('down')} Exportar</button>`) +
    `<div class="banner"><span class="ic">${I('globe')}</span><p style="flex:1">Las <b>ventas, reservas y registros</b> hechos en las webs del grupo se integran aquí en tiempo real. ${ev.length ? `Hay <b>${ev.length} eventos web</b> registrados.` : 'Aún no hay eventos web: prueba una compra en una tienda.'}</p><a class="btn btn--ghost btn--sm" href="renace.html" target="_blank">Abrir RENACE ${I('ext')}</a></div>
    <div class="kpis">
      ${kpi('Ingresos', 'cash', S(sum), '12,4%', true, daily, '#a8336f')}
      ${kpi('Citas agendadas', 'cal', (Group.bookings().length + Math.round(range * 7.1)).toLocaleString('es-PE'), '8,1%', true, daily.map((v, i) => v * .7 + i * 50), '#4252d6')}
      ${kpi('Clientes nuevos', 'users', (Math.round(range * 4.3) + ev.filter(e => e.type === 'lead').length).toLocaleString('es-PE'), '21,7%', true, daily.map((v, i) => v + i * 120), '#2f8a5b')}
      ${kpi('Ticket promedio', 'receipt', S(318 + range / 3), '2,3%', false, daily.map(v => 30000 - v * .4), '#b26b00')}
    </div>
    <div class="brand-row">${KEYS.map(k => { const o = allOrders().filter(x => x.brand === k).length; return `<div class="card bcard" style="--bc:${BM[k].c};${brandOk(k) ? '' : 'opacity:.45'}"><div class="bcard__t">${bchip(k)}<a class="ib" href="${BM[k].h}" target="_blank" title="Abrir web" style="width:28px;height:28px">${I('ext')}</a></div><div class="bcard__v">${S(tot(k))}</div><div class="bcard__m"><span><b>${o}</b> ventas</span><span><b>${Group.bookings().filter(b => b.brand === k).length}</b> citas web</span><span><b>${Group.cartCount(k)}</b> en carrito</span></div></div>`; }).join('')}</div>
    <div class="grid-2">
      <div class="card"><div class="card__head"><div><h3>Ingresos por marca</h3><small>Últimos ${range} días</small></div><div class="legend">${ks.map(k => `<span><i style="background:${BM[k].c}"></i>${BM[k].n}</span>`).join('')}</div></div><div class="card__body"><svg class="chart" id="dLine"></svg></div></div>
      <div class="card"><div class="card__head"><div><h3>Actividad reciente</h3><small>Webs y sedes</small></div><span class="st st--ok">En vivo</span></div><div class="feed" id="dFeed" style="max-height:330px;overflow:auto"></div></div>
    </div>
    <div class="grid-3">
      <div class="card"><div class="card__head"><h3>Participación por marca</h3></div><div class="card__body" style="display:grid;grid-template-columns:150px 1fr;gap:18px;align-items:center"><svg id="dDonut" width="150" height="150"></svg><div class="hbar" id="dDonutL"></div></div></div>
      <div class="card"><div class="card__head"><h3>Servicios más vendidos</h3><small>Unidades</small></div><div class="card__body hbar" id="dTop"></div></div>
      <div class="card"><div class="card__head"><h3>Metas del mes</h3><small>Noviembre 2026</small></div><div class="card__body" style="display:grid;gap:16px" id="dGoals"></div></div>
    </div>
    <div class="card"><div class="card__head"><div><h3>Últimas transacciones</h3><small>Todas las sedes y canales</small></div><a class="btn btn--ghost btn--sm" href="#caja">Ver todas</a></div><div id="dTx"></div></div>`;
  const labels = Array.from({ length: range }, (_, i) => new Date(Date.now() - (range - 1 - i) * 864e5).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }));
  Admin.lineChart($('#dLine'), ks.map(k => ({ n: BM[k].n, c: BM[k].c, d: SERIES[k].slice(-range) })), labels, K, { area: ks.length === 1 });
  const parts = KEYS.map(k => ({ n: BM[k].n, c: BM[k].c, v: tot(k) }));
  Admin.donut($('#dDonut'), parts, [K(parts.reduce((a, p) => a + p.v, 0)), 'total']);
  const pt = parts.reduce((a, p) => a + p.v, 0);
  $('#dDonutL').innerHTML = parts.map(p => `<div style="display:flex;justify-content:space-between;font-size:.82rem"><span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${p.c};margin-right:8px"></i>${p.n}</span><b>${(p.v / pt * 100).toFixed(1)}%</b></div>`).join('');
  const top = [['Toxina botulínica', 142, 'darmed'], ['Láser axilas', 128, 'depizone'], ['Hydrafacial', 96, 'darmed'], ['Lip Sleeping Mask', 88, 'renace'], ['Ácido hialurónico', 61, 'darmed'], ['Olaplex N°7', 57, 'renace']].filter(t => brandOk(t[2]));
  $('#dTop').innerHTML = top.map(t => `<div class="hbar__row" style="grid-template-columns:minmax(0,1fr) 90px 36px"><span>${t[0]}</span><div class="track"><span style="width:${t[1] / 142 * 100}%;background:${BM[t[2]].c}"></span></div><b>${t[1]}</b></div>`).join('');
  $('#dGoals').innerHTML = [['Ventas', 78, '#a8336f', 'S/ 312k de S/ 400k'], ['Clientes nuevos', 64, '#0b97d4', '640 de 1,000'], ['NPS', 92, '#2f8a5b', '92 de 100'], ['Ocupación de cabinas', 71, '#b26b00', '71% promedio']].map(g => `<div><div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:6px"><b>${g[0]}</b><span style="color:var(--muted)">${g[3]}</span></div><div class="meter"><span style="width:${g[1]}%;background:${g[2]}"></span></div></div>`).join('');
  renderFeed();
  Admin.table($('#dTx'), { size: 5, rows: allOrders, text: o => JSON.stringify(o), onRow: orderSheet, cols: txCols() });
  $('#rng').onclick = e => { const b = e.target.closest('[data-r]'); if (b) { range = +b.dataset.r; vDashboard(el); } };
}
let seen = new Set(Group.events().map(e => e.id));
function renderFeed() {
  const el = $('#dFeed'); if (!el) return;
  const ic = { order: 'bag', booking: 'cal', lead: 'spark', login: 'lock' }, vb = { order: 'Venta', booking: 'Reserva', lead: 'Lead', login: 'Acceso' };
  const ev = Group.events().filter(e => e.brand === 'grupo' || brandOk(e.brand)).slice(0, 20);
  const list = ev.length ? ev : seedOrders.slice(0, 6).map(o => ({ ...o, label: o.client + ' · ' + o.label }));
  el.innerHTML = list.map(e => `<div class="feed-item ${e.id && !seen.has(e.id) ? 'new' : ''}"><span class="dot">${I(ic[e.type] || 'bell')}</span><div style="min-width:0;flex:1"><div style="display:flex;justify-content:space-between;gap:8px"><b>${vb[e.type] || e.type}</b>${e.amount ? `<b>${S(e.amount)}</b>` : ''}</div><small style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(e.label || '')}</small><small>${BM[e.brand] ? BM[e.brand].n + ' · ' : ''}${Admin.ago(e.t)}</small></div></div>`).join('');
  ev.filter(e => !seen.has(e.id) && e.type !== 'login').forEach(e => toast(`${vb[e.type]} en <b>${BM[e.brand] ? BM[e.brand].n : ''}</b>${e.amount ? ' · ' + S(e.amount) : ''}`, '●'));
  seen = new Set(Group.events().map(e => e.id));
}
const stCls = s => ({ Pagado: 'st--ok', 'Por despachar': 'st--info', Pendiente: 'st--warn', Reembolsado: 'st--bad' }[s] || 'st--mute');
const txCols = () => [
  { k: 'code', l: 'Código', f: o => `<b>${esc(o.code || '—')}</b>${o.web ? ' <span class="tagx">WEB</span>' : o.pos ? ' <span class="tagx">POS</span>' : ''}` },
  { k: 'client', l: 'Cliente', f: o => `<div class="who"><span class="av-s" style="background:${COL[(o.client || 'C').length % 8]}">${esc((o.client || 'C')[0])}</span>${esc(o.client || 'Cliente web')}</div>` },
  { k: 'brand', l: 'Marca', f: o => bchip(o.brand) },
  { k: 'label', l: 'Detalle', sortable: false, f: o => `<span style="max-width:240px;display:inline-block;overflow:hidden;text-overflow:ellipsis;vertical-align:middle">${esc(o.label)}</span>` },
  { k: 'method', l: 'Método', f: o => o.method },
  { k: 'status', l: 'Estado', f: o => `<span class="st ${stCls(o.status)}">${o.status}</span>` },
  { k: 't', l: 'Fecha', f: o => new Date(o.t).toLocaleString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) },
  { k: 'amount', l: 'Monto', r: true, f: o => `<b>${S2(o.amount)}</b>` }
];
function orderSheet(o) {
  Admin.openSheet({
    head: `<span class="ib" style="background:var(--soft)">${I('receipt')}</span><div><b style="font-size:1rem">${esc(o.code)}</b><div style="font-size:.78rem;color:var(--muted)">${new Date(o.t).toLocaleString('es-PE')}</div></div>`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px"><span class="st ${stCls(o.status)}">${o.status}</span><b style="font-size:1.6rem">${S2(o.amount)}</b></div>
      <dl class="dl"><dt>Cliente</dt><dd>${esc(o.client || 'Cliente web')}</dd><dt>Marca</dt><dd>${bchip(o.brand)}</dd><dt>Canal / sede</dt><dd>${esc(o.sede || '—')}</dd><dt>Método de pago</dt><dd>${o.method}</dd><dt>Comprobante</dt><dd>Boleta electrónica B001-${(o.code || '').replace(/\D/g, '')}</dd></dl>
      <div class="sec-t">Detalle</div><div class="card" style="box-shadow:none">${esc(o.label).split(', ').map(l => `<div class="list-r"><span>${l}</span></div>`).join('')}<div class="list-r"><b>Total</b><b>${S2(o.amount)}</b></div></div>
      <div class="sec-t">Seguimiento</div><div class="tl"><div><b>Pago confirmado</b><small>${new Date(o.t).toLocaleString('es-PE')}</small></div><div><b>Comprobante emitido</b><small>SUNAT · aceptado</small></div><div><b>${o.web ? 'Pendiente de despacho' : 'Entregado en sede'}</b><small>${o.web ? 'Delivery Lima · 1 h' : esc(o.sede || '')}</small></div></div>`,
    foot: `<button class="btn btn--ghost" onclick="UI.toast('Enviando a impresora (maqueta)','🖨')">${I('printer')} Imprimir</button>${o.status !== 'Reembolsado' ? `<button class="btn btn--ghost" onclick="UI.toast('Solicitud de reembolso registrada','↺');Admin.closeSheet()">Reembolsar</button>` : ''}<button class="btn" onclick="UI.toast('Comprobante enviado al cliente','✉');Admin.closeSheet()">${I('mail')} Enviar comprobante</button>`
  });
}

/* ================= REPORTES ================= */
let repTab = 'ventas';
function vReportes(el) {
  const months = ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov'];
  const ks = KEYS.filter(brandOk);
  const mdata = months.map((m, i) => ({ l: m, v: ks.map(k => BASE[k] * 26 * (0.8 + Math.sin(i / 2 + KEYS.indexOf(k)) * .12 + i / 40)), c: ks.map(k => BM[k].c) }));
  const yr = mdata.reduce((a, m) => a + m.v.reduce((x, y) => x + y, 0), 0);
  el.innerHTML = head('Reportes', 'Análisis de rendimiento comercial y operativo del grupo.', `<select class="inp"><option>Últimos 12 meses</option><option>Este año</option><option>Trimestre actual</option></select><button class="btn btn--ghost" onclick="UI.toast('Exportado a Excel (maqueta)','⤓')">${I('down')} Excel</button><button class="btn" onclick="UI.toast('PDF generado (maqueta)','⤓')">${I('down')} PDF</button>`) +
    `<div class="seg" id="repTabs" style="margin-bottom:14px">${[['ventas', 'Ventas'], ['operacion', 'Operación'], ['marketing', 'Marketing']].map(([k, n]) => `<button class="${k === repTab ? 'on' : ''}" data-rt="${k}">${n}</button>`).join('')}</div><div id="repB"></div>`;
  const b = $('#repB');
  if (repTab === 'ventas') {
    b.innerHTML = `<div class="kpis">${kpi('Ventas 12 meses', 'cash', K(yr), '18,2%', true)}${kpi('Margen bruto', 'trend', '58,4%', '1,6 pp', true)}${kpi('Costo por venta', 'receipt', 'S/ 41', '4,1%', false)}${kpi('Recompra a 90 días', 'users', '46%', '3,0 pp', true)}</div>
      <div class="card" style="margin-bottom:14px"><div class="card__head"><div><h3>Ventas mensuales por marca</h3><small>Soles · pasa el mouse por las barras</small></div><div class="legend">${ks.map(k => `<span><i style="background:${BM[k].c}"></i>${BM[k].n}</span>`).join('')}</div></div><div class="card__body"><svg class="chart" id="rBar"></svg></div></div>
      <div class="card"><div class="card__head"><h3>Estado de resultados por marca</h3><small>Últimos 12 meses</small></div><div id="rPL"></div></div>`;
    Admin.barChart($('#rBar'), mdata, K);
    const rows = ks.map(k => { const v = BASE[k] * 26 * 12 * 1.05; return { k, v, c: v * (.36 + KEYS.indexOf(k) * .03), g: v * .22 }; });
    Admin.table($('#rPL'), { size: 6, rows: () => rows, text: r => r.k, cols: [{ k: 'k', l: 'Marca', f: r => bchip(r.k) }, { k: 'v', l: 'Ingresos', r: true, f: r => S(r.v) }, { k: 'c', l: 'Costo de venta', r: true, f: r => S(r.c) }, { k: 'g', l: 'Gastos operativos', r: true, f: r => S(r.g) }, { k: 'u', l: 'Utilidad', r: true, v: r => r.v - r.c - r.g, f: r => `<b>${S(r.v - r.c - r.g)}</b>` }, { k: 'm', l: 'Margen', r: true, v: r => (r.v - r.c - r.g) / r.v, f: r => `<span class="st st--ok">${((r.v - r.c - r.g) / r.v * 100).toFixed(1)}%</span>` }] });
  } else if (repTab === 'operacion') {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    b.innerHTML = `<div class="kpis">${kpi('Ocupación promedio', 'cal', '76%', '4,0 pp', true)}${kpi('Inasistencias', 'alert', '6,8%', '1,2 pp', false)}${kpi('Tiempo de atención', 'hist', '47 min', '3 min', true)}${kpi('Citas por doctor/día', 'user', '8,4', '0,6', true)}</div>
      <div class="grid-2e"><div class="card"><div class="card__head"><div><h3>Mapa de ocupación</h3><small>Promedio por día y hora · todas las sedes</small></div></div><div class="card__body"><div class="heat">${'<span></span>' + Array.from({ length: 12 }, (_, h) => `<span style="text-align:center">${h + 8}</span>`).join('')}${days.map((d, di) => `<span>${d}</span>` + Array.from({ length: 12 }, (_, h) => { const v = Math.min(1, .25 + Math.sin((h + 2) / 3.5) * .35 + (di === 5 ? .25 : 0) + (h > 8 ? .15 : 0) + ((di * 7 + h) % 5) * .05); return `<div title="${d} ${h + 8}:00 · ${Math.round(v * 100)}%" style="background:color-mix(in srgb,#a8336f ${Math.round(v * 100)}%,var(--soft))"></div>`; }).join('')).join('')}</div></div></div>
      <div class="card"><div class="card__head"><h3>Productividad por especialista</h3><small>Atenciones del mes</small></div><div class="card__body hbar">${[['Dra. Daniela Armas', 168, '#a8336f'], ['Lic. Paola Ríos', 152, '#0b97d4'], ['Dr. Martín Salazar', 131, '#4252d6'], ['Lic. Andrea Paredes', 118, '#b26b00'], ['Dra. Lucía Ferreyra', 96, '#2f8a5b']].map(r => `<div class="hbar__row"><span>${r[0]}</span><div class="track"><span style="width:${r[1] / 168 * 100}%;background:${r[2]}"></span></div><b>${r[1]}</b></div>`).join('')}</div></div></div>`;
  } else {
    const funnel = [['Visitas web', 48210], ['Vieron producto/servicio', 21680], ['Agregaron al carrito', 6420], ['Iniciaron pago', 2890], ['Compraron', 1964]];
    const vis = store.get('gd-visits', {});
    b.innerHTML = `<div class="kpis">${kpi('Visitas web', 'globe', (48210 + Object.values(vis).reduce((a, x) => a + x, 0)).toLocaleString('es-PE'), '9,3%', true)}${kpi('Conversión', 'trend', '4,07%', '0,4 pp', true)}${kpi('Leads', 'spark', (1284 + Group.events().filter(e => e.type === 'lead').length).toLocaleString('es-PE'), '21,7%', true)}${kpi('CAC', 'cash', 'S/ 38', '6,2%', false)}</div>
      <div class="grid-2e"><div class="card"><div class="card__head"><div><h3>Embudo de conversión web</h3><small>Últimos 30 días · todas las marcas</small></div></div><div class="card__body" style="display:grid;gap:10px">${funnel.map((f, i) => `<div><div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:5px"><span>${f[0]}</span><b>${f[1].toLocaleString('es-PE')} ${i ? `<span style="color:var(--muted);font-weight:500">· ${(f[1] / funnel[i - 1][1] * 100).toFixed(1)}%</span>` : ''}</b></div><div class="track" style="height:22px;border-radius:6px"><span style="width:${f[1] / funnel[0][1] * 100}%;background:linear-gradient(90deg,#a8336f,#ea4c89);border-radius:6px"></span></div></div>`).join('')}</div></div>
      <div class="card"><div class="card__head"><h3>Canales de adquisición</h3></div><div class="card__body hbar">${[['Instagram', 38, '#ea4c89'], ['TikTok', 24, '#0f1117'], ['Google', 18, '#4252d6'], ['Referidos', 12, '#2f8a5b'], ['WhatsApp', 8, '#14915f']].map(r => `<div class="hbar__row"><span>${r[0]}</span><div class="track"><span style="width:${r[1] / 38 * 100}%;background:${r[2]}"></span></div><b>${r[1]}%</b></div>`).join('')}</div></div></div>`;
  }
  $('#repTabs').onclick = e => { const t = e.target.closest('[data-rt]'); if (t) { repTab = t.dataset.rt; vReportes(el); } };
}

/* ================= CAJA ================= */
let cajaTab = 'pos', ticket = [], payM = 'Efectivo', posBrand = 'darmed', posCli = '';
function vCaja(el) {
  const today = allOrders().filter(o => Date.now() - o.t < 864e5 && o.status !== 'Reembolsado');
  const sumT = today.reduce((a, o) => a + o.amount, 0);
  el.innerHTML = head('Caja y ventas', `Caja abierta por ${user ? esc(user.name) : 'Invitado'} · apertura 08:00 · fondo inicial S/ 300.00`, `<button class="btn btn--ghost" id="bCierre">${I('lock')} Cierre de caja</button>`) +
    `<div class="kpis">${kpi('Ventas de hoy', 'cash', S2(sumT), '6,2%', true)}${kpi('Transacciones hoy', 'receipt', today.length, '', true)}${kpi('Efectivo en caja', 'cash', S2(300 + today.filter(o => o.method === 'Efectivo').reduce((a, o) => a + o.amount, 0)), '', true)}${kpi('Pedidos web por despachar', 'bag', webOrders().length, '', true)}</div>
    <div class="seg" id="cTabs" style="margin-bottom:14px">${[['pos', 'Punto de venta'], ['mov', 'Movimientos']].map(([k, n]) => `<button class="${k === cajaTab ? 'on' : ''}" data-ct="${k}">${n}</button>`).join('')}</div><div id="cajaB"></div>`;
  $('#cTabs').onclick = e => { const t = e.target.closest('[data-ct]'); if (t) { cajaTab = t.dataset.ct; vCaja(el); } };
  $('#bCierre').onclick = () => cierre(today);
  if (cajaTab === 'mov') {
    const fl = { st: 'Todos' };
    $('#cajaB').innerHTML = `<div class="card"><div class="toolbar"><div class="inp-ic">${I('search')}<input class="inp" placeholder="Buscar código, cliente…" id="mQ"></div>${['Todos', 'Pagado', 'Por despachar', 'Pendiente', 'Reembolsado'].map(s => `<button class="fchip ${s === 'Todos' ? 'on' : ''}" data-fs="${s}">${s}</button>`).join('')}<span class="sp"></span><button class="btn btn--ghost btn--sm" onclick="UI.toast('Exportado (maqueta)','⤓')">${I('down')} Exportar</button></div><div id="mT"></div></div>`;
    const t = Admin.table($('#mT'), { size: 10, rows: () => allOrders().filter(o => fl.st === 'Todos' || o.status === fl.st), text: o => JSON.stringify(o), onRow: orderSheet, cols: txCols() });
    $('#mQ').oninput = e => t.search(e.target.value);
    $('#cajaB').querySelectorAll('[data-fs]').forEach(b => b.onclick = () => { fl.st = b.dataset.fs; $$('[data-fs]').forEach(x => x.classList.toggle('on', x === b)); t.draw(); });
    return;
  }
  $('#cajaB').innerHTML = `<div class="pos"><div class="card"><div class="toolbar"><div class="seg" id="posB">${KEYS.map(k => `<button class="${k === posBrand ? 'on' : ''}" data-pb="${k}">${BM[k].n}</button>`).join('')}</div><span class="sp"></span><div class="inp-ic">${I('search')}<input class="inp" placeholder="Buscar ítem" id="posQ"></div></div><div class="pos-grid" id="posG"></div></div>
    <div class="card ticket"><div class="card__head"><div><h3>Ticket actual</h3><small>Boleta electrónica</small></div><button class="btn btn--ghost btn--sm" id="tClear">Vaciar</button></div>
      <div style="padding:12px 18px;border-bottom:1px solid var(--line-2)"><input class="inp" style="width:100%" list="cliL" id="posCli" placeholder="Cliente (opcional)" value="${esc(posCli)}"><datalist id="cliL">${CLIENTS.map(c => `<option value="${c.n}">`).join('')}</datalist></div>
      <div class="ticket__l" id="tL"></div><div class="tot" id="tT"></div><div class="paym" id="payM"></div><div style="padding:0 18px 18px"><button class="btn btn--block" id="tPay" style="height:42px">Cobrar</button></div></div></div>`;
  const drawPOS = () => {
    const q = ($('#posQ').value || '').toLowerCase();
    $('#posG').innerHTML = CATALOG.filter(c => c.b === posBrand && c.n.toLowerCase().includes(q)).map(c => `<button class="pos-it" data-add="${c.id}"><small>${c.cat}</small><b>${c.n}</b><span class="p">${S2(c.p)}</span></button>`).join('') || `<div class="empty">Sin ítems</div>`;
    const sub = ticket.reduce((a, t) => a + t.p * t.q, 0);
    $('#tL').innerHTML = ticket.length ? ticket.map(t => `<div class="tline"><div><b style="font-size:.82rem">${t.n}</b><br><small style="color:var(--muted)">${S2(t.p)} · ${BM[t.b].n}</small></div><div class="qtyb"><button data-tq="-1" data-id="${t.id}">−</button><span>${t.q}</span><button data-tq="1" data-id="${t.id}">+</button></div><b>${S2(t.p * t.q)}</b></div>`).join('') : `<div class="empty">${I('bag')}Agrega ítems desde el catálogo</div>`;
    $('#tT').innerHTML = `<div><span>Op. gravada</span><span>${S2(sub / 1.18)}</span></div><div><span>IGV (18%)</span><span>${S2(sub - sub / 1.18)}</span></div><div class="g"><span>Total</span><span>${S2(sub)}</span></div>`;
    $('#payM').innerHTML = ['Efectivo', 'Visa', 'Yape', 'Plin'].map(m => `<button class="${m === payM ? 'on' : ''}" data-pm="${m}">${m}</button>`).join('');
    $('#tPay').textContent = ticket.length ? `Cobrar ${S2(sub)}` : 'Cobrar';
  };
  drawPOS();
  $('#posQ').oninput = drawPOS;
  $('#posCli').oninput = e => posCli = e.target.value;
  $('#cajaB').onclick = e => {
    const pb = e.target.closest('[data-pb]'); if (pb) { posBrand = pb.dataset.pb; $$('#posB button').forEach(x => x.classList.toggle('on', x === pb)); drawPOS(); }
    const a = e.target.closest('[data-add]'); if (a) { const c = CATALOG.find(x => x.id === a.dataset.add); const ex = ticket.find(t => t.id === c.id); ex ? ex.q++ : ticket.push({ ...c, q: 1 }); drawPOS(); }
    const q = e.target.closest('[data-tq]'); if (q) { const t = ticket.find(x => x.id === q.dataset.id); t.q += +q.dataset.tq; if (t.q < 1) ticket = ticket.filter(x => x !== t); drawPOS(); }
    const pm = e.target.closest('[data-pm]'); if (pm) { payM = pm.dataset.pm; drawPOS(); }
    if (e.target.id === 'tClear') { ticket = []; drawPOS(); }
    if (e.target.closest('#tPay')) {
      if (!ticket.length) return toast('Agrega al menos un ítem', '!');
      const total = ticket.reduce((x, t) => x + t.p * t.q, 0); const b = ticket[0].b;
      const sale = { id: 'pos' + Date.now(), type: 'order', pos: true, brand: b, code: 'POS-' + Math.floor(10000 + Math.random() * 89999), client: posCli || 'Cliente mostrador', label: ticket.map(t => `${t.q}× ${t.n}`).join(', '), amount: total, method: payM, sede: SEDES.find(s => s.b === b).n, t: Date.now(), status: 'Pagado' };
      store.set('gd-pos', [sale, ...posSales()].slice(0, 100));
      Group.log('audit', b, { label: `Venta ${sale.code} por ${S2(total)} (${payM})`, actor: user ? user.name : 'Invitado' });
      ticket = []; posCli = ''; toast(`Venta <b>${sale.code}</b> registrada · ${S2(total)}`, '✓'); vCaja(el); orderSheet(sale);
    }
  };
}
function cierre(today) {
  const by = {}; today.forEach(o => by[o.method] = (by[o.method] || 0) + o.amount);
  const tot = Object.values(by).reduce((a, b) => a + b, 0);
  $('#cierreB').innerHTML = `<h3 style="font-size:1.1rem;font-weight:700">Cierre de caja</h3><p style="color:var(--muted);font-size:.84rem;margin:4px 0 16px">${new Date().toLocaleDateString('es-PE', { dateStyle: 'full' })}</p>
    <div class="card" style="box-shadow:none;margin-bottom:14px">${Object.entries(by).map(([m, v]) => `<div class="list-r"><span>${m}</span><b>${S2(v)}</b></div>`).join('')}<div class="list-r"><span>Fondo inicial</span><b>S/ 300.00</b></div><div class="list-r" style="background:var(--surface-2)"><b>Total esperado</b><b>${S2(tot + 300)}</b></div></div>
    <div class="field"><label>Efectivo contado</label><input class="input" id="arq" type="number" step="0.01" value="${(300 + (by.Efectivo || 0)).toFixed(2)}"></div><p id="arqD" style="font-size:.82rem;margin-top:8px;color:var(--ok)">✓ Sin diferencias</p>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button class="btn btn--ghost" data-close>Cancelar</button><button class="btn" id="arqOk">Cerrar caja</button></div>`;
  UI.openModal('mCierre');
  const exp = 300 + (by.Efectivo || 0);
  $('#arq').oninput = e => { const d = +e.target.value - exp; $('#arqD').style.color = Math.abs(d) < .01 ? 'var(--ok)' : 'var(--danger)'; $('#arqD').textContent = Math.abs(d) < .01 ? '✓ Sin diferencias' : `Diferencia: ${d > 0 ? 'sobrante' : 'faltante'} de ${S2(Math.abs(d))}`; };
  $('#arqOk').onclick = () => { UI.closeModals(); Group.log('audit', 'grupo', { label: `Cierre de caja · ${S2(tot)}`, actor: user ? user.name : 'Invitado' }); toast('Caja cerrada y reporte Z generado', '🔒'); };
}

/* ================= CLIENTES ================= */
function vClientes(el) {
  const leads = Group.events().filter(e => e.type === 'lead');
  const segs = ['Todos', 'VIP', 'Frecuente', 'Nuevo', 'En riesgo']; let seg = 'Todos';
  el.innerHTML = head('Clientes', 'Base unificada de clientes de las 4 marcas.', `<button class="btn btn--ghost" onclick="UI.toast('Importación CSV (maqueta)','⤒')">Importar</button><button class="btn" onclick="UI.toast('Formulario de nuevo cliente (maqueta)','+')">${I('plus')} Nuevo cliente</button>`) +
    `<div class="kpis">${kpi('Clientes activos', 'users', '8,412', '5,4%', true)}${kpi('Clientes VIP', 'spark', '624', '9,1%', true)}${kpi('Valor de vida promedio', 'cash', 'S/ 2,840', '3,2%', true)}${kpi('En riesgo de abandono', 'alert', '312', '2,1%', false)}</div>
    <div class="grid-2"><div class="card"><div class="toolbar"><div class="inp-ic">${I('search')}<input class="inp" placeholder="Buscar por nombre, correo o teléfono" id="cQ" style="width:260px"></div>${segs.map(s => `<button class="fchip ${s === 'Todos' ? 'on' : ''}" data-sg="${s}">${s}</button>`).join('')}</div><div id="cT"></div></div>
    <div class="card"><div class="card__head"><div><h3>Leads web</h3><small>Newsletter, lista de espera y corporativo</small></div><span class="st st--info">${leads.length}</span></div><div class="feed">${leads.length ? leads.slice(0, 10).map(e => `<div class="feed-item"><span class="dot">${I('spark')}</span><div style="min-width:0"><b style="font-weight:600">${esc(e.label)}</b><small>${BM[e.brand].n} · ${Admin.ago(e.t)}</small></div></div>`).join('') : `<div class="empty">${I('mail')}Aún no hay leads web.<br>Suscríbete al newsletter de cualquier marca.</div>`}</div></div></div>`;
  const segC = { VIP: 'st--ok', Frecuente: 'st--info', Nuevo: 'st--mute', 'En riesgo': 'st--bad' };
  const t = Admin.table($('#cT'), { size: 8, sort: 'ltv', rows: () => CLIENTS.filter(c => (seg === 'Todos' || c.seg === seg) && c.brands.some(brandOk)), text: c => c.n + c.mail + c.tel, onRow: clientSheet, cols: [
    { k: 'n', l: 'Cliente', f: c => `<div class="who"><span class="av-s" style="background:${COL[CLIENTS.indexOf(c) % 8]}">${c.n.split(' ').map(x => x[0]).join('')}</span><div><b>${c.n}</b><small>${c.mail}</small></div></div>` },
    { k: 'brands', l: 'Marcas', sortable: false, f: c => c.brands.map(b => `<i title="${BM[b].n}" style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${BM[b].c};margin-right:3px"></i>`).join('') },
    { k: 'seg', l: 'Segmento', f: c => `<span class="st ${segC[c.seg]}">${c.seg}</span>` }, { k: 'visits', l: 'Visitas', r: true, f: c => c.visits },
    { k: 'ltv', l: 'Valor de vida', r: true, f: c => `<b>${S(c.ltv)}</b>` }, { k: 'last', l: 'Última visita', f: c => Admin.ago(c.last) }] });
  $('#cQ').oninput = e => t.search(e.target.value);
  el.querySelectorAll('[data-sg]').forEach(b => b.onclick = () => { seg = b.dataset.sg; el.querySelectorAll('[data-sg]').forEach(x => x.classList.toggle('on', x === b)); t.draw(); });
}
function clientSheet(c) {
  const hist = seedOrders.filter(o => o.client === c.n).slice(0, 5);
  Admin.openSheet({
    head: `<span class="av-s" style="width:42px;height:42px;font-size:.9rem;background:${COL[CLIENTS.indexOf(c) % 8]}">${c.n.split(' ').map(x => x[0]).join('')}</span><div><b style="font-size:1rem">${c.n}</b><div style="font-size:.78rem;color:var(--muted)">Cliente desde 2023 · ${c.seg}</div></div>`,
    body: `<div class="kpis" style="grid-template-columns:repeat(3,1fr);gap:8px"><div class="card kpi" style="padding:12px"><div class="lbl">Valor de vida</div><b style="font-size:1.1rem;margin:6px 0 0">${S(c.ltv)}</b></div><div class="card kpi" style="padding:12px"><div class="lbl">Visitas</div><b style="font-size:1.1rem;margin:6px 0 0">${c.visits}</b></div><div class="card kpi" style="padding:12px"><div class="lbl">Puntos</div><b style="font-size:1.1rem;margin:6px 0 0">${Math.round(c.ltv / 3).toLocaleString('es-PE')}</b></div></div>
      <div class="sec-t">Datos de contacto</div><dl class="dl"><dt>Correo</dt><dd>${c.mail}</dd><dt>Celular</dt><dd>${c.tel}</dd><dt>Sede habitual</dt><dd>${c.sede}</dd><dt>Cumpleaños</dt><dd>${c.birth}</dd><dt>Marcas</dt><dd>${c.brands.map(bchip).join(' ')}</dd><dt>Consentimientos</dt><dd><span class="st st--ok">Marketing</span> <span class="st st--ok">Datos clínicos</span></dd></dl>
      <div class="sec-t">Historial</div><div class="tl">${(hist.length ? hist : seedOrders.slice(0, 3)).map(o => `<div><b>${esc(o.label)}</b> · ${S2(o.amount)}<small>${BM[o.brand].n} · ${new Date(o.t).toLocaleDateString('es-PE', { dateStyle: 'medium' })}</small></div>`).join('')}</div>
      <div class="sec-t">Notas clínicas</div><div class="card" style="box-shadow:none;padding:12px;font-size:.84rem;color:var(--text-2)">Piel mixta, fototipo III. Sin alergias reportadas. Próximo control de toxina en 4 meses.</div>`,
    foot: `<a class="btn btn--ghost" href="https://wa.me/51943387184" target="_blank" rel="noopener">${I('phone')} WhatsApp</a><a class="btn" href="agendamiento.html">${I('cal')} Agendar cita</a>`
  });
}

/* ================= INVENTARIO ================= */
function vInventario(el) {
  let onlyLow = false;
  const rows = () => INV.filter(p => brandOk(p.b) && (!onlyLow || p.stock < p.min));
  const val = INV.filter(p => brandOk(p.b)).reduce((a, p) => a + p.stock * p.cost, 0);
  const low = INV.filter(p => brandOk(p.b) && p.stock < p.min).length;
  el.innerHTML = head('Inventario', 'Stock consolidado por sede, alertas de reposición y kardex.', `<button class="btn btn--ghost" onclick="UI.toast('Transferencia entre sedes (maqueta)','⇄')">Transferir</button><button class="btn" onclick="UI.toast('Orden de compra OC-2026-118 generada','📦')">${I('plus')} Orden de compra</button>`) +
    `<div class="kpis">${kpi('Valor del inventario', 'box', S(val), '', true)}${kpi('SKUs activos', 'receipt', INV.filter(p => brandOk(p.b)).length, '', true)}${kpi('Bajo stock mínimo', 'alert', low, '', false)}${kpi('Por vencer (60 días)', 'hist', INV.filter(p => brandOk(p.b) && p.venc === '12/2026').length, '', false)}</div>
    ${low ? `<div class="banner" style="border-color:color-mix(in srgb,var(--danger) 30%,var(--line))"><span class="ic" style="background:var(--danger-bg);color:var(--danger)">${I('alert')}</span><p style="flex:1"><b>${low} productos</b> están por debajo del stock mínimo. Te recomendamos generar una orden de compra.</p><button class="btn btn--ghost btn--sm" id="fLow">Ver solo estos</button></div>` : ''}
    <div class="card"><div class="toolbar"><div class="inp-ic">${I('search')}<input class="inp" placeholder="Buscar producto o SKU" id="iQ" style="width:260px"></div><button class="fchip" id="fLow2">Solo bajo stock</button><span class="sp"></span><button class="btn btn--ghost btn--sm" onclick="UI.toast('Exportado (maqueta)','⤓')">${I('down')} Exportar</button></div><div id="iT"></div></div>`;
  const t = Admin.table($('#iT'), { size: 10, sort: 'stock', dir: 1, rows, text: p => p.n + p.sku, onRow: invSheet, cols: [
    { k: 'n', l: 'Producto', f: p => `<div><b>${p.n}</b><small style="display:block;color:var(--muted)">${p.sku} · ${p.cat}</small></div>` }, { k: 'b', l: 'Marca', f: p => bchip(p.b) }, { k: 'sede', l: 'Sede', f: p => p.sede },
    { k: 'stock', l: 'Stock', f: p => `<div style="display:flex;align-items:center;gap:10px;min-width:150px"><div class="meter" style="flex:1"><span style="width:${Math.min(100, p.stock / (p.min * 2.5) * 100)}%;background:${p.stock < p.min ? 'var(--danger)' : p.stock < p.min * 1.5 ? 'var(--warn)' : 'var(--ok)'}"></span></div><b style="width:52px;text-align:right">${p.stock} und</b></div>` },
    { k: 'min', l: 'Mínimo', r: true, f: p => p.min }, { k: 'cost', l: 'Costo unit.', r: true, f: p => S2(p.cost) }, { k: 'venc', l: 'Vence', f: p => p.venc === '12/2026' ? `<span class="st st--warn">${p.venc}</span>` : p.venc },
    { k: 'st', l: 'Estado', v: p => p.stock - p.min, f: p => `<span class="st ${p.stock < p.min ? 'st--bad' : 'st--ok'}">${p.stock < p.min ? 'Reponer' : 'Disponible'}</span>` }] });
  $('#iQ').oninput = e => t.search(e.target.value);
  const tog = () => { onlyLow = !onlyLow; $('#fLow2').classList.toggle('on', onlyLow); t.draw(); };
  $('#fLow2').onclick = tog; if ($('#fLow')) $('#fLow').onclick = tog;
}
function invSheet(p) {
  const mv = Array.from({ length: 6 }, (_, i) => ({ t: Date.now() - (i * 3 + 1) * 864e5, tipo: ['Venta', 'Ingreso OC', 'Venta', 'Ajuste', 'Transferencia', 'Venta'][i], q: [-2, 20, -1, -1, -5, -3][i] }));
  Admin.openSheet({
    head: `<span class="ib" style="background:var(--soft)">${I('box')}</span><div><b style="font-size:1rem">${p.n}</b><div style="font-size:.78rem;color:var(--muted)">${p.sku} · ${BM[p.b].n}</div></div>`,
    body: `<div class="kpis" style="grid-template-columns:repeat(3,1fr);gap:8px"><div class="card kpi" style="padding:12px"><div class="lbl">Stock</div><b style="font-size:1.1rem;margin:6px 0 0;color:${p.stock < p.min ? 'var(--danger)' : 'inherit'}">${p.stock}</b></div><div class="card kpi" style="padding:12px"><div class="lbl">Mínimo</div><b style="font-size:1.1rem;margin:6px 0 0">${p.min}</b></div><div class="card kpi" style="padding:12px"><div class="lbl">Valorizado</div><b style="font-size:1.1rem;margin:6px 0 0">${S(p.stock * p.cost)}</b></div></div>
      <div class="sec-t">Ficha</div><dl class="dl"><dt>Categoría</dt><dd>${p.cat}</dd><dt>Sede</dt><dd>${p.sede}</dd><dt>Costo unitario</dt><dd>${S2(p.cost)}</dd><dt>Vencimiento</dt><dd>${p.venc}</dd><dt>Proveedor</dt><dd>${['Galderma Perú', 'Distribuidora Seúl SAC', 'Dermalab', 'MedSupply'][p.id.length % 4]}</dd></dl>
      <div class="sec-t">Kardex</div><div class="card" style="box-shadow:none">${mv.map(m => `<div class="list-r"><div><b style="font-weight:600">${m.tipo}</b><small style="display:block;color:var(--muted)">${new Date(m.t).toLocaleDateString('es-PE', { dateStyle: 'medium' })}</small></div><b style="color:${m.q > 0 ? 'var(--ok)' : 'var(--text)'}">${m.q > 0 ? '+' : ''}${m.q}</b></div>`).join('')}</div>`,
    foot: `<button class="btn btn--ghost" onclick="UI.toast('Ajuste registrado','✓');Admin.closeSheet()">Ajustar stock</button><button class="btn" onclick="UI.toast('Producto agregado a la orden de compra','📦');Admin.closeSheet()">Reponer</button>`
  });
}

/* ================= USUARIOS ================= */
function vUsuarios(el) {
  el.innerHTML = head('Usuarios', 'Personal con acceso a la plataforma del grupo.', `<button class="btn" data-open="mInvite">${I('plus')} Invitar usuario</button>`) +
    `<div class="kpis">${kpi('Usuarios', 'users', USERS.length, '', true)}${kpi('Activos', 'check', USERS.filter(u => u.st === 'Activo').length, '', true)}${kpi('Con 2FA', 'shield', Math.round(USERS.filter(u => u.mfa).length / USERS.length * 100) + '%', '', true)}${kpi('Invitaciones pendientes', 'mail', USERS.filter(u => u.st === 'Invitado').length, '', true)}</div>
    <div class="card"><div class="toolbar"><div class="inp-ic">${I('search')}<input class="inp" placeholder="Buscar usuario" id="uQ" style="width:260px"></div><span class="sp"></span><span style="font-size:.78rem;color:var(--muted)">Haz clic en una fila para ver el detalle</span></div><div id="uT"></div></div>`;
  const stC = { Activo: 'st--ok', Suspendido: 'st--bad', Invitado: 'st--warn' };
  const t = Admin.table($('#uT'), { size: 10, sort: 'last', rows: () => USERS, text: u => u.n + u.mail + u.role, onRow: userSheet, cols: [
    { k: 'n', l: 'Usuario', f: u => `<div class="who"><span class="av-s" style="background:${ROLES.find(r => r.id === u.role).c}">${u.n.split(' ').map(x => x[0]).join('')}</span><div><b>${esc(u.n)}</b><small>${esc(u.mail)}</small></div></div>` },
    { k: 'role', l: 'Rol', f: u => ROLES.find(r => r.id === u.role).n }, { k: 'sede', l: 'Sede', f: u => esc(u.sede) },
    { k: 'mfa', l: '2FA', f: u => u.mfa ? `<span class="st st--ok">Activo</span>` : `<span class="st st--mute">No</span>` },
    { k: 'st', l: 'Estado', f: u => `<span class="st ${stC[u.st]}">${u.st}</span>` }, { k: 'last', l: 'Último acceso', v: u => u.last || 0, f: u => u.last ? Admin.ago(u.last) : '—' }] });
  $('#uQ').oninput = e => t.search(e.target.value);
  $('#iRole').innerHTML = ROLES.map(r => `<option value="${r.id}">${r.n}</option>`).join('');
  $('#iSede').innerHTML = SEDES.map(s => `<option>${s.n}</option>`).join('');
  $('#fInvite').onsubmit = e => { e.preventDefault(); USERS.unshift({ id: 'u' + Date.now(), n: $('#iName').value, mail: $('#iMail').value, role: $('#iRole').value, sede: $('#iSede').value, st: 'Invitado', last: null, mfa: false }); store.set('gd-users', USERS);
    Group.log('audit', 'grupo', { label: `Invitó a ${esc($('#iName').value)} como ${ROLES.find(r => r.id === $('#iRole').value).n}`, actor: user ? user.name : 'Invitado' }); UI.closeModals(); e.target.reset(); toast('Invitación enviada', '✉'); vUsuarios(el); };
}
function userSheet(u) {
  const r = ROLES.find(x => x.id === u.role);
  Admin.openSheet({
    head: `<span class="av-s" style="width:42px;height:42px;background:${r.c}">${u.n.split(' ').map(x => x[0]).join('')}</span><div><b style="font-size:1rem">${esc(u.n)}</b><div style="font-size:.78rem;color:var(--muted)">${esc(u.mail)}</div></div>`,
    body: `<dl class="dl"><dt>Rol</dt><dd>${r.n}</dd><dt>Sede</dt><dd>${esc(u.sede)}</dd><dt>Estado</dt><dd>${u.st}</dd><dt>Autenticación 2FA</dt><dd>${u.mfa ? 'Activa (app)' : 'Desactivada'}</dd><dt>Último acceso</dt><dd>${u.last ? new Date(u.last).toLocaleString('es-PE') : 'Nunca'}</dd></dl>
      <div class="sec-t">Permisos del rol</div><div style="display:flex;flex-wrap:wrap;gap:6px">${MODS.filter(m => PERMS[u.role][m].length).map(m => `<span class="st st--info">${m}: ${PERMS[u.role][m].join(', ')}</span>`).join('')}</div>
      <div class="sec-t">Sesiones</div><div class="card" style="box-shadow:none"><div class="list-r"><span>Chrome · Windows · Lima</span><span class="st st--ok">Actual</span></div><div class="list-r"><span>Safari · iPhone · Lima</span><small style="color:var(--muted)">hace 2 d</small></div></div>`,
    foot: `<button class="btn btn--ghost" onclick="UI.toast('Enlace de restablecimiento enviado','✉')">Restablecer contraseña</button><button class="btn ${u.st === 'Suspendido' ? '' : 'btn--danger'}" id="uSus">${u.st === 'Suspendido' ? 'Reactivar' : 'Suspender'}</button>`
  });
  $('#uSus').onclick = () => { u.st = u.st === 'Suspendido' ? 'Activo' : 'Suspendido'; store.set('gd-users', USERS); Group.log('audit', 'grupo', { label: `${u.st === 'Activo' ? 'Reactivó' : 'Suspendió'} a ${u.n}`, actor: user ? user.name : 'Invitado' }); Admin.closeSheet(); toast(`Usuario ${u.st.toLowerCase()}`, '✓'); go('usuarios'); };
}

/* ================= ROLES ================= */
let roleSel = 'cajero';
function vRoles(el) {
  const r = ROLES.find(x => x.id === roleSel);
  el.innerHTML = head('Roles y permisos', 'Define qué puede ver y hacer cada perfil en cada módulo.', `<button class="btn btn--ghost" id="rReset">Restablecer</button><button class="btn" id="rSave">Guardar cambios</button>`) +
    `<div class="grid-2" style="grid-template-columns:300px 1fr"><div class="card"><div class="card__head"><h3>Roles</h3><button class="btn btn--ghost btn--sm" onclick="UI.toast('Nuevo rol (maqueta)','+')">${I('plus')}</button></div><div>${ROLES.map(x => `<button class="list-r" style="width:100%;text-align:left;${x.id === roleSel ? 'background:var(--primary-soft)' : ''}" data-role="${x.id}"><div class="who"><span class="av-s" style="background:${x.c};width:28px;height:28px">${I('shield')}</span><div><b>${x.n}</b><small>${x.d}</small></div></div><span class="st st--mute">${USERS.filter(u => u.role === x.id).length}</span></button>`).join('')}</div></div>
    <div class="card"><div class="card__head"><div><h3>Permisos · ${r.n}</h3><small>Haz clic en una casilla para activar o desactivar · clic en el módulo para todo</small></div>${r.id === 'master' ? '<span class="st st--warn">Rol protegido</span>' : ''}</div>
      <div class="tw"><table class="perm"><thead><tr><th>Módulo</th>${ACTS.map(a => `<th>${a}</th>`).join('')}</tr></thead><tbody>${MODS.map(m => { const p = PERMS[roleSel][m]; return `<tr><td><button data-pmod="${m}" style="font-weight:600;display:flex;align-items:center;gap:8px"><span class="chk ${p.length === 4 ? 'on' : p.length ? 'part' : ''}">${p.length === 4 ? '✓' : p.length ? '–' : ''}</span>${m}</button></td>${ACTS.map(a => `<td><button class="chk ${p.includes(a) ? 'on' : ''}" data-pm="${m}|${a}">${p.includes(a) ? '✓' : ''}</button></td>`).join('')}</tr>`; }).join('')}</tbody></table></div></div></div>`;
  el.onclick = e => {
    const rb = e.target.closest('[data-role]'); if (rb) { roleSel = rb.dataset.role; vRoles(el); return; }
    if (roleSel === 'master' && e.target.closest('[data-pm],[data-pmod]')) return toast('El rol Master siempre tiene acceso total', '🔒');
    const c = e.target.closest('[data-pm]'); if (c) { const [m, a] = c.dataset.pm.split('|'); const p = PERMS[roleSel][m]; PERMS[roleSel][m] = p.includes(a) ? p.filter(x => x !== a) : [...p, a]; vRoles(el); return; }
    const md = e.target.closest('[data-pmod]'); if (md) { const m = md.dataset.pmod; PERMS[roleSel][m] = PERMS[roleSel][m].length === 4 ? [] : [...ACTS]; vRoles(el); }
  };
  $('#rSave').onclick = () => { store.set('gd-perms', PERMS); Group.log('audit', 'grupo', { label: `Actualizó permisos del rol ${r.n}`, actor: user ? user.name : 'Invitado' }); toast('Permisos guardados', '✓'); };
  $('#rReset').onclick = () => { try { localStorage.removeItem('gd-perms'); } catch (e) {} PERMS = Object.fromEntries(ROLES.map(r => [r.id, Object.fromEntries(MODS.map(m => [m, ACTS.filter(a => defPerm[r.id](m, a))]))])); vRoles(el); toast('Permisos restablecidos', '↺'); };
}

/* ================= SEDES ================= */
function vSedes(el) {
  const ss = SEDES.filter(s => brandOk(s.b));
  el.innerHTML = head('Sedes', `${ss.length} locales en Lima · horarios, capacidad y rendimiento.`, `<button class="btn" onclick="UI.toast('Nueva sede (maqueta)','+')">${I('plus')} Nueva sede</button>`) +
    `<div class="sede-g">${ss.map(s => `<div class="card sede"><div class="sede__top"><div><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">${bchip(s.b)}${s.soon ? '<span class="st st--warn">Apertura ene. 2027</span>' : '<span class="st st--ok">Operativa</span>'}</div><b style="font-size:1.05rem">${s.n}</b><div style="color:var(--muted);font-size:.8rem;display:flex;gap:6px;align-items:center;margin-top:2px">${I('pin')}${s.dir}</div></div><button class="ib">${I('dots')}</button></div>
      <div class="sede__stats"><div><small>Ventas mes</small><b>${s.vtas ? K(s.vtas) : '—'}</b></div><div><small>Cabinas</small><b>${s.cab || '—'}</b></div><div><small>Personal</small><b>${s.staff}</b></div></div>
      ${s.cab && !s.soon ? `<div><div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:6px"><span style="color:var(--muted)">Ocupación de hoy</span><b>${s.occ}%</b></div><div class="meter"><span style="width:${s.occ}%;background:${s.occ > 85 ? 'var(--warn)' : BM[s.b].c}"></span></div></div>` : `<div style="font-size:.78rem;color:var(--muted)">${s.soon ? 'Implementación al 72% · equipamiento en camino' : 'Tienda retail · sin cabinas'}</div>`}
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:.78rem;color:var(--muted);border-top:1px solid var(--line-2);padding-top:12px"><span>Resp.: <b style="color:var(--text)">${s.resp}</b></span><span>Lun–Sáb 9:00–20:00</span></div></div>`).join('')}</div>`;
}

/* ================= HISTORIAL ================= */
function vHistorial(el) {
  const seed = [['Daniela Armas', 'Inició sesión', 'grupo', 0.3], ['Karla Mendoza', 'Creó cita para Valeria Ríos', 'darmed', 1.2], ['Jhon Quispe', 'Cerró caja Surco · S/ 4,812.40', 'depizone', 14], ['Valentina Cruz', 'Ajustó stock: Lip Sleeping Mask (-2)', 'renace', 20], ['Daniela Armas', 'Actualizó precios de Hydrafacial', 'darmed', 26], ['Sistema', 'Respaldo automático completado', 'grupo', 30], ['Paola Ríos', 'Exportó reporte de ventas', 'depizone', 40], ['Martín Salazar', 'Cerró caso: Carmen Paz (Culminado)', 'darmed', 50]]
    .map((s, i) => ({ id: 'h' + i, actor: s[0], label: s[1], brand: s[2], t: Date.now() - s[3] * 3600e3, type: 'audit', ip: `190.42.${10 + i}.${100 + i * 7}` }));
  const live = Group.events().map(e => ({ ...e, actor: e.actor || (e.type === 'order' || e.type === 'booking' || e.type === 'lead' ? 'Web pública' : (e.label || '').split(' ')[0] + ' ' + ((e.label || '').split(' ')[1] || '')), ip: 'web' }));
  const rows = [...live, ...seed].sort((a, b) => b.t - a.t);
  const tyC = { order: ['Venta', 'st--ok'], booking: ['Reserva', 'st--info'], lead: ['Lead', 'st--info'], login: ['Acceso', 'st--mute'], audit: ['Cambio', 'st--warn'] };
  el.innerHTML = head('Historial', 'Registro de auditoría de todas las acciones del sistema y las webs.', `<button class="btn btn--ghost" onclick="UI.toast('Log exportado (maqueta)','⤓')">${I('down')} Exportar log</button>`) +
    `<div class="card"><div class="toolbar"><div class="inp-ic">${I('search')}<input class="inp" placeholder="Buscar acción o usuario" id="hQ" style="width:280px"></div><span class="sp"></span><span style="font-size:.78rem;color:var(--muted)">${rows.length} eventos · retención 365 días</span></div><div id="hT"></div></div>`;
  const t = Admin.table($('#hT'), { size: 12, sort: 't', rows: () => rows, text: r => r.actor + r.label, cols: [
    { k: 't', l: 'Fecha y hora', f: r => new Date(r.t).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) },
    { k: 'actor', l: 'Usuario', f: r => `<div class="who"><span class="av-s" style="width:24px;height:24px;font-size:.6rem;background:${COL[(r.actor || 'x').length % 8]}">${esc((r.actor || '?')[0])}</span>${esc(r.actor || '—')}</div>` },
    { k: 'type', l: 'Tipo', f: r => `<span class="st ${(tyC[r.type] || tyC.audit)[1]}">${(tyC[r.type] || tyC.audit)[0]}</span>` },
    { k: 'label', l: 'Acción', sortable: false, f: r => `<span style="max-width:380px;display:inline-block;overflow:hidden;text-overflow:ellipsis;vertical-align:middle">${esc(r.label || '')}</span>` },
    { k: 'brand', l: 'Ámbito', f: r => BM[r.brand] ? bchip(r.brand) : '<span class="st st--mute">Grupo</span>' }, { k: 'ip', l: 'Origen', f: r => `<code style="font-size:.76rem;color:var(--muted)">${r.ip}</code>` }] });
  $('#hQ').oninput = e => t.search(e.target.value);
}

/* ================= CONFIGURACIÓN ================= */
let setTab = 'general';
function vConfig(el) {
  const cfg = store.get('gd-cfg', { igv: true, wa: true, mail: true, sms: false, mfa: true, dual: false, backup: true, yape: true, plin: true, cuotas: 6 });
  const tg = (k, n, d) => `<div class="tog-row"><div><b style="font-size:.86rem;font-weight:600">${n}</b><p style="color:var(--muted);font-size:.78rem">${d}</p></div><button class="switch ${cfg[k] ? 'on' : ''}" data-tg="${k}" aria-label="${n}"></button></div>`;
  const TABS = [['general', 'General', 'gear'], ['marcas', 'Marcas', 'globe'], ['pagos', 'Pagos y facturación', 'cash'], ['notif', 'Notificaciones', 'bell'], ['seg', 'Seguridad', 'lock'], ['integ', 'Integraciones', 'spark']];
  const body = {
    general: `<div class="set-row"><div><h4>Datos de la empresa</h4><p>Se muestran en comprobantes y reportes.</p></div><div style="display:grid;gap:10px"><input class="inp" value="Grupo DARMED S.A.C."><input class="inp" value="RUC 20612345678"><input class="inp" value="López de Ayala 1515, San Isidro, Lima"></div></div>
      <div class="set-row"><div><h4>Zona horaria y moneda</h4><p>Aplica a todas las sedes.</p></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><select class="inp"><option>America/Lima (GMT-5)</option></select><select class="inp"><option>Sol peruano (S/)</option><option>Dólar (US$)</option></select></div></div>
      <div class="set-row"><div><h4>Horario de atención</h4><p>Horario por defecto para la agenda.</p></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><input class="inp" type="time" value="09:00"><input class="inp" type="time" value="20:00"></div></div>`,
    marcas: `${KEYS.map(k => `<div class="set-row"><div><h4>${bchip(k)}</h4><p>Web pública: ${BM[k].h}</p></div><div style="display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center"><input type="color" value="${BM[k].c}" style="width:40px;height:36px;border:1px solid var(--line);border-radius:8px;background:none"><input class="inp" value="www.${k}.pe"><a class="btn btn--ghost btn--sm" href="${BM[k].h}" target="_blank">Ver ${I('ext')}</a></div></div>`).join('')}`,
    pagos: `<div class="set-row"><div><h4>Métodos de pago</h4><p>Disponibles en caja y tiendas web.</p></div><div>${tg('yape', 'Yape', 'Pagos con QR')}${tg('plin', 'Plin', 'Pagos con QR')}${tg('igv', 'Precios incluyen IGV', 'Mostrar precios finales con IGV 18%')}</div></div>
      <div class="set-row"><div><h4>Cuotas sin intereses</h4><p>Máximo de cuotas permitido.</p></div><div><select class="inp" id="cuotas">${[3, 6, 12].map(n => `<option ${cfg.cuotas == n ? 'selected' : ''}>${n}</option>`).join('')}</select></div></div>
      <div class="set-row"><div><h4>Facturación electrónica</h4><p>Conexión con SUNAT (OSE).</p></div><div><span class="st st--ok">Conectado · Serie B001 / F001</span></div></div>`,
    notif: `<div class="set-row"><div><h4>Canales</h4><p>Cómo avisamos a clientes y equipo.</p></div><div>${tg('wa', 'WhatsApp', 'Confirmaciones y recordatorios de cita')}${tg('mail', 'Correo', 'Comprobantes y resúmenes diarios')}${tg('sms', 'SMS', 'Recordatorio 24 h antes')}</div></div>`,
    seg: `<div class="set-row"><div><h4>Acceso</h4><p>Políticas para todos los usuarios.</p></div><div>${tg('mfa', 'Exigir 2FA', 'Obligatorio para roles Master y Administrador')}${tg('dual', 'Doble aprobación de reembolsos', 'Requiere un segundo administrador')}${tg('backup', 'Respaldo automático diario', 'Copia cifrada a las 03:00')}</div></div>
      <div class="set-row"><div><h4>Sesiones</h4><p>Cierre automático por inactividad.</p></div><div><select class="inp"><option>30 minutos</option><option>1 hora</option><option>8 horas</option></select></div></div>`,
    integ: `${[['WhatsApp Business', 'Mensajería con clientes', true], ['Google Calendar', 'Sincroniza agendas de doctores', true], ['Niubiz / Izipay', 'Pasarela de pagos', true], ['Meta Ads', 'Conversiones de campañas', false], ['Mailchimp', 'Campañas de correo', false]].map(x => `<div class="set-row" style="grid-template-columns:1fr auto;align-items:center"><div><h4>${x[0]}</h4><p>${x[1]}</p></div>${x[2] ? '<span class="st st--ok">Conectado</span>' : `<button class="btn btn--ghost btn--sm" onclick="UI.toast('Conexión simulada con ${x[0]}','✓')">Conectar</button>`}</div>`).join('')}`
  };
  el.innerHTML = head('Configuración', 'Preferencias generales del grupo y sus marcas.', `<button class="btn" id="cfgSave">Guardar cambios</button>`) +
    `<div class="set"><nav class="set-nav">${TABS.map(([k, n, ic]) => `<button class="nav-i ${k === setTab ? 'on' : ''}" data-st="${k}">${I(ic)}<span>${n}</span></button>`).join('')}</nav><div class="card card--pad" style="padding-top:4px;padding-bottom:4px">${body[setTab]}</div></div>`;
  el.onclick = e => {
    const s = e.target.closest('[data-st]'); if (s) { setTab = s.dataset.st; vConfig(el); return; }
    const t = e.target.closest('[data-tg]'); if (t) { cfg[t.dataset.tg] = !cfg[t.dataset.tg]; t.classList.toggle('on', cfg[t.dataset.tg]); }
  };
  $('#cfgSave').onclick = () => { if ($('#cuotas')) cfg.cuotas = +$('#cuotas').value; store.set('gd-cfg', cfg); Group.log('audit', 'grupo', { label: 'Actualizó la configuración: ' + TABS.find(x => x[0] === setTab)[1], actor: user ? user.name : 'Invitado' }); toast('Configuración guardada', '✓'); };
}

/* ---------- Inicio ---------- */
if (!user) setTimeout(() => toast('Modo invitado. <a href="loger.html" style="text-decoration:underline">Iniciar sesión</a>', '🔐'), 600);
cur = VIEWS[location.hash.slice(1)] ? location.hash.slice(1) : 'dashboard';
boot(); go(cur);
Group.onChange(k => { if (['gd-events', 'gd-bookings', 'gd-pos'].includes(k) || k.startsWith('gd-cart')) { cur === 'dashboard' ? vDashboard($('#v-dashboard')) : renderFeed(); boot(); $$('.side [data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === cur)); } });

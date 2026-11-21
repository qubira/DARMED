/* =========================================================
   iiradia · Marco de la suite administrativa
   Sidebar, topbar, Ctrl+K, notificaciones, tema, tablas, sheets
   ========================================================= */
(function () {
  const { $, $$, Group, esc, toast, store } = UI;

  /* Iconos de línea (estilo Lucide) */
  const P = {
    dash: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
    cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    hist: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    ext: '<path d="M7 17 17 7M7 7h10v10"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5Z"/>',
    sort: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    receipt: '<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 2 2V2l-2 2-3-2-3 2-3-2-3 2-3-2Z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
    printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/>',
    dots: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'
  };
  const I = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24">${P[n] || ''}</svg>`;

  const BRANDS = { all: { n: 'Todas las marcas', c: '#0f1117' }, darmed: { n: 'IRRADIA', c: '#a8336f' }, renace: { n: 'NUTRI', c: '#ea4c89' }, integrativa: { n: 'SMALL', c: '#2f8a5b' }, depizone: { n: 'STHETIC', c: '#0b97d4' } };

  const NAV = [
    { g: 'General', items: [['dashboard', 'Dashboard', 'dash'], ['reportes', 'Reportes', 'chart']] },
    { g: 'Operaciones', items: [['caja', 'Caja y ventas', 'cash', 'orders'], ['agenda', 'Agendamientos', 'cal', 'bookings', 'agendamiento.html'], ['clientes', 'Clientes', 'users'], ['inventario', 'Inventario', 'box', 'low']] },
    { g: 'Administración', items: [['usuarios', 'Usuarios', 'user'], ['roles', 'Roles y permisos', 'shield'], ['sedes', 'Sedes', 'pin'], ['historial', 'Historial', 'hist'], ['config', 'Configuración', 'gear']] }
  ];

  const state = { brand: store.get('gd-ws', 'all'), theme: store.get('gd-theme', 'light'), collapsed: store.get('gd-side', false) };
  document.documentElement.dataset.theme = state.theme;

  function counts() {
    const ev = Group.events();
    return { orders: ev.filter(e => e.type === 'order').length, bookings: Group.bookings().length, low: 4 };
  }

  function mount(opts) {
    const app = $('.app'); if (!app) return;
    if (state.collapsed) app.classList.add('collapsed');
    const u = Group.user();
    const c = counts();
    const href = (id, ext) => ext || (opts.page === 'master' ? `#${id}` : `master.html#${id}`);
    $('.side').innerHTML = `
      <div class="ws" id="ws" style="--wsc:${BRANDS[state.brand].c}">
        <span class="ws__logo"><img class="brand-symbol" src="assets/irradia-symbol.webp" width="171" height="192" alt=""></span>
        <div class="ws__txt"><b>iiradia</b><small><i></i>${BRANDS[state.brand].n}</small></div>
        ${I('sort')}
        <div class="ws__menu">${Object.entries(BRANDS).map(([k, b]) => `<button data-ws="${k}" class="${k === state.brand ? 'on' : ''}"><span class="dot" style="background:${b.c}"></span>${b.n}</button>`).join('')}</div>
      </div>
      <div class="side__scroll">
        ${NAV.map(g => `<div class="nav-g"><h6>${g.g}</h6>${g.items.map(([id, n, ic, cnt, ext]) => `<a class="nav-i ${opts.active === id ? 'on' : ''}" href="${href(id, ext)}" data-nav="${id}" title="${n}">${I(ic)}<span>${n}</span>${cnt && c[cnt] ? `<span class="cnt">${c[cnt]}</span>` : ''}</a>`).join('')}</div>`).join('')}
        <div class="nav-g"><h6>Sitios web</h6>${Object.entries(UI.BRAND_META).map(([k, m]) => `<a class="nav-i" href="${m.h}" target="_blank" rel="noopener" title="${m.n}"><span class="bd" style="background:${m.c}"></span><span>${m.n}</span>${I('ext', 'ext')}</a>`).join('')}</div>
      </div>
      <div class="side__foot"><div class="me"><span class="av">${u ? esc(u.name[0]) : '?'}</span><div style="min-width:0;flex:1"><b>${u ? esc(u.name) : 'Invitado'}</b><small>${u ? esc(u.role) + ' · ' + esc(u.email || '') : 'Sin sesión'}</small></div><button class="ib" id="logoutB" title="Cerrar sesión">${I('out')}</button></div></div>`;

    $('.topbar').innerHTML = `
      <button class="ib menu-t" id="mOpen" aria-label="Abrir menú">${I('menu')}</button>
      <button class="ib" id="collapseB" title="Contraer menú">${I('panel')}</button>
      <div class="crumbs"><span>iiradia</span><span>/</span><b id="crumbT">${opts.title || ''}</b></div>
      <div class="topbar__r">
        <div class="kbar" id="kOpen">${I('search')}<span>Buscar o ir a…</span><kbd>Ctrl K</kbd></div>
        <button class="ib" id="themeB" title="Cambiar tema">${I(state.theme === 'dark' ? 'sun' : 'moon')}</button>
        <div style="position:relative"><button class="ib" id="bellB" title="Notificaciones">${I('bell')}${Group.events().length ? '<span class="n"></span>' : ''}</button><div class="pop" id="notifP"></div></div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', `
      <div class="cmdk" id="cmdk"><div class="scrim"></div><div class="cmdk__box"><div class="cmdk__in">${I('search')}<input id="cmdkIn" placeholder="Busca módulos, clientes, acciones…" autocomplete="off"><kbd>Esc</kbd></div><div class="cmdk__list" id="cmdkL"></div></div></div>
      <div class="sheet" id="sheet"><div class="scrim"></div><aside class="sheet__p"><div class="sheet__h" id="sheetH"></div><div class="sheet__b" id="sheetB"></div><div class="sheet__f" id="sheetF"></div></aside></div>
      <div class="chart-tip" id="ctip"></div>`);

    // Eventos del marco
    $('#ws').addEventListener('click', e => {
      const b = e.target.closest('[data-ws]');
      if (b) { e.stopPropagation(); state.brand = b.dataset.ws; store.set('gd-ws', state.brand); $('#ws').classList.remove('open'); mount(opts); opts.onBrand && opts.onBrand(state.brand); toast(`Vista: <b>${BRANDS[state.brand].n}</b>`, '◎'); return; }
      $('#ws').classList.toggle('open');
    });
    $('#collapseB').onclick = () => { state.collapsed = !state.collapsed; store.set('gd-side', state.collapsed); app.classList.toggle('collapsed', state.collapsed); };
    $('#mOpen').onclick = () => $('.side').classList.add('open');
    $('#themeB').onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; store.set('gd-theme', state.theme); document.documentElement.dataset.theme = state.theme; $('#themeB').innerHTML = I(state.theme === 'dark' ? 'sun' : 'moon'); opts.onTheme && opts.onTheme(); };
    $('#logoutB').onclick = () => { Group.log('login', 'grupo', { label: `${u ? u.name : 'Invitado'} cerró sesión` }); Group.logout(); location.href = 'loger.html'; };
    $('#bellB').onclick = e => { e.stopPropagation(); renderNotif(); $('#notifP').classList.toggle('open'); };
    $('#kOpen').onclick = () => openCmdk(opts);
    document.onclick = e => { if (!e.target.closest('#ws')) $('#ws') && $('#ws').classList.remove('open'); if (!e.target.closest('#notifP,#bellB')) $('#notifP') && $('#notifP').classList.remove('open'); if (!e.target.closest('.side,#mOpen')) $('.side').classList.remove('open'); };
    $$('.side [data-nav]').forEach(a => a.addEventListener('click', () => $('.side').classList.remove('open')));
  }

  function ago(t) { const s = (Date.now() - t) / 1000; return s < 60 ? 'ahora' : s < 3600 ? `hace ${Math.floor(s / 60)} min` : s < 86400 ? `hace ${Math.floor(s / 3600)} h` : `hace ${Math.floor(s / 86400)} d`; }
  function renderNotif() {
    const ev = Group.events().filter(e => e.type !== 'login').slice(0, 8);
    const ic = { order: 'bag', booking: 'cal', lead: 'spark' };
    const lbl = { order: 'Nueva venta web', booking: 'Nueva reserva', lead: 'Nuevo lead' };
    $('#notifP').innerHTML = `<div class="pop__h">Notificaciones <span class="st st--mute">${ev.length}</span></div>` +
      (ev.length ? ev.map(e => `<div class="feed-item"><span class="dot">${I(ic[e.type] || 'bell')}</span><div style="min-width:0"><b>${lbl[e.type] || e.type}</b> · ${(UI.BRAND_META[e.brand] || { n: '' }).n}<small style="overflow:hidden;text-overflow:ellipsis">${esc(e.label || '')}</small><small>${ago(e.t)}</small></div></div>`).join('')
        : `<div class="empty">${I('bell')}Sin notificaciones nuevas.<br>Las ventas y reservas web aparecerán aquí.</div>`);
  }

  /* Command palette */
  let cmdSel = 0, cmdItems = [];
  function openCmdk(opts) {
    $('#cmdk').classList.add('open'); $('#cmdkIn').value = ''; renderCmdk(opts); setTimeout(() => $('#cmdkIn').focus(), 20);
  }
  function renderCmdk(opts) {
    const q = $('#cmdkIn').value.toLowerCase().trim();
    const nav = NAV.flatMap(g => g.items.map(([id, n, ic, , ext]) => ({ g: 'Ir a', n, ic, k: g.g, go: ext || (opts.page === 'master' ? '#' + id : 'master.html#' + id) })));
    const acts = [
      { g: 'Acciones', n: 'Nueva venta en caja', ic: 'cash', go: (opts.page === 'master' ? '' : 'master.html') + '#caja' },
      { g: 'Acciones', n: 'Nueva cita', ic: 'cal', go: 'agendamiento.html' },
      { g: 'Acciones', n: 'Cambiar tema claro / oscuro', ic: 'moon', fn: () => $('#themeB').click() },
      ...Object.values(UI.BRAND_META).map(m => ({ g: 'Sitios web', n: 'Abrir web ' + m.n, ic: 'globe', go: m.h }))
    ];
    const extra = (opts.search ? opts.search(q) : []);
    cmdItems = [...nav, ...acts, ...extra].filter(x => !q || x.n.toLowerCase().includes(q) || (x.k || '').toLowerCase().includes(q)).slice(0, 14);
    cmdSel = Math.min(cmdSel, Math.max(0, cmdItems.length - 1));
    let last = '';
    $('#cmdkL').innerHTML = cmdItems.length ? cmdItems.map((x, i) => { const h = x.g !== last ? `<h6>${x.g}</h6>` : ''; last = x.g; return `${h}<div class="cmdk__it ${i === cmdSel ? 'on' : ''}" data-ci="${i}">${I(x.ic || 'search')}${esc(x.n)}<small>${x.sub ? esc(x.sub) : '↵'}</small></div>`; }).join('') : `<div class="empty">Sin resultados para “${esc(q)}”</div>`;
  }
  function runCmd(i) { const x = cmdItems[i]; if (!x) return; $('#cmdk').classList.remove('open'); if (x.fn) x.fn(); else if (x.go) { location.href = x.go; } }
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#kOpen') && $('#kOpen').click(); }
    const open = $('#cmdk') && $('#cmdk').classList.contains('open'); if (!open) { if (e.key === 'Escape') closeSheet(); return; }
    if (e.key === 'Escape') $('#cmdk').classList.remove('open');
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdSel = (cmdSel + 1) % cmdItems.length; $$('.cmdk__it').forEach((x, i) => x.classList.toggle('on', i === cmdSel)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); cmdSel = (cmdSel - 1 + cmdItems.length) % cmdItems.length; $$('.cmdk__it').forEach((x, i) => x.classList.toggle('on', i === cmdSel)); }
    if (e.key === 'Enter') runCmd(cmdSel);
  });
  document.addEventListener('input', e => { if (e.target.id === 'cmdkIn') { cmdSel = 0; renderCmdk(Admin.opts); } });
  document.addEventListener('click', e => {
    const it = e.target.closest('[data-ci]'); if (it) runCmd(+it.dataset.ci);
    if (e.target.matches('#cmdk .scrim')) $('#cmdk').classList.remove('open');
    if (e.target.matches('#sheet .scrim') || e.target.closest('[data-sheet-close]')) closeSheet();
  });

  /* Sheet de detalle */
  function openSheet({ head, body, foot }) { $('#sheetH').innerHTML = head + `<button class="ib" data-sheet-close style="margin-left:auto">${I('x')}</button>`; $('#sheetB').innerHTML = body; $('#sheetF').innerHTML = foot || ''; $('#sheetF').style.display = foot ? '' : 'none'; $('#sheet').classList.add('open'); }
  function closeSheet() { $('#sheet') && $('#sheet').classList.remove('open'); }

  /* Tabla con orden, búsqueda y paginación */
  function table(el, cfg) {
    const t = { sort: cfg.sort || null, dir: cfg.dir || -1, page: 0, size: cfg.size || 8, q: '' };
    function draw() {
      let rows = cfg.rows().filter(r => !t.q || cfg.text(r).toLowerCase().includes(t.q));
      if (t.sort) { const col = cfg.cols.find(c => c.k === t.sort); rows.sort((a, b) => { const va = col.v ? col.v(a) : a[col.k], vb = col.v ? col.v(b) : b[col.k]; return (va > vb ? 1 : va < vb ? -1 : 0) * t.dir; }); }
      const pages = Math.max(1, Math.ceil(rows.length / t.size)); t.page = Math.min(t.page, pages - 1);
      const view = rows.slice(t.page * t.size, (t.page + 1) * t.size);
      el.innerHTML = `<div class="tw"><table><thead><tr>${cfg.cols.map(c => `<th class="${c.r ? 'r' : ''} ${t.sort === c.k ? 'sorted' : ''}" ${c.sortable === false ? '' : `data-sort="${c.k}"`}>${c.l}${c.sortable === false ? '' : `<span class="si">${t.sort === c.k ? (t.dir > 0 ? '↑' : '↓') : '↕'}</span>`}</th>`).join('')}</tr></thead>
        <tbody>${view.length ? view.map((r, i) => `<tr class="${cfg.onRow ? 'click' : ''}" data-ri="${rows.indexOf(r)}">${cfg.cols.map(c => `<td class="${c.r ? 'r' : ''}">${c.f(r)}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${cfg.cols.length}"><div class="empty">${I('search')}No hay registros que coincidan.</div></td></tr>`}</tbody></table></div>
        <div class="card__foot"><span>Mostrando <b>${view.length ? t.page * t.size + 1 : 0}–${t.page * t.size + view.length}</b> de <b>${rows.length}</b></span>
        <div class="pager"><button data-pg="-1" ${t.page === 0 ? 'disabled' : ''}>‹</button>${Array.from({ length: pages }, (_, i) => `<button class="${i === t.page ? 'on' : ''}" data-pgn="${i}">${i + 1}</button>`).slice(Math.max(0, t.page - 2), t.page + 3).join('')}<button data-pg="1" ${t.page >= pages - 1 ? 'disabled' : ''}>›</button></div></div>`;
      t._rows = rows;
    }
    el.addEventListener('click', e => {
      const s = e.target.closest('[data-sort]'); if (s) { t.dir = t.sort === s.dataset.sort ? -t.dir : -1; t.sort = s.dataset.sort; draw(); return; }
      const p = e.target.closest('[data-pg]'); if (p) { t.page += +p.dataset.pg; draw(); return; }
      const n = e.target.closest('[data-pgn]'); if (n) { t.page = +n.dataset.pgn; draw(); return; }
      const r = e.target.closest('[data-ri]'); if (r && cfg.onRow && !e.target.closest('button,a,input')) cfg.onRow(t._rows[+r.dataset.ri]);
    });
    draw();
    return { draw, search(q) { t.q = q.toLowerCase(); t.page = 0; draw(); } };
  }

  /* Gráficos SVG */
  function spark(arr, c) { const mx = Math.max(...arr), mn = Math.min(...arr); const pts = arr.map((v, i) => `${(i / (arr.length - 1) * 96).toFixed(1)},${(30 - (v - mn) / (mx - mn || 1) * 26).toFixed(1)}`).join(' '); return `<svg class="spark" viewBox="0 0 96 34"><polyline points="${pts}" fill="none" stroke="${c}" stroke-width="1.6" stroke-linejoin="round"/></svg>`; }
  function lineChart(svg, series, labels, fmt, opts = {}) {
    const W = 760, H = 270, L = 62, R = 12, T = 14, B = 26;
    const all = series.flatMap(s => s.d); const mx = Math.max(...all) * 1.1;
    const x = i => L + i / (labels.length - 1) * (W - L - R), y = v => T + (H - T - B) * (1 - v / mx);
    let g = '';
    for (let i = 0; i <= 4; i++) { const v = mx * i / 4, yy = y(v); g += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" stroke="var(--line-2)"/><text x="${L - 8}" y="${yy + 3}" text-anchor="end">${fmt(v)}</text>`; }
    const step = Math.ceil(labels.length / 7); labels.forEach((l, i) => { if (i % step === 0) g += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle">${l}</text>`; });
    series.forEach((s, si) => {
      const pts = s.d.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
      if (opts.area && si === 0) g += `<defs><linearGradient id="ag${si}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.c}" stop-opacity=".18"/><stop offset="1" stop-color="${s.c}" stop-opacity="0"/></linearGradient></defs><polygon points="${L},${y(0)} ${pts} ${x(s.d.length - 1)},${y(0)}" fill="url(#ag${si})"/>`;
      g += `<polyline points="${pts}" fill="none" stroke="${s.c}" stroke-width="${s.w || 2}" stroke-linejoin="round" stroke-linecap="round" ${s.dash ? 'stroke-dasharray="4 4"' : ''}/>`;
    });
    g += `<line class="hl" x1="0" x2="0" y1="${T}" y2="${H - B}" stroke="var(--faint)" stroke-dasharray="3 3" opacity="0"/>${series.map((s, i) => `<circle class="hd" data-i="${i}" r="4" fill="var(--surface)" stroke="${s.c}" stroke-width="2" opacity="0"/>`).join('')}`;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.innerHTML = g;
    const tip = $('#ctip');
    svg.onmousemove = e => {
      const r = svg.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width * W;
      const i = Math.max(0, Math.min(labels.length - 1, Math.round((px - L) / (W - L - R) * (labels.length - 1))));
      const hl = svg.querySelector('.hl'); hl.setAttribute('x1', x(i)); hl.setAttribute('x2', x(i)); hl.setAttribute('opacity', 1);
      svg.querySelectorAll('.hd').forEach((c, k) => { c.setAttribute('cx', x(i)); c.setAttribute('cy', y(series[k].d[i])); c.setAttribute('opacity', 1); });
      tip.innerHTML = `<b>${labels[i]}</b>` + series.map(s => `<div class="r"><span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${s.c};margin-right:6px"></i>${s.n}</span><b>${fmt(s.d[i])}</b></div>`).join('');
      tip.style.opacity = 1; tip.style.left = Math.min(innerWidth - 200, e.clientX + 16) + 'px'; tip.style.top = e.clientY + 16 + 'px';
    };
    svg.onmouseleave = () => { tip.style.opacity = 0; svg.querySelector('.hl').setAttribute('opacity', 0); svg.querySelectorAll('.hd').forEach(c => c.setAttribute('opacity', 0)); };
  }
  function barChart(svg, data, fmt) {
    const W = 760, H = 250, L = 62, B = 26, T = 10; const mx = Math.max(...data.flatMap(d => d.v)) * 1.1; const n = data.length, gw = (W - L - 10) / n, k = data[0].v.length, bw = Math.min(22, gw / (k + 1.5));
    let g = ''; for (let i = 0; i <= 4; i++) { const yy = T + (H - T - B) * i / 4; g += `<line x1="${L}" x2="${W - 10}" y1="${yy}" y2="${yy}" stroke="var(--line-2)"/><text x="${L - 8}" y="${yy + 3}" text-anchor="end">${fmt(mx * (1 - i / 4))}</text>`; }
    data.forEach((d, i) => { d.v.forEach((v, j) => { const h = (H - T - B) * v / mx, xx = L + i * gw + (gw - k * bw - (k - 1) * 3) / 2 + j * (bw + 3); g += `<rect x="${xx}" y="${H - B - h}" width="${bw}" height="${h}" rx="3" fill="${d.c[j]}"><title>${d.l}: ${fmt(v)}</title></rect>`; }); g += `<text x="${L + i * gw + gw / 2}" y="${H - 6}" text-anchor="middle">${d.l}</text>`; });
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.innerHTML = g;
  }
  function donut(svg, parts, center) {
    const tot = parts.reduce((a, p) => a + p.v, 0); let acc = 0;
    svg.setAttribute('viewBox', '0 0 42 42');
    svg.innerHTML = `<circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--soft)" stroke-width="4.2"/>` + parts.map(p => { const pct = p.v / tot * 100; const s = `<circle cx="21" cy="21" r="15.9" fill="none" stroke="${p.c}" stroke-width="4.2" stroke-dasharray="${Math.max(0, pct - .6)} ${100 - pct + .6}" stroke-dashoffset="${25 - acc}"><title>${p.n}: ${pct.toFixed(1)}%</title></circle>`; acc += pct; return s; }).join('') + `<text x="21" y="20.5" text-anchor="middle" font-size="5" font-weight="700" fill="var(--text)">${center[0]}</text><text x="21" y="26" text-anchor="middle" font-size="2.6" fill="var(--muted)">${center[1]}</text>`;
  }

  const Admin = { I, BRANDS, state, mount(o) { Admin.opts = o; mount(o); }, openSheet, closeSheet, table, spark, lineChart, barChart, donut, ago, setTitle(t) { const c = $('#crumbT'); if (c) c.textContent = t; } };
  window.Admin = Admin;
})();

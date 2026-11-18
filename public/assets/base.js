/* =========================================================
   GRUPO DARMED · Interacciones compartidas (maqueta)
   ========================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const money = (n, c = 'S/') => `${c} ${Number(n).toFixed(2)}`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Estado compartido entre páginas (Grupo) ---------- */
  const BRAND_META = {
    darmed: { n: 'DARMED', c: '#b5487f', h: 'darmed.html' },
    renace: { n: 'RENACE', c: '#ff5c93', h: 'renace.html' },
    integrativa: { n: 'INTEGRATIVA', c: '#4f9a6b', h: 'integrativa.html' },
    depizone: { n: 'DEPIZONE', c: '#0aa5e8', h: 'depizone.html' }
  };
  const Group = {
    user() { return store.get('gd-user', null); },
    setUser(u) { store.set('gd-user', u); },
    logout() { try { localStorage.removeItem('gd-user'); } catch (e) {} },
    events() { return store.get('gd-events', []); },
    log(type, brand, data) {
      const ev = { id: Date.now() + Math.random().toString(36).slice(2, 5), type, brand, t: Date.now(), ...data };
      store.set('gd-events', [ev, ...Group.events()].slice(0, 80));
      return ev;
    },
    bookings() { return store.get('gd-bookings', []); },
    addBooking(b) { const all = Group.bookings(); all.push({ id: 'BK' + Date.now(), t: Date.now(), ...b }); store.set('gd-bookings', all); Group.log('booking', b.brand, { label: `${b.client} · ${b.treat}`, amount: b.price || 0 }); },
    cartCount(brand) { return store.get('gd-cart-' + brand, []).reduce((a, i) => a + i.qty, 0); },
    onChange(fn) { addEventListener('storage', e => { if (e.key && e.key.startsWith('gd-')) fn(e.key); }); }
  };

  const ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5L20 7"/></svg>',
    wa: '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7a.6.6 0 0 0 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.9.8a3.3 3.3 0 0 0 2.1-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4Z"/></svg>'
  };

  /* ---------- Arte de producto en SVG (nunca se rompe) ---------- */
  function productArt(p) {
    const c1 = p.c1 || '#f3d3e0', c2 = p.c2 || '#8a1f58', bg = p.bg || '#fbeff4';
    const id = 'g' + Math.random().toString(36).slice(2, 8);
    const label = (p.brand || '').toUpperCase().slice(0, 12);
    const shapes = {
      dropper: `<rect x="128" y="70" width="44" height="40" rx="6" fill="#222"/><rect x="138" y="40" width="24" height="34" rx="10" fill="#333"/><rect x="100" y="108" width="100" height="150" rx="22" fill="url(#${id})"/>`,
      jar: `<rect x="80" y="130" width="140" height="22" rx="8" fill="${c2}"/><rect x="72" y="150" width="156" height="104" rx="26" fill="url(#${id})"/>`,
      tube: `<path d="M110 60h80l-8 170a10 10 0 0 1-10 9h-44a10 10 0 0 1-10-9Z" fill="url(#${id})"/><rect x="118" y="238" width="64" height="26" rx="6" fill="${c2}"/>`,
      bottle: `<rect x="132" y="48" width="36" height="34" rx="6" fill="${c2}"/><rect x="104" y="80" width="92" height="178" rx="30" fill="url(#${id})"/>`,
      pump: `<rect x="143" y="40" width="14" height="40" fill="#ddd"/><rect x="132" y="34" width="52" height="12" rx="6" fill="#ddd"/><rect x="124" y="76" width="52" height="24" rx="6" fill="${c2}"/><rect x="98" y="98" width="104" height="160" rx="18" fill="url(#${id})"/>`,
      lipstick: `<rect x="122" y="150" width="56" height="108" rx="8" fill="${c2}"/><rect x="128" y="104" width="44" height="50" rx="4" fill="#d9b26c"/><path d="M132 104V64l36-20v60Z" fill="url(#${id})"/>`,
      compact: `<ellipse cx="150" cy="200" rx="96" ry="46" fill="${c2}"/><ellipse cx="150" cy="186" rx="96" ry="46" fill="url(#${id})"/><ellipse cx="150" cy="186" rx="62" ry="28" fill="#fff" opacity=".35"/>`,
      perfume: `<rect x="134" y="52" width="32" height="38" rx="4" fill="#d9b26c"/><rect x="88" y="88" width="124" height="166" rx="20" fill="url(#${id})" opacity=".92"/><rect x="104" y="104" width="22" height="134" rx="10" fill="#fff" opacity=".35"/>`,
      stick: `<rect x="118" y="56" width="64" height="40" rx="10" fill="${c2}"/><rect x="112" y="94" width="76" height="164" rx="18" fill="url(#${id})"/>`,
      mask: `<rect x="86" y="58" width="128" height="200" rx="14" fill="url(#${id})"/><path d="M86 86h128" stroke="#fff" stroke-width="3" stroke-dasharray="6 6" opacity=".7"/>`,
      device: `<rect x="120" y="44" width="60" height="214" rx="30" fill="url(#${id})"/><circle cx="150" cy="90" r="16" fill="#fff" opacity=".6"/><rect x="140" y="130" width="20" height="60" rx="10" fill="#fff" opacity=".35"/>`,
      syringe: `<rect x="138" y="40" width="24" height="24" rx="4" fill="${c2}"/><rect x="128" y="62" width="44" height="160" rx="10" fill="url(#${id})"/><rect x="147" y="222" width="6" height="40" fill="#999"/>`
    };
    const shape = shapes[p.shape] || shapes.bottle;
    return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${(p.name || '').replace(/"/g, '')}">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${id}b" cx=".3" cy=".25" r=".9"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${bg}"/></radialGradient></defs>
      <rect width="300" height="300" fill="url(#${id}b)"/>
      <circle cx="232" cy="70" r="46" fill="${c1}" opacity=".35"/><circle cx="62" cy="236" r="30" fill="${c2}" opacity=".12"/>
      <ellipse cx="150" cy="266" rx="80" ry="10" fill="#000" opacity=".08"/>
      ${shape}
      <text x="150" y="196" text-anchor="middle" font-family="Montserrat,Arial" font-size="12" font-weight="800" letter-spacing="2" fill="#fff" opacity=".95">${label}</text>
    </svg>`;
  }

  /* ---------- Toast ---------- */
  let toastBox;
  function toast(msg, icon = '✓') {
    if (!toastBox) { toastBox = document.createElement('div'); toastBox.className = 'toasts'; document.body.appendChild(toastBox); }
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span class="toast__ic">${icon}</span><span>${msg}</span>`;
    toastBox.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, 2800);
  }

  /* ---------- Barra del grupo + flotantes ---------- */
  function mountChrome(opts = {}) {
    const brands = [
      ['darmed', 'DARMED', 'darmed.html', '#c25a8c'],
      ['renace', 'RENACE', 'renace.html', '#f4a6c0'],
      ['integrativa', 'INTEGRATIVA', 'integrativa.html', '#8fbf9f'],
      ['depizone', 'DEPIZONE', 'depizone.html', '#38c6f4']
    ];
    const bar = $('[data-group-bar]');
    const paintBar = () => {
      if (!bar) return;
      const u = Group.user();
      bar.className = 'group-bar';
      bar.innerHTML = `<div class="container group-bar__inner">
        <span class="group-bar__label">Grupo DARMED</span>
        <nav class="group-bar__tabs">${brands.map(([k, n, h, c]) => { const cc = Group.cartCount(k); return `<a class="group-tab ${k === opts.brand ? 'is-active' : ''}" href="${h}" style="--dot:${c}" title="${cc ? cc + ' producto(s) en tu carrito ' + n : n}"><i></i>${n}${cc ? `<span class="group-tab__n">${cc}</span>` : ''}</a>`; }).join('')}</nav>
        ${u ? `<a class="group-bar__login" href="master.html" title="Ir al panel master"><span class="group-bar__av">${esc(u.name[0])}</span> Hola, ${esc(u.name.split(' ')[0])} · Panel</a>`
            : `<a class="group-bar__login" href="loger.html">${ICON.user.replace('<svg', '<svg width="15" height="15"')} Intranet</a>`}
      </div>`;
    };
    paintBar();
    UI.paintBar = paintBar;
    Group.onChange(paintBar);
    // Visita registrada para el panel master
    if (opts.brand) {
      const k = 'gd-visit-' + opts.brand;
      try { if (!sessionStorage.getItem(k)) { sessionStorage.setItem(k, 1); const v = store.get('gd-visits', {}); v[opts.brand] = (v[opts.brand] || 0) + 1; store.set('gd-visits', v); } } catch (e) {}
    }
    if (opts.whatsapp !== false) {
      const msg = encodeURIComponent(opts.waText || 'Hola, quiero información');
      document.body.insertAdjacentHTML('beforeend', `
        <a class="wa-float" href="https://wa.me/51943387184?text=${msg}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>
        <div class="wa-bubble">${opts.waBubble || '¿Te ayudamos? 💬'}</div>
        <button class="to-top" aria-label="Volver arriba">${ICON.left.replace('m15 18-6-6 6-6', 'm18 15-6-6-6 6')}</button>`);
      const top = $('.to-top');
      top.addEventListener('click', () => scrollTo({ top: 0 }));
      addEventListener('scroll', () => top.classList.toggle('show', scrollY > 700), { passive: true });
    }
    const header = $('.site-header');
    if (header) addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 10), { passive: true });

    // Menú móvil
    const mnav = $('.mobile-nav');
    $$('[data-menu-open]').forEach(b => b.addEventListener('click', () => mnav && mnav.classList.add('is-open')));
    if (mnav) mnav.addEventListener('click', e => { if (e.target.matches('.scrim, a')) mnav.classList.remove('is-open'); });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('[data-reveal]').forEach((el, i) => { if (!el.style.transitionDelay && el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 'ms'; io.observe(el); });
  }

  /* ---------- Contadores ---------- */
  function counters() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
      const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
      const t0 = performance.now(), dur = 1800;
      const tick = t => {
        const k = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - k, 4));
        el.textContent = pre + v.toLocaleString('es-PE', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); io.unobserve(el);
    }), { threshold: .5 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  /* ---------- Cuenta regresiva ---------- */
  function countdowns() {
    $$('[data-countdown]').forEach(el => {
      const end = Date.now() + parseFloat(el.dataset.countdown) * 3600e3;
      const parts = (el.dataset.parts || 'd,h,m,s').split(',');
      const names = { d: 'días', h: 'horas', m: 'min', s: 'seg' };
      el.classList.add('countdown');
      el.innerHTML = parts.map(p => `<div><b data-p="${p}">00</b><small>${names[p]}</small></div>`).join('');
      const run = () => {
        let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
        const v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
        if (!parts.includes('d')) v.h += v.d * 24;
        parts.forEach(p => { el.querySelector(`[data-p="${p}"]`).textContent = String(v[p]).padStart(2, '0'); });
      };
      run(); setInterval(run, 1000);
    });
  }

  /* ---------- Rails ---------- */
  function rails() {
    $$('[data-rail-prev],[data-rail-next]').forEach(b => b.addEventListener('click', () => {
      const r = $(b.dataset.railPrev || b.dataset.railNext);
      if (!r) return;
      const dir = b.hasAttribute('data-rail-next') ? 1 : -1;
      r.scrollBy({ left: dir * r.clientWidth * .8, behavior: 'smooth' });
    }));
  }

  /* ---------- Antes / Después ---------- */
  function compare() {
    $$('.ba').forEach(ba => {
      let drag = false;
      const set = x => { const r = ba.getBoundingClientRect(); ba.style.setProperty('--pos', Math.max(2, Math.min(98, (x - r.left) / r.width * 100)) + '%'); };
      ba.addEventListener('pointerdown', e => { drag = true; set(e.clientX); ba.setPointerCapture(e.pointerId); });
      ba.addEventListener('pointermove', e => { if (drag) set(e.clientX); });
      ba.addEventListener('pointerup', () => drag = false);
      // animación inicial de invitación
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return; io.unobserve(ba);
        let t = 0; const id = setInterval(() => { t += .06; ba.style.setProperty('--pos', (50 + Math.sin(t) * 22) + '%'); if (t > Math.PI * 2) { clearInterval(id); ba.style.setProperty('--pos', '50%'); } }, 16);
      }), { threshold: .6 });
      io.observe(ba);
    });
  }

  /* ---------- Modales ---------- */
  function openModal(id) { const m = document.getElementById(id); if (m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; } }
  function closeModals() { $$('.modal.is-open,.drawer.is-open').forEach(m => m.classList.remove('is-open')); document.body.style.overflow = ''; }
  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); openModal(o.dataset.open); }
    if (e.target.closest('[data-close]') || e.target.classList.contains('scrim')) closeModals();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModals(); });

  /* ---------- Imágenes con respaldo ---------- */
  function imgFallback() {
    $$('img').forEach(img => img.addEventListener('error', () => { img.style.visibility = 'hidden'; img.parentElement && img.parentElement.classList.add('img-fallback'); }, { once: true }));
  }

  /* ---------- Carrito / favoritos ---------- */
  function Cart(opts) {
    const key = 'gd-cart-' + opts.brand, fkey = 'gd-fav-' + opts.brand;
    const cur = opts.currency || 'S/';
    let items = store.get(key, []);
    let favs = new Set(store.get(fkey, []));
    const free = opts.freeShip || 199;

    document.body.insertAdjacentHTML('beforeend', `
      <div class="drawer" id="cartDrawer" aria-hidden="true"><div class="scrim"></div>
        <aside class="drawer__panel">
          <div class="drawer__head"><h3>${opts.title || 'Tu carrito'}</h3><button class="icon-btn" data-close aria-label="Cerrar">✕</button></div>
          <div class="drawer__body" id="cartBody"></div>
          <div class="drawer__foot" id="cartFoot"></div>
        </aside></div>`);

    const save = () => store.set(key, items);
    const count = () => items.reduce((a, i) => a + i.qty, 0);
    const total = () => items.reduce((a, i) => a + i.qty * i.price, 0);

    function render() {
      const body = $('#cartBody'), foot = $('#cartFoot');
      $$('[data-cart-count]').forEach(b => { b.textContent = count(); b.classList.toggle('has', count() > 0); });
      $$('[data-fav-count]').forEach(b => { b.textContent = favs.size; b.classList.toggle('has', favs.size > 0); });
      if (!items.length) {
        body.innerHTML = `<div class="cart-empty"><div class="big">🛍️</div><p><b>Tu carrito está vacío</b></p><p style="font-size:.85rem;margin-top:6px">${opts.emptyText || 'Agrega tus favoritos y vuelve aquí.'}</p></div>`;
        foot.innerHTML = `<button class="btn btn--block" data-close>Seguir explorando</button>`;
        return;
      }
      body.innerHTML = items.map(i => `
        <div class="cart-line">
          <div class="cart-line__img">${i.art || ''}</div>
          <div><div class="cart-line__name">${i.name}</div><div class="cart-line__meta">${i.brand || ''}${i.variant ? ' · ' + i.variant : ''}</div>
            <div class="qty"><button data-q="-1" data-id="${i.id}">−</button><span>${i.qty}</span><button data-q="1" data-id="${i.id}">+</button></div></div>
          <div class="cart-line__price">${money(i.price * i.qty, cur)}<button class="cart-line__rm" data-rm="${i.id}">Quitar</button></div>
        </div>`).join('');
      const t = total(), left = Math.max(0, free - t);
      foot.innerHTML = `
        <div class="ship-meter">${left > 0 ? `Te faltan <b>${money(left, cur)}</b> para ${opts.freeLabel || 'delivery gratis'} 🚚` : `<b>¡Genial!</b> Ya tienes ${opts.freeLabel || 'delivery gratis'} 🎉`}
          <div class="meter"><span style="width:${Math.min(100, t / free * 100)}%"></span></div></div>
        <div class="total-row"><span>Subtotal</span><span>${money(t, cur)}</span></div>
        <div class="total-row"><span>${opts.extraLabel || 'Envío'}</span><span>${left > 0 ? money(opts.shipCost ?? 12, cur) : 'Gratis'}</span></div>
        <div class="total-row grand"><span>Total</span><span>${money(t + (left > 0 ? (opts.shipCost ?? 12) : 0), cur)}</span></div>
        <button class="btn btn--block" id="checkoutBtn">${opts.checkoutLabel || 'Finalizar compra'} ${ICON.arrow}</button>
        <small style="text-align:center;color:var(--muted);font-size:.72rem">Paga en hasta ${opts.installments || 3} cuotas sin intereses · Pago 100% seguro</small>`;
      $('#checkoutBtn').onclick = () => {
        const u = Group.user();
        const code = (opts.brand.slice(0, 3).toUpperCase()) + '-' + Math.floor(10000 + Math.random() * 89999);
        Group.log('order', opts.brand, { code, label: items.map(i => `${i.qty}× ${i.name}`).join(', '), amount: t + (left > 0 ? (opts.shipCost ?? 12) : 0), units: count(), client: u ? u.name : 'Cliente web' });
        items = []; save(); render(); closeModals(); UI.paintBar && UI.paintBar();
        toast(`${opts.checkoutMsg || '¡Pedido simulado con éxito!'} · <b>${code}</b> <a href="master.html" style="text-decoration:underline">ver en panel</a>`, '🎉');
      };
    }

    document.addEventListener('click', e => {
      const q = e.target.closest('[data-q]');
      if (q) { const it = items.find(i => i.id === q.dataset.id); if (it) { it.qty += +q.dataset.q; if (it.qty < 1) items = items.filter(i => i !== it); save(); render(); } }
      const rm = e.target.closest('[data-rm]');
      if (rm) { items = items.filter(i => i.id !== rm.dataset.rm); save(); render(); }
      const h = e.target.closest('[data-fav]');
      if (h) {
        e.stopPropagation(); const id = h.dataset.fav;
        favs.has(id) ? favs.delete(id) : favs.add(id);
        store.set(fkey, [...favs]);
        $$(`[data-fav="${id}"]`).forEach(x => x.classList.toggle('is-on', favs.has(id)));
        toast(favs.has(id) ? 'Agregado a favoritos' : 'Quitado de favoritos', '♥'); render();
      }
    });

    const api = {
      add(p, qty = 1) {
        const ex = items.find(i => i.id === p.id);
        ex ? ex.qty += qty : items.push({ id: p.id, name: p.name, brand: p.brand, price: p.price, variant: p.variant, art: p.art || productArt(p), qty });
        save(); render(); UI.paintBar && UI.paintBar();
        $$('[data-cart-btn]').forEach(b => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
        toast(`<b>${p.name}</b> se agregó ${opts.addedText || 'al carrito'}`, '🛍️');
      },
      open() { $('#cartDrawer').classList.add('is-open'); document.body.style.overflow = 'hidden'; },
      isFav: id => favs.has(id),
      render
    };
    $$('[data-cart-btn]').forEach(b => b.addEventListener('click', api.open));
    // Si el carrito cambia en otra pestaña, se sincroniza
    Group.onChange(k => { if (k === key) { items = store.get(key, []); render(); } });
    render();
    return api;
  }

  /* ---------- Tarjeta de producto ---------- */
  function productCard(p, cart) {
    const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const art = p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : productArt(p);
    return `<article class="pcard" data-reveal data-id="${p.id}">
      <div class="pcard__media" data-quick="${p.id}">
        <div class="pcard__tags">${(p.tags || []).map(t => `<span class="tag ${t.c || ''}">${t.t}</span>`).join('')}${off ? `<span class="tag tag--hot">-${off}%</span>` : ''}</div>
        <button class="heart ${cart && cart.isFav(p.id) ? 'is-on' : ''}" data-fav="${p.id}" aria-label="Favorito">${ICON.heart}</button>
        ${art}
        <div class="pcard__quick"><button class="btn btn--light btn--sm btn--block" data-quick="${p.id}">Vista rápida</button></div>
      </div>
      <div class="pcard__body">
        <span class="pcard__brand">${p.brand || ''}</span>
        <h3 class="pcard__name">${p.name}</h3>
        <div class="rating"><span class="stars">${'★'.repeat(Math.round(p.rating || 5))}${'☆'.repeat(5 - Math.round(p.rating || 5))}</span>${p.rating || 5} (${p.reviews || 0})</div>
        <div class="price-row"><span class="price">${money(p.price)}</span>${p.old ? `<span class="price-old">${money(p.old)}</span>` : ''}
          <button class="add-btn" data-add="${p.id}" aria-label="Agregar">${ICON.plus}</button></div>
      </div></article>`;
  }

  /* ---------- Vista rápida ---------- */
  function quickView(products, cart, opts = {}) {
    document.body.insertAdjacentHTML('beforeend', `<div class="modal" id="quickModal"><div class="scrim"></div><div class="modal__box"><button class="modal__close" data-close>✕</button><div class="quick" id="quickBody"></div></div></div>`);
    let qty = 1;
    document.addEventListener('click', e => {
      const add = e.target.closest('[data-add]');
      if (add) { const p = products.find(x => x.id === add.dataset.add); if (p) cart.add(p); return; }
      const q = e.target.closest('[data-quick]');
      if (!q || e.target.closest('[data-fav]')) return;
      const p = products.find(x => x.id === q.dataset.quick); if (!p) return;
      qty = 1;
      const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
      $('#quickBody').innerHTML = `
        <div class="quick__media">${p.img ? `<img src="${p.img}" alt="">` : productArt(p)}</div>
        <div class="quick__body">
          <span class="pcard__brand">${p.brand}</span>
          <h3>${p.name}</h3>
          <div class="rating"><span class="stars">★★★★★</span>${p.rating || 5} · ${p.reviews || 0} reseñas verificadas</div>
          <div class="price-row"><span class="price" style="font-size:1.6rem">${money(p.price)}</span>${p.old ? `<span class="price-old">${money(p.old)}</span><span class="off">-${off}%</span>` : ''}</div>
          <p>${p.desc || opts.defaultDesc || 'Fórmula profesional seleccionada por nuestros especialistas para resultados visibles desde las primeras semanas.'}</p>
          <ul class="benefits">${(p.benefits || opts.defaultBenefits || ['Dermatológicamente probado', 'Apto para piel sensible', 'Envío en 24 h en Lima']).map(b => `<li>${b}</li>`).join('')}</ul>
          <div style="display:flex;gap:10px;align-items:center;margin-top:8px">
            <div class="qty" style="height:52px;margin:0"><button id="qMinus" style="width:44px;height:50px">−</button><span id="qVal">1</span><button id="qPlus" style="width:44px;height:50px">+</button></div>
            <button class="btn" style="flex:1" id="qAdd">${opts.addLabel || 'Agregar al carrito'}</button>
          </div>
          <small style="color:var(--muted)">🚚 ${opts.shipNote || 'Pide hoy y recíbelo mañana · 3 cuotas sin intereses'}</small>
        </div>`;
      $('#qMinus').onclick = () => { qty = Math.max(1, qty - 1); $('#qVal').textContent = qty; };
      $('#qPlus').onclick = () => { qty++; $('#qVal').textContent = qty; };
      $('#qAdd').onclick = () => { cart.add(p, qty); closeModals(); };
      openModal('quickModal');
    });
  }

  /* ---------- Prueba social ---------- */
  function socialProof(list) {
    if (!list || !list.length) return;
    const el = document.createElement('div'); el.className = 'social-proof'; document.body.appendChild(el);
    let i = 0;
    const show = () => {
      const s = list[i++ % list.length];
      el.innerHTML = `<div class="social-proof__img">${s.art || ''}</div><div><b>${s.who}</b> ${s.what}<small>${s.when} · ✔ verificado</small></div>`;
      el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 5200);
    };
    setTimeout(() => { show(); setInterval(show, 14000); }, 6000);
  }

  function init(opts = {}) {
    mountChrome(opts); reveal(); counters(); countdowns(); rails(); compare(); imgFallback();
  }

  /* ---------- Recomendación cruzada entre marcas ---------- */
  function crossSell(el, current) {
    if (!el) return;
    const SUG = {
      darmed: [['renace', 'Lleva tu rutina post-tratamiento', 'Sérums, SPF y K-beauty con delivery en 1 h.'], ['depizone', '¿Y la depilación láser?', 'Pacientes DARMED tienen 15% en su primer pack.']],
      renace: [['darmed', 'Potencia tu skincare con un tratamiento', 'Evaluación facial gratis con médicos DARMED.'], ['depizone', 'Piel suave para siempre', 'Láser diodo desde S/ 49 la sesión.']],
      depizone: [['renace', 'Cuida tu piel entre sesiones', 'Protectores y calmantes en RENACE.'], ['darmed', 'Tratamientos médicos estéticos', 'Botox, rellenos y bioestimuladores.']],
      integrativa: [['darmed', 'Estética con respaldo médico', 'Conoce DARMED, nuestra clínica insignia.'], ['renace', 'Bienestar también en casa', 'Skincare y cuidado corporal.']]
    }[current] || [];
    el.innerHTML = `<div class="container cross">${SUG.map(([b, t, d]) => { const m = BRAND_META[b]; const cc = Group.cartCount(b); return `<a href="${m.h}" class="cross__card" style="--bc:${m.c}"><span class="cross__brand">${m.n}</span><b>${t}</b><small>${d}</small>${cc ? `<span class="cross__cart">🛍️ Tienes ${cc} en tu carrito ${m.n}</span>` : ''}<span class="cross__go">Ir a ${m.n} →</span></a>`; }).join('')}</div>`;
  }

  window.UI = { $, $$, ICON, money, store, esc, Group, BRAND_META, crossSell, toast, productArt, productCard, Cart, quickView, socialProof, openModal, closeModals, reveal, init };
})();

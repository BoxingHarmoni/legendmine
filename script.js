/* =====================================================
   LEGENDMINE — Main JavaScript
   ===================================================== */

// ── Navbar scroll ──────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Burger menu ────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const navRight = document.querySelector('.nav-right');
if (burger) {
  burger.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    navRight?.classList.toggle('open');
  });
}

// ── Copy IP ────────────────────────────────────────
function copyIP() {
  navigator.clipboard.writeText('legendmine.ru').catch(() => {
    const el = document.createElement('textarea');
    el.value = 'legendmine.ru';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });
  showToast('IP скопирован!');
}

// ── Toast ──────────────────────────────────────────
function showToast(msg = 'Готово!') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fas fa-check"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Animate numbers ────────────────────────────────
function animateNumber(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString('ru-RU');
  }, 16);
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.hs-num').forEach(animateNumber);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) observer.observe(heroStats);

// ── Leaderboard tabs ───────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.leaderboard').forEach(lb => lb.classList.add('hidden'));
    btn.classList.add('active');
    const tab = document.getElementById('tab-' + btn.dataset.tab);
    if (tab) tab.classList.remove('hidden');
  });
});

// ── Profile tabs ───────────────────────────────────
document.querySelectorAll('.ptab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.ptab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = document.getElementById('ptab-' + btn.dataset.ptab);
    if (content) content.classList.add('active');
  });
});

// ── Donate category tabs ────────────────────────────
document.querySelectorAll('.dcat').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dcat').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.dcat-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = document.getElementById('dcat-' + btn.dataset.cat);
    if (content) content.classList.add('active');
  });
});

// ── Inventory generation ────────────────────────────
const invItems = [
  '🍎','💎','🪨','🌿','🏹','🔥','⚗️','🧪','🎣','💰',
  '🗡️','🛡️','🪵','🔩','⛏️','🧱','🌾','🍖','🥕','🧲',
  '💡','🗺️','🔮','🪤','','','','','',''
];
const hotbarItems = ['⚔️','🏹','⛏️','🪓','🍖','🧪','💰','🪙',''];

const invGrid = document.getElementById('inv-grid');
if (invGrid) {
  invItems.forEach((item, i) => {
    const slot = document.createElement('div');
    slot.className = 'inv-slot';
    slot.title = item ? `Предмет ${i + 1}` : 'Пусто';
    if (item) {
      slot.innerHTML = item;
      if (Math.random() > 0.5) {
        const count = document.createElement('span');
        count.className = 'slot-count';
        count.textContent = Math.floor(Math.random() * 64) + 1;
        slot.appendChild(count);
      }
    }
    invGrid.appendChild(slot);
  });
}

const invHotbar = document.getElementById('inv-hotbar');
if (invHotbar) {
  hotbarItems.forEach((item, i) => {
    const slot = document.createElement('div');
    slot.className = 'hotbar-slot' + (i === 0 ? ' active-slot' : '');
    slot.title = item || 'Пусто';
    if (item) slot.innerHTML = item;
    invHotbar.appendChild(slot);
  });
}

// ── Profile search (demo) ──────────────────────────
const profiles = {
  'DiamondKing_': {
    rank: '⭐ VIP+', rankClass: 'vip-plus-badge',
    kills: '3,847', deaths: '412', kd: '9.3', blocks: '1.2M', mobs: '48,200', level: '87',
    balance: '$2,450,000', donateBal: '1,250 ₽', time: '980 часов', reg: '12.03.2024', last: 'Сейчас',
    clan: '⚔️ DiamondWarriors', skin: 'DiamondKing_',
  },
  'xXSlayerXx': {
    rank: '💎 Premium', rankClass: 'premium-badge',
    kills: '4,820', deaths: '630', kd: '7.6', blocks: '980K', mobs: '36,100', level: '74',
    balance: '$1,890,000', donateBal: '380 ₽', time: '720 часов', reg: '05.07.2024', last: '15 мин. назад',
    clan: '🌑 DarkLegion', skin: 'xXSlayerXx',
  },
  'default': {
    rank: '🎮 Игрок', rankClass: '',
    kills: '0', deaths: '0', kd: '0', blocks: '0', mobs: '0', level: '1',
    balance: '$0', donateBal: '0 ₽', time: '0 часов', reg: 'Сегодня', last: 'Сейчас',
    clan: 'Нет клана', skin: 'Steve',
  }
};

function loadProfile() {
  const nick = document.getElementById('player-search')?.value.trim() || 'DiamondKing_';
  const data = profiles[nick] || { ...profiles['default'], skin: nick };
  applyProfile(nick, data);
}

function applyProfile(nick, data) {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el) el[attr] = val; };

  set('profile-name', nick);
  const rankEl = document.getElementById('profile-rank');
  if (rankEl) { rankEl.textContent = data.rank; rankEl.className = 'profile-rank ' + data.rankClass; }
  set('pqs-time', data.time);
  set('pqs-reg', data.reg);
  set('pqs-last', data.last);
  set('balance-val', data.balance);
  set('donate-bal-val', data.donateBal);
  set('stat-kills', data.kills);
  set('stat-deaths', data.deaths);
  set('stat-kd', data.kd);
  set('stat-blocks', data.blocks);
  set('stat-mobs', data.mobs);
  set('stat-level', data.level);
  setAttr('profile-skin', 'src', `https://mc-heads.net/body/${data.skin}/100`);
  const clanEl = document.querySelector('.clan-name');
  if (clanEl) clanEl.textContent = data.clan;
}

// ── Buy modal ──────────────────────────────────────
let currentItem = '', currentPrice = 0;

function buyRank(name, price) {
  currentItem = name;
  currentPrice = price;
  document.getElementById('modal-title').textContent = `Покупка ${name}`;
  document.getElementById('modal-price').textContent = `${price} ₽`;
  document.getElementById('buy-modal').classList.add('open');
}

function buyItem(name, price) {
  buyRank(name, price);
}

function closeModal() {
  document.getElementById('buy-modal')?.classList.remove('open');
}

function confirmBuy() {
  const nick = document.getElementById('modal-nick')?.value.trim();
  if (!nick) { showToast('Введите ваш ник!'); return; }
  closeModal();
  showToast(`Оплачено: ${currentItem} — ${currentPrice} ₽`);
  addDonateRow(nick, currentItem, currentPrice);
}

function selectPay(btn) {
  document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Topup modal ─────────────────────────────────────
function showTopup() {
  document.getElementById('topup-modal')?.classList.add('open');
}
function closeTopup() {
  document.getElementById('topup-modal')?.classList.remove('open');
}
function setTopup(amount) {
  document.querySelectorAll('.topup-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  const inp = document.getElementById('topup-custom');
  if (inp) inp.value = amount;
}
function confirmTopup() {
  const amount = document.getElementById('topup-custom')?.value;
  if (!amount || amount < 50) { showToast('Минимальная сумма — 50 ₽'); return; }
  closeTopup();
  showToast(`Баланс пополнен на ${amount} ₽!`);
}

// ── Close modal on overlay click ────────────────────
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });
});

// ── Dynamic online counter ──────────────────────────
function updateOnline() {
  const onlineEl = document.getElementById('online-count');
  if (!onlineEl) return;
  let current = parseInt(onlineEl.textContent) || 247;
  const delta = Math.floor(Math.random() * 7) - 3;
  current = Math.max(180, Math.min(350, current + delta));
  onlineEl.textContent = current;
}
setInterval(updateOnline, 8000);

// ── Sale countdown timer ────────────────────────────
const saleTimer = document.getElementById('sale-timer');
if (saleTimer) {
  let seconds = 2 * 3600 + 14 * 60 + 38;
  function updateTimer() {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    saleTimer.textContent =
      String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0');
    if (seconds > 0) seconds--;
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

// ── Donate history live add ─────────────────────────
function addDonateRow(nick, item, price) {
  const table = document.querySelector('.dh-table');
  if (!table) return;
  const row = document.createElement('div');
  row.className = 'dh-row';
  row.innerHTML = `
    <span class="dh-player"><img src="https://mc-heads.net/avatar/${nick}/20" alt=""/> ${nick}</span>
    <span class="dh-item">🛒 ${item}</span>
    <span class="dh-sum gold">${price} ₽</span>
    <span class="dh-time">Только что</span>
  `;
  row.style.cssText = 'opacity:0;transition:opacity 0.5s;';
  table.insertBefore(row, table.children[1]);
  setTimeout(() => { row.style.opacity = '1'; }, 50);
  const rows = table.querySelectorAll('.dh-row:not(.header)');
  if (rows.length > 8) rows[rows.length - 1].remove();
}

// ── Particles (canvas) ──────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.1,
      gold: Math.random() > 0.4
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(240,165,0,${p.o})`
        : `rgba(255,255,255,${p.o * 0.5})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Smooth scroll for anchor links ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Auto-load default profile on profile page ───────
if (document.getElementById('profile-wrapper')) {
  applyProfile('DiamondKing_', profiles['DiamondKing_']);
}

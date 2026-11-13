/* =====================================================
   LEGENDMINE — Profile Page Logic
   Auth · Inventory Textures · Admin Console
   ===================================================== */

'use strict';

// ══════════════════════════════════════════════════════
//  НАСТРОЙКИ ДЛЯ АДМИНИСТРАТОРА СЕРВЕРА LEGENDMINE
// ══════════════════════════════════════════════════════
const CONFIG = {
  // Показывать ли блок временных демо-аккаунтов на форме входа:
  // (Поставьте false, когда подключите сайт к реальной базе AuthMe / MySQL)
  ENABLE_DEMO_ACCOUNTS: true,

  // Пароль для входа в панель административной консоли:
  ADMIN_CONSOLE_PASSWORD: 'legendmine_admin',
};

// ══════════════════════════════════════════════════════
//  ITEM DATABASE  (Minecraft 1.21 textures from GitHub)
// ══════════════════════════════════════════════════════
const TEX = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/';

const ITEMS = {
  // ── Weapons ──
  netherite_sword:    { name: 'Незеритовый меч',     tex: TEX+'netherite_sword.png',    rarity: 'legendary' },
  diamond_sword:      { name: 'Алмазный меч',         tex: TEX+'diamond_sword.png',      rarity: 'rare' },
  iron_sword:         { name: 'Железный меч',          tex: TEX+'iron_sword.png',         rarity: 'common' },
  bow:                { name: 'Лук',                   tex: TEX+'bow_pulling_0.png',      rarity: 'common' },
  crossbow:           { name: 'Арбалет',               tex: TEX+'crossbow_standby.png',   rarity: 'uncommon' },
  trident:            { name: 'Трезубец',              tex: TEX+'trident.png',            rarity: 'rare' },
  // ── Tools ──
  netherite_pickaxe:  { name: 'Незеритовая кирка',    tex: TEX+'netherite_pickaxe.png',  rarity: 'legendary' },
  diamond_pickaxe:    { name: 'Алмазная кирка',        tex: TEX+'diamond_pickaxe.png',    rarity: 'rare' },
  netherite_axe:      { name: 'Незеритовый топор',     tex: TEX+'netherite_axe.png',      rarity: 'legendary' },
  diamond_axe:        { name: 'Алмазный топор',         tex: TEX+'diamond_axe.png',        rarity: 'rare' },
  fishing_rod:        { name: 'Удочка',                tex: TEX+'fishing_rod_uncast.png', rarity: 'common' },
  flint_and_steel:    { name: 'Огниво',                tex: TEX+'flint_and_steel.png',    rarity: 'common' },
  shears:             { name: 'Ножницы',               tex: TEX+'shears.png',             rarity: 'common' },
  // ── Armor ──
  netherite_helmet:   { name: 'Незеритовый шлем',     tex: TEX+'netherite_helmet.png',   rarity: 'legendary' },
  netherite_chestplate:{ name: 'Незеритовый нагрудник',tex: TEX+'netherite_chestplate.png',rarity:'legendary'},
  netherite_leggings: { name: 'Незеритовые поножи',   tex: TEX+'netherite_leggings.png', rarity: 'legendary' },
  netherite_boots:    { name: 'Незеритовые сапоги',   tex: TEX+'netherite_boots.png',    rarity: 'legendary' },
  diamond_helmet:     { name: 'Алмазный шлем',         tex: TEX+'diamond_helmet.png',     rarity: 'rare' },
  diamond_chestplate: { name: 'Алмазный нагрудник',    tex: TEX+'diamond_chestplate.png', rarity: 'rare' },
  diamond_leggings:   { name: 'Алмазные поножи',       tex: TEX+'diamond_leggings.png',   rarity: 'rare' },
  diamond_boots:      { name: 'Алмазные сапоги',       tex: TEX+'diamond_boots.png',      rarity: 'rare' },
  // ── Resources ──
  diamond:            { name: 'Алмаз',                 tex: TEX+'diamond.png',            rarity: 'rare' },
  emerald:            { name: 'Изумруд',               tex: TEX+'emerald.png',            rarity: 'uncommon' },
  netherite_ingot:    { name: 'Незеритовый слиток',    tex: TEX+'netherite_ingot.png',    rarity: 'legendary' },
  gold_ingot:         { name: 'Золотой слиток',         tex: TEX+'gold_ingot.png',         rarity: 'uncommon' },
  iron_ingot:         { name: 'Железный слиток',        tex: TEX+'iron_ingot.png',         rarity: 'common' },
  coal:               { name: 'Уголь',                  tex: TEX+'coal.png',               rarity: 'common' },
  redstone:           { name: 'Красный камень',         tex: TEX+'redstone.png',           rarity: 'common' },
  lapis_lazuli:       { name: 'Лазурит',               tex: TEX+'lapis_lazuli.png',       rarity: 'common' },
  quartz:             { name: 'Кварц',                  tex: TEX+'quartz.png',             rarity: 'common' },
  ancient_debris:     { name: 'Древние обломки',        tex: TEX+'ancient_debris.png',     rarity: 'legendary' },
  // ── Food ──
  golden_apple:       { name: 'Золотое яблоко',         tex: TEX+'golden_apple.png',       rarity: 'rare' },
  enchanted_golden_apple:{ name: 'Зачарованное яблоко',tex: TEX+'enchanted_golden_apple.png',rarity:'legendary'},
  cooked_beef:        { name: 'Жареная говядина',       tex: TEX+'cooked_beef.png',        rarity: 'common' },
  bread:              { name: 'Хлеб',                   tex: TEX+'bread.png',              rarity: 'common' },
  // ── Potions ──
  potion:             { name: 'Зелье',                  tex: TEX+'potion.png',             rarity: 'uncommon' },
  splash_potion:      { name: 'Зелье-снаряд',           tex: TEX+'splash_potion.png',      rarity: 'uncommon' },
  // ── Misc ──
  ender_pearl:        { name: 'Жемчуг Края',            tex: TEX+'ender_pearl.png',        rarity: 'uncommon' },
  totem_of_undying:   { name: 'Тотем бессмертия',       tex: TEX+'totem_of_undying.png',   rarity: 'legendary' },
  shield:             { name: 'Щит',                    tex: TEX+'shield.png',             rarity: 'common' },
  compass:            { name: 'Компас',                 tex: TEX+'compass_16.png',         rarity: 'common' },
  map:                { name: 'Карта',                  tex: TEX+'filled_map.png',         rarity: 'common' },
  book:               { name: 'Книга',                  tex: TEX+'book.png',               rarity: 'common' },
  enchanted_book:     { name: 'Зачарованная книга',     tex: TEX+'enchanted_book.png',     rarity: 'rare' },
  experience_bottle:  { name: 'Бутылка опыта',          tex: TEX+'experience_bottle.png',  rarity: 'uncommon' },
  blaze_rod:          { name: 'Стержень Ифрита',        tex: TEX+'blaze_rod.png',          rarity: 'uncommon' },
  nether_star:        { name: 'Звезда Нижнего мира',    tex: TEX+'nether_star.png',        rarity: 'legendary' },
};

const RARITY_COLOR = {
  common:    '#ffffff',
  uncommon:  '#55ff55',
  rare:      '#5555ff',
  legendary: '#ffaa00',
};

// ══════════════════════════════════════════════════════
//  PLAYER DATABASE (demo - in real app: from server API)
// ══════════════════════════════════════════════════════
const PLAYERS_DB = {
  BoxingHarmony: {
    password: 'harmony123',
    rank: '⭐ VIP+', rankClass: 'vip-plus-badge',
    isAdmin: false,
    time: '432 часа', reg: '14.06.2025', last: 'Сейчас',
    balance: '$840,000', donateBal: '650 ₽',
    kills: '1,247', deaths: '203', kd: '6.1', blocks: '540K', mobs: '21,400', level: '52',
    xp: 52400, xpNext: 60000,
    clan: '🌊 OceanWarriors', clanRole: 'Участник',
    ip: '192.168.1.42',
    equipment: [
      { id: 'netherite_helmet',    enchants: ['Защита IV', 'Ненарушимость III', 'Дыхание III'] },
      { id: 'netherite_chestplate',enchants: ['Защита IV', 'Ненарушимость III', 'Тернии III'] },
      { id: 'netherite_leggings',  enchants: ['Защита IV', 'Быстрые ноги II', 'Ненарушимость III'] },
      { id: 'netherite_boots',     enchants: ['Защита IV', 'Глубоководник III', 'Ненарушимость III', 'Перо падения IV'] },
      { id: 'netherite_sword',     enchants: ['Острота V', 'Огонь II', 'Откидывание II', 'Ненарушимость III', 'Добыча III'] },
      { id: 'bow',                 enchants: ['Сила V', 'Бесконечность I', 'Пламя I', 'Пробивание I'] },
    ],
    hotbar: [
      { id: 'netherite_sword', count: 1, enchants: ['Острота V', 'Огонь II', 'Откидывание II'] },
      { id: 'bow',             count: 1, enchants: ['Сила V', 'Бесконечность I'] },
      { id: 'netherite_pickaxe', count: 1, enchants: ['Эффективность V', 'Удача III', 'Ненарушимость III'] },
      { id: 'golden_apple',    count: 5, enchants: [] },
      { id: 'ender_pearl',     count: 16, enchants: [] },
      { id: 'totem_of_undying',count: 1, enchants: [] },
      { id: 'potion',          count: 3, enchants: [], meta: 'Зелье скорости II' },
      { id: 'splash_potion',   count: 2, enchants: [], meta: 'Зелье силы I' },
      { id: 'cooked_beef',     count: 64, enchants: [] },
    ],
    inventory: [
      { id: 'diamond',          count: 847,  enchants: [] },
      { id: 'netherite_ingot',  count: 12,   enchants: [] },
      { id: 'ancient_debris',   count: 8,    enchants: [] },
      { id: 'gold_ingot',       count: 320,  enchants: [] },
      { id: 'iron_ingot',       count: 640,  enchants: [] },
      { id: 'enchanted_book',   count: 1,    enchants: [], meta: 'Острота V' },
      { id: 'enchanted_book',   count: 1,    enchants: [], meta: 'Защита IV' },
      { id: 'experience_bottle',count: 32,   enchants: [] },
      { id: 'blaze_rod',        count: 28,   enchants: [] },
      { id: 'ender_pearl',      count: 48,   enchants: [] },
      null,
      { id: 'compass',          count: 1,    enchants: [] },
      { id: 'map',              count: 1,    enchants: [] },
      { id: 'bread',            count: 40,   enchants: [] },
      { id: 'cooked_beef',      count: 32,   enchants: [] },
      null, null,
      { id: 'redstone',         count: 256,  enchants: [] },
      { id: 'lapis_lazuli',     count: 128,  enchants: [] },
      { id: 'coal',             count: 320,  enchants: [] },
      null, null, null, null, null, null, null,
    ],
    resources: [
      { emoji: '💎', name: 'Алмазы',     count: 847,    max: 5000, color: '#4dd9ff' },
      { emoji: '🪙', name: 'Золото',     count: 3200,   max: 10000,color: '#f0a500' },
      { emoji: '⚙️', name: 'Железо',    count: 8640,   max: 20000,color: '#b0b0b0' },
      { emoji: '💚', name: 'Изумруды',  count: 420,    max: 5000, color: '#2ecc71' },
      { emoji: '🖤', name: 'Незерит',   count: 12,     max: 500,  color: '#8e44ad' },
      { emoji: '🪨', name: 'Уголь',     count: 14200,  max: 50000,color: '#555' },
      { emoji: '🔴', name: 'Красный камень', count: 2100, max: 10000, color: '#e74c3c' },
      { emoji: '🔵', name: 'Лазурит',   count: 890,    max: 5000, color: '#3498db' },
      { emoji: '⬜', name: 'Кварц',     count: 3400,   max: 10000, color: '#ecf0f1' },
    ],
    achievements: [
      { icon: '🏆', name: 'Первый убийца', desc: 'Убей 100 игроков',        done: true },
      { icon: '💎', name: 'Алмазный барон',desc: 'Накопи 1000 алмазов',    done: false, progress: 847, total: 1000 },
      { icon: '⏰', name: 'Ветеран',       desc: 'Проведи 500 часов',       done: false, progress: 432, total: 500 },
      { icon: '🛡️', name: 'Воин',         desc: 'Убей 1000 мобов',         done: true },
      { icon: '🐉', name: 'Убийца дракона',desc: 'Убей дракона 10 раз',    done: false, progress: 3, total: 10 },
      { icon: '💰', name: 'Богач',         desc: 'Заработай $1,000,000',    done: false, progress: 840000, total: 1000000 },
      { icon: '👑', name: 'Легенда сервера',desc: '1е место в рейтинге',   done: false, locked: true },
    ],
    history: [
      { type: 'kill',   text: 'Убил <b>DarkShadow</b> в PvP',             time: '3 мин. назад',   val: '+40 XP',  pos: true },
      { type: 'buy',    text: 'Купил <b>Незерит шлем</b> на рынке',        time: '28 мин. назад',  val: '-$42,000',pos: false },
      { type: 'sell',   text: 'Продал <b>128 алмазов</b>',                 time: '1 час назад',    val: '+$256,000',pos:true },
      { type: 'donate-h',text:'Продлил <b>VIP+</b> на 30 дней',           time: '2 дня назад',    val: 'Активно', pos: true },
      { type: 'mine',   text: 'Добыл <b>847 алмазов</b>',                  time: '3 дня назад',    val: '+847 💎', pos: true },
      { type: 'craft',  text: 'Скрафтил <b>Незеритовый шлем</b>',         time: '4 дня назад',    val: '+1 шт',  pos: true },
    ],
  },

  'DiamondKing_': {
    password: 'king456',
    rank: '💎 Premium', rankClass: 'premium-badge',
    isAdmin: true,
    time: '980 часов', reg: '12.03.2024', last: 'Сейчас',
    balance: '$2,450,000', donateBal: '1,250 ₽',
    kills: '3,847', deaths: '412', kd: '9.3', blocks: '1.2M', mobs: '48,200', level: '87',
    xp: 84200, xpNext: 100000,
    clan: '⚔️ DiamondWarriors', clanRole: 'Лидер · 24 участника',
    ip: '10.0.0.5',
    equipment: [
      { id: 'netherite_helmet',    enchants: ['Защита IV', 'Ненарушимость III', 'Дыхание III', 'Аквааффинность I'] },
      { id: 'netherite_chestplate',enchants: ['Защита IV', 'Ненарушимость III', 'Тернии III'] },
      { id: 'netherite_leggings',  enchants: ['Защита IV', 'Быстрые ноги III', 'Ненарушимость III'] },
      { id: 'netherite_boots',     enchants: ['Защита IV', 'Глубоководник III', 'Ненарушимость III', 'Перо падения IV', 'Удача моря III'] },
      { id: 'netherite_sword',     enchants: ['Острота V', 'Огонь II', 'Откидывание II', 'Ненарушимость III', 'Добыча III', 'Заточка'] },
      { id: 'netherite_pickaxe',   enchants: ['Эффективность V', 'Шёлковое касание', 'Ненарушимость III'] },
    ],
    hotbar: [
      { id: 'netherite_sword', count: 1,  enchants: ['Острота V', 'Огонь II'] },
      { id: 'netherite_axe',   count: 1,  enchants: ['Острота V', 'Эффективность V'] },
      { id: 'netherite_pickaxe',count:1,  enchants: ['Эффективность V', 'Удача III'] },
      { id: 'totem_of_undying',count: 1,  enchants: [] },
      { id: 'enchanted_golden_apple', count: 3, enchants: [] },
      { id: 'ender_pearl',     count: 16, enchants: [] },
      { id: 'trident',         count: 1,  enchants: ['Лояльность III', 'Ярость прибоя III'] },
      { id: 'bow',             count: 1,  enchants: ['Сила V', 'Бесконечность I', 'Пламя I'] },
      { id: 'splash_potion',   count: 4,  enchants: [], meta: 'Зелье регенерации II' },
    ],
    inventory: [
      { id: 'diamond',          count: 2847, enchants: [] },
      { id: 'netherite_ingot',  count: 64,   enchants: [] },
      { id: 'ancient_debris',   count: 32,   enchants: [] },
      { id: 'nether_star',      count: 2,    enchants: [] },
      { id: 'enchanted_book',   count: 1,    enchants: [], meta: 'Острота V' },
      { id: 'enchanted_book',   count: 1,    enchants: [], meta: 'Эффективность V' },
      { id: 'enchanted_book',   count: 1,    enchants: [], meta: 'Защита IV' },
      { id: 'experience_bottle',count: 64,   enchants: [] },
      { id: 'gold_ingot',       count: 512,  enchants: [] },
      { id: 'iron_ingot',       count: 1024, enchants: [] },
      { id: 'emerald',          count: 256,  enchants: [] },
      { id: 'blaze_rod',        count: 64,   enchants: [] },
      { id: 'ender_pearl',      count: 64,   enchants: [] },
      { id: 'golden_apple',     count: 12,   enchants: [] },
      { id: 'compass',          count: 1,    enchants: [] },
      { id: 'map',              count: 2,    enchants: [] },
      { id: 'shield',           count: 1,    enchants: ['Ненарушимость III'] },
      { id: 'redstone',         count: 512,  enchants: [] },
      { id: 'lapis_lazuli',     count: 320,  enchants: [] },
      { id: 'coal',             count: 640,  enchants: [] },
      null, null, null, null, null, null, null,
    ],
    resources: [
      { emoji: '💎', name: 'Алмазы',     count: 2847,   max: 5000, color: '#4dd9ff' },
      { emoji: '🪙', name: 'Золото',     count: 8420,   max: 10000,color: '#f0a500' },
      { emoji: '⚙️', name: 'Железо',    count: 14200,  max: 20000,color: '#b0b0b0' },
      { emoji: '💚', name: 'Изумруды',  count: 1230,   max: 5000, color: '#2ecc71' },
      { emoji: '🖤', name: 'Незерит',   count: 64,     max: 500,  color: '#8e44ad' },
      { emoji: '🪨', name: 'Уголь',     count: 32500,  max: 50000,color: '#555' },
      { emoji: '🔴', name: 'Красный камень', count: 5600, max: 10000, color: '#e74c3c' },
      { emoji: '🔵', name: 'Лазурит',   count: 3200,   max: 5000, color: '#3498db' },
      { emoji: '⬜', name: 'Кварц',     count: 6400,   max: 10000, color: '#ecf0f1' },
    ],
    achievements: [
      { icon: '🏆', name: 'Первый убийца',  desc: 'Убей 100 игроков',    done: true },
      { icon: '💎', name: 'Алмазный барон', desc: 'Накопи 1000 алмазов', done: true },
      { icon: '⏰', name: 'Ветеран',        desc: 'Проведи 500 часов',   done: true },
      { icon: '🛡️', name: 'Лидер клана',   desc: 'Создай клан 10+ чел', done: true },
      { icon: '🐉', name: 'Убийца дракона', desc: 'Убей дракона 10 раз', done: false, progress: 7, total: 10 },
      { icon: '💰', name: 'Миллионер',      desc: 'Заработай $5,000,000',done: false, progress: 2450000, total: 5000000 },
      { icon: '👑', name: 'Легенда сервера',desc: '1е место в рейтинге', done: false, locked: true },
    ],
    history: [
      { type: 'kill',   text: 'Убил <b>xXSlayerXx</b> в PvP',            time: '2 мин. назад',   val: '+50 XP',  pos: true },
      { type: 'buy',    text: 'Купил <b>Незеритовый меч</b> на рынке',    time: '15 мин. назад',  val: '-$25,000',pos: false },
      { type: 'sell',   text: 'Продал <b>64 алмаза</b>',                  time: '1 час назад',    val: '+$128,000',pos:true },
      { type: 'donate-h',text:'Купил <b>Premium</b>',                     time: '2 дня назад',    val: 'Активно', pos: true },
      { type: 'mine',   text: 'Добыл <b>500 алмазов</b>',                 time: '5 дней назад',   val: '+500 💎', pos: true },
    ],
  },

  'xXSlayerXx': {
    password: 'slayer789',
    rank: '🥉 VIP', rankClass: 'vip-badge',
    isAdmin: false,
    time: '620 часов', reg: '05.07.2024', last: '5 мин. назад',
    balance: '$1,890,000', donateBal: '380 ₽',
    kills: '4,820', deaths: '630', kd: '7.6', blocks: '980K', mobs: '36,100', level: '74',
    xp: 64000, xpNext: 80000,
    clan: '🌑 DarkLegion', clanRole: 'Офицер · 15 участников',
    ip: '172.16.0.8',
    equipment: [
      { id: 'diamond_helmet',    enchants: ['Защита IV', 'Ненарушимость III', 'Дыхание II'] },
      { id: 'netherite_chestplate',enchants: ['Защита IV', 'Ненарушимость III'] },
      { id: 'diamond_leggings',  enchants: ['Защита III', 'Ненарушимость III'] },
      { id: 'diamond_boots',     enchants: ['Защита III', 'Перо падения IV'] },
      { id: 'netherite_sword',   enchants: ['Острота V', 'Огонь II', 'Ненарушимость III'] },
      { id: 'crossbow',          enchants: ['Быстрая зарядка III', 'Многозарядность I'] },
    ],
    hotbar: [
      { id: 'netherite_sword', count: 1,  enchants: ['Острота V', 'Огонь II'] },
      { id: 'crossbow',        count: 1,  enchants: ['Быстрая зарядка III'] },
      { id: 'diamond_axe',     count: 1,  enchants: ['Острота V', 'Ненарушимость III'] },
      { id: 'totem_of_undying',count: 1,  enchants: [] },
      { id: 'golden_apple',    count: 8,  enchants: [] },
      { id: 'ender_pearl',     count: 12, enchants: [] },
      { id: 'potion',          count: 4,  enchants: [], meta: 'Зелье силы II' },
      { id: 'shield',          count: 1,  enchants: ['Ненарушимость III'] },
      { id: 'cooked_beef',     count: 64, enchants: [] },
    ],
    inventory: [
      { id: 'diamond',         count: 520,  enchants: [] },
      { id: 'gold_ingot',      count: 180,  enchants: [] },
      { id: 'iron_ingot',      count: 640,  enchants: [] },
      { id: 'netherite_ingot', count: 4,    enchants: [] },
      { id: 'enchanted_book',  count: 1,    enchants: [], meta: 'Острота V' },
      { id: 'blaze_rod',       count: 16,   enchants: [] },
      { id: 'ender_pearl',     count: 32,   enchants: [] },
      { id: 'redstone',        count: 128,  enchants: [] },
      { id: 'coal',            count: 256,  enchants: [] },
      { id: 'lapis_lazuli',    count: 64,   enchants: [] },
      { id: 'cooked_beef',     count: 64,   enchants: [] },
      { id: 'bread',           count: 32,   enchants: [] },
      { id: 'experience_bottle',count: 16,  enchants: [] },
      null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    ],
    resources: [
      { emoji: '💎', name: 'Алмазы',    count: 520,   max: 5000, color: '#4dd9ff' },
      { emoji: '🪙', name: 'Золото',    count: 1800,  max: 10000,color: '#f0a500' },
      { emoji: '⚙️', name: 'Железо',   count: 6400,  max: 20000,color: '#b0b0b0' },
      { emoji: '💚', name: 'Изумруды', count: 180,   max: 5000, color: '#2ecc71' },
      { emoji: '🖤', name: 'Незерит',  count: 4,     max: 500,  color: '#8e44ad' },
      { emoji: '🪨', name: 'Уголь',    count: 9600,  max: 50000,color: '#555' },
      { emoji: '🔴', name: 'Красный камень', count: 1280, max: 10000, color: '#e74c3c' },
      { emoji: '🔵', name: 'Лазурит',  count: 640,   max: 5000, color: '#3498db' },
      { emoji: '⬜', name: 'Кварц',    count: 2400,  max: 10000, color: '#ecf0f1' },
    ],
    achievements: [
      { icon: '🏆', name: 'Первый убийца',  desc: 'Убей 100 игроков',    done: true },
      { icon: '⚔️', name: 'Мастер PvP',    desc: 'Убей 1000 игроков',   done: true },
      { icon: '💎', name: 'Алмазный барон', desc: 'Накопи 1000 алмазов', done: false, progress: 520, total: 1000 },
      { icon: '⏰', name: 'Ветеран',        desc: 'Проведи 500 часов',   done: true },
      { icon: '🐉', name: 'Убийца дракона', desc: 'Убей дракона 10 раз', done: false, progress: 2, total: 10 },
      { icon: '💰', name: 'Миллионер',      desc: 'Заработай $5,000,000',done: false, progress: 1890000, total: 5000000 },
    ],
    history: [
      { type: 'kill', text: 'Убил <b>NightWalker</b> в SkyWars', time: '5 мин. назад',  val: '+40 XP',  pos: true },
      { type: 'sell', text: 'Продал <b>200 алмазов</b>',          time: '40 мин. назад', val: '+$400,000',pos:true },
      { type: 'buy',  text: 'Купил <b>Незеритовый нагрудник</b>', time: '2 часа назад',  val: '-$80,000',pos: false },
    ],
  },
};

// ══════════════════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════════════════
let CURRENT_USER = null;

function initAuth() {
  // Применяем настройку отображения временных демо-аккаунтов
  const demoBox = document.getElementById('auth-demo-box');
  if (demoBox) {
    demoBox.style.display = CONFIG.ENABLE_DEMO_ACCOUNTS ? 'flex' : 'none';
  }

  const saved = localStorage.getItem('lm_user');
  if (saved) {
    try {
      const { nick, pass } = JSON.parse(saved);
      if (PLAYERS_DB[nick] && PLAYERS_DB[nick].password === pass) {
        loginSuccess(nick);
        return;
      }
    } catch (e) {
      localStorage.removeItem('lm_user');
    }
  }
  showAuthOverlay();
}

function showAuthOverlay() {
  document.getElementById('auth-overlay').style.display = 'flex';
  document.getElementById('page-header').style.display = 'none';
  document.getElementById('profile-section').style.display = 'none';
  document.getElementById('nav-login-btn').style.display = '';
  document.getElementById('nav-user-info').style.display = 'none';
}

function loginSuccess(nick) {
  CURRENT_USER = nick;
  localStorage.setItem('lm_user', JSON.stringify({ nick, pass: PLAYERS_DB[nick].password }));
  document.getElementById('auth-overlay').style.display = 'none';
  document.getElementById('page-header').style.display = '';
  document.getElementById('profile-section').style.display = '';
  document.getElementById('nav-login-btn').style.display = 'none';
  const uInfo = document.getElementById('nav-user-info');
  uInfo.style.display = 'flex';
  document.getElementById('nav-username').textContent = nick;
  document.getElementById('nav-avatar').src = `https://mc-heads.net/avatar/${nick}/28`;
  document.getElementById('page-header-sub').textContent = `Добро пожаловать, ${nick}!`;

  const data = PLAYERS_DB[nick];

  // Вкладка «Консоль» видна ИСКЛЮЧИТЕЛЬНО для администратора (isAdmin === true)
  const consoleBtn = document.getElementById('console-tab-btn');
  const consoleContent = document.getElementById('ptab-console');
  if (data && data.isAdmin === true) {
    consoleBtn.style.display = 'inline-flex';
  } else {
    consoleBtn.style.display = 'none';
    if (consoleContent) consoleContent.classList.remove('active');
    // Если активной была консоль у не-админа, переключаем на статистику
    const activeTab = document.querySelector('.ptab.active');
    if (activeTab && activeTab.dataset.ptab === 'console') {
      const statsBtn = document.querySelector('[data-ptab="stats"]');
      if (statsBtn) statsBtn.click();
    }
  }

  renderProfile(nick, data);
}

function doLogin() {
  const nick = document.getElementById('auth-nick').value.trim();
  const pass = document.getElementById('auth-pass').value;
  const err  = document.getElementById('auth-error');
  if (!nick || !pass) { err.textContent = 'Заполните все поля'; return; }
  if (!PLAYERS_DB[nick]) { err.textContent = 'Игрок не найден на сервере'; return; }
  if (PLAYERS_DB[nick].password !== pass) { err.textContent = 'Неверный пароль'; return; }
  err.textContent = '';
  loginSuccess(nick);
}

function doRegister() {
  const nick  = document.getElementById('reg-nick').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;
  const err   = document.getElementById('reg-error');
  if (!nick || !pass || !pass2) { err.textContent = 'Заполните все поля'; return; }
  if (pass !== pass2) { err.textContent = 'Пароли не совпадают'; return; }
  if (nick.length < 3) { err.textContent = 'Ник минимум 3 символа'; return; }
  if (PLAYERS_DB[nick]) { err.textContent = 'Игрок с таким ником уже зарегистрирован'; return; }
  // Create player
  PLAYERS_DB[nick] = {
    password: pass,
    rank: '🎮 Игрок', rankClass: '',
    isAdmin: false,
    time: '0 часов', reg: new Date().toLocaleDateString('ru-RU'), last: 'Сейчас',
    balance: '$0', donateBal: '0 ₽',
    kills: '0', deaths: '0', kd: '0', blocks: '0', mobs: '0', level: '1',
    xp: 0, xpNext: 1000,
    clan: 'Нет клана', clanRole: '',
    ip: '—',
    equipment: [],
    hotbar: new Array(9).fill(null),
    inventory: new Array(27).fill(null),
    resources: [],
    achievements: [],
    history: [{ type: 'craft', text: 'Добро пожаловать на LegendMine!', time: 'Только что', val: 'Старт', pos: true }],
  };
  err.textContent = '';
  showToast(`Добро пожаловать, ${nick}!`);
  loginSuccess(nick);
}

function doLogout() {
  CURRENT_USER = null;
  localStorage.removeItem('lm_user');
  // Reset admin console
  document.getElementById('console-gate').classList.remove('hidden');
  document.getElementById('console-ui').classList.add('hidden');
  showAuthOverlay();
}

function switchToRegister() {
  document.getElementById('auth-login-form').classList.add('hidden');
  document.getElementById('auth-register-form').classList.remove('hidden');
}
function switchToLogin() {
  document.getElementById('auth-register-form').classList.add('hidden');
  document.getElementById('auth-login-form').classList.remove('hidden');
}
function fillDemo(nick, pass) {
  document.getElementById('auth-nick').value = nick;
  document.getElementById('auth-pass').value = pass;
}
function togglePass(id, btn) {
  const inp = document.getElementById(id);
  const icon = btn.querySelector('i');
  if (inp.type === 'password') {
    inp.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    inp.type = 'password';
    icon.className = 'fas fa-eye';
  }
}
// Enter key on login
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('auth-pass')?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  document.getElementById('auth-nick')?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});

// ══════════════════════════════════════════════════════
//  RENDER PROFILE
// ══════════════════════════════════════════════════════
function renderProfile(nick, data) {
  set('profile-name', nick);
  set('pqs-time', data.time);
  set('pqs-reg',  data.reg);
  set('pqs-last', data.last);
  set('balance-val',     data.balance);
  set('donate-bal-val',  data.donateBal);
  set('stat-kills',  data.kills);
  set('stat-deaths', data.deaths);
  set('stat-kd',     data.kd);
  set('stat-blocks', data.blocks);
  set('stat-mobs',   data.mobs);
  set('stat-level',  data.level);
  set('stat-clan',   data.clan);
  set('stat-clan-role', data.clanRole || '');

  const rankEl = document.getElementById('profile-rank');
  rankEl.textContent = data.rank;
  rankEl.className = 'profile-rank ' + (data.rankClass || '');

  const glowEl = document.getElementById('rank-glow');
  glowEl.className = 'profile-rank-glow ' + (data.rankClass === 'premium-badge' ? 'vip-plus' : '');

  document.getElementById('profile-skin').src = `https://mc-heads.net/body/${nick}/100`;

  // XP bar
  const pct = Math.round((data.xp / data.xpNext) * 100);
  document.getElementById('xp-fill').style.width = pct + '%';
  document.getElementById('xp-label-l').textContent = `Lv.${data.level}`;
  document.getElementById('xp-label-r').textContent = `${data.xp.toLocaleString('ru-RU')} / ${data.xpNext.toLocaleString('ru-RU')} XP`;

  renderInventory(data, 'mc-equipment', 'mc-inv-grid', 'mc-hotbar', 'mc-tooltip');
  renderResources(data.resources, 'resources-grid');
  renderAchievements(data.achievements, 'achiev-grid');
  renderHistory(data.history, 'history-list');
}

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ══════════════════════════════════════════════════════
//  INVENTORY RENDERER (real MC textures)
// ══════════════════════════════════════════════════════
function renderInventory(data, eqId, gridId, hotbarId, tooltipId) {
  const tooltip = document.getElementById(tooltipId);

  // Equipment slots
  const eqGrid = document.getElementById(eqId);
  eqGrid.innerHTML = '';
  data.equipment.forEach(item => {
    eqGrid.appendChild(makeSlot(item, tooltip, true));
  });

  // Main inventory (27 cells)
  const invGrid = document.getElementById(gridId);
  invGrid.innerHTML = '';
  const inv = (data.inventory || []).slice(0, 27);
  while (inv.length < 27) inv.push(null);
  inv.forEach(item => invGrid.appendChild(makeSlot(item, tooltip)));

  // Hotbar (9 cells)
  const hotbar = document.getElementById(hotbarId);
  hotbar.innerHTML = '';
  const hb = (data.hotbar || []).slice(0, 9);
  while (hb.length < 9) hb.push(null);
  hb.forEach((item, i) => {
    const slot = makeSlot(item, tooltip);
    if (i === 0) slot.classList.add('active-slot');
    slot.classList.add('hotbar-slot');
    hotbar.appendChild(slot);
  });
}

function makeSlot(item, tooltip, isEquip = false) {
  const slot = document.createElement('div');
  slot.className = isEquip ? 'mc-equip-slot' : 'mc-inv-slot';

  if (!item || !ITEMS[item.id]) {
    slot.classList.add('empty-slot');
    return slot;
  }

  const def = ITEMS[item.id];
  const hasEnchants = item.enchants && item.enchants.length > 0;

  // Item image
  const img = document.createElement('img');
  img.src = def.tex;
  img.alt = def.name;
  img.className = 'mc-item-img' + (hasEnchants ? ' enchanted-item' : '');
  img.draggable = false;
  img.onerror = () => { img.style.display='none'; slot.innerHTML += `<span class="item-fallback">${def.name.slice(0,2)}</span>`; };
  slot.appendChild(img);

  // Count badge
  if (item.count && item.count > 1) {
    const cnt = document.createElement('span');
    cnt.className = 'mc-item-count';
    cnt.textContent = item.count > 999 ? (Math.round(item.count/1000)+'k') : item.count;
    slot.appendChild(cnt);
  }

  // Enchant glow border
  if (hasEnchants) {
    slot.classList.add('enchanted-slot');
  }

  // Rarity border
  slot.dataset.rarity = def.rarity;

  // Tooltip
  slot.addEventListener('mousemove', (e) => showMcTooltip(e, item, def, tooltip));
  slot.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });

  return slot;
}

function showMcTooltip(e, item, def, tooltip) {
  const nameEl    = tooltip.querySelector('.mc-tooltip-name');
  const encEl     = tooltip.querySelector('.mc-tooltip-enchants');
  const metaEl    = tooltip.querySelector('.mc-tooltip-meta');

  nameEl.textContent = def.name;
  nameEl.style.color = RARITY_COLOR[def.rarity] || '#fff';

  if (item.enchants && item.enchants.length) {
    encEl.innerHTML = item.enchants.map(e => `<span class="tt-enchant">${e}</span>`).join('');
    encEl.style.display = '';
  } else {
    encEl.innerHTML = '';
    encEl.style.display = 'none';
  }

  metaEl.innerHTML = '';
  if (item.meta) { metaEl.innerHTML = `<span class="tt-meta-line">${item.meta}</span>`; }
  if (item.count > 1) { metaEl.innerHTML += `<span class="tt-count">Кол-во: ${item.count}</span>`; }

  tooltip.style.display = 'block';
  positionTooltip(e, tooltip);
}

function positionTooltip(e, tooltip) {
  const pad = 12;
  let x = e.clientX + pad;
  let y = e.clientY + pad;
  const tw = tooltip.offsetWidth || 200;
  const th = tooltip.offsetHeight || 100;
  if (x + tw > window.innerWidth - 10) x = e.clientX - tw - pad;
  if (y + th > window.innerHeight - 10) y = e.clientY - th - pad;
  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
}

// ══════════════════════════════════════════════════════
//  RESOURCES
// ══════════════════════════════════════════════════════
function renderResources(resources, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  resources.forEach(r => {
    const pct = Math.min(100, Math.round((r.count / r.max) * 100));
    const card = document.createElement('div');
    card.className = 'res-card';
    card.innerHTML = `
      <div class="res-emoji">${r.emoji}</div>
      <div class="res-name">${r.name}</div>
      <div class="res-count">${r.count.toLocaleString('ru-RU')}</div>
      <div class="res-bar"><div class="res-fill" style="width:${pct}%;background:${r.color}"></div></div>
    `;
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
//  ACHIEVEMENTS
// ══════════════════════════════════════════════════════
function renderAchievements(achivs, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  achivs.forEach(a => {
    const card = document.createElement('div');
    card.className = 'achiev-card' + (a.done ? ' done' : '') + (a.locked ? ' locked' : '');
    let inner = `<div class="achiev-icon">${a.icon}</div>
      <div class="achiev-body">
        <div class="achiev-name">${a.name}</div>
        <div class="achiev-desc">${a.desc}</div>`;
    if (a.done) {
      inner += `</div><div class="achiev-done"><i class="fas fa-check"></i></div>`;
    } else if (a.locked) {
      inner += `</div><div class="achiev-lock"><i class="fas fa-lock"></i></div>`;
    } else if (a.progress !== undefined) {
      const pct = Math.min(100, Math.round((a.progress / a.total) * 100));
      inner += `<div class="achiev-progress-bar"><div class="ap-fill" style="width:${pct}%"></div></div>
        <div class="achiev-progress-text">${a.progress.toLocaleString('ru-RU')} / ${a.total.toLocaleString('ru-RU')}</div>
      </div>`;
    } else {
      inner += '</div>';
    }
    card.innerHTML = inner;
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
//  HISTORY
// ══════════════════════════════════════════════════════
const HI_ICONS = {
  kill:    { icon: 'fas fa-skull',        cls: 'kill' },
  buy:     { icon: 'fas fa-shopping-cart',cls: 'buy' },
  sell:    { icon: 'fas fa-coins',        cls: 'sell' },
  'donate-h':{ icon: 'fas fa-gem',       cls: 'donate-h' },
  craft:   { icon: 'fas fa-tools',       cls: 'craft' },
  mine:    { icon: 'fas fa-cube',        cls: 'mine' },
};
function renderHistory(hist, listId) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = '';
  hist.forEach(h => {
    const def = HI_ICONS[h.type] || HI_ICONS.craft;
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="hi-icon ${def.cls}"><i class="${def.icon}"></i></div>
      <div class="hi-info">
        <span>${h.text}</span>
        <small>${h.time}</small>
      </div>
      <div class="hi-val ${h.pos ? 'positive' : h.pos === false ? 'negative' : ''}">${h.val}</div>
    `;
    list.appendChild(item);
  });
}

// ══════════════════════════════════════════════════════
//  PROFILE TABS
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ptab').forEach(btn => {
    btn.addEventListener('click', () => {
      // Строгая проверка доступа: вкладка «Консоль» разрешена ТОЛЬКО администраторам
      if (btn.dataset.ptab === 'console') {
        const cur = CURRENT_USER ? PLAYERS_DB[CURRENT_USER] : null;
        if (!cur || cur.isAdmin !== true) {
          showToast('Доступ запрещён: вкладка только для Администратора сервера!');
          return;
        }
      }

      document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.ptab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const c = document.getElementById('ptab-' + btn.dataset.ptab);
      if (c) c.classList.add('active');
    });
  });
});

// ══════════════════════════════════════════════════════
//  ADMIN CONSOLE
// ══════════════════════════════════════════════════════
let adminAuthed = false;
let selectedConsolePlayer = null;

function checkAdminPass() {
  const cur = CURRENT_USER ? PLAYERS_DB[CURRENT_USER] : null;
  const err = document.getElementById('admin-pass-error');
  if (!cur || cur.isAdmin !== true) {
    if (err) err.textContent = 'Доступ запрещён: у вашего аккаунта нет прав администратора';
    return;
  }

  const inp = document.getElementById('admin-pass-input');
  if (inp.value === CONFIG.ADMIN_CONSOLE_PASSWORD) {
    if (err) err.textContent = '';
    adminAuthed = true;
    document.getElementById('console-gate').classList.add('hidden');
    document.getElementById('console-ui').classList.remove('hidden');
    buildConsolePlayers();
    showToast('Консоль администратора активирована');
  } else {
    if (err) err.textContent = 'Неверный пароль администратора';
    inp.value = '';
  }
}
    err.textContent = 'Неверный пароль администратора';
    inp.value = '';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('admin-pass-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAdminPass();
  });
});

function consoleLogout() {
  adminAuthed = false;
  document.getElementById('console-gate').classList.remove('hidden');
  document.getElementById('console-ui').classList.add('hidden');
  document.getElementById('admin-pass-input').value = '';
  showToast('Консоль заблокирована');
}

function buildConsolePlayers() {
  filterConsolePlayers();
}

function filterConsolePlayers() {
  const q = (document.getElementById('console-player-search')?.value || '').toLowerCase();
  const list = document.getElementById('console-players-list');
  list.innerHTML = '';
  Object.entries(PLAYERS_DB).forEach(([nick, data]) => {
    if (q && !nick.toLowerCase().includes(q)) return;
    const row = document.createElement('div');
    row.className = 'console-player-row' + (nick === selectedConsolePlayer ? ' selected' : '');
    const isOnline = nick === CURRENT_USER || Math.random() > 0.4;
    row.innerHTML = `
      <img src="https://mc-heads.net/avatar/${nick}/24" class="cp-avatar" alt=""/>
      <div class="cp-info">
        <span class="cp-nick">${nick}</span>
        <span class="cp-rank">${data.rank}</span>
      </div>
      <span class="cp-dot ${isOnline ? 'online' : 'offline'}"></span>
    `;
    row.addEventListener('click', () => selectConsolePlayer(nick));
    list.appendChild(row);
  });
}

function selectConsolePlayer(nick) {
  selectedConsolePlayer = nick;
  filterConsolePlayers(); // re-render to highlight selected
  const data = PLAYERS_DB[nick];
  document.getElementById('console-no-player').classList.add('hidden');
  const detail = document.getElementById('console-player-detail');
  detail.classList.remove('hidden');

  document.getElementById('cpd-skin').src = `https://mc-heads.net/body/${nick}/80`;
  set('cpd-name', nick);
  const rankEl = document.getElementById('cpd-rank');
  rankEl.textContent = data.rank;
  rankEl.className = 'cpd-rank ' + (data.rankClass || '');
  document.getElementById('cpd-status').textContent = nick === CURRENT_USER ? '🟢 Онлайн' : '⚫ Оффлайн';
  set('cpd-kills',   data.kills);
  set('cpd-deaths',  data.deaths);
  set('cpd-balance', data.balance);
  set('cpd-time',    data.time);
  set('cpd-ip',      data.ip);

  // Mini inventory
  const eqEl   = document.getElementById('cpd-equipment');
  const invEl  = document.getElementById('cpd-inv');
  const ttEl   = document.getElementById('mc-tooltip-cpd');
  eqEl.innerHTML = '';
  invEl.innerHTML = '';
  data.equipment.forEach(item => eqEl.appendChild(makeSlot(item, ttEl, true)));
  const all = [...(data.hotbar||[]), ...(data.inventory||[])].slice(0, 18);
  while (all.length < 18) all.push(null);
  all.forEach(item => invEl.appendChild(makeSlot(item, ttEl)));

  // Terminal log
  addTermLine(`player ${nick} — профиль просмотрен администратором`, 'info');
}

// Console tabs
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ctab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.ctab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const c = document.getElementById('ctab-' + btn.dataset.ctab);
      if (c) c.classList.add('active');
    });
  });
});

// Terminal
const TERMINAL_COMMANDS = {
  help: () => [
    'Доступные команды:',
    '  list / players   — список игроков онлайн',
    '  kick &lt;ник&gt;      — кикнуть игрока',
    '  ban &lt;ник&gt;       — забанить игрока',
    '  mute &lt;ник&gt;      — замутить игрока',
    '  tp &lt;ник&gt;        — телепортироваться к игроку',
    '  give &lt;ник&gt; &lt;предмет&gt; — выдать предмет',
    '  op &lt;ник&gt;        — выдать права оп',
    '  clear           — очистить терминал',
    '  online          — показать онлайн',
    '  uptime          — время работы сервера',
  ],
  list: () => [`Онлайн: ${Object.keys(PLAYERS_DB).join(', ')}`],
  players: () => [`Игроков на сервере: ${Object.keys(PLAYERS_DB).length} (демо-данные)`],
  clear: () => { document.getElementById('terminal-output').innerHTML = ''; return []; },
  online: () => [`Онлайн игроков: 247 / 500`],
  uptime: () => ['Сервер работает: 14 дней 6 часов 42 минуты'],
  tps: () => ['TPS: 19.8 / 20.0 — сервер работает отлично'],
};

function handleTerminal(e) {
  if (e.key !== 'Enter') return;
  const inp = document.getElementById('terminal-input');
  const raw = inp.value.trim();
  inp.value = '';
  if (!raw) return;

  addTermLine(`$ ${raw}`, 'cmd');

  const parts = raw.toLowerCase().split(' ');
  const cmd = parts[0];
  const arg = parts.slice(1).join(' ');

  if (TERMINAL_COMMANDS[cmd]) {
    const lines = TERMINAL_COMMANDS[cmd](arg);
    lines.forEach(l => addTermLine(l, 'ok'));
  } else if (cmd === 'kick' || cmd === 'ban' || cmd === 'mute') {
    if (!arg) { addTermLine(`Использование: ${cmd} <ник>`, 'warn'); }
    else if (!PLAYERS_DB[arg]) { addTermLine(`Игрок "${arg}" не найден`, 'error'); }
    else addTermLine(`✓ Команда /${cmd} ${arg} выполнена`, 'ok');
  } else if (cmd === 'tp') {
    if (!arg) { addTermLine('Использование: tp <ник>', 'warn'); }
    else addTermLine(`✓ Телепортация к ${arg} выполнена`, 'ok');
  } else if (cmd === 'give') {
    addTermLine(`✓ Предмет выдан`, 'ok');
  } else if (cmd === 'op') {
    addTermLine(`✓ Права оператора выданы игроку ${arg}`, 'ok');
  } else {
    addTermLine(`Команда не найдена: "${cmd}". Введите help для справки.`, 'error');
  }

  const out = document.getElementById('terminal-output');
  out.scrollTop = out.scrollHeight;
}

function addTermLine(text, type = 'info') {
  const out = document.getElementById('terminal-output');
  if (!out) return;
  const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const line = document.createElement('div');
  line.className = 'term-line';
  line.innerHTML = `<span class="term-time">[${now}]</span> <span class="term-${type}">${text}</span>`;
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

function adminAction(action) {
  if (!selectedConsolePlayer) return;
  const labels = { kick: 'Кик', ban: 'Бан', mute: 'Мут', tp: 'Телепорт' };
  addTermLine(`${labels[action]} для ${selectedConsolePlayer} выполнен`, 'ok');
  showToast(`${labels[action]}: ${selectedConsolePlayer}`);
  // Switch to terminal tab to show result
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.ctab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('[data-ctab="terminal"]').classList.add('active');
  document.getElementById('ctab-terminal').classList.add('active');
}

// ══════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', initAuth);

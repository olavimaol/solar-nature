(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pad = (n) => String(n).padStart(2, '0');
  const icon = (id, cls = 'ic ic--sm') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- Content data ---------- */
  // Проекты: фото — assets/img/projects/project-N.jpg, логотип клиента — assets/img/projects/logo-N.svg.
  // Слайд 1 взят из макета, остальные — шаблонные данные для замены.
  const projects = [
    { title: 'ACWA Power Riverside', client: 'ACWA POWER', power: '285 КВт', gen: '354 МВтч', text: 'Компания Solar Nature подписала контракт на установку солнечных панелей мощностью 30 МВт, системы слежения и прокладку кабелей для проекта ACWA POWER мощностью 200 МВт в Риверсайде.' },
    { title: 'Промышленная СЭС, Ташкентская область', client: 'Клиент', power: '520 КВт', gen: '690 МВтч', text: 'Наземная станция для производственного предприятия: проектирование, поставка оборудования, монтаж и подключение к сети.' },
    { title: 'Агрокомплекс, Навоийская область', client: 'Клиент', power: '410 КВт', gen: '545 МВтч', text: 'Солнечная электростанция для тепличного хозяйства с системой мониторинга генерации в реальном времени.' },
    { title: 'Торговый центр, Самарканд', client: 'Клиент', power: '180 КВт', gen: '236 МВтч', text: 'Кровельная станция, покрывающая до 35% дневного потребления торгового центра.' },
    { title: 'Логистический комплекс, Ташкент', client: 'Клиент', power: '740 КВт', gen: '980 МВтч', text: 'Монтаж панелей на кровле складов площадью 12 000 м² без остановки работы комплекса.' },
    { title: 'Текстильная фабрика, Фергана', client: 'Клиент', power: '350 КВт', gen: '460 МВтч', text: 'Сетевая станция с системой накопления энергии для стабильной работы оборудования в пиковые часы.' },
    { title: 'Бизнес-центр, Бухара', client: 'Клиент', power: '120 КВт', gen: '158 МВтч', text: 'Фасадные и кровельные панели, интегрированные в архитектуру здания.' },
    { title: 'Частная резиденция, Ташкентская область', client: 'Клиент', power: '25 КВт', gen: '33 МВтч', text: 'Гибридная система с аккумуляторами для автономного энергоснабжения загородного дома.' },
  ];

  // Новости: первые три взяты из макета, остальные — шаблонные для замены.
  const news = [
    { date: '17 / 06 / 2026', title: 'Китайская компания «Guangdong Zomman Energy Technology Co. ltd» и ООО «Solar Nature» построят в Наманганской области солнечную электростанцию мощностью 100 мегаватт', text: 'Китайская компания Guangdong Zomman Energy Technology Co. ltd» и ООО «Solar Nature» построят в Наманганской области солнечную электростанцию мощностью 100 мегаватт.' },
    { date: '17 / 06 / 2026', title: 'Защита окружающей среды и предотвращение загрязнения воздуха - одна из миссий Solar Nature.', text: 'Защита окружающей среды и предотвращение загрязнения воздуха-одна из миссий Solar Nature. В связи с этим 25 марта-день "Часа Земли".' },
    { date: '17 / 06 / 2026', title: 'Доверие к Узбекистану - стимул для инвестиций', text: 'Во всех регионах нашей страны успешно реализуются инвестиционные проекты, продолжается приток нового капитала. Основой этого является доверие к Новому Узбекистану.' },
    { date: '02 / 06 / 2026', title: 'Solar Nature завершила монтаж кровельной станции для логистического комплекса', text: 'Объект подключён к сети и покрывает значительную часть собственного потребления склада.' },
    { date: '21 / 05 / 2026', title: 'Компания представила решения для систем накопления энергии', text: 'Гибридные системы с аккумуляторами позволяют использовать солнечную энергию и в вечерние часы.' },
    { date: '09 / 05 / 2026', title: 'Открыт региональный сервисный центр в Фергане', text: 'Центр сократит время выезда инженеров к объектам Ферганской долины.' },
  ];

  // Демо-данные: замените реальными товарами. Фото — assets/img/products/<cat>-N.png
  const longi = { title: 'LONGI LR5-72HPH 540~560M', text: 'Панели для преобразования солнечной энергии в электричество.' };
  const catalog = {
    panels: { name: 'Солнечные панели', items: Array.from({ length: 6 }, () => longi) },
    inverters: { name: 'Солнечные инверторы', items: [
      { title: 'Huawei SUN2000-100KTL-M1', text: 'Сетевой инвертор для коммерческих и промышленных станций.' },
      { title: 'Huawei SUN2000-50KTL-M3', text: 'Трёхфазный инвертор с высокой эффективностью преобразования.' },
      { title: 'Deye SUN-12K-SG04LP3', text: 'Гибридный инвертор для систем с аккумуляторами.' },
    ] },
    batteries: { name: 'Аккумуляторная батарея', items: [
      { title: 'Leadhoo 12V 200Ah', text: 'Гелевая батарея для хранения излишков электроэнергии.' },
      { title: 'Leadhoo 12V 150Ah', text: 'Аккумулятор для резервного питания и автономных систем.' },
      { title: 'Deye RW-M6.1', text: 'Литий-железо-фосфатный модуль для систем накопления.' },
    ] },
    metal: { name: 'Оцинкованный металл', items: [
      { title: 'Профиль монтажный 40×40', text: 'Оцинкованный профиль для каркасов солнечных станций.' },
      { title: 'Кронштейн кровельный', text: 'Крепление панелей к скатной кровле.' },
      { title: 'Струбцина межпанельная', text: 'Фиксация соседних панелей в ряду.' },
    ] },
  };
  // Характеристики — одинаковый демо-набор для всех товаров
  const demoSpecs = [
    ['Состав', 'Monocrystalline'], ['Эффективность', '21.3%'], ['Напряжение (Vmpp / V)', '41.80'], ['Эффективность', '21.3%'], ['Эффективность', '21.3%'],
    ['Эффективность', '21.3%'], ['Эффективность', '21.3%'], ['Эффективность', '21.3%'], ['Размеры (L x W x H)', '2278 x 1134 x 35 mm'], ['Эффективность', '21.3%'],
  ];

  // Клиенты: логотипы — assets/img/clients/<ключ>.png. Пока файла нет, в карточке выводится название.
  const clientsRow1 = [
    ['indorama', 'Indorama'], ['agmk', 'Алмалыкский ГМК'], ['enercon', 'Enercon'], ['soliq', 'Davlat Soliq Qo‘mitasi'],
    ['nemg', 'National Electric Grid of Uzbekistan'], ['het', 'Hududiy Elektr Tarmoqlari'], ['pepsi', 'Pepsi'],
    ['mudofaa', 'Mudofaa vazirligi'], ['cmec', 'CMEC'],
  ];
  const clientsRow2 = [
    ['ucell', 'Ucell'], ['uzbekneftegaz', 'Uzbekneftegaz'], ['unido', 'UNIDO'], ['tetratech', 'Tetra Tech'], ['agrobank', 'Agrobank'],
    ['artel', 'Artel'], ['kukmara', 'Kukmara'], ['korzinka', 'Korzinka'], ['gef', 'GEF'], ['nbu', 'NBU'],
  ];

  const plural = (n, [one, few, many]) => {
    const a = n % 10;
    const b = n % 100;
    if (a === 1 && b !== 11) return one;
    return a >= 2 && a <= 4 && (b < 12 || b > 14) ? few : many;
  };
  const goods = (n) => `${n} ${plural(n, ['товар', 'товара', 'товаров'])}`;

  /* ---------- Line art ----------
     Technical drawings of the four catalog sections and of the house they power. They make up the station
     scheme on the catalog page and stand in for product photos until those are added.
     All drawings share a scale and stand on the same ground line (y = 270); depth runs up and to the right. */
  const ART = (() => {
    const line = (d, cls, p) => `<path class="${cls || 'l1'}" d="${d}" pathLength="1" style="--p:${p}"/>`;
    const dot = (x, y, o, r = 3.2) => `<circle class="art__on art__dot" cx="${x}" cy="${y}" r="${r}" style="--o:${o}"/>`;
    const hit = (part, d) => `<path class="art__hit" data-part="${part}" d="${d}"/>`;
    // parts: [name, lines, markup drawn over the lines, markup drawn under them]
    const make = (name, w, cardPad, parts) => ({ h = 288, pad = cardPad } = {}) => {
      let p = 0;
      const body = parts.map(([part, lines, over = '', under = '']) =>
        `<g class="art__g art__g--${part}">${under}${lines.map(([d, cls]) => line(d, cls, p++)).join('')}${over}</g>`).join('');
      const ground = `<g class="art__g art__g--base">${line(`M${-pad} 270H${w + pad}`, 'l3', 0)}</g>`;
      return `<svg class="art art--${name} lit__obj" viewBox="${-pad} 0 ${w + pad * 2} ${h}" aria-hidden="true" focusable="false">${ground}${body}</svg>`;
    };

    const bar = (y, o) => `<rect class="art__on art__bar" x="78" y="${y}" width="104" height="18" rx="2" style="--o:${o}"/>`;
    const barLine = (y) => [`M80 ${y}h100a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H80a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2Z`, 'l2'];
    const joints = [0, 130, 260].flatMap((r, i) => [[110, 232], [136.7, 182], [163.3, 132], [190, 82]]
      .map(([x, y], k) => dot(x + r, y, (i * 4 + k) * 45))).join('');

    return {
      panels: make('panels', 480, 0, [
        ['metal', [
          ['M110 238V270'], ['M370 238V270'], ['M450 88V230'],
          ['M110 270L174 238'], ['M370 270L450 230'], ['M450 230L410 163'],
        ], dot(110, 270, 0) + dot(370, 270, 70) + dot(450, 230, 140) + dot(410, 163, 210) + hit('metal', 'M96 240H466V284H96Z')],
        ['panels', [
          ['M110 232H370L450 82H190Z'],
          ['M110 232v6H370v-6'], ['M370 238L450 88v-6'],
          ['M196.7 232L276.7 82M283.3 232L363.3 82'],
          ['M153.3 232L233.3 82M240 232L320 82M326.7 232L406.7 82', 'l2'],
          ['M130 194.5H390M150 157H410M170 119.5H430', 'l2'],
          ['M42 58a20 20 0 1 0 40 0a20 20 0 1 0-40 0'],
        ],
        '<g class="art__rays"><path class="l1" d="M92 58h10M83.2 79.2l7.1 7.1M62 88v10M40.8 79.2l-7.1 7.1M32 58H22M40.8 36.8l-7.1-7.1M62 28V18M83.2 36.8l7.1-7.1" pathLength="1" style="--p:14"/></g>'
          + '<path class="art__on art__beam" d="M104 66L208 126M96 84L191 139M84 100L162 145" style="--o:0"/>'
          + '<path class="art__glare" d="M110 232h36l80-150h-36z"/>'
          + hit('panels', 'M110 232H370L450 82H190ZM14 10H110V106H14Z'),
        '<path class="art__on art__glow" d="M110 232H370L450 82H190Z" style="--o:120"/>'],
      ]),

      metal: make('metal', 480, 0, [
        ['metal', [
          ['M190 82V230M320 82V230M450 82V230', 'l2'],
          ['M110 270L190 230M240 270L320 230M370 270L450 230', 'l2'],
          ['M190 230L150 157M320 230L280 157M450 230L410 157', 'l2'],
          ['M110 232V270'], ['M240 232V270'], ['M370 232V270'],
          ['M110 232L190 82'], ['M240 232L320 82'], ['M370 232L450 82'],
          ['M110 232H370'], ['M136.7 182H396.7'], ['M163.3 132H423.3'], ['M190 82H450'],
        ], joints + hit('metal', 'M96 70H466V284H96Z')],
      ]),

      inverters: make('inverters', 260, 46, [
        ['inverters', [
          ['M44 270V40H216V270', 'l3'],
          ['M81 96H179a6 6 0 0 1 6 6V230a6 6 0 0 1-6 6H81a6 6 0 0 1-6-6V102a6 6 0 0 1 6-6Z'],
          ['M78.3 96.6l14-7a6 6 0 0 1 2.7-.6H193a6 6 0 0 1 6 6V223a6 6 0 0 1-3.3 5.4l-14 7'],
          ['M183.2 97.8l14-7', 'l2'],
          ['M96 114h68a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H96a3 3 0 0 1-3-3v-26a3 3 0 0 1 3-3Z'],
          ['M94.5 164a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M105.5 164a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M116.5 164a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'l2'],
          ['M140 164h27', 'l2'],
          ['M93 184h74M93 194h74M93 204h74M93 214h74M93 224h74', 'l2'],
          ['M103 236v8h14v-8M143 236v8h14v-8'],
          ['M110 244V270M150 244V270'],
        ], dot(97, 164, 0, 2.5)
          + '<path class="art__on art__wave" d="M100 130c5-13 10-13 15 0s10 13 15 0 10-13 15 0 10 13 15 0" pathLength="1" style="--o:150"/>'
          + hit('inverters', 'M40 36H220V284H40Z')],
      ]),

      batteries: make('batteries', 280, 40, [
        ['batteries', [
          ['M64 120H196a4 4 0 0 1 4 4V270H60V124a4 4 0 0 1 4-4Z'],
          ['M61.5 121.2l20-10a4 4 0 0 1 1.8-.4H216a4 4 0 0 1 4 4V260l-20 10'],
          ['M198.8 121.2l20-10', 'l2'],
          ['M108 115v-9M102 106h12M172 115v-9M166 106h12'],
          ['M104 94h8M108 90v8M168 94h8', 'l2'],
          ['M78 144h104', 'l2'],
          barLine(160), barLine(186), barLine(212), barLine(238),
        ], hit('batteries', 'M50 84H230V284H50Z'),
        bar(238, 0) + bar(212, 130) + bar(186, 260) + bar(160, 390)],
      ]),

      home: make('home', 320, 20, [
        ['home', [
          ['M50 161V270M230 161V270'],
          ['M36 172L140 88L244 172'],
          ['M230 270l44-22V157'],
          ['M140 88l44-22L288 150l-44 22'],
          ['M124 270V212a3 3 0 0 1 3-3h28a3 3 0 0 1 3 3V270'],
          ['M68 196h38v34H68ZM176 196h38v34H176Z'],
          ['M87 196v34M68 213h38M195 196v34M176 213h38', 'l2'],
          ['M243 207l18-9v30l-18 9Z'],
        ], hit('home', 'M30 60H296V284H30Z'),
        '<rect class="art__on art__win" x="68" y="196" width="38" height="34" style="--o:0"/>'
          + '<rect class="art__on art__win" x="176" y="196" width="38" height="34" style="--o:120"/>'
          + '<path class="art__on art__win" d="M243 207l18-9v30l-18 9Z" style="--o:240"/>'],
      ]),
    };
  })();

  /* ---------- Header ---------- */
  const header = $('#header');
  const toTop = $('#to-top');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    toTop.classList.toggle('is-visible', y > window.innerHeight * 1.2);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' }));

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger');
  const nav = $('#nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    burger.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Dropdowns ---------- */
  const dropItems = $$('.nav__item--drop');
  // «Продукты» is a real link with a separate caret button; other items toggle from the label itself
  const toggleOf = (item) => item.querySelector('.nav__toggle') || item.querySelector('.nav__link');
  const closeDrops = (except) => dropItems.forEach((item) => {
    if (item === except) return;
    item.classList.remove('is-open');
    toggleOf(item).setAttribute('aria-expanded', 'false');
  });
  dropItems.forEach((item) => {
    const btn = toggleOf(item);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !item.classList.contains('is-open');
      closeDrops(item);
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav__item--drop')) closeDrops(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openDrop = dropItems.find((i) => i.classList.contains('is-open'));
    if (openDrop) { closeDrops(); toggleOf(openDrop).focus(); return; }
    if (nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
  });

  /* ---------- Hero slider ---------- */
  const hero = $('.hero');
  if (hero) {
    const heroSlidesEls = $$('.hero__slide');
    const HERO_DELAY = 7000;
    let heroIndex = 0;
    let heroTimer = null;
    let heroPaused = false;
    $('#hero-total').textContent = pad(heroSlidesEls.length);

    const startHeroTimer = () => {
      clearTimeout(heroTimer);
      if (reduceMotion.matches || heroPaused) return;
      heroTimer = setTimeout(() => goHero(heroIndex + 1), HERO_DELAY);
    };
    const goHero = (i) => {
      heroIndex = (i + heroSlidesEls.length) % heroSlidesEls.length;
      heroSlidesEls.forEach((s, n) => s.classList.toggle('is-active', n === heroIndex));
      $('#hero-cur').textContent = pad(heroIndex + 1);
      startHeroTimer();
    };

    $$('[data-hero]').forEach((b) => b.addEventListener('click', () => goHero(heroIndex + (b.dataset.hero === 'next' ? 1 : -1))));
    const pauseHero = (p) => { heroPaused = p; startHeroTimer(); };
    hero.addEventListener('focusin', () => pauseHero(true));
    hero.addEventListener('focusout', () => pauseHero(false));
    document.addEventListener('visibilitychange', () => pauseHero(document.hidden));
    addSwipe(hero, (dir) => goHero(heroIndex + dir));
    startHeroTimer();
  }

  /* ---------- Clients marquee ---------- */
  const renderClients = (el, list) => {
    const item = ([key, name], hidden) => `
      <li class="partner"${hidden ? ' aria-hidden="true"' : ''}>
        <img src="assets/img/clients/${key}.png" alt="${hidden ? '' : name}" onerror="this.replaceWith(Object.assign(document.createElement('span'), { className: 'partner__name', textContent: '${name.replace(/'/g, "\\'")}' }))">
      </li>`;
    // The list is duplicated so the translateX(-50%) loop is seamless.
    el.innerHTML = list.map((c) => item(c, false)).join('') + list.map((c) => item(c, true)).join('');
  };
  if ($('#partners-1')) {
    renderClients($('#partners-1'), clientsRow1);
    renderClients($('#partners-2'), clientsRow2);
  }

  /* ---------- Projects slider ---------- */
  const projTrack = $('#projects-track');
  if (projTrack) {
    projTrack.innerHTML = projects.map((p, i) => `
      <article class="pcard" aria-roledescription="slide" aria-label="${i + 1} из ${projects.length}">
        <div class="pcard__media ph"><img src="assets/img/projects/project-${i + 1}.jpg" alt="${p.title}" loading="lazy" onerror="this.remove()"></div>
        <div class="pcard__body">
          <div class="pcard__top">
            <div class="pcard__stat"><b>${p.power}</b><span>Мощность</span></div>
            <div class="pcard__stat"><b>${p.gen}</b><span>Годовая генерация</span></div>
            <span class="pcard__logo"><img src="assets/img/projects/logo-${i + 1}.svg" alt="${p.client}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'), { className: 'pcard__logo-text', textContent: this.alt }))"></span>
          </div>
          <h3 class="pcard__title">${p.title}</h3>
          <div class="pcard__row">
            <p class="pcard__text">${p.text}</p>
            <a class="pcard__btn" href="#contacts" aria-label="Подробнее о проекте: ${p.title}">${icon('i-chevron-right', 'ic ic--xs')}</a>
          </div>
        </div>
      </article>`).join('');
    $('#proj-total').textContent = pad(projects.length);
    let projIndex = 0;
    const projSlides = $$('.pcard', projTrack);
    const goProj = (i) => {
      projIndex = (i + projects.length) % projects.length;
      projTrack.style.transform = `translateX(-${projIndex * 100}%)`;
      $('#proj-cur').textContent = pad(projIndex + 1);
      projSlides.forEach((s, n) => {
        s.toggleAttribute('inert', n !== projIndex);
        s.setAttribute('aria-hidden', String(n !== projIndex));
      });
    };
    $$('[data-proj]').forEach((b) => b.addEventListener('click', () => goProj(projIndex + (b.dataset.proj === 'next' ? 1 : -1))));
    addSwipe($('.pslider__viewport'), (dir) => goProj(projIndex + dir));
    goProj(0);
  }

  /* ---------- News cards (shared by the home slider, the news page and the article page) ---------- */
  const newsCard = (n, i) => `
    <article class="ncard">
      <div class="ncard__media ph"><img src="assets/img/news/news-${(i % news.length) + 1}.jpg" alt="" loading="lazy" onerror="this.remove()"></div>
      <div class="ncard__body">
        <time class="ncard__date">${n.date}</time>
        <h3 class="ncard__title"><a href="article.html?id=${(i % news.length) + 1}">${n.title}</a></h3>
        <p class="ncard__text">${n.text}</p>
      </div>
    </article>`;

  /* ---------- News slider (home) ---------- */
  const newsTrack = $('#news-track');
  if (newsTrack) {
    newsTrack.innerHTML = news.map(newsCard).join('');
    const newsCards = $$('.ncard', newsTrack);
    let newsIndex = 0;
    const newsVisible = () => {
      const w = newsTrack.parentElement.clientWidth;
      const cw = newsCards[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(newsTrack).columnGap) || 0;
      return Math.max(1, Math.floor((w + gap + 1) / (cw + gap)));
    };
    const goNews = (i) => {
      // Loops at both ends, so the arrows are always active (as in the design)
      const max = Math.max(0, newsCards.length - newsVisible());
      newsIndex = i > max ? 0 : i < 0 ? max : i;
      const offset = newsCards[newsIndex].offsetLeft - newsCards[0].offsetLeft;
      newsTrack.style.transform = `translateX(-${offset}px)`;
      newsCards.forEach((c, n) => c.toggleAttribute('inert', n < newsIndex || n >= newsIndex + newsVisible()));
    };
    $('[data-news="prev"]').addEventListener('click', () => goNews(newsIndex - 1));
    $('[data-news="next"]').addEventListener('click', () => goNews(newsIndex + 1));
    addSwipe(newsTrack.parentElement, (dir) => goNews(newsIndex + dir));
    let resizeRaf;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => goNews(newsIndex));
    });
    goNews(0);
  }

  /* ---------- News page: grid + pagination ---------- */
  const newsGrid = $('#news-grid');
  if (newsGrid) {
    const PER_PAGE = 6;
    // Demo archive: the design shows 10 pages, so the sample news are repeated. Replace with real data / API.
    const archive = Array.from({ length: PER_PAGE * 10 }, (_, i) => news[i % news.length]);
    const pages = Math.ceil(archive.length / PER_PAGE);
    const pager = $('#news-pagination');

    const pageList = (cur) => {
      if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
      if (cur <= 3) return [1, 2, 3, '…', pages];
      if (cur >= pages - 2) return [1, '…', pages - 2, pages - 1, pages];
      return [1, '…', cur - 1, cur, cur + 1, '…', pages];
    };
    const pageLink = (p, label, aria, cls = '', disabled = false) => disabled
      ? `<span class="pager__item ${cls}" aria-disabled="true" aria-label="${aria}">${label}</span>`
      : `<a class="pager__item ${cls}" href="?page=${p}" data-page="${p}" aria-label="${aria}">${label}</a>`;

    const render = (cur) => {
      const start = (cur - 1) * PER_PAGE;
      newsGrid.innerHTML = archive.slice(start, start + PER_PAGE).map((n, i) => newsCard(n, start + i)).join('');
      const first = cur === 1;
      const last = cur === pages;
      pager.innerHTML = [
        pageLink(1, '«', 'Первая страница', 'pager__item--edge', first),
        pageLink(cur - 1, '‹', 'Предыдущая страница', 'pager__item--edge', first),
        ...pageList(cur).map((p) => p === '…'
          ? '<span class="pager__item pager__item--gap" aria-hidden="true">…</span>'
          : p === cur
            ? `<span class="pager__item is-active" aria-current="page">${p}</span>`
            : pageLink(p, p, `Страница ${p}`)),
        pageLink(cur + 1, '›', 'Следующая страница', 'pager__item--edge', last),
        pageLink(pages, '»', 'Последняя страница', 'pager__item--edge', last),
      ].join('');
    };

    const readPage = () => Math.min(Math.max(parseInt(new URLSearchParams(location.search).get('page'), 10) || 1, 1), pages);
    render(readPage());

    pager.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-page]');
      if (!link) return;
      e.preventDefault();
      const p = Number(link.dataset.page);
      history.pushState({ page: p }, '', `?page=${p}`);
      render(p);
      const y = newsGrid.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 24;
      window.scrollTo({ top: y, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
    window.addEventListener('popstate', () => render(readPage()));
  }

  /* ---------- Product card (products grid + recommendations) ---------- */
  const productHref = (p) => `product.html?cat=${p.cat}&n=${p.n}`;
  // `vt` gives the card a name for view transitions, so the same product glides to its new place when the section changes
  const productCard = (p, i = 0, vt = false) => `
    <article class="prod lit" style="--i:${Math.min(i, 9)}${vt ? `;--vt:prod-${p.cat}-${p.n}` : ''}">
      <div class="prod__media ph ph--art">${ART[p.cat]()}<img class="lit__obj" src="assets/img/products/${p.cat}-${p.n}.png" alt="${p.title}" loading="lazy" onerror="this.remove()"></div>
      <h3 class="prod__title"><a href="${productHref(p)}">${p.title}</a></h3>
      <p class="prod__text">${p.text}</p>
      <span class="prod__btn" aria-hidden="true"><span class="cbtn__text">Подробнее</span><span class="cbtn__ic">${icon('i-chevron-right', 'ic ic--xs')}</span></span>
    </article>`;

  /* ---------- Products page: sections + grid ---------- */
  const productsGrid = $('#products-grid');
  if (productsGrid) {
    const allItems = Object.entries(catalog).flatMap(([cat, c]) => c.items.map((it, i) => ({ ...it, cat, n: i + 1 })));
    const crumb = $('#crumb-current');
    const side = $('.pside');
    const sideList = $('ul', side);
    const nameEl = $('#products-current');
    const countEl = $('#products-count');
    const markEl = $('#products-mark');
    const marks = { all: 'Solar', panels: 'Панели', inverters: 'Инверторы', batteries: 'Батареи', metal: 'Металл' };
    const itemsOf = (key) => (key === 'all' ? allItems : catalog[key].items.map((it, i) => ({ ...it, cat: key, n: i + 1 })));

    // One highlight bar that slides to the chosen section
    const glider = document.createElement('li');
    glider.className = 'pside__glider';
    glider.setAttribute('aria-hidden', 'true');
    sideList.prepend(glider);
    side.classList.add('pside--glide');
    const moveGlider = (instant = false) => {
      const active = $('.pside__link.is-active', side);
      if (!active) return;
      const li = active.parentElement;
      if (instant) glider.style.transition = 'none';
      glider.style.transform = `translate(${li.offsetLeft}px, ${li.offsetTop}px)`;
      glider.style.width = `${li.offsetWidth}px`;
      glider.style.height = `${li.offsetHeight}px`;
      if (instant) { void glider.offsetWidth; glider.style.transition = ''; }
    };

    const swapText = (el, text) => {
      if (!el || el.textContent === text) return;
      el.classList.remove('is-swap');
      el.textContent = text;
      void el.offsetWidth; // restart the animation
      el.classList.add('is-swap');
    };

    const paint = (key, first) => {
      const list = itemsOf(key);
      productsGrid.classList.toggle('is-first', first);
      productsGrid.innerHTML = list.map((p, i) => productCard(p, i, true)).join('');
      $$('.pside__link', side).forEach((a) => {
        const on = a.dataset.cat === key;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      moveGlider(first);
      // On narrow screens the sidebar is a horizontal strip — keep the active section in view
      const active = $('.pside__link.is-active', side);
      if (side.scrollWidth > side.clientWidth && active) {
        side.scrollTo({ left: active.parentElement.offsetLeft - 11, behavior: first || reduceMotion.matches ? 'auto' : 'smooth' });
      }
      const name = key === 'all' ? 'Вся продукция' : catalog[key].name;
      crumb.textContent = name;
      if (first) {
        nameEl.textContent = name;
        countEl.textContent = goods(list.length);
        markEl.textContent = marks[key];
      } else {
        swapText(nameEl, name);
        swapText(countEl, goods(list.length));
        swapText(markEl, marks[key]);
      }
      document.title = `${key === 'all' ? 'Продукция' : name} — Solar Nature`;
    };

    // The sidebar follows the scroll, so a section can be switched from the middle of a long list — return to its top
    const layout = $('.products__layout');
    const toListTop = () => {
      const stick = parseFloat(getComputedStyle(side).top) || 0;
      const top = layout.getBoundingClientRect().top;
      if (stick && top < stick) window.scrollTo({ top: window.scrollY + top - stick, behavior: 'instant' });
    };

    let switching = 0;
    const renderProducts = (cat, { first = false, keepScroll = false } = {}) => {
      const key = catalog[cat] ? cat : 'all';
      const update = () => {
        paint(key, first);
        if (!first && !keepScroll) toListTop();
      };
      if (first || reduceMotion.matches) { update(); return; }
      if (document.startViewTransition) {
        // Cards that stay glide to their new places, the rest fade — see ::view-transition rules in the stylesheet
        const root = document.documentElement;
        switching += 1;
        root.classList.add('is-switching');
        const transition = document.startViewTransition(update);
        // A skipped transition (hidden tab, a quick second click) still updates the page — there is nothing to report
        transition.ready.catch(() => {});
        transition.finished.finally(() => {
          switching -= 1;
          if (!switching) root.classList.remove('is-switching');
        });
        return;
      }
      productsGrid.classList.add('is-fading');
      setTimeout(() => {
        update();
        productsGrid.classList.remove('is-fading');
      }, 180);
    };

    const readCat = () => new URLSearchParams(location.search).get('cat') || 'all';
    renderProducts(readCat(), { first: true });
    side.addEventListener('click', (e) => {
      const link = e.target.closest('.pside__link');
      if (!link) return;
      e.preventDefault();
      if (link.classList.contains('is-active')) return;
      history.pushState({}, '', `?cat=${link.dataset.cat}`);
      renderProducts(link.dataset.cat);
    });
    // While the pictures of a transition are on screen, clicks land on the root element — find the section by the point
    document.documentElement.addEventListener('click', (e) => {
      if (!switching || e.target !== document.documentElement) return;
      const link = $$('.pside__link', side).find((a) => {
        const box = a.getBoundingClientRect();
        return e.clientX >= box.left && e.clientX <= box.right && e.clientY >= box.top && e.clientY <= box.bottom;
      });
      if (link) link.click();
    });
    // The browser restores the scroll position of a history entry itself
    window.addEventListener('popstate', () => renderProducts(readCat(), { keepScroll: true }));
    let gliderRaf;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(gliderRaf);
      gliderRaf = requestAnimationFrame(() => moveGlider(true));
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveGlider(true));
  }

  /* ---------- Catalog page: section sizes and drawings ---------- */
  $$('[data-cat-count]').forEach((el) => {
    const section = catalog[el.dataset.catCount];
    if (section) el.textContent = goods(section.items.length);
  });
  $$('[data-art-fallback]').forEach((box) => {
    const draw = ART[box.dataset.artFallback];
    if (draw) box.insertAdjacentHTML('afterbegin', draw());
  });

  /* ---------- Catalog page: station scheme ---------- */
  const flow = $('[data-flow]');
  if (flow) {
    $$('[data-art]', flow).forEach((box) => { box.innerHTML = ART[box.dataset.art]({ h: 330, pad: 0 }); });
    const flowItems = $$('.flow__item', flow);
    let liveTimer = null;
    // The current runs while the scheme is being explored, and in a short burst when a part switches on:
    // what starts by itself is over within five seconds
    const setLive = (on, offAfter = 0) => {
      clearTimeout(liveTimer);
      if (reduceMotion.matches) return;
      if (on) flow.classList.add('is-live');
      if (!on || offAfter) liveTimer = setTimeout(() => flow.classList.remove('is-live'), on ? offAfter : 1200);
    };

    if ('IntersectionObserver' in window && !reduceMotion.matches) {
      const wide = window.matchMedia('(min-width: 901px)');
      const stageIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          stageIo.disconnect();
          flow.classList.add('is-on');
          // On a wide screen the whole drawing switches on at once; on a narrow one — part by part, as they scroll in
          if (!wide.matches) return;
          flowItems.forEach((item) => item.classList.add('is-on'));
          setTimeout(() => setLive(true, 1700), 3000);
        });
      }, { threshold: 0.3 });
      stageIo.observe(flow);
      const itemIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-on');
          itemIo.unobserve(entry.target);
          if (!wide.matches) setTimeout(() => setLive(true, 3000), 1000);
        });
      }, { threshold: 0.45 });
      flowItems.forEach((item) => itemIo.observe(item));
    } else {
      flow.classList.add('is-on');
      flowItems.forEach((item) => item.classList.add('is-on'));
    }

    const setActive = (part) => {
      if (part) flow.dataset.active = part; else delete flow.dataset.active;
    };
    flow.addEventListener('pointerover', (e) => {
      if (e.pointerType === 'touch') return;
      const target = e.target.closest('[data-part]');
      if (!target) return;
      setActive(target.dataset.part);
      setLive(true);
    });
    flow.addEventListener('pointerleave', () => { setActive(null); setLive(false); });
    flow.addEventListener('focusin', (e) => {
      const target = e.target.closest('[data-part]');
      if (target) { setActive(target.dataset.part); setLive(true); }
    });
    flow.addEventListener('focusout', () => { setActive(null); setLive(false); });
    // A click on a part of the drawing works as a click on its caption
    flow.addEventListener('click', (e) => {
      const area = e.target.closest('.art__hit');
      if (!area) return;
      const link = $(`a[data-part="${area.dataset.part}"]`, flow);
      if (link) link.click();
    });
  }

  /* ---------- Pointer light: cards react to the pointer as to the sun ---------- */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const trackLight = (root) => {
    if (!root) return;
    let raf = 0;
    let card = null;
    let point = null;
    const reset = (el) => ['--mx', '--my', '--lx', '--ly'].forEach((name) => el.style.removeProperty(name));
    const apply = () => {
      raf = 0;
      if (!card || !point) return;
      const box = card.getBoundingClientRect();
      const x = Math.min(Math.max((point.x - box.left) / box.width, 0), 1);
      const y = Math.min(Math.max((point.y - box.top) / box.height, 0), 1);
      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      card.style.setProperty('--lx', (x * 2 - 1).toFixed(3));
      card.style.setProperty('--ly', (y * 2 - 1).toFixed(3));
    };
    root.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' || !finePointer.matches || reduceMotion.matches) return;
      const next = e.target.closest('.lit');
      if (next !== card) {
        if (card) reset(card);
        card = next;
      }
      if (!card) return;
      point = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    });
    root.addEventListener('pointerleave', () => {
      if (card) reset(card);
      card = null;
    });
  };
  ['.catalog__grid', '#products-grid', '#product-related'].forEach((sel) => trackLight($(sel)));

  /* ---------- Solution page (one template for all solutions) ---------- */
  const solutionPage = $('#solution');
  if (solutionPage) {
    // Тексты решений. Картинки: assets/img/solutions/<ключ>-hero.jpg, -about-1.jpg, -about-2.jpg
    const solutions = {
      legal: { name: 'Для юридических лиц', heroEyebrow: 'Решения для бизнеса', heroTitle: 'Солнечные станции <br>для бизнеса', heroLead: 'Сократите операционные расходы на электроэнергию и обеспечьте стабильное энергоснабжение предприятия.', aboutEyebrow: 'Энергия солнца для вашего бизнеса', aboutTitle1: 'Снижайте затраты на энергию', aboutTitle2: 'и повышайте устойчивость бизнеса', benEyebrow: 'Почему компании выбирают Solar Nature' },
      individual: { name: 'Для физических лиц', heroEyebrow: 'Решения для дома', heroTitle: 'Солнечные панели <br>для вашего дома', heroLead: 'Снижайте расходы на электроэнергию, обеспечьте независимость от перебоев в сети и используйте энергию солнца для комфортной жизни.', aboutEyebrow: 'Энергия солнца для вашего дома', aboutTitle1: 'Экономьте на электроэнергии', aboutTitle2: 'и повышайте комфорт жизни', benEyebrow: 'Почему владельцы домов выбирают Solar Nature' },
      rooftop: { name: 'Крышные солнечные станции', heroEyebrow: 'Крышные станции', heroTitle: 'Солнечные станции <br>на крыше', heroLead: 'Используйте площадь кровли для выработки собственной электроэнергии без занятия свободной земли.', aboutEyebrow: 'Энергия солнца на вашей кровле', aboutTitle1: 'Превратите крышу', aboutTitle2: 'в источник энергии', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
      ground: { name: 'Наземные солнечные станции', heroEyebrow: 'Наземные станции', heroTitle: 'Наземные солнечные <br>электростанции', heroLead: 'Промышленная генерация на свободных участках земли с максимальной выработкой и удобным обслуживанием.', aboutEyebrow: 'Энергия солнца в промышленном масштабе', aboutTitle1: 'Масштабируйте генерацию', aboutTitle2: 'под задачи объекта', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
      bess: { name: 'Системы накопления энергии BESS', heroEyebrow: 'Системы накопления', heroTitle: 'Системы накопления <br>энергии BESS', heroLead: 'Храните излишки солнечной энергии и используйте их в пиковые часы и при отключениях сети.', aboutEyebrow: 'Энергия солнца в любое время суток', aboutTitle1: 'Накапливайте энергию', aboutTitle2: 'и используйте ее, когда нужно', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
      ppa: { name: 'PPA-решения для BESS', heroEyebrow: 'PPA-решения', heroTitle: 'PPA-решения <br>для BESS', heroLead: 'Получите систему накопления энергии без капитальных вложений и оплачивайте только полученную энергию.', aboutEyebrow: 'Энергия без капитальных затрат', aboutTitle1: 'Запускайте проекты', aboutTitle2: 'без стартовых инвестиций', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
      diesel: { name: 'Контроллеры дизель-генераторов', heroEyebrow: 'Гибридные системы', heroTitle: 'Контроллеры <br>дизель-генераторов', heroLead: 'Объедините солнечную станцию и дизель-генератор, чтобы сократить расход топлива и затраты на обслуживание.', aboutEyebrow: 'Солнце и дизель в одной системе', aboutTitle1: 'Сокращайте расход топлива', aboutTitle2: 'без потери надежности', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
      lightning: { name: 'Молниезащита', heroEyebrow: 'Безопасность', heroTitle: 'Молниезащита <br>солнечных станций', heroLead: 'Защитите оборудование и объект от ударов молнии и импульсных перенапряжений.', aboutEyebrow: 'Надежная защита станции', aboutTitle1: 'Защищайте оборудование', aboutTitle2: 'и продлевайте срок службы', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
      feasibility: { name: 'Оценка реализуемости проекта', heroEyebrow: 'Консалтинг', heroTitle: 'Оценка реализуемости <br>проекта', heroLead: 'Проверим техническую и экономическую целесообразность станции до начала инвестиций.', aboutEyebrow: 'Решения на основе расчетов', aboutTitle1: 'Принимайте решения', aboutTitle2: 'на основе точных данных', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
    };
    const key = solutions[new URLSearchParams(location.search).get('s')] ? new URLSearchParams(location.search).get('s') : 'individual';
    const sol = solutions[key];
    $$('[data-sol]').forEach((el) => { if (sol[el.dataset.sol]) el.textContent = sol[el.dataset.sol]; });
    $$('[data-sol-html]').forEach((el) => { if (sol[el.dataset.solHtml]) el.innerHTML = sol[el.dataset.solHtml]; });
    $$('[data-sol-img]').forEach((img) => { img.src = `assets/img/solutions/${key}-${img.dataset.solImg}.jpg`; });
    document.title = `${sol.name} — Solar Nature`;
    $$(`.drop a[href="solution.html?s=${key}"]`).forEach((a) => a.setAttribute('aria-current', 'page'));
  }

  /* ---------- Service page (one template for all services) ---------- */
  const servicePage = $('#service');
  if (servicePage) {
    // Тексты сервисов. Картинки: assets/img/services/<ключ>-hero.jpg, -about-1.jpg, -about-2.jpg, -wide.jpg
    const services = {
      operation: { name: 'Эксплуатация и техническое обслуживание', heroEyebrow: 'Сервисное обслуживание', heroTitle: 'Эксплуатация и <br>техническое обслуживание <br>солнечных электростанций', heroLead: 'Обеспечиваем стабильную и эффективную работу солнечных электростанций благодаря регулярному техническому обслуживанию, диагностике и оперативному устранению неисправностей.', aboutEyebrow: 'Профессиональное обслуживание солнечных электростанций', aboutTitle: 'Обеспечиваем максимальную <br>эффективность работы <br>оборудования' },
      assets: { name: 'Управление энергетическими активами', heroEyebrow: 'Управление активами', heroTitle: 'Управление <br>энергетическими активами', heroLead: 'Берем на себя управление солнечными станциями: контроль доходности, отчетность, планирование ремонтов и работу с подрядчиками.', aboutEyebrow: 'Профессиональное управление энергетическими объектами', aboutTitle: 'Повышаем доходность <br>и прозрачность <br>энергетических активов' },
      audit: { name: 'Энергоаудит', heroEyebrow: 'Энергоаудит', heroTitle: 'Энергоаудит <br>предприятий и объектов', heroLead: 'Анализируем энергопотребление объекта, находим потери и рассчитываем экономический эффект от перехода на солнечную энергию.', aboutEyebrow: 'Точная оценка энергопотребления', aboutTitle: 'Находим резервы <br>для снижения затрат <br>на энергию' },
      training: { name: 'Обучение и тренинги', heroEyebrow: 'Обучение', heroTitle: 'Обучение <br>и тренинги для персонала', heroLead: 'Проводим практическое обучение специалистов по эксплуатации, безопасности и обслуживанию солнечных электростанций.', aboutEyebrow: 'Практические знания от инженеров Solar Nature', aboutTitle: 'Готовим команду <br>к надежной эксплуатации <br>станции' },
      monitoring: { name: 'Мониторинг', heroEyebrow: 'Мониторинг', heroTitle: 'Мониторинг <br>солнечных электростанций', heroLead: 'Контролируем выработку и состояние оборудования в режиме реального времени и оперативно реагируем на отклонения.', aboutEyebrow: 'Контроль работы станции 24/7', aboutTitle: 'Видим каждое отклонение <br>до того, как оно <br>станет проблемой' },
      scada: { name: 'SCADA-системы', heroEyebrow: 'Автоматизация', heroTitle: 'SCADA-системы <br>для энергетических объектов', heroLead: 'Внедряем системы диспетчеризации и управления, которые объединяют данные всех элементов станции в одном интерфейсе.', aboutEyebrow: 'Единая система управления объектом', aboutTitle: 'Управляем станцией <br>из одного <br>интерфейса' },
      digital: { name: 'Цифровизация энергетики', heroEyebrow: 'Цифровизация', heroTitle: 'Цифровизация <br>энергетики', heroLead: 'Переводим учет, аналитику и обслуживание энергетических объектов в цифровой формат для точных и быстрых решений.', aboutEyebrow: 'Данные как основа эффективности', aboutTitle: 'Принимаем решения <br>на основе <br>точных данных' },
      design: { name: 'Проектирование солнечных электростанций', heroEyebrow: 'Проектирование', heroTitle: 'Проектирование <br>солнечных электростанций', heroLead: 'Разрабатываем проекты станций любой мощности с расчетом выработки, окупаемости и полным комплектом документации.', aboutEyebrow: 'Инженерный подход к каждому проекту', aboutTitle: 'Проектируем станции <br>с максимальной <br>выработкой' },
      grid: { name: 'Документация для подключения к электросети', heroEyebrow: 'Документация', heroTitle: 'Документация <br>для подключения <br>к электросети', heroLead: 'Готовим и согласовываем полный пакет документов для подключения солнечной станции к электрическим сетям.', aboutEyebrow: 'Согласования без лишних задержек', aboutTitle: 'Берем на себя <br>все согласования <br>с сетевыми компаниями' },
    };
    const sp = new URLSearchParams(location.search).get('s');
    const key = services[sp] ? sp : 'operation';
    const srv = services[key];
    $$('[data-srv]').forEach((el) => { if (srv[el.dataset.srv]) el.textContent = srv[el.dataset.srv]; });
    $$('[data-srv-html]').forEach((el) => { if (srv[el.dataset.srvHtml]) el.innerHTML = srv[el.dataset.srvHtml]; });
    $$('[data-srv-img]').forEach((img) => { img.src = `assets/img/services/${key}-${img.dataset.srvImg}.jpg`; });
    document.title = `${srv.name} — Solar Nature`;
    $$(`.drop a[href="service.html?s=${key}"]`).forEach((a) => a.setAttribute('aria-current', 'page'));
  }

  /* ---------- Article page ---------- */
  const article = $('#article');
  if (article) {
    const id = Math.min(Math.max(parseInt(new URLSearchParams(location.search).get('id'), 10) || 1, 1), news.length);
    const item = news[id - 1];
    $$('[data-article-title]').forEach((el) => { el.textContent = item.title.replace(/\.$/, ''); });
    // Breadcrumb: shorten long titles at a word boundary («Китайская компания «Guangdong Zomman...»)
    const crumb = $('[data-article-crumb]');
    if (crumb) {
      const full = item.title.replace(/\.$/, '');
      const MAX = 40;
      const short = full.length <= MAX ? full : `${full.slice(0, full.lastIndexOf(' ', MAX)).replace(/[\s,.;:–-]+$/, '')}...`;
      crumb.textContent = short;
      crumb.title = full;
    }
    $('[data-article-date]').textContent = item.date;
    $('[data-article-cover]', article)?.setAttribute('src', `assets/img/news/news-${id}.jpg`);
    document.title = `${item.title.replace(/\.$/, '')} — Solar Nature`;
    // Sidebar: 5 other news (the demo list repeats to fill the column like the design)
    const others = news.map((n, i) => ({ n, i })).filter(({ i }) => i !== id - 1);
    $('#article-related').innerHTML = Array.from({ length: 5 }, (_, k) => {
      const { n, i } = others[k % others.length];
      return newsCard(n, i);
    }).join('');
  }

  /* ---------- Product page ---------- */
  const productPage = $('#product');
  if (productPage) {
    const params = new URLSearchParams(location.search);
    const cat = catalog[params.get('cat')] ? params.get('cat') : 'panels';
    const items = catalog[cat].items;
    const n = Math.min(Math.max(parseInt(params.get('n'), 10) || 1, 1), items.length);
    const product = { ...items[n - 1], cat, n };

    // Fill product data (the HTML already contains the design sample as a no-JS fallback)
    $$('[data-product-title]').forEach((el) => { el.textContent = product.title; });
    $$('[data-product-cat]').forEach((el) => { el.textContent = catalog[cat].name; });
    $$('[data-product-cat-link]').forEach((el) => { el.href = `products.html?cat=${cat}`; });
    const order = $('[data-product-order]');
    order.dataset.modalSubject = `Модель: ${product.title}`;
    document.title = `${product.title} — Solar Nature`;

    // Gallery
    const slides = $$('.gallery__slide', productPage);
    const thumbs = $$('.gallery__thumb', productPage);
    slides.forEach((s, i) => { const img = $('img', s); if (img) img.src = `assets/img/products/${cat}-${n}${i ? `-${i + 1}` : ''}.png`; });
    thumbs.forEach((t, i) => { const img = $('img', t); if (img) img.src = `assets/img/products/${cat}-${n}${i ? `-${i + 1}` : ''}.png`; });
    let slide = 0;
    const goSlide = (i) => {
      slide = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === slide));
      thumbs.forEach((t, k) => { t.classList.toggle('is-active', k === slide); t.setAttribute('aria-pressed', String(k === slide)); });
    };
    $$('[data-gallery]', productPage).forEach((b) => b.addEventListener('click', () => goSlide(slide + (b.dataset.gallery === 'next' ? 1 : -1))));
    thumbs.forEach((t, k) => t.addEventListener('click', () => goSlide(k)));
    addSwipe($('.gallery__main', productPage), (dir) => goSlide(slide + dir));

    // Tabs
    const tabs = $$('[role="tab"]', productPage);
    const selectTab = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !on;
        if (on) { panel.classList.remove('is-shown'); requestAnimationFrame(() => panel.classList.add('is-shown')); }
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => selectTab(t));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        next.focus();
        selectTab(next);
      });
    });

    // Specs table (two columns, filled top-to-bottom)
    const specs = $('#product-specs');
    specs.style.setProperty('--rows', Math.ceil(demoSpecs.length / 2));
    specs.innerHTML = demoSpecs.map(([k, v]) => `<div class="specs__row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

    // Recommendations: 7 cards from the same section (cycled for the demo)
    $('#product-related').innerHTML = Array.from({ length: 7 }, (_, i) => {
      const k = (n + i) % items.length;
      return productCard({ ...items[k], cat, n: k + 1 }, i);
    }).join('');
  }

  /* ---------- Reveal + counters ---------- */
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion.matches) { el.textContent = target; return; }
    const from = el.hasAttribute('data-plain') ? Math.round(target * 0.97) : 0;
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t) => {
      // rAF timestamps can predate t0 on the first frame — clamp to avoid negative values
      const p = Math.min(Math.max((t - t0) / dur, 0), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(from + (target - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach((el) => cio.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Forms ---------- */
  const PHONE_RE = /^\+?[\d\s()-]{9,18}$/;
  const validateField = (input) => {
    const field = input.closest('.field');
    if (!field) return true;
    const err = field.querySelector('.field__error');
    const v = input.value.trim();
    let msg = '';
    if (input.required && !v) msg = input.type === 'tel' ? 'Укажите номер телефона' : 'Укажите ваше имя';
    else if (input.type === 'tel' && v && !PHONE_RE.test(v)) msg = 'Номер в формате +998 90 123-45-67';
    field.classList.toggle('has-error', Boolean(msg));
    err.textContent = msg;
    if (msg) {
      if (!err.id) err.id = `${input.id}-err`;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
    } else {
      input.removeAttribute('aria-invalid');
    }
    return !msg;
  };

  $$('.js-form').forEach((form) => {
    const inputs = $$('input:not([type="hidden"]), textarea', form);
    const status = $('.form-status', form);
    const submit = $('[type="submit"]', form);
    const label = $('.btn__label', submit);

    inputs.forEach((input) => {
      input.addEventListener('blur', () => { if (input.value || input.closest('.has-error')) validateField(input); });
      input.addEventListener('input', () => { if (input.closest('.has-error')) validateField(input); });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = inputs.filter((i) => !validateField(i));
      if (invalid.length) { invalid[0].focus(); status.textContent = ''; return; }

      submit.setAttribute('aria-busy', 'true');
      label.textContent = 'Отправка…';
      status.textContent = '';

      // TODO: replace with a real endpoint, e.g. fetch('/api/lead', { method: 'POST', body: new FormData(form) })
      await new Promise((r) => setTimeout(r, 900));

      submit.removeAttribute('aria-busy');
      label.textContent = 'Отправить';
      form.reset();
      status.innerHTML = `${icon('i-check')} Спасибо! Мы свяжемся с вами в течение рабочего дня.`;
      setTimeout(() => { status.textContent = ''; }, 6000);
    });
  });

  /* ---------- Lead modal ---------- */
  const modal = $('#lead-modal');
  if (modal && typeof modal.showModal === 'function') {
    const subject = $('#lead-modal-subject', modal);
    const subjectInput = $('input[name="subject"]', modal);
    const CLOSE_MS = 220;
    let closeTimer = null;

    const openModal = (text) => {
      clearTimeout(closeTimer);
      if (text) { subject.textContent = text; subjectInput.value = text; }
      $('.lead-modal__status', modal).textContent = '';
      if (!modal.open) modal.showModal();
      document.body.classList.add('is-locked');
      requestAnimationFrame(() => modal.classList.add('is-open'));
      setTimeout(() => $('input:not([type="hidden"])', modal).focus({ preventScroll: true }), 60);
    };
    const closeModal = () => {
      modal.classList.remove('is-open');
      closeTimer = setTimeout(() => {
        modal.close();
        document.body.classList.remove('is-locked');
      }, reduceMotion.matches ? 0 : CLOSE_MS);
    };

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal="lead"]');
      if (!trigger) return;
      e.preventDefault();
      setMenu(false);
      openModal(trigger.dataset.modalSubject);
    });
    $$('[data-modal-close]', modal).forEach((b) => b.addEventListener('click', closeModal));
    // Click on the backdrop (outside the box) closes the modal
    modal.addEventListener('click', (e) => {
      if (e.target !== modal) return;
      const r = modal.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) closeModal();
    });
    // Esc: animate out instead of the instant native close
    modal.addEventListener('cancel', (e) => { e.preventDefault(); closeModal(); });
    // After a successful submit, close shortly after the thank-you message appears
    new MutationObserver(() => {
      if ($('.lead-modal__status', modal).textContent.trim()) setTimeout(closeModal, 2200);
    }).observe($('.lead-modal__status', modal), { childList: true });
  }

  /* ---------- Misc ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Helpers ---------- */
  function addSwipe(el, cb) {
    let x0 = null;
    let y0 = null;
    el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) cb(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }
})();

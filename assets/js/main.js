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
  // Проекты: пока у всех одно фото и один логотип — assets/img/projects/project.webp и logo.png.
  // Своё фото или логотип проекта можно задать полями photo и logo.
  // Слайд 1 взят из макета, остальные — шаблонные данные для замены.
  // Для страницы проектов: kw — мощность числом (по ней работает фильтр), type — industrial или commercial,
  // at — долгота и широта объекта для карты, demo — временное фото, пока у проекта нет своего (photo).
  const projects = [
    { kw: 285, type: 'industrial', at: [69.78, 41.2], demo: 'assets/img/projects/project.webp', title: 'ACWA Power Riverside', client: 'ACWA POWER', power: '285 КВт', gen: '354 МВтч', text: 'Компания Solar Nature подписала контракт на установку солнечных панелей мощностью 30 МВт, системы слежения и прокладку кабелей для проекта ACWA POWER мощностью 200 МВт в Риверсайде.' },
    { kw: 520, type: 'industrial', at: [69.23, 40.24], demo: 'assets/img/solutions/ground-hero.jpg', title: 'Промышленная СЭС, Ташкентская область', client: 'Клиент', power: '520 КВт', gen: '690 МВтч', text: 'Наземная станция для производственного предприятия: проектирование, поставка оборудования, монтаж и подключение к сети.' },
    { kw: 410, type: 'industrial', at: [65.38, 40.1], demo: 'assets/img/solutions/legal-about-1.jpg', title: 'Агрокомплекс, Навоийская область', client: 'Клиент', power: '410 КВт', gen: '545 МВтч', text: 'Солнечная электростанция для тепличного хозяйства с системой мониторинга генерации в реальном времени.' },
    { kw: 180, type: 'commercial', at: [66.96, 39.65], demo: 'assets/img/solutions/feasibility-hero.jpg', title: 'Торговый центр, Самарканд', client: 'Клиент', power: '180 КВт', gen: '236 МВтч', text: 'Кровельная станция, покрывающая до 35% дневного потребления торгового центра.' },
    { kw: 740, type: 'commercial', at: [69.2, 41.36], demo: 'assets/img/services/assets-about-1.jpg', title: 'Логистический комплекс, Ташкент', client: 'Клиент', power: '740 КВт', gen: '980 МВтч', text: 'Монтаж панелей на кровле складов площадью 12 000 м² без остановки работы комплекса.' },
    { kw: 350, type: 'industrial', at: [71.78, 40.38], demo: 'assets/img/solutions/bess-about-1.jpg', title: 'Текстильная фабрика, Фергана', client: 'Клиент', power: '350 КВт', gen: '460 МВтч', text: 'Сетевая станция с системой накопления энергии для стабильной работы оборудования в пиковые часы.' },
    { kw: 120, type: 'commercial', at: [64.42, 39.77], demo: 'assets/img/solutions/diesel-hero.jpg', title: 'Бизнес-центр, Бухара', client: 'Клиент', power: '120 КВт', gen: '158 МВтч', text: 'Фасадные и кровельные панели, интегрированные в архитектуру здания.' },
    { kw: 60, type: 'commercial', at: [60.36, 41.38], demo: 'assets/img/solutions/ppa-hero.jpg', title: 'Гостиница, Хива', client: 'Клиент', power: '60 КВт', gen: '79 МВтч', text: 'Гибридная станция с аккумуляторами: гостиница работает без перебоев при отключениях сети.' },
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

  // Вакансии: демо-данные для замены. Страница вакансии — vacancy.html?id=<id>.
  // Закрытую вакансию достаточно убрать из списка: по её старой ссылке откроется сообщение «вакансия закрыта».
  const depts = { engineering: 'Инженерия', build: 'Монтаж и сервис', sales: 'Продажи', projects: 'Управление проектами' };
  // «Что мы предлагаем» — общий список для всех вакансий; свой можно задать полем offer
  const vacancyOffer = [
    'Официальное трудоустройство с первого рабочего дня',
    'Проекты разного масштаба: от частных домов до промышленных станций',
    'Обучение у инженеров компании и производителей оборудования',
    'Понятные задачи и прямой контакт с руководителем направления',
  ];
  const vacancies = [
    {
      id: 'pv-design-engineer', title: 'Инженер-проектировщик солнечных электростанций', dept: 'engineering', city: 'Ташкент', type: 'Полная занятость', exp: 'От 3 лет',
      lead: 'Вы будете проектировать электрическую часть крышных и наземных солнечных станций: от обследования объекта до рабочей документации и сопровождения монтажа.',
      duties: ['Разрабатывать проектную и рабочую документацию солнечных станций', 'Подбирать панели, инверторы и кабели, рассчитывать выработку станции', 'Готовить однолинейные схемы и планы размещения оборудования', 'Согласовывать технические решения с заказчиком и сетевой компанией', 'Сопровождать монтаж и вносить изменения в проект'],
      reqs: ['Высшее образование в области электроэнергетики или электроснабжения', 'Опыт проектирования электроустановок или солнечных станций от 3 лет', 'Уверенная работа в AutoCAD, знание PVsyst будет преимуществом', 'Знание ПУЭ и требований к подключению генерации к сети'],
    },
    {
      id: 'scada-engineer', title: 'Инженер SCADA и систем мониторинга', dept: 'engineering', city: 'Ташкент', type: 'Полная занятость', exp: 'От 2 лет',
      lead: 'Вы будете внедрять системы диспетчеризации и мониторинга на станциях компании и следить, чтобы данные о выработке приходили без пропусков.',
      duties: ['Настраивать сбор данных с инверторов, счётчиков и метеостанций', 'Разрабатывать мнемосхемы и отчёты в SCADA-системах', 'Подключать объекты к системе мониторинга и проверять качество данных', 'Разбирать аварийные сигналы вместе с сервисной службой'],
      reqs: ['Техническое образование в области автоматизации или электроэнергетики', 'Опыт работы со SCADA-системами и протоколами Modbus, IEC 60870-5-104', 'Понимание устройства сетей передачи данных', 'Технический английский для работы с документацией'],
    },
    {
      id: 'pv-installer', title: 'Монтажник солнечных электростанций', dept: 'build', city: 'Ташкент и регионы', type: 'Полная, с выездами', exp: 'От 1 года',
      lead: 'Вы будете собирать станции на кровлях и на земле: монтировать конструкции, устанавливать панели и прокладывать кабельные линии.',
      duties: ['Монтировать опорные конструкции и крепления на кровле и на грунте', 'Устанавливать и подключать солнечные панели и инверторы', 'Прокладывать кабельные трассы и собирать щиты постоянного тока', 'Соблюдать требования охраны труда при работе на высоте'],
      reqs: ['Опыт электромонтажных или строительно-монтажных работ от 1 года', 'Умение читать монтажные схемы', 'Группа по электробезопасности не ниже III', 'Готовность к выездам на объекты в регионах'],
    },
    {
      id: 'service-engineer', title: 'Инженер по эксплуатации и сервису', dept: 'build', city: 'Ташкент', type: 'Полная, с выездами', exp: 'От 2 лет',
      lead: 'Вы будете отвечать за то, чтобы построенные станции работали на расчётную мощность: плановое обслуживание, диагностика и устранение неисправностей.',
      duties: ['Проводить плановое техническое обслуживание станций по графику', 'Диагностировать неисправности инверторов, панелей и кабельных линий', 'Анализировать данные мониторинга и находить причины потерь выработки', 'Оформлять акты и отчёты для заказчика'],
      reqs: ['Высшее или среднее специальное электротехническое образование', 'Опыт эксплуатации электроустановок от 2 лет', 'Навыки работы с измерительными приборами и тепловизором', 'Водительское удостоверение категории B'],
    },
    {
      id: 'sales-manager', title: 'Менеджер по продажам солнечных станций', dept: 'sales', city: 'Ташкент', type: 'Полная занятость', exp: 'От 2 лет',
      lead: 'Вы будете вести корпоративных клиентов от первого обращения до договора: выяснять задачу, готовить с инженерами расчёт и защищать предложение.',
      duties: ['Вести переговоры с предприятиями и государственными заказчиками', 'Готовить коммерческие предложения вместе с проектным отделом', 'Считать окупаемость станции и объяснять её клиенту', 'Сопровождать сделку до подписания договора и передачи в работу'],
      reqs: ['Опыт продаж компаниям от 2 лет, желательно технически сложных решений', 'Умение разобраться в расчёте и объяснить его простыми словами', 'Грамотная устная и письменная речь на русском и узбекском языках', 'Опыт работы с CRM-системой'],
    },
    {
      id: 'project-manager', title: 'Руководитель проектов строительства станций', dept: 'projects', city: 'Ташкент', type: 'Полная занятость', exp: 'От 4 лет',
      lead: 'Вы будете вести строительство станций от договора до ввода в эксплуатацию: сроки, бюджет, подрядчики и связь с заказчиком.',
      duties: ['Планировать график и бюджет проекта и отвечать за их соблюдение', 'Координировать проектировщиков, снабжение и монтажные бригады', 'Вести переговоры с заказчиком и сетевыми компаниями', 'Организовывать приёмку работ и ввод станции в эксплуатацию'],
      reqs: ['Опыт управления строительными или энергетическими проектами от 4 лет', 'Понимание этапов строительства электроустановок', 'Навыки работы с графиками и бюджетами проектов', 'Готовность к поездкам на объекты'],
    },
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
  // The panel field of the calculator and of the career page: modules are counted by columns, each `step` wide
  const FIELD = { cols: 10, rows: 4, step: 32 };
  // A point of the field: column and row, fractions allowed
  const fieldAt = (c, r) => [+(110 + c * FIELD.step + r * 20).toFixed(1), +(232 - r * 37.5).toFixed(1)];
  const ART = (() => {
    const line = (d, cls, p) => `<path class="${cls || 'l1'}" d="${d}" pathLength="1" style="--p:${p}"/>`;
    const dot = (x, y, o, r = 3.2) => `<circle class="art__on art__dot" cx="${x}" cy="${y}" r="${r}" style="--o:${o}"/>`;
    const hit = (part, d) => `<path class="art__hit" data-part="${part}" d="${d}"/>`;
    // parts: [name, lines, markup drawn over the lines, markup drawn under them]
    // bare: the drawing without its frame and ground line — a part of a bigger scene
    const make = (name, w, cardPad, parts) => ({ h = 288, pad = cardPad, bare = false } = {}) => {
      let p = 0;
      const body = parts.map(([part, lines, over = '', under = '']) =>
        `<g class="art__g art__g--${part}">${under}${lines.map(([d, cls]) => line(d, cls, p++)).join('')}${over}</g>`).join('');
      if (bare) return body;
      const ground = `<g class="art__g art__g--base">${line(`M${-pad} 270H${w + pad}`, 'l3', 0)}</g>`;
      return `<svg class="art art--${name} lit__obj" viewBox="${-pad} 0 ${w + pad * 2} ${h}" aria-hidden="true" focusable="false">${ground}${body}</svg>`;
    };

    const bar = (y, o) => `<rect class="art__on art__bar" x="78" y="${y}" width="104" height="18" rx="2" style="--o:${o}"/>`;
    const barLine = (y) => [`M80 ${y}h100a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H80a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2Z`, 'l2'];
    const joints = [0, 130, 260].flatMap((r, i) => [[110, 232], [136.7, 182], [163.3, 132], [190, 82]]
      .map(([x, y], k) => dot(x + r, y, (i * 4 + k) * 45))).join('');

    // The field of the calculator: the same tilted table, but every module of it switches on by itself
    const fp = (c, r) => fieldAt(c, r).join(' ');
    const fieldW = FIELD.cols * FIELD.step;
    const fieldCells = Array.from({ length: FIELD.cols * FIELD.rows }, (_, i) => {
      const c = Math.floor(i / FIELD.rows);
      const r = i % FIELD.rows;
      return `<path class="art__cell" d="M${fp(c + .07, r + .06)}L${fp(c + .93, r + .06)}L${fp(c + .93, r + .94)}L${fp(c + .07, r + .94)}Z" pathLength="1"/>`;
    }).join('');
    const fieldGrid = (n, from, to) => Array.from({ length: n - 1 }, (_, i) => `M${fp(...from(i + 1))}L${fp(...to(i + 1))}`).join('');

    return {
      field: make('field', 110 + fieldW + 110, 0, [
        ['metal', [
          ['M110 238V270'], [`M${110 + fieldW / 2} 238V270`], [`M${110 + fieldW} 238V270`], [`M${190 + fieldW} 88V230`],
          ['M110 270L174 238'], [`M${110 + fieldW} 270L${190 + fieldW} 230`], [`M${190 + fieldW} 230L${150 + fieldW} 163`],
        ], dot(110, 270, 0) + dot(110 + fieldW / 2, 270, 70) + dot(110 + fieldW, 270, 140) + dot(190 + fieldW, 230, 210) + dot(150 + fieldW, 163, 280)],
        ['panels', [
          [`M110 232H${110 + fieldW}L${190 + fieldW} 82H190Z`, 'l2'],
          [`M110 232v6H${110 + fieldW}v-6`], [`M${110 + fieldW} 238L${190 + fieldW} 88v-6`],
          [fieldGrid(FIELD.cols, (c) => [c, 0], (c) => [c, FIELD.rows]), 'l3'],
          [fieldGrid(FIELD.rows, (r) => [0, r], (r) => [FIELD.cols, r]), 'l3'],
          ['M42 58a20 20 0 1 0 40 0a20 20 0 1 0-40 0'],
        ],
        `<g class="art__cells">${fieldCells}</g>`
          + '<g class="art__rays"><path class="l1" d="M92 58h10M83.2 79.2l7.1 7.1M62 88v10M40.8 79.2l-7.1 7.1M32 58H22M40.8 36.8l-7.1-7.1M62 28V18M83.2 36.8l7.1-7.1" pathLength="1" style="--p:8"/></g>'
          + '<path class="art__on art__beam" d="M104 66L208 126M96 84L191 139M84 100L162 145" style="--o:0"/>'
          + '<path class="art__glare" d="M110 232h36l80-150h-36z"/>'],
      ]),

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

  /* ---------- Back from another page ---------- */
  // A page restored from the back/forward cache keeps its open menus and the focus on the link that was clicked.
  // After a click or a tap they are dropped; a keyboard user gets the focus back where it was
  let lastInput = 'pointer';
  document.addEventListener('pointerdown', () => { lastInput = 'pointer'; }, true);
  document.addEventListener('keydown', () => { lastInput = 'key'; }, true);
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    closeDrops();
    setMenu(false);
    if (lastInput === 'pointer' && document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
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
        <div class="pcard__media ph"><img src="${p.photo || 'assets/img/projects/project.webp'}" alt="${p.title}" loading="lazy" onerror="this.remove()"></div>
        <div class="pcard__body">
          <div class="pcard__top">
            <div class="pcard__stat"><b>${p.power}</b><span>Мощность</span></div>
            <div class="pcard__stat"><b>${p.gen}</b><span>Годовая генерация</span></div>
            <span class="pcard__logo"><img src="${p.logo || 'assets/img/projects/logo.png'}" alt="${p.client}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'), { className: 'pcard__logo-text', textContent: this.alt }))"></span>
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
  // Фото новостей: assets/img/news/news-N.webp. Пока фото три — демо-новости с 4-й повторяют их по кругу.
  const NEWS_PHOTOS = 3;
  const newsImg = (i) => `assets/img/news/news-${(i % NEWS_PHOTOS) + 1}.webp`;
  const newsCard = (n, i) => `
    <article class="ncard">
      <div class="ncard__media ph"><img src="${newsImg(i % news.length)}" alt="" loading="lazy" onerror="this.remove()"></div>
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
  ['.catalog__grid', '#products-grid', '#product-related', '#vacancy-list', '#vacancy-more'].forEach((sel) => trackLight($(sel)));

  /* ---------- Solution page (one template for all solutions) ---------- */
  const solutionPage = $('#solution');
  if (solutionPage) {
    // Тексты решений. Картинки: assets/img/solutions/<ключ>-hero.jpg, -about-1.jpg, -about-2.jpg
    const solutions = {
      legal: { name: 'Для юридических лиц', heroEyebrow: 'Решения для бизнеса', heroTitle: 'Солнечные станции <br>для бизнеса', heroLead: 'Сократите операционные расходы на электроэнергию и обеспечьте стабильное энергоснабжение предприятия.', aboutEyebrow: 'Энергия солнца для вашего бизнеса', aboutTitle1: 'Снижайте затраты на энергию', aboutTitle2: 'и повышайте устойчивость бизнеса', benEyebrow: 'Почему компании выбирают Solar Nature' },
      individual: { name: 'Для физических лиц', heroEyebrow: 'Решения для дома', heroTitle: 'Солнечные панели <br>для вашего дома', heroLead: 'Снижайте расходы на электроэнергию, обеспечьте независимость от перебоев в сети и используйте энергию солнца для комфортной жизни.', aboutEyebrow: 'Энергия солнца для вашего дома', aboutTitle1: 'Экономьте на электроэнергии', aboutTitle2: 'и повышайте комфорт жизни', benEyebrow: 'Почему владельцы домов выбирают Solar Nature' },
      rooftop: {
        name: 'Крышные солнечные станции', heroEyebrow: 'Солнечные решения', heroTitle: 'Крышные солнечные <br>станции', heroLead: 'Проектируем и устанавливаем крышные солнечные электростанции для предприятий, коммерческих объектов и частных домов, помогая снизить расходы на электроэнергию и повысить энергоэффективность.',
        aboutEyebrow: 'Крышные солнечные станции', aboutTitle1: 'Эффективное использование', aboutTitle2: 'площади вашей кровли', benEyebrow: 'Почему клиенты выбирают Solar Nature',
        aboutText: '<p>Solar Nature проектирует и устанавливает крышные солнечные электростанции для объектов различного назначения. Такие системы позволяют использовать свободную площадь кровли для генерации собственной электроэнергии без необходимости выделения дополнительного земельного участка.</p>'
          + '<p>Мы разрабатываем индивидуальные решения с учетом типа кровли, конструктивных особенностей здания, уровня энергопотребления и будущих задач заказчика. Все проекты проходят инженерный расчет и соответствуют современным требованиям безопасности и надежности.</p>'
          + '<p class="sabout__gap">Компания обеспечивает полный цикл реализации проекта: аудит объекта, проектирование, подбор оборудования, монтаж, подключение и дальнейшее сервисное сопровождение. Благодаря комплексному подходу заказчик получает готовую систему, рассчитанную на долгие годы эффективной эксплуатации.</p>',
      },
      ground: {
        name: 'Наземные солнечные станции', heroEyebrow: 'Солнечные решения', heroTitle: 'Наземные солнечные <br>станции', heroLead: 'Проектируем и строим наземные солнечные электростанции для промышленных предприятий, инвесторов и объектов с высоким энергопотреблением.',
        aboutEyebrow: 'Наземные солнечные станции', aboutTitle1: 'Эффективная генерация энергии', aboutTitle2: 'для объектов любого масштаба', benEyebrow: 'Почему клиенты выбирают Solar Nature',
        aboutText: '<p>Наземные солнечные станции являются оптимальным решением для объектов с высоким уровнем энергопотребления и доступными земельными участками. Такие станции позволяют вырабатывать значительные объемы электроэнергии, снижать зависимость от внешних поставщиков и оптимизировать эксплуатационные расходы.</p>'
          + '<p>Solar Nature реализует проекты наземных солнечных электростанций любой сложности — от предварительного технико-экономического анализа до ввода объекта в промышленную эксплуатацию. Каждое решение разрабатывается индивидуально с учетом особенностей участка, климатических условий и потребностей заказчика.</p>'
          + '<p class="sabout__gap">Мы выполняем полный комплекс работ: инженерные изыскания, проектирование, поставку оборудования, строительство, монтаж, подключение, пусконаладочные работы, мониторинг и дальнейшее сервисное сопровождение. Это позволяет обеспечить максимальную эффективность станции и ее надежную работу на протяжении десятилетий.</p>',
      },
      bess: {
        name: 'Системы накопления энергии BESS', heroEyebrow: 'Решения для бизнеса', heroTitle: 'Системы накопления <br>энергии BESS', heroLead: 'Интеллектуальные системы хранения электроэнергии для повышения надежности энергоснабжения, снижения затрат и эффективного управления потреблением энергии.',
        aboutEyebrow: 'Системы накопления энергии', aboutTitle1: 'Максимальная эффективность', aboutTitle2: 'использования электроэнергии', benEyebrow: 'Почему клиенты выбирают Solar Nature',
        aboutText: '<p>Системы накопления энергии BESS (Battery Energy Storage System) позволяют аккумулировать электроэнергию и использовать ее именно тогда, когда это наиболее выгодно или необходимо. Это эффективное решение для предприятий, стремящихся повысить надежность энергоснабжения, снизить эксплуатационные расходы и обеспечить бесперебойную работу оборудования.</p>'
          + '<p>Solar Nature проектирует и внедряет современные системы хранения энергии, интегрируя их с солнечными электростанциями, дизельными генераторами и существующей электрической инфраструктурой предприятия. Каждое решение разрабатывается индивидуально с учетом режима энергопотребления, мощности объекта и целей заказчика.</p>'
          + '<p class="sabout__gap">Мы обеспечиваем полный цикл реализации проекта — от технического обследования и проектирования до поставки оборудования, монтажа, настройки системы управления и последующего сервисного сопровождения. Это позволяет получить надежную и масштабируемую систему хранения энергии, рассчитанную на долгосрочную эксплуатацию.</p>',
      },
      ppa: {
        name: 'PPA-решения для BESS', heroEyebrow: 'Энергетические решения', heroTitle: 'PPA-решения <br>для BESS', heroLead: 'Получите современную систему накопления энергии без капитальных вложений. Мы инвестируем в оборудование, а вы оплачиваете только фактически используемую электроэнергию или услугу хранения энергии.',
        aboutEyebrow: 'PPA для систем накопления энергии', aboutTitle1: 'Энергетическая инфраструктура', aboutTitle2: 'без капитальных затрат', benEyebrow: 'Почему клиенты выбирают Solar Nature',
        aboutText: '<p>PPA (Power Purchase Agreement) для BESS — это современная модель сотрудничества, при которой заказчик получает готовую систему накопления энергии без необходимости инвестировать в приобретение оборудования. Все капитальные вложения, поставку и внедрение системы берет на себя Solar Nature или инвестиционный партнер.</p>'
          + '<p>Заказчик оплачивает только использование системы или фактически потребленную электроэнергию в соответствии с условиями долгосрочного соглашения. Такой подход позволяет внедрить современные технологии хранения энергии без значительной финансовой нагрузки на бизнес.</p>'
          + '<p class="sabout__gap">Solar Nature обеспечивает полный цикл реализации проекта: техническое обследование объекта, проектирование, поставку оборудования, монтаж, интеграцию с существующей энергетической инфраструктурой, мониторинг и сервисное обслуживание. Это позволяет предприятиям сосредоточиться на развитии бизнеса, не отвлекая ресурсы на управление энергетическими активами.</p>',
      },
      diesel: { name: 'Контроллеры дизель-генераторов', heroEyebrow: 'Гибридные системы', heroTitle: 'Контроллеры <br>дизель-генераторов', heroLead: 'Объедините солнечную станцию и дизель-генератор, чтобы сократить расход топлива и затраты на обслуживание.', aboutEyebrow: 'Солнце и дизель в одной системе', aboutTitle1: 'Сокращайте расход топлива', aboutTitle2: 'без потери надежности', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
      lightning: {
        name: 'Молниезащита', heroEyebrow: 'Инженерные системы безопасности', heroTitle: 'Молниезащита <br>объектов', heroLead: 'Проектируем и устанавливаем комплексные системы молниезащиты и заземления для промышленных, коммерческих, энергетических и жилых объектов.',
        aboutEyebrow: 'Комплексная молниезащита', aboutTitle1: 'Надежная защита людей,', aboutTitle2: 'зданий и оборудования', benEyebrow: 'Почему клиенты выбирают Solar Nature',
        aboutText: '<p>Система молниезащиты предназначена для безопасного отвода электрического разряда и снижения риска повреждения здания, оборудования и инженерных коммуникаций. Грамотно спроектированная система помогает предотвратить пожары, выход из строя электроники, остановку производственных процессов и другие последствия атмосферных перенапряжений.</p>'
          + '<p>Solar Nature разрабатывает решения с учетом назначения объекта, его конструктивных особенностей, высоты, расположения и категории молниезащиты. В состав системы могут входить молниеприемники, токоотводы, контур заземления, устройства защиты от импульсных перенапряжений и элементы уравнивания потенциалов.</p>'
          + '<p class="sabout__gap">Мы выполняем полный комплекс работ: обследование объекта, расчет рисков, проектирование, подбор оборудования, монтаж, измерения и проверку эффективности системы. Все элементы подбираются как единый комплекс, чтобы обеспечить надежную защиту внешней и внутренней электрической инфраструктуры.</p>',
      },
      feasibility: { name: 'Оценка реализуемости проекта', heroEyebrow: 'Консалтинг', heroTitle: 'Оценка реализуемости <br>проекта', heroLead: 'Проверим техническую и экономическую целесообразность станции до начала инвестиций.', aboutEyebrow: 'Решения на основе расчетов', aboutTitle1: 'Принимайте решения', aboutTitle2: 'на основе точных данных', benEyebrow: 'Почему клиенты выбирают Solar Nature' },
    };
    const key = solutions[new URLSearchParams(location.search).get('s')] ? new URLSearchParams(location.search).get('s') : 'individual';
    const sol = solutions[key];
    $$('[data-sol]').forEach((el) => { if (sol[el.dataset.sol]) el.textContent = sol[el.dataset.sol]; });
    $$('[data-sol-html]').forEach((el) => { if (sol[el.dataset.solHtml]) el.innerHTML = sol[el.dataset.solHtml]; });
    $$('[data-sol-img]').forEach((img) => { img.src = `assets/img/solutions/${key}-${img.dataset.solImg}.jpg`; });
    // Фон блока преимуществ: у юрлиц — панели на фоне неба, у остальных решений — станция в горах
    const benefitsBg = $('[data-sol-benefits]');
    if (benefitsBg) benefitsBg.src = `assets/img/solutions/${key === 'legal' ? 'benefits-bg-legal.jpg' : 'benefits-bg-mountains.webp'}`;
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
    // Широкое фото: своё у сервиса, если оно есть в ownWide, иначе общее wide.webp
    const ownWide = ['assets', 'audit', 'training', 'monitoring', 'scada', 'digital', 'design', 'grid'];
    const wide = $('[data-srv-wide]');
    if (wide && ownWide.includes(key)) wide.src = `assets/img/services/${key}-wide.jpg`;
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
    $('[data-article-cover]', article)?.setAttribute('src', newsImg(id - 1));
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

  /* ---------- Rolling number ----------
     Every digit is a column 0…9 that rolls to its place, like on a meter. */
  const num = (n) => Math.round(n).toLocaleString('ru-RU').replace(/\s/g, ' ');
  const rollTo = (el, value, plain = false) => {
    const text = plain ? String(Math.round(value)) : num(value);
    if (el.dataset.now === text) return;
    const old = [...(el.dataset.now || '')].reverse();
    el.dataset.now = text;
    const strip = '0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9';
    const cols = [...text].reverse().map((ch, i) => (/\d/.test(ch)
      ? `<span class="odo__col" style="--from:${/\d/.test(old[i] || '') ? old[i] : 0};--to:${ch};--i:${i}"><span class="odo__strip">${strip}</span></span>`
      : '<span class="odo__gap"></span>')).reverse().join('');
    el.classList.remove('is-rolled');
    el.innerHTML = `<span class="sr-only">${text}</span><span class="odo__cols" aria-hidden="true">${cols}</span>`;
    void el.offsetWidth; // the columns stand at the old digits for a moment, then roll
    el.classList.add('is-rolled');
  };
  // Numbers that roll once, when they come into view
  $$('[data-odo-to]').forEach((el) => {
    const plain = el.hasAttribute('data-odo-plain');
    const show = () => rollTo(el, Number(el.dataset.odoTo), plain);
    if (!('IntersectionObserver' in window)) { show(); return; }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      io.disconnect();
      show();
    }, { threshold: 0.6 });
    io.observe(el);
  });

  /* ---------- Projects page: map, filters and the list ---------- */
  const folio = $('#portfolio-list');
  if (folio) {
    // Фильтры страницы проектов: тип объекта и диапазон мощности, кВт
    const TYPES = { industrial: 'Промышленный', commercial: 'Коммерческий' };
    const RANGES = {
      small: ['до 100 кВт', (kw) => kw < 100],
      mid: ['100–500 кВт', (kw) => kw >= 100 && kw <= 500],
      big: ['500+ кВт', (kw) => kw > 500],
    };
    const photoOf = (p) => p.photo || p.demo || 'assets/img/projects/project.webp';
    const goTo = (el) => {
      const y = el.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 24;
      window.scrollTo({ top: y, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    };

    folio.innerHTML = projects.map((p, i) => `
      <li class="prow" id="project-${i + 1}">
        <h3 class="prow__head">
          <button class="prow__toggle" type="button" aria-expanded="false" aria-controls="project-${i + 1}-more">
            <span class="prow__kw"><b>${num(p.kw)}</b> кВт</span>
            <span class="prow__title">${p.title}</span>
            <span class="prow__type">${TYPES[p.type]}</span>
            <span class="prow__plus" aria-hidden="true"></span>
          </button>
        </h3>
        <div class="prow__more" id="project-${i + 1}-more" inert>
          <div class="prow__inner">
            <figure class="prow__photo ph"><img src="${photoOf(p)}" alt="${p.title}" loading="lazy" onerror="this.remove()"></figure>
            <div class="prow__body">
              <p class="prow__text">${p.text}</p>
              <dl class="prow__stats">
                <div><dt>Мощность</dt><dd>${num(p.kw)} кВт</dd></div>
                <div><dt>Годовая генерация</dt><dd>${p.gen.replace('МВтч', 'МВт·ч')}</dd></div>
                <div><dt>Тип объекта</dt><dd>${TYPES[p.type]}</dd></div>
              </dl>
              <a class="abtn abtn--dark" href="#contacts" data-modal="lead" data-modal-subject="Тема: проект, похожий на «${p.title}»">Обсудить похожий проект ${icon('i-chevron-right', 'ic ic--xs')}</a>
            </div>
          </div>
        </div>
      </li>`).join('');
    const rows = $$('.prow', folio);
    const setOpen = (row, open) => {
      row.classList.toggle('is-open', open);
      $('.prow__toggle', row).setAttribute('aria-expanded', String(open));
      $('.prow__more', row).toggleAttribute('inert', !open);
    };
    folio.addEventListener('click', (e) => {
      const btn = e.target.closest('.prow__toggle');
      if (btn) setOpen(btn.closest('.prow'), btn.getAttribute('aria-expanded') !== 'true');
    });

    /* Map: the country is laid out in dots, a wave runs over it from Tashkent and the objects light up */
    const map = $('[data-map]');
    let points = [];
    if (map) {
      // Упрощённая граница Узбекистана: долгота, широта
      const BORDER = [[66.52, 37.36], [66.55, 37.97], [65.22, 38.4], [64.17, 38.89], [63.52, 39.36], [62.37, 40.05], [61.88, 41.08], [61.55, 41.27], [60.47, 41.22], [60.08, 41.43], [59.98, 42.22], [58.63, 42.75], [57.79, 42.17], [56.93, 41.83], [57.1, 41.32], [55.97, 41.31], [55.93, 45], [58.5, 45.59], [58.69, 45.5], [60.24, 44.78], [61.06, 44.41], [62.01, 43.5], [63.19, 43.65], [64.9, 43.73], [66.1, 43], [66.02, 41.99], [66.51, 41.99], [66.71, 41.17], [67.99, 41.14], [68.26, 40.66], [68.63, 40.67], [69.07, 41.38], [70.39, 42.08], [70.96, 42.27], [71.26, 42.17], [70.42, 41.52], [71.16, 41.14], [71.87, 41.39], [73.06, 40.87], [71.77, 40.15], [71.01, 40.24], [70.6, 40.22], [70.46, 40.5], [70.67, 40.96], [69.33, 40.73], [69.01, 40.09], [68.54, 39.53], [67.7, 39.58], [67.44, 39.14], [68.18, 38.9], [68.39, 38.16], [67.83, 37.14], [67.08, 37.36]];
      const LON = 55.6;
      const LAT = 45.9;
      const SCALE = 60;
      const SQUEEZE = Math.cos(41.5 * Math.PI / 180); // a degree of longitude is shorter than a degree of latitude here
      const at = ([lon, lat]) => [(lon - LON) * SQUEEZE * SCALE, (LAT - lat) * SCALE];
      const W = Math.ceil((73.4 - LON) * SQUEEZE * SCALE);
      const H = Math.ceil((LAT - 36.9) * SCALE);
      const poly = BORDER.map(at);
      const inside = (x, y) => {
        let hit = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const [xi, yi] = poly[i];
          const [xj, yj] = poly[j];
          if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) hit = !hit;
        }
        return hit;
      };
      const STEP = 12;
      const [ox, oy] = at([69.24, 41.31]);
      const far = Math.hypot(ox, H - oy);
      let dots = '';
      for (let row = 0; row * STEP * .866 < H; row += 1) {
        for (let col = 0; col * STEP < W; col += 1) {
          const x = col * STEP + (row % 2 ? STEP / 2 : 0);
          const y = row * STEP * .866;
          if (inside(x, y)) dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" style="--d:${(Math.hypot(x - ox, y - oy) / far).toFixed(3)}"/>`;
        }
      }
      map.style.aspectRatio = `${W} / ${H}`;
      map.insertAdjacentHTML('beforeend', `<svg class="pmap__svg" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">${dots}</svg>`
        + projects.map((p, i) => {
          const [x, y] = at(p.at);
          const size = Math.round(10 + Math.sqrt(p.kw / 800) * 11);
          return `<button class="mpoint${x / W > .6 ? ' mpoint--left' : ''}" type="button" data-i="${i}" style="--x:${(x / W * 100).toFixed(2)}%;--y:${(y / H * 100).toFixed(2)}%;--size:${size}px;--d:${(Math.hypot(x - ox, y - oy) / far).toFixed(3)};--k:${i}" aria-label="${p.title}, ${num(p.kw)} кВт">`
            + `<span class="mpoint__dot"></span><span class="mpoint__tip" aria-hidden="true"><b>${p.title}</b><span>${TYPES[p.type]}, ${num(p.kw)} кВт</span></span></button>`;
        }).join(''));
      points = $$('.mpoint', map);
      map.addEventListener('click', (e) => {
        const point = e.target.closest('.mpoint');
        if (!point) return;
        const row = rows[Number(point.dataset.i)];
        setOpen(row, true);
        goTo(row);
        $('.prow__toggle', row).focus({ preventScroll: true });
      });
      // The points breathe only while the map is on screen
      if ('IntersectionObserver' in window && !reduceMotion.matches) {
        new IntersectionObserver((entries) => {
          const seen = entries[entries.length - 1].isIntersecting;
          if (seen) map.classList.add('is-on');
          map.classList.toggle('is-live', seen);
        }, { threshold: 0.25 }).observe(map);
      } else {
        map.classList.add('is-on');
      }
    }

    /* Filters */
    const filterBox = $('#folio-filter');
    const countEl = $('[data-odo="count"]');
    const sumEl = $('[data-odo="sum"]');
    const chip = (group, key, name) => `<button class="pchip" type="button" data-group="${group}" data-key="${key}" aria-pressed="false">${name}</button>`;
    filterBox.innerHTML = `<div class="pfilter__group" role="group" aria-labelledby="pf-power"><p class="pfilter__name" id="pf-power">Мощность</p><div class="pfilter__chips">${chip('power', 'all', 'Любая')}${Object.entries(RANGES).map(([key, [name]]) => chip('power', key, name)).join('')}</div></div>`
      + `<div class="pfilter__group" role="group" aria-labelledby="pf-type"><p class="pfilter__name" id="pf-type">Тип объекта</p><div class="pfilter__chips">${chip('type', 'all', 'Любой')}${Object.entries(TYPES).map(([key, name]) => chip('type', key, name)).join('')}</div></div>`;
    const chips = $$('.pchip', filterBox);
    const query = new URLSearchParams(location.search);
    const chosen = {
      power: RANGES[query.get('power')] ? query.get('power') : 'all',
      type: TYPES[query.get('type')] ? query.get('type') : 'all',
    };
    const fits = (p) => (chosen.power === 'all' || RANGES[chosen.power][1](p.kw)) && (chosen.type === 'all' || p.type === chosen.type);
    const applyFilter = (first = false) => {
      let n = 0;
      let sum = 0;
      rows.forEach((row, i) => {
        const ok = fits(projects[i]);
        if (!ok) setOpen(row, false);
        row.hidden = !ok;
        if (points[i]) points[i].classList.toggle('is-off', !ok);
        if (!ok) return;
        row.style.setProperty('--n', n);
        n += 1;
        sum += projects[i].kw;
      });
      chips.forEach((c) => c.setAttribute('aria-pressed', String(chosen[c.dataset.group] === c.dataset.key)));
      const word = plural(n, ['проект', 'проекта', 'проектов']);
      rollTo(countEl, n);
      rollTo(sumEl, sum);
      $('#folio-word').textContent = word;
      $('#folio-say').textContent = n ? `${n} ${word} общей мощностью ${num(sum)} кВт` : 'Проектов с такими параметрами нет';
      $('.folio__sum').hidden = !n;
      $('#folio-empty').hidden = n > 0;
      if (first) return;
      // The rows that are left come in again, one after another
      folio.classList.remove('is-filtered');
      void folio.offsetWidth;
      folio.classList.add('is-filtered');
      const next = new URLSearchParams();
      Object.entries(chosen).forEach(([key, value]) => { if (value !== 'all') next.set(key, value); });
      history.replaceState({}, '', next.toString() ? `?${next}` : location.pathname);
    };
    filterBox.addEventListener('click', (e) => {
      const c = e.target.closest('.pchip');
      if (!c || c.getAttribute('aria-pressed') === 'true') return;
      chosen[c.dataset.group] = c.dataset.key;
      applyFilter();
    });
    $('[data-folio-reset]').addEventListener('click', () => {
      chosen.power = 'all';
      chosen.type = 'all';
      applyFilter();
    });
    applyFilter(true);
  }

  /* ---------- Investors page: orbits ---------- */
  // The three formats go round the sun; a format under the pointer stops the motion and leads to its offer
  const orbit = $('[data-orbit]');
  if (orbit) {
    const BODIES = [
      { key: 'epc', name: 'EPC', note: 'Станция под ключ', rx: 215, period: 40, start: .06 },
      { key: 'ppa', name: 'PPA', note: 'Продажа энергии', rx: 330, period: 64, start: .47 },
      { key: 'bess', name: 'BESS', note: 'Накопление энергии', rx: 445, period: 96, start: .78 },
    ];
    const W = 1000;
    const H = 660;
    const TILT = .4;
    const TURN = -16;
    const rad = TURN * Math.PI / 180;
    const ring = (rx) => {
      const x = Math.cos(rad) * rx;
      const y = Math.sin(rad) * rx;
      const a = `A${rx} ${rx * TILT} ${TURN} 1 1`;
      return `M${(W / 2 + x).toFixed(1)} ${(H / 2 + y).toFixed(1)}${a} ${(W / 2 - x).toFixed(1)} ${(H / 2 - y).toFixed(1)}${a} ${(W / 2 + x).toFixed(1)} ${(H / 2 + y).toFixed(1)}`;
    };
    orbit.innerHTML = `<svg class="orbit__svg" viewBox="0 0 ${W} ${H}" focusable="false">`
      + BODIES.map((b, i) => `<path class="orbit__ring" d="${ring(b.rx)}" pathLength="1" style="--i:${i}"/>`
        + [.2, .12, .05].map((len, k) => `<path class="orbit__trail orbit__trail--${k + 1}" data-body="${i}" data-len="${len}" d="${ring(b.rx)}" pathLength="1" stroke-dasharray="${len} ${1 - len}"/>`).join('')).join('')
      + '</svg>'
      + '<span class="orbit__sun"><svg class="orbit__mark" viewBox="0 0 39 39"><use href="#i-logo"/></svg></span>'
      + BODIES.map((b, i) => `<a class="orbit__body" href="#offer-${b.key}" tabindex="-1" data-body="${i}" style="--i:${i}"><span class="orbit__ball"></span><span class="orbit__tag"><b>${b.name}</b><span>${b.note}</span></span></a>`).join('');
    const rings = $$('.orbit__ring', orbit);
    const lengths = rings.map((r) => r.getTotalLength());
    const bodies = $$('.orbit__body', orbit);
    const trails = $$('.orbit__trail', orbit);
    let size = [orbit.clientWidth, orbit.clientHeight];
    let clock = 0;
    const place = () => {
      BODIES.forEach((b, i) => {
        const f = (b.start + clock / b.period) % 1;
        const pt = rings[i].getPointAtLength(lengths[i] * f);
        const depth = (pt.y - H / 2) / (b.rx * TILT * 1.2); // −1 far, 1 near
        const near = Math.min(Math.max((depth + 1) / 2, 0), 1);
        const el = bodies[i];
        el.style.transform = `translate(${(pt.x / W * size[0]).toFixed(1)}px, ${(pt.y / H * size[1]).toFixed(1)}px) scale(${(.74 + near * .26).toFixed(3)})`;
        el.style.opacity = (.5 + near * .5).toFixed(2);
        el.classList.toggle('is-left', pt.x > W * .7);
        trails.forEach((trail) => {
          if (Number(trail.dataset.body) === i) trail.style.strokeDashoffset = (Number(trail.dataset.len) - f).toFixed(4);
        });
      });
    };
    let raf = 0;
    let last = 0;
    let live = false;
    let hold = false;
    const frame = (now) => {
      raf = 0;
      if (!live || document.hidden) return;
      if (!hold) clock += Math.min(now - last, 64) / 1000;
      last = now;
      place();
      raf = requestAnimationFrame(frame);
    };
    const run = () => {
      if (raf || !live || document.hidden || reduceMotion.matches) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const measure = () => { size = [orbit.clientWidth, orbit.clientHeight]; place(); };
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(orbit); else window.addEventListener('resize', measure);
    measure();
    orbit.addEventListener('pointerover', (e) => {
      const el = e.target.closest('.orbit__body');
      hold = Boolean(el) && e.pointerType !== 'touch';
      bodies.forEach((b) => b.classList.toggle('is-hot', b === el && hold));
    });
    orbit.addEventListener('pointerleave', () => {
      hold = false;
      bodies.forEach((b) => b.classList.remove('is-hot'));
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        live = entries[entries.length - 1].isIntersecting;
        if (live) orbit.classList.add('is-on');
        orbit.classList.toggle('is-live', live);
        run();
      }, { threshold: 0.2 }).observe(orbit);
    } else {
      orbit.classList.add('is-on');
    }
    document.addEventListener('visibilitychange', run);
  }

  /* ---------- Investors page: the statement lights up word by word while it is scrolled ---------- */
  const say = $('[data-say]');
  if (say && !reduceMotion.matches) {
    const split = (node) => [...node.childNodes].forEach((child) => {
      if (child.nodeType !== 3) { split(child); return; }
      const parts = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part.trim()) { parts.append(part); return; }
        const word = document.createElement('span');
        word.className = 'say__w';
        word.textContent = part;
        parts.append(word);
      });
      child.replaceWith(parts);
    });
    split(say);
    say.classList.add('is-split');
    const words = $$('.say__w', say);
    let lit = -1;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const box = say.getBoundingClientRect();
      const vh = window.innerHeight;
      const done = Math.min(Math.max((vh * .85 - box.top) / (box.height + vh * .4), 0), 1);
      const n = Math.round(done * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach((word, i) => word.classList.toggle('is-lit', i < n));
    };
    const ask = () => { if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('resize', ask);
    paint();
  }

  /* ---------- Investors page: offers lie down in a stack ---------- */
  const stack = $('[data-stack]');
  if (stack) {
    const cards = $$('.offer', stack);
    const roomy = window.matchMedia('(min-width: 1101px) and (min-height: 720px)');
    let raf = 0;
    const paint = () => {
      raf = 0;
      cards.forEach((card, i) => {
        const box = card.firstElementChild;
        const next = cards[i + 1];
        let under = 0; // how far the next card has covered this one
        if (next && roomy.matches && !reduceMotion.matches) {
          const a = card.getBoundingClientRect();
          under = Math.min(Math.max(1 - (next.getBoundingClientRect().top - a.top) / a.height, 0), 1);
        }
        box.style.setProperty('--s', (1 - under * .05).toFixed(4));
        box.style.setProperty('--b', (1 - under * .55).toFixed(3));
      });
    };
    const ask = () => { if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('resize', ask);
    paint();
    // The button of an offer chooses its format in the form
    stack.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-format]');
      const radio = btn && $(`#invest-form input[name="format"][value="${btn.dataset.format}"]`);
      if (radio) radio.checked = true;
    });
  }

  /* ---------- Vacancy row (career list + other vacancies) ---------- */
  const vacancyHref = (v) => `vacancy.html?id=${v.id}`;
  const vacancyRow = (v, i = 0) => `
    <li class="vrow lit reveal" style="--d:${(Math.min(i, 8) * .05).toFixed(2)}s;--vt:vac-${v.id}" data-dept="${v.dept}">
      <div class="vrow__main">
        <p class="vrow__dept">${depts[v.dept]}</p>
        <h3 class="vrow__title"><a href="${vacancyHref(v)}">${v.title}</a></h3>
      </div>
      <dl class="vrow__facts">
        <div><dt>Город</dt><dd>${v.city}</dd></div>
        <div><dt>Занятость</dt><dd>${v.type}</dd></div>
        <div><dt>Опыт</dt><dd>${v.exp}</dd></div>
      </dl>
      <span class="vrow__btn" aria-hidden="true"><span class="cbtn__text">Открыть вакансию</span><span class="cbtn__ic">${icon('i-chevron-right', 'ic ic--xs')}</span></span>
    </li>`;

  /* ---------- Career page: directions and the list ---------- */
  const vacancyList = $('#vacancy-list');
  if (vacancyList) {
    const filter = $('#vac-filter');
    const countEl = $('#vac-count');
    const used = Object.keys(depts).filter((key) => vacancies.some((v) => v.dept === key));
    const chip = (key, name, n) => `<button class="vfilter__btn" type="button" data-dept="${key}" aria-pressed="false">${name}<span>${n}</span></button>`;
    filter.innerHTML = '<span class="vfilter__glider" aria-hidden="true"></span>'
      + chip('all', 'Все', vacancies.length)
      + used.map((key) => chip(key, depts[key], vacancies.filter((v) => v.dept === key).length)).join('');
    vacancyList.innerHTML = vacancies.map(vacancyRow).join('');
    const rows = $$('.vrow', vacancyList);
    const chips = $$('.vfilter__btn', filter);

    // One highlight bar that slides to the chosen direction
    const glider = $('.vfilter__glider', filter);
    filter.classList.add('vfilter--glide');
    const moveGlider = (instant = false) => {
      const on = chips.find((c) => c.getAttribute('aria-pressed') === 'true');
      if (!on) return;
      if (instant) glider.style.transition = 'none';
      glider.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
      glider.style.width = `${on.offsetWidth}px`;
      glider.style.height = `${on.offsetHeight}px`;
      if (instant) { void glider.offsetWidth; glider.style.transition = ''; }
    };
    const paint = (key, first) => {
      rows.forEach((row) => {
        row.hidden = key !== 'all' && row.dataset.dept !== key;
        // A row that comes back does not wait for its turn again
        if (!first) { row.classList.add('is-in'); row.style.setProperty('--d', '0s'); }
      });
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.dept === key)));
      moveGlider(first);
      countEl.textContent = rows.filter((row) => !row.hidden).length;
    };
    let switching = 0;
    const show = (dept, first = false) => {
      const key = used.includes(dept) ? dept : 'all';
      if (first || reduceMotion.matches || !document.startViewTransition) { paint(key, first); return; }
      // Rows that stay glide to their new places, the rest fade — the same rules as on the products page
      switching += 1;
      root.classList.add('is-switching');
      const transition = document.startViewTransition(() => paint(key));
      transition.ready.catch(() => {});
      transition.finished.finally(() => {
        switching -= 1;
        if (!switching) root.classList.remove('is-switching');
      });
    };
    show(new URLSearchParams(location.search).get('dept'), true);
    filter.addEventListener('click', (e) => {
      const btn = e.target.closest('.vfilter__btn');
      if (!btn || btn.getAttribute('aria-pressed') === 'true') return;
      history.replaceState({}, '', btn.dataset.dept === 'all' ? location.pathname : `?dept=${btn.dataset.dept}`);
      show(btn.dataset.dept);
    });
    let gliderRaf;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(gliderRaf);
      gliderRaf = requestAnimationFrame(() => moveGlider(true));
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveGlider(true));
  }

  /* ---------- Career page: the panel field in the hero ----------
     The modules light up one after another; then a few of them open with a plus — here and there, at random. */
  const panel = $('[data-panel]');
  if (panel) {
    const OPEN = 5; // how many modules show a plus at the same time
    panel.innerHTML = ART.field({ h: 300 });
    const cells = $$('.art__cell', panel);
    cells.forEach((cell, i) => {
      const [x, y] = fieldAt(Math.floor(i / FIELD.rows) + .5, (i % FIELD.rows) + .5);
      cell.style.setProperty('--dl', `${900 + i * 22}ms`);
      cell.insertAdjacentHTML('afterend', `<path class="art__plus" d="M${x - 5} ${y}h10M${(x - 2.6).toFixed(1)} ${(y + 4.9).toFixed(1)}l5.2-9.8"/>`);
    });

    const open = [];
    // The next module is picked at random, away from the open ones, so the pluses do not gather in one corner
    const pick = () => {
      const taken = open.map((cell) => cells.indexOf(cell));
      const apart = (i) => taken.every((k) => Math.abs(k - i) !== FIELD.rows && !(Math.abs(k - i) === 1 && Math.floor(k / FIELD.rows) === Math.floor(i / FIELD.rows)));
      const rest = cells.filter((cell) => !open.includes(cell) && !cell.classList.contains('is-back'));
      const pool = rest.filter((cell) => apart(cells.indexOf(cell)));
      const from = pool.length ? pool : rest;
      return from[Math.floor(Math.random() * from.length)];
    };
    const swap = () => {
      if (open.length >= OPEN) {
        const back = open.shift();
        back.classList.remove('is-free');
        back.classList.add('is-back');
        setTimeout(() => back.classList.remove('is-back'), 1000);
      }
      const next = pick();
      next.style.setProperty('--dl', '0s');
      next.classList.add('is-free');
      open.push(next);
    };

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      // No motion: the pluses stand where chance has put them
      panel.classList.add('is-on');
      while (open.length < OPEN) swap();
    } else {
      let timer = null;
      let seen = false;
      let live = false;
      const tick = () => {
        timer = null;
        if (!live || document.hidden) return;
        swap();
        timer = setTimeout(tick, open.length < OPEN ? 280 : 1300 + Math.random() * 1500);
      };
      const wake = (wait) => { if (!timer && live && !document.hidden) timer = setTimeout(tick, wait); };
      // The pluses move only while the panel is on screen and the tab is open
      new IntersectionObserver((entries) => {
        live = entries[entries.length - 1].isIntersecting;
        if (!live) return;
        panel.classList.add('is-on');
        wake(seen ? 600 : 2500);
        seen = true;
      }, { threshold: 0.3 }).observe(panel);
      document.addEventListener('visibilitychange', () => wake(600));
    }
  }

  /* ---------- Vacancy page (one template for all vacancies) ---------- */
  const vacancyPage = $('#vacancy');
  if (vacancyPage) {
    const id = new URLSearchParams(location.search).get('id');
    // Without an address the page shows the first vacancy; an unknown address means the vacancy is closed
    const v = id ? vacancies.find((item) => item.id === id) : vacancies[0];
    if (v) {
      const view = { ...v, dept: depts[v.dept] };
      $$('[data-vac]', vacancyPage).forEach((el) => { el.textContent = view[el.dataset.vac]; });
      $$('[data-vac-list]', vacancyPage).forEach((ul) => {
        const list = v[ul.dataset.vacList] || vacancyOffer;
        ul.innerHTML = list.map((text) => `<li>${text}</li>`).join('');
      });
      $('[data-vac-crumb]').textContent = v.title;
      $('[data-vac-field]', vacancyPage).value = v.title;
      document.title = `${v.title} — вакансия Solar Nature`;
    } else {
      $('[data-vac-open]', vacancyPage).hidden = true;
      $('[data-vac-closed]', vacancyPage).hidden = false;
      $('[data-vac-crumb]').textContent = 'Вакансия закрыта';
      $('[data-vac-field]', vacancyPage).value = 'Отклик без вакансии';
      $('[data-vac-apply-title]', vacancyPage).textContent = 'Отправить резюме';
      $('.apply__submit .btn__label', vacancyPage).textContent = 'Отправить резюме';
      $('[data-vac-apply-text]', vacancyPage).textContent = 'Оставьте контакты и прикрепите резюме — вернёмся, когда появится задача для вас.';
      document.title = 'Вакансия закрыта — Solar Nature';
    }
    const others = vacancies.filter((item) => item !== v).slice(0, 3);
    $('#vacancy-more').innerHTML = others.map(vacancyRow).join('');
    $('[data-vac-more]', vacancyPage).hidden = !others.length;
  }

  /* ---------- Calculator page ---------- */
  const calc = $('[data-calc]');
  if (calc) {
    // Коэффициенты формул, диапазоны полей и готовые наборы. На странице их задаёт блок <script id="calc-config">,
    // который заполняет админ-панель; значения ниже работают, пока блока нет.
    const cfg = {
      kArea: 0.2,           // коэффициент размещения панелей: P = S × kArea
      insolation: 4.5,      // средняя инсоляция H, часов в день: E = P × H × 365
      costPerKw: 8500000,   // стоимость станции за 1 кВт: вложения = P × costPerKw
      lifetime: 25,         // срок службы станции, лет
      panelWatt: 550,       // мощность одной панели, Вт
      currency: 'сум',
      fields: {
        consumption: { min: 100, max: 200000, value: 12000 },
        tariff: { min: 100, max: 3000, step: 10, value: 1000 },
        area: { min: 10, max: 10000, value: 400 },
      },
      presets: {
        home: { consumption: 800, area: 30 },
        business: { consumption: 12000, area: 400 },
        industry: { consumption: 90000, area: 3000 },
      },
    };
    try {
      const own = JSON.parse($('#calc-config').textContent);
      Object.assign(cfg, own, { fields: { ...cfg.fields, ...own.fields }, presets: { ...cfg.presets, ...own.presets } });
    } catch (e) { /* no block or a broken one: the defaults stay */ }

    const nf = (n, digits = 0) => n.toLocaleString('ru-RU', { maximumFractionDigits: digits });
    const power = (kw) => (kw >= 1000 ? [nf(kw / 1000, 2), 'МВт'] : [nf(kw, kw < 100 ? 1 : 0), 'кВт']);
    const energy = (kwh) => (kwh >= 1e6 ? [nf(kwh / 1e6, 2), 'ГВт·ч'] : kwh >= 1e5 ? [nf(kwh / 1e3, 1), 'МВт·ч'] : [nf(kwh), 'кВт·ч']);
    const money = (v) => {
      const a = Math.abs(v);
      const sign = v < 0 ? '−' : '';
      if (a >= 1e9) return `${sign}${nf(a / 1e9, a < 1e10 ? 2 : 1)} млрд`;
      if (a >= 1e6) return `${sign}${nf(a / 1e6, a < 1e8 ? 1 : 0)} млн`;
      return `${sign}${a >= 1e4 ? `${nf(a / 1e3)} тыс.` : nf(a)}`;
    };
    // «5,2 года», «5 лет»: a fraction takes the genitive singular
    const years = (y) => {
      const r = Math.round(y * 10) / 10;
      return [nf(r, 1), Number.isInteger(r) ? plural(r, ['год', 'года', 'лет']) : 'года'];
    };
    const out = (name) => $(`[data-out="${name}"]`);
    const setText = (name, text) => { const el = out(name); if (el && el.textContent !== text) el.textContent = text; };

    // Numbers follow the fields smoothly; where frames are not drawn (a hidden tab) they are set at once
    const tweens = new Map();
    const tween = (key, to, draw, ms = 420) => {
      const prev = tweens.get(key);
      if (prev) { cancelAnimationFrame(prev.raf); clearTimeout(prev.timer); }
      const from = prev ? prev.now : to;
      const item = { now: to };
      tweens.set(key, item);
      if (!prev || from === to || reduceMotion.matches || document.hidden) { draw(to); return; }
      item.now = from;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(Math.max((t - t0) / ms, 0), 1);
        item.now = p < 1 ? from + (to - from) * (1 - Math.pow(1 - p, 3)) : to;
        draw(item.now);
        if (p < 1) item.raf = requestAnimationFrame(step);
      };
      item.raf = requestAnimationFrame(step);
      item.timer = setTimeout(() => { if (item.now !== to) { cancelAnimationFrame(item.raf); item.now = to; draw(to); } }, ms + 120);
    };

    /* Scene: the field, the inverter and the house in one drawing */
    const narrow = window.matchMedia('(max-width: 640px)');
    const scene = $('[data-scene]', calc);
    const SCENES = {
      wide: { w: 1040, h: 330, inverter: [500, 0], home: [720, 0], ground: ['M0 270H1040'], wires: ['M430 270V306H610V270', 'M650 270V306H830V270'] },
      // Two floors for a narrow screen: the cable goes down to the inverter along the left edge
      tall: { w: 540, h: 650, inverter: [0, 320], home: [220, 320], ground: ['M0 270H540', 'M0 590H540'], wires: ['M430 270V300H22V626H110V590', 'M150 590V626H330V590'] },
    };
    let view = null;
    const drawScene = () => {
      const s = narrow.matches ? SCENES.tall : SCENES.wide;
      const wire = (d, i) => `<g class="flow__wire flow__wire--${i + 1}"><path class="flow__wire-base" d="${d}" pathLength="1"/><path class="flow__wire-charge" d="${d}" pathLength="1"/><path class="flow__pulse" d="${d}" pathLength="1"/></g>`;
      scene.innerHTML = `<svg class="art calc__art" viewBox="0 0 ${s.w} ${s.h}" focusable="false">`
        + `<g class="art__g art__g--base">${s.ground.map((d) => `<path class="l3" d="${d}" pathLength="1" style="--p:0"/>`).join('')}</g>`
        + ART.field({ bare: true })
        + '<g class="calc__dim"><path d="M190 78V52"/><path class="calc__dim-line" d="M190 60h1"/><path d="M186 64l8-8"/>'
        + '<g class="calc__dim-end"><path d="M190 78V52"/><path d="M186 64l8-8"/></g></g>'
        + `<g transform="translate(${s.inverter})">${ART.inverters({ bare: true })}</g>`
        + `<g transform="translate(${s.home})">${ART.home({ bare: true })}</g>`
        + s.wires.map(wire).join('')
        + '</svg>'
        + `<p class="calc__tag calc__tag--s" style="--y:${(50 / s.h * 100).toFixed(2)}">S = <b></b></p>`
        + `<p class="calc__tag calc__tag--h" style="--x:${(138 / s.w * 100).toFixed(2)};--y:${(150 / s.h * 100).toFixed(2)}">H = <b>${nf(cfg.insolation, 2)}</b> ч/день</p>`;
      view = { s, cells: $$('.art__cell', scene), wins: $$('.art__win', scene), dim: $('.calc__dim', scene), tag: $('.calc__tag--s', scene), shown: 0 };
    };
    const paintScene = ({ areaPos, area, cover }, wait = 0) => {
      const { s, cells, wins, dim, tag } = view;
      const n = Math.max(1, Math.round(areaPos * cells.length));
      const gap = Math.min(28, 560 / Math.max(Math.abs(n - view.shown), 1));
      cells.forEach((cell, i) => {
        const on = i < n;
        if (cell.classList.contains('is-on') === on) return;
        cell.style.setProperty('--dl', `${Math.round(wait + (on ? i - view.shown : view.shown - 1 - i) * gap)}ms`);
        cell.classList.toggle('is-on', on);
      });
      view.shown = n;
      const cols = Math.ceil(n / FIELD.rows);
      dim.style.setProperty('--w', cols * FIELD.step);
      tag.style.setProperty('--x', ((190 + cols * FIELD.step / 2) / s.w * 100).toFixed(2));
      tag.lastElementChild.textContent = `${nf(area)} м²`;
      // Windows of the house: how much of the consumption the station covers
      const lit = cover >= .95 ? 3 : cover >= .55 ? 2 : cover >= .15 ? 1 : 0;
      wins.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    };
    // The current runs in a short burst after every change
    let liveTimer = null;
    const runCurrent = (ms = 2400) => {
      if (reduceMotion.matches) return;
      scene.classList.add('is-live');
      clearTimeout(liveTimer);
      liveTimer = setTimeout(() => scene.classList.remove('is-live'), ms);
    };

    /* Payback chart: the balance line crosses the horizon in the year the station pays for itself */
    const chartBox = $('[data-chart]');
    const CHARTS = {
      wide: { w: 1400, h: 380, x0: 8, x1: 1392, y0: 252, up: 212, down: 76 },
      narrow: { w: 600, h: 400, x0: 6, x1: 594, y0: 262, up: 214, down: 84 },
    };
    let chart = null;
    const drawChart = () => {
      const c = narrow.matches ? CHARTS.narrow : CHARTS.wide;
      const life = cfg.lifetime;
      const x = (year) => +(c.x0 + (c.x1 - c.x0) * year / life).toFixed(1);
      const marks = Array.from({ length: Math.floor(life / 5) + 1 }, (_, i) => i * 5);
      const bottom = c.y0 + c.down + 12;
      const rays = [-150, -120, -90, -60, -30].map((deg) => {
        const a = deg * Math.PI / 180;
        return `M${(Math.cos(a) * 17).toFixed(1)} ${(Math.sin(a) * 17).toFixed(1)}L${(Math.cos(a) * 25).toFixed(1)} ${(Math.sin(a) * 25).toFixed(1)}`;
      }).join('');
      chartBox.innerHTML = `<svg class="pchart__svg" viewBox="0 0 ${c.w} ${c.h}" aria-hidden="true" focusable="false">`
        + '<defs><pattern id="pchart-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path class="pchart__hatch" d="M0 0V8"/></pattern>'
        + '<linearGradient id="pchart-gain" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#10a84e" stop-opacity=".4"/><stop offset="1" stop-color="#10a84e" stop-opacity=".05"/></linearGradient></defs>'
        + `<path class="pchart__grid" d="${marks.map((y) => `M${x(y)} ${c.y0 - c.up}V${bottom}`).join('')}M${c.x0} ${bottom}H${c.x1}"/>`
        + '<path class="pchart__debt" fill="url(#pchart-hatch)"/><path class="pchart__gain" fill="url(#pchart-gain)"/>'
        + `<path class="pchart__axis" d="M${c.x0} ${c.y0}H${c.x1}"/>`
        + '<path class="pchart__line" pathLength="1"/>'
        + '<circle class="pchart__dot" r="4.5"/><circle class="pchart__dot pchart__dot--end" r="4.5"/>'
        + `<g class="pchart__sun"><g class="pchart__sun-in"><path class="pchart__halo" d="M-34 0A34 34 0 0 1 34 0Z"/><path class="pchart__rays" d="${rays}"/><path class="pchart__core" d="M-11 0A11 11 0 0 1 11 0Z"/></g></g>`
        + '</svg>'
        + marks.map((y, i) => `<span class="pchart__year" style="--x:${(x(y) / c.w * 100).toFixed(2)};--y:${((bottom + 10) / c.h * 100).toFixed(2)}" aria-hidden="true">${i === marks.length - 1 ? `${y} ${plural(y, ['год', 'года', 'лет'])}` : y}</span>`).join('')
        + '<p class="pchart__mark" aria-hidden="true"></p>';
      const [start, end] = $$('.pchart__dot', chartBox);
      chart = { c, start, end, line: $('.pchart__line', chartBox), debt: $('.pchart__debt', chartBox), gain: $('.pchart__gain', chartBox), sun: $('.pchart__sun', chartBox), mark: $('.pchart__mark', chartBox) };
    };
    // r — the payback term as a share of the service life; the line turns around the crossing point
    const paintChart = (r) => {
      const { c, start, end, line, debt, gain, sun, mark } = chart;
      const pays = r < 1;
      const k = 1 / r - 1; // the balance at the end of the service life, in investments
      const unit = k > 0 ? Math.min(c.down, c.up / k) : c.down;
      const y1 = +(c.y0 + unit).toFixed(1);
      const y2 = +(c.y0 - unit * k).toFixed(1);
      const xc = +(c.x0 + (c.x1 - c.x0) * Math.min(r, 1)).toFixed(1);
      line.setAttribute('d', `M${c.x0} ${y1}L${c.x1} ${y2}`);
      debt.setAttribute('d', pays ? `M${c.x0} ${c.y0}V${y1}L${xc} ${c.y0}Z` : `M${c.x0} ${c.y0}V${y1}L${c.x1} ${y2}V${c.y0}Z`);
      gain.setAttribute('d', pays ? `M${xc} ${c.y0}L${c.x1} ${y2}V${c.y0}Z` : '');
      start.setAttribute('cx', c.x0); start.setAttribute('cy', y1);
      end.setAttribute('cx', c.x1); end.setAttribute('cy', y2);
      sun.setAttribute('transform', `translate(${xc} ${c.y0})`);
      sun.classList.toggle('is-off', !pays);
      mark.classList.toggle('is-off', !pays);
      mark.style.setProperty('--x', (xc / c.w * 100).toFixed(2));
      mark.style.setProperty('--y', ((c.y0 - 44) / c.h * 100).toFixed(2));
      mark.textContent = years(r * cfg.lifetime).join(' ');
    };

    /* Fields */
    const state = {};
    const fields = {};
    ['consumption', 'tariff', 'area'].forEach((key) => {
      const box = $(`[data-field="${key}"]`, calc);
      const f = cfg.fields[key];
      const num = $('.calc__num', box);
      const range = $('.calc__range', box);
      const unit = $('.calc__unit', box).textContent;
      // Wide ranges are laid on the slider logarithmically: a house and a plant both get room on it
      const log = f.max / f.min > 50;
      const span = log ? Math.log(f.max / f.min) : f.max - f.min;
      const toPos = (v) => (log ? Math.log(v / f.min) : v - f.min) / span;
      const toValue = (t) => (log ? f.min * Math.exp(t * span) : f.min + t * span);
      // The slider gives round numbers: the step of the field, or two significant digits
      const round = (v) => {
        const m = f.step || Math.pow(10, Math.max(Math.floor(Math.log10(v)) - 1, 0));
        return Math.round(v / m) * m;
      };
      const clamp = (v) => Math.min(Math.max(v, f.min), f.max);
      const set = (v, from) => {
        state[key] = clamp(v);
        const pos = toPos(state[key]);
        if (from !== 'range') range.value = Math.round(pos * 1000);
        range.style.setProperty('--fill', `${(pos * 100).toFixed(1)}%`);
        range.setAttribute('aria-valuetext', `${nf(state[key])} ${unit}`);
        if (from !== 'num') num.value = nf(state[key]);
      };
      fields[key] = { set, pos: () => toPos(state[key]) };
      $('.calc__hint', box).innerHTML = `<span>от ${nf(f.min)}</span><span>до ${nf(f.max)} ${unit.replace(' за кВт·ч', '')}</span>`;

      range.addEventListener('input', () => { set(round(toValue(range.value / 1000)), 'range'); update(); });
      // From the keyboard one press is one round step, so every press changes the number
      range.addEventListener('keydown', (e) => {
        const dir = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
        if (!dir) return;
        e.preventDefault();
        const v = state[key];
        const m = f.step || Math.pow(10, Math.max(Math.floor(Math.log10(dir > 0 ? v : v - 1)) - 1, 0));
        set(Math.round(v / m) * m + dir * m);
        update();
      });
      num.addEventListener('input', () => {
        const v = parseFloat(num.value.replace(/[^\d.,]/g, '').replace(',', '.'));
        if (!Number.isFinite(v) || v <= 0) return;
        set(v, 'num');
        update();
      });
      num.addEventListener('focus', () => num.select());
      num.addEventListener('blur', () => {
        const typed = parseFloat(num.value.replace(/[^\d.,]/g, '').replace(',', '.'));
        // The hint under the field turns red for a moment when the number had to be brought into the range
        if (Number.isFinite(typed) && typed !== clamp(typed)) {
          box.classList.add('is-fixed');
          setTimeout(() => box.classList.remove('is-fixed'), 2400);
        }
        num.value = nf(state[key]);
      });
      num.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); num.blur(); } });
      set(f.value);
    });
    $('.calc__panel', calc).addEventListener('submit', (e) => e.preventDefault());

    const presets = $$('[data-preset]', calc);
    // The type of object is a starting point: it stays chosen when the fields are changed by hand
    const choosePreset = (btn) => presets.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    presets.forEach((btn) => btn.addEventListener('click', () => {
      const p = cfg.presets[btn.dataset.preset];
      if (!p) return;
      Object.keys(fields).forEach((key) => { if (p[key]) fields[key].set(p[key]); });
      choosePreset(btn);
      update();
    }));

    // The area that gives exactly what the object consumes in a year
    const fit = $('[data-fit]', calc);
    const fitArea = () => {
      const f = cfg.fields.area;
      const s = state.consumption * 12 / (cfg.insolation * 365 * cfg.kArea);
      const m = Math.pow(10, Math.max(Math.floor(Math.log10(s)) - 1, 0));
      return Math.min(Math.max(Math.floor(s / m) * m, f.min), f.max);
    };
    $('button', fit).addEventListener('click', () => {
      fields.area.set(fitArea());
      update();
      $('#calc-area', calc).focus({ preventScroll: true });
    });

    /* The calculation itself */
    let sayTimer = null;
    const update = ({ wait = 0 } = {}) => {
      const S = state.area;
      const P = S * cfg.kArea;                              // мощность станции, кВт
      const E = P * cfg.insolation * 365;                   // выработка за год, кВт·ч
      const need = state.consumption * 12;
      const saving = Math.min(E, need) * state.tariff;      // в экономию идёт только энергия, которую объект использует сам
      const invest = P * cfg.costPerKw;
      const payback = saving > 0 ? invest / saving : Infinity;
      const profit = saving * cfg.lifetime - invest;
      const cover = E / need;
      const pays = payback < cfg.lifetime;
      const lifeText = `${cfg.lifetime} ${plural(cfg.lifetime, ['год', 'года', 'лет'])}`;

      tween('power', P, (v) => { const [n, u] = power(v); setText('power', n); setText('power-unit', u); });
      tween('energy', E, (v) => { const [n, u] = energy(v); setText('energy', n); setText('energy-unit', u); });
      const showPayback = (v) => {
        const [n, u] = v < 100 ? years(v) : ['100+', 'лет'];
        setText('payback', n);
        setText('payback-unit', u);
      };
      if (payback < 100) tween('payback', payback, showPayback);
      else { tweens.delete('payback'); showPayback(payback); }
      setText('power-formula', `P = ${nf(S)} м² × ${nf(cfg.kArea, 3)}`);
      const panels = Math.ceil(P * 1000 / cfg.panelWatt);
      setText('power-note', `≈ ${nf(panels)} ${plural(panels, ['панель', 'панели', 'панелей'])} по ${nf(cfg.panelWatt)} Вт`);
      setText('energy-formula', `E = ${power(P).join(' ')} × ${nf(cfg.insolation, 2)} ч × 365 дней`);
      setText('energy-note', cover >= 1 ? 'покрывает всё ваше потребление' : `${Math.max(Math.round(cover * 100), 1)}% вашего потребления`);
      setText('payback-formula', `${money(invest)} ÷ ${money(saving)} ${cfg.currency} в год`);

      setText('invest', `${money(invest)} ${cfg.currency}`);
      setText('saving', `${money(saving)} ${cfg.currency}`);
      setText('profit', `${money(profit)} ${cfg.currency}`);
      setText('lifetime', lifeText);
      setText('pb-title', pays ? `Станция окупится за ${years(payback).join(' ')}` : `Станция не окупится за ${lifeText}`);
      setText('pb-sub', pays ? `и ещё ${years(cfg.lifetime - payback).join(' ')} работает в плюс` : 'уменьшите площадь под панели');
      out('profit').parentElement.classList.toggle('is-loss', profit < 0);
      out('pb-hint').hidden = cover <= 1;
      fit.classList.toggle('is-shown', cover > 1.15 && fitArea() < S);
      setText('fit', `${nf(fitArea())} м²`);

      paintScene({ areaPos: fields.area.pos(), area: S, cover }, wait);
      runCurrent();
      tween('chart', Math.min(payback / cfg.lifetime, 3), paintChart, 520);

      const brief = `${power(P).join(' ')}, ${nf(S)} м², ${nf(state.consumption)} кВт·ч в месяц`;
      $$('[data-calc-cta]').forEach((a) => { a.dataset.modalSubject = `Тема: расчёт станции ${brief}`; });
      chartBox.setAttribute('aria-label', pays
        ? `График окупаемости: вложения ${money(invest)} ${cfg.currency} возвращаются за ${years(payback).join(' ')}, выгода за ${cfg.lifetime} лет — ${money(profit)} ${cfg.currency}`
        : `График окупаемости: за ${cfg.lifetime} лет службы вложения ${money(invest)} ${cfg.currency} не возвращаются`);
      // For a screen reader the result is said once the fields are left alone
      clearTimeout(sayTimer);
      sayTimer = setTimeout(() => setText('summary', `Мощность станции ${power(P).join(' ')}, выработка за год ${energy(E).join(' ')}, ${pays ? `срок окупаемости ${years(payback).join(' ')}` : 'станция не окупается'}`), 900);
    };

    drawScene();
    drawChart();
    narrow.addEventListener('change', () => { drawScene(); drawChart(); tweens.delete('chart'); update(); });

    // Switching on, once in view
    const switchOn = (el, intro) => {
      if (!('IntersectionObserver' in window) || reduceMotion.matches) { el.classList.add('is-on'); return; }
      const io = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        el.classList.add('is-on');
        if (intro) intro();
      }, { threshold: 0.3 });
      io.observe(el);
    };
    let started = false;
    switchOn(scene, () => {
      started = true;
      scene.classList.add('is-intro');
      setTimeout(() => runCurrent(1700), 2800);
      setTimeout(() => scene.classList.remove('is-intro'), 3400);
    });
    switchOn(chartBox);
    update({ wait: started || reduceMotion.matches ? 0 : 900 });
    clearTimeout(liveTimer);
    scene.classList.remove('is-live');
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
  const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // Резюме: какие файлы принимает форма отклика
  const FILE_RE = /\.(pdf|docx?|rtf)$/i;
  const FILE_MAX = 10 * 1024 * 1024;
  const fileError = (input) => {
    const file = input.files[0];
    if (!file) return input.required ? 'Прикрепите резюме' : '';
    if (!FILE_RE.test(file.name)) return 'Подойдёт файл PDF, DOC, DOCX или RTF';
    return file.size > FILE_MAX ? 'Файл больше 10 МБ — сожмите его и прикрепите снова' : '';
  };
  const empty = { tel: 'Укажите номер телефона', email: 'Укажите электронную почту' };
  const validateField = (input) => {
    const field = input.closest('.field');
    if (!field) return true;
    const err = field.querySelector('.field__error');
    const v = input.value.trim();
    let msg = '';
    if (input.type === 'file') msg = fileError(input);
    else if (input.required && !v) msg = empty[input.type] || 'Укажите ваше имя';
    else if (input.type === 'tel' && v && !PHONE_RE.test(v)) msg = 'Номер в формате +998 90 123-45-67';
    else if (input.type === 'email' && v && !MAIL_RE.test(v)) msg = 'Почта в формате name@example.com';
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
    const idle = label.textContent;

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
      label.textContent = idle;
      form.reset();
      status.innerHTML = `${icon('i-check')} Спасибо! Мы свяжемся с вами в течение рабочего дня.`;
      setTimeout(() => { status.textContent = ''; }, 6000);
      form.dispatchEvent(new CustomEvent('form:sent'));
    });
  });

  /* ---------- Application form: résumé and the answer after sending ---------- */
  const fileSize = (bytes) => (bytes < 1048576 ? `${Math.max(Math.round(bytes / 1024), 1)} КБ` : `${(bytes / 1048576).toFixed(1).replace('.', ',')} МБ`);
  $$('[data-drop]').forEach((drop) => {
    const input = $('input[type="file"]', drop);
    const name = $('[data-file-name]', drop);
    const hint = $('[data-file-hint]', drop);
    const clear = $('[data-file-clear]', drop);
    const idle = [name.textContent, hint.textContent];
    const paint = () => {
      const file = input.files[0];
      drop.classList.toggle('has-file', Boolean(file));
      name.textContent = file ? file.name : idle[0];
      hint.textContent = file ? fileSize(file.size) : idle[1];
      clear.hidden = !file;
      validateField(input);
    };
    input.addEventListener('change', paint);
    clear.addEventListener('click', () => { input.value = ''; paint(); input.focus(); });
    // A file can also be dropped onto the field
    ['dragenter', 'dragover'].forEach((type) => drop.addEventListener(type, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
    drop.addEventListener('dragleave', (e) => { if (!drop.contains(e.relatedTarget)) drop.classList.remove('is-over'); });
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('is-over');
      const file = e.dataTransfer.files[0];
      if (!file) return;
      const one = new DataTransfer();
      one.items.add(file);
      input.files = one.files;
      paint();
    });
    input.form.addEventListener('reset', () => setTimeout(paint));
  });
  $$('[data-apply]').forEach((form) => {
    const done = $('.apply-done', form.parentElement);
    form.addEventListener('form:sent', () => {
      form.hidden = true;
      form.parentElement.classList.add('is-sent');
      done.hidden = false;
      done.focus({ preventScroll: true });
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

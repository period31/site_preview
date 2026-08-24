const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const formatPrice = (value) =>
  `${new Intl.NumberFormat("ru-RU").format(value).replace(/\s/g, "\u00A0")}\u00A0₽`;

const menuCartStorageKey = "period-menu-cart";
const bouquetCartStorageKey = "period-bouquet-cart";
const orderDraftStorageKey = "period-order-draft";

const readStoredObject = (key) => {
  try {
    const savedValue = window.localStorage.getItem(key);
    const parsedValue = savedValue ? JSON.parse(savedValue) : {};
    return parsedValue && typeof parsedValue === "object" ? parsedValue : {};
  } catch {
    return {};
  }
};

const writeStoredObject = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in local previews.
  }
};

const readMenuCart = () => readStoredObject(menuCartStorageKey);
const readBouquetCart = () => readStoredObject(bouquetCartStorageKey);
const readOrderDraft = () => readStoredObject(orderDraftStorageKey);

const writeMenuCart = (cart) => {
  writeStoredObject(menuCartStorageKey, cart);
  updateCartIndicators();
};

const writeBouquetCart = (cart) => {
  writeStoredObject(bouquetCartStorageKey, cart);
  updateCartIndicators();
};

const writeOrderDraft = (draft) => {
  writeStoredObject(orderDraftStorageKey, draft);
};

const getDishCartId = (locationKey, sectionTitle, itemTitle) =>
  `${locationKey}::${sectionTitle}::${itemTitle}`;

const sumCartCounts = (cart) =>
  Object.values(cart).reduce(
    (total, count) => total + (Number.isFinite(count) ? count : 0),
    0,
  );

const getRoundCartButtonLabel = (count) => (count > 0 ? String(count) : "+");

const updateRoundCartButtonState = (button, count) => {
  button.textContent = getRoundCartButtonLabel(count);
  button.classList.toggle("is-added", count > 0);
  button.setAttribute("aria-pressed", String(count > 0));
};

const getTotalCartCount = () =>
  sumCartCounts(readMenuCart()) + sumCartCounts(readBouquetCart());

function updateCartIndicators() {
  const totalCount = getTotalCartCount();
  const displayCount = totalCount > 99 ? "99+" : String(totalCount);

  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = displayCount;
    badge.hidden = totalCount === 0;
  });

  document.querySelectorAll(".icon-link--cart").forEach((link) => {
    link.classList.toggle("has-items", totalCount > 0);
  });
}

updateCartIndicators();
window.addEventListener("storage", updateCartIndicators);

const bouquetCatalogSource = [
  {
    slug: "abrikosovyy-krem",
    title: "Абрикосовый крем",
    price: 4250,
    image: "assets/bouquets/catalog/abrikosovyy-krem.jpg",
    moods: ["tender", "classic"],
    palettes: ["pastel", "white"],
    occasions: ["gift", "event", "romantic"],
    popularity: 92,
  },
  {
    slug: "vanilnyy-sad",
    title: "Ванильный сад",
    price: 4450,
    image: "assets/bouquets/catalog/vanilnyy-sad.jpg",
    moods: ["airy", "classic"],
    palettes: ["white", "pastel"],
    occasions: ["everyday", "gift", "event"],
    popularity: 89,
  },
  {
    slug: "vanilnyy-svet",
    title: "Ванильный свет",
    price: 2850,
    image: "assets/bouquets/catalog/vanilnyy-svet.jpg",
    moods: ["airy", "tender"],
    palettes: ["white", "pastel"],
    occasions: ["everyday", "gift", "romantic"],
    popularity: 87,
  },
  {
    slug: "vesenniy-ritm",
    title: "Весенний ритм",
    price: 4350,
    image: "assets/bouquets/catalog/vesenniy-ritm.jpg",
    moods: ["bright", "tender"],
    palettes: ["pastel", "accent"],
    occasions: ["gift", "romantic", "event"],
    popularity: 84,
  },
  {
    slug: "vozdushnaya-simfoniya",
    title: "Воздушная симфония",
    price: 2650,
    image: "assets/bouquets/catalog/vozdushnaya-simfoniya.jpg",
    moods: ["airy", "tender"],
    palettes: ["pastel", "pink"],
    occasions: ["everyday", "gift", "romantic"],
    popularity: 85,
  },
  {
    slug: "goluboe-utro",
    title: "Голубое утро",
    price: 4650,
    image: "assets/bouquets/catalog/goluboe-utro.jpg",
    moods: ["bright", "airy"],
    palettes: ["accent", "white"],
    occasions: ["gift", "event", "everyday"],
    popularity: 80,
  },
  {
    slug: "zhemchuzhnyy-persik",
    title: "Жемчужный персик",
    price: 4500,
    image: "assets/bouquets/catalog/zhemchuzhnyy-persik.jpg",
    moods: ["tender", "classic"],
    palettes: ["pastel", "pink"],
    occasions: ["gift", "romantic", "event"],
    popularity: 88,
  },
  {
    slug: "zefirnaya-dymka",
    title: "Зефирная дымка",
    price: 8500,
    image: "assets/bouquets/catalog/zefirnaya-dymka.jpg",
    moods: ["tender", "classic"],
    palettes: ["pink", "pastel"],
    occasions: ["event", "gift", "romantic"],
    popularity: 74,
  },
  {
    slug: "kruzhevnaya-nezhnost",
    title: "Кружевная нежность",
    price: 6500,
    image: "assets/bouquets/catalog/kruzhevnaya-nezhnost.jpg",
    moods: ["airy", "classic"],
    palettes: ["white", "pastel"],
    occasions: ["gift", "event", "romantic"],
    popularity: 82,
  },
  {
    slug: "lavandovaya-nota",
    title: "Лавандовая нота",
    price: 4350,
    image: "assets/bouquets/catalog/lavandovaya-nota.jpg",
    moods: ["bright", "tender"],
    palettes: ["accent", "pastel"],
    occasions: ["gift", "romantic", "event"],
    popularity: 79,
  },
  {
    slug: "lilovoe-nastroenie",
    title: "Лиловое настроение",
    price: 4450,
    image: "assets/bouquets/catalog/lilovoe-nastroenie.jpg",
    moods: ["bright", "tender"],
    palettes: ["accent", "pink"],
    occasions: ["gift", "romantic", "event"],
    popularity: 78,
  },
  {
    slug: "luchezarnaya-lyubov",
    title: "Лучезарная любовь",
    price: 2850,
    image: "assets/bouquets/catalog/luchezarnaya-lyubov.jpg",
    moods: ["bright", "tender"],
    palettes: ["pastel", "pink"],
    occasions: ["gift", "romantic", "everyday"],
    popularity: 76,
  },
  {
    slug: "molochnaya-vual",
    title: "Молочная вуаль",
    price: 6500,
    image: "assets/bouquets/catalog/molochnaya-vual.jpg",
    moods: ["airy", "classic"],
    palettes: ["white", "pastel"],
    occasions: ["gift", "event", "everyday"],
    popularity: 81,
  },
  {
    slug: "myagkaya-gamma",
    title: "Мягкая гамма",
    price: 4350,
    image: "assets/bouquets/catalog/myagkaya-gamma.jpg",
    moods: ["classic", "tender"],
    palettes: ["pastel", "white"],
    occasions: ["everyday", "gift", "event"],
    popularity: 77,
  },
  {
    slug: "myatnoe-oblako",
    title: "Мятное облако",
    price: 2900,
    image: "assets/bouquets/catalog/myatnoe-oblako.jpg",
    moods: ["airy", "classic"],
    palettes: ["white", "accent"],
    occasions: ["everyday", "gift", "event"],
    popularity: 83,
  },
  {
    slug: "nebesnyy-aktsent",
    title: "Небесный акцент",
    price: 2650,
    image: "assets/bouquets/catalog/nebesnyy-aktsent.jpg",
    moods: ["bright", "airy"],
    palettes: ["accent", "white"],
    occasions: ["gift", "everyday", "romantic"],
    popularity: 75,
  },
  {
    slug: "pastelnyy-shtrikh",
    title: "Пастельный штрих",
    price: 2900,
    image: "assets/bouquets/catalog/pastelnyy-shtrikh.jpg",
    moods: ["airy", "tender"],
    palettes: ["pastel", "white"],
    occasions: ["everyday", "gift", "romantic"],
    popularity: 90,
  },
  {
    slug: "persikovaya-korzina",
    title: "Персиковая корзина",
    price: 8500,
    image: "assets/bouquets/catalog/persikovaya-korzina.jpg",
    moods: ["classic", "bright"],
    palettes: ["pink", "pastel"],
    occasions: ["event", "gift", "romantic"],
    popularity: 72,
  },
  {
    slug: "pionovyy-rumyanets",
    title: "Пионовый румянец",
    price: 2850,
    image: "assets/bouquets/catalog/pionovyy-rumyanets.jpg",
    moods: ["tender", "airy"],
    palettes: ["pink", "pastel"],
    occasions: ["romantic", "gift", "everyday"],
    popularity: 86,
  },
  {
    slug: "rozovaya-gran",
    title: "Розовая грань",
    price: 4500,
    image: "assets/bouquets/catalog/rozovaya-gran.jpg",
    moods: ["bright", "tender"],
    palettes: ["pink", "accent"],
    occasions: ["gift", "romantic", "event"],
    popularity: 73,
  },
  {
    slug: "rozovye-mechty",
    title: "Розовые мечты",
    price: 4850,
    image: "assets/bouquets/catalog/rozovye-mechty.jpg",
    moods: ["tender", "airy"],
    palettes: ["pink", "pastel"],
    occasions: ["gift", "romantic", "event"],
    popularity: 94,
  },
  {
    slug: "rozovyy-shelest",
    title: "Розовый шелест",
    price: 4350,
    image: "assets/bouquets/catalog/rozovyy-shelest.jpg",
    moods: ["tender", "bright"],
    palettes: ["pink", "pastel"],
    occasions: ["gift", "romantic", "event"],
    popularity: 84,
  },
  {
    slug: "rumyanaya-pastel",
    title: "Румяная пастель",
    price: 6500,
    image: "assets/bouquets/catalog/rumyanaya-pastel.jpg",
    moods: ["tender", "classic"],
    palettes: ["pink", "pastel"],
    occasions: ["gift", "event", "romantic"],
    popularity: 71,
  },
  {
    slug: "sadovyy-motiv",
    title: "Садовый мотив",
    price: 6500,
    image: "assets/bouquets/catalog/sadovyy-motiv.jpg",
    moods: ["classic", "airy"],
    palettes: ["white", "pastel"],
    occasions: ["event", "gift", "romantic"],
    popularity: 70,
  },
  {
    slug: "svezhaya-radost",
    title: "Свежая радость",
    price: 4350,
    image: "assets/bouquets/catalog/svezhaya-radost.jpg",
    moods: ["airy", "bright"],
    palettes: ["white", "pastel"],
    occasions: ["gift", "everyday", "romantic"],
    popularity: 78,
  },
  {
    slug: "svetlaya-svezhest",
    title: "Светлая свежесть",
    price: 9500,
    image: "assets/bouquets/catalog/svetlaya-svezhest.jpg",
    moods: ["airy", "classic"],
    palettes: ["white", "pastel"],
    occasions: ["event", "gift", "romantic"],
    popularity: 69,
  },
  {
    slug: "sirenevyy-vecher",
    title: "Сиреневый вечер",
    price: 4450,
    image: "assets/bouquets/catalog/sirenevyy-vecher.jpg",
    moods: ["bright", "tender"],
    palettes: ["accent", "pink"],
    occasions: ["gift", "romantic", "event"],
    popularity: 68,
  },
  {
    slug: "slivochnaya-gamma",
    title: "Сливочная гамма",
    price: 6500,
    image: "assets/bouquets/catalog/slivochnaya-gamma.jpg",
    moods: ["classic", "airy"],
    palettes: ["white", "pastel"],
    occasions: ["event", "gift", "everyday"],
    popularity: 67,
  },
  {
    slug: "slivochnyy-ton",
    title: "Сливочный тон",
    price: 4350,
    image: "assets/bouquets/catalog/slivochnyy-ton.jpg",
    moods: ["tender", "airy"],
    palettes: ["pastel", "white"],
    occasions: ["gift", "everyday", "romantic"],
    popularity: 91,
  },
  {
    slug: "slivochnyy-shepot",
    title: "Сливочный шепот",
    price: 6500,
    image: "assets/bouquets/catalog/slivochnyy-shepot.jpg",
    moods: ["tender", "classic"],
    palettes: ["pastel", "pink"],
    occasions: ["gift", "romantic", "event"],
    popularity: 88,
  },
  {
    slug: "solnechnaya-okhapka",
    title: "Солнечная охапка",
    price: 8500,
    image: "assets/bouquets/catalog/solnechnaya-okhapka.jpg",
    moods: ["bright", "classic"],
    palettes: ["pastel", "accent"],
    occasions: ["event", "gift", "everyday"],
    popularity: 66,
  },
  {
    slug: "teplyy-svet",
    title: "Тёплый свет",
    price: 4650,
    image: "assets/bouquets/catalog/teplyy-svet.jpg",
    moods: ["bright", "tender"],
    palettes: ["pastel", "pink"],
    occasions: ["event", "gift", "romantic"],
    popularity: 74,
  },
  {
    slug: "tonkaya-zabota",
    title: "Тонкая забота",
    price: 6500,
    image: "assets/bouquets/catalog/tonkaya-zabota.jpg",
    moods: ["classic", "tender"],
    palettes: ["white", "pastel"],
    occasions: ["gift", "event", "everyday"],
    popularity: 65,
  },
  {
    slug: "frantsuzskiy-desert",
    title: "Французский десерт",
    price: 15000,
    image: "assets/bouquets/catalog/frantsuzskiy-desert.jpg",
    moods: ["classic", "bright"],
    palettes: ["pastel", "pink"],
    occasions: ["event", "gift", "romantic"],
    popularity: 63,
  },
  {
    slug: "yagodnyy-iney",
    title: "Ягодный иней",
    price: 9500,
    image: "assets/bouquets/catalog/yagodnyy-iney.jpg",
    moods: ["bright", "classic"],
    palettes: ["accent", "pink"],
    occasions: ["event", "gift", "romantic"],
    popularity: 64,
  },
];

const bouquetCatalog = Array.from(
  bouquetCatalogSource.reduce((map, item) => {
    if (!map.has(item.slug)) {
      map.set(item.slug, item);
    }
    return map;
  }, new Map()).values(),
);

const formatRubles = (value) =>
  `${new Intl.NumberFormat("ru-RU").format(value).replace(/\s/g, "\u00A0")}\u00A0₽`;

const belgorodMenuSections = [
  {
    key: "breakfast",
    title: "Завтраки классика",
    description: "Базовые любимые позиции, с которых чаще всего начинают утро в точке на Губкина.",
    items: [
      { title: "Яйца пашот на тосте с форелью", description: "Подача с форелью и соусом. Есть более лёгкий вариант с беконом.", note: "Вариант с беконом — 450 ₽", price: 610, tag: "хит", image: "assets/menu/eggs-pashot-toast.jpg" },
      { title: "Круассан с форелью и авокадо", description: "Слоёный круассан, форель, авокадо и свежий зелёный акцент.", price: 570, tag: "утро", image: "assets/menu/croissant-trout-avocado.jpg" },
      { title: "Шакшука с йогуртом и тостом", description: "Томаты, специи, нежный йогурт и хрустящий тост.", price: 490, tag: "сытно", image: "assets/menu/shakshuka-yogurt-toast.jpg" },
      { title: "Авокадо-тост", description: "Лёгкая позиция с кремовой текстурой и аккуратной подачей.", price: 490, tag: "классика", image: "assets/menu/avocado-toast-menu.jpg" },
      { title: "Сырники из сливочного сыра с йогуртом и чёрной смородиной", description: "Нежные сырники со свежей ягодной подачей.", price: 420, tag: "сладко", image: "assets/menu/syrniki-currant.jpg" },
      { title: "Круассан с ростбифом и соусом ромеско", description: "Слоёное тесто, ростбиф, соус ромеско и зелёный микс.", price: 550, tag: "ланч", image: "assets/menu/croissant-roastbeef-romesco.jpg" },
      { title: "Блины с форелью и песто", description: "Нежные блины с форелью и травяным песто.", price: 550, tag: "фирменное", image: "assets/menu/bliny-trout-pesto.jpg" },
      { title: "Блины с фисташкой и малиной", description: "Десертный завтрак с фисташковым акцентом и ягодой.", price: 350, tag: "сладко", image: "assets/menu/bliny-pistachio-raspberry.jpg" }
    ]
  },
  {
    key: "breakfast",
    title: "Каши",
    description: "Спокойные утренние позиции для тех, кто хочет мягкий и понятный старт дня.",
    items: [
      { title: "Овсяная каша с фисташкой и малиной", description: "Тёплая овсяная каша с ягодной свежестью и ореховым акцентом.", price: 320, tag: "утро", image: "assets/menu/oatmeal-pistachio-raspberry.jpg" },
      { title: "Рисовая каша на кокосовом молоке с лимонным мармеладом", description: "Нежная рисовая текстура, кокосовая база и цитрусовая нота.", price: 350, tag: "нежно", image: "assets/menu/rice-coconut-lemon.jpg" },
      { title: "Киноа с курицей и песто", description: "Тёплая каша с более сытной подачей и зелёным песто.", price: 420, tag: "сытно", image: "assets/menu/quinoa-chicken-pesto.jpg" }
    ]
  },
  {
    key: "mains",
    title: "Лёгкие завтраки",
    description: "Более собранные позиции для позднего завтрака, встречи или лёгкого обеда.",
    items: [
      { title: "Креветки с хрустящими овощами и лимонным кимчи", description: "Свежая композиция с ярким лимонным акцентом.", price: 450, tag: "свежо", image: "assets/menu/shrimp-crispy-veg-kimchi.jpg" },
      { title: "Гребешок, авокадо, арахисовый соус", description: "Мягкий гребешок, кремовый авокадо и выразительный соус.", price: 670, tag: "авторское", image: "assets/menu/scallop-avocado-peanut.jpg" },
      { title: "Салат с ростбифом и мухаммарой", description: "Плотный салат с мясным акцентом и пряным соусом.", price: 650, tag: "ланч", image: "assets/menu/salad-roastbeef.jpg" },
      { title: "Салат PERIOD", description: "Черри, вяленый виноград и аккуратный фирменный баланс вкусов.", price: 480, tag: "фирменное", image: "assets/menu/salad-period.jpg" },
      { title: "Форель, киноа, шпинат", description: "Сытная рыба с зеленью и тёплой злаковой основой.", price: 560, tag: "баланс", image: "assets/menu/trout-quinoa-spinach.jpg" }
    ]
  },
  {
    key: "mains",
    title: "Едим ложкой",
    description: "Сезонные и домашние позиции, которые удобно брать на обед.",
    items: [
      { title: "Окрошка с ростбифом", description: "Прохладная окрошка с плотным мясным акцентом.", price: 550, tag: "сезон", image: "assets/menu/okroshka-roastbeef.jpg" },
      { title: "Окрошка с форелью", description: "Освежающая подача с деликатной рыбой.", price: 550, tag: "сезон", image: "assets/menu/okroshka-trout.jpg" },
      { title: "Окрошка с креветками", description: "Более яркая морская версия летней позиции.", price: 550, tag: "сезон", image: "assets/menu/okroshka-shrimp.jpg" },
      { title: "Куриный бульон с яичной лапшой", description: "Домашний бульон с мягкой и понятной подачей.", price: 420, tag: "комфорт", image: "assets/menu/chicken-broth-noodles.jpg" }
    ]
  },
  {
    key: "mains",
    title: "Основные завтраки",
    description: "Более основательные блюда для длинного завтрака или обеда.",
    items: [
      { title: "Куриное филе с зелёной фасолью и кукурузным соусом", description: "Плотная подача с зелёной фасолью и мягким сливочным акцентом.", price: 610, tag: "основное", image: "assets/menu/chicken-beans-corn.jpg" },
      { title: "Форель с молодым горошком и мятой", description: "Более торжественная рыбная позиция с зелёной свежестью.", price: 920, tag: "премиум", image: "assets/menu/trout-peas-mint.jpg" },
      { title: "Орзо с жареным гребешком и пармезаном", description: "Тёплая паста-орзо с деликатным морским вкусом.", price: 720, tag: "авторское", image: "assets/menu/orzo-scallop-parmesan.jpg" },
      { title: "Свиная вырезка с вяленым виноградом", description: "Мясная позиция с нетривиальным сладковатым акцентом.", price: 620, tag: "основное", image: "assets/menu/pork-dried-grapes.jpg" }
    ]
  },
  {
    key: "desserts",
    title: "Десерты",
    description: "Витрина сладкого для кофе, встречи и красивого завершения визита.",
    items: [
      { title: "Макаронсы", description: "Ассорти вкусов в фирменной витрине.", note: "Лимон-личи, малина-кокос и другие вкусы · 1 шт.", price: 150, tag: "витрина", image: "assets/menu/macarons-period.jpg" },
      { title: "Медовик", description: "Мягкий медовый десерт с нежным кремом.", price: 300, tag: "классика", image: "assets/menu/medovik-menu.jpg" },
      { title: "Баскский шоколадный чизкейк", description: "Плотный шоколадный вкус и бархатная текстура.", price: 340, tag: "шоколад", image: "assets/menu/chocolate-basque-cheesecake.jpg" },
      { title: "Лимон-мята", description: "Лёгкий цитрусовый десерт со свежей нотой.", price: 340, tag: "свежо", image: "assets/menu/lemon-mint-dessert.jpg" },
      { title: "Шоколад-фундук", description: "Насыщенный шоколадный десерт с ореховым акцентом.", price: 350, tag: "хит", image: "assets/menu/chocolate-hazelnut-dessert.jpg" },
      { title: "Анна Павлова", description: "Воздушная текстура, крем и ягоды.", price: 350, tag: "воздушно", image: "assets/menu/anna-pavlova-dessert.jpg" },
      { title: "Черничный тарт", description: "Аккуратный тарт с выраженным ягодным вкусом.", price: 360, tag: "ягоды", image: "assets/menu/blueberry-tart-dessert.jpg" },
      { title: "Чиа-пудинг манго-маракуйя", description: "Лёгкий десерт с тропическим вкусом и мягкой текстурой.", price: 250, tag: "лёгкий", image: "assets/menu/chia-pudding-mango.jpg" }
    ]
  },
  {
    key: "drinks",
    title: "Авторский кофе",
    description: "Холодные и фирменные кофейные позиции, за которыми приходят отдельно.",
    items: [
      { title: "Айс-латте карамель", description: "Охлаждённый латте с карамельной ноткой.", price: 280, tag: "cold" },
      { title: "Бамбл-кофе", description: "Яркий кофейно-цитрусовый напиток.", price: 300, tag: "signature" },
      { title: "Пина колада", description: "Десертный кофейный напиток с мягкой сладостью.", price: 300, tag: "sweet" },
      { title: "Фраппучино", description: "Холодный кофейный напиток со сливочной текстурой.", price: 300, tag: "cold" },
      { title: "Латте-макиато миндаль-карамель", description: "Мягкий латте с миндально-карамельным акцентом.", note: "350 мл", price: 280, tag: "350 мл" },
      { title: "Латте солёная карамель", description: "Классический баланс сладкого и солоноватого вкуса.", note: "350 мл", price: 280, tag: "350 мл" },
      { title: "Капучино с халвой", description: "Капучино с насыщенной халвичной нотой.", note: "350 мл", price: 280, tag: "350 мл" },
      { title: "Ирландский кофе", description: "Тёплый фирменный кофе с характером.", note: "350 мл", price: 280, tag: "350 мл" },
      { title: "Сырный раф", description: "Сливочный раф с более плотным вкусом.", note: "350 мл", price: 300, tag: "раф" },
      { title: "Раф орех-карамель", description: "Орехово-карамельный профиль в мягкой сливочной подаче.", note: "350 мл", price: 280, tag: "раф" },
      { title: "Шоколадный фраппучино", description: "Холодный шоколадный напиток на кофейной основе.", note: "350 мл", price: 300, tag: "cold" }
    ]
  },
  {
    key: "drinks",
    title: "Кофе классика",
    description: "Базовая кофейная карта для тех, кто любит понятные позиции без лишнего.",
    items: [
      { title: "Эспрессо", description: "Короткий насыщенный кофе.", note: "30 мл", price: 130, tag: "classic" },
      { title: "Американо", description: "Чистый кофейный вкус на каждый день.", note: "250 мл — 150 ₽ · 350 мл — 170 ₽", price: 150, tag: "classic" },
      { title: "Капучино", description: "Молочный кофе с плотной пеной.", note: "250 мл — 200 ₽ · 350 мл — 230 ₽", price: 200, tag: "classic" },
      { title: "Латте", description: "Более мягкий и сливочный кофейный профиль.", note: "250 мл — 200 ₽ · 350 мл — 230 ₽", price: 200, tag: "classic" },
      { title: "Моккачино", description: "Кофе с шоколадным акцентом.", note: "250 мл — 230 ₽ · 350 мл — 250 ₽", price: 230, tag: "classic" },
      { title: "Раф", description: "Нежный сливочный кофе без дополнительных вкусов.", note: "250 мл — 240 ₽ · 350 мл — 260 ₽", price: 240, tag: "classic" }
    ]
  },
  {
    key: "drinks",
    title: "Авторский чай",
    description: "Яркие фруктово-ягодные сочетания для тёплой подачи.",
    items: [
      { title: "Облепиха-лимон", description: "Тёплый чай с яркой кислотностью и ягодным телом.", note: "350 мл — 250 ₽ · 600 мл — 350 ₽", price: 250, tag: "чай" },
      { title: "Малина-мёд", description: "Мягкий ягодный вкус с медовой глубиной.", note: "350 мл — 250 ₽ · 600 мл — 350 ₽", price: 250, tag: "чай" },
      { title: "Вишня-апельсин", description: "Согревающий чай с ярким фруктовым профилем.", note: "350 мл — 250 ₽ · 600 мл — 350 ₽", price: 250, tag: "чай" },
      { title: "Клюква-брусника", description: "Ягодный чай с более плотной и насыщенной нотой.", note: "350 мл — 250 ₽ · 600 мл — 350 ₽", price: 250, tag: "чай" },
      { title: "Имбирь-лимон", description: "Тёплая цитрусовая классика с имбирной остротой.", note: "350 мл — 250 ₽ · 600 мл — 350 ₽", price: 250, tag: "чай" }
    ]
  },
  {
    key: "drinks",
    title: "Листовой чай",
    description: "Спокойная чайная база для тех, кто любит чистый вкус.",
    items: [
      { title: "Травяной чай", description: "Лёгкий растительный сбор без кофейной горечи.", note: "350 мл — 160 ₽ · 500 мл — 300 ₽", price: 160, tag: "листовой" },
      { title: "Липовый цвет", description: "Мягкий ароматный чай с цветочной нотой.", note: "350 мл — 160 ₽ · 500 мл — 300 ₽", price: 160, tag: "листовой" },
      { title: "Молочный улун", description: "Улун с мягким сливочным послевкусием.", note: "350 мл — 160 ₽ · 500 мл — 300 ₽", price: 160, tag: "листовой" },
      { title: "Ассам", description: "Классический чёрный чай с плотным вкусом.", note: "350 мл — 160 ₽ · 500 мл — 300 ₽", price: 160, tag: "листовой" },
      { title: "Каркаде", description: "Яркий напиток с выраженной ягодной кислотностью.", note: "350 мл — 160 ₽ · 500 мл — 300 ₽", price: 160, tag: "листовой" }
    ]
  },
  {
    key: "drinks",
    title: "Лимонады",
    description: "Холодные фруктовые позиции для тёплого дня.",
    items: [
      { title: "Персик-жасмин", description: "Мягкий фруктовый лимонад с цветочной нотой.", price: 250, tag: "cold", image: "assets/menu/lemonade-peach-jasmine.png" },
      { title: "Вишня-ананас", description: "Более яркий и сочный лимонад с фруктовой кислотностью.", price: 250, tag: "cold", image: "assets/menu/lemonade-cherry-pineapple.jpg" },
      { title: "Клубника-базилик", description: "Свежий ягодный вкус с травяной нотой.", price: 250, tag: "cold", image: "assets/menu/lemonade-strawberry-basil.jpg" },
      { title: "Мохито", description: "Освежающая цитрусово-мятная подача.", price: 250, tag: "cold", image: "assets/menu/lemonade-mojito.jpg" },
      { title: "Черничный мохито", description: "Мохито с ягодным черничным оттенком.", price: 250, tag: "cold", image: "assets/menu/lemonade-blueberry-mojito.jpg" }
    ]
  },
  {
    key: "drinks",
    title: "Не кофе",
    description: "Тёплые позиции для тех, кто хочет насыщенный вкус без эспрессо.",
    items: [
      { title: "Швейцарский какао", description: "Классический какао с плотной шоколадной основой.", note: "350 мл", price: 230, tag: "350 мл" },
      { title: "Сырный какао", description: "Более сливочная версия какао с мягкой сырной нотой.", note: "350 мл", price: 260, tag: "350 мл" },
      { title: "Горячий шоколад", description: "Плотный шоколадный напиток для прохладного дня.", note: "350 мл", price: 230, tag: "350 мл" },
      { title: "Ореховый шоколад со взбитыми сливками", description: "Шоколадный напиток с десертной подачей.", note: "350 мл", price: 260, tag: "350 мл" }
    ]
  },
  {
    key: "drinks",
    title: "Молочные коктейли",
    description: "Сладкие холодные позиции с мягкой текстурой.",
    items: [
      { title: "Клубника-банан", description: "Классический молочный коктейль с ягодным вкусом.", price: 280, tag: "shake", image: "assets/menu/milkshake-strawberry-banana.jpg" },
      { title: "Фисташка", description: "Плотный коктейль с ореховой сладостью.", price: 300, tag: "shake", image: "assets/menu/milkshake-pistachio.jpg" }
    ]
  },
  {
    key: "drinks",
    title: "Смузи",
    description: "Фруктовые позиции для лёгкого и свежего выбора.",
    items: [
      { title: "Клубника-банан", description: "Мягкий фруктовый смузи на каждый день.", price: 280, tag: "smoothie", image: "assets/menu/smoothie-strawberry-banana.jpg" },
      { title: "Малина-кокос", description: "Более десертный смузи с кокосовой нотой.", price: 300, tag: "smoothie", image: "assets/menu/smoothie-raspberry-coconut.jpg" }
    ]
  }
];

const menuLocations = {
  belgorod: {
    eyebrow: "Локация · Белгород",
    title: "PERIOD · Губкина",
    lead: "Полная версия меню с Губкина: завтраки, основные позиции, десерты и большая карта напитков.",
    address: "ул. Губкина, 54, корп. 1",
    hours: "8:00 — 22:00",
    format: "Полное меню · Десерты · Кофе · Цветы",
    image: "assets/menu/eggs-pashot-toast.jpg",
    badges: ["Самый полный состав", "Горячее и десерты", "Кофейная карта шире"],
    sections: belgorodMenuSections
  },
  severny: {
    eyebrow: "Локация · Северный",
    title: "PERIOD · Северный",
    lead: "В Северном меню собрано вокруг завтраков, сэндвичей и большой кофейной карты. Всё, что читается по фото этой точки, я вынес в реальные позиции.",
    address: "Олимпийская ул., 4Б",
    hours: "8:00 — 21:00",
    format: "Завтраки · Сэндвичи · Кофе",
    image: "assets/menu/shakshuka-yogurt-toast.jpg",
    badges: ["Завтраки весь день", "Сэндвичи и брускетты", "Большая карта напитков"],
    sections: [
      { key: "breakfast", title: "Завтраки", description: "Завтраки, которые можно взять утром, днём и с собой.", items: [ { title: "Яичница с колбаской", description: "Яйца, баварская колбаска, помидор, маринованный огурчик и зерновой хлеб.", note: "10–12 минут", price: 320, tag: "завтрак" }, { title: "Омлет с ветчиной", description: "Сытный омлет для спокойного понятного завтрака.", price: 320, tag: "завтрак" }, { title: "Шакшука", description: "Томатный завтрак с ярким вкусом и пряной подачей.", price: 310, tag: "завтрак" }, { title: "Шакшука с колбаской", description: "Более плотная версия шакшуки для сытного старта дня.", price: 380, tag: "завтрак" }, { title: "Овсяная каша", description: "Овсяная каша со свежими ягодами.", note: "12–15 минут", price: 300, tag: "каша" }, { title: "Рисовая каша с манго", description: "Рисовая каша с мягким фруктовым акцентом.", price: 310, tag: "каша" }, { title: "Рисовая каша с карамелью", description: "Более десертная версия рисовой каши.", price: 300, tag: "каша" }, { title: "Сырники", description: "Нежные сырники для спокойного сладкого завтрака.", price: 320, tag: "сладко" } ] },
      { key: "mains", title: "Сэндвичи и брускетты", description: "Плотные позиции, которые удобно взять с кофе или как быстрый перекус.", items: [ { title: "Царский с сёмгой", description: "Хрустящий белый хлеб, сёмга, творожный сыр, листья салата, помидор и огурец.", price: 310, tag: "sandwich" }, { title: "Кесадилья", description: "Мексиканская лепёшка, ветчина, сыр, авторский соус и томаты.", price: 290, tag: "sandwich" }, { title: "Пикантный", description: "Пшенично-ржаной хлеб, салями, сыр, томаты, огурец, листья салата и авторский соус.", price: 280, tag: "sandwich" }, { title: "Сэндвич с курицей", description: "Тостовый хлеб, курица, вяленые томаты, соус песто и творожный сыр.", price: 310, tag: "sandwich" } ] },
      { key: "drinks", title: "Авторское меню", description: "Десертные и акцентные кофейные напитки с более выразительным вкусом.", items: [ { title: "Гляссе «Баунти»", description: "Американо со шариком пломбира, кокосовой стружкой и шоколадным сиропом.", price: 290, tag: "author" }, { title: "Солёная карамель", description: "Пикантный вкус солёного моря в ароматном латте-макиато.", price: 290, tag: "author" }, { title: "Латте с сыром", description: "Густой и насыщенный латте со сливочным сыром и маленьким секретом.", price: 310, tag: "author" }, { title: "Латте-макиато миндаль-карамель", description: "Шапка нежнейших сливок, миндальные хлопья и карамельный латте.", price: 290, tag: "author" }, { title: "Ванильное небо", description: "Ванильный капучино, шапка взбитых сливок и сладкие сердца.", price: 290, tag: "author" }, { title: "Дон Жуан", description: "Настоящий вкус ирландского кофе для влюблённых в жизнь 18+.", price: 310, tag: "author" }, { title: "Капучино с халвой", description: "Ароматный кофе и натуральная халва в одной подаче.", price: 290, tag: "author" }, { title: "Пряный манго", description: "Густой сливочный капучино с нотками пряностей и экзотического манго.", price: 290, tag: "author" }, { title: "Ореховый драйв", description: "Микс дроблёных орехов и крепкого латте.", price: 290, tag: "author" } ] },
      { key: "drinks", title: "Кофе", description: "Классическая кофейная карта с разбивкой по объёму.", items: [ { title: "Эспрессо", description: "Крепкий и бодрящий кофе.", note: "30 мл", price: 130, tag: "classic" }, { title: "Двойной эспрессо", description: "Удвоенный объём для более насыщенного вкуса.", note: "60 мл", price: 190, tag: "classic" }, { title: "Американо", description: "Ароматный и мягкий чёрный кофе.", note: "250 мл — 150 ₽ · 300 мл — 170 ₽ · 400 мл — 190 ₽", price: 150, tag: "classic" }, { title: "Капучино", description: "Нежная молочная пенка и ароматный итальянский кофе.", note: "250 мл — 200 ₽ · 300 мл — 230 ₽ · 400 мл — 260 ₽", price: 200, tag: "classic" }, { title: "Латте", description: "Идеальный латте и вкусный комплимент от нас к напитку.", note: "250 мл — 200 ₽ · 300 мл — 230 ₽ · 400 мл — 260 ₽", price: 200, tag: "classic" }, { title: "Моккачино", description: "Ароматный кофе, нежная молочная пенка и шоколадный сироп.", note: "250 мл — 230 ₽ · 300 мл — 250 ₽ · 400 мл — 270 ₽", price: 230, tag: "classic" }, { title: "Раф-кофе", description: "Зерновой кофе, натуральные сливки, ванильный сироп и молоко.", note: "250 мл — 240 ₽ · 300 мл — 260 ₽ · 400 мл — 280 ₽", price: 240, tag: "classic" }, { title: "Немолоко овсяное", description: "Добавка к напитку.", note: "250 мл — 50 ₽ · 300 мл — 60 ₽ · 400 мл — 80 ₽", price: 50, tag: "add-on" }, { title: "Немолоко кокосовое / миндальное", description: "Альтернативное молоко для напитков.", note: "250 мл — 80 ₽ · 300 мл — 100 ₽ · 400 мл — 120 ₽", price: 80, tag: "add-on" } ] },
      { key: "drinks", title: "Холодные напитки", description: "Кофейные холодные позиции и фруктовые напитки на тёплый день.", items: [ { title: "Бамбл", description: "Холодный кофейный напиток с яркой подачей.", price: 300, tag: "cold" }, { title: "Пина-колада", description: "Десертный кофейный напиток с мягким тропическим вкусом.", price: 300, tag: "cold" }, { title: "Айс-латте карамель", description: "Холодный латте с мягкой карамельной нотой.", price: 280, tag: "cold" }, { title: "Фраппучино", description: "Холодный кофейный напиток со сливочной текстурой.", price: 300, tag: "cold" } ] },
      { key: "drinks", title: "Лимонады", description: "Фруктовые и освежающие позиции для прохладного выбора.", items: [ { title: "Мохито", description: "Освежающий лимонад с мятной нотой.", price: 250, tag: "cold", image: "assets/menu/lemonade-mojito.jpg" }, { title: "Черничный мохито", description: "Ягодная версия мохито с более ярким вкусом.", price: 250, tag: "cold", image: "assets/menu/lemonade-blueberry-mojito.jpg" }, { title: "Персик-жасмин", description: "Мягкий фруктовый лимонад с цветочной нотой.", price: 250, tag: "cold", image: "assets/menu/lemonade-peach-jasmine.png" }, { title: "Вишня-ананас", description: "Сочный лимонад с более яркой фруктовой кислотностью.", price: 250, tag: "cold", image: "assets/menu/lemonade-cherry-pineapple.jpg" }, { title: "Клубника-базилик", description: "Свежий ягодный вкус с травяным оттенком.", price: 250, tag: "cold", image: "assets/menu/lemonade-strawberry-basil.jpg" } ] },
      { key: "drinks", title: "Молочные коктейли и смузи", description: "Сладкие холодные позиции с мягкой текстурой.", items: [ { title: "Молочный коктейль · Фисташка", description: "Плотный коктейль с ореховой сладостью.", price: 300, tag: "shake", image: "assets/menu/milkshake-pistachio.jpg" }, { title: "Молочный коктейль · Клубника-банан", description: "Классический молочный коктейль с ягодным вкусом.", price: 280, tag: "shake", image: "assets/menu/milkshake-strawberry-banana.jpg" }, { title: "Смузи · Клубника-банан", description: "Мягкий фруктовый смузи на каждый день.", price: 280, tag: "smoothie", image: "assets/menu/smoothie-strawberry-banana.jpg" }, { title: "Смузи · Малина-кокос", description: "Более десертный смузи с кокосовой нотой.", price: 300, tag: "smoothie", image: "assets/menu/smoothie-raspberry-coconut.jpg" } ] },
      { key: "drinks", title: "Чай из натуральных ягод и фруктов", description: "Согревающие чайные позиции в двух объёмах.", items: [ { title: "Облепиха", description: "Идеальное сочетание ягод облепихи, мёда и лимона.", note: "400 мл — 270 ₽ · 600 мл — 350 ₽", price: 270, tag: "tea" }, { title: "Малинка", description: "Свежая домашняя малина, фруктовый чай и натуральный мёд.", note: "400 мл — 270 ₽ · 600 мл — 350 ₽", price: 270, tag: "tea" }, { title: "Клюква-брусника", description: "Сочный микс ягод клюквы, брусники и свежего апельсина.", note: "400 мл — 270 ₽ · 600 мл — 350 ₽", price: 270, tag: "tea" }, { title: "Имбирь-лимон", description: "Чёрный чай, свежий имбирь и лимон с натуральным мёдом.", note: "400 мл — 270 ₽ · 600 мл — 350 ₽", price: 270, tag: "tea" }, { title: "Спелая вишня", description: "Фруктовый чай и микс вишни со свежим апельсином.", note: "400 мл — 270 ₽ · 600 мл — 350 ₽", price: 270, tag: "tea" }, { title: "Глинтвейн", description: "Только натуральные соки, фрукты, ароматные специи и щепотка волшебства.", note: "400 мл — 270 ₽ · 600 мл — 350 ₽", price: 270, tag: "tea" } ] },
      { key: "drinks", title: "Какао и горячий шоколад", description: "Тёплые сладкие напитки и мягкие десертные позиции.", items: [ { title: "Какао-миндаль", description: "Настоящий швейцарский какао, шапка ванильных сливок, миндальные хлопья и ореховый сироп.", price: 290, tag: "cocoa" }, { title: "Орео-зарядка", description: "Горячий шоколад, взбитые сливки, печенье Oreo и шоколадный сироп.", price: 290, tag: "cocoa" }, { title: "Шокобум", description: "Швейцарский какао, шоколадный сироп и бельгийский шоколад.", price: 230, tag: "cocoa" }, { title: "Бельгийский горячий шоколад", description: "Горячий шоколад, молоко и ванильный сироп.", price: 240, tag: "cocoa" }, { title: "Детское тёплое молочко", description: "Клубника, банан, шоколад и карамель.", price: 130, tag: "kids" }, { title: "Орео-шейк", description: "Мороженое, печенье Oreo и молоко.", price: 290, tag: "shake" } ] }
    ]
  },
  stroitel: {
    eyebrow: "Локация · Строитель",
    title: "PERIOD · Строитель",
    lead: "В этом меню собраны кофе, сэндвичи, чай и тёплые напитки в спокойной и понятной подаче.",
    address: "ул. 5 Августа, 28",
    hours: "7:00 — 21:00",
    format: "Кофе · Сэндвичи · Чай",
    image: "assets/menu/lemonade-peach-jasmine.png",
    badges: ["Кофейная классика", "Сэндвичи", "Тёплые напитки"],
    sections: [
      { key: "mains", title: "Сэндвичи", description: "Сытные позиции для быстрого перекуса и более плотного кофе-брейка.", items: [ { title: "Царский с сёмгой", description: "Хрустящий белый хлеб, сёмга, творожный сыр, листья салата, помидор и огурец.", price: 310, tag: "sandwich" }, { title: "Кесадилья", description: "Мексиканская лепёшка, ветчина, сыр, авторский соус и томаты.", price: 290, tag: "sandwich" }, { title: "Пикантный", description: "Пшенично-ржаной хлеб, салями, сыр, томаты, огурец, листья салата и авторский соус.", price: 280, tag: "sandwich" }, { title: "Сэндвич с курицей", description: "Тостовый хлеб, курица, вяленые томаты, соус песто и творожный сыр.", price: 310, tag: "sandwich" }, { title: "Чизбургер с ветчиной", description: "Нежная пшеничная булочка, ветчина, сыр, томаты, огурец, листья салата и авторский соус.", price: 280, tag: "burger" }, { title: "Чизбургер с пепперони", description: "Нежная пшеничная булочка, пепперони, сыр, томаты, огурец, листья салата и авторский соус.", price: 280, tag: "burger" } ] },
      { key: "drinks", title: "Авторское меню", description: "Яркие кофейные напитки с более десертными, пряными и сливочными акцентами.", items: [ { title: "Солёная карамель", description: "Сливочный авторский кофе с карамельным акцентом.", price: 290, tag: "author" }, { title: "Гляссе «Баунти»", description: "Авторский холодный десертный кофе с кокосовой нотой.", price: 290, tag: "author" }, { title: "Латте с сыром", description: "Нежный латте с более плотным сливочным вкусом.", price: 290, tag: "author" }, { title: "Капучино с халвой", description: "Авторская версия капучино с выразительным халвичным профилем.", price: 290, tag: "author" }, { title: "Пряный манго", description: "Яркий напиток с манговой подачей и пряным акцентом.", price: 310, tag: "author" }, { title: "Ореховый драйв", description: "Крепкий латте с ореховой нотой.", price: 310, tag: "author" }, { title: "Ванильное небо", description: "Ванильный капучино со сливочной шапкой.", price: 290, tag: "author" }, { title: "Дон Жуан", description: "Ирландский кофейный вкус для любителей более насыщенных напитков.", price: 310, tag: "author" }, { title: "Итальянская мята", description: "Капучино с мятным и шоколадным акцентом.", price: 290, tag: "author" }, { title: "Сникерс-раф", description: "Классический сладкий раф со вкусом шоколада и орехов.", price: 310, tag: "author" }, { title: "Чёрный перец", description: "Крепкий американо для тех, кто любит более прямой вкус.", price: 290, tag: "author" }, { title: "Латте-макиато миндаль-карамель", description: "Нежный латте с миндально-карамельной подачей.", price: 290, tag: "author" }, { title: "Мятный раф", description: "Раф с мятным сиропом и мягкой сливочной текстурой.", price: 310, tag: "author" }, { title: "Раф лаванда-нуга", description: "Необычный раф с лавандовой нотой и домашней карамелью.", price: 310, tag: "author" } ] },
      { key: "drinks", title: "Кофе", description: "Классическая кофейная карта с разбивкой по объёму.", items: [ { title: "Эспрессо", description: "Короткий насыщенный кофе.", note: "30 мл", price: 130, tag: "classic" }, { title: "Двойной эспрессо", description: "Более плотный объём эспрессо.", note: "60 мл", price: 190, tag: "classic" }, { title: "Американо", description: "Чистый кофе на каждый день.", note: "250 мл — 150 ₽ · 300 мл — 170 ₽ · 400 мл — 190 ₽", price: 150, tag: "classic" }, { title: "Капучино", description: "Кофе с молоком и плотной пеной.", note: "250 мл — 200 ₽ · 300 мл — 230 ₽ · 400 мл — 260 ₽", price: 200, tag: "classic" }, { title: "Латте", description: "Более мягкий и сливочный профиль.", note: "250 мл — 200 ₽ · 300 мл — 230 ₽ · 400 мл — 260 ₽", price: 200, tag: "classic" }, { title: "Моккачино", description: "Кофе с шоколадным акцентом.", note: "250 мл — 230 ₽ · 300 мл — 250 ₽ · 400 мл — 270 ₽", price: 230, tag: "classic" }, { title: "Раф-кофе", description: "Нежный сливочный раф без добавочных вкусов.", note: "250 мл — 240 ₽ · 300 мл — 260 ₽ · 400 мл — 280 ₽", price: 240, tag: "classic" }, { title: "Немолоко овсяное", description: "Добавка к напитку.", note: "250 мл — 50 ₽ · 300 мл — 60 ₽ · 400 мл — 80 ₽", price: 50, tag: "add-on" }, { title: "Немолоко кокосовое / миндальное", description: "Альтернативное молоко для напитков.", note: "250 мл — 80 ₽ · 300 мл — 100 ₽ · 400 мл — 120 ₽", price: 80, tag: "add-on" } ] },
      { key: "drinks", title: "Листовой чай", description: "Листовые смеси, травы и базовые чайные позиции.", items: [ { title: "Липовый цвет", description: "Мягкий ароматный чай с цветочным характером.", note: "400 мл", price: 190, tag: "tea" }, { title: "Дикие ягоды", description: "Гибискус, шиповник, смородина, земляника, ягоды аронии и яблоко.", note: "400 мл", price: 190, tag: "tea" }, { title: "Фруктовая сенча", description: "Зелёный листовой чай, кокосовые хлопья и корица.", note: "400 мл", price: 190, tag: "tea" }, { title: "Цитрусовый микс", description: "Ройбуш, лимонная вербена, цедра апельсина, грейпфрут и мята.", note: "400 мл", price: 190, tag: "tea" }, { title: "Горные травы", description: "Лимонная трава, ромашка, мята и цедра апельсина.", note: "400 мл", price: 190, tag: "tea" }, { title: "Лесные травы", description: "Ройбуш, листья земляники, ананас и лепестки василька.", note: "400 мл", price: 190, tag: "tea" }, { title: "Чёрный листовой", description: "Более плотный классический вкус.", note: "400 мл", price: 190, tag: "tea" }, { title: "Чёрный", description: "Базовый чай на каждый день.", note: "250 мл", price: 90, tag: "tea" }, { title: "Зелёный", description: "Лёгкий зелёный чай.", note: "250 мл", price: 90, tag: "tea" }, { title: "Красный", description: "Яркий чай с более насыщенным вкусом.", note: "250 мл", price: 90, tag: "tea" } ] },
      { key: "drinks", title: "Какао и горячий шоколад", description: "Сладкие и тёплые позиции без сложной кофейной базы.", items: [ { title: "Какао-миндаль", description: "Какао со взбитыми сливками, миндальными хлопьями и ореховым сиропом.", price: 290, tag: "cocoa" }, { title: "Орео-зарядка", description: "Горячий шоколад, взбитые сливки, печенье Oreo и шоколадный сироп.", price: 290, tag: "cocoa" }, { title: "Шокобум", description: "Бельгийский какао с шоколадным сиропом и шоколадом.", price: 230, tag: "cocoa" }, { title: "Бельгийский горячий шоколад", description: "Горячий шоколад, молоко и ванильный сироп.", price: 240, tag: "cocoa" }, { title: "Детское тёплое молочко", description: "Клубника, банан, шоколад и карамель.", price: 130, tag: "kids" } ] }
    ]
  }
};
const catalogGrid = document.getElementById("catalog-grid");
const catalogPagination = document.getElementById("catalog-pagination");
const catalogCount = document.getElementById("catalog-count");
const moodSelect = document.getElementById("catalog-filter-mood");
const paletteSelect = document.getElementById("catalog-filter-palette");
const occasionSelect = document.getElementById("catalog-filter-occasion");
const sortSelect = document.getElementById("catalog-sort-select");
const resetButton = document.getElementById("catalog-reset");
const viewButtons = document.querySelectorAll("[data-catalog-view]");

if (
  catalogGrid &&
  catalogPagination &&
  catalogCount &&
  moodSelect &&
  paletteSelect &&
  occasionSelect &&
  sortSelect &&
  resetButton
) {
  let currentPage = 1;
  let currentView = "grid";

  const getItemsPerPage = () => (currentView === "list" ? 6 : 8);

  const state = {
    mood: "all",
    palette: "all",
    occasion: "all",
    sort: "popular",
  };

  const sortItems = (items) => {
    const sorted = [...items];

    switch (state.sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title, "ru"));
        break;
      case "popular":
      default:
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return sorted;
  };

  const includesFilter = (values, selected) => selected === "all" || values.includes(selected);

  const filterItems = () =>
    bouquetCatalog.filter((item) => {
      const moodMatch = includesFilter(item.moods, state.mood);
      const paletteMatch = includesFilter(item.palettes, state.palette);
      const occasionMatch = includesFilter(item.occasions, state.occasion);
      return moodMatch && paletteMatch && occasionMatch;
    });

  const getBouquetWord = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "букет";
    }
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return "букета";
    }
    return "букетов";
  };

  const renderCards = (items) => {
    if (!items.length) {
      catalogGrid.innerHTML = `
        <div class="catalog-empty">
          <h3>По этим параметрам букетов пока нет</h3>
          <p>Попробуй сбросить фильтры или выбрать другое сочетание категорий.</p>
        </div>
      `;
      return;
    }

    const bouquetCart = readBouquetCart();

    catalogGrid.innerHTML = items
      .map(
        (item) => `
          <article class="product-card product-card--catalog">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="product-card__body">
              <h3>${item.title}</h3>
              <div class="product-card__footer">
                <strong>${formatPrice(item.price)}</strong>
                <button
                  type="button"
                  class="product-card__add ${(bouquetCart[item.slug] ?? 0) > 0 ? "is-added" : ""}"
                  data-bouquet-cart-id="${item.slug}"
                  aria-label="Добавить ${item.title} в корзину"
                  aria-pressed="${(bouquetCart[item.slug] ?? 0) > 0 ? "true" : "false"}"
                >${getRoundCartButtonLabel(bouquetCart[item.slug] ?? 0)}</button>
              </div>
            </div>
          </article>
        `,
      )
      .join("");
  };

  const renderPagination = (totalItems) => {
    const pageCount = Math.max(1, Math.ceil(totalItems / getItemsPerPage()));

    if (currentPage > pageCount) {
      currentPage = pageCount;
    }

    if (pageCount <= 1) {
      catalogPagination.innerHTML = "";
      return;
    }

    const buttons = [];

    buttons.push(`
      <button type="button" class="catalog-pagination__arrow" data-page-nav="prev" aria-label="Предыдущая страница" ${currentPage === 1 ? "disabled" : ""}>
        ‹
      </button>
    `);

    for (let page = 1; page <= pageCount; page += 1) {
      buttons.push(`
        <button type="button" data-page="${page}" class="${page === currentPage ? "is-active" : ""}" aria-label="Страница ${page}" aria-current="${page === currentPage ? "page" : "false"}">
          ${page}
        </button>
      `);
    }

    buttons.push(`
      <button type="button" class="catalog-pagination__arrow" data-page-nav="next" aria-label="Следующая страница" ${currentPage === pageCount ? "disabled" : ""}>
        ›
      </button>
    `);

    catalogPagination.innerHTML = buttons.join("");
  };

  const renderCatalog = () => {
    const filteredItems = sortItems(filterItems());
    const itemsPerPage = getItemsPerPage();
    const pageCount = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

    if (currentPage > pageCount) {
      currentPage = 1;
    }

    const pageStart = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredItems.slice(pageStart, pageStart + itemsPerPage);

    catalogGrid.classList.toggle("is-list", currentView === "list");
    catalogCount.textContent = `Найдено ${filteredItems.length} ${getBouquetWord(filteredItems.length)}`;

    renderCards(pageItems);
    renderPagination(filteredItems.length);
  };

  const resetCatalog = () => {
    state.mood = "all";
    state.palette = "all";
    state.occasion = "all";
    state.sort = "popular";
    currentPage = 1;
    currentView = "grid";

    moodSelect.value = "all";
    paletteSelect.value = "all";
    occasionSelect.value = "all";
    sortSelect.value = "popular";

    viewButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.catalogView === "grid");
    });

    renderCatalog();
  };

  moodSelect.addEventListener("change", () => {
    state.mood = moodSelect.value;
    currentPage = 1;
    renderCatalog();
  });

  paletteSelect.addEventListener("change", () => {
    state.palette = paletteSelect.value;
    currentPage = 1;
    renderCatalog();
  });

  occasionSelect.addEventListener("change", () => {
    state.occasion = occasionSelect.value;
    currentPage = 1;
    renderCatalog();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    currentPage = 1;
    renderCatalog();
  });

  resetButton.addEventListener("click", resetCatalog);

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextView = button.dataset.catalogView;

      if (!nextView || nextView === currentView) {
        return;
      }

      currentView = nextView;
      currentPage = 1;

      viewButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      renderCatalog();
    });
  });

  catalogPagination.addEventListener("click", (event) => {
    const target = event.target.closest("button");

    if (!target || target.disabled) {
      return;
    }

    const filteredItems = sortItems(filterItems());
    const pageCount = Math.max(1, Math.ceil(filteredItems.length / getItemsPerPage()));

    if (target.dataset.page) {
      currentPage = Number(target.dataset.page);
      renderCatalog();
      return;
    }

    if (target.dataset.pageNav === "prev" && currentPage > 1) {
      currentPage -= 1;
      renderCatalog();
      return;
    }

    if (target.dataset.pageNav === "next" && currentPage < pageCount) {
      currentPage += 1;
      renderCatalog();
    }
  });

  catalogGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-bouquet-cart-id]");

    if (!addButton) {
      return;
    }

    const bouquetId = addButton.dataset.bouquetCartId;

    if (!bouquetId) {
      return;
    }

    const nextCart = readBouquetCart();
    const nextCount = (nextCart[bouquetId] ?? 0) + 1;

    nextCart[bouquetId] = nextCount;
    writeBouquetCart(nextCart);
    updateRoundCartButtonState(addButton, nextCount);
  });

  renderCatalog();
}

const menuLocationButtons = document.querySelectorAll("[data-menu-location]");
const menuCategoryButtons = document.querySelectorAll("[data-menu-category]");
const menuSections = document.getElementById("menu-sections");
const menuCategoryCaption = document.getElementById("menu-category-caption");
const menuLocationEyebrow = document.getElementById("menu-location-eyebrow");
const menuLocationTitle = document.getElementById("menu-location-title");
const menuLocationLead = document.getElementById("menu-location-lead");
const menuLocationAddress = document.getElementById("menu-location-address");
const menuLocationHours = document.getElementById("menu-location-hours");
const menuLocationFormat = document.getElementById("menu-location-format");
const menuLocationBadges = document.getElementById("menu-location-badges");
const menuLocationImage = document.getElementById("menu-location-image");

if (
  menuLocationButtons.length &&
  menuCategoryButtons.length &&
  menuSections &&
  menuCategoryCaption &&
  menuLocationEyebrow &&
  menuLocationTitle &&
  menuLocationLead &&
  menuLocationAddress &&
  menuLocationHours &&
  menuLocationFormat &&
  menuLocationBadges &&
  menuLocationImage
) {
  let currentLocation = "belgorod";
  let currentCategory = "all";
  const categoryLabels = {
    all: "Все категории",
    breakfast: "Завтраки",
    mains: "Основное меню",
    desserts: "Десерты",
    drinks: "Напитки",
  };

  const renderPeriodLocationTitle = (title) => {
    const [brand, suffix] = title.split("·").map((part) => part.trim());

    if (brand?.toUpperCase() === "PERIOD" && suffix) {
      return `<span class="wordmark wordmark--inline">PERIOD</span><span class="wordmark-separator">·</span>${suffix}`;
    }

    return title;
  };

  const readMenuCart = () => {
    try {
      const savedCart = window.localStorage.getItem(menuCartStorageKey);
      return savedCart ? JSON.parse(savedCart) : {};
    } catch {
      return {};
    }
  };

  const writeMenuCart = (cart) => {
    try {
      window.localStorage.setItem(menuCartStorageKey, JSON.stringify(cart));
      updateCartIndicators();
    } catch {
      // Ignore storage errors in local previews.
    }
  };

  const getDishCartId = (locationKey, sectionTitle, itemTitle) =>
    `${locationKey}::${sectionTitle}::${itemTitle}`;

  const hasPrice = (value) => typeof value === "number" && Number.isFinite(value);

  const getAddButtonLabel = (count) => (count > 0 ? String(count) : "+");

  const updateAddButtonState = (button, count) => {
    button.textContent = getAddButtonLabel(count);
    button.classList.toggle("is-added", count > 0);
    button.setAttribute("aria-pressed", String(count > 0));
  };

  const renderMenuPage = () => {
    const location = menuLocations[currentLocation];
    const menuCart = readMenuCart();
    const visibleSections =
      currentCategory === "all"
        ? location.sections
        : location.sections.filter((section) => section.key === currentCategory);

    menuLocationEyebrow.textContent = location.eyebrow;
    menuLocationTitle.innerHTML = renderPeriodLocationTitle(location.title);
    menuLocationLead.textContent = location.lead;
    menuLocationAddress.textContent = location.address;
    menuLocationHours.textContent = location.hours;
    menuLocationFormat.textContent = location.format;
    menuLocationImage.src = location.image;
    menuLocationImage.alt = `${location.title} меню`;
    menuCategoryCaption.textContent = categoryLabels[currentCategory];

    menuLocationBadges.innerHTML = location.badges
      .map((badge) => `<span class="menu-location-badge">${badge}</span>`)
      .join("");

    if (!visibleSections.length) {
      menuSections.innerHTML = `<div class="menu-empty">Для этой категории пока нет позиций в выбранной локации.</div>`;
      return;
    }

    menuSections.innerHTML = visibleSections
      .map(
        (section) => `
          <article class="menu-section-card">
            <div class="menu-section-card__head">
              <div>
                <p class="eyebrow">${categoryLabels[section.key]}</p>
                <h3>${section.title}</h3>
              </div>
              <p>${section.description}</p>
            </div>
            <div class="menu-section-card__items">
              ${section.items
                .map(
                  (item) => {
                    const cartId = getDishCartId(currentLocation, section.title, item.title);
                    const cartCount = menuCart[cartId] ?? 0;

                    return `
                    <article class="menu-dish ${item.image ? "" : "menu-dish--plain"}">
                      ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ""}
                      <div class="menu-dish__body">
                        <div class="menu-dish__top">
                          <h3>${item.title}</h3>
                          <span class="menu-dish__tag">${item.tag}</span>
                        </div>
                        <p>${item.description}</p>
                        ${item.note ? `<span class="menu-dish__note">${item.note}</span>` : ""}
                        ${
                          hasPrice(item.price)
                            ? `<div class="menu-dish__footer">
                          <span class="menu-dish__price">${formatRubles(item.price)}</span>
                          <button
                            type="button"
                            class="menu-dish__add ${cartCount > 0 ? "is-added" : ""}"
                            data-menu-cart-id="${cartId}"
                            aria-label="Добавить ${item.title} в корзину"
                            aria-pressed="${cartCount > 0 ? "true" : "false"}"
                          >${getAddButtonLabel(cartCount)}</button>
                        </div>`
                            : `<div class="menu-dish__footer menu-dish__footer--note-only">
                          <span class="menu-dish__meta">Уточняйте состав и цену в точке</span>
                        </div>`
                        }
                      </div>
                    </article>
                  `;
                  },
                )
                .join("")}
            </div>
          </article>
        `,
      )
      .join("");
  };

  menuLocationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextLocation = button.dataset.menuLocation;

      if (!nextLocation || nextLocation === currentLocation) {
        return;
      }

      currentLocation = nextLocation;

      menuLocationButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      renderMenuPage();
    });
  });

  menuCategoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextCategory = button.dataset.menuCategory;

      if (!nextCategory || nextCategory === currentCategory) {
        return;
      }

      currentCategory = nextCategory;

      menuCategoryButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      renderMenuPage();
    });
  });

  menuSections.addEventListener("click", (event) => {
    const addButton = event.target.closest(".menu-dish__add");

    if (!addButton) {
      return;
    }

    const cartId = addButton.dataset.menuCartId;

    if (!cartId) {
      return;
    }

    const nextCart = readMenuCart();
    const nextCount = (nextCart[cartId] ?? 0) + 1;

    nextCart[cartId] = nextCount;
    writeMenuCart(nextCart);
    updateAddButtonState(addButton, nextCount);
  });

  renderMenuPage();
}

const cartPageElement = document.querySelector("[data-cart-page]");

if (cartPageElement) {
  const checkoutForm = document.getElementById("checkout-form");
  const cartItemsElement = document.getElementById("checkout-cart-items");
  const summaryCountElement = document.getElementById("checkout-summary-count");
  const summaryTotalElement = document.getElementById("checkout-summary-total");
  const summaryListElement = document.getElementById("checkout-summary-list");
  const summaryNoteElement = document.getElementById("checkout-summary-note");
  const feedbackElement = document.getElementById("checkout-feedback");
  const submitButton = document.getElementById("checkout-submit");
  const modeButtons = document.querySelectorAll("[data-order-mode]");
  const postcardPanel = document.getElementById("checkout-postcard-panel");
  const postcardToggle = document.getElementById("checkout-postcard-toggle");
  const postcardFields = document.getElementById("checkout-postcard-fields");
  const postcardMessage = document.getElementById("checkout-postcard-message");
  const pickupSection = document.getElementById("checkout-pickup-section");
  const deliverySection = document.getElementById("checkout-delivery-section");
  const pickupSelfCheckbox = document.getElementById("checkout-pickup-self");
  const pickupRecipientFields = document.getElementById("checkout-pickup-recipient-fields");
  const locationSelect = document.getElementById("checkout-location");
  const locationHintElement = document.getElementById("checkout-location-hint");
  const dateInput = document.getElementById("checkout-date");
  const timeFromSelect = document.getElementById("checkout-time-from");
  const timeToSelect = document.getElementById("checkout-time-to");

  const locationLabels = {
    belgorod: "Губкина",
    severny: "Северный",
    stroitel: "Строитель",
  };

  const locationSchedules = {
    belgorod: {
      openHour: 8,
      closeHour: 22,
    },
    severny: {
      openHour: 8,
      closeHour: 21,
    },
    stroitel: {
      openHour: 7,
      closeHour: 21,
    },
  };

  const getLocalDateIso = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatHourOption = (hour) => `${String(hour).padStart(2, "0")}:00`;

  const getScheduleWindow = (locationKey, mode) => {
    const schedule = locationSchedules[locationKey] ?? locationSchedules.belgorod;
    const deliveryShift = mode === "delivery" ? 1 : 0;
    const firstHour = Math.min(schedule.openHour + deliveryShift, schedule.closeHour - 1);

    return {
      startHour: firstHour,
      closeHour: schedule.closeHour,
    };
  };

  const buildTimeOptions = (locationKey, mode, type, fromValue = "") => {
    const options = [];
    const { startHour, closeHour } = getScheduleWindow(locationKey, mode);

    if (type === "to") {
      const fromHour = Number.parseInt(String(fromValue).slice(0, 2), 10);
      const endStartHour = Number.isFinite(fromHour) ? fromHour + 1 : startHour + 1;

      for (let hour = endStartHour; hour <= closeHour; hour += 1) {
        options.push(formatHourOption(hour));
      }

      return options;
    }

    for (let hour = startHour; hour < closeHour; hour += 1) {
      options.push(formatHourOption(hour));
    }

    return options;
  };

  const itemHasPrice = (value) => typeof value === "number" && Number.isFinite(value);

  const menuLookup = Object.entries(menuLocations).reduce((map, [locationKey, location]) => {
    location.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (!itemHasPrice(item.price)) {
          return;
        }

        const cartId = getDishCartId(locationKey, section.title, item.title);

        if (!map.has(cartId)) {
          map.set(cartId, {
            cartId,
            kind: "menu",
            locationKey,
            locationLabel: locationLabels[locationKey] ?? location.title,
            title: item.title,
            description: section.title,
            image: item.image ?? "",
            price: item.price,
          });
        }
      });
    });

    return map;
  }, new Map());

  const defaultDraft = {
    mode: "delivery",
    location: "belgorod",
    customerName: "",
    customerTelegram: "",
    customerPhone: "",
    pickupSelf: false,
    date: getLocalDateIso(),
    timeFrom: "10:00",
    timeTo: "12:00",
    pickupRecipientName: "",
    pickupRecipientPhone: "",
    deliveryRecipientName: "",
    deliveryRecipientPhone: "",
    deliveryAddress: "",
    consents: {
      privacy: false,
      offer: false,
    },
    postcard: false,
    postcardMessage: "",
    postcards: {},
  };

  const savedOrderDraft = readOrderDraft();

  let orderDraft = {
    ...defaultDraft,
    ...savedOrderDraft,
    consents: {
      ...defaultDraft.consents,
      ...(savedOrderDraft.consents ?? {}),
    },
    postcards: {
      ...defaultDraft.postcards,
      ...(savedOrderDraft.postcards ?? {}),
    },
  };

  const getFieldValue = (fieldId) => {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : "";
  };

  const getFieldChecked = (fieldId) => {
    const field = document.getElementById(fieldId);
    return field ? field.checked : false;
  };

  const resolveCartItems = () => {
    const bouquetCart = readBouquetCart();
    const menuCart = readMenuCart();
    const items = [];

    Object.entries(bouquetCart).forEach(([slug, quantity]) => {
      if (!quantity) {
        return;
      }

      const bouquet = bouquetCatalog.find((item) => item.slug === slug);

      if (!bouquet) {
        return;
      }

      items.push({
        key: `bouquet:${slug}`,
        storageKey: slug,
        kind: "bouquet",
        locationKey: "belgorod",
        locationLabel: "Букет",
        title: bouquet.title,
        description: "Букет из каталога",
        image: bouquet.image,
        price: bouquet.price,
        quantity,
      });
    });

    Object.entries(menuCart).forEach(([cartId, quantity]) => {
      if (!quantity) {
        return;
      }

      const item = menuLookup.get(cartId);

      if (!item) {
        return;
      }

      items.push({
        key: `menu:${cartId}`,
        storageKey: cartId,
        kind: "menu",
        locationKey: item.locationKey,
        locationLabel: item.locationLabel,
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        quantity,
      });
    });

    return items;
  };

  const allCheckoutLocationKeys = Object.keys(locationLabels);

  const createDefaultLocationRules = () => ({
    mode: "free",
    allowed: [...allCheckoutLocationKeys],
    menuLocations: [],
    hint: "",
    warning: false,
  });

  let checkoutLocationRules = createDefaultLocationRules();

  const getMenuLocationKeysFromItems = (items) =>
    Array.from(
      new Set(
        items
          .filter((item) => item.kind === "menu")
          .map((item) => item.locationKey)
          .filter(Boolean),
      ),
    );

  const resolveCheckoutLocationRules = (items) => {
    const menuLocationKeys = getMenuLocationKeysFromItems(items);

    if (!menuLocationKeys.length) {
      return createDefaultLocationRules();
    }

    if (menuLocationKeys.length === 1) {
      const [locationKey] = menuLocationKeys;
      return {
        mode: "locked",
        allowed: [locationKey],
        menuLocations: menuLocationKeys,
        hint: `Точка фиксируется по позициям меню: сейчас доступна только «${locationLabels[locationKey]}».`,
        warning: false,
      };
    }

    const locationNames = menuLocationKeys
      .map((locationKey) => `«${locationLabels[locationKey]}»`)
      .join(", ");

    return {
      mode: "mixed",
      allowed: menuLocationKeys,
      menuLocations: menuLocationKeys,
      hint: `В корзине есть меню из разных точек: ${locationNames}. Разделите такие позиции на отдельные заказы.`,
      warning: true,
    };
  };

  const applyCheckoutLocationRules = (rules) => {
    Array.from(locationSelect.options).forEach((option) => {
      option.disabled = !rules.allowed.includes(option.value);
    });

    if (!rules.allowed.includes(locationSelect.value)) {
      locationSelect.value = rules.allowed[0] || allCheckoutLocationKeys[0];
    }

    locationSelect.disabled = rules.mode !== "free";
    orderDraft.location = locationSelect.value;
    syncTimeOptions();

    if (locationHintElement) {
      locationHintElement.textContent = rules.hint;
      locationHintElement.dataset.state = rules.warning ? "warning" : "";
    }
  };

  const setCartItemQuantity = (item, nextQuantity) => {
    const safeQuantity = Math.max(0, nextQuantity);

    if (item.kind === "bouquet") {
      const nextCart = readBouquetCart();

      if (safeQuantity > 0) {
        nextCart[item.storageKey] = safeQuantity;
      } else {
        delete nextCart[item.storageKey];
      }

      writeBouquetCart(nextCart);
      return;
    }

    const nextCart = readMenuCart();

    if (safeQuantity > 0) {
      nextCart[item.storageKey] = safeQuantity;
    } else {
      delete nextCart[item.storageKey];
    }

    writeMenuCart(nextCart);
  };

  const hydrateTimeSelect = (select, options, selectedValue) => {
    select.innerHTML = options
      .map(
        (value) =>
          `<option value="${value}" ${value === selectedValue ? "selected" : ""}>${value.slice(0, 2)}</option>`,
      )
      .join("");
  };

  const syncTimeOptions = () => {
    const fromOptions = buildTimeOptions(orderDraft.location, orderDraft.mode, "from");
    const nextFromValue = fromOptions.includes(orderDraft.timeFrom)
      ? orderDraft.timeFrom
      : fromOptions[0] || "";

    hydrateTimeSelect(timeFromSelect, fromOptions, nextFromValue);

    const toOptions = buildTimeOptions(
      orderDraft.location,
      orderDraft.mode,
      "to",
      nextFromValue,
    );
    const nextToValue = toOptions.includes(orderDraft.timeTo)
      ? orderDraft.timeTo
      : toOptions[0] || "";

    hydrateTimeSelect(timeToSelect, toOptions, nextToValue);

    orderDraft.timeFrom = nextFromValue;
    orderDraft.timeTo = nextToValue;
  };

  const syncModeVisibility = () => {
    const isPickup = orderDraft.mode === "pickup";
    const isPickupSelf = pickupSelfCheckbox.checked;
    const pickupName = document.getElementById("checkout-pickup-recipient-name");
    const pickupPhone = document.getElementById("checkout-pickup-recipient-phone");
    const deliveryName = document.getElementById("checkout-delivery-recipient-name");
    const deliveryPhone = document.getElementById("checkout-delivery-recipient-phone");
    const deliveryAddress = document.getElementById("checkout-delivery-address");

    pickupSection.hidden = !isPickup;
    deliverySection.hidden = isPickup;
    pickupRecipientFields.hidden = !isPickup || isPickupSelf;
    pickupName.disabled = !isPickup || isPickupSelf;
    pickupPhone.disabled = !isPickup || isPickupSelf;

    pickupName.required = isPickup && !isPickupSelf;
    pickupPhone.required = isPickup && !isPickupSelf;
    deliveryName.required = !isPickup;
    deliveryPhone.required = !isPickup;
    deliveryAddress.required = !isPickup;

    if (!isPickup || isPickupSelf) {
      pickupName.value = "";
      pickupPhone.value = "";
    }

    modeButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.orderMode === orderDraft.mode);
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.orderMode === orderDraft.mode),
      );
    });

    syncTimeOptions();
  };

  const syncDraftFromForm = () => {
    const isPickupSelf = getFieldChecked("checkout-pickup-self");

    orderDraft = {
      ...orderDraft,
      mode: orderDraft.mode,
      location: locationSelect.value,
      customerName: getFieldValue("checkout-customer-name"),
      customerTelegram: getFieldValue("checkout-customer-telegram"),
      customerPhone: getFieldValue("checkout-customer-phone"),
      pickupSelf: isPickupSelf,
      date: dateInput.value || getLocalDateIso(),
      timeFrom: timeFromSelect.value,
      timeTo: timeToSelect.value,
      pickupRecipientName: isPickupSelf ? "" : getFieldValue("checkout-pickup-recipient-name"),
      pickupRecipientPhone: isPickupSelf ? "" : getFieldValue("checkout-pickup-recipient-phone"),
      deliveryRecipientName: getFieldValue("checkout-delivery-recipient-name"),
      deliveryRecipientPhone: getFieldValue("checkout-delivery-recipient-phone"),
      deliveryAddress: getFieldValue("checkout-delivery-address"),
      postcard: orderDraft.postcard,
      postcardMessage: postcardMessage.value.trim(),
      consents: {
        privacy: getFieldChecked("checkout-consent-privacy"),
        offer: getFieldChecked("checkout-consent-offer"),
      },
    };

    writeOrderDraft(orderDraft);
    syncModeVisibility();
  };

  const applyDraftToForm = () => {
    document.getElementById("checkout-customer-name").value = orderDraft.customerName;
    document.getElementById("checkout-customer-telegram").value = orderDraft.customerTelegram;
    document.getElementById("checkout-customer-phone").value = orderDraft.customerPhone;
    locationSelect.value = orderDraft.location;
    dateInput.value = orderDraft.date;
    pickupSelfCheckbox.checked = Boolean(orderDraft.pickupSelf);
    document.getElementById("checkout-pickup-recipient-name").value =
      orderDraft.pickupRecipientName;
    document.getElementById("checkout-pickup-recipient-phone").value =
      orderDraft.pickupRecipientPhone;
    document.getElementById("checkout-delivery-recipient-name").value =
      orderDraft.deliveryRecipientName;
    document.getElementById("checkout-delivery-recipient-phone").value =
      orderDraft.deliveryRecipientPhone;
    document.getElementById("checkout-delivery-address").value =
      orderDraft.deliveryAddress;
    postcardMessage.value = orderDraft.postcardMessage ?? "";
    document.getElementById("checkout-consent-privacy").checked =
      Boolean(orderDraft.consents.privacy);
    document.getElementById("checkout-consent-offer").checked =
      Boolean(orderDraft.consents.offer);
    syncModeVisibility();
  };

  const resetCheckoutState = () => {
    writeBouquetCart({});
    writeMenuCart({});

    orderDraft = {
      ...defaultDraft,
      date: getLocalDateIso(),
      consents: {
        ...defaultDraft.consents,
      },
      postcards: {},
    };

    writeOrderDraft(orderDraft);
    checkoutForm.reset();
    applyDraftToForm();
    renderCartItems();
  };

  const renderSummary = (items) => {
    const totalCount = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    summaryCountElement.textContent = String(totalCount);
    summaryTotalElement.textContent = formatRubles(totalPrice);
    summaryNoteElement.textContent =
      checkoutLocationRules.mode === "mixed"
        ? "В корзине собраны позиции меню из разных точек. Разделите их на отдельные заказы."
        : totalCount > 0
        ? "Проверьте состав заказа, выберите удобный интервал и заполните контакты для подтверждения."
        : "Добавьте букет или позицию из меню, чтобы оформить заказ.";

    summaryListElement.innerHTML = items.length
      ? items
          .map(
            (item) => `
              <li>
                <span>${item.title}</span>
                <strong>${item.quantity} × ${formatRubles(item.price)}</strong>
              </li>
            `,
          )
          .join("")
      : `<li class="is-empty"><span>Корзина пока пуста</span><strong>0</strong></li>`;

    submitButton.disabled = totalCount === 0 || checkoutLocationRules.mode === "mixed";
  };

  const renderCartItems = () => {
    const items = resolveCartItems();
    const firstBouquetIndex = items.findIndex((item) => item.kind === "bouquet");
    const hasBouquet = firstBouquetIndex !== -1;
    checkoutLocationRules = resolveCheckoutLocationRules(items);

    if (!hasBouquet && (orderDraft.postcard || orderDraft.postcardMessage)) {
      orderDraft.postcard = false;
      orderDraft.postcardMessage = "";
      postcardMessage.value = "";
      writeOrderDraft(orderDraft);
    }

    cartItemsElement.innerHTML = items.length
      ? items
          .map(
            (item, index) => `
              <article class="checkout-item">
                <div class="checkout-item__media">
                  ${
                    item.image
                      ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
                      : `<span>PERIOD</span>`
                  }
                </div>
                <div class="checkout-item__body">
                  <div class="checkout-item__head">
                    <div>
                      <h3>${item.title}</h3>
                      <p>${item.description}</p>
                    </div>
                    <button
                      type="button"
                      class="checkout-item__remove"
                      data-cart-remove="${item.key}"
                    >Убрать</button>
                  </div>
                  <div class="checkout-item__meta">
                    <span>${item.locationLabel}</span>
                    <strong>${item.quantity} × ${formatRubles(item.price)}</strong>
                  </div>
                  <div class="checkout-item__controls">
                    <button
                      type="button"
                      class="checkout-stepper"
                      data-cart-change="${item.key}"
                      data-cart-delta="-1"
                      aria-label="Уменьшить количество ${item.title}"
                    >−</button>
                    <span>${item.quantity}</span>
                    <button
                      type="button"
                      class="checkout-stepper"
                      data-cart-change="${item.key}"
                      data-cart-delta="1"
                      aria-label="Увеличить количество ${item.title}"
                    >+</button>
                  </div>
                </div>
              </article>
            `,
          )
          .join("")
      : `
        <div class="checkout-empty">
          <h3>Корзина пока пуста</h3>
          <p>Добавьте букет из каталога или позиции из меню, и они сразу появятся здесь.</p>
          <div class="checkout-empty__actions">
            <a class="button button--solid" href="catalog.html">Открыть букеты</a>
            <a class="button button--ghost" href="menu.html">Открыть меню</a>
          </div>
        </div>
      `;

    postcardPanel.hidden = !hasBouquet;
    postcardFields.hidden = !orderDraft.postcard || !hasBouquet;
    postcardToggle.setAttribute(
      "aria-expanded",
      String(orderDraft.postcard && hasBouquet),
    );
    postcardToggle.classList.toggle("is-active", orderDraft.postcard && hasBouquet);
    applyCheckoutLocationRules(checkoutLocationRules);
    writeOrderDraft(orderDraft);

    renderSummary(items);
  };

  const getOrderApiUrl = () => {
    const configuredUrl =
      typeof window !== "undefined" && typeof window.PERIOD_ORDER_GATEWAY_URL === "string"
        ? window.PERIOD_ORDER_GATEWAY_URL.trim()
        : "";

    return configuredUrl || "/api/orders";
  };

  const isExternalOrderGatewayConfigured = () => {
    const apiUrl = getOrderApiUrl();

    return /^https?:\/\//i.test(apiUrl) && !apiUrl.startsWith(window.location.origin);
  };

  const blobToDataUrl = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Не удалось подготовить изображение букета."));
      reader.readAsDataURL(blob);
    });

  const buildBouquetImageUpload = async (item, index) => {
    if (item.kind !== "bouquet" || !item.image) {
      return null;
    }

    try {
      const imageUrl = new URL(item.image, window.location.href).href;
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Изображение не открылось.");
      }

      const blob = await response.blob();
      const dataUrl = await blobToDataUrl(blob);
      const fallbackExtension = item.image.split(".").pop() || "jpg";
      const mimeType = blob.type || `image/${fallbackExtension.replace("jpg", "jpeg")}`;

      return {
        dataUrl,
        mimeType,
        fileName: `bouquet-${index + 1}.${fallbackExtension}`,
      };
    } catch (error) {
      console.error("Bouquet image prepare failed:", {
        itemKey: item.key,
        message: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  };

  const buildOrderPayload = async (items) => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const isPickup = orderDraft.mode === "pickup";
    const preparedItems = await Promise.all(
      items.map(async (item, index) => ({
        key: item.key,
        kind: item.kind,
        title: item.title,
        description: item.description,
        locationLabel: item.locationLabel,
        image: item.image,
        imageUpload: await buildBouquetImageUpload(item, index),
        price: item.price,
        quantity: item.quantity,
      })),
    );

    return {
      location: orderDraft.location,
      mode: orderDraft.mode,
      customer: {
        name: orderDraft.customerName,
        telegram: orderDraft.customerTelegram,
        phone: orderDraft.customerPhone,
      },
      schedule: {
        date: orderDraft.date,
        timeFrom: orderDraft.timeFrom,
        timeTo: orderDraft.timeTo,
      },
      pickup: {
        self: isPickup && orderDraft.pickupSelf,
        recipientName: orderDraft.pickupRecipientName,
        recipientPhone: orderDraft.pickupRecipientPhone,
      },
      delivery: {
        recipientName: orderDraft.deliveryRecipientName,
        recipientPhone: orderDraft.deliveryRecipientPhone,
        address: orderDraft.deliveryAddress,
      },
      postcard: {
        enabled: orderDraft.postcard,
        message: orderDraft.postcardMessage,
      },
      totals: {
        totalCount,
        totalPrice,
      },
      items: preparedItems,
    };
  };

  const submitOrder = async (payload) => {
    const response = await fetch(getOrderApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.error || "Не удалось отправить заказ.");
    }

    return result;
  };

  const shouldTryBrowserTelegramFallback = (message) =>
    /telegram/i.test(String(message || "")) &&
    /(таймаут|timeout|connect|curl|сбой подключения)/i.test(String(message || ""));

  const submitOrderThroughBrowserBridge = (payload) =>
    new Promise((resolve, reject) => {
      const frameName = `period-browser-bridge-${Date.now()}`;
      const bridgeFrame = document.createElement("iframe");
      const bridgeForm = document.createElement("form");
      const payloadField = document.createElement("input");
      let isSettled = false;

      const cleanup = () => {
        window.removeEventListener("message", handleMessage);
        bridgeForm.remove();
        bridgeFrame.remove();
      };

      const fail = (message) => {
        if (isSettled) {
          return;
        }

        isSettled = true;
        cleanup();
        reject(new Error(message));
      };

      const handleMessage = (event) => {
        if (event.origin !== window.location.origin) {
          return;
        }

        const data = event.data || {};

        if (data.type === "period-browser-fallback-success") {
          isSettled = true;
          cleanup();
          resolve({
            orderId: data.orderId,
            locationLabel: data.locationLabel,
          });
          return;
        }

        if (data.type === "period-browser-fallback-error") {
          fail(data.message || "Не удалось отправить заказ через резервный браузерный маршрут.");
        }
      };

      bridgeFrame.name = frameName;
      bridgeFrame.hidden = true;
      bridgeFrame.setAttribute("aria-hidden", "true");

      bridgeForm.method = "POST";
      bridgeForm.action = "/api/orders/browser-fallback";
      bridgeForm.target = frameName;
      bridgeForm.hidden = true;

      payloadField.type = "hidden";
      payloadField.name = "payload";
      payloadField.value = JSON.stringify(payload);
      bridgeForm.appendChild(payloadField);

      window.addEventListener("message", handleMessage);
      document.body.appendChild(bridgeFrame);
      document.body.appendChild(bridgeForm);
      bridgeForm.submit();

      window.setTimeout(() => {
        fail("Не удалось запустить резервную отправку через браузер.");
      }, 15000);
    });

  const findCartItemByKey = (itemKey) =>
    resolveCartItems().find((item) => item.key === itemKey);

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.orderMode;

      if (!nextMode || nextMode === orderDraft.mode) {
        return;
      }

      orderDraft.mode = nextMode;
      writeOrderDraft(orderDraft);
      syncModeVisibility();
    });
  });

  locationSelect.addEventListener("change", () => {
    orderDraft.location = locationSelect.value;
    syncTimeOptions();
    writeOrderDraft(orderDraft);
  });

  timeFromSelect.addEventListener("change", () => {
    orderDraft.timeFrom = timeFromSelect.value;
    syncTimeOptions();
    writeOrderDraft(orderDraft);
  });

  checkoutForm.addEventListener("input", () => {
    syncDraftFromForm();
  });

  checkoutForm.addEventListener("change", () => {
    syncDraftFromForm();
  });

  postcardToggle.addEventListener("click", () => {
    orderDraft.postcard = !orderDraft.postcard;

    if (!orderDraft.postcard) {
      orderDraft.postcardMessage = "";
      postcardMessage.value = "";
    }

    writeOrderDraft(orderDraft);
    renderCartItems();
  });

  cartItemsElement.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-cart-remove]");
    const changeButton = event.target.closest("[data-cart-change]");

    if (removeButton) {
      const item = findCartItemByKey(removeButton.dataset.cartRemove);

      if (!item) {
        return;
      }

      setCartItemQuantity(item, 0);
      renderCartItems();
      return;
    }

    if (!changeButton) {
      return;
    }

    const item = findCartItemByKey(changeButton.dataset.cartChange);
    const delta = Number(changeButton.dataset.cartDelta || 0);

    if (!item || !delta) {
      return;
    }

    setCartItemQuantity(item, item.quantity + delta);
    renderCartItems();
  });

  // The real checkout flow sends the order to the local API and then to Telegram.
  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    syncDraftFromForm();

    if (window.location.protocol === "file:") {
      feedbackElement.textContent =
        "Чтобы отправка работала, откройте сайт через локальный сервер PERIOD.";
      feedbackElement.dataset.state = "error";
      return;
    }

    const items = resolveCartItems();

    if (!items.length) {
      feedbackElement.textContent = "Сначала добавьте товары в корзину.";
      feedbackElement.dataset.state = "error";
      return;
    }

    if (checkoutLocationRules.mode === "mixed") {
      feedbackElement.textContent =
        "В одной корзине нельзя оформить меню из разных точек. Разделите такие позиции на отдельные заказы.";
      feedbackElement.dataset.state = "error";
      return;
    }

    if (timeFromSelect.value >= timeToSelect.value) {
      feedbackElement.textContent = "Укажите корректный временной интервал.";
      feedbackElement.dataset.state = "error";
      return;
    }

    if (!checkoutForm.reportValidity()) {
      feedbackElement.textContent = "Проверьте, пожалуйста, обязательные поля.";
      feedbackElement.dataset.state = "error";
      return;
    }

    writeOrderDraft(orderDraft);
    submitButton.disabled = true;
    submitButton.textContent = "Отправляем заказ...";
    feedbackElement.textContent = "";
    feedbackElement.dataset.state = "";

    try {
      const payload = await buildOrderPayload(items);
      const result = await submitOrder(payload);
      resetCheckoutState();
      feedbackElement.textContent = `Заказ ${result.orderId} отправлен на обработку.`;
      feedbackElement.dataset.state = "success";
    } catch (error) {
      if (!isExternalOrderGatewayConfigured() && shouldTryBrowserTelegramFallback(error.message)) {
        try {
          const payload = await buildOrderPayload(items);
          const fallbackResult = await submitOrderThroughBrowserBridge(payload);
          resetCheckoutState();
          feedbackElement.textContent = `Заказ ${fallbackResult.orderId} отправлен на обработку.`;
          feedbackElement.dataset.state = "success";
          return;
        } catch (fallbackError) {
          feedbackElement.textContent =
            fallbackError.message || "Не удалось запустить резервную отправку.";
          feedbackElement.dataset.state = "error";
          return;
        }
      }

      feedbackElement.textContent = error.message || "Не удалось отправить заказ.";
      feedbackElement.dataset.state = "error";
    } finally {
      submitButton.textContent = "Отправить заказ";
      submitButton.disabled = resolveCartItems().length === 0;
    }
  });

  dateInput.min = getLocalDateIso();

  if (orderDraft.date < dateInput.min) {
    orderDraft.date = dateInput.min;
  }

  applyDraftToForm();
  renderCartItems();
  window.addEventListener("storage", renderCartItems);
}

const contactMapElement = document.getElementById("contact-map");

if (contactMapElement) {
  const contactMapLocations = [
    {
      title: "PERIOD · Губкина",
      address: "ул. Губкина, 54, корп. 1, Белгород",
      hours: "8:00 — 22:00",
      coordinates: [50.569293, 36.555602],
    },
    {
      title: "PERIOD · Северный",
      address: "Олимпийская ул., 4Б, Северный",
      hours: "8:00 — 21:00",
      coordinates: [50.673295, 36.559278],
    },
    {
      title: "PERIOD · Строитель",
      address: "ул. 5 Августа, 28, Строитель",
      hours: "7:00 — 21:00",
      coordinates: [50.782678, 36.500750],
    },
  ];

  const showContactMapFallback = (message) => {
    contactMapElement.innerHTML = `<div class="contact-map-fallback">${message}</div>`;
  };

  const initContactMap = () => {
    if (!window.ymaps || contactMapElement.dataset.initialized === "true") {
      return;
    }

    contactMapElement.dataset.initialized = "true";
    contactMapElement.innerHTML = "";

    const map = new window.ymaps.Map(
      "contact-map",
      {
        center: [50.6695, 36.538],
        zoom: 10,
        controls: ["zoomControl"],
      },
      {
        suppressMapOpenBlock: true,
      },
    );

    try {
      const placemarks = contactMapLocations.map((location) =>
        new window.ymaps.Placemark(
          location.coordinates,
          {
            hintContent: location.title,
            balloonContentHeader: location.title,
            balloonContentBody: `${location.address}<br>${location.hours}`,
          },
          {
            preset: "islands#darkGreenCircleDotIcon",
          },
        ),
      );

      placemarks.forEach((placemark) => {
        map.geoObjects.add(placemark);
      });

      const bounds = map.geoObjects.getBounds();

      if (bounds) {
        map.setBounds(bounds, {
          checkZoomRange: true,
          zoomMargin: [28, 28, 28, 28],
        });

        const resolvedZoom = map.getZoom();

        if (resolvedZoom > 12) {
          map.setZoom(12, { duration: 0 });
        }
      }
    } catch {
      showContactMapFallback("Не удалось загрузить карту. Откройте точки по кнопке выше в Яндекс Картах.");
    }
  };

  const waitForYandexMap = () => {
    if (window.ymaps?.ready) {
      window.ymaps.ready(initContactMap);
      return;
    }

    window.setTimeout(waitForYandexMap, 120);
  };

  waitForYandexMap();
}

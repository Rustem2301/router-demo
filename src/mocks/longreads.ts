export enum LongreadTypes {
  Post = 'post',
  News = 'news',
  Timeline = 'timeline',
}

export type LongreadAuthor = {
  name: string;
  position: string;
};

export type LongreadStats = {
  reactions: number;
  comments: number;
  views: number;
};

export type LongreadTimelineEntry = {
  date: string;
  title: string;
  description: string;
};

export type LongreadItem = {
  id: string;
  type: LongreadTypes;
  title: string;
  excerpt: string;
  author: LongreadAuthor;
  publishedAt: string;
  tags: string[];
  cover: string;
  stats: LongreadStats;
  paragraphs: string[];
  entries?: LongreadTimelineEntry[];
};

export type LongreadParams = {
  type: LongreadTypes;
  id: string | number;
  postType?: string;
  newsType?: string;
};

export const longreads: Record<LongreadTypes, LongreadItem[]> = {
  [LongreadTypes.Post]: [
    {
      id: '1',
      type: LongreadTypes.Post,
      title: 'Как мы открываем longread поверх текущей страницы',
      excerpt:
        'Разбираем схему с фоновым location: пользователь остаётся в ленте, а longread рендерится отдельным роутом поверх неё.',
      author: { name: 'Анна Петрова', position: 'Frontend-разработчик' },
      publishedAt: '12 октября 2026',
      tags: ['React', 'React Router', 'Архитектура'],
      cover: 'linear-gradient(135deg, #1677ff 0%, #69b1ff 100%)',
      stats: { reactions: 128, comments: 32, views: 1840 },
      paragraphs: [
        'Когда longread — это полноценная страница, но открывать её хочется как модальное окно, помогает трюк с фоновым location. Мы запоминаем текущий location в state навигации и рендерим основные роуты по этому сохранённому адресу.',
        'Сам longread при этом живёт на отдельном URL. Это значит, что ссылку можно скопировать, отправить коллеге или открыть в новой вкладке — роут отработает как обычная страница.',
        'При закрытии мы возвращаемся на адрес из state или query-параметра from. Если longread открыли по прямой ссылке, фонового location нет, поэтому закрытие уводит на главную.',
        'Такой подход не требует module federation и легко повторяется в любом приложении на React Router: достаточно одного провайдера, хука навигации и роута longread.',
      ],
    },
    {
      id: '2',
      type: LongreadTypes.Post,
      title: 'Паттерн useBlocker без data router',
      excerpt:
        'Кастомный провайдер перехватывает push, replace и go и спрашивает подтверждение перед переходом.',
      author: { name: 'Игорь Соколов', position: 'Tech Lead' },
      publishedAt: '9 октября 2026',
      tags: ['React Router', 'Навигация'],
      cover: 'linear-gradient(135deg, #722ed1 0%, #b37feb 100%)',
      stats: { reactions: 94, comments: 17, views: 1210 },
      paragraphs: [
        'Штатный useBlocker из React Router требует data router. Если приложение построено на BrowserRouter, можно обернуть NavigationContext и подменить методы navigator.',
        'Провайдер хранит функцию shouldBlock в ref. Перед каждым push, replace или go он вызывает её и ждёт промис. Если функция вернула true, переход отменяется.',
        'Хук useBlocker просто регистрирует новую функцию в контексте. А useModalBlocker поверх него показывает confirm-модалку и возвращает результат пользователю.',
        'Главное ограничение — браузерные кнопки назад и вперёд. Они работают через popstate и не проходят через navigator.push, поэтому их нужно обрабатывать отдельно.',
      ],
    },
    {
      id: '3',
      type: LongreadTypes.Post,
      title: 'Три страницы, один sandbox и ноль магии',
      excerpt:
        'Минимальный проект на React, React Router и Ant Design, в котором можно потрогать longread и блокировку навигации.',
      author: { name: 'Мария Волкова', position: 'Product Engineer' },
      publishedAt: '5 октября 2026',
      tags: ['Sandbox', 'Ant Design'],
      cover: 'linear-gradient(135deg, #13c2c2 0%, #87e8de 100%)',
      stats: { reactions: 61, comments: 8, views: 760 },
      paragraphs: [
        'Sandbox повторяет ключевые механики основного приложения, но без module federation и лишней инфраструктуры. Здесь только React, React Router и Ant Design.',
        'На главной и на странице новостей есть кнопки, которые открывают longread. На странице настроек включён тот же useBlocker, что и в основном приложении.',
        'Измените любое поле настроек и попробуйте уйти на другую страницу — появится подтверждение. Сохраните изменения, и навигация снова станет свободной.',
      ],
    },
  ],
  [LongreadTypes.News]: [
    {
      id: '1',
      type: LongreadTypes.News,
      title: 'Внутренний митап по фронтенду пройдёт в четверг',
      excerpt: 'Обсудим роутинг, longread-сценарии и то, как не сломать навигацию в больших SPA.',
      author: { name: 'Редакция', position: 'Новости компании' },
      publishedAt: '14 октября 2026',
      tags: ['События', 'Frontend'],
      cover: 'linear-gradient(135deg, #fa8c16 0%, #ffd591 100%)',
      stats: { reactions: 45, comments: 6, views: 980 },
      paragraphs: [
        'В четверг в 18:00 пройдёт внутренний митап, посвящённый фронтенду. В программе — разбор longread-роутинга и паттернов блокировки навигации.',
        'Коллеги покажут, как устроен кастомный useBlocker на BrowserRouter, и какие подводные камни встречаются при работе с фоновым location.',
        'Запись встречи появится в корпоративной базе знаний в начале следующей недели.',
      ],
    },
    {
      id: '2',
      type: LongreadTypes.News,
      title: 'Обновили дизайн-систему: новые токены и компоненты',
      excerpt: 'В релиз вошли обновлённые токены отступов, типографики и новые состояния компонентов.',
      author: { name: 'Дизайн-команда', position: 'Design System' },
      publishedAt: '11 октября 2026',
      tags: ['Дизайн', 'Релиз'],
      cover: 'linear-gradient(135deg, #eb2f96 0%, #ffadd2 100%)',
      stats: { reactions: 73, comments: 12, views: 1130 },
      paragraphs: [
        'Мы обновили дизайн-систему: добавили новые токены отступов, поправили типографику и расширили набор состояний для кнопок и полей ввода.',
        'Все изменения обратно совместимы. Командам достаточно обновить версию пакета и проверить ключевые экраны.',
        'Подробный changelog и гайд по миграции доступны во внутренней документации.',
      ],
    },
  ],
  [LongreadTypes.Timeline]: [
    {
      id: '1',
      type: LongreadTypes.Timeline,
      title: 'Дайджест недели: роутинг, релизы и митап',
      excerpt: 'Короткая хронология главных событий недели.',
      author: { name: 'Команда портала', position: 'Дайджест' },
      publishedAt: '18 октября 2026',
      tags: ['Дайджест', 'Неделя'],
      cover: 'linear-gradient(135deg, #52c41a 0%, #b7eb8f 100%)',
      stats: { reactions: 39, comments: 4, views: 620 },
      paragraphs: [
        'Собрали главное за неделю в формате таймлайна. Ниже — ключевые события и ссылки на подробности.',
      ],
      entries: [
        {
          date: 'Понедельник',
          title: 'Запустили sandbox с longread',
          description: 'Проверили сценарий открытия longread поверх текущей страницы.',
        },
        {
          date: 'Среда',
          title: 'Обновили дизайн-систему',
          description: 'Добавили новые токены и состояния компонентов.',
        },
        {
          date: 'Пятница',
          title: 'Анонсировали митап',
          description: 'Встреча пройдёт в четверг в 18:00, тема — фронтенд-навигация.',
        },
      ],
    },
    {
      id: '2',
      type: LongreadTypes.Timeline,
      title: 'История одного рефакторинга навигации',
      excerpt: 'Как мы убирали дублирование роутов и добавляли блокировку переходов.',
      author: { name: 'Игорь Соколов', position: 'Tech Lead' },
      publishedAt: '7 октября 2026',
      tags: ['Рефакторинг', 'Навигация'],
      cover: 'linear-gradient(135deg, #2f54eb 0%, #adc6ff 100%)',
      stats: { reactions: 52, comments: 9, views: 845 },
      paragraphs: [
        'Навигация в большом приложении обрастает деталями: фоновые location, модальные роуты, подтверждения переходов. Мы собрали это в несколько независимых механизмов.',
      ],
      entries: [
        {
          date: 'Шаг 1',
          title: 'Вынесли longread в отдельный роут',
          description: 'Так ссылка на longread стала обычной, которую можно открыть в новой вкладке.',
        },
        {
          date: 'Шаг 2',
          title: 'Добавили NavigationBlockerProvider',
          description: 'Провайдер перехватывает методы navigator и спрашивает подтверждение.',
        },
        {
          date: 'Шаг 3',
          title: 'Покрыли сценарии тестами',
          description: 'Проверили открытие, закрытие и переходы с несохранёнными изменениями.',
        },
      ],
    },
  ],
};

export const getLongread = (type: string | undefined, id: string | undefined): LongreadItem | null => {
  if (!type || !id) {
    return null;
  }

  const collection = longreads[type as LongreadTypes] || [];

  return collection.find((item) => String(item.id) === String(id)) || null;
};

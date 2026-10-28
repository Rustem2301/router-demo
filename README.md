# Router sandbox

Демо вложенных модальных маршрутов на React Router: группа → альбомы → альбом → фото, с ленивой загрузкой страниц и закрытием модалок через историю.

Дополнительно есть вариант с одной модалкой-визардом: `/groups/:groupId/files`, которая по необязательным параметрам открывает файл и комментарий.

- Демо: `https://rustem2301.github.io/router-demo/`
- Исходники: `https://github.com/Rustem2301/router-demo`

## Вариант 2: модалка-визард

Маршрут один:

```text
/groups/:groupId/files/:fileId?/comments?/:commentId?
```

Он покрывает:

- `/groups/:groupId/files` — список файлов;
- `/groups/:groupId/files/:fileId` — файл поверх визарда;
- `/groups/:groupId/files/:fileId/comments/:commentId` — комментарий поверх файла.

Внутри `GroupFilesWizard` по `useParams` определяет, какие модалки показать. Закрытие визарда использует нативный `navigate('..', { relative: 'route', replace: true })` и возвращает на страницу группы. Файл и комментарий закрываются навигацией на родительский URL через параметры.

Для демо используются существующие моки: альбом = файл, изображение = комментарий.

## Локальный запуск

```bash
npm ci
npm start
```

Приложение откроется на `http://localhost:3000`.

## Проверки

```bash
npm run typecheck
npm run lint
npm run build
```

## Деплой на GitHub Pages

Деплой выполняется через GitHub Actions (`.github/workflows/deploy.yml`) при пуше в `master`.

1. Создайте публичный репозиторий на GitHub.
2. Запушьте ветку `master`.
3. В настройках репозитория включите **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Дождитесь завершения workflow — ссылка на демо появится в окружении `github-pages`.

Во время сборки в CI задаётся `PUBLIC_URL=/<repo>`, поэтому приложение и роутер корректно работают из подпапки GitHub Pages.
Для прямых ссылок на вложенные маршруты в артефакт добавляется `404.html` — копия `index.html`.

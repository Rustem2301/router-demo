# Router sandbox

Демо вложенных модальных маршрутов на React Router: группа → альбомы → альбом → фото, с ленивой загрузкой страниц и закрытием модалок через историю.

- Демо: `https://rustem2301.github.io/router-demo/`
- Исходники: `https://github.com/Rustem2301/router-demo`

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

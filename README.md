## Установка

Убедиться, что на машине установлена PostgreSQL

Создать .env со своими данными по образцу .env.example.
Затем:

```
yarn
```

или

```
npm i
```

После чего запустить миграции:

```
yarn typeorm -d .\migrations\migrations-config.ts migration:run
```

или

```
npm run typeorm migration:run -- -d .\migrations\migrations-config.ts
```

После чего возможно запустить приложение:

```
yarn start:dev
```

или

```
npm run start:dev
```

## Доступные машруты

```
  localhost:3000/auth/register POST

  body: {
    "email": "example@mail.com",
    "password": "strongPASS1"
  }
```

```
  localhost:3000/auth/login POST

  body: {
    "email": "example@mail.com",
    "password": "strongPASS1"
  }
```

```
  localhost:3000/auth/refresh POST
```

```
  localhost:3000/auth/logout POST
```

```
  localhost:3000/news GET
```

```
  localhost:3000/news POST

  body: {
    "title": "news title",
    "text": "news text"
  }
```

```
  localhost:3000/news/:id PATCH

  body: {
    "title": "new title",
    "text": "new text"
  } - оба поля опциональны
```

```
  localhost:3000/news/:id DELETE
```

## Описание .env параметов:

APP_HOST=имя-хоста

APP_PORT=порт

DB_USERNAME=имя-пользователя-БД

DB_PASSWORD=пароль-пользователя-БД

DB_DATABASE=имя-БД

DB_HOST=имя-хоста-БД

DB_PORT=порт-БД

ACCESS_TOKEN_EXPIRATION_TIME=время-действия-токена-доступа

ACCESS_TOKEN_SECRET=секрет-токена-доступа

REFRESH_TOKEN_EXPIRATION_TIME=время-действия-токена-обновления

REFRESH_TOKEN_SECRET=секрет-токена-обновления

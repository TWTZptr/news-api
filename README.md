## Установка

Убедится, что на машине установлена PostreSQL

Создать .env со своими данными по образцу .env.example.

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

Описание .env параметов:

APP_HOST=имя-хоста

APP_PORT=порт

POSTGRES_USER=имя-пользователя-БД

POSTGRES_PASSWORD=пароль-пользователя-БД

POSTGRES_DB=имя-БД

POSTGRES_HOST=имя-хоста-БД

POSTGRES_PORT=порт-БД

ACCESS_TOKEN_EXPIRATION_TIME=время-действия-токена-доступа

ACCESS_TOKEN_SECRET=секрет-токена-доступа

REFRESH_TOKEN_EXPIRATION_TIME=время-действия-токена-обновления

REFRESH_TOKEN_SECRET=секрет-токена-обновления

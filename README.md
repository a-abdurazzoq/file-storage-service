# file-storage-service

Безопасный REST API сервис для управления файлами с поддержкой аутентификации через JWT, который позволяет пользователям регистрироваться, авторизоваться, обновлять токены и выполнять операции с файлами.

## 📋 Основные возможности

- **Аутентификация и авторизация**: Регистрация, Авторизация, Удаления токена, Обновления токена.
- **Работа с файлами**: Загрузка, скачивание, обновление и удаление файлов с сохранением информации о каждом файле.

## 🛠️ Технологический стек

- **Backend**: Node.js
- **База данных**: MySQL
- **Библиотеки**: Express.js, Prisma, Multer, jsonwebtoken, Bcrypt 


## 📝 Структура проекта

| Названия директорию | Описание                                        |
|:-------------------:|:------------------------------------------------|
|      `domain`       | Бизнес-сущности и интерфейсы                    |
|    `application`    | Use cases и бизнес-логика                       |
|  `infrastructure`   | Реализации Server, Database, Cache, Logger, IoC |
|     `adapters`      | Контроллеры / Презентеры                        |
|      `config`       | Конфиги который берутся из .env                 |


## 🚀 API Эндпоинты
### Авторизация
| Метод    | Путь                     | Описание                                           |
|----------|:-------------------------|:---------------------------------------------------|
| **POST** | ``/signin``              | Получение JWT-токена по `userId` и `password`.     |
| **POST** | ``/signin/update_token`` | Обновление JWT-токена по refresh-token.            |
| **POST** | ``/signup``              | Регистрация нового пользователя.                   |
| **GET**  | ``/info``                | Получение информации о текущем пользователе.       |
| **GET**  | ``/logout``              | Выход из системы, блокировка текущего токена.      | 

### Работа с файлами
| Метод      | Путь               | Описание                                                     |
|------------|:-------------------|:-------------------------------------------------------------|
| **POST**   | ``/file/upload``   | Загрузка файла, сохранение его параметров в базу данных.     |
| **GET**    | ``/file/list``     | Получение списка файлов с параметрами, поддержка пагинации.  |
| **DELETE** | ``/file/delete``   | Удаление файла из базы данных и локального хранилища.        |
| **GET**    | ``/file/``         | Получение информации о выбранном файле.                      |
| **GET**    | ``/file/download`` | Скачивание файла.                                            | 
| **PUT**    | ``/file/update``   | Обновление файла в базе и локальном хранилище.               |


## 📦 Postman Коллекция
Для удобства работы с API вы можете использовать [коллекцию Postman](./postman/file-manager-service.postman_collection), которая включает все указанные выше эндпоинты и примеры запросов.

---

## 📦 Установка и настройка

### 1. Клонирование репозитория

```bash
git clone https://github.com/username/file-storage-service.git
cd file-storage-service
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка окружения
Создайте файл `.env`, скопировав и переименовав `.env.example`, и заполните его необходимыми значениями:

| Названия                      | Тип      | Пример                      | Описание                                                    |
|-------------------------------|:---------|:----------------------------|:------------------------------------------------------------|
| `SERVER_HOST`                 | `STRING` | `127.0.0.1`                 | Хост сервера                                                |
| `SERVER_PORT`                 | `NUMBER` | `3000`                      | Порт сервера                                                |
| `SERVER_CORS_ORIGIN`          | `STRING` | `https://example.com`       | Разрешенные источники для CORS (можно указать "*" для всех) |
| `DATABASE_URL`                | `STRING` | `mysql://user:pass@host/db` | URL подключения к MySQL базе данных через Prisma            |
| `USER_PASSWORD_SALT_LENGTH`   | `NUMBER` | `8`                         | Длина соли для хеширования пароля                           |
| `USER_JWT_REFRESH_SECRET`     | `STRING` | `your_jwt_secret`           | Секретный ключ для подписи JWT refresh токенов              |
| `USER_JWT_ACCESS_EXPIRATION`  | `STRING` | `600s`                      | Время жизни access токена (10 минут = 600 секунд)           |
| `USER_JWT_REFRESH_EXPIRATION` | `STRING` | `7d`                        | Время жизни refresh токена (7 дней)                         |
| `FILE_STORAGE_PATH`           | `STRING` | `/tmp`                      | Путь для хранения файлов                                    |

### 4. Настройка базы данных
```shell
# Создание и применение миграций
npx prisma migrate dev

# Генерация Prisma Client
npx prisma generate
```

### 5. Запуск сервиса

```shell
npm run dev
```

## ⚙️ Сборка и запуск для продакшн
Для сборки и запуска приложения в продакшн окружении:
```shell
npm run build
npm start
```

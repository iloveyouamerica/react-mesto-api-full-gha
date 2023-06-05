[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`. 
  
Ссылка на сайт, размещенный на Яндекс.Облаке: https://mesto.frontend.nomoredomains.rocks

Адрес репозитория: https://github.com/iloveyouamerica/react-mesto-api-full-gha

## Ссылки на проект

IP-адрес 158.160.101.46

Frontend https://mesto.frontend.nomoredomains.rocks

Backend https://api.mesto.frontend.nomoredomains.rocks

Список маршрутов к API
GET POST /users
GET-запрос возвращает всех пользователей из базы данных.
POST-запрос создаёт пользователя с переданными в телезапрос имя, информацию, аватар

GET /users/:userId
GET-запрос возвращает пользователя по переданному _id

PATCH /users/me
PATCH-запрос обновляет информацию о пользователе

GET /users/me
GET-запрос возвращает информацию об интересе пользователя

PATCH /users/me/avatar
PATCH-запрос обновляет аватар пользователя

GET POST /cards
GET-запрос возвращает все карточки из базы данных.
POST-запрос создает новую карточку по переданным параметрам

УДАЛИТЬ /cards/:cardId
УДАЛИТЬ-запрос защиты карточку по _id

ПОСТАВИТЬ УДАЛИТЬ /cards/:cardId/likes
ПОСТАВИТЬ-запрос добавить лайк карточке. DELETE-запрос регистрации лайк с карточки

POST /signin
POST-запрос осуществляет авторизацию по полям email и пароль

POST /signup
POST-запрос регистрации по полям email и пароль
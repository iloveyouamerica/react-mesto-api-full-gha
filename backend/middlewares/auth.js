// миддлвэр auth
require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // дастаём авторизационный заголовок
  const { authorization } = req.headers;
  // console.log(`Это переменная authorization из req.headers = ${authorization}`);

  // проверим что заголовок есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Нужно авторизоваться'));
  }

  // достаём токен и методом replace отсекаем приставку Bearer
  const token = authorization.replace('Bearer ', '');
  // console.log(`token = ${token}`);
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  // console.log(req.user);

  return next(); // пропускаем запрос дальше
};

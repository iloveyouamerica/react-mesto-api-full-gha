const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const loginRouter = require('./routes/login');
const router = require('./routes/index');
const { NotFoundError } = require('./errors/errorsExport');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb2');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.get('/crash-test', (next) => {
  setTimeout(() => next(new Error('Сервер сейчас упадёт')), 0);
});

app.use(loginRouter);
app.use(auth);
app.use(router);

app.use((req, res, next) => next(new NotFoundError('Маршрут не найден')));

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT} - сервер 2`);
});

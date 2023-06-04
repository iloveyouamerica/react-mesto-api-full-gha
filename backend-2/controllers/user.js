require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

const User = require('../models/user');

const {
  NotFoundError, UnauthorizedError, ConflictError, BadRequestError
} = require('../errors/errorsExport');

const validateUser = (res, user) => {
  if (!user) {
    throw new NotFoundError('Пользователь по указанному _id не найден.');
  }
  return res.send(user);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => validateUser(res, user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar
  } = req.body;

  bcrypt.hash(password, 10).then((hashPassword) => {
    User.create({
      email, password: hashPassword, name, about, avatar
    })
      .then((user) => {
        res.status(201).send({
          name: user.name, email: user.email, about: user.about, avatar: user.avatar
        });
      })
      .catch((err) => {
        if (err.name instanceof Error.ValidatorError) {
          return next(new BadRequestError('Некорректные данные при создании пользователя'));
        }
        if (err.code === 11000) {
          return next(new ConflictError());
        }
        return next(err);
      });
  }).catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => validateUser(res, user))
    .catch((err) => {
      if (err.name instanceof Error.ValidatorError) {
        return next(new BadRequestError('Некорректные данные при обновлении пользователя'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => validateUser(res, user))
    .catch((err) => {
      if (err.name instanceof Error.ValidatorError) {
        return next(new BadRequestError('Некорректные данные при обновлении аватара пользователя'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

          res.send({ token });
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getAllUsers, getUser, createUser, updateUser, updateAvatar, login, getCurrentUser
};

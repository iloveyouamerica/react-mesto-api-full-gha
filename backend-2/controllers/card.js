const { Error } = require('mongoose');

const Card = require('../models/card');
const { BadRequestError, NotFoundError } = require('../errors/errorsExport');

const validateCard = (res, card) => {
  if (!card) {
    throw new NotFoundError('Пользователь по указанному _id не найден.');
  }
  return res.send(card);
};

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name instanceof Error.ValidatorError) {
        return next(new BadRequestError('Некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const removeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      return res.send({ message: 'Удаление прошло успешно' });
    })
    .catch((err) => {
      if (err.name instanceof Error.CastError) {
        return next(new BadRequestError('Неверный _id'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => validateCard(res, card))
    .catch((err) => {
      if (err.name instanceof Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => validateCard(res, card))
    .catch((err) => {
      if (err.name instanceof Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
      }
      return next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard
};

// контроллеры карточек
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundErros');
const RequestError = require('../errors/RequestError');
const ForbiddenError = require('../errors/ForbiddenError');

// получение всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next); // .catch(err => next(err));
};

// создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

// удаление карточки (может удалить только владелец)
const deleteCard = (req, res, next) => {
  const userId = req.user._id; // текущий авторизованный пользователь
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка с таким id не найдена'))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('Удалить эту карточку может только автор');
      }
      return Card.deleteOne({ _id: card._id })
        .then(() => card); // Возвращаем удаленную карточку
    })
    .then((deletedCard) => res.status(200).send(deletedCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Неверный id карточки'));
      }
      return next(err);
    });
};

// добавление лайка карточке
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new NotFoundError('Карточка с таким id не найдена'))
    .then((updateCard) => res.status(200).send(updateCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Передан некорректный id карточки'));
      }
      return next(err);
    });
};

// удаление лайка карточке
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new NotFoundError('Карточка с таким id не найдена'))
    .then((updateCard) => res.status(200).send(updateCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Передан некорректный id карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

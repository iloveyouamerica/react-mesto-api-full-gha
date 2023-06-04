const router = require('express').Router();
const { celebrate } = require('celebrate');

const protectedDeleteCard = require('../middlewares/deleteCard');
const { createCardValidation, cardIdValidation } = require('../utils/validation');

const {
  getAllCards,
  removeCard,
  createCard,
  likeCard,
  dislikeCard
} = require('../controllers/card');

router.get('/', getAllCards);
router.delete('/:cardId', celebrate(cardIdValidation), protectedDeleteCard, removeCard);
router.post('/', celebrate(createCardValidation), createCard);
router.put('/:cardId/likes', celebrate(cardIdValidation), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdValidation), dislikeCard);

module.exports = router;

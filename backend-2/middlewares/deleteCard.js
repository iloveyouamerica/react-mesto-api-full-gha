const Card = require('../models/card');
const { ForbiddenError, NotFoundError } = require('../errors/errorsExport');

module.exports = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }

      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return next();
    })
    .catch(next);
};

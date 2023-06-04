class ForbiddenError extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = 'попытка удалить чужую карточку';
  }
}

module.exports = { ForbiddenError };

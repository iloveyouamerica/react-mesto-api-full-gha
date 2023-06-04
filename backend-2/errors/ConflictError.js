class ConflictError extends Error {
  constructor() {
    super();
    this.statusCode = 409;
    this.message = 'Ошибка регистрации с указанным адресом электронной почты';
  }
}

module.exports = { ConflictError };

const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { regexUrl } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Введен некорректный адрес электронной почты'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => regexUrl.test(avatar),
      message: 'Ссылка не прошла проверку'
    }
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('user', userSchema);

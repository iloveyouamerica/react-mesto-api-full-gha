const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signInValidation, signUpValidation } = require('../utils/validation');

const {
  createUser,
  login
} = require('../controllers/user');

router.post('/signin', celebrate(signInValidation), login);
router.post('/signup', celebrate(signUpValidation), createUser);

module.exports = router;

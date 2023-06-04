const router = require('express').Router();
const { celebrate } = require('celebrate');

const { getUserValidation, updateUserValidation, updateAvatarValidation } = require('../utils/validation');
const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require('../controllers/user');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(getUserValidation), getUser);
router.patch('/me', celebrate(updateUserValidation), updateUser);
router.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = router;

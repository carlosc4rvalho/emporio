const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.post('/users', registerUser);
router.get('/users', loginUser);
router.get('/users/:id', getUser);
router.put('/users/', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;

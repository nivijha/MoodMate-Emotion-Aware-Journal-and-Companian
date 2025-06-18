const express = require('express');
const router = express.Router();
const { register, login, refreshToken } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validators');

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);

module.exports = router; 
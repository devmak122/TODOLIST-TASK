const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { signupUser, login, logout } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', login);

router.post('/logout', logout);



module.exports = router;
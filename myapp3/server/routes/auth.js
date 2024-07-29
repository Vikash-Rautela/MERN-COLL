const express = require('express');
const { signIn } = require('../controllers/signinController');
const { signUp } = require('../controllers/signupController');

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;
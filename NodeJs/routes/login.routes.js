const express = require('express')
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.post('/signin', loginController.signin);
router.post('/signup', loginController.signup);

module.exports = router;
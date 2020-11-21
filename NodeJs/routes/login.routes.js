const express = require('express')
const router = express.Router();
const loginCtrl = require('../controllers/login.controller');

router.post('/signin', loginCtrl.signin);
router.post('/signup', loginCtrl.signup);

module.exports = router;
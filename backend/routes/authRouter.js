const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController');

router.post('/login',authController.Login);
router.post('/signup',authController.SignUp);


module.exports = router;
const express = require('express')
const { sign_up } = require('../controllers/Auth/signup')
const { verify_otp } = require('../controllers/Auth/verify_otp')
const { login } = require('../controllers/Auth/login')
const router = express.Router()

// define the home page route
router.post('/signup', sign_up)
router.put('/verify-otp',verify_otp)
router.post('/login',login)
// define the about route


module.exports = router


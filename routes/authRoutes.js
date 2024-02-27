const express = require('express')
const { sign_up } = require('../controllers/Auth/signup')
const { verify_otp } = require('../controllers/Auth/verify_otp')
const { login } = require('../controllers/Auth/login')
const { resend_otp } = require('../controllers/Auth/resend_otp')
const authRouter = express.Router()

// define the home page route
authRouter.post('/signup', sign_up)
authRouter.put('/verify-otp',verify_otp)
authRouter.post('/login',login)
authRouter.post('/resend-otp',resend_otp)
// define the about route


module.exports = authRouter


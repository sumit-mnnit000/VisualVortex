const express = require('express')
const { sign_up } = require('../controllers/Auth/signup')
const router = express.Router()

// define the home page route
router.post('/', sign_up)
// define the about route


module.exports = router


const express = require('express')
const { profile } = require('../controllers/Profile/profile')
const { update_profile } = require('../controllers/Profile/update_profile')
const profileRouter = express.Router()
const verifyToken = require('../middlewares/authMiddleware')
const { test_notification } = require('../controllers/Profile/test_notification')

// define the home page route
profileRouter.get('/user',verifyToken, profile)
profileRouter.put('/user',verifyToken,update_profile)
profileRouter.get('/test-notification',test_notification)
// define the about route


module.exports = profileRouter


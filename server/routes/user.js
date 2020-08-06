const express = require('express')
const router  = express.Router()
let UserController = require('../controllers/user')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
module.exports = router
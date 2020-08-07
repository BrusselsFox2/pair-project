const router = require('express').Router()
let NewsController = require('../controllers/NewsController')

// News API
router.get('/', NewsController.getNews)

module.exports = router
const router = require('express').Router()
let TrendingController = require('../controllers/TrendingController')

// News API
router.get('/', TrendingController.getTrending)

module.exports = router
const router = require('express').Router()

const movieRoute = require('./movie-route')
const userRouter = require('./user')
const newsRouter = require('./news')
const NewsController = require('../controllers/NewsController')

router.use('/users', userRouter)
router.use('/movies', movieRoute)
router.use('/news', newsRouter)

// News API
router.get('/news', NewsController.getNews)

module.exports = router

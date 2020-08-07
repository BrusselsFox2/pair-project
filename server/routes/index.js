const router = require('express').Router()

const movieRoute = require('./movie-route')
const userRouter = require('./user')
const newsRouter = require('./news')
const trendingRouter = require('./trending')


router.use('/users', userRouter)
router.use('/movies', movieRoute)
router.use('/news', newsRouter)
router.use('/trending', trendingRouter)

module.exports = router

const router = require('express').Router()

const movieRoute = require('./movie-route')
const userRouter = require('./user')

const tvMazeRoute = require('./tvMaze')

router.use('/users', userRouter)
router.use('/movies',movieRoute)
router.use('/search', tvMazeRoute)

const newsRouter = require('./news')
const trendingRouter = require('./trending')


router.use('/news', newsRouter)
router.use('/trending', trendingRouter)

module.exports = router

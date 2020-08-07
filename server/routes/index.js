const router = require('express').Router()

const movieRoute = require('./movie-route')
const userRouter = require('./user')
const tvMazeRoute = require('./tvMaze')

router.use('/users', userRouter)
router.use('/movies',movieRoute)
router.use('/search', tvMazeRoute)


module.exports = router

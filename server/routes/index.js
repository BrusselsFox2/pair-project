const router = require('express').Router()

const movieRoute = require('./movie-route')
const userRouter = require('./user')

router.use('/users', userRouter)
router.use('/movies',movieRoute)

module.exports = router

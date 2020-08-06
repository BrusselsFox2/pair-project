let router = require('express').Router()

let userRouter = require('./user')

router.use('/users', userRouter)

module.exports = router
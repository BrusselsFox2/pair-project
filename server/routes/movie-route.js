const route = require('express').Router()
const MovieController = require('../controllers/movie-controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.post('/', authorization, MovieController.create)
route.get('/',authorization ,MovieController.show)
route.put('/:id',authorization , MovieController.update)
route.delete('/:id',authorization , MovieController.delete)

module.exports = route
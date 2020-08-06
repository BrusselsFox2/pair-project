const route = require('express').Router()
const MovieController = require('../controllers/movie-controllers')

route.post('/', MovieController.create)
route.get('/', MovieController.show)
route.put('/:id', MovieController.update)
route.delete('/:id', MovieController.delete)

module.exports = route
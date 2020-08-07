const router = require('express').Router()
const tvMazeController = require('../controllers/tvMaze')


router.post('/:query', tvMazeController.getData)
module.exports = router
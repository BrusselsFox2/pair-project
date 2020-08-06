const { Movie } = require('../models')
const { where } = require('sequelize/types')

class MovieController {
    static create(req, res, next) {
        let { title, genre, poster, review } = req.body
        console.log(req.body)
        let { id } = req.userData
        let obj = { title, genre, poster, review, userId: id}
        Movie.create(obj)
            .then(data => {
                res.status(201).json({Movie: data})
            })
            .catch(err => {
                next(err)
            })
    }

    static show(req, res, next) {
        let { id } = req.userData
        Movie.findAll({where: {userId: id}})
            .then(datas => {
                res.status(200).json({Movies: datas})
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        let id = req.params.id
        let { title, genre, poster, review, userId } = req.body
        let obj = { title, genre, poster, review, userId }
        Movie.update(obj, {where: {id}, returning: true})
            .then(data => {
                res.status(200).json({Movie: data})
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id
        Movie.destroy({where: {id}})
            .then(data => {
                res.status(200).json({status: 'Success delete movie'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = MovieController
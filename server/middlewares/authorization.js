const { Movie } = require("../models")

async function authorization(req, res, next) {
    try {
        let id = +req.params.id
        let data = await Movie.findByPk(id)
        if (!data) throw { msg: 'Movie not found' }
        else if (data.userId == req.userData.id) next()
        else throw { msg: ` You are not authorized`, status: 401 }
    }
    catch (err) {
        next(err)
    }

}

module.exports = authorization
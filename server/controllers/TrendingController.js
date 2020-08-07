const axios = require('axios')

class TrendingController {
    static getTrending(req, res, next) {

        const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.THEMOVIEDB_API}`
        axios({
            method: 'get',
            url: url
        })
            .then(response => {
                res.status(200).json({ trending: response.data })
            })
            .catch(err => next(err))
    }
}

module.exports = TrendingController
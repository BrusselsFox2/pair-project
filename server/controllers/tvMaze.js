const axios = require('axios')

class tvMazeController {
    static getData (req, res, next) {
        let query = req.params.query
        axios({
            method: 'get',
            url: `http://api.tvmaze.com/search/shows?q=${query}`
        })
        .then(response => {
            console.log(response.data[0].show)
            let arr = []
            response.data.forEach(movie => {
                arr.push(movie.show)
            });
            res.status(200).json({Movies: arr})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = tvMazeController
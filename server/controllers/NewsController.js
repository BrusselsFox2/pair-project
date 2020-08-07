const axios = require('axios')

class NewsController {
    static getNews(req, res, next) {

        const url = `http://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${process.env.NEWS_API}`
        axios({
            method: 'get',
            url: url
        })
            .then(response => {
                res.status(200).json({ news: response.data })
            })
            .catch(err => next(err))
    }
}

module.exports = NewsController
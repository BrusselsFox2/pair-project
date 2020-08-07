const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt.js")

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        let decoded = verifyToken(access_token)
        const user = await User.findOne({ where: { email: decoded.email } })
        if (!user) throw { msg: 'Authentication Failed', status: 401 }
        else {
            req.userData = decoded
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication
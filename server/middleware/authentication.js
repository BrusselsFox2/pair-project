const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

async function authentication(req, res, next){
    try{
        let { access_token } = req.headers
        let decoded = verifyToken(access_token)
        let user = await User.findOne({
            where: { email: decoded.email}
        })
        if (!user) throw { msg: 'Authtentication failed', status: 401}
        else{
            req.userData = decoded
            next()
        }
    }
    catch (err){
        next(err)
    }
}

module.exports = authentication 
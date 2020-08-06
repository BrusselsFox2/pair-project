let { User} = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController{

    static register(req, res, next){
        let {email, password} = req.body
        // console.log(req.body)
        User.create({email, password})
            .then(user => {
                res.status(201).json({msg: `${user.email} succesfuly registered`, id: user.id, email: user.email})
            })
            .catch(err =>{
                next(err)
            })
    }

    static login(req, res, next){
        let {email, password} = req.body;

            User.findOne({
                where : {email}
            })
            .then(data =>{
                if (!data) throw {msg: "Error! password & email salah", status: 400}
               
                let cekpassword = bcrypt.compare(password, data.password)
                if (cekpassword){
                    // jika berhasil login
                    // bikin token
                    const access_token = jwt.generateToken({id: data.id, email: data.email} )
                    res.status(200).json({email: data.email, access_token: `${access_token}`})
                } else {
                    throw {msg: "Error! password & email salah"}
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController
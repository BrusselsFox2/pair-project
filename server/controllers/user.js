let { User} = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

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

    static googlelogin(req, res, next){
        const { id_token } = req.body

        let user = null;
        const client = new OAuth2Client(`639283781027-quc5c5k95tigqf1hdaufe3k8nlq0n9pr.apps.googleusercontent.com`);
        client.verifyIdToken({
            idToken: id_token,
            audience: `639283781027-quc5c5k95tigqf1hdaufe3k8nlq0n9pr.apps.googleusercontent.com`,
        })
            .then(ticket => {
                user = ticket.getPayload()
                return User.findOne({
                    where: { email: user.email }
                })
            })
            .then(foundUser => {
                console.log(foundUser, "==========");
                if (foundUser) return foundUser
                else {
                    return User.create({
                        email: user.email,
                        password: `${user.email}5`
                    })
                }
            }).then(foundUser => {
                console.log(foundUser, `<<<<<<<<<<<<<<<<`)
                const access_token = jwt.generateToken({id: foundUser.id, email: foundUser.email})
                    res.status(200).json({msg: `${foundUser.email} successfully login`, access_token: `${access_token}`})
            }).catch(err => {
                next(err)
            })

    }


}

module.exports = UserController
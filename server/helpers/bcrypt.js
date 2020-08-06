const bcrypt = require('bcryptjs');

function hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

function compare(userPassword, dbPassword) {
    return bcrypt.compareSync(userPassword, dbPassword)
}

module.exports = { hash, compare }

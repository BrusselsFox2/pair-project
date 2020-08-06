async function errorHandler(err, req, res, next) {
    let statusCode = 500
    let errors = []

    switch (err.name) {
        case "SequelizeValidationError":
            err.errors.forEach(item => errors.push(item.message))
            statusCode = 400
            break;
        case 'JsonWebTokenError':
            errors.push('You are not Authorized')
            statusCode = 401
            break;
        case 'SequelizeUniqueConstraintError':
            errors.push(err.errors[0].message)
            statusCode = 400
            break;
        default:
            errors.push(err.msg)
            statusCode = err.status || statusCode
    }
    res.status(statusCode).json({ error: errors })
}

module.exports = errorHandler



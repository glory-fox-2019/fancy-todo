module.exports = {

    errorHandler(err, req, res, next) {
        console.log(err.message, 'from error handler <<<<<<<<')
        if (err.code == 404) {
            res.status(404).json({
                code: 404,
                message: err.message
            })
        } else if (err.code == 401) {
            res.status(401).json({
                code: 401,
                message: err.message
            })
        } else if (err.name == "JsonWebTokenError") {
            res.status(401).json({
                code: 401,
                message: 'Invalid token.'
            })
        } else if (err.name == "SequelizeValidationError") {
            res.status(400).json({
                code: 400,
                message: err.message.split(',')
            })
        } else if (err.message == "Cannot read property 'UserId' of null") {
            res.status(404).json({
                code: 404,
                message: 'Not Found'
            })
        } else {
            res.status(500).json({
                code: 500,
                message: err.message
            })
        }
    }
}
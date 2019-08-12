const Helper = require('../helper/helper');

function authentication(req, res, next) {
    let token = req.headers.token

    if (!token) {
        req.status(401).json({error: 'anda hasus login terlebih dahulu'})
    } else {
        try{
            const decoded = Helper.verifyJWT(token)
            req.decoded = decoded,
            req.headers.id = decoded.id,
            req.headers.name = decoded.name
            next()
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = authentication
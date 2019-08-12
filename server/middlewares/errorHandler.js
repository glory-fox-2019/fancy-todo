module.exports = (err, req, res, next) =>{
    console.log(err)
    switch (err.code) {
        case 400:
            res.status(400).json(err.message)
            break;
        case 401:
            res.status(401).json(err.message)
            break;
        case 403:
            res.status(403).json(err.message)
            break;
        case 404:
            res.status(404).json(err.message)
            break;
        default:
            res.status(500).json(err.message)
            break;
    }
}
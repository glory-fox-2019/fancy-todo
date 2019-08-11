module.exports = function(err, req, res, next){
    const status = err.status || 500;
    const error = err.message || `Internal server error`;
    console.log(err);
    res.status(status).json({
        message: error
    });
}
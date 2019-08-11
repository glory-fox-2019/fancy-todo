module.exports = function getColor(date) {
    if(new Date() > date) {
        return 'ff8080'
    } else {
        return '85e085'
    }
}
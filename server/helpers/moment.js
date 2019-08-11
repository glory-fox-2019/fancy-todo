const moment = require("moment")
let date = "2019-08-17T00:00:00.000Z"

let a = moment(date).format("YYYY-MM-DD")
console.log(a)
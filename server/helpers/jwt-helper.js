const jwt = require("jsonwebtoken");

module.exports = {
  verify: function(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  },

  sign: function(userData) {
    return jwt.sign(userData, process.env.JWT_SECRET);
  } 
}
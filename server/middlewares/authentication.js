// const User = require("../models/user");
const jwt = require("../helpers/jwt-helper");
const mongoose = require("mongoose");

module.exports =  function(req, res, next) {
  try {
    req.authenticatedUser = jwt.verify(req.headers.token);

    User.findById(req.authenticatedUser.id)
      .then(user => {
        if (user) {
          console.log(user);
          next();
        } else {
          res.status(401).json({ message: "You need to login first" });
        }
      })

      .catch(err => {
        console.log(err);
      })

  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "You need to login first" });
  }
}
const Todo = require("../models/todo");
// const User = require("../models/user");

module.exports = function(req, res, next){
  Todo.findOne({ _id: req.params.id })
    .then(todo => {
      if (String(todo.userId) === req.authenticatedUser.id){
        next();
      } else {
        res.status(401).json({
          message: "You have no access to do that",
        });
      }
    })
}

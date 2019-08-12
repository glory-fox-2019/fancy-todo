const Todo = require("../models/todo");
const User = require("../models/user");

class TodoController {
  static getTodos(req, res, next) {
    Todo.find({ userId: req.authenticatedUser.id })
      .then(todos => {
        if (!todos) {
          res.status(500).json({ message: "Collection is empty" });
        } else {
          console.log("getTodos success");
          res.status(200).json(todos);
        }
      })

      .catch(err => {
        console.log("error", err);
        res.status(500).json({ err: err.message });
        next(err)
      });
  }

  static getTodo(req, res, next) {
    Todo.findOne({ _id: req.params.id })
      .then(todo => {

        if (!todo) {
          res.status(500).json({ message: "Todo doesn't exist" });
        } else {
          console.log("getTodo sukses");
          res.status(200).json(todo);
        }
      })

      .catch(err => {
        console.log("error", err);
        res.status(500).json(err);
        next(err)
      });
  }

  static createTodo(req, res, next) {
    const { name, description, due } = req.body
    console.log(req.body)
    Todo.create({
      name,
      description,
      status: "In Progress",
      due
    })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStatus(req, res, next) {
    if (req.body.status === "In Progress") {
      req.body.status = "Completed";
    } else {
      req.body.status = "In Progress";
    }

    const updatedStatus = {
      status: req.body.status,
    };

    Todo.updateOne({
      _id: (req.params.id)
    }, {
        $set: updatedStatus
      })
      .then(updatedTodoStatus => {
        console.log("updateStatus success");
        res.status(200).json(updatedTodoStatus);
      })

      .catch(err => {
        console.log("error", err);
        res.status(500).json(err);
        next(err)
      });
  }

  static updateTodo(req, res, next) {
    const updatedTodo = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      role: req.body.role,
    };

    Todo.updateOne({
      _id: (req.params.id)
    }, {
        $set: updatedTodo
      })
      .then(createdTodo => {
        console.log("updateTodo success");
        res.status(200).json(createdTodo);
      })

      .catch(err => {
        console.log("error", err);
        res.status(500).json(err);
        next(err)
      });
  }

  static deleteTodo(req, res, next) {
    Todo.deleteOne({ _id: req.params.id })
      .then(todo => {
        console.log("deleteTodosuccess");
        res.status(200).json(todo);
      })

      .catch(err => {
        console.log("error", err);
        res.status(500).json(err);
        next(err)
      });
  }
}

module.exports = TodoController;

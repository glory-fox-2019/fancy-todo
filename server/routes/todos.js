const express = require("express");
const router = express.Router();
// const auth = require("../middlewares/authentication")

const TodoController = require("../controllers/todo");
const authorizationUser = require("../middlewares/authorization-user");

// routes.use(auth.authentication)
router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodo);
router.post("/", TodoController.createTodo);
router.put("/:id", authorizationUser, TodoController.updateTodo);
router.put("/:id/status", authorizationUser, TodoController.updateStatus);
router.delete("/:id", authorizationUser, TodoController.deleteTodo);

module.exports = router;
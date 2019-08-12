const express = require("express");
const router = express.Router();
const todosRouter = require('./todos')

const UserController = require("../controllers/user");

router.use("/api/login", UserController.login);
router.use("/api/google-login", UserController.googleLogin);
router.use("/api/register", UserController.createUser);
router.use("/api/todos", todosRouter)

module.exports = router;
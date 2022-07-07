const usersRouter = require("express").Router();

const { getAllUsers } = require("../controllers/user_controller.js");

usersRouter.get("/", getAllUsers);

module.exports = usersRouter;

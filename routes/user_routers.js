const usersRouter = require("express").Router();

const {
  getAllUsers,
  getUserByUserName,
} = require("../controllers/user_controller.js");

usersRouter.get("/", getAllUsers);

usersRouter.route("/:username").get(getUserByUserName);

module.exports = usersRouter;

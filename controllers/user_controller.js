const {
  fetchAllUsers,
  fetchUserByUsername,
} = require("../models/user_models.js");

// Trello 6
exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

// Trello 17
exports.getUserByUserName = (req, res, next) => {
  const { username } = req.params;

  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

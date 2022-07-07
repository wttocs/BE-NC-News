const db = require("../db/connection");

exports.fetchAllUsers = () => {
  const queryString = "SELECT * FROM users";
  return db.query(queryString).then(({ rows: users }) => {
    return users;
  });
};

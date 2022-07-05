const db = require("../db/connection");
const format = require("pg-format");

exports.fetchAllUsers = () => {
  const queryString = "SELECT * FROM users";
  return db.query(queryString).then(({ rows: users }) => {
    return users;
  });
};

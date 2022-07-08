const db = require("../db/connection");

exports.fetchAllUsers = () => {
  const queryString = "SELECT * FROM users";
  return db.query(queryString).then(({ rows: users }) => {
    return users;
  });
};

exports.fetchUserByUsername = (username) => {
  const queryString = "SELECT * FROM users WHERE username = $1";
  const queryValues = [username];
  if (/\d+/.test(username)) {
    return Promise.reject({
      status: 404,
      msg: "Bad Request: Please enter a valid data type",
    });
  }
  return this.fetchAllUsers().then((users) => {
    const allUsernames = users.map((user) => {
      return user.username;
    });
    if (!allUsernames.includes(username)) {
      return Promise.reject({
        status: 404,
        msg: "Bad Request: Username does not exist",
      });
    }
    return db.query(queryString, queryValues).then(({ rows: user }) => {
      return user[0];
    });
  });
};

//  return db.query(queryString, queryValues).then(({ rows: user }) => {
//    if (!user[0]) {
//      return Promise.reject({
//        status: 404,
//        msg: "Bad Request: User does not exist",
//      });
//    }
//    return user[0];
//  });

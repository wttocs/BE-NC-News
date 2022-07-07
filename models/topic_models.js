const db = require("../db/connection");

// Trello 3
exports.fetchAllTopics = () => {
  const queryString = "SELECT * FROM topics;";
  return db.query(queryString).then(({ rows: topics }) => {
    return topics;
  });
};

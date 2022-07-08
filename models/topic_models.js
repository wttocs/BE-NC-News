const db = require("../db/connection");

// Trello 3
exports.fetchAllTopics = () => {
  const queryString = "SELECT * FROM topics;";
  return db.query(queryString).then(({ rows: topics }) => {
    return topics;
  });
};
// Trello 22
exports.insertTopic = (slug, description) => {
  if (!slug || !description) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter valid topic contents",
    });
  }
  if (typeof slug !== "string" || typeof description !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid data type",
    });
  }

  const queryString = `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *;`;
  const queryValues = [slug, description];

  return db.query(queryString, queryValues).then(({ rows: topic }) => {
    return topic[0];
  });
};

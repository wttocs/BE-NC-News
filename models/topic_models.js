const db = require("../db/connection");
const format = require("pg-format");

// Trello 3
exports.fetchAllTopics = () => {
  const queryString = "SELECT * FROM topics";
  return db.query(queryString).then(({ rows: topics }) => {
    return topics;
  });
};

// Trello 4
exports.fetchArticleById = (params) => {
  const { article_id } = params;
  const queryString = "";
};

const db = require("../db/connection");
const format = require("pg-format");

// Trello 4
exports.fetchArticleById = (params) => {
  const { article_id } = params;
  const queryString = "SELECT * FROM articles WHERE article_id = $1";
  return db.query(queryString, [article_id]).then(({ rows: article }) => {
    if (article[0] === undefined) {
      return Promise.reject({ status: 404, msg: "Article ID Not Found" });
    } else return article[0];
  });
};

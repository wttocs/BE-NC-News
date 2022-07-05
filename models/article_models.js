const db = require("../db/connection");
const format = require("pg-format");

// Trello 4
exports.fetchArticleById = (params) => {
  const { article_id } = params;
  const queryString = "SELECT * FROM articles WHERE article_id = $1;";
  return db.query(queryString, [article_id]).then(({ rows: article }) => {
    if (article[0] === undefined) {
      return Promise.reject({ status: 404, msg: "Article ID Not Found" });
    } else return article[0];
  });
};
// Trello 5
exports.updateArticleById = (body, params) => {
  const { inc_votes } = body;
  const { article_id } = params;
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please enter the correct input",
    });
  }
  if (isNaN(inc_votes)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please enter a number",
    });
  }
  if (Object.keys(body).length > 1) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please only enter one input",
    });
  }

  const queryString =
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *";
  return db
    .query(queryString, [inc_votes, article_id])
    .then(({ rows: updated_article }) => {
      if (!updated_article.length) {
        return Promise.reject({
          status: 404,
          msg: "Article ID Not Found",
        });
      } else {
        return updated_article[0];
      }
    });
};

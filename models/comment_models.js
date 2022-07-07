const db = require("../db/connection");
const { fetchAllUsers } = require("./user_models");

// Trello 9
exports.fetchCommentsByArticleId = (article_id) => {
  const queryString = `
        SELECT 
        comment_id,
        votes,
        created_at,
        author,
        body,
        article_id
        FROM comments
        WHERE article_id = $1
    `;

  return db.query(queryString, [article_id]).then(({ rows: articles }) => {
    return articles;
  });
};

// Trello 10
exports.insertCommentByArticleId = (article_id, username, body) => {
  if (!body) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid comment",
    });
  }

  if (!username) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a username",
    });
  }
  if (!body) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid comment",
    });
  }
  if (!username) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a username",
    });
  }
  if (typeof body !== "string" || typeof username !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid data type",
    });
  }
  const queryString = `
    INSERT INTO comments
      (article_id, author, body)
    VALUES
      ($1, $2, $3)
    RETURNING *;
    `;

  const queryValues = [article_id, username, body];

  return fetchAllUsers().then((users) => {
    const allUsernames = users.map((user) => {
      return user.username;
    });
    if (!allUsernames.includes(username)) {
      return Promise.reject({
        status: 400,
        msg: "Bad Request: Username does not exist",
      });
    } else {
      return db
        .query(queryString, queryValues)
        .then(({ rows: postedComment }) => {
          return postedComment[0];
        });
    }
  });
};
// Trello 12
exports.removeCommentByCommentId = (comment_id) => {
  const queryString = `
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *
  `;
  return db
    .query(queryString, [comment_id])
    .then(({ rows: commentToDelete }) => {
      if (!commentToDelete[0]) {
        return Promise.reject({
          status: 404,
          msg: "Bad Request: No comment to delete",
        });
      }
      return commentToDelete;
    });
};

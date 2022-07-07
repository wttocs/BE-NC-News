const db = require("../db/connection");

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

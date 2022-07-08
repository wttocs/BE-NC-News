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

// Trello 18
exports.updateCommentByCommentId = (inc_votes, comment_id) => {
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
  if (Object.keys(inc_votes).length > 1) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please only enter one input",
    });
  }

  const queryString =
    "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *";
  return db
    .query(queryString, [inc_votes, comment_id])
    .then(({ rows: updated_comment }) => {
      if (!updated_comment[0]) {
        return Promise.reject({
          status: 404,
          msg: "Comment ID Not Found",
        });
      } else {
        return updated_comment[0];
      }
    });
};

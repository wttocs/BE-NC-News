const commentsRouter = require("express").Router();
const {
  deleteCommentByCommentId,
} = require("../controllers/comment_controllers");

commentsRouter.delete("/:comment_id", deleteCommentByCommentId);

module.exports = commentsRouter;

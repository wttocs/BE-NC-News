const commentsRouter = require("express").Router();
const {
  deleteCommentByCommentId,
  patchCommentByCommentId,
} = require("../controllers/comment_controllers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentByCommentId)
  .delete(deleteCommentByCommentId);

module.exports = commentsRouter;

const {
  removeCommentByCommentId,
  updateCommentByCommentId,
} = require("../models/comment_models.js");

// Trello 12
exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentByCommentId(comment_id)
    .then((commentToDelete) => {
      res.status(204).send({ commentToDelete });
    })
    .catch((err) => {
      next(err);
    });
};

// Trello 18
exports.patchCommentByCommentId = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;

  updateCommentByCommentId(inc_votes, comment_id)
    .then((updated_comment) => {
      res.status(200).send({ updated_comment });
    })
    .catch((err) => {
      next(err);
    });
};

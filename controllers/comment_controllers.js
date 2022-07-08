const { fetchArticleById } = require("../models/article_models.js");

const { removeCommentByCommentId } = require("../models/comment_models.js");

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

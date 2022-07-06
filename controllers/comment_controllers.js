const { fetchArticleById } = require("../models/article_models.js");
const { fetchCommentsByArticleId } = require("../models/comment_models.js");

// Trello 9
exports.getCommentsByArticleId = (req, res, next) => {
  // const params = req.params;
  const { article_id } = req.params;

  const promises = [
    fetchArticleById(article_id),
    fetchCommentsByArticleId(article_id),
  ];

  Promise.all(promises)
    .then(([articleObject, comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

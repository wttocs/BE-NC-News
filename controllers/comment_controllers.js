const { fetchArticleById } = require("../models/article_models.js");

const {
  fetchCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/comment_models.js");

// Trello 9
// exports.getCommentsByArticleId = (req, res, next) => {
// const { fetchCommentsByArticleId } = require("../models/comment_models.js");

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

// Trello 10
exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  insertCommentByArticleId(article_id, username, body)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => {
      next(err);
    });
};


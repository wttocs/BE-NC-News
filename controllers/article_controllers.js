const {
  fetchArticleById,
  updateArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  insertArticle,
} = require("../models/article_models.js");

// Trello 4
exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
// Trello 5
exports.patchArticleById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  updateArticleById(inc_votes, article_id)
    .then((updated_article) => {
      res.status(200).send({ updated_article });
    })
    .catch((err) => {
      next(err);
    });
};
// Trello 8
exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  fetchAllArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
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
// Trello 19
exports.postArticle = (req, res, next) => {
  const { author, title, body, topic } = req.body;
  insertArticle(author, title, body, topic)
    .then((article) => {
      return res.status(201).send({ article });
    })
    .catch((err) => next(err));
};

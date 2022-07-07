const {
  fetchArticleById,
  updateArticleById,
  fetchAllArticles,
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

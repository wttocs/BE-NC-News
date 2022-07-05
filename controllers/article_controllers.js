const {
  fetchArticleById,
  updateArticleById,
  fetchAllArticles,
} = require("../models/article_models.js");

// Trello 4
exports.getArticleByID = (req, res, next) => {
  const params = req.params;
  fetchArticleById(params)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
// Trello 5
exports.patchArticleById = (req, res, next) => {
  const body = req.body;
  const params = req.params;
  updateArticleById(body, params)
    .then((updated_article) => {
      res.status(200).send({ updated_article });
    })
    .catch((err) => {
      next(err);
    });
};
// Trello 8
exports.getAllArticles = (req, res, next) => {
  const { sort_by, order } = req.query;
  fetchAllArticles(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

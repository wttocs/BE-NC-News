const { fetchArticleById } = require("../models/article_models");

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

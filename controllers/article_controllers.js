const {
  fetchArticleById,
  updateArticleById,
} = require("../models/article_models.js");
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

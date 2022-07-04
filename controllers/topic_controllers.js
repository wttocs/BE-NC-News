const { fetchAllTopics } = require("../models/topic_models.js");

// Trello 3
exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

// Trello 3

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

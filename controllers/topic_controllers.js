const { fetchAllTopics, insertTopic } = require("../models/topic_models.js");

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
// Trello 22
exports.postTopics = (req, res, next) => {
  const { slug, description } = req.body;
  insertTopic(slug, description)
    .then((newTopic) => {
      res.status(201).send({ newTopic });
    })
    .catch((err) => {
      next(err);
    });
};

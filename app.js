// Express
const express = require("express");
const app = express();
app.use(express.json());

// Error Handling
const {
  handlePSQLErrors,
  handleCustomErrors,
  handleInternalServerErrors,
} = require("./controllers/error_controllers.js");

// Topic Controllers
const { getAllTopics } = require("./controllers/topic_controllers.js");
// Article Controllers
const {
  getArticleByID,
  patchArticleById,
} = require("./controllers/article_controllers.js");

// Trello 3
app.get("/api/topics", getAllTopics);
// Trello 4
app.get("/api/articles/:article_id", getArticleByID);
// Trello 5
app.patch("/api/articles/:article_id", patchArticleById);

// Error Handling
app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalServerErrors);

module.exports = app;

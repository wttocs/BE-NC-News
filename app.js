// Express
const express = require("express");
const app = express();
app.use(express.json());

// Error Handling
const {
  handleInvalidPaths,
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
  getAllArticles,
} = require("./controllers/article_controllers.js");

const { getAllUsers } = require("./controllers/user_controller.js");

const {
  postCommentByArticleId,
} = require("./controllers/comment_controllers.js");

// Trello 3
app.get("/api/topics", getAllTopics);
// Trello 4
app.get("/api/articles/:article_id", getArticleByID);
// Trello 5
app.patch("/api/articles/:article_id", patchArticleById);
// Trello 6
app.get("/api/users", getAllUsers);
// Trello 8
app.get("/api/articles", getAllArticles);

// Trello 10
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

// Error Handling
app.use("*", handleInvalidPaths);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalServerErrors);

module.exports = app;

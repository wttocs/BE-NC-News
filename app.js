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

const apiRouter = require("./routes/api_router.js");
const topicsRouter = require("./routes/topic_router.js");
const articlesRouter = require("./routes/article_router.js");
const usersRouter = require("./routes/user_routers.js");
const commentsRouter = require("./routes/comment_router.js");

// Endpoints Router
app.use("/api", apiRouter);
// Topics
app.use("/api/topics", topicsRouter);
// Articles
app.use("/api/articles", articlesRouter);
// Users
app.use("/api/users", usersRouter);
// Comments
app.use("/api/comments", commentsRouter);

// Error Handling
app.use("*", handleInvalidPaths);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalServerErrors);

module.exports = app;

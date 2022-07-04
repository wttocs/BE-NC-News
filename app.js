// Express
const express = require("express");
const app = express();
app.use(express.json());

const {
  handlePSQLErrors,
  handleCustomErrors,
  handleInternalServerErrors,
} = require("./controllers/error_controllers.js");
const { getAllTopics } = require("./controllers/topic_controllers.js");

// Trello 3
app.get("/api/topics", getAllTopics);

// Error Handling
app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalServerErrors);

module.exports = app;

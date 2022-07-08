const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topic_controllers");
topicsRouter.get("/", getAllTopics);

module.exports = topicsRouter;

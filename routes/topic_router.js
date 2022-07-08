const topicsRouter = require("express").Router();
const {
  getAllTopics,
  postTopics,
} = require("../controllers/topic_controllers");

topicsRouter.route("/").get(getAllTopics).post(postTopics);

module.exports = topicsRouter;

const apiRouter = require("express").Router();
const { getApiEndpoints } = require("../controllers/api_controllers");

apiRouter.get("/", getApiEndpoints);

module.exports = apiRouter;

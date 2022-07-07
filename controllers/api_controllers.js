// const { fetchApi } = require("../models/api_models.js");
const endpoints = require("../endpoints.json");

exports.getApiEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};

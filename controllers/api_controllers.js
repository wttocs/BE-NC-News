// const { fetchApi } = require("../models/api_models.js");
const apiEndpoints = require("../endpoints.json");

exports.getApiEndpoints = (req, res, next) => {
  res.status(200).send({ apiEndpoints });
};

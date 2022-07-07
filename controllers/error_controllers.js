// Invalid Paths
exports.handleInvalidPaths = (req, res) => {
  res.status(404).send({ msg: "Path Not Found" });
};

//  PSQL errors
exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23503") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};
// Custom errors
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
//handle unexpected error
exports.handleInternalServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};

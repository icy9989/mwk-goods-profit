const ApiError = require("../config/customError.config");
const logger = require("../logger/logger");
const { errorResponse } = require("../config/response");

function apiErrorHandler(err, req, res, next) {
  logger.error(err);
  logger.error(JSON.stringify(err));

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .contentType(err.contentType)
      .send(errorResponse(err.message));
  }

  return res
    .setHeader("Content-Type", "application/problem+json; charset=utf-8")
    .status(500)
    .send(errorResponse(err.message));
}

module.exports = apiErrorHandler;
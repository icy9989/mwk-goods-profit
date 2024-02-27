class ApiError extends Error {
    constructor(status, message) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.status = status;
      this.message = message.message ? message.message : message;
      this.contentType = 'application/problem+json';
    }
  
    static badRequestError(msg) {
      return new ApiError(400, msg);
    }
  
    static internalServerError(msg) {
      return new ApiError(500, msg);
    }
  
    static unauthorizedError(msg) {
      return new ApiError(401, msg);
    }
  
    static notFoundError(msg) {
      return new ApiError(404, msg);
    }
  
  }
  
module.exports = ApiError;
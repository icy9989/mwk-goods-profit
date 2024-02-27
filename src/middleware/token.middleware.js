const jwt = require("jsonwebtoken");
const { errorResponse } = require("../config/response");
const { decrypt } = require("../utils/crypto");
const { getUserByUsername } = require("../database/providers/user.provider");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      
      const loginId = decodedToken.loginId;

      const user = await getUserByUsername(loginId);

      if(user) {
        next();
      } else {
        return res
          .status(401)
          .contentType("application/problem+json")
          .send(errorResponse("Access denied!"));
      }
    } catch (err) {
      return res
        .status(401)
        .contentType("application/problem+json")
        .send(errorResponse("User Need to login again!"));
    }
  };
};

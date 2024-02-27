const { successResponse } = require("../config/response");
const loginService = require("../services/auth.user.service");

const loginController = async (req, res, next) => {
    try {
      const data = await loginService(req);
      res.status(200).send(successResponse(data));
    } catch (err) {
      next(err);
    }
};

module.exports = loginController;
const express = require("express");
const loginController = require("../controllers/auth.user.controller");

const router = express.Router();

router.post("", loginController);

module.exports = {
    loginRouter: (app) => app.use("/login", router)
}
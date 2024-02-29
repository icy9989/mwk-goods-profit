const express = require("express");
const tokenMiddleware = require("../middleware/token.middleware");
const { getDailyTotalExpenseController } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/daily-expense", tokenMiddleware(), getDailyTotalExpenseController);

module.exports = {
    dashboardRouter: (app) => app.use("/dashboard", router)
}
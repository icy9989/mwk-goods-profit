const express = require("express");
const tokenMiddleware = require("../middleware/token.middleware");
const { getDailyTotalExpenseController, getDailyTotalProfitController } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/daily-expense", tokenMiddleware(), getDailyTotalExpenseController);
router.get("/daily-profit", tokenMiddleware(), getDailyTotalProfitController);

module.exports = {
    dashboardRouter: (app) => app.use("/dashboard", router)
}
const express = require("express");
const tokenMiddleware = require("../middleware/token.middleware");
const { getDailyTotalExpenseController, getDailyTotalProfitController, getMonthlyProfitsController, getMonthlyExpensesController, getMonthlyProductSellCountController } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/daily-expense", tokenMiddleware(), getDailyTotalExpenseController);
router.get("/daily-profit", tokenMiddleware(), getDailyTotalProfitController);
router.get("/monthly-profits", tokenMiddleware(), getMonthlyProfitsController);
router.get("/monthly-expenses", tokenMiddleware(), getMonthlyExpensesController);
router.get("/monthly-sell", tokenMiddleware(), getMonthlyProductSellCountController);

module.exports = {
    dashboardRouter: (app) => app.use("/dashboard", router)
}
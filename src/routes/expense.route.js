const express = require("express");
const { createExpenseController, getExpenseByIdController, updateExpenseController, getExpensesController, deleteExpenseController } = require("../controllers/expense.controller");
const tokenMiddleware = require("../middleware/token.middleware");

const router = express.Router();

router.post("", tokenMiddleware(), createExpenseController);
router.get("", tokenMiddleware(), getExpenseByIdController);
router.put("", tokenMiddleware(), updateExpenseController);
router.delete("", tokenMiddleware(), deleteExpenseController);
router.get("/all", tokenMiddleware(), getExpensesController);

module.exports = {
    expenseRouter: (app) => app.use("/expense", router)
}
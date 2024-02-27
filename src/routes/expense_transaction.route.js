const express = require("express");
const { createExpenseTransactionController, updateExpenseTransactionController, deleteExpenseTransactionController, getExpenseTransactionsController } = require("../controllers/expense_transaction.controller");
const tokenMiddleware = require("../middleware/token.middleware");

const router = express.Router();

router.post("", tokenMiddleware(), createExpenseTransactionController);
// router.get("", tokenMiddleware(), getExpenseByIdController);
router.put("", tokenMiddleware(), updateExpenseTransactionController);
router.delete("", tokenMiddleware(), deleteExpenseTransactionController);
router.get("/daily", tokenMiddleware(), getExpenseTransactionsController);

module.exports = {
    expenseTransactionRouter: (app) => app.use("/expense-transaction", router)
}
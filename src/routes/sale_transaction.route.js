const express = require("express");
const { createSaleTransactionController, updateSaleTransactionController, getSaleTransactionsController, createDailySaleTransactionController, isSaveDailySaleTransactionController } = require("../controllers/sale_transaction.controller");
const tokenMiddleware = require("../middleware/token.middleware");

const router = express.Router();

router.post("", tokenMiddleware(), createSaleTransactionController);
// router.get("", tokenMiddleware(), getExpenseByIdController);
router.put("", tokenMiddleware(), updateSaleTransactionController);
// router.delete("", tokenMiddleware(), deleteExpenseTransactionController);
router.post("/save", tokenMiddleware(), createDailySaleTransactionController);
router.get("/daily", tokenMiddleware(), getSaleTransactionsController);
router.get("/daily/check", tokenMiddleware(), isSaveDailySaleTransactionController);

module.exports = {
    saleTransactionRouter: (app) => app.use("/sale-transaction", router)
}
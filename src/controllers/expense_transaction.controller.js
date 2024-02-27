const { successResponse } = require("../config/response");
const { createExpenseTransactionService, updateExpenseTransactionService, deleteExpenseTransactionService, getExpenseTransactionsService } = require("../services/expense_transaction.service");

const createExpenseTransactionController = async (req, res, next) => {
    try {
        const data = await createExpenseTransactionService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const updateExpenseTransactionController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await updateExpenseTransactionService(id,req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const deleteExpenseTransactionController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await deleteExpenseTransactionService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getExpenseTransactionsController = async (req, res, next) => {
    try {
        const { date } = req.query;
        const data = await getExpenseTransactionsService(date);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createExpenseTransactionController,
    updateExpenseTransactionController,
    deleteExpenseTransactionController,
    getExpenseTransactionsController
}
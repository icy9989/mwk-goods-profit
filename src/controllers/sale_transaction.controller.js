const { successResponse } = require("../config/response");
const { createSaleTransactionService, getSaleTransactionsService, updateSaleTransactionService, createDailySaleTransactionService } = require("../services/sale_transaction.service");

const createSaleTransactionController = async (req, res, next) => {
    try {
        const data = await createSaleTransactionService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const updateSaleTransactionController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await updateSaleTransactionService(id,req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getSaleTransactionsController = async (req, res, next) => {
    try {
        const { date } = req.query;
        const data = await getSaleTransactionsService(date);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const createDailySaleTransactionController = async (req, res, next) => {
    try {
        const data = await createDailySaleTransactionService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createSaleTransactionController,
    updateSaleTransactionController,
    getSaleTransactionsController,
    createDailySaleTransactionController
}

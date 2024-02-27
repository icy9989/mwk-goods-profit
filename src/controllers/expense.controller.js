const { successResponse } = require("../config/response");
const { createExpenseService, getExpenseByIdService, updateExpenseService, getExpensesService, deleteExpenseService } = require("../services/expense.service");

const createExpenseController = async (req, res, next) => {
    try {
        const data = await createExpenseService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getExpenseByIdController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await getExpenseByIdService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const updateExpenseController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await updateExpenseService(id,req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const deleteExpenseController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await deleteExpenseService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}


const getExpensesController = async (req, res, next) => {
    try {
        const data = await getExpensesService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createExpenseController,
    getExpenseByIdController,
    updateExpenseController,
    deleteExpenseController,
    getExpensesController
}
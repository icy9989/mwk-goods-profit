const { successResponse } = require("../config/response");
const { 
    getDailyTotalExpenseService, 
    getDailyTotalProfitService, 
    getMonthlyProfitsService, 
    getMonthlyExpensesService, 
    getMonthlyProductSellCountService
} = require("../services/dashboard.service");

const getDailyTotalExpenseController = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getDailyTotalExpenseService(startDate, endDate);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getDailyTotalProfitController = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getDailyTotalProfitService(startDate,endDate);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getMonthlyProfitsController = async (req, res, next) => {
    try {
        const { year } = req.query;
        const data = await getMonthlyProfitsService(year);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getMonthlyExpensesController = async (req, res, next) => {
    try {
        const { year,month } = req.query;
        const data = await getMonthlyExpensesService(year,month);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getMonthlyProductSellCountController = async (req, res, next) => {
    try {
        const { year,month } = req.query;
        const data = await getMonthlyProductSellCountService(year,month);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getDailyTotalExpenseController,
    getDailyTotalProfitController,
    getMonthlyProfitsController,
    getMonthlyExpensesController,
    getMonthlyProductSellCountController
}
const { successResponse } = require("../config/response");
const { getDailyTotalExpenseService, getDailyTotalProfitService } = require("../services/dashboard.service");

const getDailyTotalExpenseController = async (req, res, next) => {
    try {
        const { date } = req.query;
        const data = await getDailyTotalExpenseService(date);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getDailyTotalProfitController = async (req, res, next) => {
    try {
        const { date } = req.query;
        const data = await getDailyTotalProfitService(date);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getDailyTotalExpenseController,
    getDailyTotalProfitController
}
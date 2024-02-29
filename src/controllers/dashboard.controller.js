const { successResponse } = require("../config/response");
const { getDailyTotalExpenseService } = require("../services/dashboard.service");

const getDailyTotalExpenseController = async (req, res, next) => {
    try {
        const { date } = req.query;
        const data = await getDailyTotalExpenseService(date);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getDailyTotalExpenseController
}
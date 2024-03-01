const db = require("../models");
const profitModel = db.profit;

const createDailySaleTransaction = async (
    dailyCost,
    dailySell,
    dailyExpense,
    date) => {
    return await profitModel.build({
        dailyCost,
        dailySell,
        dailyExpense,
        date
    }).save()
}

const getDailyTotalProfit = (date) => {
    return profitModel.findOne({
        where: {
            date
        }
    })
}

module.exports = {
    createDailySaleTransaction,
    getDailyTotalProfit
}
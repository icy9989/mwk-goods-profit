const { Op } = require("sequelize");
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

const getTotalProfitsByDate = (startDate, endDate) => {

    return profitModel.findAll({
        where: {
            date: {
                [Op.between]: [startDate,endDate]
            }
        }
    })
}

module.exports = {
    createDailySaleTransaction,
    getDailyTotalProfit,
    getTotalProfitsByDate
}
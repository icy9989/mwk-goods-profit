const ApiError = require("../config/customError.config");
const { getDailyTotalExpense } = require("../database/providers/expense_transaction.provider");
const { getDailyTotalProfit } = require("../database/providers/profit.provider");

const getDailyTotalExpenseService = async (date) => {

    const total = await getDailyTotalExpense(date);

    if(!total) {
        return 0;
    }

    return total;
}

const getDailyTotalProfitService = async (date) => {

    const result = await getDailyTotalProfit(date);

    if(!result) {
        return 0;
    }

    const profit = result.dailySell - result.dailyCost - result.dailyExpense;

    return profit;
}


module.exports = { 
    getDailyTotalExpenseService,
    getDailyTotalProfitService
}
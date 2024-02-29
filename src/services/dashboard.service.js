const { getDailyTotalExpense } = require("../database/providers/expense_transaction.provider");

const getDailyTotalExpenseService = async (date) => {

    const total = await getDailyTotalExpense(date);

    if(!total) {
        return 0;
    }

    return total;
}

module.exports = { 
    getDailyTotalExpenseService
}
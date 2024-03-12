const ApiError = require("../config/customError.config");
const { getExpenses } = require("../database/providers/expense.provider");
const { getDailyTotalExpense, getExpenseTransactionsByExpenseId } = require("../database/providers/expense_transaction.provider");
const { getProducts } = require("../database/providers/product.provider");
const { getDailyTotalProfit, getTotalProfitsByDate } = require("../database/providers/profit.provider");
const { getMonthlyProductSellCount } = require("../database/providers/sale_transaction.provider");

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

const getMonthlyProfitsService = async (year) => {

    const months = [
        {
            name: "January",
            value: "01"
        },
        {
            name: "February",
            value: "02"
        },
        {
            name: "March",
            value: "03"
        },
        {
            name: "April",
            value: "04"
        },
        {
            name: "May",
            value: "05"
        },
        {
            name: "June",
            value: "06"
        },
        {
            name: "July",
            value: "07"
        },
        {
            name: "August",
            value: "08"
        },
        {
            name: "September",
            value: "09"
        },
        {
            name: "October",
            value: "10"
        },
        {
            name: "November",
            value: "11"
        },
        {
            name: "December",
            value: "12"
        },
    ];

    const results = [];

    for(const month of months) {
        let startDate =  year + "-" + month.value + "-01";
        let endDate =  year + "-" + month.value + "-31";
        let amount = 0;

        const records = await getTotalProfitsByDate(startDate, endDate);
        
        for(const record of records) { 
            amount += record.dailySell - record.dailyCost - record.dailyExpense;
        }

        data = {};
        data.month = month.name;
        data.amount = amount;

        results.push(data);
    }

    return results;

}

const getMonthlyExpensesService = async (year,month) => {

    const { rows: expenses } = await getExpenses();

    const results = [];

    for(const expense of expenses) {
        let records = await getExpenseTransactionsByExpenseId(expense.id,year,month);

        data = {}
        data.title = expense.title
        data.amount = records ? records : 0
        
        results.push(data);
    }

    results.sort((a, b) => b.amount - a.amount);

    return results;
}


const getMonthlyProductSellCountService = async (year,month) => {

    const { rows: products } = await getProducts();

    const results = [];

    for(const product of products) {
        let records = await getMonthlyProductSellCount(product.id,year,month);

        data = {}
        data.name = product.name
        data.quantity = records ? records : 0
        
        results.push(data);
    }

    results.sort((a, b) => b.quantity - a.quantity);

    return results;
}

module.exports = { 
    getDailyTotalExpenseService,
    getDailyTotalProfitService,
    getMonthlyProfitsService,
    getMonthlyExpensesService,
    getMonthlyProductSellCountService
}
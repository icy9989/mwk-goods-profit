const ApiError = require("../config/customError.config");
const { getExpenses } = require("../database/providers/expense.provider");
const { getExpenseTransactionsByExpenseId, getTotalExpensesByDate } = require("../database/providers/expense_transaction.provider");
const { getProducts } = require("../database/providers/product.provider");
const { getTotalProfitsByDate } = require("../database/providers/profit.provider");
const { getMonthlyProductSellCount } = require("../database/providers/sale_transaction.provider");

const getDailyTotalExpenseService = async (startDate, endDate) => {

    const total = await getTotalExpensesByDate(startDate, endDate);

    if(!total) {
        return 0;
    }

    return total;
}

const getDailyTotalProfitService = async (startDate,endDate) => {

    let profit = 0;

    const records = await getTotalProfitsByDate(startDate, endDate);
        
    for(const record of records) { 
        profit += record.dailySell - record.dailyCost - record.dailyExpense;
    }

    return profit;
}

const getMonthlyProfitsService = async (year) => {

    function isLeapYear(year) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                if (year % 400 === 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    

    const months = [
        {
            name: "January",
            value: "01",
            endDate: "-31"
        },
        {
            name: "February",
            value: "02",
            endDate: isLeapYear(year) ? "-29" : "-28"
        },
        {
            name: "March",
            value: "03",
            endDate: "-31"
        },
        {
            name: "April",
            value: "04",
            endDate: "-30"
        },
        {
            name: "May",
            value: "05",
            endDate: "-31"
        },
        {
            name: "June",
            value: "06",
            endDate: "-30"
        },
        {
            name: "July",
            value: "07",
            endDate: "-31"
        },
        {
            name: "August",
            value: "08",
            endDate: "-31"
        },
        {
            name: "September",
            value: "09",
            endDate: "-30"
        },
        {
            name: "October",
            value: "10",
            endDate: "-31"
        },
        {
            name: "November",
            value: "11",
            endDate: "-30"
        },
        {
            name: "December",
            value: "12",
            endDate: "-31"
        },
    ];

    const results = [];

    for(const month of months) {
        let startDate =  year + "-" + month.value + "-01";
        let endDate =  year + "-" + month.value + month.endDate;
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
        let records = await getExpenseTransactionsByExpenseId(expense.id,year,parseInt(month) + 1);

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
        let records = await getMonthlyProductSellCount(product.id,year,parseInt(month) + 1);

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
const { Op } = require("sequelize");
const db = require("../models");

const expenseTransactionModel = db.expense_tranaction;

const createExpenseTransaction = async (expenseId, date, amount) => {
    return await expenseTransactionModel.build({
        expenseId,
        date,
        amount
    }).save()
}

const getExpenseTransactionById = async (id) => {
    return await expenseTransactionModel.findByPk(id);
}

const updateExpenseTransaction = async (id,expenseId, date, amount) => {
    return await expenseTransactionModel.update(
        {
            expenseId,
            date,
            amount
        },
        {
            where: {
                id
            }
        }
    )
}

const deleteExpenseTransaction = async (id) => {
    return await expenseTransactionModel.destroy({
        where: {
            id
        }
    })
}

const getExpenseTransactions = async (date) => {
    return await expenseTransactionModel.findAll({
        where: {
            date
        }
    });
}
const getDailyTotalExpense = async (date) => {
    return await expenseTransactionModel.sum('amount', {
        where: {
            date
        }
    })
}

const getExpenseTransactionsByExpenseId = async (expenseId, year, month) => {

    let startDate;
    let endDate;

    if(month == "1" || month == "3" || month == "5" || month == "7" || month == "8") {
        startDate = `${year}-0${month}-01`;
        endDate = `${year}-0${month}-31`;
    } else if(month == "10" || month == "12") {
        startDate = `${year}-${month}-01`;
        endDate = `${year}-${month}-31`;
    } else if(month == "2"){
        if((Number(year) % 4 == 0) && (Number(year)  % 100 != 0 || Number(year) % 400 == 0)) {
            startDate = `${year}-0${month}-01`;
            endDate = `${year}-0${month}-29`;
        } else {
            startDate = `${year}-0${month}-01`;
            endDate = `${year}-0${month}-28`;
        }
    } else if(month == "11") {
        startDate = `${year}-0${month}-01`;
        endDate = `${year}-${month}-30`;
    } else {
        startDate = `${year}-0${month}-01`;
        endDate = `${year}-0${month}-30`;
    }

    return await expenseTransactionModel.sum('amount', {
        where: {
            expenseId,
            date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        }
    })
}

module.exports = {
    createExpenseTransaction,
    getExpenseTransactionById,
    updateExpenseTransaction,
    deleteExpenseTransaction,
    getExpenseTransactions,
    getDailyTotalExpense,
    getExpenseTransactionsByExpenseId
}
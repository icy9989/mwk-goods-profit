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

module.exports = {
    createExpenseTransaction,
    getExpenseTransactionById,
    updateExpenseTransaction,
    deleteExpenseTransaction,
    getExpenseTransactions
}
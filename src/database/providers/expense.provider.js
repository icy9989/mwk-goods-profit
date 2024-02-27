const db = require("../models");
const expenseModel = db.expense;

const createExpense = async (title) => {
    return await expenseModel.build({
      title
    }).save()
}

const updateExpense = async (id, title) => {
    return await expenseModel.update(
        {
            title
        },
        { 
            where: {
                id
            }
        }
    )
}

const getExpenseById = async (id) => {
    return await expenseModel.findOne({
        where: {
            id
        }
    })
}

const getExpenseByTitle = async (title) => {
    return await expenseModel.findOne({
        where: {
            title
        }
    })
}

const deleteExpense = async (id) => {
    return await expenseModel.destroy({
        where: {
            id
        }
    })
}
  
const getExpenses = async () => {
    return await expenseModel.findAndCountAll({
        where: {
            deletedAt: null,
        }
    });
};

module.exports = {
    createExpense,
    getExpenseById,
    getExpenseByTitle,
    updateExpense,
    deleteExpense,
    getExpenses,
}
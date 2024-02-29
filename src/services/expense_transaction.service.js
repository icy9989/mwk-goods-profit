const ApiError = require("../config/customError.config");
const { getExpenseById } = require("../database/providers/expense.provider");
const { createExpenseTransaction, getExpenseTransactionById, updateExpenseTransaction, deleteExpenseTransaction, getExpenseTransactions } = require("../database/providers/expense_transaction.provider");

const createExpenseTransactionService = async(reqBody) => {

    const { expense, date, amount } = reqBody;

    if(!expense) {
        throw ApiError.badRequestError("စရိတ် ဖြည့်သွင်းရန်လိုအပ်ပါသည်။")
    }

    if(!date) {
        throw ApiError.badRequestError("ရက်စွဲတခု ရွေးချယ်ရန်လိုအပ်ပါသည်။")
    }

    if(!amount) {
        throw ApiError.badRequestError("စရိတ်ပမာဏ ဖြည့်သွင်းရန်လိုအပ်ပါသည်။")
    }

    const transaction = await createExpenseTransaction(expense.id,date,amount);

    return transaction;
}

const updateExpenseTransactionService = async(id,reqBody) => {

    const { expense, date, amount } = reqBody;

    if(!expense) {
        throw ApiError.badRequestError("စရိတ် ဖြည့်သွင်းရန်လိုအပ်ပါသည်။")
    }

    if(!date) {
        throw ApiError.badRequestError("ရက်စွဲတခု ရွေးချယ်ရန်လိုအပ်ပါသည်။")
    }

    if(!amount) {
        throw ApiError.badRequestError("စရိတ်ပမာဏ ဖြည့်သွင်းရန်လိုအပ်ပါသည်။")
    }

    const isExist = await getExpenseTransactionById(id);

    if(isExist) {
        await updateExpenseTransaction(id,expense.id,date,amount);
    } else {
        throw ApiError.badRequestError("စရိတ် မှတ်တမ်းမရှိပါ။")
    }

    return null;
}

const deleteExpenseTransactionService = async(id) => {

    const transaction = await getExpenseTransactionById(id);

    if(!transaction) {
        throw ApiError.badRequestError("စရိတ် မှတ်တမ်းမရှိပါ။")
    }

    await deleteExpenseTransaction(id);    

    return null;
}

const getExpenseTransactionsService = async(date) => {

    const transactions = await getExpenseTransactions(date);

    const transactionList = [];

    if(transactions.length < 1) {
        return transactions;
    } else {
        for(let transaction of transactions) {
            let data = {};
            data.id = transaction.id;
            const expense = await getExpenseById(transaction.expenseId);
            data.expense = {
                id: expense.id,
                title: expense.title
            },
            data.amount = transaction.amount;
            data.date = transaction.date;
    
            transactionList.push(data);
        }

        return transactionList
    } 
}

module.exports = {
    createExpenseTransactionService,
    updateExpenseTransactionService,
    deleteExpenseTransactionService,
    getExpenseTransactionsService
}
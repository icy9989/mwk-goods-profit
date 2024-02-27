const ApiError = require("../config/customError.config");
const { getExpenseByTitle, createExpense, getExpenseById, updateExpense, getExpenses, deleteExpense } = require("../database/providers/expense.provider");

const createExpenseService = async(reqBody) => {

    const { title } = reqBody;

    const isExpenseExist = await getExpenseByTitle(title);

    let expense;

    if(isExpenseExist) {
        throw ApiError.badRequestError("ဤစရိတ် ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        expense = await createExpense(title);
    }

    return expense;
}

const getExpenseByIdService = async(id) => {

    const expense = await getExpenseById(id);

    if(!expense) {
        throw ApiError.notFoundError("စရိတ် မရှိပါ။");
    }

    return expense;
}

const updateExpenseService = async(id, reqBody) => {

    const { title } = reqBody;

    const expense = await getExpenseById(id);

    if(!expense) {
        throw ApiError.notFoundError("စရိတ် မရှိပါ။");
    }

    const isExpenseExist = await getExpenseByTitle(title);

    if(isExpenseExist && isExpenseExist.id != id) {
        throw ApiError.badRequestError("ဤစရိတ် ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        await updateExpense(id, title);
    }
}

const deleteExpenseService = async(id) => {

    const expense = await getExpenseById(id);

    if(!expense) {
        throw ApiError.notFoundError("စရိတ် မရှိပါ။");
    }

    await deleteExpense(id);    

    return null;
}

const getExpensesService = async () => {

    const { count, rows: expenses } = await getExpenses();

    return {
        totalExpense: count,
        expenses
    }
}

module.exports = {
    createExpenseService,
    getExpenseByIdService,
    updateExpenseService,
    deleteExpenseService,
    getExpensesService
}
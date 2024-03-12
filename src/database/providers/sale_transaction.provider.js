const { Op } = require("sequelize");
const db = require("../models");
const saleTransactionModel = db.sale_tranaction;

const createSaleTransaction = async (
        productId,
        buyCount,
        buyUnitPrice,
        buyTotalPrice,
        sellCount,
        sellUnitPrice,
        sellTotalPrice,
        profit,
        date,
    ) => {
    return await saleTransactionModel.build({
        productId,
        buyCount,
        buyUnitPrice,
        buyTotalPrice,
        sellCount,
        sellUnitPrice,
        sellTotalPrice,
        profit,
        date,
    }).save()
}

const updateSaleTransaction = async (
        id,
        productId,
        buyCount,
        buyUnitPrice,
        buyTotalPrice,
        sellCount,
        sellUnitPrice,
        sellTotalPrice,
        profit,
        date,
    ) => {
    return await saleTransactionModel.update(
        {
            productId,
            buyCount,
            buyUnitPrice,
            buyTotalPrice,
            sellCount,
            sellUnitPrice,
            sellTotalPrice,
            profit,
            date
        },
        {
            where: {
                id
            }
        }
    )
}

const getSaleTransactions = async (date) => {
    return await saleTransactionModel.findAll({
        where: {
            date
        }
    })
}

const getSaleTransactionById = async (id) => {
    return await saleTransactionModel.findByPk(id);
}


const getMonthlyProductSellCount = async (productId, year, month) => {

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

    return await saleTransactionModel.sum('sellCount', {
        where: {
            productId,
            date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            },
        }
    })
}

module.exports = {
    createSaleTransaction,
    updateSaleTransaction,
    getSaleTransactions,
    getSaleTransactionById,
    getMonthlyProductSellCount 
}

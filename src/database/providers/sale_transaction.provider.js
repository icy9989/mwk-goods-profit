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


module.exports = {
    createSaleTransaction,
    updateSaleTransaction,
    getSaleTransactions
}

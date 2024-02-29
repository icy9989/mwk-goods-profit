const { getProductById } = require("../database/providers/product.provider");
const { createProductInstock } = require("../database/providers/product_instock.provider");

const createSaleTransactionService = async(reqBody) => {

    const 
    { 
        product, 
        buyCount, 
        buyUnitPrice, 
        buyTotalPrice, 
        sellCount, 
        sellUnitPrice, 
        sellTotalPrice, 
        date 
    } = reqBody;

    const p = await getProductById(product.id);
    let profit;

    if(buyCount === sellCount) {
        profit = sellTotalPrice - buyTotalPrice; 
    } else if(buyCount > sellCount) {
        const instock = buyCount - sellCount;
        profit = sellTotalPrice - buyTotalPrice; 
        await createProductInstock(product.id,instock,buyUnitPrice);
    } else {

    }

    return profit;

}

const updateSaleTransactionService = async(id,reqBody) => {

    const 
    { 
        product, 
        buyCount, 
        buyUnitPrice, 
        buyTotalPrice, 
        sellCount, 
        sellUnitPrice, 
        sellTotalPrice, 
        date 
    } = reqBody;

    const p = await getProductById(product.id);
    let profit;

    if(buyCount === sellCount) {
        profit = sellTotalPrice - buyTotalPrice; 
    } else if(buyCount > sellCount) {
        const instock = buyCount - sellCount;
        profit = sellTotalPrice - buyTotalPrice; 
        await createProductInstock(product.id,instock,buyUnitPrice);
    } else {

    }

    return profit;

}

const getSaleTransactionsService = async(date) => {

 

}

module.exports = {
    createSaleTransactionService,
    updateSaleTransactionService,
    getSaleTransactionsService
}

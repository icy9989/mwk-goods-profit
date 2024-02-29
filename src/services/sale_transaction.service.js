const { getProductById } = require("../database/providers/product.provider");
const { createProductInstock, getProductInstocksByProductId, deleteProductInstock, updateProductInstock } = require("../database/providers/product_instock.provider");
const { createSaleTransaction, getSaleTransactions } = require("../database/providers/sale_transaction.provider");

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
    let result;

    if(buyCount === sellCount) {
        profit = sellTotalPrice - buyTotalPrice; 
        result = await createSaleTransaction(product.id,
            buyCount,
            buyUnitPrice,
            buyTotalPrice,
            sellCount,
            sellUnitPrice,
            sellTotalPrice,
            profit,
            date).then((result) => {
                const data = {};
                data.id = result.id;
                data.product = {
                    id: p.id,
                    name: p.name,
                    percentage: p.percentage
                }
                data.buyCount = result.buyCount;
                data.buyUnitPrice = result.buyUnitPrice;
                data.buyTotalPrice = result.buyTotalPrice;
                data.sellCount = result.sellCount;
                data.sellUnitPrice = result.sellUnitPrice;
                data.sellTotalPrice = result.sellTotalPrice;
                data.profit = result.profit;
                data.date = result.date;
                return data;
            })
    } else if(buyCount > sellCount) {
        const instock = buyCount - sellCount;
        profit = sellTotalPrice - buyTotalPrice; 
        result = await createSaleTransaction(product.id,
            buyCount,
            buyUnitPrice,
            buyTotalPrice,
            sellCount,
            sellUnitPrice,
            sellTotalPrice,
            profit,
            date).then((result) => {
                const data = {};
                data.id = result.id;
                data.product = {
                    id: p.id,
                    name: p.name,
                    percentage: p.percentage
                }
                data.buyCount = result.buyCount;
                data.buyUnitPrice = result.buyUnitPrice;
                data.buyTotalPrice = result.buyTotalPrice;
                data.sellCount = result.sellCount;
                data.sellUnitPrice = result.sellUnitPrice;
                data.sellTotalPrice = result.sellTotalPrice;
                data.profit = result.profit;
                data.date = result.date;
                return data;
            })
        await createProductInstock(product.id,instock,buyUnitPrice);
    } else {
        let num = sellCount - buyCount;
        let totalCost = buyTotalPrice;
        const instockList = [];
        await getProductInstocksByProductId(product.id).then((results) => {
            for (const result of results) {
                instockList.push({ id: result.id, count: result.instock, price: result.buyUnitPrice });
            }
        })

        for(let instock of instockList) {
            if(instock.count === num)
            {
                totalCost += (num * instock.price);
                profit = sellTotalPrice - totalCost;
                result = await createSaleTransaction(product.id,
                    buyCount,
                    buyUnitPrice,
                    buyTotalPrice,
                    sellCount,
                    sellUnitPrice,
                    sellTotalPrice,
                    profit,
                    date).then((result) => {
                        const data = {};
                        data.id = result.id;
                        data.product = {
                            id: p.id,
                            name: p.name,
                            percentage: p.percentage
                        }
                        data.buyCount = result.buyCount;
                        data.buyUnitPrice = result.buyUnitPrice;
                        data.buyTotalPrice = result.buyTotalPrice;
                        data.sellCount = result.sellCount;
                        data.sellUnitPrice = result.sellUnitPrice;
                        data.sellTotalPrice = result.sellTotalPrice;
                        data.profit = result.profit;
                        data.date = result.date;
                        return data;
                    })
                await deleteProductInstock(instock.id);
                return result;
            } else if(instock.count > num) {
                totalCost += (num * instock.price);
                profit = sellTotalPrice - totalCost;
                result = await createSaleTransaction(product.id,
                    buyCount,
                    buyUnitPrice,
                    buyTotalPrice,
                    sellCount,
                    sellUnitPrice,
                    sellTotalPrice,
                    profit,
                    date).then((result) => {
                        const data = {};
                        data.id = result.id;
                        data.product = {
                            id: p.id,
                            name: p.name,
                            percentage: p.percentage
                        }
                        data.buyCount = result.buyCount;
                        data.buyUnitPrice = result.buyUnitPrice;
                        data.buyTotalPrice = result.buyTotalPrice;
                        data.sellCount = result.sellCount;
                        data.sellUnitPrice = result.sellUnitPrice;
                        data.sellTotalPrice = result.sellTotalPrice;
                        data.profit = result.profit;
                        data.date = result.date;
                        return data;
                    })
                num = instock.count - num;
                await updateProductInstock(instock.id, num);
                return result;
            } else {
                totalCost += (instock.count * instock.price);
                num = num - instock.count;
                await deleteProductInstock(instock.id);
            }
        }
    }

    return result;

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

    const transactions = await getSaleTransactions(date);

    const transactionList = [];

    if(transactions.length > 0) {
        for(let transaction of transactions) {
            let data = {};
            data.id = transaction.id;
            const product = await getProductById(transaction.productId);
            data.product = {
                id: product.id,
                name: product.name,
                percentage: product.percentage
            }
            data.buyCount = transaction.buyCount;
            data.buyUnitPrice = transaction.buyUnitPrice;
            data.buyTotalPrice = transaction.buyTotalPrice;
            data.sellCount = transaction.sellCount;
            data.sellUnitPrice = transaction.sellUnitPrice;
            data.sellTotalPrice = transaction.sellTotalPrice;
            data.profit = transaction.profit;
            data.date = transaction.date;

            transactionList.push(data);
        }
        
    }
        
    return transactionList;
} 


module.exports = {
    createSaleTransactionService,
    updateSaleTransactionService,
    getSaleTransactionsService
}

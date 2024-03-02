const ApiError = require("../config/customError.config");
const { getProductById } = require("../database/providers/product.provider");
const { createProductInstock, getProductInstocksByProductId, deleteProductInstock, updateProductInstock, getNotSaveProductInstocksByProductId, getNotSaveProductInstocks, getProductInstocks } = require("../database/providers/product_instock.provider");
const { createDailySaleTransaction } = require("../database/providers/profit.provider");
const { createSaleTransaction, getSaleTransactions, updateSaleTransaction, getSaleTransactionById } = require("../database/providers/sale_transaction.provider");

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

    if(!p) {
        throw ApiError.badRequestError("ကုန်ပစ္စည်း မရှိပါ။")
    }

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
        await createProductInstock(product.id,instock,buyUnitPrice,instock,false);
    } else {
        let num = sellCount - buyCount;
        let totalCost = buyTotalPrice;
        const instockList = [];
        await getProductInstocksByProductId(product.id).then((results) => {
            for (const result of results) {
                instockList.push({ id: result.id, count: result.instock, price: result.buyUnitPrice });
            }
        })

        const sum = instockList.reduce((accumulator, object) => {
            return accumulator + object.count;
        },0)

        if(instockList.length === 0 || sum < num) {
            throw ApiError.badRequestError("လက်ကျန် မလောက်ပါ။")
        }

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
                await updateProductInstock(instock.id,instock.count,0,false);
                // await deleteProductInstock(instock.id);
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
                await updateProductInstock(instock.id, instock.count,num, false);
                return result;
            } else {
                    totalCost += (instock.count * instock.price);
                    num = num - instock.count;
                    await updateProductInstock(instock.id,instock.count,0,false);
                    // await deleteProductInstock(instock.id);
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

    if(!id) {
        throw ApiError.badRequestError("no transaction");
    }

    const transaction = await getSaleTransactionById(id);

    if(!transaction) {
        throw ApiError.badRequestError("no transaction");
    }

    if(!p) {
        throw ApiError.badRequestError("ကုန်ပစ္စည်း မရှိပါ။")
    }

    let profit;
    let result;

    if(buyCount === sellCount) {
        const instockList = [];
        await getNotSaveProductInstocksByProductId(product.id).then((results) => {
            for (const result of results) {
                instockList.push({ id: result.id, count: result.instock, tempCount: result.tempInstock });
            }
        })

        if(instockList.length > 0) {
            for(let instock of instockList) {
                if(instock.count === instock.tempCount) {
                    await deleteProductInstock(instock.id);
                } else {
                    await updateProductInstock(instock.id,instock.count,instock.count,true);
                }
            }
        }

        profit = sellTotalPrice - buyTotalPrice; 
        await updateSaleTransaction(id,
            product.id,
            buyCount,
            buyUnitPrice,
            buyTotalPrice,
            sellCount,
            sellUnitPrice,
            sellTotalPrice,
            profit,
            date);
        
        result = await getSaleTransactionById(id).then((result) => {
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
        const instockList = [];
        await getNotSaveProductInstocksByProductId(product.id).then((results) => {
            for (const result of results) {
                instockList.push({ id: result.id, count: result.instock, tempCount: result.tempInstock });
            }
        })
    
        if(instockList.length > 0) {
            for(let instock of instockList) {
                if(instock.count === instock.tempCount) {
                    await deleteProductInstock(instock.id);
                } else {
                    await updateProductInstock(instock.id,instock.count,instock.count,true);
                }
            }
        }  

        const instock = buyCount - sellCount;
        profit = sellTotalPrice - buyTotalPrice; 
        await updateSaleTransaction(id,
            product.id,
            buyCount,
            buyUnitPrice,
            buyTotalPrice,
            sellCount,
            sellUnitPrice,
            sellTotalPrice,
            profit,
            date);
        
        result = await getSaleTransactionById(id).then((result) => {
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

        await createProductInstock(product.id,instock,buyUnitPrice,instock,false);
    } else {
        const instockList = [];
        await getNotSaveProductInstocksByProductId(product.id).then((results) => {
            for (const result of results) {
                instockList.push({ id: result.id, count: result.instock, tempCount: result.tempInstock });
            }
        })
    
        if(instockList.length > 0) {
            for(let instock of instockList) {
                if(instock.count === instock.tempCount) {
                    await deleteProductInstock(instock.id);
                } else {
                    await updateProductInstock(instock.id,instock.count,instock.count,true);
                }
            }
        }  

        let num = sellCount - buyCount;
        let totalCost = buyTotalPrice;

        const instockAllList = [];
        await getProductInstocksByProductId(product.id).then((results) => {
            for (const result of results) {
                instockAllList.push({ id: result.id, count: result.instock, price: result.buyUnitPrice });
            }
        })

        const sum = instockAllList.reduce((accumulator, object) => {
            return accumulator + object.count;
        },0)

        if(instockAllList.length === 0 || sum < num) {
            throw ApiError.badRequestError("လက်ကျန် မလောက်ပါ။")
        }

        for(let instock of instockAllList) {
            if(instock.count === num)
            {
                totalCost += (num * instock.price);
                profit = sellTotalPrice - totalCost;
               
                await updateSaleTransaction(id,
                    product.id,
                    buyCount,
                    buyUnitPrice,
                    buyTotalPrice,
                    sellCount,
                    sellUnitPrice,
                    sellTotalPrice,
                    profit,
                    date);
                
                result = await getSaleTransactionById(id).then((result) => {
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

                await updateProductInstock(instock.id,instock.count,0,false);
                // await deleteProductInstock(instock.id);
                return result;
            } else if(instock.count > num) {
                totalCost += (num * instock.price);
                profit = sellTotalPrice - totalCost;
                await updateSaleTransaction(id,
                    product.id,
                    buyCount,
                    buyUnitPrice,
                    buyTotalPrice,
                    sellCount,
                    sellUnitPrice,
                    sellTotalPrice,
                    profit,
                    date);
                
                result = await getSaleTransactionById(id).then((result) => {
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
                await updateProductInstock(instock.id, instock.count, num, false);
                return result;
            } else {
                totalCost += (instock.count * instock.price);
                num = num - instock.count;
                await updateProductInstock(instock.id,instock.count,0,false);
                    // await deleteProductInstock(instock.id);
            }
        }
    }

    return result;

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

const createDailySaleTransactionService = async(reqBody) => {

   const { dailyCost, dailySell, dailyExpense, date } = reqBody;

    const instockList = [];
    await getNotSaveProductInstocks().then((results) => {
        for (const result of results) {
            instockList.push({ id: result.id, count: result.instock, tempCount: result.tempInstock });
        }
    })

    if(instockList.length > 0) {
        for(let instock of instockList) {
            if(instock.count === instock.tempCount) {
                await updateProductInstock(instock.id,instock.count,instock.tempCount,true);
            } else {
                await updateProductInstock(instock.id,instock.tempCount,instock.tempCount,true);
            }
        }
    }   
    
    await getProductInstocks().then(async (results) => {
        for (const result of results) {
           if(result.instock === 0) {
                await deleteProductInstock(result.id);
           }
        }
    })

   const result = await createDailySaleTransaction(dailyCost,dailySell,dailyExpense,date);

   return result;
} 

module.exports = {
    createSaleTransactionService,
    updateSaleTransactionService,
    getSaleTransactionsService,
    createDailySaleTransactionService
}

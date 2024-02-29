const db = require("../models");
const productInstockModel = db.product_instock;

const createProductInstock = async (productId,instock,buyUnitPrice) => {
    return await productInstockModel.build({
        productId,
        instock,
        buyUnitPrice
    }).save()
}

const updateProductInstock = async (id,productId,instock,buyUnitPrice) => {
    return await productInstockModel.update(
        {
            productId,
            instock,
            buyUnitPrice
        },
        {
            where: {
                id
            }
        }
    )
}

const deleteProductInstock = async (id) => {
    return await productInstockModel.destroy(
        {
            where: {
                id
            }
        }
    )
}

module.exports = {
    createProductInstock,
    updateProductInstock,
    deleteProductInstock
}
const db = require("../models");
const productInstockModel = db.product_instock;

const createProductInstock = async (productId,instock,buyUnitPrice) => {
    return await productInstockModel.build({
        productId,
        instock,
        buyUnitPrice
    }).save()
}

const updateProductInstock = async (id,instock) => {
    return await productInstockModel.update(
        {
            instock,
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

const getProductInstocksByProductId = async (productId) => {
    return await productInstockModel.findAll({
        where: {
            productId
        },
        order: [
            ['createdAt', 'ASC'],
        ],
    })
}

module.exports = {
    createProductInstock,
    updateProductInstock,
    deleteProductInstock,
    getProductInstocksByProductId
}
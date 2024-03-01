const db = require("../models");
const productInstockModel = db.product_instock;

const createProductInstock = async (productId,instock,buyUnitPrice,tempInstock,isSave) => {
    return await productInstockModel.build({
        productId,
        instock,
        buyUnitPrice,
        tempInstock,
        isSave
    }).save()
}

const updateProductInstock = async (id,tempInstock,isSave) => {
    return await productInstockModel.update(
        {
            tempInstock,
            isSave
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

const getNotSaveProductInstocksByProductId = async (productId) => {
    return await productInstockModel.findAll({
        where: {
            productId,
            isSave: false
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
    getProductInstocksByProductId,
    getNotSaveProductInstocksByProductId
}
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

const updateProductInstock = async (id,instock,tempInstock,isSave) => {
    return await productInstockModel.update(
        {
            instock,
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

const getProductInstocks = async () => {
    return await productInstockModel.findAll({
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

const getNotSaveProductInstocks = async () => {
    return await productInstockModel.findAll({
        where: {
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
    getProductInstocks,
    getNotSaveProductInstocksByProductId,
    getNotSaveProductInstocks
}
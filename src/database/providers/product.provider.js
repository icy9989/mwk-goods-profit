const db = require("../models");
const productModel = db.product;

const createProduct = async (name,categoryId,unitId,percentage) => {
    return await productModel.build({
      name,
      categoryId,
      unitId,
      percentage
    }).save()
}

const updateProduct = async (id,name,categoryId,unitId,percentage) => {
    return await productModel.update(
        {
            name,
            categoryId,
            unitId,
            percentage
        },
        { 
            where: {
                id
            }
        }
    )
}

const getProductById = async (id) => {
    return await productModel.findOne({
        where: {
            id
        }
    })
}

const getProductByName= async (name) => {
    return await productModel.findOne({
        where: {
            name
        }
    })
}

const deleteProduct = async (id) => {
    return await productModel.destroy({
        where: {
            id
        }
    })
}
  
const getProducts = async () => {
    return await productModel.findAndCountAll({
        where: {
            deletedAt: null,
        }
    });
};

const getProductsByCategoryId = async (categoryId) => {
    return await productModel.findAndCountAll({
        where: {
            categoryId
        }
    });
}

const getProductsByUnitId = async (unitId) => {
    return await productModel.findAndCountAll({
        where: {
            unitId
        }
    });
}

module.exports = {
    createProduct,
    getProductById,
    getProductByName,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsByCategoryId,
    getProductsByUnitId
}
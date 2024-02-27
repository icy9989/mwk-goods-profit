const db = require("../models");
const categoryModel = db.category;

const createCategory = async (title) => {
    return await categoryModel.build({
      title
    }).save()
}

const updateCategory = async (id, title) => {
    return await categoryModel.update(
        {
            title
        },
        { 
            where: {
                id
            }
        }
    )
}

const getCategoryById = async (id) => {
    return await categoryModel.findOne({
        where: {
            id
        }
    })
}

const getCategoryByTitle = async (title) => {
    return await categoryModel.findOne({
        where: {
            title
        }
    })
}

const deleteCategory = async (id) => {
    return await categoryModel.destroy(
        { 
            where: {
                id
            }
        }
    )
}
  
const getCategories = async () => {
    return await categoryModel.findAndCountAll({
        where: {
            deletedAt: null,
        }
    });
};

module.exports = {
    createCategory,
    getCategoryById,
    getCategoryByTitle,
    updateCategory,
    deleteCategory,
    getCategories,
}
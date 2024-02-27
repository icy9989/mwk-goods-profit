const db = require("../models");
const unitModel = db.unit;

const createUnit = async (title) => {
    return await unitModel.build({
      title
    }).save()
}

const updateUnit = async (id, title) => {
    return await unitModel.update(
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

const getUnitById = async (id) => {
    return await unitModel.findOne({
        where: {
            id
        }
    })
}

const getUnitByTitle = async (title) => {
    return await unitModel.findOne({
        where: {
            title
        }
    })
}

const deleteUnit = async (id) => {
    return await unitModel.destroy(
        { 
            where: {
                id
            }
        }
    )
}
  
  
const getUnits = async () => {
    return await unitModel.findAndCountAll({
        where: {
            deletedAt: null,
        }
    });
};

module.exports = {
    createUnit,
    getUnitById,
    getUnitByTitle,
    updateUnit,
    deleteUnit,
    getUnits,
}
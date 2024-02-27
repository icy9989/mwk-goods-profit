const { successResponse } = require("../config/response");
const { createUnitService, getUnitByIdService, updateUnitService, getUnitsService, deleteUnitService } = require("../services/unit.service");

const createUnitController = async (req, res, next) => {
    try {
        const data = await createUnitService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getUnitByIdController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await getUnitByIdService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const updateUnitController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await updateUnitService(id,req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const deleteUnitController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await deleteUnitService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}


const getUnitsController = async (req, res, next) => {
    try {
        const data = await getUnitsService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUnitController,
    getUnitByIdController,
    updateUnitController,
    deleteUnitController,
    getUnitsController
}
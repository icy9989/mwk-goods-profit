const { successResponse } = require("../config/response");
const { getCategoriesService, getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService } = require("../services/category.service");

const createCategoryController = async (req, res, next) => {
    try {
        const data = await createCategoryService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getCategoryByIdController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await getCategoryByIdService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const updateCategoryController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await updateCategoryService(id,req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}


const deleteCategoryController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await deleteCategoryService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}


const getCategoriesController = async (req, res, next) => {
    try {
        const data = await getCategoriesService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createCategoryController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController,
    getCategoriesController
}
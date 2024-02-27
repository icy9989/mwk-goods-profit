const { successResponse } = require("../config/response");
const { getProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService } = require("../services/product.service");

const createProductController = async (req, res, next) => {
    try {
        const data = await createProductService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getProductByIdController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await getProductByIdService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await updateProductService(id,req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = await deleteProductService(id);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

const getProductsController = async (req, res, next) => {
    try {
        const data = await getProductsService(req.body);
        res.status(200).send(successResponse(data));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    getProductsController
}
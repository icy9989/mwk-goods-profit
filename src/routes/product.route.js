const express = require("express");
const { getProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } = require('../controllers/product.controller');
const tokenMiddleware = require("../middleware/token.middleware");

const router = express.Router();

router.post("", tokenMiddleware(), createProductController);
router.get("", tokenMiddleware(), getProductByIdController);
router.put("", tokenMiddleware(), updateProductController);
router.delete("", tokenMiddleware(), deleteProductController);
router.get("/all", tokenMiddleware(), getProductsController);

module.exports = {
    productRouter: (app) => app.use("/product", router)
}
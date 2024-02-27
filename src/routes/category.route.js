const express = require("express");
const { getCategoriesController, getCategoryByIdController, createCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/category.controller');
const tokenMiddleware = require("../middleware/token.middleware");

const router = express.Router();

router.post("", tokenMiddleware(), createCategoryController);
router.get("", tokenMiddleware(), getCategoryByIdController);
router.put("", tokenMiddleware(), updateCategoryController);
router.delete("", tokenMiddleware(), deleteCategoryController);
router.get("/all", tokenMiddleware(), getCategoriesController);

module.exports = {
    categoryRouter: (app) => app.use("/category", router)
}
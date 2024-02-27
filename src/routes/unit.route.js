const express = require("express");
const { createUnitController, getUnitByIdController, updateUnitController, getUnitsController, deleteUnitController } = require("../controllers/unit.controller");
const tokenMiddleware = require("../middleware/token.middleware");

const router = express.Router();

router.post("", tokenMiddleware(), createUnitController);
router.get("", tokenMiddleware(), getUnitByIdController);
router.put("", tokenMiddleware(), updateUnitController);
router.delete("", tokenMiddleware(), deleteUnitController);
router.get("/all", tokenMiddleware(), getUnitsController);

module.exports = {
    unitRouter: (app) => app.use("/unit", router)
}
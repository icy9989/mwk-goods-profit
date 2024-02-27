const ApiError = require("../config/customError.config");
const { getProductsByUnitId } = require("../database/providers/product.provider");
const { getUnitByTitle, createUnit, getUnitById, updateUnit, getUnits, deleteUnit } = require("../database/providers/unit.provider");

const createUnitService = async(reqBody) => {

    const { title } = reqBody;

    const isUnitExist = await getUnitByTitle(title);

    let unit;

    if(isUnitExist) {
        throw ApiError.badRequestError("ဤယူနစ် ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        unit = await createUnit(title);
    }
    return unit;
}

const getUnitByIdService = async(id) => {

    const unit = await getUnitById(id);

    if(!unit) {
        throw ApiError.notFoundError("ယူနစ် မရှိပါ။");
    }

    return unit;
}

const updateUnitService = async(id, reqBody) => {

    const { title } = reqBody;

    const unit = await getUnitById(id);

    if(!unit) {
        throw ApiError.notFoundError("ယူနစ် မရှိပါ။");
    }

    const isUnitExist = await getUnitByTitle(title);

    if(isUnitExist && isUnitExist.id != id) {
        throw ApiError.badRequestError("ဤယူနစ် ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        await updateUnit(id, title);
    }
}

const deleteUnitService = async (id) => {
    const { count } = await getProductsByUnitId(id);

    if(count > 0) {
        throw ApiError.badRequestError("ဤယူနစ်နှင့် ပတ်သက်သည့် ကုန်ပစ္စည်းများ ရှိနေသည့်အတွက် ဖျက်စီး၍မရနိုင်ပါ။ ")
    }

    const unit = await getUnitById(id);

    if(!unit) {
        throw ApiError.notFoundError("ယူနစ် မရှိပါ။");
    }

    await deleteUnit(id);

    return null;
}

const getUnitsService = async () => {
    const { count, rows: units } = await getUnits();

    return {
        totalUnit: count,
        units
    }
}

module.exports = {
    createUnitService,
    getUnitByIdService,
    updateUnitService,
    deleteUnitService,
    getUnitsService
}
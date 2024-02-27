const ApiError = require("../config/customError.config");
const { getCategories, getCategoryById, createCategory, getCategoryByTitle, updateCategory, deleteCategory } = require("../database/providers/category.provider");
const { getProductsByCategoryId } = require("../database/providers/product.provider");

const createCategoryService = async(reqBody) => {

    const { title } = reqBody;

    if(!title) {
        throw ApiError.badRequestError("အမျိုးအစား ဖြည့်သွင်းရန်လိုအပ်ပါသည်။")
    }

    const isCategoryExist = await getCategoryByTitle(title);

    let category;

    if(isCategoryExist) {
        throw ApiError.badRequestError("ဤအမျိုးအစား ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        category = await createCategory(title);
    }
    return category;
}

const getCategoryByIdService = async(id) => {

    const category = await getCategoryById(id);

    if(!category) {
        throw ApiError.notFoundError("အမျိုးအစား မရှိပါ။");
    }

    return category;
}

const updateCategoryService = async(id, reqBody) => {

    const { title } = reqBody;

    if(!title) {
        throw ApiError.badRequestError("အမျိုးအစား ဖြည့်သွင်းရန်လိုအပ်ပါသည်။")
    }

    const category = await getCategoryById(id);
    
    if(!category) {
        throw ApiError.notFoundError("အမျိုးအစား မရှိပါ။");
    }

    const isCategoryExist = await getCategoryByTitle(title);

    if(isCategoryExist && isCategoryExist.id != id) {
        throw ApiError.badRequestError("ဤအမျိုးအစား ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        await updateCategory(id, title);
    }

    return null;
}

const deleteCategoryService = async (id) => {
    const { count } = await getProductsByCategoryId(id);

    if(count > 0) {
        throw ApiError.badRequestError("ဤအမျိုးအစားနှင့် ပတ်သက်သည့် ကုန်ပစ္စည်းများ ရှိနေသည့်အတွက် ဖျက်စီး၍မရနိုင်ပါ။")
    }

    const category = await getCategoryById(id);
    
    if(!category) {
        throw ApiError.notFoundError("အမျိုးအစား မရှိပါ။");
    }

    await deleteCategory(id);

    return null;
}

const getCategoriesService = async () => {
    const { count, rows: categories } = await getCategories();

    return {
        totalCategory: count, 
        categories
    }
}

module.exports = {
    createCategoryService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService,
    getCategoriesService
}
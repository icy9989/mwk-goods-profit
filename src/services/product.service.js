const ApiError = require("../config/customError.config");
const { getProductByName, createProduct, getProductById, updateProduct, getProducts, deleteProduct } = require("../database/providers/product.provider");

const createProductService = async(reqBody) => {

    const { name, category, unit, percentage } = reqBody;

    const isProductExist = await getProductByName(name);

    let product;

    if(isProductExist) {
        throw ApiError.badRequestError("ဤကုန်ပစ္စည်း ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        product = await createProduct(name,category.id,unit.id,percentage);
    }
    return product;
}

const getProductByIdService = async(id) => {

    const product = await getProductById(id);

    if(!product) {
        throw ApiError.notFoundError("ကုန်ပစ္စည်း မရှိပါ။");
    }

    return product;
}

const updateProductService = async(id, reqBody) => {

    const { name, category, unit, percentage } = reqBody;

    const product = await getProductById(id);

    if(!product) {
        throw ApiError.notFoundError("ကုန်ပစ္စည်း မရှိပါ။");
    }

    const isProductExist = await getProductByName(name);

    if(isProductExist && isProductExist.id != id) {
        throw ApiError.badRequestError("ဤကုန်ပစ္စည်း ရှိပြီးသားဖြစ်သည့်အတွက် အသစ်တစ်ဖန်ပြန်လည်ရိုက်ထည့်ပါ။");
    } else {
        await updateProduct(id,name,category.id,unit.id,percentage);
    }
}

const deleteProductService = async (id) => {

    const product = await getProductById(id);

    if(!product) {
        throw ApiError.notFoundError("ကုန်ပစ္စည်း မရှိပါ။");
    } 
    
    await deleteProduct(id);

    return null;
}

const getProductsService = async () => {
    const { count, rows: products } = await getProducts();

    return {
        totalProduct: count,
        products
    }
}

module.exports = {
    createProductService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    getProductsService
}
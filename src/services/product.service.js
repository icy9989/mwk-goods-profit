const ApiError = require("../config/customError.config");
const { getProductByName, createProduct, getProductById, updateProduct, getProducts, deleteProduct } = require("../database/providers/product.provider");
const { getCategoryById } = require("../database/providers/category.provider");
const { getUnitById } = require("../database/providers/unit.provider");

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

    return null;
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

    const productList = [];

    if(products.length < 1) {
        return {
            totalProduct: count,
            products
        }
    } else {
        for(let product of products) {
            let data = {};
            data.id = product.id;
            data.name = product.name;
            const cartegory = await getCategoryById(product.categoryId);
            data.category = {
                id: cartegory.id,
                title: cartegory.title
            }
            const unit = await getUnitById(product.unitId);
            data.unit = {
                id: unit.id,
                title: unit.title
            }
            data.percentage = product.percentage;
            productList.push(data);
        }

        return {
            totalProduct: count,
            products: productList
        }
    }   
}

module.exports = {
    createProductService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    getProductsService
}
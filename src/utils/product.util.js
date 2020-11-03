import PRODUCT_CONSTANT from "../constants/product.constant";

const ProductUtils = {};

/**
 * finding product name by provide product code
 * 
 * @param {String} code 
 */
ProductUtils.retrieveCatByCode = (code) => {
    return PRODUCT_CONSTANT.categories
    .find(category => category.code == code)
    .name;
}

ProductUtils.retrievePriceMethod = (code) => {
    return PRODUCT_CONSTANT.priceMethod
    .find(method => method.code == code)
    .name;
}

/**
 * find category code by provided name
 * 
 * @param {String} name 
 */
ProductUtils.retrieveCatByName = (name) => {
    return PRODUCT_CONSTANT.categories
    .find(category => category.name == name)
    .code;
}
//Warning: duplicated code

export default ProductUtils;

//code 
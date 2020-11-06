import PRODUCT_CONSTANT from "../constants/product.constant";

const ProductUtils = {};

/**
 * finding product name by provide product code
 * 
 * @param {String} code 
 */
ProductUtils.retrieveCatByCode = (code) => {
    if(typeof(code) == 'undefined')
        return null;
    
    return PRODUCT_CONSTANT.categories
    .find(category => category.code == code)
    .name;
}

ProductUtils.retrievePriceMethod = (code) => {
    if(typeof(code) == 'undefined')
        return null;
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
    if(typeof(name) == 'undefined')
        return null;
    return PRODUCT_CONSTANT.categories
    .find(category => category.name == name)
    .code;
}

export default ProductUtils;

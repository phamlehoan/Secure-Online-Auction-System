import PRODUCT_CONSTANT from "../constants/product.constant";

const ProductUtils = {};

/**
 * finding product name by provide product code
 * 
 * @param {String} code 
 */
ProductUtils.retrieveCatByCode = (code) => {
    return PRODUCT_CONSTANT.categories.find(category => category.code == code).name;
}

ProductUtils.retrievePriceMethod = (code) => {
    return PRODUCT_CONSTANT.priceMethod.find(method => method.code == code).name;
}
//Warning: duplicated code

export default ProductUtils;

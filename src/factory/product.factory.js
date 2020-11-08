/**
 * Build criteria query base on attributes
 * 
 * @author github.com/dungphanxuan12
 */

const ProductFactory = {};

/**
 * Create new criteria base on attributes
 * 
 * @param {String} name 
 * @param {String} category 
 * @param {String} price 
 * @param {String} userId 
 * @returns {Object} criteria
 */
ProductFactory.create = (name, category, price, userId) => {
    let criteriaBuilder = {};
    if (name !== null && typeof(name) !== 'undefined') {
        criteriaBuilder["name"] = name;
    }

    if (category !== null && typeof(category) !== 'undefined') {
        criteriaBuilder["categories.name"] = category;
    }

    if (price !== null && typeof(price) !== 'undefined') {
        criteriaBuilder["price"] = price;
    }

    if (userId !== null && typeof(userId) !== 'undefined') {
        criteriaBuilder["userId"] = userId;
    }

    return criteriaBuilder;
}

export default ProductFactory;

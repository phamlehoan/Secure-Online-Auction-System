import ProductModel from "../models/product.model";
/**
 * Define all services for home route
 */
const ProductService = {};

/**
 * Save product into database
 * 
 * @param { Product } product 
 */
ProductService.save = async (product) => {
    return await ProductModel.create(product);
}

/**
 * Find All products by { id }
 * 
 * @param { String } id 
 */
ProductService.findProductById = async (id) => {
    return await ProductModel.findById(id);
}

/**
 * Find All products
 */
ProductService.findAll = async () => {
    return await ProductModel.find({});
}

/**
 * Find All products have { category }
 * 
 * @param { String } category 
 */
ProductService.findProductByCategory = async (category) => {
    return await ProductModel.find({"categories.name" : category});
}

/**
 * Find all products have { userId }
 * 
 * @param { String } userId 
 */
ProductService.findProductsByUserId = async (userId) => {
    return await ProductModel.find({"userId": userId});
}

/**
 * Find product by criteria
 * 
 * @param {Object} criteria
 * @returns {ProductModel} Products
 */
ProductService.find = async (criteria) => {
    return await ProductModel.find(criteria);
}

/**
 * 
 * @param {String} productId 
 * @param {Number} newPrice 
 */
ProductService.updatePrice = async (productId, newPrice) => {
    let product = await ProductModel.findOne({_id: productId});
    if(product){
        product.update({
            price: newPrice,
            nextPrice: parseInt(newPrice) + product.priceStep
        })
        .catch(err => console.log(err));
    }
}

export default ProductService;

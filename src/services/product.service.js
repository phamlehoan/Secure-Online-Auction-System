import Product from "../models/product.model";
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
    return await Product.create(product);
}

/**
 * Find All products by { id }
 * 
 * @param { String } id 
 */
ProductService.findProductById = async (id) => {
    return await Product.findById(id);
}

/**
 * Find All products
 */
ProductService.findAll = async () => {
    return await Product.find({});
}

/**
 * Find All products have { category }
 * 
 * @param { String } category 
 */
ProductService.findProductByCategory = async (category) => {
    return await Product.find({"categories.name" : category});
}

/**
 * Find all products have { userId }
 * 
 * @param { String } userId 
 */
ProductService.findProductsByUserId = async (userId) => {
    return await Product.find({"userId": userId});
}

export default ProductService;

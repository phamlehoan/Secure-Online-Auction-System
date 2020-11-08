import { query } from "express";
import ProductModel from "../models/product.model";
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
    return await Product.create(product).exec();
}

/**
 * Find All products by { id }
 * 
 * @param { String } id 
 */
ProductService.findProductById = async (id) => {
    return await Product.findById(id).exec();
}

/**
 * Find All products
 */
ProductService.findAll = async () => {
    return await Product.find({}).exec();
}

/**
 * Find All products have { category }
 * 
 * @param { String } category 
 */
ProductService.findProductByCategory = async (category) => {
    return await Product.find({"categories.name" : category}).exec();
}

/**
 * Find all products have { userId }
 * 
 * @param { String } userId 
 */
ProductService.findProductsByUserId = async (userId) => {
    return await Product.find({"userId": userId}).exec();
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

export default ProductService;

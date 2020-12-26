import ProductModel from "../models/product.model";
import AuctionLogService from "../services/aution.service";
import { ProductNotFoundException } from "../exceptions/product.exception";
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
 * Find products by { id }
 *
 * @param { String } id
 */
ProductService.findProductById = async (id) => {
    let product = await ProductModel.findById(id);
    if (!product)
        throw new ProductNotFoundException('Product is not valid !');

    return product;
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
    return await ProductModel
        .find(criteria)
        .sort({createdAt: -1});
}

/**
 *
 * @param {String} productId
 * @param {Number} newPrice
 */
ProductService.updatePrice = async (productId, newPrice) => {
    let product = await ProductModel.findOne({_id: productId});
    let bidProduct = await AuctionLogService.findHighestPrice(productId);
    if(product){
        product.update({
            price: newPrice,
            nextPrice: parseInt(newPrice) + product.priceStep,
            winnerId: bidProduct[0].userId
        })
        .catch(err => console.log(err));
    }
}

/**
 *
 * @param {Array} list Ids
 * @returns {Array} list user
 */
ProductService.findAllWinnerByProductIds = async (listIds) => {
    return await ProductModel.find({
        _id: {
            $in: listIds
        }
    }).select('_id winnerId price');
}

/**
 * find product by ID and update
 * 
 * @param {String} id 
 * @param {Product} product 
 */
ProductService.update = async (id, product) => {
    return await ProductModel.findOneAndUpdate(
        {_id: id},
        product
    );
}


/**
 * 
 * @param {String} id 
 */
ProductService.delete = async (id) => {
    return await ProductModel.findByIdAndDelete({
        _id: id
    });
}

/**
 * 
 * @param {Object} object
 * @returns encrypted object
 */
ProductService.encrypt = async (object) => {
    
}

/**
 * 
 */
ProductService.findProductsExpiration = async () => {
    return await ProductModel.aggregate([
        {
            $project: {
                time: {
                    $subtract: ['$aucEndTime', '$$NOW']
                },
                status: 1
            }
        },
        {
            $match: {
                status: '1',
                time: {
                  $lte: 900000,
                  $gt: 0
                }
            }
        }
    ]);
}

ProductService.changeStatus = async (productId) => {
    return await ProductModel.findOneAndUpdate(
        {_id: productId},
        {status: '2'}
    )
}

ProductService.banProduct = async (id,file) => {
    return ProductModel.findByIdAndUpdate(id, file);
}

export default ProductService;

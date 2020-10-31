import ProductService from "../services/product.service";
import ProductUtils from "../utils/product.util";
import Cloudinary from "../configs/cloudinary.config";

import PRODUCT_CONSTANTS from "../constants/product.constant";


/**
 * controller home page
 */
const ProductController = {};

let { categories, priceMethod, productStatus } = PRODUCT_CONSTANTS;

/**
 * Checking if exist req.query
 *  Get category id by request query "products/?category=categoryId"
 *  retrieve category name by id in product constant
 *  filtering all product has category name
 *  If has no req.query
 *  Getting all product in database and showing all on page /products
 * 
 */
ProductController.getProducts = async (req, res) => {
    let products = [];
    if (req.query.category) {
        let category = ProductUtils.retrieveCatByCode(req.query.category);
        products =await ProductService.findProductByCategory(category);

        return res.render('main/products/products', { 
            products,
            categories,
            user: req.user,
            data: req.flash("data"),
            title: 'SOAS. - Category : '+ category
        });
    }
    products = await ProductService.findAll();
    
    
    return res.render('main/products/products', { 
        products,
        categories,
        data: req.flash("data"),
        user: req.user,
        title: 'SOAS. - List Products' 
    });
}

/**
 * 
 */
ProductController.getAddProduct = (req, res) => {
    

    return res.render("main/products/addProduct", {
        categories,
        data: req.flash("data"),
        user: req.user,
        title: 'SOAS. - Winning Products' 
    });
}

/**
 * Adding new product
 * 
 * @todo set default value for each attribute of req.body
 * @todo validate date time
 * @todo save categories and bidding methods into database 
 *       instead hard-code by constants
 */
ProductController.postProduct = async (req, res) => {
    try {
        let image = "";
        await Cloudinary.uploadSingle(req.file.path).then(data => {
            image = data.url;
        });
        let product = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
            aucStartTime: req.body.startTime,
            aucEndTime: req.body.endTime,
            reservePrice: req.body.reservePrice,
            image: image,
            categories: {
                name: ProductUtils.retrieveCatByCode(req.body.category)
            },
            tags: null,
            priceStep: req.body.priceStep,
            priceMethod: ProductUtils.retrievePriceMethod(req.body.priceMethod),
            status: 1
        }
        await ProductService.save(product);
    } catch (error) {
        console.log(error);
    }

    return res.redirect("/products");
}

/**
 * get detail of product
 */
ProductController.getDetail =async (req, res) => {
    // const { id } = req.params;
    // let product = await ProductService.findProductById(id);
    return res.render("main/products/details", {
        categories,
        data: req.flash("data"),
        user: req.user,
        title: 'SOAS. - '
    })
}

/**
 * Selecting all products have userId == current userId
 * show All products
 */
ProductController.getManage = async (req, res) => {
    console.log(req.user._id);
    let products = await ProductService.findProductsByUserId(req.user._id);
    return res.render("main/products/manage", {
        products,
        categories,
        data: req.flash("data"),
        user: req.user,
        title: "manage products page"
    })
}


export default ProductController;

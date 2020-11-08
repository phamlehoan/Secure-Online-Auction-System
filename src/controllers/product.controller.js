import ProductService from "../services/product.service";
import ProductUtils from "../utils/product.util";
import Cloudinary from "../configs/cloudinary.config";
import ProductFactory from "../factory/product.factory";

import PRODUCT_CONSTANTS from "../constants/product.constant";


/**
 * controller home page
 */
const ProductController = {};

let { categories, priceMethod, productStatus } = PRODUCT_CONSTANTS;

/**
 * 
 */
ProductController.getProducts = async (req, res) => {
    let {category, price, userId} = req.query;
    let name = req.query.q;
    let categoryCode = ProductUtils.retrieveCatByCode(category);
    let criteria = ProductFactory.create(
        name,
        categoryCode,
        price,
        userId
    );
    let products = [];
    
    if(!req.user){
        return res.render('main/products/products', {
            products,
            categories,
            data: req.flash("data"),
            user: req.user,
            title: 'SOAS. - List Products'
        });
    }

    let phone = req.user.phone;
    let city = req.user.personalInfo.address.city;
    let district = req.user.personalInfo.address.district;

    if(!phone || !city || !district){
        let arrErr = ["You must input important information"];
        req.flash("must-enter", arrErr);
        return res.render("main/profile/profile",{
            data: req.flash("data"),
            user: req.user,
            errors: req.flash("must-enter"),
            title: "profile"
        })
    }

    products = await ProductService.find(criteria);

    return res.render('main/products/products', {
        products,
        categories,
        data: req.flash("data"),
        user: req.user,
        title: 'SOAS. - List Products'
    });
}

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
    const { id } = req.params;
    let product = await ProductService.findProductById(id);
    return res.render("main/products/details", {
        categories,
        product,
        data: req.flash("data"),
        user: req.user,
        title: 'SOAS. - '+product.name + ' 😍'
    })
}

/**
 * Selecting all products have userId == current userId
 * show All products
 */
ProductController.getManage = async (req, res) => {
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

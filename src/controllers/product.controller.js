import ProductService from "../services/product.service";
import ProductUtils from "../utils/product.util";
import Cloudinary from "../configs/cloudinary.config";
import ProductFactory from "../factory/product.factory";
import AuctionLogService from "../services/aution.service";
import UserServices from "../services/user.service";

import PRODUCT_CONSTANTS from "../constants/product.constant";
import { NotHavePermissionException } from "../exceptions/user.exception";
import { ProductNotFoundException } from "../exceptions/product.exception";
import ProductModel from "../models/product.model";



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
    let { role } = req.signedCookies;
    let name = req.query.q;
    let categoryCode = ProductUtils.retrieveCatByCode(category);
    let criteria = ProductFactory.create(
        name,
        categoryCode,
        price,
        userId
    );
    let products = await ProductService.find(criteria);
    let numberBiddingProd = 0;

    if(!req.user){
        return res.render('main/products/products', {
            products,
            categories,
            numberBiddingProd,
            data: req.flash("data"),
            user: req.user,
            title: 'SOAS. - List Products'
        });
    }

    numberBiddingProd = await AuctionLogService.countNumberOfAuctions(req.user._id);

    let phone = req.user.phone;
    let city = req.user.personalInfo.address.city;
    let district = req.user.personalInfo.address.district;

    if(!phone || !city || !district){
        let arrErr = ["You must input important information"];
        req.flash("must-enter", arrErr);
        return res.render("main/profile/profile",{
            data: req.flash("data"),
            role,
            user: req.user,
            categories,
            numberBiddingProd,
            errors: req.flash("must-enter"),
            title: "profile"
        })
    }

    return res.render('main/products/products', {
        products,
        categories,
        role,
        data: req.flash("data"),
        user: req.user,
        numberBiddingProd,
        title: 'SOAS. - List Products'
    });
}

ProductController.getAddProduct = async (req, res) => {
    let { role } = req.signedCookies;
    return res.render("main/products/addProduct", {
        categories,
        role,
        data: req.flash("data"),
        numberBiddingProd: await AuctionLogService.countNumberOfAuctions(req.user._id),
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
        let image = "" || process.env.PRODUCT_DEFAULT_IMG;
        if (req.file) {
            await Cloudinary.uploadSingle(req.file.path)
            .then(data => {
                image = data.url;
            });
        }

        let product = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
            aucStartTime: req.body.startTime || Date.now,
            aucEndTime: req.body.endTime,
            price: req.body.price,
            image: image,
            categories: {
                name: ProductUtils.retrieveCatByCode(req.body.category)
            },
            tags: null,
            priceStep: req.body.priceStep,
            priceMethod: ProductUtils.retrievePriceMethod(req.body.priceMethod) || "INCR",
            status: 1,
            nextPrice: parseInt(req.body.price) + parseInt(req.body.priceStep),
            userId: req.user._id
        }
        await ProductService.save(product);
    } catch (error) {
        console.log(error);
    }

    return res.redirect("/products",
    {
        data: req.flash("data")
    });
}

/**
 * get detail of product
 */
ProductController.getDetail = async (req, res) => {
    try {
        let { role } = req.signedCookies;
        const { id } = req.params;
        let product = await ProductService.findProductById(id);
        let seller = await UserServices.findUserById(product.userId);
        let currentHighestPriceProduct  = await AuctionLogService.findHighestPrice(product._id);
        let biddingCouter = 0;
        if (req.user) {
            biddingCouter = await AuctionLogService.countNumberOfAuctions(req.user._id);
        }
        return res.render("main/products/details", {
            categories,
            product,
            role,
            seller: seller[0],
            data: req.flash("data"),
            user: req.user,
            userWithHighestPrice: currentHighestPriceProduct.length > 0 ? currentHighestPriceProduct[0].userId : 'No User',
            numberBiddingProd: biddingCouter,
            title: 'SOAS. - '+product.name + ' 😍'
        })
    } catch (error) {
        console.log(error);
    }

}

/**
 * bidding managements
 * Selecting all products have userId == current userId
 * show All products
 */
ProductController.getManage = async (req, res) => {
    let { role } = req.signedCookies;
    let currentUser = req.user;
    let products = await AuctionLogService.findNewestBiddingProducts(currentUser._id);
    let numberBiddingProd = products.length;
    let productIds = [];
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        productIds.push(product._id.productId);
    }
    let winners = await ProductService.findAllWinnerByProductIds(productIds);
    return res.render("main/products/auction", {
        products,
        categories,
        role,
        data: req.flash("data"),
        numberBiddingProd,
        user: {
            avatarUrl: currentUser.avatarUrl,
            _id: currentUser._id
        },
        winners,
        title: "auctions | 😎"
    })
}

ProductController.productManegements = async (req, res) => {
    let { role } = req.signedCookies;
    let sellerId = req.user._id;
    let products = await ProductService.findProductsByUserId(sellerId);
    return res.render("main/products/productsManagement", {
        products,
        categories,
        role,
        data: req.flash("data"),
        numberBiddingProd: await AuctionLogService.countNumberOfAuctions(sellerId),
        user: req.user,
        title: "manage products| 🤑"
    })
}

/**
 * Update product
 */
ProductController.updateProducts = async (req, res) => {
    let { role } = req.signedCookies;
    let prodductId = req.params.id;
    let product = await ProductService.findProductById(prodductId);
    if(product.userId != req.user._id)
        throw new NotHavePermissionException('You have no permission for this operation');

    return res.render('main/products/update', {
        product,
        categories,
        role,
        data: req.flash("data"),
        numberBiddingProd: await AuctionLogService.countNumberOfAuctions(req.user._id),
        user: req.user,
        title: 'Edit |'+product.name
    })
}

/**
 *
 */
ProductController.postUpdateProducts = async (req, res) => {
    try {
        let image = "" || process.env.PRODUCT_DEFAULT_IMG;
        if (req.file) {
            await Cloudinary.uploadSingle(req.file.path)
            .then(data => {
                image = data.url;
            });
        }

        let product = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
            aucStartTime: req.body.startTime || Date.now,
            aucEndTime: req.body.endTime,
            price: req.body.price,
            image: image,
            categories: {
                name: ProductUtils.retrieveCatByCode(req.body.category)
            },
            tags: null,
            priceStep: req.body.priceStep,
            priceMethod: ProductUtils.retrievePriceMethod(req.body.priceMethod) || "INCR",
            status: 1,
            nextPrice: parseInt(req.body.price) + parseInt(req.body.priceStep),
            userId: req.user._id
        }

        await ProductService.save(product);
    } catch (error) {
        console.log(error);
    }

    return res.redirect("/products"),{
        data: req.flash("data")
    };
}

export default ProductController;

import date from "date-and-time";

import ProductService from "../services/product.service";
import ProductUtils from "../utils/product.util";
import Cloudinary from "../configs/cloudinary.config";
import ProductFactory from "../factory/product.factory";
import AuctionLogService from "../services/aution.service";
import UserServices from "../services/user.service";
import CartService from "../services/cart.service";

/**
 * controller home page
 */
const ProductController = {};

/**
 *
 */
ProductController.getProducts = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    let perpage = 8
    let start = (page-1)*perpage
    let end = page*perpage
    let {category, price, userId} = req.query;
    let name = req.query.q;
    let categoryCode = ProductUtils.retrieveCatByCode(category);
    let criteria = ProductFactory.create(
        name,
        categoryCode,
        price,
        userId
    );
    let products = await ProductService.find(criteria);
    let lengthPage
    if(products.length%8 == 0)
        lengthPage = products.length/8;
    else
        lengthPage = products.length/8+1;
    if(!req.user){
        return res.render('main/products/products', {
            products,
            title: 'SOAS. - List Products',
            page: lengthPage
        });
    }

    let phone = req.user.phone;
    let city = req.user.personalInfo.address.city;
    let district = req.user.personalInfo.address.district;

    if(!phone || !city || !district){
        let arrErr = ["You must input important information"];
        req.flash("must-enter", arrErr);
        return res.render("main/profile/profile",{
            errors: req.flash("must-enter"),
            title: "profile",
        })
    }

    return res.render('main/products/products', {
        products: products.slice(start,end),
        title: 'SOAS. - List Products',
        page: lengthPage
    });
}

ProductController.getAddProduct = async (req, res) => {
    return res.render("main/products/addProduct", {
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
        return res.redirect("/products");
    } catch (error) {
        console.log(error);
        return res.redirect('/products?errors=true');
    }


}

/**
 * get detail of product
 */
ProductController.getDetail = async (req, res) => {
    try {
        const { id } = req.params;
        let product = await ProductService.findProductById(id);
        let seller = await UserServices.findUserById(product.userId);
        let currentHighestPriceProduct  = await AuctionLogService.findHighestPrice(product._id);
        return res.render("main/products/details", {
            product,
            seller: seller[0],
            userWithHighestPrice: currentHighestPriceProduct.length > 0 ? currentHighestPriceProduct[0].userId : 'No User',
            title: 'SOAS. - '+product.name + ' 😍'
        })
    } catch (error) {
        console.log(error);
        return res.redirect('/products?errors=true');
    }

}

/**
 * bidding managements
 * Selecting all products have userId == current userId
 * show All products
 */
ProductController.getManage = async (req, res) => {
    let currentUser = req.user;
    let products = await AuctionLogService.findNewestBiddingProducts(currentUser._id);
    let productIds = [];
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        productIds.push(product._id.productId);
    }
    let winners = await ProductService.findAllWinnerByProductIds(productIds);
    return res.render("main/products/auction", {
        products,
        winners,
        user: {
            avatarUrl: currentUser.avatarUrl,
            _id: currentUser._id
        },
        title: "auctions | 😎"
    })
}

ProductController.productManegements = async (req, res) => {
    let sellerId = req.user._id;
    let products = await ProductService.findProductsByUserId(sellerId);
    return res.render("main/products/productsManagement", {
        products,
        title: "manage products| 🤑"
    })
}

/**
 * Update product
 */
ProductController.updateProducts = async (req, res) => {
    let prodductId = req.params.id;
    let product = await ProductService.findProductById(prodductId);
    if(product.userId != req.user._id)
        return res.redirect('/products?errors=403')
    let startTime = date.format(product.aucStartTime, 'M/D/YYYY HH:mm:ss');
    let endTime = date.format(product.aucEndTime, 'M/D/YYYY HH:mm:ss');
    return res.render('main/products/update', {
        product,
        time: {
            startTime,
            endTime
        },
        title: 'Edit |'+ product.name
    })
}

/**
 *
 */
ProductController.postUpdateProducts = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await ProductService.findProductById(productId);
        if (product) {
            let image = "" || product.image;
            if (req.file) {
                await Cloudinary.uploadSingle(req.file.path)
                .then(data => {
                    image = data.url;
                });
            }

            let newProduct = {
                name: req.body.name || product.name,
                code: req.body.code || product.code,
                description: req.body.description || product.description,
                aucStartTime: req.body.startTime || product.startTime,
                aucEndTime: req.body.endTime || product.endTime,
                price: req.body.price || product.price,
                image: image,
                categories: {
                    name: ProductUtils.retrieveCatByCode(req.body.category)
                },
                tags: null,
                priceStep: req.body.priceStep || product.priceStep,
                priceMethod: ProductUtils.retrievePriceMethod(req.body.priceMethod) || "INCR",
                status: 1,
                nextPrice: parseInt(product.price) + parseInt(product.priceStep),
                userId: req.user._id,
                updatedAt: Date.now()
            }
            return await ProductService.update(productId, newProduct);
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/products?errors=true');
    }
}

ProductController.deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        await ProductService.delete(id);
        return res.redirect('/products/manage');
    } catch (error) {
        console.log(error);
        return res.redirect('/products/manage?errors=true');
    }
}

ProductController.getCart = async (req, res) => {
    let products = await CartService.findAll(req.user._id);
    console.log(products);
    return res.render('main/cart/cart', {
        products,
        title: 'Cart 💲'
    })
}

export default ProductController;

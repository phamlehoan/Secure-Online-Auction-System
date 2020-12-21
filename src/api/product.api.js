import mongoose from "mongoose";

import ProductService from "../services/product.service";
import AuctionService from "../services/aution.service";
import CartService from "../services/cart.service";
import UserService from "../services/user.service";
import MailService from "../services/mail.service";


const ProductApi = {};

ProductApi.getProducts = async (req, res) => {
    return res.json({
        products : await ProductService.findAll()
    })
}

ProductApi.getProduct = async (req, res) => {
    let productId = req.params.id;
    let price = await ProductService.findProductById(productId).nextPrice;
    return res.json({
        price
    })
}

ProductApi.getProductAndWinner = async (req, res) => {
    let { id } = req.body;//productId
    let product = await ProductService.findProductById(id);
    let winner = await AuctionService.findHighestPrice(id);
    let existCart = await CartService.findByUserId(winner[0]._id);
    if (existCart) {
        await CartService.findAndUpdate(winner[0]._id, {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }else {
        await CartService.save({
            userId: winner[0].userId.toString(),
            products: [{
                id: product._id.toString(),
                name: product.name,
                price: product.price,
                image: product.image
            }]
        });
    }
    let user = await UserService.findUserById(winner[0].userId);
    await MailService.winningBid(user[0].local.email, {
        image: product.image,
        name: product.name,
        price: product.price
    });
    return res.json({
        product,
        winner
    });
}

ProductApi.postProduct = async (req, res) => {

}

export default ProductApi;

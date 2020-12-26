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
    let existCart = await CartService.findByUserIdAndProductId(winner[0]._id, id);//bug
    console.log("existCart", existCart);
    if (existCart) {
        await CartService.save({
            userId: winner[0].userId.toString(),
            product: {
                id: id,
                name: product.name,
                price: product.price,
                image: product.image
            }
        });
        
    }

    let user = await UserService.findUserById(winner[0].userId);
    await MailService.winningBid(user[0].local.email, {
        image: product.image,
        name: product.name,
        price: product.price
    });
    let cart = await CartService.count(req.user._id);
    return res.json({
        product,
        winner,
        cart
    });
}

ProductApi.postProduct = async (req, res) => {

}

export default ProductApi;

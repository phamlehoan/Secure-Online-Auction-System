import CartModel from "../models/order.model";

const CartService = {};

CartService.save = async (cart) => {
    return await CartModel.create(cart);
}

CartService.count = async (userId) => {
    return await CartModel
    .find({userId})
    .count() || 0;
}

CartService.findAndUpdate = async (userId, product) => {
    return await CartModel.findByIdAndUpdate({userId}, {
        $push : {
            products: {
                id: product._id.toString(),
                name: product.name,
                price: product.price,
                image: product.image
            }
        }
    });
}

CartService.findAll = async (userId) => {
    return await CartModel.find({userId});
}

CartService.findByUserId = async (userId) => {
    return await CartModel.findOne({userId});
}

export default CartService;

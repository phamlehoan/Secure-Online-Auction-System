import CartModel from "../models/order.model";

const CartService = {};

CartService.save = async (cart) => {
    return await CartModel.create(cart);
}

CartService.count = async (userId) => {
    return await CartModel
    .find({userId})
    .countDocuments() || 0;
}

CartService.findAndUpdate = async (userId, product) => {
    return await CartModel.findByIdAndUpdate({userId}, {
        $push : {
            products: {
                id: product._id,
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
    console.log(userId);
    return await CartModel.find({
        "userId": userId
    });
}

export default CartService;

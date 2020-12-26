const CartApi = {};

CartApi.count = async (req, res) => {
    return await CartService.count(req.user._id) || 0;
}

export default CartApi;

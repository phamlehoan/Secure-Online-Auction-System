import AuctionLogService from "../services/aution.service";
import CartService from "../services/cart.service";

import PRODUCT_CONSTANTS from "../constants/product.constant";

const Helpers = {}

let { categories } = PRODUCT_CONSTANTS;

Helpers.localVarsForward = async (req, res, next) => {
    res.locals.user = req.user;
    res.locals.data = req.flash("data");
    res.locals.categories = categories;
    res.locals.numberBiddingProd = await AuctionLogService.countNumberOfAuctions(req.user._id);
    res.locals.cartCounter = await CartService.count(req.user._id);
    next();
}

export default Helpers;

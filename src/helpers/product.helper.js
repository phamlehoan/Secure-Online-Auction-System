import AuctionLogService from "../services/aution.service";
import CartService from "../services/cart.service";

import PRODUCT_CONSTANTS from "../constants/product.constant";

const Helpers = {}

let { categories } = PRODUCT_CONSTANTS;

Helpers.localVarsForward = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.isLogged = true;
        res.locals.categories = categories;
        res.locals.numberBiddingProd = await AuctionLogService.countNumberOfAuctions(req.user._id);
        res.locals.cartCounter = await CartService.count(req.user._id);
        res.locals.user = req.user;
        next();
    }else{
        res.locals.isLogged = false;
        res.locals.categories = categories;
        res.locals.numberBiddingProd = 0;
        res.locals.cartCounter = 0;
        res.locals.user = {

        };
        next();
    }
}

export default Helpers;

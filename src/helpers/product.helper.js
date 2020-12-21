import PRODUCT_CONSTANTS from "../constants/product.constant";

const Helpers = {}

let { categories } = PRODUCT_CONSTANTS;

Helpers.localVarsForward = (req, res, next) => {
    res.locals.user = req.user;
    res.locals.data = req.flash("data");
    res.locals.categories = categories;
    next();
}

export default Helpers;

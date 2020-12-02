/**
 * controller home page
 */
import AuctionLogModel from "../models/auctionlog.model";

import PRODUCT_CONSTANTS from "../constants/product.constant";

const HomeController = {};
let { categories, priceMethod, productStatus } = PRODUCT_CONSTANTS;

HomeController.getHomepage = async (req, res) => {
    return res.redirect('/login');
}

HomeController.getProfile = (req, res) => {
    return res.render("main/profile/profile",{
        data: req.flash("data"),
        user: req.user,
        numberBiddingProd,
        errors: req.flash("errors"),
        success:req.flash("success")
    })
}

export default HomeController;

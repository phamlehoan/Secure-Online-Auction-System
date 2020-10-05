import express from "express";

import ProductController from "../controllers/product.controller";

let router = express.Router();

/* GET list products page. */
router.get('/', ProductController.getListProduct);

/* GET product details page. */
router.get('/details', ProductController.getListDetails);

/* GET cart page. */
router.get('/cart', ProductController.getCart);

/* GET winning product page. */
router.get('/winning-product', ProductController.winningProduct);

module.exports = router;

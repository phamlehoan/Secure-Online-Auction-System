import express from "express";

import ProductController from "../controllers/product.controller";
import Uploader from "../configs/multer.config";

let router = express.Router();

/* GET list products page. */
router.get('/', ProductController.getProducts);

/**
 * get form add product
 */
router.get('/add', ProductController.getAddProduct);
router.post('/add', Uploader.single("file"), ProductController.postProduct);

/* GET product details page. */
router.get('/:id', ProductController.getDetail);

router.get('/manage', ProductController.getManage);


module.exports = router;

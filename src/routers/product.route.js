import express from "express";

import ProductController from "../controllers/product.controller";
import AuthController from "../controllers/auth.controller";
import Uploader from "../configs/multer.config";


let router = express.Router();

/* GET list products page. */
router.get('/',
    AuthController.checkUser,
    ProductController.getProducts,
);

/**
 * get form add product
 */
router.get('/add',
    AuthController.checkUser,
    ProductController.getAddProduct
);

router.post('/add',
    AuthController.checkUser,
    Uploader.single("file"),
    ProductController.postProduct
);

router.get('/auction', 
    AuthController.checkUser, 
    ProductController.getManage
);

/* GET product details page. */
router.get('/:id', 
    AuthController.checkUser, 
    ProductController.getManage
);

/* GET product details page. */
router.get('/:id',
    AuthController.checkUser,
    ProductController.getDetail
);

module.exports = router;

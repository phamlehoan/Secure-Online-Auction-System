import express from "express";

import ProductController from "../controllers/product.controller";
import AuthController from "../controllers/auth.controller";
import Uploader from "../configs/multer.config";
import Authorization from "../validation/authorization.validation";

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
    Authorization.hasAddPermission,
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

router.get('/manage', 
    AuthController.checkUser,
    Authorization.hasAddPermission,
    ProductController.productManegements
)

router.get('/edit/:id',
    AuthController.checkUser,
    Authorization.hasAddPermission,
    ProductController.updateProducts
)

router.post('/edit/:id',
    AuthController.checkUser,
    Authorization.hasAddPermission,
    ProductController.postUpdateProducts
)

/* GET product details page. */
router.get('/:id',
    AuthController.checkUser,
    ProductController.getDetail
);

module.exports = router;

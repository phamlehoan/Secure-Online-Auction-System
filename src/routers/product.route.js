import express from "express";

import ProductController from "../controllers/product.controller";
import AuthController from "../controllers/auth.controller";
import Uploader from "../configs/multer.config";
import Authorization from "../validation/authorization.validation";
import LocalVariableForward from "../helpers/product.helper";

let router = express.Router();

/* GET list products page. */
router.get('/',
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    ProductController.getProducts,
);

/**
 * get form add product
 */
router.get('/add',
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
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
    LocalVariableForward.localVarsForward,
    ProductController.getManage
);

router.get('/manage', 
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    Authorization.hasAddPermission,
    ProductController.productManegements
)

router.get('/cart', 
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    ProductController.getCart
)

router.get('/edit/:id',
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    Authorization.hasAddPermission,
    ProductController.updateProducts
)

router.post('/edit/:id',
    AuthController.checkUser,
    Authorization.hasAddPermission,
    ProductController.postUpdateProducts
)

router.get('/del/:id', 
    AuthController.checkUser,
    Authorization.hasAddPermission,
    ProductController.deleteProduct
)

/* GET product details page. */
router.get('/:id',
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    ProductController.getDetail
);

module.exports = router;

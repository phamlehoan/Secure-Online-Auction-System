import express from "express";
import AuthValid from '../validation/auth.validation';
import AdminValid from '../validation/user.validation';
import AuthController from "../controllers/auth.controller";
import AdminController from "../controllers/admin.controller";
import Authorization from "../validation/authorization.validation";


let router = express.Router();

router.get('/',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.getDashBoard
);

router.get('/listAccount',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.getListAccount
);

router.get('/listProduct',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.getListProduct
);

router.get('/profile',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.getProfile
);

router.put('/user/ban/:userId',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.banUser
)
router.put('/user/approve/:userId',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.approveUser
)
router.get('/user/:userId',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.getUser
)
router.get('/product/:productId',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.getProduct
)
router.put('/product/ban/:productId',
    AuthController.checkUser,
    Authorization.isAdmin,
    AdminController.banProduct
)
module.exports = router;

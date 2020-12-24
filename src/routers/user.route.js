import express from "express";

import AuthValid from '../validation/auth.validation';
import UserValid from '../validation/user.validation';
import AuthController from "../controllers/auth.controller";
import UserController from "../controllers/user.controller";
import LocalVariableForward from "../helpers/product.helper";


let router = express.Router();

//Router view register
router.get("/register",
    AuthController.getRegister
);
//Router post from register

//Router.post("/register",AuthController.postRester)
router.post("/register",
    AuthValid.checkRegister,
    AuthController.postRegister
);
//Router verify Account by Email
router.get("/verify/:token",
    AuthController.activeAccount
);


//Router view Profile
router.get("/profile",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    UserController.getProfile
);

router.put("/update-profile",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    UserValid.checkUserUpdate,
    UserController.updateProfile
);

//Router change password
router.get("/change-password",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    UserController.getChangePass
);
router.put("/update-password",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    UserValid.checkPassword,
    UserController.putUpdatePass
);

router.get("/profile-seller/:sellerId/:productId",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    UserController.getInfoSeller
);

router.post("/feedback",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    UserController.postFeedback
);

//Router apply to seller
router.get("/apply-seller",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    LocalVariableForward.localVarsForward,
    UserController.getApplySeller
);

router.put("/update-seller",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    UserController.putApplySeller
);

router.get('/verify',
    UserController.verify
)

module.exports = router;

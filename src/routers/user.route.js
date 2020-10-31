import express from "express";
import AuthValid from '../validation/auth.validation';
import UserValid from '../validation/user.validation';
import AuthController from "../controllers/auth.controller";
import UserController from "../controllers/user.controller";


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
    UserController.getProfile
);

router.put("/profile/user/update",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    UserValid.checkUserUpdate,
    UserController.updateProfile
);

//Router change password
router.get("/change-password",
    AuthController.checkLoggedIn,
    AuthController.checkUser,
    UserController.getChangePass
);

module.exports = router;

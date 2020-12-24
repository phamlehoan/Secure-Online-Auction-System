import express from "express";
import passport from "passport";

import AuthController from "../controllers/auth.controller";
import HomeController  from "../controllers/home.controller";
import AuthValidation from "../validation/auth.validation";

let router = express.Router();

//Router view Login
router.get("/login",
    AuthController.checkLoggedOut,
    AuthController.getLogin
);

//Router post from login
router.post("/login",
    AuthValidation.isExistsSession,
    passport.authenticate("local",{
        successRedirect: '/products',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true
    })
);

//Router Logout system
router.get("/logout",
    AuthController.checkLoggedIn,
    AuthController.getLogout
);

router.get("/",
    AuthController.checkUser,
    HomeController.getHomepage
);

router.post('/login/verify',
    AuthController.verifyToken
)

module.exports = router;

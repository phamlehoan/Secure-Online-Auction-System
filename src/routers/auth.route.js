import express from "express";
import passport from "passport";

import AuthController from "../controllers/auth.controller";
import HomeController  from "../controllers/home.controller";

let router = express.Router();

//Router view Login
router.get("/login",
    AuthController.checkLoggedOut,
    AuthController.getLogin
);

//Router post from login
router.post("/login", passport.authenticate("local",{
    successRedirect: "/products",
    failureRedirect: "/login",
    successFlash: true,
    failureFlash: true
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

module.exports = router;

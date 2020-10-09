import express from 'express';
import AuthValid from '../validation/auth.validation';
import passport from 'passport';
import HomeController  from "../controllers/home.controller";
import AuthController from "../controllers/auth.controller";
import initPassportLocal from "./../controllers/passport.controller/local"

initPassportLocal();
let router = express.Router();

let webRouter = (app) => {
    app.use("/", router);
    //Router view register
    router.get("/register", AuthController.getRegister);
    //Router post from register
    //Router.post("/register",AuthController.postRester)
    router.post("/register",AuthValid.checkRegister,AuthController.postRegister);
    //Router view Login
    router.get("/login",AuthController.checkLoggedOut,AuthController.getLogin);
    //Router post from login
    router.post("/login",passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }))
    //Router verify Account by Email
    router.get("/verify/:token",AuthController.activeAccount);
    //Router Logout system
    router.get("/logout",AuthController.checkLoggedIn,AuthController.getLogout)
    //Router Homepage
    router.get("/",HomeController.getHomepage)
    //Router view Profile
    router.get("/profile",AuthController.checkLoggedIn,HomeController.getProfile)

    

}

module.exports = webRouter;
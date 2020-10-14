import express from 'express'

import productRoute from "./product.route";
import accountRoute from "./account.route";
import userRoute from "./user.route";

let router = express.Router();

let webRouter = (app) => {
  
    //index route
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
    router.get("/",AuthController.checkUser,HomeController.getHomepage)
    //Router view Profile
    router.get("/profile",AuthController.checkLoggedIn,HomeController.getProfile)
  
    //register
    app.use("/register", userRoute);

    //product route
    app.use("/products", productRoute);
  
    //account route
    app.use("/", accountRoute);
}

module.exports = webRouter;

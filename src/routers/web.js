import express from 'express'
import AuthValid from '../validation/auth.validation'

import HomeController  from "../controllers/home.controller";
import AuthController from "../controllers/auth.controller";

import productRoute from "./product";
import accountRoute from "./account";

let router = express.Router();

let webRouter = (app) => {
  
  //index route
    app.use("/", router);
  
    router.get("/register", AuthController.getRegister);
  
    //Router post from register
    router.post("/register", AuthValid.checkRegister, AuthController.postRegister);
  
    //product route
    app.use("/product", productRoute);
  
    //account route
    app.use("/", accountRoute);
}

module.exports = webRouter;

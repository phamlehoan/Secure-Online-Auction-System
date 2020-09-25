import express from 'express'
import AuthValid from '../validation/auth.validation'

import HomeController  from "../controllers/home.controller";
import AuthController from "../controllers/auth.controller";

let router = express.Router();

let webRouter = (app) => {
    app.use("/", router);
    //index route
    router.get("/register", AuthController.getRegister);
    //Router post from register
    // router.post("/register",AuthController.postRester)
    router.post("/register",AuthValid.checkRegister,AuthController.postRegister);
}

module.exports = webRouter;
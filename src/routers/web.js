import express from 'express'
import AuthValid from '../validation/auth.validation'

import HomeController  from "../controllers/home.controller";
import AuthController from "../controllers/auth.controller";

let router = express.Router();

let webRouter = (app) => {
    app.use("/", router);
    //index route
    router.get("/", HomeController.homepage);

    //Router post login
    router.post("/login", AuthValid.checkLogin, AuthController.login);
}

module.exports = webRouter;
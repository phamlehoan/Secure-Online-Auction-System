import express from 'express'

import HomeController  from "../controllers/home.controller";

import productRoute from "./product";
import accountRoute from "./account";

let router = express.Router();

let webRouter = (app) => {
    //product route
    app.use("/product", productRoute);
    //account route
    app.use("/", accountRoute);
}

module.exports = webRouter;
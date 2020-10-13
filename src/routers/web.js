import express from 'express'

import productRoute from "./product.route";
import accountRoute from "./account.route";
import userRoute from "./user.route";

let router = express.Router();

let webRouter = (app) => {
  
    //index route
    app.use("/", router);
  
    //register
    app.use("/register", userRoute);

    //product route
    app.use("/products", productRoute);
  
    //account route
    app.use("/", accountRoute);
}

module.exports = webRouter;

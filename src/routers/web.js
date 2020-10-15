import express from 'express'

import productRoute from "./product.route";
import userRoute from "./user.route";
import authRoute from "./auth.route";

let router = express.Router();

let webRouter = (app) => {
  
    //index route
    app.use("/home", router);

    //register
    app.use("/user", userRoute);

    //product route
    app.use("/products", productRoute);
  
    //Auth route
    app.use("/", authRoute);
}

module.exports = webRouter;

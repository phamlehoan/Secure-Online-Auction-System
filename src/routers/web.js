import express from 'express';

import userRoute from "../routers/user.route";
import authRoute from "../routers/auth.route";
import productRoute from "../routers/product.route";
import initPassportLocal from "./../controllers/passport.controller/local";

initPassportLocal();
let router = express.Router();

let webRouter = (app) => {
    app.use("/user", userRoute);
    app.use("/", authRoute);
    app.use("/products", productRoute);
}

module.exports = webRouter;

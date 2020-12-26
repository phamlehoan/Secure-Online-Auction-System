import express from 'express';

import producApitRoute from "./product.api.route";
import userApiRoute from "./user.api.route";
import authApiRoute from "./auth.api.route";
import cartApiRoute from "./cart.api.route";

let router = express.Router();
const { API_VERSION } = process.env || "v1";

let apiPrefix = `/api/${API_VERSION}`;

let apiRouter = (app) => {
    app.use(apiPrefix + "/products", producApitRoute);
    app.use(apiPrefix + "/users", userApiRoute);
    app.use(apiPrefix + "/", authApiRoute);
    app.use(apiPrefix + "/cart", cartApiRoute);
}

module.exports = apiRouter;
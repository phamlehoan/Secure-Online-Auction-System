import express from 'express';

import producApitRoute from "./product.api.route";

let router = express.Router();
const { API_VERSION } = process.env || "v1";

let apiPrefix = `/api/${API_VERSION}`;

let apiRouter = (app) => {
    app.use(apiPrefix + "/products", producApitRoute);
}

module.exports = apiRouter;
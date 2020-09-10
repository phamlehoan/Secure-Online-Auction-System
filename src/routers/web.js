import express from 'express'

import HomeController  from "../controllers/home.controller";

let router = express.Router();

let webRouter = (app) => {
    app.use("/", router);
    //index route
    router.get("/", HomeController.homepage);
}

module.exports = webRouter;
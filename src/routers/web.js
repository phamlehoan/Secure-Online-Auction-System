import express from 'express'
import {homeC} from "./../controllers/index"

let router = express.Router();

let webRouter = (app)=>{
    app.use("/",router);
    //Router dùng để truy cập Home
    router.get("/",homeC.homepage);
}

module.exports = webRouter;
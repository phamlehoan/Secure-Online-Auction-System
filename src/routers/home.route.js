import express from 'express';

import HomeController  from "../controllers/home.controller";
import AuthController from "../controllers/auth.controller";

let router = express.Router();

//Router Homepage
router.get("/",
    AuthController.checkUser,
    HomeController.getHomepage
);

module.exports = router;

import express from "express";

import AuthValid from '../validation/auth.validation';
import AuthController from "../controllers/auth.controller";
import HomeController from "../controllers/home.controller";

let router = express.Router();

router.get("/register", AuthController.getRegister);

//Router post from register
router.post("/register", AuthValid.checkRegister, AuthController.postRegister);

//Router view Profile
router.get("/profile", AuthController.checkLoggedIn, HomeController.getProfile);

//Router verify Account by Email
router.get("/verify/:token", AuthController.activeAccount);

module.exports = router;

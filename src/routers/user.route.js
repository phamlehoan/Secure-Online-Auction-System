import express from "express";

import UserController from "../controllers/user.controller";
import AuthValid from '../validation/auth.validation';

let router = express.Router();

//get register form
router.get("/", UserController.getRegister);
  
//Router post from register
router.post("/", AuthValid.checkRegister, UserController.postRegister);

module.exports = router;

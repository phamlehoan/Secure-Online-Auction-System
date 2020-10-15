import express from "express";

import AuthController from "../controllers/home.controller";

let router = express.Router();

//Router Homepage
router.get("/", AuthController.checkUser, HomeController.getHomepage);

module.exports = router;
import express from "express";

import productApi from "../../api/product.api";
import AuthApi from "../../api/auth.api";

let router = express.Router();

router.get("/",
    AuthApi.verifyUser,
    productApi.getProducts
)

module.exports = router;

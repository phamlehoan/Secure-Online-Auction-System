import express from "express";

import productApi from "../../api/product.api";
import AuthApi from "../../api/auth.api";

let router = express.Router();

router.get("/",
    AuthApi.verifyUser,
    productApi.getProducts
)

router.post("/add",
    productApi.postProduct
)

router.get('/:id', 
    productApi.getProduct
)

router.post('/timeout', 
    productApi.getProductAndWinner
)

module.exports = router;

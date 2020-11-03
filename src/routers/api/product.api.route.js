import express from "express";

import productApi from "../../api/product.api";

let router = express.Router();

router.get("/",
    productApi.getProducts
)

module.exports = router;

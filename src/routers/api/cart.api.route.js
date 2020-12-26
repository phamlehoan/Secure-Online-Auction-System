import express from "express";

import CartApi from "../../api/cart.api";

let router = express.Router();

router.get("/count",
    CartApi.count
);

module.exports = router;

import express from "express";

import AuthApi from "../../api/auth.api";

let router = express.Router();

router.post("/login",
    AuthApi.getUser
);

module.exports = router;

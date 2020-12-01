import jwt from "jsonwebtoken";

const JwtValidation = {};

JwtValidation.check = (id, role) => {
    jwt({
        secret: process.env.JWT_KEY,
        _id: id,
        role: role
    })
}
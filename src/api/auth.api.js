import jwt from "jsonwebtoken";

import UserService from "../services/user.service";
import APIMessage from "../langs/us/notification.us";

const AuthApi = {};

/**
 * User authentication
 * 
 * @returns {String} jwt token
 */
AuthApi.getUser = async (req, res) => {
    try {
        let {email, password} = req.body;
        console.log(email, password);
        let user = await UserService.findByCredentials(email, password);
        if(user){
            const token = await UserService.generateAuthToken(user);
            return res.status(200).json({
                token
            });
        }
    } catch (error) {
        return res.status(500).json({
            "errors": error
        });
    }
}

/**
 * 
 */
AuthApi.verifyUser = (req, res, next) => {
    let token  = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
          message: APIMessage.TOKEN_NOT_FOUND
        });
    }

    let bearer = token.split(" ")[1];

    jwt.verify(bearer, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
          return res.status(401).send({
            message: APIMessage.UNAUTHORIZED
          });
        }
        req.userApi = decoded;
        next();
    });

}

export default AuthApi;

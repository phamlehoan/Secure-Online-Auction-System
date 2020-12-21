import passport from "passport";
import passportLocal from "passport-local"

import userModel from "./../../models/user.model";
import {loginErr, loginSucc} from "./../..//langs/us/notification.us";
import RedisService from "../../redis/redis";


let LocalStretagy = passportLocal.Strategy;

/**
 * Hàm xử lý các giá trị trong đăng nhập
 */
let initPassportLocal = () => {
    passport.use(new LocalStretagy({
        usernameField : "email",
        passwordField : "password",
        passReqToCallback: true
    }, async(req, email, password, done) => {
        let user = await userModel.findUserbyEmail(email);
         try {
            if(!user)
                return done(null, false, req.flash("errors", loginErr.loginFail));
            
            if(!user.local.isActived)
                return done(null, false, req.flash("errors", loginErr.loginActiveAcc));
            
            let comparePass = await user.comparePass(password);
            if(!comparePass)
                return done(null, false, req.flash("errors", loginErr.loginFail));

            let cache = {
                [user._id]: user.username
            };
            await RedisService.setHashCache('users', cache);
            return done(null, user, loginSucc.loginSuccess);

         } catch (error) {
             console.log(error);
             return done(null, false, req.flash("errors", loginErr.serverLogin));
         }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((userId, done) => {
        userModel.findUserById(userId)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err, null);
        })
    })
} 

module.exports = initPassportLocal;

import { check } from 'express-validator';
import {v4 as uuidv4} from 'uuid';

import {regisErr} from './../langs/us/notification.us';
import UserService from "../services/user.service";
import MailService from "../services/mail.service";
import RedisService from "../redis/redis";

const AuthValid = {}

AuthValid.checkRegister = [
    check("email", regisErr.email)
        .isEmail()
        .trim(),
    check("pass", regisErr.password)
        .isLength({min:8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/),
    check("re_pass",regisErr.confirmPassword)
        .custom((value,{req})=>{
            return value === req.body.pass;
    })
];

/**
 * kiểm tra nếu tồn tại user trong cache (đã đăng nhập) => thông báo
 * nếu không tồn tại => cho login
 */
AuthValid.isExistsSession = async (req, res, next) => {
    try {
        let { email } = req.body;
        let user = await UserService.findUserByEmail(email);
        RedisService.getActiveUsers()
        .then(async users => {
            console.log(users);
            if (users) {
                if (users[user._id+'']) {
                // if (user.local.loginTimes >= 3) {
                //     let opt = uuidv4().split('-')[0];
                //     await MailService.warning(user.local.email, opt);
                //     await UserService.updateToken(user._id, opt);
                //     req.flash("errors", 'Check your security email');
                //     res.cookie('id', user._id, {signed: true});
                //     return res.redirect('/user/verify')
                // }
                // await UserService.updateLoginTimes(user.local.loginTimes, user._id);
                let message = 'Connection error ! This user is logged in another device';
                req.flash("errors", message);
                return res.redirect('/login');
                }
            }

            next();
        })
    } catch (error) {
        console.log(error);
        return res.redirect('/login');
    }
}

export default AuthValid;

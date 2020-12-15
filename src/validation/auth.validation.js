import { check } from 'express-validator';
import {v4 as uuidv4} from 'uuid';

import {regisErr} from './../langs/us/notification.us';
import UserService from "../services/user.service";
import MailService from "../services/mail.service";

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

AuthValid.isExistsSession = async (req, res, next) => {
    try {
        let { email } = req.body;
        let user = await UserService.findUserByEmail(email);
        if (user.local.token) {
            if (user.local.loginTimes >= 2) {
                let opt = uuidv4().split('-')[0];
                let message = 'Check your security email';
                await MailService.warning(user.local.email, opt);
                await UserService.updateToken(user._id, opt);
                req.flash("errors", message);
                res.cookie('id', user._id, {signed: true});
                return res.render('auth/verify/verify');
            }
            await UserService.updateLoginTimes(user.local.loginTimes, user._id);
            let message = 'Connection error ! This user is logged in another device';
            req.flash("errors", message);
            res.clearCookie();
            return res.redirect("/login");
        }
        next();
    } catch (error) {
        console.log(error);
        return res.redirect('/login');
    }
}

export default AuthValid;

import {check} from 'express-validator';
import {loginErr} from './../langs/us/notification.us';

const AuthValid = {}
AuthValid.checkLogin = [
    check("email", loginErr.email)
        .isEmail()
        .trim(),
    check("pass", loginErr.password)
        .isLength({min:8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/)
];

export default AuthValid;
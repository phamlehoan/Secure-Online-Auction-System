import {check} from 'express-validator';
import {regisErr} from './../langs/us/notification.us';

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

export default AuthValid;


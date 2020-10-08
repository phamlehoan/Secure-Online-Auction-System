import authService from './../services/auth.service';
import { validationResult } from 'express-validator';

const AuthController = {};


AuthController.getLogin = (req, res)=>{
    return res.render("auth/login/login",{
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

AuthController.login = async (req, res) => {
    let arrErr = [];
    let arrSucc = [];
    let valid = validationResult(req);
    if(!valid.isEmpty())
    {   
        //Đẩy tất cả các lỗi vào mảng Error
        valid.array().forEach(item =>{
            arrErr.push(item.msg);
        })
        //Lưu mảng lỗi vào flash để đẩy lên phía client
        req.flash("errors", arrErr);
        return res.redirect("register");
    }
    try {
        let loginSuccess = await authService.login(req.body.email, req.body.pass, req.protocol,req.get('host'));
        arrSucc.push(loginSuccess);
        req.flash('success',arrSucc);
        console.log("Log in successfully");
        res.redirect("login")
    } catch (error) {
        arrErr.push(error);
        req.flash('errors',arrErr);
        console.log("Log in failed");
        res.redirect("login")
    }
}

export default AuthController;
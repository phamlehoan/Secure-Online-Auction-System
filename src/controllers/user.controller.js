import authService from './../services/auth.service';
import { validationResult } from 'express-validator';

const UserController = {};


UserController.getRegister = (req, res)=>{
    return res.render("auth/register/register",{
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

UserController.postRegister = async(req, res)=>{
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
       let registerSuccess = await authService.postRegister(
            req.body.name,
            req.body.email,
            req.body.pass,
            req.protocol,
            req.get('host')
        );

        arrSucc.push(registerSuccess);
        req.flash('success', arrSucc);

        return res.redirect("register");
    } catch (error) {
        arrErr.push(error);
        req.flash('errors',arrErr);
        
        return res.redirect("register");
    }

}

export default UserController;

import authService from './../services/auth.service';
import {validationResult} from 'express-validator';
import {loginSucc} from './../langs/us/notification.us'

const AuthController = {};


AuthController.getRegister = (req, res)=>{
    return res.render("auth/register/register",{
        errors: req.flash("errors"),
        success: req.flash("success")
    });
}

AuthController.postRegister = async(req,res)=>{
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
       let registerSuccess = await authService.postRegister(req.body.email, req.body.pass, req.protocol,req.get('host'));
        arrSucc.push(registerSuccess);
        req.flash('success',arrSucc);
        res.redirect("/user/register")
    } catch (error) {
        arrErr.push(error);
        req.flash('errors',arrErr);
        res.redirect("/user/register")
    }

}
AuthController.getLogin = (req,res)=>{
    return res.render("auth/login/login",{
        //Gửi 2 biến lên để thông báo trong alert
        errors: req.flash("errors"),
        success:req.flash("success")
    });
}

AuthController.activeAccount = async(req,res)=>{
    let arrErr= []; //Create arrray to contain err
    let arrSucc=[]; //Create array để chứa thông báo thành công
    try {
        //Lấy thông báo từ database, nếu không lỗi sẽ có thông báo success
        let activeSucc = await authService.activeAccount(req.params.token)
        arrSucc.push(activeSucc);
        //Lưu mảng thành công vào flash để đẩy lên phía client
        req.flash('success',arrSucc);
        res.redirect('/login');
    } catch (error) {
        arrErr.push(error);
        req.flash("errors",arrErr);
        res.redirect('/login');
    }
}

//Controller của router đăng xuất
AuthController.getLogout = (req,res)=>{
    req.logout();
    req.flash("success",loginSucc.logoutSuccess)
    res.redirect("/login")
}
//Kiểm tra xem đã Login hay chưa
AuthController.checkLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated())
        return res.redirect("/login");
    next();
}
//Kiểm tra xem đã logout hay chưa
AuthController.checkLoggedOut = (req,res,next)=>{
    if(req.isAuthenticated())
        return res.redirect("/products");
    next();
}
AuthController.checkUser = (req,res,next)=>{
    if(req.user)
    {
        req.flash("data",true);
    }
    else
    {
        req.flash("data",false);
    }
    next();
}

export default AuthController;

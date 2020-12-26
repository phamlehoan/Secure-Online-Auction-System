import authService from './../services/auth.service';
import {validationResult} from 'express-validator';
import {loginSucc} from './../langs/us/notification.us'
import UserService from "../services/user.service";
import RedisService from "../redis/redis";

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
       let registerSuccess = await authService.postRegister(
           req.body.email, 
           req.body.pass, 
           req.protocol,
           req.get('host')
        );
        arrSucc.push(registerSuccess);
        req.flash('success',arrSucc);

        return res.redirect("/user/register");
    } catch (error) {
        arrErr.push(error);
        req.flash('errors',arrErr);
        return res.redirect("/user/register");
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
    let arrErr= [];
    let arrSucc=[];
    try {
        let activeSucc = await authService.activeAccount(req.params.token)
        arrSucc.push(activeSucc);
        req.flash('success', arrSucc);
        res.redirect('/login');
    } catch (error) {
        arrErr.push(error);
        req.flash("errors",arrErr);
        res.redirect('/login');
    }
}

//Controller của router đăng xuất
AuthController.getLogout = async (req, res) => {
    try {
        let { _id } = req.user;
        await UserService.updateToken(_id, null);
        await UserService.updateLoginTimes(-1, _id);
        await RedisService.delHashCache('users', _id+'')
        .catch(err => console.log(err))
        req.logOut();
        req.session.destroy(req.session.sid);
        res.clearCookie();
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.redirect('/login?error=error');
    }
}

//Kiểm tra xem đã Login hay chưa
AuthController.checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated())
        return res.redirect("/login");
    next();
}

//Kiểm tra xem đã logout hay chưa
AuthController.checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated())
        return res.redirect("/products");
    next();
}

AuthController.checkUser = (req, res, next) => {
    if(req.user){
        req.flash("data", true);
    }else{
        req.flash("data", false);
    }
    next();
}

AuthController.verifyToken = async (req, res) => {
    let { id } = req.signedCookies;
    let { otp } = req.body;
    let isTrue = await authService.verifyToken(id, otp);
    if (isTrue) {
        res.clearCookie('id');
        await UserService.updateToken(id, null);
        await UserService.updateLoginTimes(-1, id);
        await RedisService.delHashCache('users', _id+'')
        req.flash('success', 'please login again');
    }else{
        req.flash('errors', 'Wrong OTP');
    }
    return res.redirect('/login');
}

export default AuthController;

/**
 * user controller
 */
import {validationResult} from 'express-validator/check';

import user from './../services/user.service';

import PRODUCT_CONSTANTS from "../constants/product.constant";

let { categories, priceMethod, productStatus } = PRODUCT_CONSTANTS;
const UserController = {};


UserController.getProfile = (req, res) => {
    return res.render("main/profile/profile",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: "profile"
    })
}

UserController.updateProfile = async (req, res) => {
    //Kiểm tra validation của form đăng ký
    let valid = validationResult(req);
    let arrErr= []; //Create arrray to contain err
    //Kiểm tra xem có tồn tại lỗi sau khi kiểm tra validation hay không
    if(!valid.isEmpty())
    {
        //Đẩy tất cả các lỗi vào mảng Error
        valid.array().forEach(item =>{
            arrErr.push(item.msg);
        })
        //Lưu mảng lỗi vào flash để đẩy lên phía client
        return res.status(500).send(arrErr);
    }

    try {
        //Lấy thông tin từ client gửi lên từ req
        let userUpdateItem = req.body ;
        //Tìm kiếm người dùng trong database
        let userUpdate = await user.updateUser(req.user._id,userUpdateItem);
        //Nếu thành công thì gửi message lên lại client
        let result = {
            message:"Update profile success !",
            user: userUpdateItem
        }
        //trả ngược lại phía client
        return res.status(200).send(result)

    } catch (error) {
        return res.status(500).send(error);
    }
}

UserController.getChangePass = (req, res) => {
    return res.render("main/changePassword/changePassword",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: 'SOAS. - Change Password'
    })
}

UserController.putUpdatePass = async(req, res) => {
    //Kiểm tra validation của form đăng ký
    let valid = validationResult(req);
    let arrErr= []; //Create arrray to contain err
    //Kiểm tra xem có tồn tại lỗi sau khi kiểm tra validation hay không
    if(!valid.isEmpty())
    {
        //Đẩy tất cả các lỗi vào mảng Error
        valid.array().forEach(item =>{
            arrErr.push(item.msg);
        })
        //Lưu mảng lỗi vào flash để đẩy lên phía client
        return res.status(500).send(arrErr);
    }
    //Lấy thông tin của client gửi lên
    let updateUserItem = req.body;
    try {
        //Gọi service để kiểm tra các điều kiện
        await user.updatePassword(req.user._id, updateUserItem);
        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Update password success !",
        }
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error);
    }
}

export default UserController;

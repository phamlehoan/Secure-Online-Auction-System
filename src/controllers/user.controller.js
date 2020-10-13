/**
 * controller home page
 */
import {validationResult} from 'express-validator/check';
import user from './../services/user.service';
const UserController = {};

UserController.getProfile = (req,res)=>{
    return res.render("main/profile/profile",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success")
    })
}
UserController.updateProfile = async (req,res)=>{
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
        // console.log(req.body);
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
UserController.getChangePass = (req,res)=>{
    return res.render("main/changePassword/changePassword",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success")
    })
}
export default UserController;

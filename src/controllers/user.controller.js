/**
 * user controller
 */
import {validationResult} from 'express-validator/check';
import ProductService from "./../services/product.service"
import user from './../services/user.service';
import UserModel from "./../models/user.model";
import FeedbackModel from "./../models/feedback.model"
import FeedbackService from "./../services/feedback.service"
import PRODUCT_CONSTANTS from "../constants/product.constant";

const UserController = {};

UserController.getProfile = async (req, res) => {
    return res.render("main/profile/profile",{
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: "profile"
    })
}

//infomation seller
UserController.getInfoSeller = async (req, res) => {
    let seller = await UserModel.findUserById(req.params.sellerId);
    let dataFeedback = await FeedbackService.listFeedbackProduct(req.params.sellerId);
    let countStar = await FeedbackService.statistical(req.params.sellerId);
    return res.render("main/profile/profile_seller", {
        idProduct: req.params.productId,
        idSeller: req.params.sellerId,
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: "profile",
        seller: seller,
        dataFeedback: dataFeedback,
        star:countStar
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

UserController.getChangePass = async (req, res) => {
    return res.render("main/changePassword/changePassword",{
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

/**
 * POST feedback API
 * @todo move API package
 */
UserController.postFeedback = async (req, res) => {
    try {
        let content = req.body.content;
        let star = req.body.star;
        let itemFeedback = {
            content: content,
            sellerId: req.body.sellerId,
            userId: req.user._id,
            ratingStar: parseFloat(star),
            productId: req.body.productId,
        }
    
        //Gọi service để kiểm tra các điều kiện
        await FeedbackModel.createItem(itemFeedback);
        let user = await UserModel.findUserById(req.user._id);
        let product = await ProductService.findProductById(req.body.productId);
        //Thành công thì gửi về messenger thông báo
        let result = {
            data: itemFeedback,
            username: user.username,
            productname: product.name,
            avatar: user.avatarUrl,
            message:"Feedback success !",
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

// Controller apply to seller
UserController.getApplySeller = (req,res)=>{
    return res.render("main/users/SaleRegistration",{
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: 'SOAS. - Apply to Seller'
    })
}
UserController.putApplySeller = async(req,res)=>{
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
    let applySellerItem = req.body;
    try {
        //Gọi service để kiểm tra các điều kiện
        console.log(applySellerItem);
        await user.applySeller(req.user._id,applySellerItem);

        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Applyed to seller successfully, please wait for administrator to accept you application",
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

UserController.verify = (req, res) => {
    return res.render('auth/verify/verify');
}

export default UserController;

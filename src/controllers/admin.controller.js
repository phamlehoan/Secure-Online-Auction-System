import {validationResult} from 'express-validator/check';
import ProductService from "./../services/product.service"
import admin from './../services/user.service';
import AuctionLogModel from "../models/auctionlog.model";
import UserModel from "./../models/user.model";
import FeedbackModel from "./../models/feedback.model"
import FeedbackService from "./../services/feedback.service"
import PRODUCT_CONSTANTS from "../constants/product.constant";
import AuctionLogService from "../services/aution.service";
import UserService from './../services/user.service';


let { categories, priceMethod, productStatus } = PRODUCT_CONSTANTS;

const AdminController = {};


AdminController.getDashBoard = async (req, res) => {
    return res.render("main/admin/dashboard",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: "Admin | Dash Board"
    })
}

AdminController.getListAccount = async (req, res) => {
    let { role } = req.signedCookies;
    let sellerId = req.user._id;
    let users = await UserService.findAll();
    return res.render("main/admin/listAccount", {
        users,
        categories,
        role,
        data: req.flash("data"),
        numberBiddingProd: await AuctionLogService.countNumberOfAuctions(sellerId),
        user: req.user,
        title: "Admin | Account List"
    })
}

AdminController.getListProduct = async (req, res) => {
    return res.render("main/admin/listProduct",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: "Admin | Product List"
    })
}

AdminController.getProfile = async (req, res) => {
    return res.render("main/admin/profile",{
        data: req.flash("data"),
        user: req.user,
        errors: req.flash("errors"),
        success:req.flash("success"),
        title: "Admin | Profile"
    })
}

AdminController.banUser = async (req, res) => {
    let banUserItem = req.params;
    let user = await UserService.findUserById(banUserItem.userId);
    user[0].role = 'banned';
    try {
        //Gọi service để kiểm tra các điều kiện
        await UserService.banUser(banUserItem.userId,user[0]);

        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Banned",
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
AdminController.approveUser = async (req, res) => {
    let banUserItem = req.params;
    let user = await UserService.findUserById(banUserItem.userId);
    user[0].role = 'seller';
    try {
        //Gọi service để kiểm tra các điều kiện
        await UserService.banUser(banUserItem.userId,user[0]);

        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Approved",
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
AdminController.cancelSeller = async (req, res) => {
    let banUserItem = req.params;
    let user = await UserService.findUserById(banUserItem.userId);
    user[0].role = 'buyer';
    try {
        //Gọi service để kiểm tra các điều kiện
        await UserService.banUser(banUserItem.userId,user[0]);

        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Approved",
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
export default AdminController;

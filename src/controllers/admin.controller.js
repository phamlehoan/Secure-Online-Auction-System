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
    let products = await ProductService.findAll();
    return res.render("main/admin/listProduct",{
        products,
        data: req.flash("data"),
        product: req.product,
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
    if(user[0].role == 'seller'){
        user[0].role = 'buyer';
    }else{
        user[0].role = 'seller'
    }
    try {
        //Gọi service để kiểm tra các điều kiện
        await UserService.banUser(banUserItem.userId,user[0]);

        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Approved",
            role:user[0].role
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
AdminController.getUser = async (req, res) => {
    let banUserItem = req.params;
    let user = await UserService.findUserById(banUserItem.userId);
    try {
        //Gọi service để kiểm tra các điều kiện
        await UserService.banUser(banUserItem.userId,user[0]);

        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Approved",
            user:user[0],
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
AdminController.getProduct = async (req, res) => {
    let productItem = req.params;
    let product = await ProductService.findProductById(productItem.productId);
    try {
        //Thành công thì gửi về messenger thông báo
        let result = {
            message:"Approved",
            product:product
        }
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
AdminController.banProduct = async (req, res) => {
    let productItem = req.params;
    let product = await ProductService.findProductById(productItem.productId);
    product.status = '3';
    try {
        //Gọi service để kiểm tra các điều kiện
        await ProductService.banProduct(productItem.productId,product);

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
export default AdminController;

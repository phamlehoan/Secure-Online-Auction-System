import authService from './../services/auth.service';
import { validationResult } from 'express-validator';

import userModel from './../models/user.model';
import bcrypt from 'bcrypt';
import { notiRes } from './../langs/us/notification.us'
const jwt = require("jsonwebtoken");

const AuthController = {};

AuthController.login = async (req, res) => {
    try {
        let login = await authService.login(req.body.email, req.body.pass, req.protocol,req.get('host'));
    } catch (error) {
        console.log('Login Failed')
    }
}

export default AuthController;
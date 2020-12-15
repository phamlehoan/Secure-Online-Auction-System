
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

import {notiRes,transMail} from './../langs/us/notification.us';
import sendEmail from './../configs/mail.config';
import userModel from './../models/user.model';
import { token } from 'morgan';

const AuthService = {};
let saltRound = 7;

AuthService.postRegister = (email, pass, protocol, host)=>{
    return new Promise(async (resolve,reject)=>{
        let checkEmail = await userModel.findUserbyEmail(email);

        if(checkEmail){
            if(checkEmail.deletedAt != null)
                return reject(notiRes.blockUser);
            if(!checkEmail.local.isActived)
                return reject(notiRes.activeUser);

            return reject(notiRes.emailUser);
        }
        let salt = bcrypt.genSaltSync(saltRound);
        let userItem = {
            //cắt email chỉ lấy phần tên của email
            username : email.split('@')[0],
            local: {
                email: email,
                password: bcrypt.hashSync(pass,salt),
                token: uuidv4()
            }
        };

        //Lưu tài khoản vào db
        let createUser = await userModel.createItem(userItem);
        //Tạo link trong email để xác nhận tài khoản
        let linkVerify=`${protocol}://${host}/user/verify/${createUser.local.token}`
        //Gửi mail xác thực tài khoản cho người dùng (EmailUser,Subject,Content)
        sendEmail(email, transMail.subject, transMail.content(linkVerify))
        .then(success =>{
            //Trả về thông báo đăng ký thành công cho người dùng
            resolve(notiRes.registerSuccess(createUser.local.email))
        })
        .catch(err=>{
            console.log(err);
            return reject(notiRes.sendFail);
        })
    })
}

//Truyền vào token để lấy dữ liệu từ trong db ra và sửa lại active = true và xóa đi token
AuthService.activeAccount = (token) => {
    return new Promise(async (resolve, reject) => {
        let isToken = await userModel.findToken(token);
        //Kiểm tra token có tồn tại hay không, nếu không thì thông báo là không tồn tại token
        if(!isToken)
            //thông báo error
            return reject(transMail.isToken);
        //Fix db: active = true và delete token
        await userModel.activeAccount(token);
        resolve(transMail.activeSuccess);
    }) 
}

/**
 * Verify valid token
 * 
 */
AuthService.verifyToken = async (userId, otp) => {
    let user = await userModel.findById({_id: userId});
    if (user.local.token === otp) {
        return true;
    }
    return false;
}

export default AuthService;

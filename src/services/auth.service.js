import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import userModel from './../models/user.model';
import { notiRes } from './../langs/us/notification.us';

const AuthService = {};
let saltRound = 7;

/**
 * 
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {String} pass 
 * @param {String} protocol 
 * @param {String} host 
 */
AuthService.postRegister = (name, email, pass, protocol, host)=>{
    return new Promise(async (resolve, reject)=>{
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
            username : name,
            local: {
                email: email,
                password: bcrypt.hashSync(pass, salt),
                token: uuidv4()
            }
        };
        //Lưu tài khoản vào db
        let createUser = await userModel.createItem(userItem);
        resolve(notiRes.successUser);
        //Tạo link trong email để xác nhận tài khoản
        // let linkVerify=`${protocol}://${host}/verify/${createUser.local.veryfyToken}`
        
        // //Gửi mail xác thực tài khoản cho người dùng (EmailUser,Subject,Content)
        // sendEmail(email, transMail.subject, transMail.content(linkVerify))
        // .then(success =>{
        //     //Trả về thông báo đăng ký thành công cho người dùng
        //     resolve(transSucc.registerSuccess(createUser.local.email))
        // })
        // .catch(err=>{
        //     console.log(err);
        //     return reject(transMail.sendFail);
        // })
    })
}

export default AuthService;

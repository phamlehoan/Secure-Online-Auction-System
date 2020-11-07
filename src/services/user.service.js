import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import userModel from "./../models/user.model";
import updateUserMess from "./../langs/us/notification.us";
import { UserNotVerifyException } from "../exceptions/user.exception";
import userErrorMessage from "../langs/us/notification.us";

const UserService = {}

//Tạo muối
const saltRounds = 7;

UserService.updateUser = (id, file) => {
  return userModel.updateUserInfo(id, file);
}

/**
 * Search user
 * 
 * @param {Object} queries 
 */
UserService.search = async (queries) => {
  return await userModel.find(queries);
}

/**
 * 
 * @param {ObjectId} id 
 * @param {*} item 
 */
UserService.updatePassword = (id, item) => {
  return new Promise(async(resolve, reject) => {
      let currentUser = await userModel.findUserById(id);
      if(!currentUser)
          return reject(updateUserMess.pass.userInvalue);
      let checkCurrentPassword = await currentUser.comparePass(item.currentPassword);

      if(!checkCurrentPassword)
          return reject(updateUserMess.pass.wrongPassword);

      let salt = bcrypt.genSaltSync(saltRounds)
      await userModel.updatePassword(
        id, 
        bcrypt.hashSync(item.newPassword, salt)
      );

      resolve(true);
  });
}

/**
 * Generate jsonwebtoken
 * 
 * @returns {String} jwtToken
 */
UserService.generateAuthToken = async () => {
  let user = new userModel();
  const jwtToken = jwt.sign({
    _id: user._id
  },
    process.env.JWT_KEY
  );
  if(user.local.token === null)
    user.local.token = jwtToken;
  else
    throw new UserNotVerifyException(userErrorMessage.NOT_VERIFY);
  await user.findOneAndUpdate(user._id, {
    "local.token": jwtToken
  });

  return jwtToken;
}

export default UserService;

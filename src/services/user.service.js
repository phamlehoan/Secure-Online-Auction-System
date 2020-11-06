import bcrypt from 'bcrypt';

import userModel from "./../models/user.model";
import updateUserMess from "./../langs/us/notification.us";

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

export default UserService;

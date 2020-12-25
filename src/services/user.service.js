import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import updateUserMess from "./../langs/us/notification.us";
import {UserNotFoundException, UserNotVerifyException} from "../exceptions/user.exception";
import userErrorMessage from "../langs/us/notification.us";
import UserModel from "./../models/user.model";

const UserService = {}

//Tạo muối
const saltRounds = 7;

UserService.updateUser = (id, file) => {
  return UserModel.updateUserInfo(id, file);
}

/**
 * Search user
 *
 * @param {Object} queries
 */
UserService.search = async (queries) => {
  return await UserModel.find(queries);
}

/**
 *
 * @param {ObjectId} id
 * @param {*} item
 */
UserService.updatePassword = (id, item) => {
  return new Promise(async(resolve, reject) => {
      let currentUser = await UserModel.findUserById(id);
      if(!currentUser)
          return reject(updateUserMess.pass.userInvalue);
      let checkCurrentPassword = await currentUser.comparePass(item.currentPassword);

      if(!checkCurrentPassword)
          return reject(updateUserMess.pass.wrongPassword);

      let salt = bcrypt.genSaltSync(saltRounds)
      await UserModel.updatePassword(
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
UserService.generateAuthToken = async (user) => {
  const jwtToken = jwt.sign({
    _id: user._id,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    role: user.role
  },
    process.env.JWT_KEY
  );

  if(!user.local.isActived)
    throw new UserNotVerifyException(userErrorMessage.NOT_VERIFY);

  await UserModel.findOneAndUpdate({_id: user._id}, {
    "local.token": jwtToken
  })

  return jwtToken;
}
UserService.applySeller =(id,file)=>{
  return UserModel.findByIdAndUpdate(id, file);
}

/**
 *
 * @param {String} email
 * @param {String} password
 */
UserService.findByCredentials = async (email, password) => {
  const user = await UserModel.findUserbyEmail(email);
  if(!user) {
      throw new UserNotFoundException(userErrorMessage.INVALID_USER);
  }
  const isPasswordMatch = await user.comparePass(password);

  if(!isPasswordMatch){
    throw new UserNotFoundException(userErrorMessage.INVALID_USER);
  }

  return user;
}

UserService.findUserById = async (userId) => {
  return await UserModel.find({_id: userId});
}

UserService.findAll = async () => {
  return await UserModel.find({ role: {$ne: 'admin'}});
}

UserService.banUser =(id,file)=>{
  return UserModel.findByIdAndUpdate(id, file);
}
/**
 * Updating token when user logout
 * @param {String} UserId
 */
UserService.updateToken = async (id, token) => {
  return await UserModel.findOneAndUpdate(
    {_id: id}, 
    {'local.token': token}
  );
}

/**
 * 
 * @param {String} email
 */
UserService.findUserByEmail = async (email) => {
  let user =  await UserModel.findOne({'local.email': email});
  if (!user) {
    throw new UserNotFoundException('User not found with email'+ email);
  }
  return user;
}

/**
 * 
 * @param {Number} times 
 * @param {String} userId 
 */
UserService.updateLoginTimes = async (times, userId) => {
  let counter = parseInt(times) + 1;
  return await UserModel.findOneAndUpdate(
    {_id: userId}, 
    {'local.loginTimes': counter}
  );
}

export default UserService;

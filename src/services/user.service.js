import userModel from "./../models/user.model"
const UserService = {}

UserService.updateUser = (id,file)=>{
  return userModel.updateUserInfo(id,file);
}

export default UserService;

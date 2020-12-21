/**
 * Define user schema
 */
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  gender: {
    type: String,
    default: "male",
  },
  phone: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    default: process.env.APP_DEFAULT_AVATAR,
  },
  role: {
    type: String,
    default: "buyer",
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  personalInfo: {
    identifyCard: {
      ID: String,
      dateOfIssue: {
        type: String,
        default: "1900-01-01"
      },
      address: String,
      fontCardUrl: String,
      backCardUrl: String
    },
    firstname:{
      type: String,
    },
    lastname:{
      type: String,
    },
    dob:{
      type: String,
      default: "1900-01-01"
    },
    address:{
      city: String,
      district: String,
      detailAddress: String
    },
  },
  local: {
    email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    isActived: {
      type: Boolean,
      default: false,
    },
    token: String,
    loginTimes: {
      type: Number,
      default: 0
    }
  },
  facebook: {
    uid: String,
    token: String,
    email: {
      type: String
    },
  },
  google: {
    uid: String,
    token: String,
    email: {
      type: String
    },
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: null,
  },
  deletedAt: {
    type: Number,
    default: null,
  },
});

UserSchema.statics = {
  //Tạo mới user
  createItem(item){
    return this.create(item);
  },
  //Tìm user bằng email
  findUserbyEmail(email){
    return this.findOne({"local.email": email}).exec();
  },
  //Tìm user bằng id
  findUserById(id){
    return this.findById(id).exec();
  },
  //Tìm token
  findToken(token){
    return this.findOne({"local.token": token})
  },
  updateUserInfo(id,file)
  {
      return this.findByIdAndUpdate(id,file).exec();
  },
  //Tìm user có token và sửa lại active = true và xóa token
  activeAccount(token){
    return this.findOneAndUpdate({
        "local.token": token,
    },
    {
        "local.token": null,
        "local.isActived": true,
    }).exec();

  },
  updatePassword(id, hashedPassword){
    return this.findByIdAndUpdate(
      id, 
      {
        "local.password":hashedPassword
      })
      .exec();
  },
}

UserSchema.methods = {
  /**
   * 
   * @param {String} password
   * @returns {Boolean} true if password match
   */
  comparePass(password){
    return bcrypt.compare(password, this.local.password);
  }
}

const UserModel =  mongoose.model("Users", UserSchema);


export default UserModel;

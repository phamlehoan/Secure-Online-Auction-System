/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    default: "male",
  },
  phone: {
    type: Number,
    default: null,
  },
  avatarUrl: {
    type: String,
    default: "avatar.jpg",
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
      dateOfIssue: String,
      address: String,
      fontCardUrl: String,
      backCardUrl: String
    }
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
    return this.create(item)
  },
  //Tìm user bằng email
  findUserbyEmail(email){
    return this.findOne({"local.email":email}).exec();
  },
  //Tìm user bằng id
  findUserById(id){
    return this.findById(id).exec();
  },
  //Tìm token
  findToken(token){
    return this.findOne({"local.token": token})
  },
  //Tìm user có token và sửa lại active = true và xóa token
  activeAccount(token){
    return this.findOneAndUpdate({
        "local.token": token
    },
    {
        "local.token": null,
        "local.isActive": true,
    }).exec();
},
}

UserSchema.methods = {
  //Hàm so sánh mật khẩu
  comparePass(password){
        return bcrypt.compare(password,this.local.password);
  }
}
const UserModel =  mongoose.model("Users", UserSchema);

export default UserModel;

/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
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
    default: "payer",
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
    isActivated: {
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

UserSchema.statics ={
  createItem(item){
    return this.create(item)
  },
  findUserbyEmail(email){
    return this.findOne({"local.email":email}).exec();
  },
  findUserById(id){
    return this.findById(id).exec();
  }
}
const UserModel =  mongoose.model("Users", UserSchema);


export default UserModel;
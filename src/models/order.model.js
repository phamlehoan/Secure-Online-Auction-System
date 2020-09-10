/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: String,
  productIds: Array,
  payment: {
    cardOwner: String,
    cardNumber: String,
    expirationDate: String,
    CVC: String
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

const OrderModel =  mongoose.model("Orders", OrderSchema);

export default OrderModel;

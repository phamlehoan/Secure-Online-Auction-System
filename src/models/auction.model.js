/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
  userId:{
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
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

const AuctionModel =  mongoose.model("Auctions", AuctionSchema);

export default AuctionModel;

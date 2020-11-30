/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuctionLogSchema = new Schema({
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
  productImage: String,
  productName: {
    type: String,
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

AuctionLogSchema.statics = {
  saveProduct(product){
    return this.create(product);
  },
  auctionCounter(userId){
    return this.count({userId});
  },
  findAll(){
    return this.find({});
  },
  findByUserId(id){
    return this.find({userId: id});
  }
}

const AuctionLogModel =  mongoose.model("AuctionsLogs", AuctionLogSchema);

export default AuctionLogModel;

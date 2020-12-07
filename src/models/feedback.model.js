/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  sellerId: String,
  userId: String,
  ratingStar: Number,
  productId: String,
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

FeedbackSchema.statics = {
  //Tạo mới feedback
  createItem(item){
    return this.create(item);
  },
  findByProductId(id_seller){
    return this.find({
      sellerId: id_seller
    }).sort({createdAt: -1})
  },
  countByStar(id_seller,star){
    return this.find({
      sellerId: id_seller
    }).count({ratingStar: star}).exec();
  },
  countAllStar(id_seller){
    return this.find({
      sellerId: id_seller
    }).count().exec();
  }
}

const FeedbackModel =  mongoose.model("feedbacks", FeedbackSchema);

export default FeedbackModel;

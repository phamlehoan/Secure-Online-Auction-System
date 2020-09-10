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
  userId: String,
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

const FeedbackModel =  mongoose.model("feedbacks", FeedbackSchema);

export default FeedbackModel;

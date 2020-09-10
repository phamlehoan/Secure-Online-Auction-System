/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: String,
  description: {
    type: String,
    default: null,
  },
  aucStartTime: {
    type: String,
    default: null,
  },
  aucEndTime: {
    type: String,
    default: null,
  },
  reservePrice: {
    type: String,
  },
  categories: {
    name: String,
    code: String,
    required: true
  },
  tags: Array,
  priceStep: String,
  priceMethod: String,
  outbidPrice: Number,
  status: String,
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

const ProductModel =  mongoose.model("Products", ProductSchema);

export default ProductModel;

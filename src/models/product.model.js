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
    name: {
      type: String,
      required: true
    }
  },
  image: String,
  tags: Array,
  priceStep: String,
  priceMethod: String,
  outbidPrice: Number,
  status: String,
  userId: String,
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

ProductSchema.methods = {
  setName(newName) {
    this.name = newName;
    return this;
  },
  setCategory(category) {
    this.categories.name = category;
    return this;
  },
  setPrice(price) {
    this.reservePrice = price;
    return this;
  },
  setUserId(userId) {
    this.userId = userId;
    return this;
  }
}


const ProductModel =  mongoose.model("Products", ProductSchema);


export default ProductModel;
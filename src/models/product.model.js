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
    type: Date,
    default: null,
  },
  aucEndTime: {
    type: Date,
    default: null,
  },
  reservePrice: {//giá mua đứt
    type: Number,
  },
  nextPrice: {
    type: Number
  },
  price: {//giá khởi điểm
    type: Number,
    required: true
  },
  outbidPrice: Number,//giá cao hơn || need to be updated
  priceStep: Number,//+5
  priceMethod: String,//INCR
  categories: {
    name: {
      type: String,
      required: true
    }
  },
  image: String,
  tags: Array,
  winnerId: String,
  status: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});


/**
 * Product Schema bean method
 */
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

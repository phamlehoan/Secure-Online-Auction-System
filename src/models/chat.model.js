/**
 * Define user schema
 */
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  senderId: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  content: String,
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

const ChatModel =  mongoose.model("Chats", ChatSchema);

export default ChatModel;

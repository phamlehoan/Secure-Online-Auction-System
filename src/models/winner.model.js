import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WinnerSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    productId: {
        type: String
    },
    color: {
        type: String
    }
});

const WinnerModel =  mongoose.model("Winners", WinnerSchema);
    
    
export default WinnerModel;

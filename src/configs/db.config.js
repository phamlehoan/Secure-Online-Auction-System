import mongoose from "mongoose";
import bluebird from "bluebird";

let getConnectionString = () => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DB_NAME,
    MONGO_OPTIONS,
    MONGO_PORT,
  } = process.env;
  
  const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?${MONGO_OPTIONS}`;
  return MONGO_CONNECTION_STRING;
}

let mongoConnect = () => {
  const MONGO_CONNECTION_STRING = getConnectionString();
  mongoose.Promise = bluebird;
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      poolSize: 3
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log("Error", err);
      process.exit();
    });
};

export default {
  mongoConnect,
  getConnectionString
}

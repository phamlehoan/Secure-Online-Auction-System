import mongoose from "mongoose";
import bluebird from "bluebird";

export default () => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DB_NAME,
    MONGO_OPTIONS,
    MONGO_PORT,
  } = process.env;

  const MONGO_CONNECTION_STRING = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

  mongoose.Promise = bluebird;
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log("Error", err);
      process.exit();
    });
};

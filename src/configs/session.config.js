import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';

//khởi tạo biến môi trườn
dotenv.config();
//Tạo mongoStrre để lưu session vào database
let mongoDBStrore = MongoDBStore(session);

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DB_NAME,
    MONGO_OPTIONS,
    MONGO_PORT,
  } = process.env;

  const MONGO_CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?${MONGO_OPTIONS}`;

//Cấu hình sessionStore
let sessionStore = new mongoDBStrore({
    uri: MONGO_CONNECTION_STRING,
    collection: 'mySessions',
    autoReconnect: true,
    autoRemove: "native"
});

//Cấu hình session
let configSession = (app) =>{
    app.use(session({
        key: "express.sid",
        secret: 'mySecret',
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 } // Set thời gian sống cho cookie là 1 ngày
    }));
};

module.exports = configSession;

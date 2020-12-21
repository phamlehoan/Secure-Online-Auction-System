import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import ConnectRedis from "connect-redis";
import Redis from "redis";
import dotenv from 'dotenv';

dotenv.config();

//store session into database
const mongoDBStrore = MongoDBStore(session);
const redisStore = ConnectRedis(session);

const redisClient = Redis.createClient();

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DB_NAME,
    MONGO_OPTIONS,
    MONGO_PORT,
  } = process.env;

  const MONGO_CONNECTION_STRING = 
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?${MONGO_OPTIONS}`
  ||'';

//Cấu hình sessionStore
let sessionStore = new mongoDBStrore({
    uri: MONGO_CONNECTION_STRING,
    collection: process.env.SESSION_STORE_COLLECTION,
    autoReconnect: true,
    autoRemove: process.env.SESSION_STORE_AUTO_REMOVE_MODE
});

let sessionRedisStore = new redisStore({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    client: redisClient,
    ttl: process.env.REDIS_TTL || 260
});

//Cấu hình session
let config = (app) =>{
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionRedisStore,
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 } //1 day
    }));
};

module.exports = {
    config,
    sessionStore,
    sessionRedisStore
};

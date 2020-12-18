import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import connectFlash from 'connect-flash';
import passport from 'passport';
import socketIO from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";

import configViewEngine from "./configs/viewEngine"
import dbConfig from "./configs/db.config";
import session from "./configs/session.config";
import Router from "./routers/web";
import ApiRouter from "./routers/api/api";
import AppSocket from "./sockets/socket";
import configSocket from "./configs/socketAuth.config";
import redisConfig from "./configs/redis.config";
import RedisService from "./redis/redis";

dotenv.config();

//initialize application instance
let app = express();
//-----------------------

let ServerApplication = async (app) => {
  //------Middleware-------
  //app view engine configuration
  configViewEngine(app);

  //connect database
  dbConfig();

  //connect session
  session.config(app);

  //-----------------------
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(connectFlash());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_KEY));

  //Sử dụng passport để xác thực tài khoản
  app.use(passport.initialize());
  app.use(passport.session());

  //app routers
  Router(app);

  //api routers
  ApiRouter(app);

  const APP_HOST = process.env.APP_HOST || "localhost";
  const APP_PORT = process.env.APP_PORT || 3000;
  const REDIS_PORT = process.env.REDIS_PORT || 6379;
  const REDIS_HOST =  process.env.REDIS_HOST || "localhost";


  let server =  http.createServer(app);
  let io = socketIO(server);

  configSocket(
    io,
    cookieParser,
    session.sessionRedisStore
  );

  //init all sockets app
  AppSocket(io);

  let redis = redisConfig(REDIS_HOST, REDIS_PORT);

  RedisService.initial(redis);

  redis.on("error", function (err) {
    console.log("redis error " + err);
  });

  redis.on('connect', () => {
    console.log('redis connected');
  })

  server.listen(APP_PORT, APP_HOST, () => {
    console.log(`Server running at http://${APP_HOST}:${APP_PORT}/`);
    console.log('Server: '+process.pid);
  });

}

module.exports = ServerApplication;

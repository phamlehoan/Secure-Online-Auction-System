//config environment variables

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import connectFlash from 'connect-flash';

import configViewEngine from "./configs/viewEngine"
import Router from "./routers/web" 
import dbConfig from "./configs/db.config";
import sessionConfig from "./configs/session.config"

dotenv.config();

//initialize application instance
let app = express();
//-----------------------

//------Middleware-------
//app view engine configuration
configViewEngine(app);

//connect database
dbConfig();

//connect session
sessionConfig(app);

//-----------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(connectFlash());
// app.use(morgan("dev"));

//app routers
Router(app);

const APP_HOST = process.env.APP_HOST || "localhost";
const APP_PORT = process.env.APP_PORT || 3000;

app.listen(APP_PORT, APP_HOST, () => {
    console.log(`Server running at http://${APP_HOST}:${APP_PORT}/`);
})
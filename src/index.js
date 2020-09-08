//config environment variables
require("dotenv").config();

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import configViewEngine from "./configs/viewEngine"
import Router from "./routers/web" 


//initialize application instance
let app = express();
//-----------------------

//------Middleware-------
//app view engine configuration
configViewEngine(app);
//-----------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//app routers
Router(app);

const APP_HOST = process.env.APP_HOST || "localhost";
const APP_PORT = process.env.APP_PORT || 3000;

app.listen(APP_PORT, APP_HOST, () => {
    console.log(`Server running at http://${APP_HOST}:${APP_PORT}/`);
})
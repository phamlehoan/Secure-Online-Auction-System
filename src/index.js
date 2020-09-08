import express from "express";
import dotenv from "dotenv";
import configViewEngine from "./configs/viewEngine"
import Router from "./routers/web" 

//-------Khởi tạo--------
//Sử dụng biến môi trường
dotenv.config();
//Khỏi tạo express
let app = express();
//-----------------------

//------Middleware-------
//Cấu hình view Engine
configViewEngine(app);
//-----------------------

//Sử dụng Router
Router(app);

app.listen(process.env.APP_PORT,()=>{
    console.log(`Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}/`);
})
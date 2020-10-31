//cloudinary configs
import dotenv from "dotenv";
import { v2 } from "cloudinary";
import fs from "fs";

dotenv.config();

const CloudUploader = {};

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:  process.env.CLOUDINARY_SECRET
})

/**
 * Receiving a file in forder ./upload using multer in controller
 * upload file in folder to cloudinary
 * if success remove file in folder ./upload
 * 
 * @param { buffer } file
 * @returns uploaded url
 */
CloudUploader.uploadSingle = (file) => {
    return new Promise(resolve => {
        v2.uploader.upload(file, {
            folder: "images"
        })
        .then(result => {
            if (result) {
                fs.unlinkSync(file);
                resolve({
                    url: result.url
                })
            }
        })
    })
}

export default CloudUploader;

import cluster from "cluster";
import os from "os";
import express from "express";
import dotenv from "dotenv";

import server from "./index";

dotenv.config();

let cpus = os.cpus();

if (process.env.ENV === 'prod') {
    if (cluster.isMaster) {
        console.log('master cluster is running');
        for (let i = 0; i < cpus.length; i++) {
            cluster.fork();
        }

        cluster.on('exit', () => {
            cluster.fork();
        })
    }else{
        let app = express();
        server(app);
    }
}else{
    server(express());
}

/**
 * Entry point application
 * @version 1.0.0
 * @since Aug 10, 2020
 * @description
 *  - Capstone project 1 DTU University
 *  - 2020
 * Mentor: Jan samuelsson
 * Members: Pham Le Hoan
 *          Phan Xuan Dung
 *          Nguyen Thanh Long
 *          Huynh Dac Vinh
 *          Phan Thuy Ngan
 * 
 * @copyright Created by develop team with ♥️
 */

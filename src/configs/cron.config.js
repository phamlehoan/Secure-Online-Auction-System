import mongoose from "mongoose";
import morgan from "morgan";
import Agenda from "agenda";

import dbConnectionConfig from "../configs/db.config";

let logger = morgan('combined');

export default () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.on('error', err => {
            logger('Mongodb not connected' + err);
            return reject(err);
        })

        mongoose.connection.on('open', async () => {
            const CONNECTION_STRING = dbConnectionConfig.getConnectionString();
            const agenda = new Agenda({
                db: {
                    address: CONNECTION_STRING,
                    options: {
                        useUnifiedTopology: true
                    }
                }
            });

            return resolve(agenda);
        });
    })
}

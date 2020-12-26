import mongoose from "mongoose";

import TimeUtils from "../utils/time.util";

const CronService = {};

CronService.findDoneTasks = async () => {
    mongoose.connection.db.collection('agendaJobs', async (err, collection) => {
        if (err) {
            console.log(err);
            return;
        }
        await collection.aggregate([
            {
                $project: {
                    name: 1,
                    nextRunAt: 1,
                    lastRunAt: 1,
                    repeatInterval: 1
                }
            },
            {
                $match: {
                    name: {
                        $regex: /^onExpiration_/
                    }
                }
            }
        ]).toArray( async (err, jobs) => {
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < jobs.length; i++) {
                const job = jobs[i];
                let interval = job.repeatInterval.split(' ')[0];
                let times = TimeUtils.convertToMinutes((job.nextRunAt - job.lastRunAt) / interval);
                if (times >= 1) {
                    await collection.findOneAndDelete({
                        _id: job._id
                    });
                }
            }
        });
        
    });
}


export default CronService;

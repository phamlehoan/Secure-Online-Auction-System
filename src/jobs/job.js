import ProductJobs from "./product.job";
import CronConfig from "../configs/cron.config";

let initializeJobs = () => {
    CronConfig()
    .then(async agenda => {
        await ProductJobs.handleProductExpiration(agenda);
        await ProductJobs.handleDoneExpiration(agenda);
    })
}

export default initializeJobs;

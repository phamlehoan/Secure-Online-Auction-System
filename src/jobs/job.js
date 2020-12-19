import ProductJobs from "./product.job";
import CronConfig from "../configs/cron.config";

let initializeJobs = () => {
    CronConfig()
    .then(agenda => {
        ProductJobs.handleProductExpiration(agenda);
        ProductJobs.handleDoneExpiration(agenda);
    })
}

export default initializeJobs;

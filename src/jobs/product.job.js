import ProductService from "../services/product.service";
import CronService from "../services/cron.service";
import TimeUtil from "../utils/time.util";

const ProductJobs = {};

/**
 * 
 * @param {Agenda} agenda 
 */
ProductJobs.handleProductExpiration = async (agenda) => {
    await agenda.define('onExpirationProduct', async job => {
        let products = await ProductService.findProductsExpiration();
        console.log(products);
        if (products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                let humanInterval = TimeUtil.convertToHumanInterval(product.time);
                await agenda.define('onExpiration_' + product._id, async job => {
                    await ProductService.changeStatus(product._id);
                });
                (async () => {
                    await agenda.start();
                    await agenda.every(humanInterval, 'onExpiration_' + product._id);
                })();
            }
        }
    });
    (async () => {
        await agenda.start();
        await agenda.every('15 minutes', 'onExpirationProduct');
    })();
}

ProductJobs.handleDoneExpiration = async (agenda) => {
    await agenda.define('findDoneJobs', async job => {
        console.log('on clearing done task...');
        await CronService.findDoneTasks();
    });
    (async () => {
        await agenda.start();
        await agenda.every('5 minutes', 'findDoneJobs');
    })();
}

export default ProductJobs;

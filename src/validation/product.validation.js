import moment from 'moment';
import { productError } from './../langs/us/product.noti.us';

const ProductValid = {}

ProductValid.checkAdd = [
    // Check if start date is valid
    body("aucStartTime", productError.startDate)
        .exists()
        .custom((value) => {
            return moment(value, "YYYY-MM-DD LT", true).isValid()
        }),
    // Check if end day is valid
    body("aucEndTime", productError.endDate)
        .exists()
        .custom((value) => {
            return moment(value, "YYYY-MM-DD LT", true).isValid()
        })
];

export default ProductValid;
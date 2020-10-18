import {check} from 'express-validator';
import moment from 'moment';
import { productError } from './../langs/us/product.noti.us';

const ProductValid = {}
const dayFormat = "YYYY-MM-DD LT";
ProductValid.checkAdd = [
    // Check if start date is valid
    check("aucStartTime", productError.startDate)
        .exists()
        .custom((value) => {
            return moment(value, dayFormat, true).isValid()
        }),
    // Check if end day is valid
    check("aucEndTime", productError.endDate)
        .exists()
        .custom((value) => {
            return moment(value, dayFormat, true).isValid()
        })
];

export default ProductValid;
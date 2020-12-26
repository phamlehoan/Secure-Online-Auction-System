import base64 from "Base64";
import Base64 from "Base64";

const CommonServices = {};

/**
 * Encrypt object to base64
 * btoa encode
 * @param {Object} object 
 */
CommonServices.encrypt = (object) => {
    if (object instanceof Array) {
        for (let i = 0; i < object.length; i++) {
            const element = object[i];
            element['_id'] = base64.btoa(element['_id']);
        }
    }
    console.log(object);
}

CommonServices.decrypt = (object) => {

}

export default CommonServices;

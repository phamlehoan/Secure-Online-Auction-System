import MailConfig from "../configs/mail.config";
import {transMail} from './../langs/us/notification.us';

const MailService = {};

/**
 * 
 * @param {String} email 
 */
MailService.warning = async (email, opt) => {
    let content =  `<h2> SOAS Security Alert ⚠</h2>
                    <h3> Some one got your password and login in another device </h3>
                    <h3> If you are do that operation please let we know </h3>
                    <h3 style="color: #09ff00;"> Your OTP: ${opt} </h3>
                    `;
    let subject = 'SOAS Security Alert ⚠';

    return await MailConfig(email, subject, content);
}

export default MailService;

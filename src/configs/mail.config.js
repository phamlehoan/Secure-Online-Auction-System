import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import nodemailerSmtpTransport from 'nodemailer-smtp-transport';
dotenv.config();

let adminUser = process.env.EMAIL_USER;
let adminPassword= process.env.EMAIL_PASSWORD;
let mailHost= process.env.EMAIL_HOST;
let mailPort= process.env.EMAIL_PORT;

/**
 * 
 * @param {String} to 
 * @param {String} subject 
 * @param {String} htmlContent 
 */
let sendEmail = (to, subject, htmlContent) => {
    let transporter = nodeMailer.createTransport(nodemailerSmtpTransport({
        tls: { rejectUnauthorized: false},
        service: 'gmail',
        auth:{
            user:adminUser,
            pass:adminPassword
        }
    }))
    let option = {
        from: adminUser,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transporter.sendMail(option);
}

module.exports = sendEmail;

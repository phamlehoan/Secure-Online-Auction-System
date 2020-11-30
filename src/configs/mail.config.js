import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import nodemailerSmtpTransport from 'nodemailer-smtp-transport';
dotenv.config();

let adminUser = process.env.EMAIL_USER;
let adminPassword= process.env.EMAIL_PASSWORD;
let mailHost= process.env.EMAIL_HOST;
let mailPort= process.env.EMAIL_PORT;

let sendEmail = (to,subject,htmlContent)=>{
    let transporter = nodeMailer.createTransport(nodemailerSmtpTransport({
        tls: { rejectUnauthorized: false},//https://stackoverflow.com/questions/38431592/sending-mail-in-node-js-using-nodemailer
        service: 'gmail',
        auth:{
            user:adminUser,
            pass:adminPassword
        }
    }))
    let option = {
        from:adminUser,
        to:to,
        subject:subject,
        html:htmlContent
    }
    return transporter.sendMail(option);
}

module.exports = sendEmail;

const nodemailer = require("nodemailer")
require("dotenv").config()
class MailServices{
     transporter 
    constructor(){
        try {
            this.transporter= nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PSW,
                },
              });
        } catch (exception) {
            throw {code:500, message:"Error Connecting SMTP Server.."}
        }
    }

    async sendEmail(to,subject, message){
        try {
            const response = await this.transporter.sendMail({
                from:process.env.SMTP_FROM_ADDR,
                to:to,
                subject: subject,
                text: message, // plain‑text body
                html: message, // HTML body
              });
              if(response){
                return true
              }else{
                return false
              }
        } catch (exception) {
          console.log(exception)
        throw{code:500, message:"Error Sending Email.."}
        }
    }
}

const mailSvc = new MailServices()
module.exports = mailSvc
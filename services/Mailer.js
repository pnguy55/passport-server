const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const SENDGRID_API = process.env.SENDGRID_API;

class Mailer extends helper.Mail {
    
}
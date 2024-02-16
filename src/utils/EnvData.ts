import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.DATA_SOURCE_BASE_URL;
const userName = process.env.DATA_SOURCE_USERNAME;
const password = process.env.DATA_SOURCE_PASSWORD;

//other data
const maildata = {
    "host": process.env.MAIL_HOST,
    "port": process.env.MAIL_PORT,
    "user": process.env.MAIL_USER,
    "pass": process.env.MAIL_PASS,
}
const stripeData ={
    "key": process.env.STRIPE_KEY,
    "secret": process.env.STRIPE_SECRET,
    "webhook_secret": process.env.STRIPE_WEBHOOK_SECRET,
    "success_url": process.env.STRIPE_SUCCESS_URL,
    "cancel_url": process.env.STRIPE_CANCEL_URL
}
export {
    baseUrl,
    userName,
    password,
    maildata,
    stripeData
}



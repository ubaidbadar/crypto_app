const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: "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",
    }
}))

module.exports = transporter;
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
module.exports.smtpTransport = nodemailer.createTransport("SMTP", {

    host: "10.9.189.4",
    port: 25 // port for secure SMTP
});


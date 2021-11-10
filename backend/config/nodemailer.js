const nodemailer = require("nodemailer");
require("dotenv").config();
const CustomError = require("../errors/CustomError");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const emailLogin = process.env.EMAIL_LOGIN;
const emailPass = process.env.EMAIL_PASSWORD;

module.exports = async (reiceiverEmail, emailText, emailHTML, emailSubject) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "hotmail",

      auth: {
        user: `${emailLogin}`,
        pass: `${emailPass}`,
      },
    });

    let info = await transporter.sendMail({
      from: '"cookBook" <artmuc@outlook.com>',
      // to: `${reiceiverEmail}`, // list of receivers
      to: "artmuc911@gmail.com", // temporary!!!!!!!!!!!!!!!
      subject: emailSubject,
      text: emailText,
      html: emailHTML,
    });
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new CustomError("error sending e-mail", 503);
  }
};

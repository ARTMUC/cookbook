const nodemailer = require("nodemailer");
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const emailLogin = process.env.EMAIL_LOGIN;
const emailPass = process.env.EMAIL_PASSWORD;

module.exports = (reiceiverEmail) => {
  async function main() {
    let transporter = nodemailer.createTransport({
      service: "hotmail",

      auth: {
        user: `${emailLogin}`,
        pass: `${emailPass}`,
      },
    });

    let info = await transporter.sendMail({
      from: '"cookBook" <artmuc@outlook.com>', // sender address
      to: `${reiceiverEmail}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
};

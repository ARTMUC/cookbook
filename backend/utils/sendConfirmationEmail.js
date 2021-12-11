const nodeMailer = require("../config/nodemailer");

const sendConfirmationEmail = async (emailAdress, emailConfirmationCode) => {
  try {
    const confirmationEmailText = `localhost:5000/api/v1/auth/confirm/${emailConfirmationCode}`;
    const confirmationEmailHTML = `<a href=\"http://localhost:5000/api/v1/auth/confirm/${emailConfirmationCode}\">Hello ${emailAdress} click here to confirm email </a>`;
    const confirmationEmailSubject = "CookBook - please confirm your email ✔";

    emailAdress &&
      (await nodeMailer(
        emailAdress,
        confirmationEmailText,
        confirmationEmailHTML,
        confirmationEmailSubject
      ));
  } catch (err) {
    throw new Error(err.message);
   
  }
};

module.exports = { sendConfirmationEmail };

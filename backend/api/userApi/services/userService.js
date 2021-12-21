const { UserRepository } = require("../repository/userRepoSQL");
const CustomError = require("../../../errors/CustomError");
const {
  sendConfirmationEmail,
} = require("../../../utils/sendConfirmationEmail");
const { hashPassword } = require("../../../utils/passwordCrypto");
const { randomValue } = require("../../../utils/randomValueGen");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async Register(userInputs) {
    const { email, password } = userInputs;
    try {
      await this.repository.CheckIfExists(email);
      const hashedPassword = await hashPassword(password);
      const emailConfirmationCode = await randomValue();
      await this.repository.SaveUser({
        email,
        hashedPassword,
        emailConfirmationCode,
      });
      await sendConfirmationEmail(email, emailConfirmationCode);
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async ConfirmUserEmail(confirmationId) {
    try {
      const doc = await this.repository.ConfirmUser(confirmationId);
      if (!doc)
        throw new CustomError(
          "Your confirmation link doesn't work. Please contact Administartor.",
          401
        );
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
}

module.exports = { UserService };

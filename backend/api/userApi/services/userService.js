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

  async register(userInputs) {
    const { email, password } = userInputs;
    try {
      await this.repository.checkIfExists(email);
      const hashedPassword = await hashPassword(password);
      const emailConfirmationCode = await randomValue();
      await this.repository.saveUser({
        email,
        hashedPassword,
        emailConfirmationCode,
      });
      await sendConfirmationEmail(email, emailConfirmationCode);
    } catch (err) {
      throw err;
    }
  }

  async confirmUserEmail(confirmationId) {
    try {
      const doc = await this.repository.confirmUser(confirmationId);
      if (!doc)
        throw new CustomError(
          "Your confirmation link doesn't work. Please contact Administartor.",
          401
        );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = { UserService };

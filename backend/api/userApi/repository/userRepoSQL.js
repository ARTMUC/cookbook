const { mySQLPool } = require("../../../db/connectSQL");
const CustomError = require("../../../errors/CustomError");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  async CheckIfExists(email) {
    try {
      const [doc] = await mySQLPool.execute(
        "SELECT `id` FROM `users` WHERE `email` = ?",
        [email]
      );

      if (doc.length !== 0) throw new CustomError("User already exists", 400);
      return;
    } catch (err) {
      throw err;
    }
  }
  async getUserByEmail(email) {
    try {
      const [doc] = await mySQLPool.execute(
        "SELECT `id`, `password`, `isEmailConfirmed` FROM `users` WHERE `email` = ?",
        [email]
      );
      if (doc.length === 0)
        throw new CustomError("Wrong email or password", 401);
      const [user] = doc;
      return user;
    } catch (err) {
      throw err;
    }
  }
  async getUserById(id) {
    try {
      const [doc] = await mySQLPool.execute(
        "SELECT `id`, `email`,`isEmailConfirmed` FROM `users` WHERE `id` = ?",
        [id]
      );

      if (doc.length === 0)
        throw new CustomError("Wrong email or password", 401);
      const [user] = doc;

      return user;
    } catch (err) {
      throw err;
    }
  }

  async saveUser(userInputs) {
    const { email, hashedPassword, emailConfirmationCode } = userInputs;
    try {
      const [{ affectedRows }] = await mySQLPool.execute(
        "INSERT INTO `users` (`email`,`password`,`id`,`isEmailConfirmed`,`emailConfirmationId`) VALUES (?,?,?,?,?)",
        [email, hashedPassword, uuidv4(), 0, emailConfirmationCode]
      );
      if (affectedRows === 0) throw new Error();

      return;
    } catch (err) {
      throw err;
    }
  }
  async confirmUser(confirmationId) {
    try {
      const [{ affectedRows }] = await mySQLPool.execute(
        "UPDATE `users` SET `isEmailConfirmed`='1' WHERE `emailConfirmationId` = ?",
        [confirmationId]
      );
      console.log(affectedRows);
      return affectedRows;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = { UserRepository };

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
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async GetUserByEmail(email) {
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
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async GetUserById(id) {
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
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }





  async SaveUser(userInputs) {
    const { email, hashedPassword, emailConfirmationCode } = userInputs;
    try {
      const [{ affectedRows }] = await mySQLPool.execute(
        "INSERT INTO `users` (`email`,`password`,`id`,`isEmailConfirmed`,`emailConfirmationId`) VALUES (?,?,?,?,?)",
        [email, hashedPassword, uuidv4(), 0, emailConfirmationCode]
      );
      if (affectedRows === 0) throw new Error();

      return;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async ConfirmUser(confirmationId) {
    try {
      const [{ affectedRows }] = await mySQLPool.execute(
        "UPDATE `users` SET `isEmailConfirmed`='1' WHERE `emailConfirmationId` = ?",
        [confirmationId]
      );
      console.log(affectedRows)
      return affectedRows;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
}

module.exports = { UserRepository };

const bcrypt = require("bcryptjs");
const CustomError = require("../errors/CustomError");

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw new Error(err.message);
  }
};

const verifyPassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash);
        if (!match) {
          throw new CustomError("Wrong email or password", 401);
        }
    } catch (err) {
        if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  };






module.exports = { hashPassword, verifyPassword };

const { randomBytes } = require("crypto");
const { promisify } = require("util");
const rndmBytes = promisify(randomBytes);

const randomValue = async () => {
  try {
    const randomValue = await rndmBytes(16);
    return randomValue.toString("hex");
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { randomValue };

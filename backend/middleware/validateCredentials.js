const CustomError = require("../errors/CustomError");



const validateCredentials = async (req, res, next) => {
// later I can put in some regex to validate email on backend side
    try {
        const {password,email} = req.body
        if (!password || !email) {
      throw new CustomError('Email and Password required',401)
        } 
          return next();
    } catch (error) {
        return next(error)
    }

  
};

module.exports = validateCredentials;

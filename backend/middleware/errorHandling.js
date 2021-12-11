const CustomError = require("../errors/CustomError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log("custom error");
    console.log(err.message, err.statusCode);
    console.log(err)
    const  {message,statusCode} = err
    res.status(statusCode).json({message,statusCode});
  } else {
    console.log("normal error");
    console.log(err.message, err.statusCode);
    console.log(err)
   const message = 'internal server error'
   const statusCode = 500
    res.status(statusCode).json({message,statusCode});
  }
};

module.exports = { errorHandler };

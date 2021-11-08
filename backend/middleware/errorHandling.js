const CustomError = require("../errors/CustomError");

const errorHandling = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log("custom error");
    console.log(err.message, err.statusCode);
    const  {message,statusCode} = err
    res.json({message,statusCode});
  } else {
    console.log("normal error");
    console.log(err.message, err.statusCode);
   const message = 'internal server error'
   const statusCode = 500
    res.json({message,statusCode});
  }
};

module.exports = { errorHandling };

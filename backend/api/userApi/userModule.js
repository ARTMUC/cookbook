const authRouter = require("./routes/userRouter");
const { passportSetup } = require("../../config/passport");

const userApi = (app) => {
  passportSetup(app);
 
  app.use("/api/v1/auth", authRouter);
};

module.exports = { userApi };

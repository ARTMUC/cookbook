require("dotenv").config();
const { middlewareSetup } = require("./middlewareSetup");
const { errorHandler } = require("./middleware/errorHandling");

const { userApi } = require("./api/userApi/userModule");
const { recipeApi } = require("./api/recipeApi/recipeModule");

const expressApp = (app) => {
  middlewareSetup(app);

  userApi(app);
  recipeApi(app);

  app.use(errorHandler);
};

module.exports = { expressApp };

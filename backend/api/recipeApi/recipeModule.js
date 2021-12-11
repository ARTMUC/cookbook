const recipeRouter = require("./routes/recipeRouter.js");

const isEmailConfirmed = require("../../middleware/isEmailConfirmed");
const confirmLoggedIn = require("../../middleware/confirmLoggedIn");

const recipeApi = (app) => {
  app.use("/api/v1/recipe", confirmLoggedIn, isEmailConfirmed, recipeRouter);
};

module.exports = { recipeApi };

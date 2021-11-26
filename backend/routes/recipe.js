const express = require("express");

const router = express.Router();
const {
  getOneRecipe,
  getAllMyRecipes,
  getAllSharedRecipes,
  createRecipe,
  editRecipe,
  removeRecipe,
  getImage,
} = require("../controller/recipe");
const Recipe = require("../models/Recipe");



// get one recipe (my or shared)    GET
// get all my recipes   GET
// get all shared recipes   GET
// create recipe    POST
// patch recipe     PATCH
// delete recipe    DELETE

router.route("/page=:page").get(getAllMyRecipes);

router.route("/").post(createRecipe);
router.route("/shared/:page").get(getAllSharedRecipes);
router
  .route("/recipe=:recipe_id")
  .get(getOneRecipe)
  .patch(editRecipe)
  .delete(removeRecipe);
 
  router
  .route("/image=:image_id")
  .get(getImage);


module.exports = router;

const express = require("express");

const router = express.Router();
const {
  getOneRecipe,
  getAllMyRecipes,
  getAllSharedRecipes,
  createRecipe,
  editRecipe,
  removeRecipe,
} = require("../controller/recipe");
const Recipe = require("../models/Recipe");



// get one recipe (my or shared)    GET
// get all my recipes   GET
// get all shared recipes   GET
// create recipe    POST
// patch recipe     PATCH
// delete recipe    DELETE

router.route("/page=:page/").get(getAllMyRecipes);
// http://localhost:5000/api/v1/recipe/page=1/?sort=title&order=desc  //example querry 
router.route("/").post(createRecipe);
router.route("/shared/:page").get(getAllSharedRecipes);
router
  .route("/one/:recipe_id")
  .get(getOneRecipe)
  .patch(editRecipe)
  .delete(removeRecipe);


module.exports = router;

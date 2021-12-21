const express = require("express");
const { imageUpload } = require("../../../config/multer");

const router = express.Router();
const {
  getOneRecipe,
  getAllUserRecipes,
  getAllSharedRecipes,
  createRecipe,
  editRecipe,
  removeRecipe,
  getImage,
} = require("../controllers/recipeController");


router.route("/page=:page").get(getAllUserRecipes);

router.route("/").post(imageUpload.single("image"),createRecipe);
router.route("/shared/page=:page").get(getAllSharedRecipes);
router
  .route("/recipe=:recipe_id")
  .get(getOneRecipe)
  .patch(imageUpload.single("image"),editRecipe)
  .delete(removeRecipe);

router.route("/image=:image_id").get(getImage);

module.exports = router;

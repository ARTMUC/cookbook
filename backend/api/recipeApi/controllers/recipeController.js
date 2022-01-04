const { RecipeService } = require("../services/recipeService");
const CustomError = require("../../../errors/CustomError");
const Service = new RecipeService();

const getOneRecipe = async (req, res, next) => {
  try {
    const { recipe_id } = req.params;
    const { id: userId } = req.user;

    const recipe = await Service.getOneRecipe(recipe_id, userId);

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const getAllUserRecipes = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { sort, order } = req.query;
    const requestedPage = req.params.page;
    const resultsPerPage = 8;

    const doc = await Service.getAllUserRecipes(
      userId,
      resultsPerPage,
      requestedPage,
      sort,
      order
    );

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
const getAllSharedRecipes = async (req, res, next) => {
  try {
    const isShared = 1;
    const { sort, order } = req.query;
    const requestedPage = req.params.page;
    const resultsPerPage = 8;

    const doc = await Service.getAllSharedRecipes(
      isShared,
      resultsPerPage,
      requestedPage,
      sort,
      order
    );

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    // image is saved on the server using Multer as middleware
    const imageName = req.file ? req.file.filename : null;
    const { id: userId } = req.user;
    const patchData = req.body.patchData;
    const newImageLink = await Service.createRecipe(
      imageName,
      userId,
      patchData
    );

    res.status(201).json(newImageLink);
  } catch (error) {
    next(error);
  }
};

const editRecipe = async (req, res, next) => {
  try {
    const imageName = req.file ? req.file.filename : null;
    const { id: userId } = req.user;

    const recipeId = req.params.recipe_id;
    const patchData = req.body.patchData;

    const newImageLink = await Service.editRecipe(
      imageName,
      userId,
      recipeId,
      patchData
    );

    res.status(200).json(newImageLink);
  } catch (error) {
    next(error);
  }
};

const removeRecipe = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const recipeId = req.params.recipe_id;

    await Service.removeRecipe(recipeId, userId);

    res.status(200).json("success - remove");
  } catch (error) {
    next(error);
  }
};

const getImage = async (req, res, next) => {
  try {
    const image_id = req.params.image_id;

    const image = await Service.GetImage(image_id);

    res.writeHead(200, { "Content-Type": "image/gif" });
    res.end(image, "binary");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOneRecipe,
  getAllUserRecipes,
  getAllSharedRecipes,
  createRecipe,
  editRecipe,
  removeRecipe,
  getImage,
};

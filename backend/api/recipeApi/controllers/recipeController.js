const { RecipeService } = require("../services/recipeService");
const CustomError = require("../../../errors/CustomError");
const Service = new RecipeService();

const getOneRecipe = async (req, res, next) => {
  try {
    const id = req.params.recipe_id;
    const user = req.user;

    const recipe = await Service.GetOneRecipe(id, user);

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const getAllMyRecipes = async (req, res, next) => {
  try {
    const { email } = req.user;
    const createdBy = { createdBy: email };
    const { sort, order } = req.query;
    const requestedPage = req.params.page;
    const resultsPerPage = 8;

    const doc = await Service.getAllRecipes(
      createdBy,
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
    const isShared = { isShared: true };
    const { sort, order } = req.query;
    const requestedPage = req.params.page;
    const resultsPerPage = 8;

    const doc = await Service.getAllRecipes(
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
    const imageName = req.file ? req.file.filename : null;
    const { email } = req.user;
    const patchData = req.body.patchData;

    await Service.CreateRecipe(imageName, email, patchData);

    res.status(201).json("recipe created");
  } catch (error) {
    next(error);
  }
};

const editRecipe = async (req, res, next) => {
  try {
    const imageName = req.file ? req.file.filename : null;
    const { email } = req.user;
    const id = req.params.recipe_id;
    const patchData = req.body.patchData;

    const recipe = await Service.EditRecipe(imageName, email, id, patchData);

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const removeRecipe = async (req, res, next) => {
  try {
    const { email } = req.user;
    const id = req.params.recipe_id;

    await Service.RemoveRecipe(id, email);

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
  getAllMyRecipes,
  getAllSharedRecipes,
  createRecipe,
  editRecipe,
  removeRecipe,
  getImage,
};

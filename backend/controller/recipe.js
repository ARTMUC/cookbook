const { readFile, unlink } = require("fs").promises;
const { resolve } = require("path");

const CustomError = require("../errors/CustomError");
const Recipe = require("../models/Recipe");

const FILE_DIRECTORY = resolve(__dirname, "../utils/images");

const getOneRecipe = async (req, res, next) => {
  try {
    const id = req.params.recipe_id;
    paramLength = id.length;
    if (paramLength !== 24) throw new CustomError("recipe not found", 404);

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) throw new CustomError("recipe not found", 404);
    if (recipe.createdBy == req.user.email || recipe.isShared == true) {
      res.json(recipe);
    } else {
      throw new CustomError("no access", 403);
    }
  } catch (error) {
    next(error);
  }
};

const getAllMyRecipes = async (req, res, next) => {
  try {
    const { email } = req.user;
    const createdBy = { createdBy: email };

    const count = await Recipe.countDocuments({ ...createdBy });
    const resultsPerPage = 8;
    const totalPages = count ? Math.ceil(count / resultsPerPage) : 1;
    let page;
    if (req.params.page <= 1) {
      page = 0;
    }
    if (req.params.page >= totalPages) {
      page = totalPages - 1;
    } else {
      page = req.params.page - 1;
    }

    const { sort, order } = req.query;
    const sortingParams = Object.fromEntries([[sort, order]]);

    const recipes = await Recipe.find({ ...createdBy })
      .sort({ ...sortingParams })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page);
    res.status(200).json({ totalPages, page, resultsPerPage, count, recipes });
  } catch (error) {
    next(error);
  }
};
const getAllSharedRecipes = async (req, res, next) => {
  try {
    // const recipes = await Recipe.find({ isShared: true })
    //   .sort({ name: "asc" })
    //   .limit(resultsPerPage)
    //   .skip(resultsPerPage * page);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const imageName = req.file ? req.file.filename : null;
    const { email } = req.user;
    const id = req.params.recipe_id;
    const date = new Date();
    const createdOn = { createdOn: date };
    const { title, description, image, isShared, ingriedients } = JSON.parse(
      req.body.patchData
    );

    const newImageLink = imageName
      ? `http://localhost:5000/api/v1/recipe/image=${imageName}`
      : image;

    if (!title.trim() || !description.trim()) {
      throw new CustomError("fields required", 400);
    }
    const newRecipeInfo = {
      title,
      description,
      createdBy: email,
      image: newImageLink,
      isShared,
      ingriedients,
      ...createdOn,
    };

    const newRecipe = new Recipe({ ...newRecipeInfo });
    await newRecipe.save();
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
    const date = new Date();
    const editedOn = { editedOn: date };
    const { title, description, image, isShared, ingriedients } = JSON.parse(
      req.body.patchData
    );

    const newImageLink = imageName
      ? `http://localhost:5000/api/v1/recipe/image=${imageName}`
      : image;

    if (!title.trim() || !description.trim()) {
      throw new CustomError("fields required", 400);
    }
    const update = {
      title,
      description,
      image: newImageLink,
      isShared,
      ingriedients,
      ...editedOn,
    };

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, createdBy: email },
      update,
      { new: true }
    );

    if (imageName) {
      const oldImageRequestSplit = image.split("=");
      const oldImageFileName = oldImageRequestSplit[1];
      const oldImagePath = resolve(FILE_DIRECTORY, `./${oldImageFileName}`);
      await unlink(oldImagePath);
    }

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const removeRecipe = async (req, res, next) => {
  try {
    const { email } = req.user;
    const id = req.params.recipe_id;
    const { image } = await Recipe.findOneAndDelete({
      _id: id,
      createdBy: email,
    });
    res.json("success - remove");
    const oldImageRequestSplit = image.split("=");
    const oldImageFileName = oldImageRequestSplit[1];
    const oldImagePath = resolve(FILE_DIRECTORY, `./${oldImageFileName}`);
    await unlink(oldImagePath);
  } catch (error) {
    next(error);
  }
};

const getImage = async (req, res, next) => {
  try {
    const image_id = req.params.image_id;
    const imagePath = resolve(FILE_DIRECTORY, `${image_id}`);
    const image = await readFile(imagePath);

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

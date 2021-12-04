const { readFile, unlink } = require("fs").promises;
const { resolve } = require("path");

const CustomError = require("../errors/CustomError");
const Recipe = require("../models/Recipe");

const FILE_DIRECTORY = resolve(__dirname, "../utils/images");

const getOneRecipe = async (req, res, next) => {
  try {
    const id = req.params.recipe_id;
    const recipe = await Recipe.find({ _id: id });
    if (recipe[0].createdBy == req.user.email || recipe[0].isShared == true) {
      res.json(recipe);
    } else {
      throw new CustomError("no access", 401);
    }
  } catch (error) {
    next(error);
  }
};

const getAllMyRecipes = async (req, res, next) => {
  try {
    const { email } = req.user;
    const createdBy = { createdBy: email };

    //////////////////////////
    const count = await Recipe.countDocuments({ ...createdBy });
    const resultsPerPage = 8;
    // let totalPages
    // if (count){
    //    totalPages = Math.ceil(count / resultsPerPage)
    // } else {  totalPages = 1}

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
      //   .select("title")    // here we can pass array of obj keys - lets try to add the filter later to the params
      .sort({ ...sortingParams }) //figure out sorting by diffferent keys
      .limit(resultsPerPage)
      .skip(resultsPerPage * page);
    res.status(200).json({ totalPages, page, resultsPerPage, count, recipes });

    //////////////////////////
  } catch (error) {
    next(error);
  }
};
const getAllSharedRecipes = async (req, res, next) => {
  try {
    ////////
    const resultsPerPage = 8;
    let page = req.params.page >= 1 ? req.params.page : 1;
    const query = req.query.search;
    page = page - 1;

    const recipes = await Recipe.find({ isShared: true })
      //   .select("title")
      .sort({ name: "asc" })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page);
    res.status(200).json(recipes);

    //////////
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const { email } = req.user;
    const createdBy = { createdBy: email };
    const recipe = req.body;
    const date = new Date();
    const createdOn = { createdOn: date };
    await Recipe.create({ ...recipe, ...createdBy, ...createdOn });
    res.json({ ...recipe, ...createdBy });
  } catch (error) {
    next(error);
  }
};
const editRecipe = async (req, res, next) => {
  try {
    const imageName = req.file ? req.file.filename : null;
    const imagePath = req.file ? req.file.path : null;

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

    if (!title || !description) {
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

    // TO DO :  ULNIK OLD FILE FROM THE SERVER!!!!!

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, createdBy: email },
      update,
      { new: true }
    );

    const oldImageRequestSplit = image.split("=");
    const oldImageFileName = oldImageRequestSplit[1];
    const oldImagePath = resolve(FILE_DIRECTORY, `./${oldImageFileName}`);
    await unlink(oldImagePath);

    res.json(recipe);
  } catch (error) {
    //  next(error);
    console.log(error);
  }
};

const removeRecipe = async (req, res, next) => {
  try {
    const { email } = req.user;
    const id = req.params.recipe_id;
    await Recipe.deleteOne({ _id: id, createdBy: email });
    res.json("success - remove");
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

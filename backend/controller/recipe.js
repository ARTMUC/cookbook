const Recipe = require("../models/Recipe");

const getOneRecipe = async (req, res, next) => {
  try {
    const id = req.params.recipe_id;
    const recipe = await Recipe.find({ _id: id });
    if (recipe[0].createdBy == req.user.email || recipe[0].isShared == true) {
      res.json(recipe);
    } else {
      throw new Error("no access man");
    }
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

const getAllMyRecipes = async (req, res, next) => {
  try {
    const { email } = req.user;
    const createdBy = { createdBy: email };

    //////////////////////////
    const count = await Recipe.countDocuments({ ...createdBy }); 
    const resultsPerPage = 8;
const totalPages = Math.ceil(count / resultsPerPage)
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
    console.log(error);
    res.json("error");
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
    console.log(error);
    res.json("error");
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
    console.log(error);
    res.json("error");
  }
};
const editRecipe = async (req, res, next) => {
  try {
    const { email } = req.user;
    const id = req.params.recipe_id;
    const date = new Date();
    const editedOn = { editedOn: date };
    const { title, description, image, isShared } = req.body;
    if (!title || !description || !image) {
      throw new Error("fields required");
    }
    const update = {
      title,
      description,
      image,
      isShared,
      ...editedOn,
    };
    let recipe = await Recipe.findOneAndUpdate(
      { _id: id, createdBy: email },
      update,
      {
        new: true,
      }
    );
    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};
const removeRecipe = async (req, res, next) => {
  try {
    const { email } = req.user;
    const id = req.params.recipe_id;
    await Recipe.deleteOne({ _id: id, createdBy: email });
    res.json("success - remove");
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};

module.exports = {
  getOneRecipe,
  getAllMyRecipes,
  getAllSharedRecipes,
  createRecipe,
  editRecipe,
  removeRecipe,
};

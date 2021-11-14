const Recipe = require("../models/Recipe");

//// mongoose sort
// Post.find({}).sort('field').exec(function(err, docs) { ... });
// Post.find({}).sort({ field: 'asc' }).exec(function(err, docs) { ... });
// Post.find({}).sort({ field: 'ascending' }).exec(function(err, docs) { ... });
// Post.find({}).sort({ field: 1 }).exec(function(err, docs) { ... });

// Post.find({}, null, {sort: { field : 'asc' }}), function(err, docs) { ... });
// Post.find({}, null, {sort: { field : 'ascending' }}), function(err, docs) { ... });
// Post.find({}, null, {sort: { field : 1 }}), function(err, docs) { ... });

// Post.find({}).sort('-field').exec(function(err, docs) { ... });
// Post.find({}).sort({ field: 'desc' }).exec(function(err, docs) { ... });
// Post.find({}).sort({ field: 'descending' }).exec(function(err, docs) { ... });
// Post.find({}).sort({ field: -1 }).exec(function(err, docs) { ... });

// Post.find({}, null, {sort: { field : 'desc' }}), function(err, docs) { ... });
// Post.find({}, null, {sort: { field : 'descending' }}), function(err, docs) { ... });
// Post.find({}, null, {sort: { field : -1 }}), function(err, docs) { ... });

const getOneRecipe = async (req, res, next) => {
  try {
    const id = req.params.recipe_id;
    const recipe = await Recipe.find({ _id: id }); // add if user === email or if isShared === true
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
    const resultsPerPage = 10;
    let page = req.params.page >= 1 ? req.params.page : 1;
    const query = req.query.search;
    let sort = req.params.sort
    let order = req.params.order
    console.log(sort)
    console.log(order)
    page = page - 1;

    const recipes = await Recipe.find({ ...createdBy })
      //   .select("title")    // here we can pass array of obj keys - lets try to add the filter later to the params
      .sort({ name: "asc" })       //figure out sorting by diffferent keys
      .limit(resultsPerPage)
      .skip(resultsPerPage * page);
    res.status(200).json(recipes);

    //////////////////////////
  } catch (error) {
    console.log(error);
    res.json("error");
  }
};
const getAllSharedRecipes = async (req, res, next) => {
  try {
    ////////
    const resultsPerPage = 10;
    let page = req.params.page >= 1 ? req.params.page : 1;
    const query = req.query.search;

    page = page - 1;

    const recipes = await Recipe.find({ isShared: true })
      //   .select("title")
      .sort({ name: "asc" })     //figure out sorting by diffferent keys
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



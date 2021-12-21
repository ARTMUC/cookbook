const { RecipeRepository } = require("../repository/recipeRepoSQL");
const CustomError = require("../../../errors/CustomError");
const { readFile, unlink } = require("fs").promises;
const { resolve } = require("path");

const FILE_DIRECTORY = resolve(__dirname, "../../../data/images");

class RecipeService {
  constructor() {
    this.repository = new RecipeRepository();
  }
  async getOneRecipe(recipe_id, userId) {
    try {
      const recipe = await this.repository.findRecipe(recipe_id);
      if (!(recipe.user_id === userId || recipe.isShared === true))
        throw new CustomError("no access", 403);
      return recipe;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async getAllUserRecipes(
    userId,
    resultsPerPage,
    requestedPage,
    sortBy,
    order
  ) {
    try {
      const count = await this.repository.countDocumentsByUserId(userId);

      const totalPages = count ? Math.ceil(count / resultsPerPage) : 1;
      let page;
      if (requestedPage <= 1) {
        page = 0;
      }
      if (requestedPage >= totalPages) {
        page = totalPages - 1;
      } else {
        page = requestedPage - 1;
      }

      const recipes = await this.repository.findUserRecipesAndSort(
        userId,
        sortBy,
        order,
        resultsPerPage,
        page
      );
      return { totalPages, page, resultsPerPage, count, recipes };
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async getAllSharedRecipes(
    isShared,
    resultsPerPage,
    requestedPage,
    sortBy,
    order
  ) {
    try {
      const count = await this.repository.countSharedRecipes(isShared);

      const totalPages = count ? Math.ceil(count / resultsPerPage) : 1;
      let page;
      if (requestedPage <= 1) {
        page = 0;
      }
      if (requestedPage >= totalPages) {
        page = totalPages - 1;
      } else {
        page = requestedPage - 1;
      }

      const recipes = await this.repository.findSharedRecipesAndSort(
        isShared,
        sortBy,
        order,
        resultsPerPage,
        page
      );
      return { totalPages, page, resultsPerPage, count, recipes };
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async createRecipe(imageName, userId, recipehData) {
    try {
      const newRecipeData = JSON.parse(recipehData);
      const imageLink = imageName
        ? `http://localhost:5000/api/v1/recipe/image=${imageName}`
        : image;

      if (!title.trim() || !description.trim()) {
        throw new CustomError("fields required", 400);
      }

      await this.repository.saveRecipe(newRecipeData, imageLink, userId);

      return;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async editRecipe(imageName, userId, recipeId, patchData) {
    try {
      const recipePatchData = JSON.parse(patchData);

      const image = recipePatchData.image;
      const imageLink = imageName
        ? `http://localhost:5000/api/v1/recipe/image=${imageName}`
        : image;

      const recipe = await this.repository.findRecipeAndUpdate(
        recipeId,
        userId,
        recipePatchData,
        imageLink
      );

      if (imageName) {
        const oldImageRequestSplit = image.split("=");
        const oldImageFileName = oldImageRequestSplit[1];
        const oldImagePath = resolve(FILE_DIRECTORY, `./${oldImageFileName}`);
        await unlink(oldImagePath);
      }
      return recipe;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async removeRecipe(recipeId, userId) {
    try {
      const image = await this.repository.findRecipeAndDelete(
        recipeId,
        userId
      );

      const oldImageRequestSplit = image.split("=");
      const oldImageFileName = oldImageRequestSplit[1];
      const oldImagePath = resolve(FILE_DIRECTORY, `./${oldImageFileName}`);
      await unlink(oldImagePath);

      return;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async GetImage(image_id) {
    try {
      const imagePath = resolve(FILE_DIRECTORY, `${image_id}`);
      return await readFile(imagePath);
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
}

module.exports = { RecipeService };

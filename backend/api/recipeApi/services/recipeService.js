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
      // if (err instanceof CustomError)
      //   throw new CustomError(err.message, err.statusCode);
      // throw new Error(err.message);
      throw err;
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
      // if (err instanceof CustomError)
      //   throw new CustomError(err.message, err.statusCode);
      // throw new Error(err.message);
      throw err;
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
      // if (err instanceof CustomError)
      //   throw new CustomError(err.message, err.statusCode);
      // throw new Error(err.message);
      throw err;
    }
  }

  async createRecipe(imageName, userId, data) {
    try {
      const recipeData = JSON.parse(data);
      if (!imageName) throw new CustomError("image is required", 400);
      const imageLink = `http://localhost:5000/api/v1/recipe/image=${imageName}`;
      await this.repository.saveRecipe(recipeData, imageLink, userId);

      return imageLink;
    } catch (err) {
      // if (err instanceof CustomError)
      //   throw new CustomError(err.message, err.statusCode);
      // throw new Error(err.message);
      throw err;
    }
  }

  async editRecipe(imageName, userId, recipeId, patchData) {
    try {
      const recipePatchData = JSON.parse(patchData);

      const image = recipePatchData.coverPhoto;
      const imageLink =
        imageName && `http://localhost:5000/api/v1/recipe/image=${imageName}`;

      await this.repository.findRecipeAndUpdate(
        recipeId,
        userId,
        recipePatchData,
        imageLink
      );

      if (imageLink) {
        const oldImageRequestSplit = image.split("=");
        const oldImageFileName = oldImageRequestSplit[1];
        const oldImagePath = resolve(FILE_DIRECTORY, `./${oldImageFileName}`);
        await unlink(oldImagePath);
      }
      return imageLink ? imageLink : image;
    } catch (err) {
      // if (err instanceof CustomError)
      //   throw new CustomError(err.message, err.statusCode);
      // throw new Error(err.message);
      throw err;
    }
  }
  async removeRecipe(recipeId, userId) {
    try {
      const image = await this.repository.findRecipeAndDelete(recipeId, userId);

      const oldImageRequestSplit = image.split("=");
      const oldImageFileName = oldImageRequestSplit[1];
      const oldImagePath = resolve(FILE_DIRECTORY, `./${oldImageFileName}`);
      await unlink(oldImagePath);

      return;
    } catch (err) {
      // if (err instanceof CustomError)
      //   throw new CustomError(err.message, err.statusCode);
      // throw new Error(err.message);
      throw err;
    }
  }
  async GetImage(image_id) {
    try {
      const imagePath = resolve(FILE_DIRECTORY, `${image_id}`);
      return await readFile(imagePath);
    } catch (err) {
      // if (err instanceof CustomError)
      //   throw new CustomError(err.message, err.statusCode);
      // throw new Error(err.message);
      throw err;
    }
  }
}

module.exports = { RecipeService };

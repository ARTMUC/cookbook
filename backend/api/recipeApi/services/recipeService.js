const { RecipeRepository } = require("../repository/recipeRepo");
const CustomError = require("../../../errors/CustomError");
const { readFile, unlink } = require("fs").promises;
const { resolve } = require("path");

const FILE_DIRECTORY = resolve(__dirname, "../../../data/images");

class RecipeService {
  constructor() {
    this.repository = new RecipeRepository();
  }
  async GetOneRecipe(id, user) {
    try {
      const paramLength = id.length;
      if (paramLength !== 24) throw new CustomError("recipe not found", 404);

      const recipe = await this.repository.FindRecipe({ _id: id });
      if (!recipe) throw new CustomError("recipe not found", 404);
      if (recipe.createdBy !== user.email || recipe.isShared !== true)
        throw new CustomError("no access", 403);
      return recipe;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async getAllRecipes(
    searchParams,
    resultsPerPage,
    requestedPage,
    sortBy,
    order
  ) {
    try {
      const count = await this.repository.CountDocuments({ ...searchParams });

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
      const sortingParams = Object.fromEntries([[sortBy, order]]);
      const recipes = await this.repository.FindAndSort(
        searchParams,
        sortingParams,
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
  async CreateRecipe(imageName, email, patchData) {
    try {
      const { title, description, image, isShared, ingriedients } =
        JSON.parse(patchData);

      const date = new Date();
      const createdOn = { createdOn: date };
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

      await this.repository.SaveRecipe(newRecipeInfo);
      return;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async EditRecipe(imageName, email, id, patchData) {
    try {
      const date = new Date();
      const editedOn = { editedOn: date };
      const { title, description, image, isShared, ingriedients } =
        JSON.parse(patchData);

      const newImageLink = imageName
        ? `http://localhost:5000/api/v1/recipe/image=${imageName}`
        : image;

      if (!title.trim() || !description.trim()) {
        throw new CustomError("fields required", 400);
      }
      const searchInfo = {
        id,
        email,
      };
      const updateInfo = {
        title,
        description,
        image: newImageLink,
        isShared,
        ingriedients,
        ...editedOn,
      };

      const recipe = await this.repository.FindRecipeAndUpdate(
        searchInfo,
        updateInfo
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
  async RemoveRecipe(id, email) {
    try {
      const { image } = await this.repository.FindRecipeAndDelete(id, email);

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

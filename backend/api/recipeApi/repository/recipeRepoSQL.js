const CustomError = require("../../../errors/CustomError");
const { currentSQLdate } = require("../../../utils/toSQLDateTime");
const { mySQLPool } = require("../../../db/connectSQL");
const { v4: uuidv4 } = require("uuid");

class RecipeRepository {
  async findRecipe(recipeId) {
    try {
      const [ingriedients] = await mySQLPool.execute(
        "SELECT  `ingriedients`.`name`,`ingriedients`.`kcal`, `recipe`.`id`, `recipe_ingriedients`.`weight`  FROM `recipe`  LEFT JOIN `recipe_ingriedients` ON `recipe`.`id`=`recipe_ingriedients`.`recipe_id` LEFT JOIN `ingriedients` ON `ingriedients`.`id`=`recipe_ingriedients`.`ingriedient_id`  WHERE `recipe`.`id`= ? ",
        [recipeId]
      );

      const [recipe] = (
        await mySQLPool.execute(
          "SELECT   `recipe`.*, `images`.`coverPhoto`, `users`.`email`  FROM `images` RIGHT JOIN `recipe` ON  `images`.`recipe_id` = `recipe`.`id` LEFT JOIN `recipe_ingriedients` ON `recipe`.`id`=`recipe_ingriedients`.`recipe_id` LEFT JOIN `ingriedients` ON `ingriedients`.`id`=`recipe_ingriedients`.`ingriedient_id` JOIN `users` ON `recipe`.`user_id` = `users`.`id` WHERE `recipe`.`id`= ?  GROUP BY  `recipe`.`id`   ",
          [recipeId]
        )
      )[0];

      if (!recipe) throw new CustomError("Recipe not found", 404);

      recipe.ingriedients = [];

      for await (const ingriedient of ingriedients) {
        if (ingriedient.id === recipe.id) {
          const { name, kcal, weight } = ingriedient;
          recipe.ingriedients.push({ name, kcal, weight });
        }
      }

      return recipe;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async countDocumentsByUserId(userId) {
    try {
      const [{ count }] = (
        await mySQLPool.execute(
          "SELECT COUNT (`recipe`.`id`) AS `count` FROM `recipe` JOIN `users` ON `recipe`.`user_id`=`users`.`id`  WHERE `users`.`id`= ? ",
          [userId]
        )
      )[0];

      return count;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async findUserRecipesAndSort(userId, sortBy, order, resultsPerPage, page) {
    try {
      const sanitizedSortBy = sortBy.replace(/[^a-z^0-9^A-Z]+/g, " ");
      const sanitizedOrder = order.replace(/[^a-z^0-9^A-Z]+/g, " ");
      const doc = (
        await mySQLPool.execute(
          "SELECT `recipe`.*, `images`.`miniaturePhoto`  FROM `images` RIGHT JOIN `recipe` ON `images`.`recipe_id` = `recipe`.`id`  JOIN `users` ON `recipe`.`user_id`=`users`.`id`  WHERE `users`.`id`= ? ORDER BY `" +
            sanitizedSortBy +
            "`    " +
            sanitizedOrder +
            " LIMIT ? OFFSET ? ",
          [userId, resultsPerPage, resultsPerPage * page]
        )
      )[0];

      return doc;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async countSharedRecipes(isShared) {
    try {
      const [{ count }] = (
        await mySQLPool.execute(
          "SELECT COUNT (`recipe`.`id`) AS `count` FROM `recipe` JOIN `users` ON `recipe`.`user_id`=`users`.`id`  WHERE `recipe`.`isShared`= ? ",
          [isShared]
        )
      )[0];

      return count;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async findSharedRecipesAndSort(
    isShared,
    sortBy,
    order,
    resultsPerPage,
    page
  ) {
    try {
      const sanitizedSortBy = sortBy.replace(/[^a-z^0-9^A-Z]+/g, " ");
      const sanitizedOrder = order.replace(/[^a-z^0-9^A-Z]+/g, " ");
      const doc = (
        await mySQLPool.execute(
          "SELECT `recipe`.*  FROM `images` RIGHT JOIN `recipe` ON `images`.`recipe_id` = `recipe`.`id` JOIN `users` ON `recipe`.`user_id`=`users`.`id`  WHERE `recipe`.`isShared`= ? ORDER BY `" +
            sanitizedSortBy +
            "`    " +
            sanitizedOrder +
            " LIMIT ? OFFSET ? ",
          [isShared, resultsPerPage, resultsPerPage * page]
        )
      )[0];

      return doc;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async saveRecipe(recipeData, imageLink, userId) {
    try {
      const { title, description, isShared, ingriedients } = recipeData;

      //save recipe
      const recipeId = uuidv4();
      await mySQLPool.execute(
        "INSERT INTO `recipe` (`id`,`title`,`createdAt`,`description`,`user_id`,`isShared`) VALUES (?,?,?,?,?,?)",
        [recipeId, title, currentSQLdate(), description, userId, isShared]
      );
      //save image link
      await mySQLPool.execute(
        "INSERT INTO `images` (`id`,`coverPhoto`,`miniaturePhoto`,`recipe_id`) VALUES (?,?,?,?)",
        [uuidv4(), imageLink, imageLink, recipeId]
      );

      //save ingriedients from array
      ingriedients.forEach(async (element) => {
        const { name, kcal, weight } = element;
        let ingriedientId;
        //check if ingriedient already exits
        const [ingriedient] = await mySQLPool.execute(
          "SELECT `ingriedients`.`id`  FROM `ingriedients` WHERE `ingriedients`.`name`= ? AND `ingriedients`.`kcal` = ? ",
          [name, kcal]
        );
        //if it exists then set ingriedientId to existing id
        if (ingriedient.length !== 0) ingriedientId = ingriedient[0].id;

        //if it doesn't exist then insert ingriedient to the database
        if (ingriedient.length === 0) {
          ingriedientId = uuidv4();
          await mySQLPool.execute(
            "INSERT INTO `ingriedients` (`id`,`name`,`kcal`) VALUES (?,?,?)",
            [ingriedientId, name, kcal]
          );
        }
        //create connection between recipes and ingriedients
        await mySQLPool.execute(
          "INSERT INTO `recipe_ingriedients` (`id`,`recipe_id`,`ingriedient_id`, `weight`) VALUES (?,?,?,?)",
          [uuidv4(), recipeId, ingriedientId, weight]
        );
      });

      return;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
  async findRecipeAndUpdate(recipeId, userId, patchData, imageLink) {
    //sprawdzic tez z user.id -> sprawdzic  id usera z bazy ??? -> jezeli cos nie tak zucic bledem zeby nikt nieporzadany nie mogl usuwac edytowac czyichs innych dokumentow

    const [{ user_id }] = (
      await mySQLPool.execute(
        "SELECT   `recipe`.`user_id` FROM `recipe` WHERE `recipe`.`id`= ? ",
        [recipeId]
      )
    )[0];

    if (user_id !== userId) throw new CustomError("no access", 403);

    try {
      const { title, description, isShared, ingriedients } = patchData;

      if (!title.trim() || !description.trim()) {
        throw new CustomError("fields required", 400);
      }
      //update recipe
      await mySQLPool.execute(
        "UPDATE `recipe` SET `title`=?,`editedAt`=?,`description`=?,`isShared`=? WHERE `id`=? ",
        [title, currentSQLdate(), description, isShared, recipeId]
      );

      //update image link

      await mySQLPool.execute(
        "UPDATE `images` SET `coverPhoto`=?,`miniaturePhoto`=? WHERE `recipe_id`=? ",
        [imageLink, imageLink, recipeId]
      );

      //delete all existing ingriedients from recipe

      await mySQLPool.execute(
        "DELETE FROM `recipe_ingriedients` WHERE `recipe_id`=?",
        [recipeId]
      );

      //save ingriedients from array

      ingriedients.forEach(async (element) => {
        const { name, kcal, weight } = element;
        let ingriedientId;
        //check if ingriedient already exits
        const [ingriedient] = await mySQLPool.execute(
          "SELECT `ingriedients`.`id`  FROM `ingriedients` WHERE `ingriedients`.`name`= ? AND `ingriedients`.`kcal` = ? ",
          [name, kcal]
        );
        //if it exists then set ingriedientId to existing id
        if (ingriedient.length !== 0) ingriedientId = ingriedient[0].id;

        //if it doesn't exist then insert ingriedient to the database
        if (ingriedient.length === 0) {
          ingriedientId = uuidv4();
          await mySQLPool.execute(
            "INSERT INTO `ingriedients` (`id`,`name`,`kcal`) VALUES (?,?,?)",
            [ingriedientId, name, kcal]
          );
        }
        //create connection between recipes and ingriedients

        await mySQLPool.execute(
          "INSERT INTO `recipe_ingriedients` (`id`,`recipe_id`,`ingriedient_id`, `weight`) VALUES (?,?,?,?)",
          [uuidv4(), recipeId, ingriedientId, weight]
        );
      });

      return;
    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }

  async findRecipeAndDelete(recipeId, userId) {
    try {
      const [{ user_id }] = (
        await mySQLPool.execute(
          "SELECT   `recipe`.`user_id` FROM `recipe` WHERE `recipe`.`id`= ? ",
          [recipeId]
        )
      )[0];
      if (user_id !== userId) throw new CustomError("no access", 403);

      const [{ coverPhoto }] = (
        await mySQLPool.execute(
          "SELECT   `images`.`coverPhoto` FROM `images` WHERE `images`.`recipe_id`= ? ",
          [recipeId]
        )
      )[0];


      await mySQLPool.execute("DELETE FROM `images` WHERE `recipe_id`=? ", [
        recipeId,
      ]);
      await mySQLPool.execute(
        "DELETE FROM `recipe_ingriedients` WHERE `recipe_id`=?",
        [recipeId]
      );

      await mySQLPool.execute("DELETE FROM `recipe` WHERE `id`=?", [recipeId]);


return coverPhoto

    } catch (err) {
      if (err instanceof CustomError)
        throw new CustomError(err.message, err.statusCode);
      throw new Error(err.message);
    }
  }
}

module.exports = { RecipeRepository };

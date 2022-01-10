// // I switched to mySQL - leaving this for studying purposes


// const Recipe = require("../../../models/Recipe");
// const CustomError = require("../../../errors/CustomError");

// class RecipeRepository {
//   async FindRecipe(input) {
//     try {
//       const doc = await Recipe.findOne(input);
//       if (!doc) throw new CustomError("Wrong email or password", 401);
//       return doc;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }
//   async CountDocuments(input) {
//     try {
//       const count = await Recipe.countDocuments(input);
//       return count;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }
//   async FindAndSort(createdBy, sortingParams, resultsPerPage, page) {
//     try {
//       const doc = await Recipe.find({ ...createdBy })
//       .filter()
//         .sort({ ...sortingParams })
//         .limit(resultsPerPage)
//         .skip(resultsPerPage * page);
//       return doc;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }

//   async SaveRecipe(newRecipeInfo) {
//     try {
//       const newRecipe = new Recipe({ ...newRecipeInfo });
//       await newRecipe.save();
//       return;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }
//   async FindRecipeAndUpdate(searchInfo, updateInfo) {
//     try {
//       const { id, email } = searchInfo;
//       const recipe = await Recipe.findOneAndUpdate(
//         { _id: id, createdBy: email },
//         updateInfo,
//         {
//           new: true,
//         }
//       );
//       return recipe;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }

//   async FindRecipeAndDelete(id, email) {
//     try {
//       const recipe = await Recipe.findOneAndDelete({
//         _id: id,
//         createdBy: email,
//       });
//       return recipe;
//     } catch (err) {
//       if (err instanceof CustomError)
//         throw new CustomError(err.message, err.statusCode);
//       throw new Error(err.message);
//     }
//   }
// }

// module.exports = { RecipeRepository };

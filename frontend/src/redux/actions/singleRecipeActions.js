import * as actionTypes from "../constants/singleRecipeConstants";
import RecipeService from "../../services/recipeService";

const recipeService = new RecipeService();

export const getSingleRecipe = (id) => async (dispatch) => {
  try {
    const recipe = await recipeService.getSingleRecipe(id);

    dispatch({
      type: actionTypes.GET_SINGLE_RECIPE,
      payload: { ...recipe, isSuccess: true },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_RECIPE_FAIL,
      payload: { message: error.message, isSuccess: false },
    });
  }
};

export const editSingleRecipe =
  (recipe_id, recipe, editedRecipe, uploadedImage) => async (dispatch) => {
    try {
      const coverPhoto = await recipeService.editSingleRecipe(
        recipe_id,
        editedRecipe,
        uploadedImage
      );

      dispatch({
        type: actionTypes.EDIT_SINGLE_RECIPE,
        payload: { ...recipe, ...editedRecipe, coverPhoto, isSuccess: true },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.EDIT_SINGLE_RECIPE_FAIL,
        payload: { message: error.message, isSuccess: false },
      });
    }
  };

export const deleteSingleRecipe = (recipe_id) => async (dispatch) => {
  try {
    await recipeService.deleteSingleRecipe(recipe_id);

    dispatch({
      type: actionTypes.DELETE_SINGLE_RECIPE,
      payload: { isSuccess: true },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.DELETE_SINGLE_RECIPE_FAIL,
      payload: { isSuccess: false },
    });
  }
};

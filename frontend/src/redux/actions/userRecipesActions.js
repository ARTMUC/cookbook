import * as actionTypes from "../constants/userRecipesConstants";
import RecipeService from "../../services/recipeService";

const recipeService = new RecipeService();

export const getAllUserRecipes = (page, sortParams) => async (dispatch) => {
  try {
    const recipes = await recipeService.getAllUserRecipes(page, sortParams);

    dispatch({
      type: actionTypes.GET_ALL_USER_RECIPES,
      payload: { ...recipes, isSuccess: true },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_RECIPES_FAIL,
      payload: { message: error.message, isSuccess: false },
    });
  }
};

export const createRecipe =
  (recipeData, uploadedImage) => async (dispatch, getState) => {
    try {
      const recipe = await recipeService.createRecipe(
        recipeData,
        uploadedImage
      );
      const prevState = getState().userRecipes;
      const recipes = [recipe, ...prevState.recipes];
      const newState = { ...prevState, recipes };
      dispatch({
        type: actionTypes.ADD_MY_RECIPE,
        payload: { ...newState, isSuccess: true },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ADD_MY_RECIPE_FAIL,
        payload: { message: error.message, isSuccess: false },
      });
    }
  };

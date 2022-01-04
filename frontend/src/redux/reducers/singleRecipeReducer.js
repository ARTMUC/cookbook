import * as actionTypes from "../constants/singleRecipeConstants.js";

export const singleRecipeReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.GET_SINGLE_RECIPE:
      return action.payload;
    case actionTypes.GET_RECIPE_FAIL:
      return action.payload;
    case actionTypes.EDIT_SINGLE_RECIPE:
      return action.payload;
    case actionTypes.EDIT_SINGLE_RECIPE_FAIL:
      return action.payload;
    case actionTypes.DELETE_SINGLE_RECIPE:
      return action.payload;
    case actionTypes.DELETE_SINGLE_RECIPE_FAIL:
      return action.payload;
    default:
      return state;
  }
};

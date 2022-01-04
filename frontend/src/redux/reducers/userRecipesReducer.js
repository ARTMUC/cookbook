import * as actionTypes from "../constants/userRecipesConstants.js";

const data = JSON.parse(localStorage.getItem("redux-storage-myRecipes"));
const initialState = data ? data : null;

const INITIAL_STATE = {
  ...initialState,
};

export const userRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USER_RECIPES:
      return action.payload;
    case actionTypes.EDIT_MY_RECIPE:
      return action.payload;
    case actionTypes.DELETE_MY_RECIPE:
      return action.payload;
    case actionTypes.ADD_MY_RECIPE:
      return action.payload;
      case actionTypes.ADD_MY_RECIPE_FAIL:
        return action.payload;
      case actionTypes.GET_RECIPES_FAIL:
        return action.payload;

    default:
      return state;
  }
};

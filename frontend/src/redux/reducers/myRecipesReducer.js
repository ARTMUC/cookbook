import * as actionTypes from "../constants/myRecipeConstants.js";

const data = JSON.parse(localStorage.getItem('redux-storage-myRecipes'));
const initialState =  data? data : null;

const INITIAL_STATE = {
  ...initialState
};

export const myRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_MY_RECIPES:
      return  action.payload;
      case actionTypes.ADD_MY_RECIPE:
      return  action.payload;
      case actionTypes.EDIT_MY_RECIPE:
        return  action.payload;
        case actionTypes.DELETE_MY_RECIPE:
          return  action.payload;
    default:
      return state;
  }
};

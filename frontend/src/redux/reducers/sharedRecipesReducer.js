import * as actionTypes from "../constants/sharedRecipeConstants.js";

const data = JSON.parse(localStorage.getItem('redux-storage-sharedRecipes'));
const initialState =  data? data : null;

const INITIAL_STATE = {
  ...initialState
};

export const myRecipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_SHARED_RECIPES:
      return  action.payload;
     
    default:
      return state;
  }
};

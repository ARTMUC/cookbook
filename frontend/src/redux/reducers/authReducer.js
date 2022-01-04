import * as actionTypes from "../constants/authConstants.js";

const user = JSON.parse(localStorage.getItem("cookbook-user"));

const INITIAL_STATE = user
  ? { user, isLoggedIn: true }
  : { user: null, isLoggedIn: false };

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
      return action.payload;
    case actionTypes.REGISTER_FAILED:
      return action.payload;
    case actionTypes.LOGIN:
      return action.payload;
    case actionTypes.LOGOUT:
      return action.payload;
    case actionTypes.LOGIN_FAILED:
      return action.payload;
    case actionTypes.NOT_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
};

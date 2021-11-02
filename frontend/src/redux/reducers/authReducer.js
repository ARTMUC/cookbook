import * as actionTypes from "../constants/authConstants.js";

const data = JSON.parse(localStorage.getItem('redux-storage'));
const initialState =  data? data : null;

const INITIAL_STATE = {
  ...initialState
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return  action.payload;
    case actionTypes.LOGOUT:
      return  action.payload;
      case actionTypes.CONFIRM_LOGGED_IN:
        return  action.payload;
    default:
      return state;
  }
};

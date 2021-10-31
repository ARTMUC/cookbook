import * as actionTypes from "../constants/authConstants.js";

const INITIAL_STATE = {
  isAuthorized: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
     // return  action.payload;
    // console.log('reducer fired')
     console.log(state)
    case actionTypes.LOGOUT:
      return  action.payload;
    default:
      return state;
  }
};

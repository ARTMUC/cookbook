import * as actionTypes from "../constants/authConstants";

export const login = (status) => async (dispatch, getState) => {

    dispatch({
    type: actionTypes.LOGIN,
    payload: {
        isAuthorized: status,
    },
  });
console.log('success')

};

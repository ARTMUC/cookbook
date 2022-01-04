import * as actionTypes from "../constants/authConstants";
import AuthService from "../../services/authService";

const authService = new AuthService();

export const login = (email, password) => async (dispatch) => {
  try {
    const { user, message } = await authService.login(email, password);

    user
      ? dispatch({
          type: actionTypes.LOGIN,
          payload: {
            user,
            message,
            isLoggedIn: true,
          },
        })
      : dispatch({
          type: actionTypes.LOGIN_FAILED,
          payload: {
            user,
            message,
            isLoggedIn: false,
          },
        });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.LOGIN_FAILED,
      payload: {
        message: "something went wrong",
        isLoggedIn: false,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  await authService.logout();
  dispatch({
    type: actionTypes.LOGOUT,
    payload: { isLoggedIn: false },
  });
};

export const notAuthenticated = () => async (dispatch) => {
  await authService.notAuthenticated();
  dispatch({
    type: actionTypes.NOT_AUTHENTICATED,
    payload: { isLoggedIn: false },
  });
};



export const register =
  (email, password, repeatPassword) => async (dispatch) => {
    try {
      if (password !== repeatPassword)
        throw new Error("Both passwords must be identical");
      const message = await authService.register(email, password);
      dispatch({
        type: actionTypes.REGISTER,
        payload: { message, messageType: "success", isLoggedIn: false },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.REGISTER_FAILED,
        payload: {
          message: error.message,
          messageType: "fail",
          isLoggedIn: false,
        },
      });
    }
  };

import * as actionTypes from "../constants/authConstants";

export const login = (email, password) => async (dispatch, getState) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();

    const authData = {
      user: data.user,
      message: data.message,
    };

    localStorage.setItem("redux-storage", JSON.stringify(authData));

    dispatch({
      type: actionTypes.LOGIN,
      payload: { ...authData },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.LOGIN,
      payload: {
        message: 'something went wrong',
      },
    });
  }
};

export const logout = () => async (dispatch, getState) => {
  localStorage.removeItem("redux-storage");
  const response = await fetch("http://localhost:5000/api/v1/auth/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch({
    type: actionTypes.LOGOUT,
    payload: {},
  });
};

export const confirmLoggedIn = () => async (dispatch, getState) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/ensureLoggedIn",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const authData = {
      user: data.user,
      message: data.message,
    };

    localStorage.setItem("redux-storage", JSON.stringify(authData));

    dispatch({
      type: actionTypes.CONFIRM_LOGGED_IN,
      payload: { ...authData },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.LOGIN,
      payload: {
        message: 'something went wrong',
      },
    });
  }
};

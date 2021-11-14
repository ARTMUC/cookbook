import * as actionTypes from "../constants/myRecipeConstants";

export const getMyRecipes = () => async (dispatch, getState) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/recipe/page=1/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      });

    const data = await response.json();

    localStorage.setItem("redux-storage-myRecipes", JSON.stringify(data));

    dispatch({
      type: actionTypes.GET_MY_RECIPES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    }
};

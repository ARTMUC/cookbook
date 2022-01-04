import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { singleRecipeReducer } from "./reducers/singleRecipeReducer";
import { userRecipesReducer } from "./reducers/userRecipesReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  auth: authReducer,
  recipe: singleRecipeReducer,
  userRecipes: userRecipesReducer,
});

// const store = createStore(reducer);
//const store = createStore(reducer, compose(applyMiddleware(thunk)));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

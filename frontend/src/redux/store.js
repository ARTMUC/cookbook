import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { myRecipesReducer } from "./reducers/myRecipesReducer";
import { sharedRecipesReducer } from "./reducers/sharedRecipesReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  auth: authReducer,
  myRecipes: myRecipesReducer,
}); //  we are using this if we have more than one reducer to combine them into one

// const store = createStore(reducer);
//const store = createStore(reducer, compose(applyMiddleware(thunk)));

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)) // I can pass multiple middleware as array here
);

export default store;

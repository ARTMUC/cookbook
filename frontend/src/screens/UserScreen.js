import "./UserScreen.css";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import UserHub from "../components/UserHub";

import { useState } from "react";
import { useEffect } from "react";
// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";
import { getMyRecipes } from "../redux/actions/myRecipesActions";
//

function UserScreen() {
  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
  const myRecipes = useSelector((state) => state.myRecipes);
  //

  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await dispatch(getMyRecipes());
    await dispatch(confirmLoggedIn());
    setIsLoading(false)
  }, []);

  return (
    <>
    <UserHub/>
   
      {isLoading ? <div>loading...</div> : <ul className='recipe__container'>{myRecipes.map((recipe) => <RecipeCard key={recipe.key} {...recipe} />)} </ul> }
  
    </>
  );
}

export default UserScreen;

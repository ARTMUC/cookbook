import "./UserScreen.css";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

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
    await dispatch(confirmLoggedIn());
    await dispatch(getMyRecipes());
    console.log(myRecipes);
    setIsLoading(false)
  }, []);

  return (
    <>
    <div></div>
    <div className='recipe__container'>
      {isLoading ? <>loading...</> : <>{myRecipes.map((recipe) => <RecipeCard key={recipe.key} {...recipe} />)} </> }
    </div>
    </>
  );
}

export default UserScreen;

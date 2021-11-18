import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";
import { getMyRecipes } from "../redux/actions/myRecipesActions";
//

import RecipeCard from "../components/RecipeCard";

function SingleRecipe() {
  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
  const myRecipes = useSelector((state) => state.myRecipes.recipes);
  const userEmail = useSelector((state) => state.auth.user.email);

  const totalPages = useSelector((state) => state.myRecipes.totalPages);
  //

  let { recipe_id } = useParams();
  const [recipe, setRecipe] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditSingleRecipe = () => {
    window.location.href = `/edit-recipe/${recipe._id}`;
  };

  useEffect(async () => {
    try {
      await dispatch(confirmLoggedIn()); // handle entering the Recipe we dont have access to - right now it's not fething but no info you cant get that one (created by someone else + private)

      let r = await fetch(
        `http://localhost:5000/api/v1/recipe//recipe=${recipe_id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await r.json();
      setRecipe(data[0]);
      setIsLoading(false);
      console.log(data[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isLoading === false && userEmail === recipe.createdBy) {
      console.log(isLoading);
      setIsEditable(true);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <li className="recipe">
          <img className="recipe__image" src={recipe.image} />
          <h2 className="recipe__title">{recipe.title}</h2>
          <p className="recipe__description">{recipe.description}</p>
          {/* later add button (read more) to description */}
          <p className="recipe__icon-share">
            {recipe.isShared ? <p>SHARED ⚑</p> : <p>PRIVATE ⚐</p>}{" "}
          </p>
          <p className="recipe__author">created by: {recipe.createdBy}</p>
        </li>
      )}
      {isEditable && (
        <button onClick={handleEditSingleRecipe} className="recipe__image">
          edit recipe
        </button>
      )}
    </>
  );
}

export default SingleRecipe;

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";
import { getMyRecipes } from "../redux/actions/myRecipesActions";
//

import RecipeCard from "../components/RecipeCard";

function EditRecipe() {
  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
  const myRecipes = useSelector((state) => state.myRecipes.recipes);
  const userEmail = useSelector((state) => state.auth.user.email);

  const totalPages = useSelector((state) => state.myRecipes.totalPages);
  //

  let { recipe_id } = useParams();
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeIsShared, setRecipeIsShared] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleEditSingleRecipe = async () => {
    try {
       await fetch(
        `http://localhost:5000/api/v1/recipe//recipe=${recipe_id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({
            title: recipeTitle,
            description: recipeDescription,
            image: recipeImage ,
            isShared:  recipeIsShared,
            }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
    } catch (error) {
      console.log(error);
    }
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


      setRecipeImage(data[0].image)
      setRecipeTitle(data[0].title)
      setRecipeDescription(data[0].description)
      setRecipeIsShared(data[0].isShared)

     
      setIsLoading(false);
      console.log(data[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form className="">
          <input type="text" value={recipeImage} onChange={(e)=> setRecipeImage(e.target.value)} />
          <input type="text" value={recipeTitle} />
          <input type="text" value={recipeDescription} />
          <input type="checkbox" value={recipeIsShared} />
        </form>
      )}

      <button onClick={handleEditSingleRecipe} className="recipe__image">
        edit recipe
      </button>
    </>
  );
}

export default EditRecipe;

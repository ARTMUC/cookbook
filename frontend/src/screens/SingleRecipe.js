import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BigRecipeCard from "../components/BigRecipeCard";
import BigEditableRecipeCard from "../components/BigEditableRecipeCard";

// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";

//

function SingleRecipe() {
  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process

  const userEmail = useSelector((state) => state.auth.user.email);

  //

  let { recipe_id } = useParams();
  const [recipe, setRecipe] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEditSingleRecipe = () => {
    setIsEditing((prev) => !prev);
  };

  const fetchRecipesData = async () => {
    try {
      await dispatch(confirmLoggedIn()); // handle entering the Recipe we dont have access to - right now it's not fething but no info you cant get that one (created by someone else + private)

      let response = await fetch(
        `http://localhost:5000/api/v1/recipe//recipe=${recipe_id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      
      setRecipe(data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRecipesData();
    })();
  }, []);

  useEffect(() => {
    if (isLoading === false && userEmail === recipe.createdBy) {
      console.log(recipe);
      setIsEditable(true);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isEditing ? (
        <BigEditableRecipeCard
          {...recipe}
          isEditable={isEditable}
          handleToggleEditSingleRecipe={handleToggleEditSingleRecipe}
          fetchRecipesData={fetchRecipesData}
        />
      ) : (
        <BigRecipeCard
          {...recipe}
          isEditable={isEditable}
          handleToggleEditSingleRecipe={handleToggleEditSingleRecipe}
        />
      )}
    </>
  );
}

export default SingleRecipe;

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BigRecipeCard from "../components/BigRecipeCard";
import EditRecipe from "../components/EditRecipe";

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
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleToggleEditSingleRecipe = () => {
    setIsEditing((prev) => !prev);
  };

  const fetchRecipesData = async () => {
    try {
      const response = await fetch(
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

      switch (response.status) {
        case 401:
          return await dispatch(logout());
        case 403:
          throw new Error("recipe not found");
        case 404:
          throw new Error("recipe not found");
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }

      setRecipe(data);
    } catch (error) {
      setServerErrorMessage(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRecipesData();
      window.scrollTo(0, 0);
      setIsLoading(false);
    })();
  }, [isEditing]);

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
        recipe && (
          <EditRecipe
            {...recipe}
            isEditable={isEditable}
            handleToggleEditSingleRecipe={handleToggleEditSingleRecipe}
            fetchRecipesData={fetchRecipesData}
          />
        )
      ) : (
        recipe && (
          <BigRecipeCard
            {...recipe}
            isEditable={isEditable}
            handleToggleEditSingleRecipe={handleToggleEditSingleRecipe}
          />
        )
      )}
      {serverErrorMessage && <p>{serverErrorMessage}</p>}
    </>
  );
}

export default SingleRecipe;

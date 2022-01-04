import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BigRecipeCard from "../components/BigRecipeCard";
import EditRecipe from "../components/EditRecipe";

import { useSelector, useDispatch } from "react-redux";
import { notAuthenticated } from "../redux/actions/authActions";
import { getSingleRecipe } from "../redux/actions/singleRecipeActions";

function SingleRecipe() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const recipe = useSelector((state) => state.recipe);

  const { recipe_id } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEditSingleRecipe = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      await dispatch(getSingleRecipe(recipe_id));
      window.scrollTo(0, 0);
      setIsLoading(false);
    })();
  }, []);

  useEffect(()=> {
    if (!recipe) return;
    if (recipe.message === "not logged in") return dispatch(notAuthenticated());
    if (isLoading === false && userId === recipe.user_id)
      return setIsEditable(true);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : recipe.isSuccess ? (
        isEditing ? (
          <EditRecipe
            isEditable={isEditable}
            handleToggleEditSingleRecipe={handleToggleEditSingleRecipe}
          />
        ) : (
          <BigRecipeCard
            {...recipe}
            isEditable={isEditable}
            handleToggleEditSingleRecipe={handleToggleEditSingleRecipe}
          />
        )
      ) : (
        <p>{recipe.message}</p>
      )}
    </>
  );
}

export default SingleRecipe;

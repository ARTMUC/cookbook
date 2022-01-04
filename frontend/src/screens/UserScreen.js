import "./UserScreen.css";

import RecipeCard from "../components/RecipeCard";
import UserHub from "../components/UserHub";
import CreateRecipe from "../components/CreateRecipe";

import { useState } from "react";
import { useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { getAllUserRecipes } from "../redux/actions/userRecipesActions";
import { notAuthenticated } from "../redux/actions/authActions";

function UserScreen() {
  const dispatch = useDispatch();
  const userRecipes = useSelector((state) => state.userRecipes);

  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [page, setPage] = useState(1);
  const [sortParams, setSortParams] = useState("sort=createdAt&order=DESC");

  const handleToggleAddingNewRecipe = () => {
    setIsAddingNew((prev) => !prev);
  };

  const changePage = (skip) => {
    setPage((currPage) => {
      if (currPage + skip === 0) return 1;
      if (currPage + skip > userRecipes.totalPages)
        return userRecipes.totalPages;
      return currPage + skip;
    });
  };
  const changeSortParams = (e) => {
    setSortParams(e);
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllUserRecipes(page, sortParams));
      window.scrollTo(0, 0);
      setIsLoading(false);
    })();
  }, [page, sortParams]);

  useEffect(() => {
    if (!userRecipes) return;
    if (userRecipes.message === "not logged in")
      return dispatch(notAuthenticated());
  }, [isLoading]);

  return (
    <>
      {isAddingNew ? (
        <CreateRecipe
          handleToggleAddingNewRecipe={handleToggleAddingNewRecipe}
        />
      ) : isLoading ? (
        <div className="recipe__container__loader-circle"></div>
      ) : (
        <>
          {userRecipes.isSuccess ? (
            <>
              <UserHub
                changePage={changePage}
                changeSortParams={changeSortParams}
                sortParams={sortParams}
                currentPage={userRecipes.page}
                totalPages={userRecipes.totalPages}
              />
              <ul className="recipe__container">
                {userRecipes.recipes.map((recipe) => (
                  <RecipeCard {...recipe} />
                ))}
              </ul>
            </>
          ) : (
            <p>{userRecipes.message}</p>
          )}

          <button
            className="recipe__container__button-add"
            onClick={handleToggleAddingNewRecipe}
          >
            <MdAddCircleOutline className="recipe__container__button-badge" />
          </button>
        </>
      )}
    </>
  );
}

export default UserScreen;

import "./UserScreen.css";

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
  const myRecipes = useSelector((state) => state.myRecipes.recipes);

  const totalPages = useSelector((state) => state.myRecipes.totalPages);
  //

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortParams, setSortParams] = useState("sort=createdOn&order=-1");

  const changePage = (skip) => {
    setPage((currPage) => {
      if (currPage + skip === 0) {
        return 1;
      }
      if (currPage + skip > totalPages) {
        return totalPages;
      } else {
        return currPage + skip;
      }
    });
  };
  const changeSortParams = (e) => {
    setSortParams(e);
  };

  useEffect(async () => {
    console.log(page);
    await dispatch(getMyRecipes(page, sortParams));
    await dispatch(confirmLoggedIn());
    setIsLoading(false);
  }, [page, sortParams]);

  return (
    <>
      <UserHub
        changePage={changePage}
        changeSortParams={changeSortParams}
        sortParams={sortParams}
      />

      {isLoading ? (
       <div className="recipe__container__loader-circle"></div>
      ) : (
        <ul className="recipe__container">
          {myRecipes.map((recipe) => (
            <RecipeCard {...recipe} />
          ))}{" "}
        </ul>
      )}
    </>
  );
}

export default UserScreen;

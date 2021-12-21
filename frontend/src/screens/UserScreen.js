import "./UserScreen.css";

import RecipeCard from "../components/RecipeCard";
import UserHub from "../components/UserHub";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
// react - redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout, confirmLoggedIn } from "../redux/actions/authActions";

//

function UserScreen() {
  // react - redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // I'm not using selector here but for now I won't be deleting this just for learning process
  //

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortParams, setSortParams] = useState("sort=createdAt&order=DESC");
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

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

  const fetchRecipesData = async (page, sortParams) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/recipe/page=${page}?${sortParams}`,
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
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (error) {
      setServerErrorMessage(error.message);
    }
  };

const handleAddRecipe = () => {
  console.log('added')
}


  useEffect(() => {
    (async () => {
      await fetchRecipesData(page, sortParams);
      setIsLoading(false);
    })();
  }, [page, sortParams]);

  return (
    <>
      {isLoading ? (
        <div className="recipe__container__loader-circle"></div>
      ) : (
        <>
          <UserHub
            changePage={changePage}
            changeSortParams={changeSortParams}
            sortParams={sortParams}
            currentPage={currentPage}
            totalPages={totalPages}
            handleAddRecipe={handleAddRecipe}
          />
          {recipes[0] && (
            <ul className="recipe__container">
              {recipes.map((recipe) => (
                <RecipeCard {...recipe} />
              ))}{" "}
            </ul>
          )}
          {serverErrorMessage && <p>{serverErrorMessage}</p>}
           <Link to="/create-new" className="recipe__container__button-add"><MdAddCircleOutline className="recipe__container__button-badge"/> </Link>
        </>
      )}
        
    </>
  );
}

export default UserScreen;

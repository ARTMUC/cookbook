import "./UserScreen.css";

import RecipeCard from "../components/RecipeCard";
import UserHub from "../components/UserHub";

import { useState } from "react";
import { useEffect } from "react";
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
  const [sortParams, setSortParams] = useState("sort=createdOn&order=-1");
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

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
      if (data.statusCode) {
        throw new Error("please try again later");
      } else {
        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
        setCurrentPage(data.page);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(confirmLoggedIn());
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
          />
{  recipes[0] ? (<ul className="recipe__container">
            {recipes.map((recipe) => (
              <RecipeCard {...recipe} />
            ))}{" "}
          </ul>): <div>Nothing to load</div>}


        
        </>
      )}
    </>
  );
}

export default UserScreen;

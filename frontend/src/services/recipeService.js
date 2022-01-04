const API_URL = "http://localhost:5000/api/v1/recipe";

class RecipeService {
  async getSingleRecipe(recipe_id) {
    try {
      const response = await fetch(
        `${API_URL}/recipe=${recipe_id}`,

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
        case 200:
          return data;
        case 401:
          throw new Error("not logged in");
        case 403:
        case 404:
          throw new Error("recipe not found");
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }
    } catch (error) {
      throw error;
    }
  }
  async getAllUserRecipes(page, sortParams) {
    try {
      const response = await fetch(`${API_URL}/page=${page}?${sortParams}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      switch (response.status) {
        case 200:
          return data;
        case 401:
          throw new Error("not logged in");
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }
    } catch (error) {
      throw error;
    }
  }

  async editSingleRecipe(recipe_id, editedRecipe, uploadedImage) {
    try {
      const image = uploadedImage;
      const formData = new FormData();
      const patchData = JSON.stringify({ ...editedRecipe });

      formData.append("image", image[0]);
      formData.append("patchData", patchData);

      const response = await fetch(`${API_URL}/recipe=${recipe_id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      const coverPhoto = await response.json();
      switch (response.status) {
        case 200:
          return coverPhoto;
        case 400:
          throw new Error("please provide all required data");
        case 401:
          throw new Error("not logged in");
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteSingleRecipe(recipe_id) {
    try {
      const response = await fetch(`${API_URL}/recipe=${recipe_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      switch (response.status) {
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }
    } catch (error) {
      throw error;
    }
  }
  async createRecipe(recipe, image) {
    try {
      const formData = new FormData();
      const patchData = JSON.stringify({ ...recipe });

      formData.append("image", image[0]);
      formData.append("patchData", patchData);

      const response = await fetch(`${API_URL}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const miniaturePhoto = await response.json();
      recipe.miniaturePhoto = miniaturePhoto;
      switch (response.status) {
        case 201:
          return recipe;
        case 400:
          throw new Error("please provide all required data");
        case 401:
          throw new Error("not logged in");
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default RecipeService;

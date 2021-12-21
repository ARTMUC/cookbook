import "./CreateRecipe.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateRecipe = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [ingredients, setIngredients] = useState([{}]);
  // const [uploadedImage, setUploadedImage] = useState("");

  const changeRecipeIngriedients = (name, index) => {
    const ingriedientsArr = [...ingredients];
    ingriedientsArr[index].name = name;
    setIngredients([...ingriedientsArr]);
  };

  const changeIngriedientWeight = (weight, index) => {
    const ingriedientsArr = [...ingredients];
    ingriedientsArr[index].weight = weight;
    setIngredients([...ingriedientsArr]);
  };

  const changeIngriedientKcal = (kcal, index) => {
    const ingriedientsArr = [...ingredients];
    ingriedientsArr[index].kcal = kcal;
    setIngredients([...ingriedientsArr]);
  };

  const addNewIngriedient = (e) => {
    e.preventDefault();
    setIngredients((prev) => [...prev, {}]);
  };

  const removeIngriedient = (e, i) => {
    e.preventDefault();
    setIngredients((prev) => [
      ...prev.slice(0, i),
      ...prev.slice(i + 1, prev.length + 1),
    ]);
  };

  const handleCreateSingleRecipe = async () => {
    try {
      const formData = new FormData();
      const patchData = JSON.stringify({
        title,
        description,
        image,
        isShared,
        ingriedients: [...ingredients],
      });

      formData.append("image", image[0]);
      formData.append("patchData", patchData);

      const response = await fetch(`http://localhost:5000/api/v1/recipe/`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      window.location.href = "/user-screen";
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageInput = async (e) => {
    setImage(e.target.files);
  };

  return (
    <>
      <form className="create-recipe__form">
        <div className="create-form__section">
          <label for="image" className="create-form__input-label">
            IMAGE:
          </label>
          <input
            type="file"
            className="create-form__button-upload"
            onChange={(e) => handleImageInput(e)}
          />
        </div>
        <div className="create-form__section">
          <label className="create-form__input-label" for="title">
            TITLE:
          </label>
          <input
            type="text"
            id="title"
            className="create-form__input-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create-form__section">
          <label className="create-form__input-label" for="description">
            DESCRIPTION:
          </label>
          <textarea
            type="text"
            id="description"
            className="create-form__input-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            {" "}
          </textarea>
        </div>
        <div className="create-form__section">
          <label className="create-form__input-label" for="ingriedients">
            INGRIEDIENTS:
          </label>
          <div>
            {ingredients.map((ingriedient, index) => {
              const { name, weight, kcal } = ingriedient;
              return (
                <div key={index} className="create-form__section-ingriedients">
                  <input
                    type="text"
                    className="create-form__input-ingriedients"
                    id="ingriedients"
                    value={name}
                    onChange={(e) =>
                      changeRecipeIngriedients(e.target.value, index)
                    }
                  />
                  <input
                    type="text"
                    className="create-form__input-ingriedients"
                    id="ingriedients"
                    value={weight}
                    onChange={(e) =>
                      changeIngriedientWeight(e.target.value, index)
                    }
                  />
                  <input
                    type="text"
                    className="create-form__input-ingriedients"
                    id="ingriedients"
                    value={kcal}
                    onChange={(e) =>
                      changeIngriedientKcal(e.target.value, index)
                    }
                  />
                  <input
                    type="submit"
                    value="X"
                    key={index}
                    onClick={(e) => removeIngriedient(e, index)}
                    className="create-recipe__button-del"
                  />
                </div>
              );
            })}
            <input
              type="submit"
              value="add new ingriedient"
              onClick={(e) => addNewIngriedient(e)}
              className="create-recipe__button-add"
            />
          </div>
        </div>

        <div className="create-form__section">
          <label className="create-form__input-label" for="shared">
            SHARE RECIPE?
          </label>
          <input
            type="checkbox"
            id="shared"
            checked={isShared}
            onChange={(e) => setIsShared((prev) => !prev)}
            className="create-recipe__input-checkbox"
          />
          <span className="checkmark"></span>
        </div>
      </form>

      <div className="create-recipe__form-buttons">
        <button
          onClick={() => {
            window.location.href = "/user-screen";
          }}
          className="create-recipe__button-discard"
        >
          discard changes
        </button>
        <button
          onClick={handleCreateSingleRecipe}
          className="create-recipe__button-save"
        >
          save changes
        </button>
      </div>
    </>
  );
};

export default CreateRecipe;

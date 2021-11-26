import "./BigEditableRecipeCard.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

const BigEditableRecipeCard = ({
  image,
  title,
  description,
  isShared,
  handleToggleEditSingleRecipe,
  fetchRecipesData,
  ingriedients,
}) => {
  let { recipe_id } = useParams();
  const [editedImage, setEditedImage] = useState(image);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedIsShared, setEditedIsShared] = useState(isShared);
  const [editedIngredients, setEditedIngredients] = useState([...ingriedients]);

  const changeRecipeIngriedients = (text, index) => {
    console.log("fired");
    const ingriedientsArr = [...editedIngredients];
    ingriedientsArr[index] = text;
    setEditedIngredients([...ingriedientsArr]);
  };

  const addNewIngriedient = (e) => {
    e.preventDefault();
    setEditedIngredients((prev) => [...prev, ""]);
  };

  const removeIngriedient = (e, i) => {
    e.preventDefault();
    setEditedIngredients((prev) => [
      ...prev.slice(0, i),
      ...prev.slice(i + 1, prev.length + 1),
    ]);
  };

  const handleEditSingleRecipe = async () => {
    try {
      await fetch(`http://localhost:5000/api/v1/recipe//recipe=${recipe_id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          image: editedImage,
          isShared: editedIsShared,
          ingriedients: [...editedIngredients],
        }),
      });
      await fetchRecipesData();
      handleToggleEditSingleRecipe();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSingleRecipe = async () => {
    try {
      await fetch(`http://localhost:5000/api/v1/recipe//recipe=${recipe_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.href = `/user-screen`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="edit-recipe__form">
        <div className="edit-form__section">
          <label for="image" className="edit-form__input-label">
            IMAGE:
          </label>
          <input
            type="text"
            id="image"
            className="edit-form__input-title"
            value={editedImage}
            onChange={(e) => setEditedImage(e.target.value)}
          />
        </div>
        <div className="edit-form__section">
          <label className="edit-form__input-label" for="title">
            TITLE:
          </label>
          <input
            type="text"
            id="title"
            className="edit-form__input-title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div className="edit-form__section">
          <label className="edit-form__input-label" for="description">
            DESCRIPTION:
          </label>
          <textarea
            type="text"
            id="description"
            className="edit-form__input-description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          >
            {" "}
          </textarea>
        </div>
        <div className="edit-form__section">
          <label className="edit-form__input-label" for="ingriedients">
            INGRIEDIENTS:
          </label>
          <div>
            {editedIngredients.map((ingredient, index) => {
              return (
                <div key={index} className="edit-form__section-ingriedients">
                  <input
                    type="text"
                    className="edit-form__input-ingriedients"
                    id="ingriedients"
                    value={ingredient}
                    onChange={(e) =>
                      changeRecipeIngriedients(e.target.value, index)
                    }
                  />
                  <input
                    type="submit"
                    value="X"
                    key={index}
                    onClick={(e) => removeIngriedient(e, index)}
                    className="edit-recipe__button-del"
                  />
                </div>
              );
            })}
            <input
              type="submit"
              value="add new ingriedient"
              onClick={(e) => addNewIngriedient(e)}
              className="edit-recipe__button-add"
            />
          </div>
        </div>

        <div className="edit-form__section">
          <label className="edit-form__input-label" for="shared">
            SHARE RECIPE?
          </label>
          <input
            type="checkbox"
            id="shared"
            checked={editedIsShared}
            onChange={(e) => setEditedIsShared((prev) => !prev)}
            className="edit-recipe__input-checkbox"
          />
          <span className="checkmark"></span>
        </div>
      </form>

      <div className="edit-recipe__form-buttons">
        <button
          onClick={() => {
            return handleToggleEditSingleRecipe();
          }}
          className="edit-recipe__button-discard"
        >
          discard changes
        </button>
        <button
          onClick={handleEditSingleRecipe}
          className="edit-recipe__button-save"
        >
          save changes
        </button>
        <button
          onClick={handleRemoveSingleRecipe}
          className="edit-recipe__button-remove"
        >
          delete recipe
        </button>
      </div>
    </>
  );
};

export default BigEditableRecipeCard;

import "./CreateRecipe.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { createRecipe } from "../redux/actions/userRecipesActions";

const CreateRecipe = ({ handleToggleAddingNewRecipe }) => {
  const dispatch = useDispatch();

  const [recipe, setRecipe] = useState({
    id: uuid(),
    title: "",
    description: "",
    isShared: false,
    ingriedients: [],
  });
  const [uploadedImage, setUploadedImage] = useState("");

  const { title, description, isShared, ingriedients } = recipe;

  const handleFormChange = (event, index) => {
    const { id, name, value } = event.target;

    switch (id) {
      case "ingriedient":
        return setRecipe((prev) => {
          const ingriedients = [...prev.ingriedients].map((el, i) => {
            return i === index ? { ...el, [name]: value } : el;
          });

          return { ...prev, ingriedients };
        });

      case "isShared":
        return setRecipe((prev) => ({ ...prev, [name]: !prev.isShared }));

      default:
        return setRecipe((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addIngriedient = (e) => {
    e.preventDefault();
    setRecipe((prevState) => {
      return {
        ...prevState,
        ingriedients: [
          ...prevState.ingriedients,
          { id: uuid(), name: "", weight: "", kcal: "" },
        ],
      };
    });
  };

  const removeIngriedient = (e, id) => {
    e.preventDefault();
    setRecipe((prevState) => {
      const ingriedients = prevState.ingriedients.filter((el) => el.id !== id);
      return {
        ...prevState,
        ingriedients,
      };
    });
  };

  const discardChanges = () => {
    handleToggleAddingNewRecipe();
  };

  const handleCreateRecipe = async () => {
    await dispatch(createRecipe(recipe, uploadedImage));
    handleToggleAddingNewRecipe();
  };

  const handleImageInput = async (e) => {
    setUploadedImage(e.target.files);
  };

  return (
    <>
      <form className="edit-recipe__form">
        <div className="edit-form__section">
          <label for="image" className="edit-form__input-label">
            IMAGE:
          </label>
          <input
            type="file"
            className="edit-form__button-upload"
            onChange={(e) => handleImageInput(e)}
          />
        </div>
        <div className="edit-form__section">
          <label className="edit-form__input-label" for="title">
            TITLE:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="edit-form__input-title"
            value={title}
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <div className="edit-form__section">
          <label className="edit-form__input-label" for="description">
            DESCRIPTION:
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            className="edit-form__input-description"
            value={description}
            onChange={(e) => handleFormChange(e)}
          ></textarea>
        </div>
        <div className="edit-form__section">
          <label className="edit-form__input-label" for="ingriedients">
            INGRIEDIENTS:
          </label>
          <div>
            {ingriedients.map((ingriedient, index) => {
              const { id, name, weight, kcal } = ingriedient;
              return (
                <div key={id} className="edit-form__section-ingriedients">
                  <input
                    type="text"
                    className="edit-form__input-ingriedients"
                    id="ingriedient"
                    value={name}
                    name="name"
                    onChange={(e) => handleFormChange(e, index)}
                  />
                  <input
                    type="text"
                    className="edit-form__input-ingriedients"
                    id="ingriedient"
                    value={weight}
                    name="weight"
                    onChange={(e) => handleFormChange(e, index)}
                  />
                  <input
                    type="text"
                    className="edit-form__input-ingriedients"
                    id="ingriedient"
                    value={kcal}
                    name="kcal"
                    onChange={(e) => handleFormChange(e, index)}
                  />
                  <input
                    type="submit"
                    value="X"
                    onClick={(e) => removeIngriedient(e, id)}
                    className="edit-recipe__button-del"
                  />
                </div>
              );
            })}
            <input
              type="submit"
              value="add new ingriedient"
              onClick={(e) => addIngriedient(e)}
              className="edit-recipe__button-add"
            />
          </div>
        </div>

        <div className="edit-form__section">
          <label className="edit-form__input-label" for="isShared">
            SHARE RECIPE?
          </label>
          <input
            type="checkbox"
            id="isShared"
            checked={isShared}
            name="isShared"
            onChange={(e) => handleFormChange(e)}
            className="edit-recipe__input-checkbox"
          />
          <span className="checkmark"></span>
        </div>
      </form>

      <div className="edit-recipe__form-buttons">
        <button
          onClick={discardChanges}
          className="edit-recipe__button-discard"
        >
          discard changes
        </button>
        <button
          onClick={handleCreateRecipe}
          className="edit-recipe__button-save"
        >
          save changes
        </button>
      </div>
    </>
  );
};

export default CreateRecipe;

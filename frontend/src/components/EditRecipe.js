import "./EditRecipe.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  editSingleRecipe,
  deleteSingleRecipe,
} from "../redux/actions/singleRecipeActions";

const EditRecipe = ({ handleToggleEditSingleRecipe }) => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);

  const { recipe_id } = useParams();
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });
  const [uploadedImage, setUploadedImage] = useState("");

  const { title, description, isShared, ingriedients } = editedRecipe;

  const handleFormChange = (e, index) => {
    switch (e.target.id) {
      case "ingriedient":
        setEditedRecipe((prevState) => {
          const ingriedientsArr = [...prevState.ingriedients];
          ingriedientsArr[index] = {
            ...ingriedientsArr[index],
            [e.target.name]: e.target.value,
          };
          return { ...prevState, ingriedients: [...ingriedientsArr] };
        });
        break;
      case "isShared":
        setEditedRecipe((prevState) => {
          return { ...prevState, [e.target.name]: !prevState.isShared };
        });
        break;
      default:
        setEditedRecipe((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value };
        });
        break;
    }
  };

  const addIngriedient = (e) => {
    e.preventDefault();
    setEditedRecipe((prevState) => {
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
    setEditedRecipe((prevState) => {
      const ingriedients = prevState.ingriedients.filter((el) => el.id !== id);
      return {
        ...prevState,
        ingriedients,
      };
    });
  };

  const discardChanges = () => {
    handleToggleEditSingleRecipe();
  };

  const handleImageInput = async (e) => {
    setUploadedImage(e.target.files);
  };

  const handleEditRecipe = async () => {
    await dispatch(
      editSingleRecipe(recipe_id, recipe, editedRecipe, uploadedImage)
    );
    handleToggleEditSingleRecipe();
  };

  const handleRemoveSingleRecipe = async () => {
    await dispatch(deleteSingleRecipe(recipe_id));
    window.location.href = `/user-screen`;
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
        <button onClick={handleEditRecipe} className="edit-recipe__button-save">
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

export default EditRecipe;

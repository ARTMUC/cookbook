import "./RecipeCard.css";
import React from "react";

function RecipeCard({
  id,
  title,
  description,
  miniaturePhoto,
  isShared,
  createdBy,
  createdOn,
  editedOn,
}) {
  const handleOpenSingleRecipe = (e) => {
    window.location.href = `/recipe/${e}`;
  };

  return (
    <>
      <li
        className="recipe"
        key={id}
        onClick={() => handleOpenSingleRecipe(id)}
      >
        <div className="recipe__picture-container">
          <div className="recipe__picture-placeholder"> </div>
          <img className="recipe__picture-image" src={miniaturePhoto} />
        </div>
        <h2 className="recipe__title">{title}</h2>
        <p className="recipe__description">
          {description.substring(0, 100) + "..."}
        </p>
        <p className="recipe__icon-share">
          {isShared ? <p>SHARED ⚑</p> : <p>PRIVATE ⚐</p>}{" "}
        </p>
        <p className="recipe__author">created by: {createdBy}</p>
      </li>
    </>
  );
}

export default RecipeCard;

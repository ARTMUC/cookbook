import "./RecipeCard.css";
import React from "react";
import { useState } from "react";

function RecipeCard({
  _id,
  title,
  description,
  image,
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
        key={_id}
        onClick={() => handleOpenSingleRecipe(_id)}
      >
        <img className="recipe__image" src={image} />
        <h2 className="recipe__title">{title}</h2>
        <p className="recipe__description">
          {description.substring(0, 100) + "..."}
        </p>
        {/* later add button (read more) to description */}
        <p className="recipe__icon-share">
          {isShared ? <p>SHARED ⚑</p> : <p>PRIVATE ⚐</p>}{" "}
        </p>
        <p className="recipe__author">created by: {createdBy}</p>
      </li>
    </>
  );
}

export default RecipeCard;

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


  return (
    <>
      <div className="recipe">
        <h2 className="recipe__title">{title}</h2>
        <p className="recipe__description">{description.substring(0, 100) + "..."}</p> 
        {/* later add button (read more) to description */}
        <img className="recipe__image" src={image}/>
        <p className="recipe__icon-share">{isShared ? <p>⚑</p> : <p>⚐</p>} </p>
        <p className="recipe__author">created by: {createdBy}</p>
        <p className="recipe__date">created on: {createdOn}</p>
        <p className="recipe__date">edited on: {editedOn}</p>
      </div>
    </>
  );
}

export default RecipeCard;

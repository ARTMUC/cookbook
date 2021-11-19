// import "./BigRecipeCard.css";

const BigRecipeCard = ({ image, title, description, isShared, createdBy, isEditable, handleEditSingleRecipe }) => {
  return (
    <>
      <li className="big-recipe">
        <img className="big-recipe__image" src={image} />
        <h2 className="big-recipe__title">{title}</h2>
        <p className="big-recipe__description">{description}</p>
        <p className="big-recipe__icon-share">
          {isShared ? <p>SHARED ⚑</p> : <p>PRIVATE ⚐</p>}{" "}
        </p>
        <p className="big-recipe__author">created by: {createdBy}</p>
      </li>

      {isEditable && (
    <button 
    onClick={handleEditSingleRecipe} 
    className="big-recipe__image">
      edit recipe
    </button>
  )}
    </>
  );
};

export default BigRecipeCard;

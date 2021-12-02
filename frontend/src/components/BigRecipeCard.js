import "./BigRecipeCard.css";

const BigRecipeCard = ({
  image,
  title,
  description,
  isShared,
  createdBy,
  isEditable,
  handleToggleEditSingleRecipe,
  ingriedients,
}) => {
  return (
    <>
      <div
        className="big-recipe_background"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="big-recipe">
        <div className="big-recipe__baner">
          <img className="big-recipe__baner-image" src={image} />
        </div>
        <div className="big-recipe__info">
          <h2 className="big-recipe__info-title">{title}</h2>
          <p className="big-recipe__info-author">created by: {createdBy}</p>
          <p className="big-recipe__info-share">
            {isShared ? <p>SHARED ⚑</p> : <p>PRIVATE ⚐</p>}{" "}
          </p>
          {isEditable && (
            <button
              onClick={handleToggleEditSingleRecipe}
              className="big-recipe__button-edit"
            >
              edit recipe
            </button>
          )}
        </div>

        <div className="big-recipe__ingriedients">
          <ul className="big-recipe__ingriedients-list">
            {ingriedients.map((ingriedient) => {
              return <li>{ingriedient}</li>;
            })}
          </ul>
        </div>
        <div className="big-recipe__main">
          <p className="big-recipe__main-description">{description}</p>
        </div>
      </div>
    </>
  );
};

export default BigRecipeCard;

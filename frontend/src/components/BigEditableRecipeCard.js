// import "./BigEditableRecipeCard.css";

const BigEditableRecipeCard = ({ image, title, description, isShared }) => {
  return (
    <>
      <form className="">
        <input
          type="text"
          value={image}
        //   onChange={(e) => setRecipeImage(e.target.value)}
        />
        <input
          type="text"
          value={title}
        //   onChange={(e) => setRecipeTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
        //   onChange={(e) => setRecipeDescription(e.target.value)}
        />
        <input
          type="checkbox"
          value={isShared}
        //   onChange={(e) => setRecipeIsShared(e.target.value)}
        />
      </form>
      }
      <button 
    //   onClick={handleEditSingleRecipe} 
      className="recipe__image">
        edit recipe
      </button>
    </>
  );
};

export default BigEditableRecipeCard;

import "./BigRecipeCard.css";

const BigRecipeCard = ({
  image,
  title,
  description,
  isShared,
  createdBy,
  isEditable,
  handleToggleEditSingleRecipe,
  ingriedients
}) => {
  return (
    <>
      <div className="big-recipe">
      <div className="big-recipe__baner"> 

      <div className="big-recipe__baner-hero"></div>

      <div className="big-recipe__baner-container">
      <img className="big-recipe__image" src={image} /> 
      <div> 
      <h2 className="big-recipe__title">{title}</h2>
       
      
       <p className="big-recipe__author">created by: {createdBy}</p> 
          <p className="big-recipe__icon-share">
            {isShared ? <p>SHARED ⚑</p> : <p>PRIVATE ⚐</p>}{" "}
          </p>
       </div>
        
          {isEditable && (
        <button onClick={handleToggleEditSingleRecipe} className="big-recipe__button-edit">
          edit recipe
        </button>
      )}

      </div>
     
    
          </div>
     
         <ul className="big-recipe__container-left">
        {ingriedients.map((ingriedient)=>{
          return <li>{ingriedient}</li>
        })}
         </ul>
        
     

        <div className="big-recipe__container-right">
          <p className="big-recipe__description">{description}</p>
         
        </div>
      </div>

      
    </>
  );
};

export default BigRecipeCard;

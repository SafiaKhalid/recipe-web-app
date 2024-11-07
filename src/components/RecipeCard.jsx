const RecipeCard = ({ recipe }) => {
    const { recipeName, timeStamp, image, prepTime, cookTime } = recipe
    return <section>
        <h2>{recipeName}</h2>
        <p>Updated: {timeStamp}</p>
        {/* {image ? <img src={image} />} */}
        {prepTime && <p>Preparation time: {prepTime}</p>}
        {cookTime && <p>Cook time: {cookTime}</p>}        
    </section>
}

export default RecipeCard